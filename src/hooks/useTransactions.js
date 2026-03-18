import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useTransactions = () => {
  const context = useContext(FinanceContext);
  
  if (!context) {
    throw new Error('useTransactions must be used within a FinanceProvider');
  }

  const { transactions, addTransaction, updateTransaction, deleteTransaction } = context;

  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const netBalance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    netBalance
  };
};
