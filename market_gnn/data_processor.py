import torch
import numpy as np
import pandas as pd
from torch_geometric.data import Data
from typing import List, Tuple, Dict
import networkx as nx
from sklearn.preprocessing import StandardScaler
import logging
from pathlib import Path
import json


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class MarketDataProcessor:
    def __init__(
        self,
        window_size: int = 30,
        prediction_horizon: int = 5,
        crash_threshold: float = -0.1,  
        min_connection_weight: float = 0.3
    ):
        self.window_size = window_size
        self.prediction_horizon = prediction_horizon
        self.crash_threshold = crash_threshold
        self.min_connection_weight = min_connection_weight
        self.scaler = StandardScaler()
        
        self.feature_names = []
        self.stats = {}
    
    def process_market_data(
        self,
        price_data: pd.DataFrame,
        feature_data: pd.DataFrame,
        correlation_data: pd.DataFrame,
        save_path: str = None
    ) -> Tuple[List[Data], torch.Tensor]:
        """
        Process market data into graph structure
        
        Args:
            price_data: DataFrame with columns [date, asset_id, price]
            feature_data: DataFrame with columns [date, asset_id, feature1, feature2, ...]
            correlation_data: DataFrame with correlation matrices per date
            save_path: Optional path to save processed data
        """
        logger.info("Processing market data...")
        
        self.feature_names = [col for col in feature_data.columns 
                            if col not in ['date', 'asset_id']]
        
        price_data = self._calculate_returns(price_data)
        
        graph_snapshots = []
        labels = []
        
        unique_dates = sorted(price_data['date'].unique())
        for i in range(len(unique_dates) - self.window_size - self.prediction_horizon):
            window_dates = unique_dates[i:i + self.window_size]
            target_date = unique_dates[i + self.window_size + self.prediction_horizon]
            
            graph = self._create_graph_snapshot(
                window_dates,
                price_data,
                feature_data,
                correlation_data
            )
            
            if graph is not None:
                label = self._calculate_label(price_data, target_date)
                
                graph_snapshots.append(graph)
                labels.append(label)
        labels = torch.tensor(labels, dtype=torch.long)
        
        self._calculate_statistics(graph_snapshots, labels)
        
        if save_path:
            self._save_processed_data(save_path, graph_snapshots, labels)
        
        logger.info(f"Processed {len(graph_snapshots)} graph snapshots")
        return graph_snapshots, labels
    
    def _calculate_returns(self, price_data: pd.DataFrame) -> pd.DataFrame:
        """Calculate log returns from price data"""
        price_data = price_data.sort_values(['asset_id', 'date'])
        price_data['return'] = price_data.groupby('asset_id')['price'].apply(
            lambda x: np.log(x/x.shift(1))
        )
        return price_data.dropna()
    
    def _create_graph_snapshot(
        self,
        dates: List,
        price_data: pd.DataFrame,
        feature_data: pd.DataFrame,
        correlation_data: pd.DataFrame
    ) -> Data:
        """Create a graph snapshot for a given time window"""
        window_prices = price_data[price_data['date'].isin(dates)]
        window_features = feature_data[feature_data['date'].isin(dates)]
        window_corr = correlation_data[correlation_data['date'].isin(dates)]
        
        if len(window_prices) == 0 or len(window_features) == 0:
            return None
        
        assets = sorted(window_prices['asset_id'].unique())
        asset_to_idx = {asset: idx for idx, asset in enumerate(assets)}
        
        node_features = self._create_node_features(
            window_prices,
            window_features,
            assets,
            asset_to_idx
        )
        
        edge_index, edge_attr = self._create_edges(
            window_corr,
            assets,
            asset_to_idx
        )
        
        data = Data(
            x=torch.tensor(node_features, dtype=torch.float),
            edge_index=torch.tensor(edge_index, dtype=torch.long),
            edge_attr=torch.tensor(edge_attr, dtype=torch.float)
        )
        
        return data
    
    def _create_node_features(
        self,
        price_data: pd.DataFrame,
        feature_data: pd.DataFrame,
        assets: List,
        asset_to_idx: Dict
    ) -> np.ndarray:
        """Create node features from price and feature data"""
        n_assets = len(assets)
        n_features = len(self.feature_names) + 1 
        node_features = np.zeros((n_assets, n_features))
        
        for asset in assets:
            idx = asset_to_idx[asset]
            asset_returns = price_data[price_data['asset_id'] == asset]['return'].values
            node_features[idx, 0] = np.mean(asset_returns)
        
        for i, feature in enumerate(self.feature_names, 1):
            for asset in assets:
                idx = asset_to_idx[asset]
                asset_features = feature_data[
                    feature_data['asset_id'] == asset
                ][feature].values
                node_features[idx, i] = np.mean(asset_features)
        
        node_features = self.scaler.fit_transform(node_features)
        
        return node_features
    
    def _create_edges(
        self,
        correlation_data: pd.DataFrame,
        assets: List,
        asset_to_idx: Dict
    ) -> Tuple[List[List[int]], List[float]]:
        """Create edges based on correlation matrices"""
        edge_index = []
        edge_attr = []
        
        mean_corr = correlation_data.groupby(['asset1', 'asset2'])['correlation'].mean()

        for (asset1, asset2), corr in mean_corr.items():
            if abs(corr) >= self.min_connection_weight:
                idx1 = asset_to_idx[asset1]
                idx2 = asset_to_idx[asset2]

                edge_index.extend([[idx1, idx2], [idx2, idx1]])
                edge_attr.extend([corr, corr])
        
        return np.array(edge_index).T, np.array(edge_attr)
    
    def _calculate_label(
        self,
        price_data: pd.DataFrame,
        target_date: str
    ) -> int:
        """Calculate whether a market crash occurred"""
        target_returns = price_data[price_data['date'] == target_date]['return']
        return int(target_returns.mean() < self.crash_threshold)
    
    def _calculate_statistics(
        self,
        graph_snapshots: List[Data],
        labels: torch.Tensor
    ):
        """Calculate and store dataset statistics"""
        self.stats = {
            'n_samples': len(graph_snapshots),
            'n_features': graph_snapshots[0].x.shape[1],
            'crash_ratio': labels.float().mean().item(),
            'avg_nodes': np.mean([g.x.shape[0] for g in graph_snapshots]),
            'avg_edges': np.mean([g.edge_index.shape[1] for g in graph_snapshots]),
            'feature_names': self.feature_names
        }
    
    def _save_processed_data(
        self,
        save_path: str,
        graph_snapshots: List[Data],
        labels: torch.Tensor
    ):
        """Save processed data and statistics"""
        save_dir = Path(save_path)
        save_dir.mkdir(parents=True, exist_ok=True)
        
        # Save graphs and labels
        torch.save({
            'graphs': graph_snapshots,
            'labels': labels
        }, save_dir / 'processed_data.pt')
        
        # Save statistics and scaler
        with open(save_dir / 'statistics.json', 'w') as f:
            json.dump(self.stats, f, indent=4)
        
        torch.save(self.scaler, save_dir / 'scaler.pt')
        
        logger.info(f"Saved processed data to {save_dir}")
    
    @staticmethod
    def load_processed_data(
        load_path: str
    ) -> Tuple[List[Data], torch.Tensor, Dict, StandardScaler]:
        """Load processed data and associated information"""
        load_dir = Path(load_path)
        
        # Load graphs and labels
        data_dict = torch.load(load_dir / 'processed_data.pt')
        graph_snapshots = data_dict['graphs']
        labels = data_dict['labels']
        
        # Load statistics
        with open(load_dir / 'statistics.json', 'r') as f:
            stats = json.load(f)
        
        # Load scaler
        scaler = torch.load(load_dir / 'scaler.pt')
        
        return graph_snapshots, labels, stats, scaler

if __name__ == "__main__":
    # Example usage
    processor = MarketDataProcessor(
        window_size=30,
        prediction_horizon=5,
        crash_threshold=-0.1,
        min_connection_weight=0.3
    )
    
    # Load your data here
    # price_data = pd.read_csv('price_data.csv')
    # feature_data = pd.read_csv('feature_data.csv')
    # correlation_data = pd.read_csv('correlation_data.csv')
    
    # Process data
    # graphs, labels = processor.process_market_data(
    #     price_data=price_data,
    #     feature_data=feature_data,
    #     correlation_data=correlation_data,
    #     save_path='processed_data'
    # ) 