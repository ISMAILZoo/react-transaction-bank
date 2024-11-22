import React from 'react';
import AddCompte from '../components/AddComptes';
import Comptes from '../components/Comptes';

const ComptesPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des Comptes</h2>
      <AddCompte />
      <Comptes />
    </div>
  );
};

export default ComptesPage;
