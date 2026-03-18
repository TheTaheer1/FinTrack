import React from 'react';
import { useBudget } from '../hooks/useBudget';
import { useCurrency } from '../hooks/useCurrency';
import { LuTarget as Target, LuTrendingDown as TrendingDown, LuWallet as Wallet } from 'react-icons/lu';

const BudgetCard = () => {
  const { monthlyBudget, currentMonthExpenses, remainingBudget, percentageUsed } = useBudget();
  const { formatCurrency } = useCurrency();

  const isOverBudget = percentageUsed > 100;
  const progressColor = isOverBudget ? 'var(--danger-color)' : 
                       percentageUsed > 80 ? '#f59e0b' : 'var(--success-color)';

  return (
    <div className="glass-panel">
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Target className="text-primary" /> Monthly Budget Summary
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Total Budget</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatCurrency(monthlyBudget)}</p>
        </div>
        <div>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Spent This Month</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <TrendingDown size={20} style={{ marginRight: '4px' }}/> {formatCurrency(currentMonthExpenses)}
            </span>
          </p>
        </div>
        <div>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Remaining</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isOverBudget ? 'var(--danger-color)' : 'var(--success-color)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Wallet size={20} style={{ marginRight: '4px' }}/> {formatCurrency(remainingBudget)}
            </span>
          </p>
        </div>
      </div>

      <div>
        <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          <span>Budget Usage</span>
          <span style={{ color: progressColor, fontWeight: 'bold' }}>{percentageUsed.toFixed(1)}%</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${Math.min(percentageUsed, 100)}%`, 
              backgroundColor: progressColor,
              transition: 'width 0.5s ease'
            }} 
          />
        </div>
        {isOverBudget && (
          <p className="text-danger" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Warning: You have exceeded your monthly budget!
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
