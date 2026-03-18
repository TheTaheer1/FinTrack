import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useCurrency } from '../hooks/useCurrency';
import { LuTrash2 as Trash2, LuPencil as Edit, LuRefreshCw as RefreshCw, LuArrowUpRight as ArrowUpRight, LuArrowDownRight as ArrowDownRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const TransactionCard = ({ transaction }) => {
  const { deleteTransaction } = useTransactions();
  const { formatCurrency, formatDate } = useCurrency();

  const isIncome = transaction.type === 'income';

  return (
    <div className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: isIncome ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isIncome ? 'var(--success-color)' : 'var(--danger-color)'
        }}>
          {isIncome ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
        </div>
        
        <div>
          <h4 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {transaction.title}
            {transaction.recurring && (
              <span title="Recurring Transaction" style={{ color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center' }}>
                <RefreshCw size={14} />
              </span>
            )}
          </h4>
          <p className="text-secondary" style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
            {transaction.category} • {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            color: isIncome ? 'var(--success-color)' : 'var(--text-primary)'
          }}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link 
            to={`/transactions/edit/${transaction.id}`}
            className="btn btn-secondary"
            style={{ padding: '0.5rem', borderColor: 'var(--border-color)', display: 'flex' }}
            title="Edit"
          >
            <Edit size={16} />
          </Link>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this transaction?')) {
                deleteTransaction(transaction.id);
              }
            }}
            className="btn btn-danger"
            style={{ padding: '0.5rem' }}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
