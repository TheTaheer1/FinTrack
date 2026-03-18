import React from 'react';
import { LuSearch as Search } from 'react-icons/lu';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
        <Search size={18} />
      </div>
      <input 
        type="text" 
        className="form-control" 
        placeholder="Search by title or notes..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ paddingLeft: '2.5rem' }}
      />
    </div>
  );
};

export default SearchBar;
