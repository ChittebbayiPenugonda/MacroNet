import pandas as pd
import json
from pathlib import Path
import logging
from typing import Dict, List, Optional
import networkx as nx

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DataValidator:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.news_data_dir = self.data_dir / "news_data"
        self.validation_results = {}
    
    def validate_raw_data(self) -> Dict:
        """Validate raw CSV data"""
        raw_dir = self.news_data_dir / "raw"
        results = {"raw_data": {"status": "pending", "issues": []}}
        
        try:
            # Check if raw directory exists
            if not raw_dir.exists():
                results["raw_data"]["issues"].append("Raw data directory not found")
                results["raw_data"]["status"] = "failed"
                return results
            
            # Find CSV files
            csv_files = list(raw_dir.glob("*.csv"))
            if not csv_files:
                results["raw_data"]["issues"].append("No CSV files found")
                results["raw_data"]["status"] = "failed"
                return results
            
            # Validate CSV structure
            df = pd.read_csv(csv_files[0])
            required_columns = [
                "title", "content", "published_date", 
                "source", "category", "country", "url"
            ]
            
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                results["raw_data"]["issues"].append(
                    f"Missing required columns: {missing_columns}"
                )
            
            # Check for null values
            null_counts = df[required_columns].isnull().sum()
            for col, count in null_counts.items():
                if count > 0:
                    results["raw_data"]["issues"].append(
                        f"Found {count} null values in {col}"
                    )
            
            # Check data types
            if not pd.to_datetime(df['published_date'], errors='coerce').notna().all():
                results["raw_data"]["issues"].append(
                    "Invalid date format in published_date column"
                )
            
            if not results["raw_data"]["issues"]:
                results["raw_data"]["status"] = "passed"
            else:
                results["raw_data"]["status"] = "failed"
            
        except Exception as e:
            results["raw_data"]["issues"].append(f"Error validating raw data: {str(e)}")
            results["raw_data"]["status"] = "failed"
        
        return results
    
    def validate_processed_data(self) -> Dict:
        """Validate processed JSON data"""
        processed_dir = self.news_data_dir / "processed"
        results = {"processed_data": {"status": "pending", "issues": []}}
        
        try:
            # Check if processed directory exists
            if not processed_dir.exists():
                results["processed_data"]["issues"].append("Processed data directory not found")
                results["processed_data"]["status"] = "failed"
                return results
            
            # Check index file
            index_file = processed_dir / "articles_index.json"
            if not index_file.exists():
                results["processed_data"]["issues"].append("Articles index file not found")
                results["processed_data"]["status"] = "failed"
                return results
            
            # Validate index structure
            with open(index_file, 'r', encoding='utf-8') as f:
                index_data = json.load(f)
            
            if 'total_articles' not in index_data or 'articles' not in index_data:
                results["processed_data"]["issues"].append(
                    "Invalid index file structure"
                )
            
            # Validate individual article files
            for article in index_data.get('articles', []):
                article_file = processed_dir / f"article_{article['id']}.json"
                if not article_file.exists():
                    results["processed_data"]["issues"].append(
                        f"Missing article file: {article_file.name}"
                    )
            
            if not results["processed_data"]["issues"]:
                results["processed_data"]["status"] = "passed"
            else:
                results["processed_data"]["status"] = "failed"
            
        except Exception as e:
            results["processed_data"]["issues"].append(
                f"Error validating processed data: {str(e)}"
            )
            results["processed_data"]["status"] = "failed"
        
        return results
    
    def validate_nlp_processed_data(self) -> Dict:
        """Validate NLP processed data"""
        nlp_dir = self.news_data_dir / "nlp_processed"
        results = {"nlp_data": {"status": "pending", "issues": []}}
        
        try:
            # Check if NLP directory exists
            if not nlp_dir.exists():
                results["nlp_data"]["issues"].append("NLP processed data directory not found")
                results["nlp_data"]["status"] = "failed"
                return results
            
            # Check processed articles file
            articles_file = nlp_dir / "processed_articles.json"
            if not articles_file.exists():
                results["nlp_data"]["issues"].append("Processed articles file not found")
                results["nlp_data"]["status"] = "failed"
                return results
            
            # Validate processed articles structure
            with open(articles_file, 'r', encoding='utf-8') as f:
                articles_data = json.load(f)
            
            for article in articles_data:
                if not all(k in article for k in ['article_id', 'entities', 'relations']):
                    results["nlp_data"]["issues"].append(
                        f"Invalid article structure for article {article.get('article_id')}"
                    )
            
            # Check correlation graph file
            graph_file = nlp_dir / "correlation_graph.gexf"
            if not graph_file.exists():
                results["nlp_data"]["issues"].append("Correlation graph file not found")
            else:
                # Validate graph structure
                try:
                    graph = nx.read_gexf(graph_file)
                    if not nx.is_connected(graph):
                        results["nlp_data"]["issues"].append("Graph is not connected")
                except Exception as e:
                    results["nlp_data"]["issues"].append(f"Invalid graph file: {str(e)}")
            
            if not results["nlp_data"]["issues"]:
                results["nlp_data"]["status"] = "passed"
            else:
                results["nlp_data"]["status"] = "failed"
            
        except Exception as e:
            results["nlp_data"]["issues"].append(
                f"Error validating NLP processed data: {str(e)}"
            )
            results["nlp_data"]["status"] = "failed"
        
        return results
    
    def validate_all(self) -> Dict:
        """Run all validations"""
        logger.info("Starting data validation...")
        
        self.validation_results = {}
        self.validation_results.update(self.validate_raw_data())
        self.validation_results.update(self.validate_processed_data())
        self.validation_results.update(self.validate_nlp_processed_data())
        
        # Calculate overall status
        failed = any(v["status"] == "failed" for v in self.validation_results.values())
        self.validation_results["overall_status"] = "failed" if failed else "passed"
        
        return self.validation_results
    
    def print_validation_report(self):
        """Print a formatted validation report"""
        if not self.validation_results:
            logger.warning("No validation results available. Run validate_all() first.")
            return
        
        logger.info("\n=== Data Validation Report ===\n")
        
        for stage, results in self.validation_results.items():
            if stage == "overall_status":
                continue
                
            logger.info(f"{stage}:")
            logger.info(f"Status: {results['status']}")
            
            if results["issues"]:
                logger.info("Issues found:")
                for issue in results["issues"]:
                    logger.info(f"  - {issue}")
            else:
                logger.info("No issues found")
            
            logger.info("")
        
        logger.info(f"Overall Status: {self.validation_results['overall_status']}")

def main():
    try:
        # Initialize validator
        validator = DataValidator()
        
        # Run validation
        results = validator.validate_all()
        
        # Print report
        validator.print_validation_report()
        
    except Exception as e:
        logger.error(f"Error during validation: {str(e)}")
        raise

if __name__ == "__main__":
    main() 