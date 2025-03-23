# Crypto Trading Simulator

A Node.js application that fetches live cryptocurrency prices, computes Simple Moving Averages (SMAs), and simulates trades based on SMA crossovers. Built with efficiency in mind using circular buffers.

## Features
- Fetches real-time cryptocurrency prices from **CoinGecko API**.
- Computes **short-term (5-period)** and **long-term (20-period)** SMAs.
- Simulates **buy/sell signals** based on SMA crossovers.
- Logs trades with timestamps and saves them to `trades.json`.

## Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ganesh2409/crypto-trading-simulator.git
   cd crypto-trading-simulator
   ```

## Project Structure
```
.
├── src/
│   ├── api.js          # CoinGecko API integration
│   ├── smaCalculator.js # Circular buffer & SMA logic
│   ├── tradeSimulator.js # Buy/sell simulation
│   └── index.js        # Main application logic
├── trades.json         # Trade logs (auto-generated)
├── package.json
└── README.md
```

2. Install dependencies:
```bash
   npm install
```

## Running the Application
```bash
npm start
```
- The app polls prices every **1 minute** by default.
- Trades are logged to the console and saved in `trades.json`.

### Testing with Simulated Data
To test without waiting for real-time data:
1. Modify `src/index.js` to use simulated prices (example provided in the code comments).
2. Run:
   ```bash
   npm start
   ```

## Design Decisions
1. **API Choice**: 
   - **CoinGecko API** was chosen for its free tier, reliability, and ease of integration.
   - Falls back to `null` prices on API errors to avoid crashing the app.

2. **Circular Buffers**:
   - Used to store the most recent **5** (short-term) and **20** (long-term) prices.
   - Ensures **O(1)** time complexity for adding new prices and calculating SMAs.

3. **Trade Simulation**:
   - **Buy Signal**: Short SMA crosses **above** Long SMA.
   - **Sell Signal**: Short SMA crosses **below** Long SMA.
   - Trades are logged with timestamps and quantities for auditability.

4. **Logging**:
   - Trades are saved to `trades.json` for future analysis.
   - Console logs include price, SMAs, and trade actions for real-time monitoring.



## Testing Notes
- **API Rate Limits**: CoinGecko allows ~10-30 calls/minute. Adjust `POLL_INTERVAL` in `src/index.js` if needed.
- **Buffer Sizes**: Reduce SMA periods in `src/smaCalculator.js` for faster testing.

## Assumptions
- Focuses on **Bitcoin** (`bitcoin`), but you can change `CRYPTO_ID` in `src/index.js`.
- Polling interval is set to **1 minute** to avoid hitting API rate limits.
- Simulated trades use a fixed quantity of **1 unit** for simplicity.

## Design Decisions

### 1. **API Integration**
- **CoinGecko API**:  
  Chosen for its simplicity, reliability, and free tier. Fetches real-time prices without requiring API keys.  
- **Polling Interval**:  
  Set to **1 minute** to balance data freshness with CoinGecko’s rate limits (~10-30 requests/minute).  
- **Error Handling**:  
  Gracefully skips failed API requests to avoid crashes, ensuring uninterrupted operation.

### 2. **Data Management**
- **Circular Buffers**:  
  - Stores the last **5** (short-term) and **20** (long-term) prices efficiently.  
  - **Why?**  
    - **Constant-Time Updates**: Overwrites oldest data in `O(1)` time.  
    - **Memory Efficiency**: Avoids storing unnecessary historical data.  
- **SMA Calculation**:  
  - Computed only when buffers are full to ensure accuracy.  

### 3. **Trade Simulation**
- **Crossover Strategy**:  
  - **Buy**: Short SMA > Long SMA (upward momentum).  
  - **Sell**: Short SMA < Long SMA (downward momentum).  
- **Position Management**:  
  - Only one active trade (`buy` or `sell`) allowed at a time.  
- **Fixed Quantity**:  
  Simulates trading **1 unit** for simplicity.  

### 4. **Logging & Output**
- **Console Logging**:  
  Displays prices, SMAs, and trades in real-time (e.g., `Price: 84199, Short SMA: 84203`).  
- **Trade History**:  
  Saves trades to `trades.json` with timestamps for auditability.  

### 5. **Testing & Scalability**
- **Testing Shortcuts**:  
  - Reduced SMA periods (e.g., 3/5) for faster signal generation during development.  
  - Simulated data option to bypass API rate limits.  
- **Assumptions**:  
  - Focuses on Bitcoin (`bitcoin`), but configurable via `CRYPTO_ID`.  

### 6. **Error Resilience**
- **Null Handling**:  
  SMAs return `null` until buffers are full to avoid false signals.  
- **Future-Proofing**:  
  Architecture supports adding retries for API failures.  

---

