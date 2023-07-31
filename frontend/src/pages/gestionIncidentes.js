
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import IncidentesListado from '../components/IncidentesListado'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const IncidentesPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título del Incidente</h1>
      <p>Descripción del Incidente</p>

      {/* Listado de incidentes */}
      <IncidentesListado />
    </Layout>
  );
};

export default IncidentesPage;


