import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GestionPage from './pages/GestionPage';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8082/graphql',
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<GestionPage />} />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
