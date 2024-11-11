from ebaysdk.finding import Connection as Finding
from ebaysdk.exception import ConnectionError
import os

try:
    api = Finding(config_file='/Users/andre/Documents/Sandbox/WatchGame/ebay.yaml', domain='svcs.ebay.com')
    response = api.execute('findCompletedItems', {
        'keywords': 'luxury watch',
        'itemFilter': [
            {'name': 'SoldItemsOnly', 'value': 'true'}
        ],
        'paginationInput': {
            'entriesPerPage': 1,
            'pageNumber': 1
        }
    })
    items = response.reply.searchResult.item
    for item in items:
        print(f"Title: {item.title}, Price: {item.sellingStatus.currentPrice.value}")
except ConnectionError as e:
    print(f"Error: {e}")
