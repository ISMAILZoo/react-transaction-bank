import React from 'react';
import AddTransaction from '../components/AddTransaction';
import Transactions from '../components/Transactions';

const TransactionsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Transactions</h2>
      <AddTransaction  />
      <Transactions />
    </div>
  );
};

export default TransactionsPage;
