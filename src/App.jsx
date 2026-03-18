import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<AddTransaction />} />
            <Route path="/transactions/edit/:id" element={<AddTransaction />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        <ToastContainer 
          position="bottom-right" 
          theme="dark"
          toastStyle={{ background: 'var(--surface-color)', color: 'var(--text-primary)' }}
        />
      </Router>
    </FinanceProvider>
  );
}

export default App;
