const axios = require('axios');

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

async function getCryptoPrice(cryptoId = 'bitcoin', currency = 'usd') {
  try {
    const response = await axios.get(API_URL, {
      params: { ids: cryptoId, vs_currencies: currency },
    });
    return response.data[cryptoId][currency];
  } catch (error) {
    console.error('API Error:', error.message);
    return null;
  }
}

module.exports = { getCryptoPrice };