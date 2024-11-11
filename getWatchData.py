import requests
import json
import os
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from the environment variable
app_id = os.getenv("EBAY_API_KEY")

def fetch_single_watch_listing(app_id, keywords="luxury watch"):
    base_url = "https://svcs.ebay.com/services/search/FindingService/v1"
    #base_url = "https://svcs.sandbox.ebay.com/services/search/FindingService/v1"
    params = {
        'OPERATION-NAME': 'findCompletedItems',
        'SERVICE-VERSION': '1.0.0',
        'SECURITY-APPNAME': app_id,
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': 'true',
        'keywords': keywords,
        'itemFilter(0).name': 'SoldItemsOnly',
        'itemFilter(0).value': 'true',
        'paginationInput.entriesPerPage': 1,  # Only fetch one item
        'paginationInput.pageNumber': 1
    }

    # Construct and print the full URL
    full_url = requests.Request('GET', base_url, params=params).prepare().url
    print("API URL being called:", full_url)

    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        # Check if the response contains valid data
        if 'errorMessage' in data:
            print("Error in API request:", data['errorMessage'])
            return None
        if 'searchResult' not in data['findCompletedItemsResponse'][0] or data['findCompletedItemsResponse'][0]['searchResult'][0]['@count'] == '0':
            print("No items found.")
            return None

        # Extract the first item
        item = data['findCompletedItemsResponse'][0]['searchResult'][0]['item'][0]
        return item

    except Exception as e:
        print("Error fetching data:", e)
        return None

# Fetch a single watch listing
watch_listing = fetch_single_watch_listing(app_id)

# Save the watch listing to a JSON file
if watch_listing:
    with open('WatchDatabase.json', 'w') as f:
        json.dump(watch_listing, f, indent=4)
    print("Watch listing saved to WatchDatabase.json")
else:
    print("No watch listing was saved.")

