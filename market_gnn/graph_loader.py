from neo4j import GraphDatabase
import logging
from pathlib import Path
import json
from tqdm import tqdm
import networkx as nx
from typing import Dict, Any

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class GraphLoader:
    def __init__(
        self,
        neo4j_uri: str,
        neo4j_user: str,
        neo4j_password: str,
        data_dir: str = "data"
    ):
        """Initialize GraphLoader with credentials"""
        self.driver = GraphDatabase.driver(
            neo4j_uri,
            auth=(neo4j_user, neo4j_password)
        )
        self.data_dir = Path(data_dir)
    
    def close(self):
        """Close the Neo4j driver"""
        self.driver.close()
    
    def setup_database(self):
        """Setup Neo4j database with necessary indexes and constraints"""
        with self.driver.session() as session:
            # Create constraints
            session.run("""
                CREATE CONSTRAINT entity_name_type IF NOT EXISTS
                FOR (e:Entity) REQUIRE (e.name, e.type) IS UNIQUE
            """)
            
            session.run("""
                CREATE CONSTRAINT article_id IF NOT EXISTS
                FOR (a:Article) REQUIRE a.id IS UNIQUE
            """)
            
            # Create indexes
            session.run("""
                CREATE INDEX entity_type IF NOT EXISTS
                FOR (e:Entity) ON (e.type)
            """)
            
            session.run("""
                CREATE INDEX relation_type IF NOT EXISTS
                FOR ()-[r:RELATES]-() ON (r.type)
            """)
            
            logger.info("Database setup completed")
    
    def create_entity_node(self, tx, entity: str, entity_type: str, mentions: int):
        """Create an Entity node in Neo4j"""
        query = """
        MERGE (e:Entity {name: $name, type: $type})
        SET e.mentions = $mentions
        RETURN e
        """
        result = tx.run(
            query,
            name=entity,
            type=entity_type,
            mentions=mentions
        )
        return result.single()
    
    def create_relation(self, tx, subject: str, object: str, relation_type: str, weight: int):
        """Create a relation between entities"""
        query = """
        MATCH (s:Entity {name: $subject})
        MATCH (o:Entity {name: $object})
        MERGE (s)-[r:RELATES {type: $type}]->(o)
        SET r.weight = $weight
        RETURN r
        """
        result = tx.run(
            query,
            subject=subject,
            object=object,
            type=relation_type,
            weight=weight
        )
        return result.single()
    
    def create_article_relation(self, tx, article_id: str, entity: str):
        """Create a relation between article and entity"""
        query = """
        MATCH (a:Article {id: $article_id})
        MATCH (e:Entity {name: $entity})
        MERGE (a)-[r:MENTIONS]->(e)
        RETURN r
        """
        result = tx.run(
            query,
            article_id=article_id,
            entity=entity
        )
        return result.single()
    
    def load_correlation_graph(self):
        """Load correlation graph into Neo4j"""
        logger.info("Loading correlation graph into Neo4j...")
        
        # Setup database
        self.setup_database()
        
        # Load processed data
        nlp_dir = self.data_dir / "news_data" / "nlp_processed"
        with open(nlp_dir / "processed_articles.json", 'r', encoding='utf-8') as f:
            processed_articles = json.load(f)
        
        # Load graph
        graph = nx.read_gexf(nlp_dir / "correlation_graph.gexf")
        
        with self.driver.session() as session:
            # Create entity nodes
            logger.info("Creating entity nodes...")
            for node, data in tqdm(graph.nodes(data=True)):
                session.write_transaction(
                    self.create_entity_node,
                    node,
                    data['type'],
                    data['mentions']
                )
            
            # Create relations between entities
            logger.info("Creating entity relations...")
            for u, v, data in tqdm(graph.edges(data=True)):
                for rel_type in data['types']:
                    session.write_transaction(
                        self.create_relation,
                        u, v, rel_type,
                        data['weight']
                    )
            
            # Create article-entity relations
            logger.info("Creating article-entity relations...")
            for article in tqdm(processed_articles):
                article_id = article['article_id']
                for entity_type, entities in article['entities'].items():
                    for entity in entities:
                        session.write_transaction(
                            self.create_article_relation,
                            article_id,
                            entity
                        )
        
        logger.info("Graph loading completed!")
    
    def get_graph_statistics(self) -> Dict[str, Any]:
        """Get statistics about the loaded graph"""
        with self.driver.session() as session:
            # Count nodes by type
            node_counts = session.run("""
                MATCH (e:Entity)
                RETURN e.type as type, count(*) as count
                ORDER BY count DESC
            """).data()
            
            # Count relations by type
            relation_counts = session.run("""
                MATCH ()-[r:RELATES]->()
                RETURN r.type as type, count(*) as count
                ORDER BY count DESC
            """).data()
            
            # Get most connected entities
            top_entities = session.run("""
                MATCH (e:Entity)-[r:RELATES]-()
                RETURN e.name as name, e.type as type, count(r) as connections
                ORDER BY connections DESC
                LIMIT 10
            """).data()
            
            # Get most mentioned entities
            top_mentioned = session.run("""
                MATCH (e:Entity)
                RETURN e.name as name, e.type as type, e.mentions as mentions
                ORDER BY mentions DESC
                LIMIT 10
            """).data()
            
            return {
                'node_counts': node_counts,
                'relation_counts': relation_counts,
                'top_entities': top_entities,
                'top_mentioned': top_mentioned
            }

def main():
    # Get current directory
    current_dir = Path.cwd()
    data_dir = current_dir / "data"
    
    # Neo4j credentials
    neo4j_uri = "bolt://localhost:7687"
    neo4j_user = "neo4j"
    neo4j_password = "your_password"  # Change this
    
    # Initialize loader
    loader = GraphLoader(
        neo4j_uri=neo4j_uri,
        neo4j_user=neo4j_user,
        neo4j_password=neo4j_password,
        data_dir=str(data_dir)
    )
    
    try:
        # Load graph
        loader.load_correlation_graph()
        
        # Get and print statistics
        stats = loader.get_graph_statistics()
        
        logger.info("\nGraph Statistics:")
        
        logger.info("\nEntity counts by type:")
        for count in stats['node_counts']:
            logger.info(f"{count['type']}: {count['count']}")
        
        logger.info("\nRelation counts by type:")
        for count in stats['relation_counts']:
            logger.info(f"{count['type']}: {count['count']}")
        
        logger.info("\nTop 10 most connected entities:")
        for entity in stats['top_entities']:
            logger.info(f"{entity['name']} ({entity['type']}): {entity['connections']} connections")
        
        logger.info("\nTop 10 most mentioned entities:")
        for entity in stats['top_mentioned']:
            logger.info(f"{entity['name']} ({entity['type']}): {entity['mentions']} mentions")
            
    finally:
        loader.close()

if __name__ == "__main__":
    main() 