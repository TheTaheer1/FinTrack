import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

export const useBudget = () => {
  const context = useContext(FinanceContext);
  
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }

  const { transactions, monthlyBudget, setMonthlyBudget } = context;

  // Calculate expenses for current month
  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    return transactions
      .filter(t => t.type === 'expense')
      .filter(t => {
        try {
          const date = parseISO(t.date);
          return isWithinInterval(date, { start, end });
        } catch {
          return false;
        }
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const remainingBudget = useMemo(() => {
    return Math.max(0, monthlyBudget - currentMonthExpenses);
  }, [monthlyBudget, currentMonthExpenses]);

  const percentageUsed = useMemo(() => {
    if (monthlyBudget <= 0) return 0;
    return Math.min(100, (currentMonthExpenses / monthlyBudget) * 100);
  }, [monthlyBudget, currentMonthExpenses]);

  return {
    monthlyBudget,
    setMonthlyBudget,
    currentMonthExpenses,
    remainingBudget,
    percentageUsed
  };
};
