import time
from elasticsearch import Elasticsearch
import json

# Connect to Elasticsearch
client = Elasticsearch(
    "https://24fb4f8379ae4eb6b1bd73f04aca2b62.eastus2.azure.elastic-cloud.com/",
    api_key="Zm1KT0xKVUJfajQ0ZVJjQWtpQ0M6alM2eExpSTZSQ21KYXh4Z1JRdkhQZw=="
)


documents = []
for i in range(100000):
    document = {
        "name": f"Book {i+1}",
        "author": f"Author {i+1}",
        "release_date": f"2025-02-22",
        "page_count": 300,
        "_extract_binary_content": True,
        "_reduce_whitespace": True,
        "_run_ml_inference": True
    }
    documents.append({ "index": { "_index": "world", "_id": f"{9780000000000 + i}"}})
    documents.append(document)

start_time = time.time()

bulk_response = client.bulk(operations=documents, pipeline="ent-search-generic-ingestion")

end_time = time.time()

time_taken = end_time - start_time
print(f"Time taken to insert 100000 nodes: {time_taken:.2f} seconds")

search_response = client.search(index="world", q="book")
print(json.dumps(search_response.body, indent=2))

client.search(index = "world", q= "snow")


