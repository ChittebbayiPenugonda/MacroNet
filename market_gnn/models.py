import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, GATConv, global_mean_pool
from torch_geometric.data import Data, Batch
from typing import List, Tuple

class MarketGNN(nn.Module):
    def __init__(
        self,
        input_dim: int,
        hidden_dim: int = 64,
        num_layers: int = 3,
        dropout: float = 0.5,
        use_attention: bool = True
    ):
        super(MarketGNN, self).__init__()
        
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        self.dropout = dropout
        self.use_attention = use_attention
        
        # Input layer
        if use_attention:
            self.conv_layers = nn.ModuleList([
                GATConv(input_dim, hidden_dim, heads=8, dropout=dropout)
            ])
            # Additional GAT layers
            self.conv_layers.extend([
                GATConv(hidden_dim * 8, hidden_dim, heads=8, dropout=dropout)
                for _ in range(num_layers - 2)
            ])
            # Output GAT layer
            self.conv_layers.append(
                GATConv(hidden_dim * 8, hidden_dim, heads=1, dropout=dropout)
            )
        else:
            self.conv_layers = nn.ModuleList([
                GCNConv(input_dim, hidden_dim)
            ])
            # Additional GCN layers
            self.conv_layers.extend([
                GCNConv(hidden_dim, hidden_dim)
                for _ in range(num_layers - 1)
            ])
        
        # Batch normalization layers
        self.batch_norms = nn.ModuleList([
            nn.BatchNorm1d(hidden_dim)
            for _ in range(num_layers)
        ])
        
        # Output layers
        self.fc1 = nn.Linear(hidden_dim, hidden_dim // 2)
        self.fc2 = nn.Linear(hidden_dim // 2, 2)  # Binary classification
        
        # Layer normalization
        self.layer_norm = nn.LayerNorm(hidden_dim)
        
        # Weight initialization
        self.apply(self._init_weights)
    
    def _init_weights(self, module):
        if isinstance(module, (nn.Linear, GCNConv)):
            nn.init.xavier_uniform_(module.weight)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
    
    def forward(self, data: Data) -> torch.Tensor:
        x, edge_index = data.x, data.edge_index
        
        # Graph convolution layers with residual connections
        for i, (conv, bn) in enumerate(zip(self.conv_layers, self.batch_norms)):
            identity = x
            
            # Apply convolution
            if self.use_attention and i < self.num_layers - 1:
                x = conv(x, edge_index)
                x = x.view(-1, self.hidden_dim * 8)  # Reshape for multi-head attention
            else:
                x = conv(x, edge_index)
            
            # Apply batch normalization
            x = bn(x)
            
            # Apply activation and dropout
            x = F.elu(x)
            x = F.dropout(x, p=self.dropout, training=self.training)
            
            # Add residual connection if dimensions match
            if x.size(-1) == identity.size(-1):
                x = x + identity
        
        # Apply layer normalization
        x = self.layer_norm(x)
        
        # Global pooling
        x = global_mean_pool(x, data.batch)
        
        # Final classification layers
        x = F.dropout(x, p=self.dropout, training=self.training)
        x = F.elu(self.fc1(x))
        x = F.dropout(x, p=self.dropout, training=self.training)
        x = self.fc2(x)
        
        return F.log_softmax(x, dim=1)

class TemporalAttention(nn.Module):
    def __init__(self, hidden_dim: int):
        super(TemporalAttention, self).__init__()
        self.attention = nn.Linear(hidden_dim, 1)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x shape: (batch_size, sequence_length, hidden_dim)
        attention_weights = F.softmax(self.attention(x), dim=1)
        attended = torch.sum(attention_weights * x, dim=1)
        return attended

class MarketCrashPredictor:
    def __init__(
        self,
        model: MarketGNN,
        device: torch.device,
        learning_rate: float = 0.001,
        weight_decay: float = 0.01
    ):
        self.model = model.to(device)
        self.device = device
        self.optimizer = torch.optim.AdamW(
            model.parameters(),
            lr=learning_rate,
            weight_decay=weight_decay
        )
        self.scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer,
            mode='min',
            factor=0.5,
            patience=5,
            verbose=True
        )
    
    def train_step(
        self,
        data: Data,
        labels: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        self.model.train()
        self.optimizer.zero_grad()
        
        # Forward pass
        data = data.to(self.device)
        labels = labels.to(self.device)
        out = self.model(data)
        
        # Calculate loss with class weighting
        class_weights = self._calculate_class_weights(labels)
        loss = F.nll_loss(out, labels, weight=class_weights)
        
        # Backward pass
        loss.backward()
        
        # Gradient clipping
        torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
        
        self.optimizer.step()
        
        return loss, out
    
    def validate_step(
        self,
        data: Data,
        labels: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        self.model.eval()
        with torch.no_grad():
            data = data.to(self.device)
            labels = labels.to(self.device)
            out = self.model(data)
            loss = F.nll_loss(out, labels)
        return loss, out
    
    def _calculate_class_weights(self, labels: torch.Tensor) -> torch.Tensor:
        """Calculate class weights to handle imbalanced data"""
        class_counts = torch.bincount(labels)
        total = len(labels)
        weights = total / (class_counts * len(class_counts))
        return weights.to(self.device)
    
    def predict(self, data: Data) -> torch.Tensor:
        """Make predictions on new data"""
        self.model.eval()
        with torch.no_grad():
            data = data.to(self.device)
            out = self.model(data)
            pred = torch.exp(out)
        return pred
    
    def save_model(self, path: str):
        """Save model state"""
        torch.save({
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
        }, path)
    
    def load_model(self, path: str):
        """Load model state"""
        checkpoint = torch.load(path)
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict']) 