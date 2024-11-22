import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPTES, GET_TOTAL_SOLDE, GET_COMPTE_BY_ID } from '../graphql/queries';
import './style.css';

const Comptes = () => {
  // Récupération des données de tous les comptes
  const { loading: loadingComptes, error: errorComptes, data: dataComptes } = useQuery(GET_ALL_COMPTES);

  // Récupération des données du total du solde
  const { loading: loadingSolde, error: errorSolde, data: dataSolde } = useQuery(GET_TOTAL_SOLDE);

  // Etat pour gérer l'ID du compte à rechercher
  const [compteId, setCompteId] = useState('');
  
  // Gestion de la recherche d'un compte par ID
  const { loading: loadingCompteById, error: errorCompteById, data: dataCompteById } = useQuery(GET_COMPTE_BY_ID, {
    variables: { id: compteId },
    skip: !compteId, // Ne pas effectuer la requête si l'ID est vide
  });

  const handleSearchChange = (event) => {
    setCompteId(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();  // Empêche le comportement de défilement vers le haut
    if (compteId) {
      // Déclencher la recherche uniquement si un ID est fourni
      setCompteId(compteId);
    }
  };

  if (loadingComptes || loadingSolde || loadingCompteById) return <p>Chargement...</p>;
  if (errorComptes) return <p>Erreur lors du chargement des comptes : {errorComptes.message}</p>;
  if (errorSolde) return <p>Erreur lors du chargement du solde total : {errorSolde.message}</p>;
  if (errorCompteById) return <p>Erreur lors de la recherche du compte : {errorCompteById.message}</p>;

  return (
    <div>
      <h3>Liste des Comptes</h3>
      <ul>
        {dataComptes.allComptes.map((compte) => (
          <li key={compte.id}>
            <p>ID : {compte.id}</p>
            <p>Solde : {compte.solde}€</p>
            <p>Date : {compte.dateCreation}</p>
            <p>Type : {compte.type}</p>
          </li>
        ))}
      </ul>

      {/* Affichage des informations du total du solde */}
      <div>
        <h4>Total des Soldes</h4>
        <p>Total des comptes : {dataSolde.totalSolde.count}</p>
        <p>Solde total : {dataSolde.totalSolde.sum}€</p>
        <p>Solde moyen : {dataSolde.totalSolde.average}€</p>
      </div>

      {/* Formulaire de recherche par ID */}
      <div>
        <h4>Rechercher un compte par ID</h4>
        <input
          type="text"
          placeholder="Entrez l'ID du compte"
          value={compteId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Chercher</button>

        {dataCompteById && dataCompteById.compteById ? (
          <div>
            <h4>Compte Trouvé :</h4>
            <p>ID : {dataCompteById.compteById.id}</p>
            <p>Solde : {dataCompteById.compteById.solde}€</p>
            <p>Date : {dataCompteById.compteById.dateCreation}</p>
            <p>Type : {dataCompteById.compteById.type}</p>
          </div>
        ) : (
          compteId && <p>Aucun compte trouvé avec cet ID.</p>
        )}
      </div>
    </div>
  );
};

export default Comptes;
