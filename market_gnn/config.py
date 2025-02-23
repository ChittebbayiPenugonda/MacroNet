import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Project paths
    PROJECT_ROOT = Path(__file__).parent
    DATA_DIR = PROJECT_ROOT / "data"
    NEWS_DATA_DIR = DATA_DIR / "news_data"
    
    # Neo4j configuration
    NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
    
    # Kaggle configuration
    KAGGLE_USERNAME = os.getenv("KAGGLE_USERNAME")
    KAGGLE_KEY = os.getenv("KAGGLE_KEY")
    KAGGLE_DATASET_PATH = os.getenv("KAGGLE_DATASET_PATH")
    
    # Elasticsearch configuration
    ELASTICSEARCH_HOST = os.getenv("ELASTICSEARCH_HOST", "localhost")
    ELASTICSEARCH_PORT = int(os.getenv("ELASTICSEARCH_PORT", "9200"))
    ELASTICSEARCH_USER = os.getenv("ELASTICSEARCH_USER", "elastic")
    ELASTICSEARCH_PASSWORD = os.getenv("ELASTICSEARCH_PASSWORD")
    
    # Logging configuration
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE = os.getenv("LOG_FILE", "market_gnn.log")
    
    @classmethod
    def validate(cls):
        """Validate required configuration values"""
        required_vars = [
            ("NEO4J_PASSWORD", cls.NEO4J_PASSWORD),
            ("KAGGLE_USERNAME", cls.KAGGLE_USERNAME),
            ("KAGGLE_KEY", cls.KAGGLE_KEY),
            ("KAGGLE_DATASET_PATH", cls.KAGGLE_DATASET_PATH),
            ("ELASTICSEARCH_PASSWORD", cls.ELASTICSEARCH_PASSWORD),
        ]
        
        missing = [var for var, value in required_vars if not value]
        
        if missing:
            raise ValueError(
                f"Missing required environment variables: {', '.join(missing)}\n"
                "Please check your .env file and ensure all required variables are set."
            )
    
    @classmethod
    def setup_directories(cls):
        """Create necessary project directories"""
        dirs = [
            cls.DATA_DIR,
            cls.NEWS_DATA_DIR,
            cls.NEWS_DATA_DIR / "raw",
            cls.NEWS_DATA_DIR / "processed",
            cls.NEWS_DATA_DIR / "nlp_processed",
        ]
        
        for dir_path in dirs:
            dir_path.mkdir(parents=True, exist_ok=True)
            
    @classmethod
    def get_elasticsearch_config(cls):
        """Get Elasticsearch configuration as a dictionary"""
        return {
            "host": cls.ELASTICSEARCH_HOST,
            "port": cls.ELASTICSEARCH_PORT,
            "user": cls.ELASTICSEARCH_USER,
            "password": cls.ELASTICSEARCH_PASSWORD,
        }
    
    @classmethod
    def get_neo4j_config(cls):
        """Get Neo4j configuration as a dictionary"""
        return {
            "uri": cls.NEO4J_URI,
            "user": cls.NEO4J_USER,
            "password": cls.NEO4J_PASSWORD,
        }

# Initialize configuration
config = Config()

# Validate configuration on import
config.validate()

# Setup project directories
config.setup_directories() 