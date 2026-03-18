import React from 'react';
import { LuFilter as Filter } from 'react-icons/lu';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <Filter size={18} /> Filters:
      </div>
      
      <select 
        name="type" 
        value={filters.type} 
        onChange={handleChange}
        className="form-control"
        style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select 
        name="category" 
        value={filters.category} 
        onChange={handleChange}
        className="form-control"
        style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }}
      >
        <option value="all">All Categories</option>
        <option value="Housing">Housing</option>
        <option value="Food">Food & Dining</option>
        <option value="Transport">Transportation</option>
        <option value="Utilities">Utilities</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>

      <select 
        name="dateRange" 
        value={filters.dateRange} 
        onChange={handleChange}
        className="form-control"
        style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }}
      >
        <option value="all">All Time</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
      </select>
    </div>
  );
};

export default Filters;
