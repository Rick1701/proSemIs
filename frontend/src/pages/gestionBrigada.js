import React from 'react';
import Layout from '../components/Layout';
import BrigadasListado from '../components/BrigadasListado';

const BrigadaPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Listado de Brigada</h1>

      {/* Listado de incidentes */}
      <BrigadasListado />

    </Layout>
  );
};

export default BrigadaPage;


