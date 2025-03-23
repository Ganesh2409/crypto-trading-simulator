class TradeSimulator {
  constructor() {
    this.position = null;
    this.trades = [];
  }

  simulateTrade(signal, price) {
    const timestamp = new Date().toISOString();
    const quantity = 1; // Fixed quantity for simplicity

    if (signal === 'buy' && this.position !== 'buy') {
      this.position = 'buy';
      this.trades.push({ timestamp, type: 'buy', price, quantity });
      console.log(`BUY at ${price} (Quantity: ${quantity}, Timestamp: ${timestamp})`);
    } else if (signal === 'sell' && this.position === 'buy') {
      this.position = 'sell';
      this.trades.push({ timestamp, type: 'sell', price, quantity });
      console.log(`SELL at ${price} (Quantity: ${quantity}, Timestamp: ${timestamp})`);
    }
  }

  getTrades() {
    return this.trades;
  }
}

module.exports = { TradeSimulator };