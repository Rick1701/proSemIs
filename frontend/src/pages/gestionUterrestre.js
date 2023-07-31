import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import UterrestresListado from '../components/UterrestresListado'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UterrestresPage = () => { 
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título del listado uterrestre</h1>
      <p>Descripción del listado</p>

      {/* Listado de incidentes */}
      <UterrestresListado />
  
    </Layout>
  );
};

export default UterrestresPage;