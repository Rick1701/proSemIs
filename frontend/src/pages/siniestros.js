import React from 'react';
import Layout from '../components/Layout';
import SiniestrosListado from '../components/SiniestrosListado';

const SiniestrosPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de siniestros */}
      <h1>Título del Siniestro</h1>
      <p>Descripción del Siniestro</p>

      {/* Listado de siniestros */}
      <SiniestrosListado />
    </Layout>
  );
};

export default SiniestrosPage;
