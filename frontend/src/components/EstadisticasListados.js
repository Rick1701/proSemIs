import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';


const EstadisticasListados = () => {
  console.log('SiniestrosListado se ha montado');
  const [siniestros, setSiniestros] = useState([]);

  useEffect(() => {
    // Obtener los siniestros
    axios.get('http://localhost:3001/api/siniestro')
      .then(response => {
        setSiniestros(response.data.data);
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
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleRedireccionar(params.row.id)} >
          GraficosID
        </Button>
      ),
    },
  ];

  const handleRedireccionar = (siniestroId) => {
    return (
      <Link href={`/Graficos/${siniestroId}`}>
        <Button variant="outlined" size="small">
          GraficosID
        </Button>
      </Link>
    );
  };

  
  const getChartData = (siniestro) => {
    const { sin_velocidadViento, sin_temperatura, sin_humedad,sin_latitud } = siniestro;
    return [
      { nombreDelDato: 'Velocidad del Viento', UnidadDeMedida: sin_velocidadViento },
      { nombreDelDato: 'Temperatura', UnidadDeMedida: sin_temperatura },
      { nombreDelDato: 'Humedad', UnidadDeMedida: sin_humedad },
      { nombreDelDato: 'Latitud', UnidadDeMedida: sin_latitud },

    ];
  };

  const rows = siniestros.map(siniestro => ({
    id: siniestro._id,
    sin_numeroIncendio: siniestro.sin_numeroIncendio,
    sin_velocidadViento: siniestro.sin_velocidadViento,
    sin_temperatura: siniestro.sin_temperatura,
    sin_humedad: siniestro.sin_humedad,
    sin_fechaInicio: new Date(siniestro.sin_fechaInicio).toLocaleDateString(),
    sin_fechaTermino: new Date(siniestro.sin_fechaTermino).toLocaleDateString(),
    sin_latitud: siniestro.sin_latitud,
  }));


  //esto de aqui es la parte visual tanto de la tabla y los graficos
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
   
    </div>
  );
};

export default EstadisticasListados;
