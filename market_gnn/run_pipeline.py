import torch
import pandas as pd
import numpy as np
from pathlib import Path
import logging
import json
from sklearn.model_selection import train_test_split
import argparse
from datetime import datetime

from data_processor import MarketDataProcessor
from models import MarketGNN, MarketCrashPredictor

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def load_data(
    price_path: str,
    feature_path: str,
    correlation_path: str
) -> tuple:
    """Load and validate input data"""
    logger.info("Loading input data...")
    
    # Load data
    price_data = pd.read_csv(price_path)
    feature_data = pd.read_csv(feature_path)
    correlation_data = pd.read_csv(correlation_path)
    
    # Validate data
    required_price_cols = ['date', 'asset_id', 'price']
    required_corr_cols = ['date', 'asset1', 'asset2', 'correlation']
    
    for col in required_price_cols:
        if col not in price_data.columns:
            raise ValueError(f"Missing required column {col} in price data")
    
    for col in required_corr_cols:
        if col not in correlation_data.columns:
            raise ValueError(f"Missing required column {col} in correlation data")
    
    if 'date' not in feature_data.columns or 'asset_id' not in feature_data.columns:
        raise ValueError("Feature data must contain 'date' and 'asset_id' columns")
    
    logger.info("Data loaded successfully")
    return price_data, feature_data, correlation_data

def prepare_data(
    processor: MarketDataProcessor,
    price_data: pd.DataFrame,
    feature_data: pd.DataFrame,
    correlation_data: pd.DataFrame,
    processed_data_path: str
) -> tuple:
    """Prepare and split data"""
    # Process data
    graphs, labels = processor.process_market_data(
        price_data=price_data,
        feature_data=feature_data,
        correlation_data=correlation_data,
        save_path=processed_data_path
    )
    
    # Split data
    train_idx, val_idx = train_test_split(
        np.arange(len(graphs)),
        test_size=0.2,
        shuffle=False  # Keep temporal order
    )
    val_idx, test_idx = train_test_split(
        val_idx,
        test_size=0.5,
        shuffle=False
    )
    
    # Create data splits
    train_data = [graphs[i] for i in train_idx]
    train_labels = labels[train_idx]
    
    val_data = [graphs[i] for i in val_idx]
    val_labels = labels[val_idx]
    
    test_data = [graphs[i] for i in test_idx]
    test_labels = labels[test_idx]
    
    return train_data, train_labels, val_data, val_labels, test_data, test_labels

def train_model(
    train_data: list,
    train_labels: torch.Tensor,
    val_data: list,
    val_labels: torch.Tensor,
    config: dict,
    model_save_path: str
) -> MarketCrashPredictor:
    """Train the model"""
    logger.info("Initializing model...")
    
    # Initialize model
    model = MarketGNN(
        input_dim=train_data[0].x.shape[1],
        hidden_dim=config['hidden_dim'],
        num_layers=config['num_layers'],
        dropout=config['dropout'],
        use_attention=config['use_attention']
    )
    
    # Initialize trainer
    trainer = MarketCrashPredictor(
        model=model,
        device=torch.device(config['device']),
        learning_rate=config['learning_rate'],
        weight_decay=config['weight_decay']
    )
    
    # Train model
    metrics = trainer.train(
        train_data=train_data,
        train_labels=train_labels,
        val_data=val_data,
        val_labels=val_labels,
        num_epochs=config['num_epochs'],
        batch_size=config['batch_size'],
        patience=config['patience'],
        model_save_path=model_save_path
    )
    
    return trainer, metrics

def evaluate_model(
    predictor: MarketCrashPredictor,
    test_data: list,
    test_labels: torch.Tensor,
    results_path: str
):
    """Evaluate model on test set"""
    logger.info("Evaluating model on test set...")
    
    # Make predictions
    predictions = predictor.predict(test_data)
    pred_labels = (predictions[:, 1] > 0.5).cpu().numpy()
    
    # Calculate metrics
    from sklearn.metrics import classification_report, confusion_matrix
    report = classification_report(test_labels.cpu(), pred_labels, output_dict=True)
    conf_matrix = confusion_matrix(test_labels.cpu(), pred_labels)
    
    # Save results
    results = {
        'classification_report': report,
        'confusion_matrix': conf_matrix.tolist(),
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    with open(results_path, 'w') as f:
        json.dump(results, f, indent=4)
    
    logger.info(f"Results saved to {results_path}")
    return results

def main(args):
    # Load configuration
    with open(args.config_path, 'r') as f:
        config = json.load(f)
    
    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load data
    price_data, feature_data, correlation_data = load_data(
        args.price_path,
        args.feature_path,
        args.correlation_path
    )
    
    # Initialize data processor
    processor = MarketDataProcessor(
        window_size=config['window_size'],
        prediction_horizon=config['prediction_horizon'],
        crash_threshold=config['crash_threshold'],
        min_connection_weight=config['min_connection_weight']
    )
    
    # Prepare data
    train_data, train_labels, val_data, val_labels, test_data, test_labels = prepare_data(
        processor=processor,
        price_data=price_data,
        feature_data=feature_data,
        correlation_data=correlation_data,
        processed_data_path=output_dir / 'processed_data'
    )
    
    # Train model
    predictor, metrics = train_model(
        train_data=train_data,
        train_labels=train_labels,
        val_data=val_data,
        val_labels=val_labels,
        config=config,
        model_save_path=output_dir / 'models' / 'market_crash_model.pt'
    )
    
    # Evaluate model
    results = evaluate_model(
        predictor=predictor,
        test_data=test_data,
        test_labels=test_labels,
        results_path=output_dir / 'results' / 'evaluation_results.json'
    )
    
    logger.info("Pipeline completed successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Market Crash Prediction Pipeline")
    parser.add_argument('--config_path', type=str, required=True,
                      help='Path to configuration file')
    parser.add_argument('--price_path', type=str, required=True,
                      help='Path to price data CSV')
    parser.add_argument('--feature_path', type=str, required=True,
                      help='Path to feature data CSV')
    parser.add_argument('--correlation_path', type=str, required=True,
                      help='Path to correlation data CSV')
    parser.add_argument('--output_dir', type=str, required=True,
                      help='Output directory for results')
    
    args = parser.parse_args()
    main(args) 