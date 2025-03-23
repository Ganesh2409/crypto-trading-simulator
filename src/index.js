const { getCryptoPrice } = require('./api');
const { SMACalculator } = require('./smaCalculator');
const { TradeSimulator } = require('./tradeSimulator');

const CRYPTO_ID = 'bitcoin';
const POLL_INTERVAL = 60000; // 1 minute

const smaCalculator = new SMACalculator(); // Default: Short=5, Long=20
const tradeSimulator = new TradeSimulator();

async function main() {
  const price = await getCryptoPrice(CRYPTO_ID);
  if (price === null) return;

  smaCalculator.addPrice(price);
  const { shortSMA, longSMA } = smaCalculator.getSMAs();

  console.log(`Price: ${price}, Short SMA: ${shortSMA}, Long SMA: ${longSMA}`);

  if (shortSMA !== null && longSMA !== null) {
    if (shortSMA > longSMA) {
      tradeSimulator.simulateTrade('buy', price);
    } else if (shortSMA < longSMA) {
      tradeSimulator.simulateTrade('sell', price);
    }
  }
}

setInterval(main, POLL_INTERVAL);