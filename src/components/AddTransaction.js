import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/queries'; // Assurez-vous que le chemin est correct

const AddTransaction = ({ refetch }) => {
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('DEPOT');
  const [compteId, setCompteId] = useState('');
  const [compteSolde, setCompteSolde] = useState(null); // État pour suivre le solde du compte

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted: (data) => {
      // Mettre à jour le solde du compte après la transaction
      setCompteSolde(data.addTransaction.compte.solde);
      // Recharger la liste des transactions après ajout
      refetch();  // Utilisation de refetch pour actualiser les données
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransaction({
        variables: {
          transactionReq: {
            montant: parseFloat(montant),
            date,
            type,
            compteId: parseInt(compteId),
          },
        },
      });

      // Si la transaction est réussie, afficher le nouveau solde
      alert('Transaction ajoutée avec succès!');
      console.log('Nouveau solde du compte:', response.data.addTransaction.compte.solde);
    } catch (err) {
      console.error("Erreur lors de l'ajout de la transaction:", err);
      alert('Échec de l\'ajout de la transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une Transaction</h2>
      <div>
        <label>Montant:</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="DEPOT">DEPOT</option>
          <option value="RETRAIT">RETRAIT</option>
        </select>
      </div>
      <div>
        <label>Compte ID:</label>
        <input
          type="number"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
        />
      </div>
      <button type="submit">Ajouter Transaction</button>

      {compteSolde !== null && (
        <div>
          <h3>Solde du compte après la transaction: {compteSolde}€</h3>
        </div>
      )}
    </form>
  );
};

export default AddTransaction;
