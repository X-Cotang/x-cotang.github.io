---
title: [Part 3] Quantitative Trading: Getting Depth Data from the Crypto Market
date: 2024-04-18
category: finance
subCategory: Quantitative Trading
excerpt: Access to real-time market depth
---

In quantitative trading, access to real-time market depth (also known as Level 2 or DOM data) is crucial for designing and executing high-frequency or market-making strategies. In this section, we explore four approaches to obtaining depth data from crypto exchanges:

1. Understanding DOM (Depth of Market) Data
2. Using Exchange RESTful APIs
3. Using Official Exchange SDKs or Client Libraries
4. Using the CCXT Library

---

## Part 1: Understanding DOM (Depth of Market) Data

**Depth of Market (DOM)** is a real-time list of all outstanding buy and sell orders for a given trading pair, sorted by price level. It provides traders with:

- **Best Bid / Best Ask**: Highest buy price and lowest sell price.
- **Aggregate Depth**: Total volume available at each price level.
- **Order Flow Insight**: Emerging support/resistance levels.

### Key DOM Parameters

| Parameter         | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **price**         | Price level of the order book entry (string/float).                                       |
| **quantity**      | Amount of the asset available at that price (string/float).                               |
| **side**          | Direction: `bid` for buy orders, `ask` for sell orders.                                   |
| **timestamp**     | (Optional) UNIX epoch time when the snapshot was taken or last updated.                   |
| **firstUpdateId** | (WebSocket) First UID in this update batch, for reconciling partial order book snapshots. |
| **finalUpdateId** | (WebSocket) Last UID in this update batch.                                                |

### Example DOM Snapshot (REST)

```json
{
  "lastUpdateId": 1027024,
  "bids": [
    ["29950.00", "0.250"],
    ["29949.50", "0.750"],
    ["29948.00", "1.200"]
  ],
  "asks": [
    ["29951.00", "0.400"],
    ["29952.00", "1.000"],
    ["29953.50", "0.500"]
  ]
}
```

- **lastUpdateId**: ID of the most recent change applied.
- **bids**/**asks**: 2D arrays of `[price, quantity]`.

---

## Part 2: Using Exchange RESTful APIs

Most exchanges expose a public REST API endpoint to fetch the order book. You can poll this endpoint at regular intervals to maintain a local copy of the DOM.

### HTTP GET Request Example (Binance)

```http
GET https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10

```

- **symbol**: Trading pair, e.g. `BTCUSDT`.
- **limit**: Number of price levels (optional; default 100, max 5000).

**Sample Response:**

```json
{
  "lastUpdateId": 1027024,
  "bids": [["29950.00","0.250"], ...],
  "asks": [["29951.00","0.400"], ...]
}
```

### Python `requests` Example

```python
import requests

url = 'https://api.binance.com/api/v3/depth'
params = {
    'symbol': 'BTCUSDT',
    'limit': 10,
}
response = requests.get(url, params=params)
 data = response.json()
print('Best Bid:', data['bids'][0])
print('Best Ask:', data['asks'][0])
```

**Notes:**

- No authentication required for public endpoints.
- Observe rate limits (e.g., 1200 requests/minute on Binance).
- Handle HTTP errors and JSON parsing exceptions.

---

## Part 3: Using Official Exchange SDKs or Client Libraries

Official or community-supported SDKs provide wrappers over REST/WebSocket endpoints, handling retries, signing, and parsing.

### Example 1: `python-binance` (Unofficial Python Wrapper)

```bash
pip install python-binance
```

```python
from binance.client import Client

client = Client(api_key='YOUR_KEY', api_secret='YOUR_SECRET')
depth = client.get_order_book(symbol='BTCUSDT', limit=10)
print('Bids:', depth['bids'])
print('Asks:', depth['asks'])
```

- **symbol**: Trading pair.
- **limit**: Depth levels.

### Example 2: `coinbase-pro` (Official Python Client)

```bash
pip install cbpro
```

```python
from cbpro import PublicClient

client = PublicClient()
# level=1: only best bid/ask; level=2: top 50 orders; level=3: full order book
order_book = client.get_product_order_book('BTC-USD', level=2)
print(order_book)
```

- **level**: DOM detail level.

**Benefits of SDKs:**

- **Authentication**: Built-in HMAC signing.
- **Rate-Limit Handling**: Automatic retries/backoff.
- **WebSocket Support**: Streaming updates for low latency.

---

## Part 4: Using the CCXT Library

The **CCXT** library unifies API calls across 150+ exchanges in JavaScript, Python, and PHP.

### Installation

```bash
pip install ccxt
```

### Basic Usage

```python
import ccxt

exchange = ccxt.binance({
    'apiKey': 'YOUR_KEY',
    'secret': 'YOUR_SECRET',
    'enableRateLimit': True,
})
# load markets before trading
exchange.load_markets()
# fetch order book
order_book = exchange.fetch_order_book('BTC/USDT', limit=10)
print('Bids:', order_book['bids'])
print('Asks:', order_book['asks'])
```

- **fetch_order_book(symbol, limit, params)**:
  - `symbol`: Trading pair (string).
  - `limit`: Number of price levels (integer).
  - `params`: Exchange-specific params (dict).

**Advanced CCXT Options:**

- `exchange.rateLimit`: milliseconds between requests.
- `exchange.verbose = True`: logs HTTP requests.
- `exchange.enableRateLimit = True`: auto-throttling.

**Error Handling:**

```python
try:
    book = exchange.fetch_order_book('BTC/USDT', 10)
except ccxt.NetworkError as e:
    print('Network error:', e)
except ccxt.ExchangeError as e:
    print('Exchange error:', e)
```
