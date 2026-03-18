import React, { useContext, useState, useRef, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { NavLink, Link } from 'react-router-dom';
import { LuWallet as Wallet, LuLayoutDashboard as LayoutDashboard, LuListOrdered as ListOrdered, LuCirclePlus as PlusCircle, LuChartPie as PieChart, LuTarget as Target } from 'react-icons/lu';

const Navbar = () => {
  const { currency, setCurrency } = useContext(FinanceContext);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currencies = ['INR', 'USD', 'EUR', 'GBP'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Wallet className="text-primary" size={28} />
        <span>FinTrack</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="nav-links">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <LayoutDashboard size={18} /> Dashboard
            </span>
          </NavLink>
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <ListOrdered size={18} /> Transactions
            </span>
          </NavLink>
          <NavLink 
            to="/transactions/new" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <PlusCircle size={18} /> Add
            </span>
          </NavLink>
          <NavLink 
            to="/budget" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <Target size={18} /> Budget
            </span>
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)' })}
          >
            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
              <PieChart size={18} /> Analytics
            </span>
          </NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              {currency} <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            
            {isCurrencyOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                overflow: 'hidden',
                zIndex: 100,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                minWidth: '100px'
              }}>
                {currencies.map(c => (
                  <div 
                    key={c}
                    onClick={() => { setCurrency(c); setIsCurrencyOpen(false); }}
                    style={{
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      background: currency === c ? 'var(--primary-color)' : 'transparent',
                      color: 'white',
                      transition: 'background 0.2s',
                      fontSize: '0.9rem'
                    }}
                    onMouseEnter={(e) => { if(currency !== c) e.target.style.background = 'rgba(255,255,255,0.1)' }}
                    onMouseLeave={(e) => { if(currency !== c) e.target.style.background = 'transparent' }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
