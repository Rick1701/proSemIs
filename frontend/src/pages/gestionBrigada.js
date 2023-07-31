import React from 'react';
import Layout from '../components/Layout';
import BrigadasListado from '../components/BrigadasListado';

const BrigadaPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título de la Brigada</h1>
      <p>Descripción de la pagina brigada</p>

      {/* Listado de incidentes */}
      <BrigadasListado />

    </Layout>
  );
};

export default BrigadaPage;


