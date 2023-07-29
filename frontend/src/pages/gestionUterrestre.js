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
        {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de uaereasListado */}
        <Link href="/UterrestresListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default UterrestresPage;


