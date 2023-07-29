
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import BrigadasListado from '../components/BrigadasListado';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BrigadaPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título de la Brigada</h1>
      <p>Descripción de la pagina brigada</p>

      {/* Listado de incidentes */}
      <BrigadasListado />

      {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de incidentesListado */}
        <Link href="/brigadasListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default BrigadaPage;


