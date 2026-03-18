import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import BudgetCard from '../components/BudgetCard';
import { IncomeExpenseBarChart } from '../components/Charts';
import TransactionList from '../components/TransactionList';
import { useCurrency } from '../hooks/useCurrency';
import { LuArrowUpRight as ArrowUpRight, LuArrowDownRight as ArrowDownRight, LuDollarSign as DollarSign, LuActivity as Activity } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { transactions, totalIncome, totalExpenses, netBalance } = useTransactions();
  const { formatCurrency } = useCurrency();
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="main-content">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <Link to="/transactions/new" className="btn">Add Transaction</Link>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--success-color)' }}>
            <ArrowUpRight size={32} />
          </div>
          <div>
            <p className="text-secondary" style={{ margin: '0 0 0.25rem' }}>Total Income</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatCurrency(totalIncome)}</h3>
          </div>
        </div>
        
        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--danger-color)' }}>
            <ArrowDownRight size={32} />
          </div>
          <div>
            <p className="text-secondary" style={{ margin: '0 0 0.25rem' }}>Total Expenses</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatCurrency(totalExpenses)}</h3>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--secondary-color)' }}>
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-secondary" style={{ margin: '0 0 0.25rem' }}>Net Balance</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{formatCurrency(netBalance)}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div>
          <BudgetCard />
        </div>
        <div className="glass-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Activity className="text-primary" /> Income vs Expenses
          </h3>
          <IncomeExpenseBarChart transactions={transactions} />
        </div>
      </div>

      <div>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Recent Transactions</h3>
          <Link to="/transactions" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            View All
          </Link>
        </div>
        <TransactionList transactions={recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
