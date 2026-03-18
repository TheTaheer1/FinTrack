import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem('finance_budget');
    return saved ? JSON.parse(saved) : 0;
  });

  const [currency, setCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_budget', JSON.stringify(monthlyBudget));
  }, [monthlyBudget]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, ...updatedTransaction } : t)));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      monthlyBudget,
      setMonthlyBudget,
      currency,
      setCurrency,
      exchangeRates
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
