
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

      {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de incidentesListado */}
        <Link href="/incidentesListado">
          <Button>Ver Listado</Button>
        </Link>
        <Button disabled>Disabled</Button>
        <Button>Link</Button>
      </Stack>
    </Layout>
  );
};

export default IncidentesPage;


