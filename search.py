import time
from elasticsearch import Elasticsearch
from concurrent.futures import ThreadPoolExecutor
import json

client = Elasticsearch(
    "https://24fb4f8379ae4eb6b1bd73f04aca2b62.eastus2.azure.elastic-cloud.com/",
    api_key="Zm1KT0xKVUJfajQ0ZVJjQWtpQ0M6alM2eExpSTZSQ21KYXh4Z1JRdkhQZw=="
)

def search_scroll(client, index, query, scroll='2m', size=1000):
    query['size'] = size
    
    response = client.search(
        index=index,
        body=query,
        scroll=scroll
    )
    scroll_id = response['_scroll_id']
    hits = response['hits']['hits']

    while len(hits) > 0:
        print(f"Retrieved {len(hits)} hits")
    
        for hit in hits:
            yield hit['_source']

        response = client.scroll(
            scroll_id=scroll_id,
            scroll=scroll
        )
        scroll_id = response['_scroll_id']
        hits = response['hits']['hits']
        print(f"Retrieved {len(hits)} hits")

def search_parallel(client, index, query, num_threads=4):
    batch_size = 1000
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(search_scroll, client, index, query) for _ in range(num_threads)]
        results = []
        for future in futures:
            for doc in future.result():
                results.append(doc)

        return results
    
query = {
    "query": {
        "match": {
            "text": "book"
        }
    }
}

start_time = time.time()

results = search_parallel(client, "world", query)

for doc in results[:10]:  
    print(json.dumps(doc, indent=2))
end_time = time.time()

time_taken = end_time - start_time
print(f"Time taken for search and processing: {time_taken:.2f} seconds")
