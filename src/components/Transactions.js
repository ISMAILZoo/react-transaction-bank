import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';

const Transactions = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL error:', error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {data.allTransactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Montant: {transaction.montant}</p>
            <p>Date: {transaction.date}</p>
            <p>Type: {transaction.type}</p>
            <p>Compte ID: {transaction.compte.id}</p>
            <p>Solde: {transaction.compte.solde}€</p>
          </li>
        ))}
      </ul>
      <button onClick={() => refetch()}>Refetch Transactions</button> {/* Ajoutez un bouton pour forcer un refetch */}
    </div>
  );
};

export default Transactions;
