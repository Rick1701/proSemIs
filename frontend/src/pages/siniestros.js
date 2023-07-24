import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import SiniestrosListado from '../components/SiniestrosListado';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const SiniestrosPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de siniestros */}
      <h1>Título del Siniestro</h1>
      <p>Descripción del Siniestro</p>

      {/* Listado de siniestros */}
      <SiniestrosListado />

      {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de siniestrosListado */}
        <Link href="/siniestrosListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default SiniestrosPage;

