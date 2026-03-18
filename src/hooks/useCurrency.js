import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useCurrency = () => {
  const { currency, exchangeRates } = useContext(FinanceContext);

  const formatCurrency = (amount) => {
    const rate = exchangeRates[currency] || 1;
    const convertedAmount = amount * rate;

    const locales = {
      INR: 'en-IN',
      USD: 'en-US',
      EUR: 'en-IE',
      GBP: 'en-GB'
    };

    return new Intl.NumberFormat(locales[currency] || 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(convertedAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return { formatCurrency, formatDate };
};
