
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import BrigadistasListado from '../components/BrigadistasListado'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BrigadistasPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de incidente */}
      <h1>Título del Brigadista</h1>
      <p>Descripción de la pagina</p>

      {/* Listado de incidentes */}
      <BrigadistasListado />

      {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de BrigadistasListado */}
        <Link href="/BrigadistasListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default BrigadistasPage;


