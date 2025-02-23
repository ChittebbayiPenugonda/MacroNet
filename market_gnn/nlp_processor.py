import spacy
import logging
from typing import Dict, List, Tuple, Set
from pathlib import Path
import json
from tqdm import tqdm
from collections import defaultdict
import networkx as nx

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class NLPProcessor:
    def __init__(self, model_name: str = "en_core_web_sm"):
        """Initialize NLP processor with spaCy model"""
        logger.info(f"Loading spaCy model: {model_name}")
        self.nlp = spacy.load(model_name)
        
        # Configure pipeline for better performance
        self.nlp.add_pipe("merge_entities")
        self.nlp.add_pipe("merge_noun_chunks")
        
        # Entity types we're interested in
        self.entity_types = {
            'ORG',      # Organizations
            'PERSON',   # People
            'GPE',      # Countries, cities, states
            'NORP',     # Nationalities, religious or political groups
            'PRODUCT',  # Products
            'EVENT',    # Events
            'MONEY',    # Monetary values
            'PERCENT',  # Percentages
            'DATE',     # Dates
            'FAC',      # Facilities
        }
        
        # Relation patterns
        self.relation_patterns = {
            'ownership': ['own', 'acquire', 'purchase', 'buy', 'merge'],
            'partnership': ['partner', 'collaborate', 'work with', 'alliance'],
            'competition': ['compete', 'rival', 'versus', 'against'],
            'supply': ['supply', 'provide', 'deliver', 'sell to'],
            'investment': ['invest', 'fund', 'finance', 'back'],
            'employment': ['hire', 'employ', 'appoint', 'name'],
            'impact': ['affect', 'impact', 'influence', 'drive'],
            'correlation': ['correlate', 'relate', 'link', 'connect'],
        }
    
    def process_article(self, article: Dict) -> Dict:
        """Process a single article and extract entities and relations"""
        # Combine title and content
        text = f"{article.get('title', '')} {article.get('content', '')}"
        doc = self.nlp(text)
        
        # Extract entities
        entities = self._extract_entities(doc)
        
        # Extract relations
        relations = self._extract_relations(doc)
        
        # Add metadata relations
        metadata_relations = self._extract_metadata_relations(article)
        relations.extend(metadata_relations)
        
        return {
            'article_id': article['id'],
            'entities': entities,
            'relations': relations
        }
    
    def _extract_entities(self, doc) -> Dict[str, Set[str]]:
        """Extract and categorize named entities"""
        entities = defaultdict(set)
        
        # Extract named entities
        for ent in doc.ents:
            if ent.label_ in self.entity_types:
                entities[ent.label_].add(ent.text)
        
        # Extract noun chunks as potential entities
        for chunk in doc.noun_chunks:
            if not any(ent.text == chunk.text for ent in doc.ents):
                entities['NOUN_PHRASE'].add(chunk.text)
        
        return {k: list(v) for k, v in entities.items()}
    
    def _extract_relations(self, doc) -> List[Dict]:
        """Extract relations between entities"""
        relations = []
        
        # Process each sentence
        for sent in doc.sents:
            # Find main verb and its arguments
            for token in sent:
                if token.pos_ == "VERB":
                    # Get subject and object
                    subj = self._find_subject(token)
                    obj = self._find_object(token)
                    
                    if subj and obj:
                        relation_type = self._classify_relation(token.lemma_)
                        relations.append({
                            'subject': subj.text,
                            'predicate': token.lemma_,
                            'object': obj.text,
                            'type': relation_type,
                            'sentence': sent.text
                        })
        
        return relations
    
    def _find_subject(self, verb):
        """Find the subject of a verb"""
        for token in verb.lefts:
            if token.dep_ in {"nsubj", "nsubjpass"}:
                return token
        return None
    
    def _find_object(self, verb):
        """Find the object of a verb"""
        for token in verb.rights:
            if token.dep_ in {"dobj", "pobj"}:
                return token
        return None
    
    def _classify_relation(self, verb: str) -> str:
        """Classify the type of relation based on the verb"""
        for rel_type, patterns in self.relation_patterns.items():
            if any(pattern in verb.lower() for pattern in patterns):
                return rel_type
        return "general"
    
    def _extract_metadata_relations(self, article: Dict) -> List[Dict]:
        """Extract relations from article metadata"""
        relations = []
        
        # Add source relation
        if article.get('source'):
            relations.append({
                'subject': article['source'],
                'predicate': 'publishes',
                'object': article.get('title', ''),
                'type': 'publication',
                'sentence': None
            })
        
        # Add category relation
        if article.get('category'):
            relations.append({
                'subject': article.get('title', ''),
                'predicate': 'belongs_to',
                'object': article['category'],
                'type': 'categorization',
                'sentence': None
            })
        
        # Add country relation
        if article.get('country'):
            relations.append({
                'subject': article.get('title', ''),
                'predicate': 'originates_from',
                'object': article['country'],
                'type': 'location',
                'sentence': None
            })
        
        return relations
    
    def build_correlation_graph(self, processed_articles: List[Dict]) -> nx.Graph:
        """Build a correlation graph from processed articles"""
        G = nx.Graph()
        
        # Add entities as nodes
        for article in processed_articles:
            for entity_type, entities in article['entities'].items():
                for entity in entities:
                    if not G.has_node(entity):
                        G.add_node(entity, type=entity_type, mentions=1)
                    else:
                        G.nodes[entity]['mentions'] += 1
        
        # Add edges based on relations
        for article in processed_articles:
            for relation in article['relations']:
                subj = relation['subject']
                obj = relation['object']
                rel_type = relation['type']
                
                if G.has_edge(subj, obj):
                    G[subj][obj]['weight'] += 1
                    G[subj][obj]['types'].add(rel_type)
                else:
                    G.add_edge(subj, obj, weight=1, types={rel_type})
        
        return G
    
    def process_dataset(self, data_dir: str) -> Tuple[List[Dict], nx.Graph]:
        """Process entire dataset and build correlation graph"""
        data_dir = Path(data_dir)
        processed_dir = data_dir / "processed"
        
        # Load articles index
        with open(processed_dir / "articles_index.json", 'r', encoding='utf-8') as f:
            data = json.load(f)
            articles = data['articles']
        
        # Process articles
        processed_articles = []
        for article in tqdm(articles, desc="Processing articles"):
            processed = self.process_article(article)
            processed_articles.append(processed)
        
        # Build correlation graph
        graph = self.build_correlation_graph(processed_articles)
        
        # Save processed data
        output_dir = data_dir / "nlp_processed"
        output_dir.mkdir(exist_ok=True)
        
        with open(output_dir / "processed_articles.json", 'w', encoding='utf-8') as f:
            json.dump(processed_articles, f, indent=4, ensure_ascii=False)
        
        # Save graph
        nx.write_gexf(graph, output_dir / "correlation_graph.gexf")
        
        return processed_articles, graph

def main():
    try:
        # Initialize processor
        processor = NLPProcessor()
        
        # Get the correct data directory (relative to this script)
        current_dir = Path(__file__).parent
        data_dir = current_dir / "data" / "news_data"
        
        if not data_dir.exists():
            raise FileNotFoundError(
                f"Data directory not found: {data_dir}\n"
                "Please run kaggle_data_loader.py first to prepare the data."
            )
        
        # Process dataset
        logger.info(f"Processing data from: {data_dir}")
        processed_articles, graph = processor.process_dataset(data_dir)
        
        # Print statistics
        logger.info(f"Processed {len(processed_articles)} articles")
        logger.info(f"Graph has {graph.number_of_nodes()} nodes and {graph.number_of_edges()} edges")
        
        # Print most connected entities
        top_entities = sorted(
            graph.nodes(data=True),
            key=lambda x: graph.degree(x[0]),
            reverse=True
        )[:10]
        
        logger.info("\nTop 10 most connected entities:")
        for entity, data in top_entities:
            logger.info(f"{entity} ({data['type']}): {graph.degree(entity)} connections")
            
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}")
        raise

if __name__ == "__main__":
    main() 