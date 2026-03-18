import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { CategoryPieChart, MonthlyLineChart, IncomeExpenseBarChart } from '../components/Charts';
import { useCurrency } from '../hooks/useCurrency';
import { LuChartPie as PieChart, LuTrendingUp as TrendingUp, LuChartColumn as BarChart2 } from 'react-icons/lu';

const Analytics = () => {
  const { transactions, totalIncome, totalExpenses, netBalance } = useTransactions();
  const { formatCurrency } = useCurrency();

  const topCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return { name: 'None', amount: 0 };
    
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
    
    const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    return entries.length > 0 ? { name: entries[0][0], amount: entries[0][1] } : { name: 'None', amount: 0 };
  }, [transactions]);

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '2rem' }}>Detailed Analytics</h2>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Income</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{formatCurrency(totalIncome)}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Expenses</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Net Balance</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{formatCurrency(netBalance)}</p>
        </div>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Top Category</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{topCategory.name}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <PieChart className="text-primary" /> Spending by Category
          </h3>
          <CategoryPieChart transactions={transactions} />
        </div>

        <div className="glass-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart2 className="text-primary" /> Income vs Expense
          </h3>
          <IncomeExpenseBarChart transactions={transactions} />
        </div>

        <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TrendingUp className="text-primary" /> 6-Month Expense Trend
          </h3>
          <MonthlyLineChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
