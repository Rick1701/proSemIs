import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Link from 'next/link';

const GraficosPage = () => {
  console.log('SiniestrosListado se ha montado');
  const [siniestros, setSiniestros] = useState([]);

  useEffect(() => {
    // Obtener los siniestros
    axios.get('http://localhost:3001/api/siniestro')
      .then(response => {
        // Ordenar los siniestros cronológicamente por el campo sin_fechaInicio
        const sortedSiniestros = response.data.data.sort((a, b) => new Date(a.sin_fechaInicio) - new Date(b.sin_fechaInicio));
        setSiniestros(sortedSiniestros);
      })
      .catch(error => {
        console.error('Error al obtener los siniestros:', error);
      });
  }, []);

  console.log('hola', siniestros); // Verifica si se están recibiendo los datos correctamente

  if (!Array.isArray(siniestros)) {
    return <p>No se encontraron siniestros.</p>;
  }

  const columns = [
    { field: 'sin_numeroIncendio', headerName: 'Número de Incendio', width: 150 },
    { field: 'sin_velocidadViento', headerName: 'Velocidad del Viento', width: 150 },
    { field: 'sin_temperatura', headerName: 'Temperatura', width: 150 },
    { field: 'sin_humedad', headerName: 'Humedad', width: 150 },
    { field: 'sin_latitud', headerName: 'Latitud', width: 150 },
    { field:'sin_superficie', headerName: 'Superficie',width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Link href={`/GraficosID/${params.row.id}`}>
          <Button variant="outlined" size="small">
            GraficosID
          </Button>
        </Link>
      ),
    },
  ];

  const getChartData = (siniestro) => {
    const { sin_velocidadViento, sin_temperatura, sin_humedad, sin_latitud,sin_superficie, sin_fechaInicio, sin_fechaTermino } = siniestro;
    return [
      
      { nombreDelDato: 'Velocidad del Viento', UnidadDeMedida: sin_velocidadViento },
      { nombreDelDato: 'Temperatura', UnidadDeMedida: sin_temperatura  },
      { nombreDelDato: 'Humedad', UnidadDeMedida: sin_humedad },
      { nombreDelDato: 'Latitud', UnidadDeMedida: sin_latitud },
      { nombreDelDato: 'Superficie', UnidadDeMedida: sin_superficie },
    ];
  };
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff']; // Colores para cada barra

  //esto de aquí es la parte visual tanto de la tabla y los gráficos
  return (
    <Layout>
      <h1>Siniestros Ordenados Cronológicamente</h1> {/* Título agregado */}
      <br /> {/* Salto de línea después del título */}

      
      {siniestros.map(siniestro => (
          <div key={siniestro._id}>
            <h2>Siniestro N° : {siniestro.sin_numeroIncendio} - Fecha: {new Date(siniestro.sin_fechaInicio).toLocaleDateString()}</h2>
            <BarChart width={800} height={500} data={getChartData(siniestro)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombreDelDato" />
              <YAxis>
                {/* Se agrega el eje Y */}
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="UnidadDeMedida" fill="#8884d8" />
            </BarChart>
            <br /> {/* Salto de línea después de cada siniestro */}
          </div>
        ))}
      <Link href="/home">
                
                <Button sx={{bgcolor: '#313236',color: 'white','&:hover': {bgcolor: '#F3F3FB',},}}>Regresar</Button>
      </Link>
    </Layout>
  );
};

export default GraficosPage;
