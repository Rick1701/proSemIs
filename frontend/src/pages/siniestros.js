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
      <div style={{ marginBottom: '30px' }}>
        <h1>Registro de Siniestros</h1>
      </div>      


      {/*<p></p>*/}

      {/* Listado de siniestros */}
      <SiniestrosListado />

      {/* Mostrar los botones directamente en la página */}
      <Stack spacing={2} direction="row">
        {/* Agregar redireccionamiento a la página de siniestrosListado */}
        <Link href="/siniestrosRegistro">
          <Button>AGREGAR SINIESTRO</Button>
        </Link>
      </Stack>
    </Layout>
  );
};

export default SiniestrosPage;

