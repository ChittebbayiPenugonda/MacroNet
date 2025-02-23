import torch
import numpy as np
from torch_geometric.data import Data, Batch
from sklearn.metrics import precision_recall_fscore_support, roc_auc_score
from typing import List, Tuple, Dict
import logging
import json
from pathlib import Path
from tqdm import tqdm

from models import MarketGNN, MarketCrashPredictor

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class MarketCrashTrainer:
    def __init__(
        self,
        input_dim: int,
        hidden_dim: int = 64,
        num_layers: int = 3,
        dropout: float = 0.5,
        learning_rate: float = 0.001,
        weight_decay: float = 0.01,
        use_attention: bool = True,
        device: str = 'cuda' if torch.cuda.is_available() else 'cpu'
    ):
        self.device = torch.device(device)
        logger.info(f"Using device: {self.device}")
        
        # Initialize model
        self.model = MarketGNN(
            input_dim=input_dim,
            hidden_dim=hidden_dim,
            num_layers=num_layers,
            dropout=dropout,
            use_attention=use_attention
        )
        
        # Initialize predictor
        self.predictor = MarketCrashPredictor(
            model=self.model,
            device=self.device,
            learning_rate=learning_rate,
            weight_decay=weight_decay
        )
        
        # Training metrics
        self.metrics = {
            'train_losses': [],
            'val_losses': [],
            'best_val_loss': float('inf'),
            'best_epoch': 0
        }
    
    def train(
        self,
        train_data: List[Data],
        train_labels: torch.Tensor,
        val_data: List[Data],
        val_labels: torch.Tensor,
        num_epochs: int = 100,
        batch_size: int = 32,
        patience: int = 10,
        model_save_path: str = 'models/market_crash_model.pt'
    ):
        """Train the model with early stopping"""
        logger.info("Starting training...")
        
        # Create save directory if it doesn't exist
        Path(model_save_path).parent.mkdir(parents=True, exist_ok=True)
        
        # Early stopping variables
        patience_counter = 0
        best_val_loss = float('inf')
        
        for epoch in range(num_epochs):
            # Training phase
            train_loss = self._train_epoch(train_data, train_labels, batch_size)
            self.metrics['train_losses'].append(train_loss)
            
            # Validation phase
            val_loss, val_metrics = self._validate(val_data, val_labels, batch_size)
            self.metrics['val_losses'].append(val_loss)
            
            # Log metrics
            logger.info(
                f"Epoch {epoch+1}/{num_epochs} - "
                f"Train Loss: {train_loss:.4f} - "
                f"Val Loss: {val_loss:.4f} - "
                f"Val AUC: {val_metrics['auc']:.4f} - "
                f"Val F1: {val_metrics['f1']:.4f}"
            )
            
            # Learning rate scheduling
            self.predictor.scheduler.step(val_loss)
            
            # Early stopping check
            if val_loss < best_val_loss:
                best_val_loss = val_loss
                self.metrics['best_val_loss'] = val_loss
                self.metrics['best_epoch'] = epoch
                patience_counter = 0
                
                # Save best model
                self.predictor.save_model(model_save_path)
                logger.info(f"Saved best model to {model_save_path}")
            else:
                patience_counter += 1
                if patience_counter >= patience:
                    logger.info(f"Early stopping triggered after {epoch+1} epochs")
                    break
        
        # Save training metrics
        metrics_path = Path(model_save_path).parent / 'training_metrics.json'
        with open(metrics_path, 'w') as f:
            json.dump(self.metrics, f, indent=4)
        
        logger.info("Training completed!")
        return self.metrics
    
    def _train_epoch(
        self,
        train_data: List[Data],
        train_labels: torch.Tensor,
        batch_size: int
    ) -> float:
        """Train for one epoch"""
        epoch_loss = 0
        num_batches = 0
        
        # Create batches
        indices = torch.randperm(len(train_data))
        for i in range(0, len(train_data), batch_size):
            batch_indices = indices[i:i+batch_size]
            batch_data = Batch.from_data_list([train_data[j] for j in batch_indices])
            batch_labels = train_labels[batch_indices]
            
            # Train step
            loss, _ = self.predictor.train_step(batch_data, batch_labels)
            epoch_loss += loss.item()
            num_batches += 1
        
        return epoch_loss / num_batches
    
    def _validate(
        self,
        val_data: List[Data],
        val_labels: torch.Tensor,
        batch_size: int
    ) -> Tuple[float, Dict[str, float]]:
        """Validate the model"""
        total_loss = 0
        num_batches = 0
        all_preds = []
        all_labels = []
        
        # Create batches
        for i in range(0, len(val_data), batch_size):
            batch_data = Batch.from_data_list(val_data[i:i+batch_size])
            batch_labels = val_labels[i:i+batch_size]
            
            # Validation step
            loss, out = self.predictor.validate_step(batch_data, batch_labels)
            total_loss += loss.item()
            num_batches += 1
            
            # Store predictions and labels
            preds = torch.exp(out)[:, 1].cpu().numpy()  # Probability of crash
            all_preds.extend(preds)
            all_labels.extend(batch_labels.cpu().numpy())
        
        # Calculate metrics
        all_preds = np.array(all_preds)
        all_labels = np.array(all_labels)
        precision, recall, f1, _ = precision_recall_fscore_support(
            all_labels,
            all_preds > 0.5,
            average='binary'
        )
        auc = roc_auc_score(all_labels, all_preds)
        
        metrics = {
            'precision': precision,
            'recall': recall,
            'f1': f1,
            'auc': auc
        }
        
        return total_loss / num_batches, metrics
    
    def predict(self, data: List[Data], batch_size: int = 32) -> np.ndarray:
        """Make predictions on new data"""
        self.model.eval()
        all_preds = []
        
        with torch.no_grad():
            for i in range(0, len(data), batch_size):
                batch_data = Batch.from_data_list(data[i:i+batch_size])
                preds = self.predictor.predict(batch_data)
                all_preds.extend(preds[:, 1].cpu().numpy())  # Probability of crash
        
        return np.array(all_preds)

if __name__ == "__main__":
    # Example usage
    input_dim = 64  # Dimension of node features
    
    # Initialize trainer
    trainer = MarketCrashTrainer(
        input_dim=input_dim,
        hidden_dim=128,
        num_layers=3,
        dropout=0.5,
        learning_rate=0.001,
        weight_decay=0.01,
        use_attention=True
    )
    
    # Load your data here
    # train_data = ...
    # train_labels = ...
    # val_data = ...
    # val_labels = ...
    
    # Train the model
    # metrics = trainer.train(
    #     train_data=train_data,
    #     train_labels=train_labels,
    #     val_data=val_data,
    #     val_labels=val_labels,
    #     num_epochs=100,
    #     batch_size=32,
    #     patience=10
    # ) 