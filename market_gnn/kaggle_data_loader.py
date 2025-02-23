import shutil
import os
from pathlib import Path
import pandas as pd
import json
import logging
from tqdm import tqdm

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class KaggleDataLoader:
    def __init__(
        self,
        kaggle_source: str = r"C:\Users\tiahi\.cache\kagglehub\datasets\everydaycodings\global-news-dataset\versions\3",
        project_data_dir: str = None
    ):
        self.kaggle_source = Path(kaggle_source)
        if project_data_dir is None:
            # Use the market_gnn directory as base
            project_data_dir = Path(__file__).parent / "data"
        self.project_data_dir = Path(project_data_dir)
        self.news_data_dir = self.project_data_dir / "news_data"
        
        logger.info(f"Project data directory: {self.project_data_dir}")
        logger.info(f"News data directory: {self.news_data_dir}")
    
    def setup_directories(self):
        """Create necessary directories"""
        logger.info("Setting up directories...")
        
        # Create main directories
        self.project_data_dir.mkdir(parents=True, exist_ok=True)
        self.news_data_dir.mkdir(exist_ok=True)
        
        # Create subdirectories
        raw_dir = self.news_data_dir / "raw"
        processed_dir = self.news_data_dir / "processed"
        
        raw_dir.mkdir(exist_ok=True)
        processed_dir.mkdir(exist_ok=True)
        
        logger.info(f"Created directories:")
        logger.info(f"- Raw data: {raw_dir}")
        logger.info(f"- Processed data: {processed_dir}")
    
    def copy_dataset(self):
        """Copy Kaggle dataset to project directory"""
        logger.info(f"Copying dataset from: {self.kaggle_source}")
        
        if not self.kaggle_source.exists():
            raise FileNotFoundError(f"Kaggle source directory not found: {self.kaggle_source}")
        
        raw_dir = self.news_data_dir / "raw"
        
        # Copy all files from Kaggle cache
        files_copied = 0
        for file in self.kaggle_source.glob("*"):
            if file.is_file():
                dest = raw_dir / file.name
                shutil.copy2(file, dest)
                logger.info(f"Copied: {file.name} -> {dest}")
                files_copied += 1
        
        if files_copied == 0:
            raise FileNotFoundError(f"No files found in Kaggle source directory: {self.kaggle_source}")
        
        logger.info(f"Copied {files_copied} files to {raw_dir}")
    
    def process_news_data(self):
        """Process the news dataset into a suitable format"""
        logger.info("Processing news data...")
        
        # Find CSV files
        raw_dir = self.news_data_dir / "raw"
        csv_files = list(raw_dir.glob("*.csv"))
        
        if not csv_files:
            raise FileNotFoundError(f"No CSV files found in: {raw_dir}")
        
        logger.info(f"Found CSV file: {csv_files[0]}")
        
        # Read the CSV file
        df = pd.read_csv(csv_files[0])
        logger.info(f"Loaded {len(df)} articles from CSV")
        
        processed_dir = self.news_data_dir / "processed"
        
        # Process each news article
        processed_articles = []
        for idx, row in tqdm(df.iterrows(), total=len(df), desc="Processing articles"):
            article = {
                "id": str(idx),
                "title": row.get("title", ""),
                "content": row.get("content", ""),
                "published_date": row.get("published_date", ""),
                "source": row.get("source", ""),
                "category": row.get("category", ""),
                "country": row.get("country", ""),
                "url": row.get("url", "")
            }
            
            # Save individual article
            article_file = processed_dir / f"article_{article['id']}.json"
            with open(article_file, "w", encoding="utf-8") as f:
                json.dump(article, f, indent=4, ensure_ascii=False)
            
            processed_articles.append(article)
        
        # Save index file
        index_file = processed_dir / "articles_index.json"
        with open(index_file, "w", encoding="utf-8") as f:
            json.dump({
                "total_articles": len(processed_articles),
                "articles": processed_articles
            }, f, indent=4, ensure_ascii=False)
        
        logger.info(f"Processed {len(processed_articles)} articles")
        logger.info(f"Saved index file to: {index_file}")
        logger.info(f"Individual articles saved in: {processed_dir}")
        
        return processed_articles

def main():
    try:
        # Initialize loader
        loader = KaggleDataLoader()
        
        # Setup directories
        loader.setup_directories()
        
        # Copy dataset
        loader.copy_dataset()
        
        # Process data
        articles = loader.process_news_data()
        
        logger.info("Data loading and processing completed successfully!")
        logger.info(f"Total articles processed: {len(articles)}")
        
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}")
        raise

if __name__ == "__main__":
    main() 