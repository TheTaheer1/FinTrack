import axios from 'axios';

const EXCHANGE_RATE_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

/**
 * Fetch exchange rates from the Currency Exchange API.
 * Base currency is INR by default.
 * @param {string} baseCurrency - The base currency code (e.g., 'INR')
 * @returns {Promise<Object>} - An object containing exchange rates
 */
export const fetchExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_BASE_URL}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return { [baseCurrency]: 1 };
  }
};
