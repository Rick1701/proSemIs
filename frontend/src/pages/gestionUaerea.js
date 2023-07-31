import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import UaereasListado from '../components/UaereasListado'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UaereasPage = () => { 
  return (
    <Layout>
      {/* Contenido de la página de uaerea */}
      <h1>Título del listado aerea</h1>
      <p>Descripción del listado</p>

      {/* Listado de uaerea */}
      <UaereasListado />
    </Layout>
  );
};

export default UaereasPage;


