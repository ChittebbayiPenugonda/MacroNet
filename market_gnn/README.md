# Market Crash Prediction with Graph Neural Networks

This project implements a Graph Neural Network (GNN) model for predicting market crashes using asset price data, market features, and correlation networks.

## Overview

The model uses a combination of Graph Attention Networks (GAT) and Graph Convolutional Networks (GCN) to learn patterns in market data that may indicate upcoming market crashes. It processes historical market data into graph structures, where:

- Nodes represent individual assets
- Edges represent correlations between assets
- Node features include price returns and other market indicators
- The model predicts whether a market crash will occur within a specified time horizon

## Features

- Flexible graph neural network architecture with attention mechanism
- Temporal data processing with sliding windows
- Correlation-based edge creation
- Comprehensive data preprocessing pipeline
- Model training with early stopping and learning rate scheduling
- Detailed evaluation metrics and results logging

## Project Structure

```
market_gnn/
├── models.py           # GNN model architecture
├── data_processor.py   # Data preprocessing pipeline
├── run_pipeline.py     # Main training and evaluation script
├── config.json         # Configuration parameters
└── README.md          # Project documentation
```

## Requirements

- Python 3.8+
- PyTorch
- PyTorch Geometric
- pandas
- numpy
- scikit-learn
- networkx

Install dependencies:

```bash
pip install torch torch-geometric pandas numpy scikit-learn networkx
```

## Input Data Format

The pipeline expects three CSV files:

1. Price Data (`price_data.csv`):
   - Columns: date, asset_id, price
   - Daily price data for each asset

2. Feature Data (`feature_data.csv`):
   - Columns: date, asset_id, feature1, feature2, ...
   - Additional market indicators for each asset

3. Correlation Data (`correlation_data.csv`):
   - Columns: date, asset1, asset2, correlation
   - Pairwise asset correlations over time

## Configuration

The `config.json` file contains all model and training parameters:

```json
{
    "data_processing": {
        "window_size": 30,           # Days in each graph snapshot
        "prediction_horizon": 5,      # Days ahead to predict
        "crash_threshold": -0.1,      # Return threshold for crash label
        "min_connection_weight": 0.3  # Minimum correlation for edge creation
    },
    "model": {
        "hidden_dim": 128,           # Hidden layer dimension
        "num_layers": 3,             # Number of GNN layers
        "dropout": 0.5,              # Dropout rate
        "use_attention": true        # Use GAT instead of GCN
    },
    "training": {
        "device": "cuda",            # Training device (cuda/cpu)
        "learning_rate": 0.001,      # Initial learning rate
        "weight_decay": 0.01,        # L2 regularization
        "num_epochs": 100,           # Maximum training epochs
        "batch_size": 32,            # Batch size
        "patience": 10               # Early stopping patience
    }
}
```

## Usage

Run the training pipeline:

```bash
python run_pipeline.py \
    --config_path config.json \
    --price_path data/price_data.csv \
    --feature_path data/feature_data.csv \
    --correlation_path data/correlation_data.csv \
    --output_dir output/
```

## Output

The pipeline generates:

1. Processed Data:
   - Graph snapshots and labels
   - Feature scaler
   - Dataset statistics

2. Model Artifacts:
   - Trained model checkpoints
   - Training metrics history

3. Evaluation Results:
   - Classification report
   - Confusion matrix
   - Prediction probabilities

## Model Architecture

The GNN model consists of:

1. Input Layer:
   - Processes node features and edge attributes

2. Graph Layers:
   - Multiple GAT/GCN layers with residual connections
   - Batch normalization and dropout
   - Optional attention mechanism

3. Output Layer:
   - Global pooling of node features
   - Binary classification head

## Performance Metrics

The model is evaluated using:

- Precision
- Recall
- F1 Score
- ROC-AUC
- Confusion Matrix

## Contributing

Feel free to submit issues and enhancement requests! 