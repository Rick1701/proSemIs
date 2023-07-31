import React from 'react';
import Layout from '../components/Layout';
import BrigadistasListado from '../components/BrigadistasListado'; 


const BrigadistasPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Listado de Brigadista</h1>

      {/* Listado de incidentes */}
      <BrigadistasListado />
    </Layout>
  );
};

export default BrigadistasPage;

