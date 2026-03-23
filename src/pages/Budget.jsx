import React, { useState, useEffect } from 'react';
import { useBudget } from '../hooks/useBudget';
import BudgetCard from '../components/BudgetCard';
import { FinanceContext } from '../context/FinanceContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { LuSettings as Settings } from 'react-icons/lu';

const Budget = () => {
  const { monthlyBudget, setMonthlyBudget } = useBudget();
  const { currency, exchangeRates } = useContext(FinanceContext);
  const rate = exchangeRates[currency] || 1;
  const [inputValue, setInputValue] = useState(monthlyBudget * rate === 0 ? '' : String(monthlyBudget * rate));

  useEffect(() => {
    setInputValue(monthlyBudget * rate === 0 ? '' : String(monthlyBudget * rate));
  }, [monthlyBudget, rate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const val = Number(inputValue);
    if (inputValue === '' || isNaN(val) || val < 0) {
      toast.error('Please enter a valid positive number');
      return;
    }
    setMonthlyBudget(val / rate);
    toast.success('Budget successfully updated!');
  };

  return (
    <div className="main-content">
      <h2 style={{ marginBottom: '2rem' }}>Budget Management</h2>
      <div className="dashboard-grid">
        <BudgetCard />
        <div className="glass-panel">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Settings className="text-primary" /> Update Budget
          </h3>
          <p className="text-secondary" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Set your target maximum monthly spending limit. This helps you track and prevent overspending.
          </p>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">New Monthly Budget ({currency})</label>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                className="form-control"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="E.g., 2000"
                min="0"
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
              Save New Budget
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Budget;
