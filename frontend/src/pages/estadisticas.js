import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import EstadisticasListados from '../components/EstadisticasListados';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Graficos from './Graficos'; // Importa el componente Graficos

const EstadisticasPage = () => {
  return (
    <Layout>
      {/* Contenido de la página de estadísticas */}
      <h1>Estadísticas de los Siniestros</h1>
      <br /> {/* Salto de línea después del título */}
      <p>Bienvenido a la tabla de estadísticas</p>
      <br /> {/* Salto de línea después del título */}
      
      

      {/* Listado de estadísticas */}
      <EstadisticasListados />
      

    </Layout>
    
  );
};

export default EstadisticasPage;
