import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';

const AddTransaction = () => {
  const { id } = useParams();
  const { transactions } = useTransactions();
  
  const transactionToEdit = id ? transactions.find(t => t.id === id) : null;

  return (
    <div className="main-content">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {id ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <TransactionForm defaultValues={transactionToEdit} />
    </div>
  );
};

export default AddTransaction;
