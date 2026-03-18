import React, { useState, useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useDebounce } from '../hooks/useDebounce';
import TransactionList from '../components/TransactionList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';
import { startOfMonth, subMonths, startOfYear, parseISO, isWithinInterval } from 'date-fns';

const Transactions = () => {
  const { transactions } = useTransactions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    dateRange: 'all'
  });

  const [sortBy, setSortBy] = useState('date-desc');

  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // Search filter
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(lowerSearch) || 
        (t.notes && t.notes.toLowerCase().includes(lowerSearch))
      );
    }

    // Category & Type filters
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    // Date Range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let start;
      const end = now;

      if (filters.dateRange === 'thisMonth') {
        start = startOfMonth(now);
      } else if (filters.dateRange === 'lastMonth') {
        const lastMonth = subMonths(now, 1);
        start = startOfMonth(lastMonth);
      } else if (filters.dateRange === 'thisYear') {
        start = startOfYear(now);
      }

      if (start) {
        result = result.filter(t => {
          try {
            const date = parseISO(t.date);
            return isWithinInterval(date, { start, end });
          } catch { return false; }
        });
      }
    }

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  }, [transactions, debouncedSearch, filters, sortBy]);

  return (
    <div className="main-content">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Transactions</h2>
        <Link to="/transactions/new" className="btn">Add Transaction</Link>
      </div>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>Sort by:</span>
            <select 
              className="form-control" 
              style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="amount-desc">Amount (Highest)</option>
              <option value="amount-asc">Amount (Lowest)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default Transactions;
