import React from 'react';
import Layout from '../components/Layout';
import IncidentesListado from '../components/IncidentesListado'; 

const GestionIncidentesPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de gestión de incidentes */}
      <h1>Gestión de Incidentes</h1>
      <IncidentesListado />
    </Layout>
  );
};

export default GestionIncidentesPage;
