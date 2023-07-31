import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import SiniestrosListado from '../components/SiniestrosListado';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Save, Delete, ArrowBack } from '@mui/icons-material'; // Importa los iconos que desees usar
import { Grid } from '@mui/material'; // Importa el componente Grid



const SiniestrosPage = () => {

  return (
    <Layout>
      {/* Contenido de la página de siniestros */}
      <div style={{ marginBottom: '30px' }}>
        <h1>Registro de Siniestros</h1>
      </div>      

      <div><h4>La última tupla de la tabla muestra el último siniestro registrado</h4></div>

      {/*<p></p>*/}

      {/* Listado de siniestros */}
      <SiniestrosListado />

      {/* Mostrar los botones directamente en la página */}
      <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: '70px' }}>
            <Grid item>
              <Link href={`/siniestrosRegistro`} passHref>
                <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: '#313236', '&:hover': { bgcolor: '#F3F3FB' } }}>
                  Registrar Nuevo Siniestro
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/home" passHref>
                <Button variant="contained" startIcon={<ArrowBack />} sx={{ bgcolor: '#313236', '&:hover': { bgcolor: '#F3F3FB' } }}>
                  Regresar
                </Button>
              </Link>
            </Grid>
        </Grid>
    </Layout>
  );
};

export default SiniestrosPage;

