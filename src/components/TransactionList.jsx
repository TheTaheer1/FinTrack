import React from 'react';
import TransactionCard from './TransactionCard';
import EmptyState from './EmptyState';

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState 
        title="No transactions found" 
        message="You don't have any transactions matching your criteria right now."
        actionText="Add Transaction"
        actionLink="/transactions/new"
      />
    );
  }

  return (
    <div>
      {transactions.map(transaction => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
