import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import UaereasListado from '../components/UaereasListado'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UaereasPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título del listado aerea</h1>
      <p>Descripción del listado</p>

      {/* Listado de incidentes */}
      <UaereasListado />
        {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de uaereasListado */}
        <Link href="/uaereasListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default UaereasPage;


