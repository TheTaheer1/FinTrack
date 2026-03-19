export const formatCurrency = (amount, currency = 'INR') => {
  const locales = {
    INR: 'en-IN',
    USD: 'en-US',
    EUR: 'en-IE',
    GBP: 'en-GB'
  };

  return new Intl.NumberFormat(locales[currency] || 'en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
