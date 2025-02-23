from neo4j import GraphDatabase
import logging
from typing import List, Dict, Any
import json
from pathlib import Path
from tqdm import tqdm
import spacy
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class NewsLoader:
    def __init__(
        self,
        neo4j_uri: str,
        neo4j_user: str,
        neo4j_password: str,
        data_dir: str = "data"
    ):
        """Initialize NewsLoader with credentials"""
        self.driver = GraphDatabase.driver(
            neo4j_uri,
            auth=(neo4j_user, neo4j_password)
        )
        
        # Setup data directory
        self.data_dir = Path(data_dir)
        self.news_data_dir = self.data_dir / "news_data" / "processed"
        
        # Load spaCy model for entity extraction
        logger.info("Loading spaCy model...")
        self.nlp = spacy.load("en_core_web_sm")
        
    def close(self):
        """Close the Neo4j driver"""
        self.driver.close()
    
    def setup_database(self):
        """Setup Neo4j database with necessary indexes and constraints"""
        with self.driver.session() as session:
            # Create constraints
            session.run("""
                CREATE CONSTRAINT article_id IF NOT EXISTS
                FOR (a:Article) REQUIRE a.id IS UNIQUE
            """)
            
            session.run("""
                CREATE CONSTRAINT entity_name IF NOT EXISTS
                FOR (e:Entity) REQUIRE (e.name, e.type) IS UNIQUE
            """)
            
            # Create indexes
            session.run("""
                CREATE INDEX article_date IF NOT EXISTS
                FOR (a:Article) ON (a.published_date)
            """)
            
            session.run("""
                CREATE INDEX article_category IF NOT EXISTS
                FOR (a:Article) ON (a.category)
            """)
            
            session.run("""
                CREATE INDEX entity_type IF NOT EXISTS
                FOR (e:Entity) ON (e.type)
            """)
            
            logger.info("Database setup completed")
    
    def create_article_node(self, tx, article: Dict[str, Any]):
        """Create an Article node in Neo4j"""
        query = """
        MERGE (a:Article {id: $id})
        SET a.title = $title,
            a.content = $content,
            a.published_date = datetime($published_date),
            a.url = $url,
            a.source = $source,
            a.category = $category,
            a.country = $country,
            a.local_path = $local_path
        RETURN a
        """
        
        # Format the date
        try:
            published_date = datetime.strptime(
                article.get('published_date', ''),
                '%Y-%m-%d %H:%M:%S'
            ).strftime('%Y-%m-%dT%H:%M:%S')
        except:
            published_date = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        
        # Get local file path
        local_path = str(self.news_data_dir / f"article_{article['id']}.json")
        
        result = tx.run(
            query,
            id=article['id'],
            title=article.get('title', ''),
            content=article.get('content', ''),
            published_date=published_date,
            url=article.get('url', ''),
            source=article.get('source', ''),
            category=article.get('category', ''),
            country=article.get('country', ''),
            local_path=local_path
        )
        return result.single()
    
    def create_entity_node(self, tx, entity: str, entity_type: str):
        """Create an Entity node in Neo4j"""
        query = """
        MERGE (e:Entity {name: $name, type: $type})
        RETURN e
        """
        result = tx.run(query, name=entity, type=entity_type)
        return result.single()
    
    def create_relationship(self, tx, article_id: str, entity: str, entity_type: str):
        """Create relationship between Article and Entity"""
        query = """
        MATCH (a:Article {id: $article_id})
        MATCH (e:Entity {name: $entity, type: $entity_type})
        MERGE (a)-[r:MENTIONS]->(e)
        RETURN r
        """
        result = tx.run(
            query,
            article_id=article_id,
            entity=entity,
            entity_type=entity_type
        )
        return result.single()
    
    def load_news_data(self):
        """Load news data into Neo4j"""
        logger.info("Starting news data loading...")
        
        # Setup database
        self.setup_database()
        
        # Load articles index
        index_file = self.news_data_dir / "articles_index.json"
        if not index_file.exists():
            raise FileNotFoundError(f"Articles index not found at {index_file}")
        
        with open(index_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            articles = data['articles']
        
        total_articles = 0
        with self.driver.session() as session:
            for article in tqdm(articles, desc="Loading articles"):
                # Create article node
                session.write_transaction(
                    self.create_article_node,
                    article
                )
                
                # Extract and create entities
                entities = self._extract_entities(article)
                for entity_type, entity_names in entities.items():
                    for entity in entity_names:
                        # Create entity node
                        session.write_transaction(
                            self.create_entity_node,
                            entity,
                            entity_type
                        )
                        
                        # Create relationship
                        session.write_transaction(
                            self.create_relationship,
                            article['id'],
                            entity,
                            entity_type
                        )
                
                total_articles += 1
        
        logger.info(f"Completed loading {total_articles} articles")
    
    def _extract_entities(self, article: Dict[str, Any]) -> Dict[str, List[str]]:
        """Extract entities from article using spaCy"""
        entities = {
            'ORG': set(),
            'PERSON': set(),
            'GPE': set(),  # Countries, cities, states
            'NORP': set(), # Nationalities, religious or political groups
            'PRODUCT': set(),
            'EVENT': set()
        }
        
        # Add basic metadata
        entities['SOURCE'] = {article.get('source', '')}
        entities['CATEGORY'] = {article.get('category', '')}
        entities['COUNTRY'] = {article.get('country', '')}
        
        # Process title and content with spaCy
        text = f"{article.get('title', '')} {article.get('content', '')}"
        doc = self.nlp(text)
        
        # Extract named entities
        for ent in doc.ents:
            if ent.label_ in entities:
                entities[ent.label_].add(ent.text)
        
        # Convert sets to lists and filter empty values
        return {k: list(v) for k, v in entities.items() if v and '' not in v}

def main():
    # Get current directory
    current_dir = Path.cwd()
    data_dir = current_dir / "data"
    
    # Neo4j credentials
    neo4j_uri = "bolt://localhost:7687"
    neo4j_user = "neo4j"
    neo4j_password = "your_password"  # Change this
    
    # Initialize loader
    loader = NewsLoader(
        neo4j_uri=neo4j_uri,
        neo4j_user=neo4j_user,
        neo4j_password=neo4j_password,
        data_dir=str(data_dir)
    )
    
    try:
        # Load news data
        loader.load_news_data()
    finally:
        loader.close()

if __name__ == "__main__":
    main() 