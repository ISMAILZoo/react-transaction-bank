import React, { useState } from 'react';
import ComptesPage from './ComptesPage';
import TransactionsPage from './TransactionsPage';

const GestionPage = () => {
  const [choix, setChoix] = useState(''); // 'comptes' ou 'transactions'

  return (
    <div style={{ padding: '20px' }}>
      <h2>Choisissez une option</h2>
      <button onClick={() => setChoix('comptes')}>Gérer les Comptes</button>
      <button onClick={() => setChoix('transactions')}>Gérer les Transactions</button>

      {choix === 'comptes' && <ComptesPage />} 
      {choix === 'transactions' && <TransactionsPage />}
    </div>
  );
};

export default GestionPage;
