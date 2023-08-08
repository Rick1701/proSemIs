import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Link from 'next/link';
import AssessmentIcon from '@mui/icons-material/Assessment';

const EstadisticasListados = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [selectedSiniestro, setSelectedSiniestro] = useState(null);


  const formatNumber = (number) => {
    return parseInt(number); // O también puedes usar Math.round(number) si prefieres redondear en lugar de truncar.
  };

  const columns = [
    { field: 'sin_numeroIncendio', headerName: 'Número de Incendio', width: 150 },
    { field: 'sin_velocidadViento', headerName: 'Velocidad del Viento', width: 150 },
    { field: 'sin_temperatura', headerName: 'Temperatura', width: 150 },
    { field: 'sin_humedad', headerName: 'Humedad', width: 150 },
    { field: 'sin_latitud', headerName: 'Latitud', width: 150 },
    { field: 'sin_superficie', headerName: 'Superficie', width: 150 },

    {
      field: 'acciones',
      headerName: 'Graficar',
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleMostrarGrafico(params.row)}>
          <AssessmentIcon fontSize="large" />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Obtener los siniestros
    axios.get('http://localhost:3001/api/siniestro')
      .then(response => {
        // Ordenar los siniestros cronológicamente por el campo sin_fechaInicio
        const sortedSiniestros = response.data.data.sort((a, b) => new Date(b.sin_fechaInicio) - new Date(a.sin_fechaInicio));
        setSiniestros(sortedSiniestros);
      })
      .catch(error => {
        console.error('Error al obtener los siniestros:', error);
      });
  }, []);

  // Calcular el promedio total de cada dato de todos los siniestros
  const calculateAverages = () => {
    if (!Array.isArray(siniestros) || siniestros.length === 0) {
      return [];
    }

    const totalSiniestros = siniestros.length;
    const totalDatos = siniestros.reduce((acc, siniestro) => {
      acc.sin_velocidadViento += siniestro.sin_velocidadViento;
      acc.sin_temperatura += siniestro.sin_temperatura;
      acc.sin_humedad += siniestro.sin_humedad;
      acc.sin_latitud += siniestro.sin_latitud;
      acc.sin_superficie += siniestro.sin_superficie;
      return acc;
    }, {
      sin_velocidadViento: 0,
      sin_temperatura: 0,
      sin_humedad: 0,
      sin_latitud: 0,
      sin_superficie: 0,
    });

    return [
      { nombreDelDato: 'Velocidad del Viento', UnidadDeMedida: totalDatos.sin_velocidadViento / totalSiniestros },
      { nombreDelDato: 'Temperatura', UnidadDeMedida: totalDatos.sin_temperatura / totalSiniestros },
      { nombreDelDato: 'Humedad', UnidadDeMedida: totalDatos.sin_humedad / totalSiniestros },
      { nombreDelDato: 'Latitud', UnidadDeMedida: totalDatos.sin_latitud / totalSiniestros },
      { nombreDelDato: 'Superficie', UnidadDeMedida: totalDatos.sin_superficie / totalSiniestros },
    ];
  };

  const getChartData = (siniestro) => {
    const { sin_velocidadViento, sin_temperatura, sin_humedad, sin_latitud, sin_superficie } = siniestro;
    return [
      { nombreDelDato: 'Velocidad del Viento', UnidadDeMedida: sin_velocidadViento },
      { nombreDelDato: 'Temperatura', UnidadDeMedida: sin_temperatura },
      { nombreDelDato: 'Humedad', UnidadDeMedida: sin_humedad },
      { nombreDelDato: 'Latitud', UnidadDeMedida: sin_latitud },
      { nombreDelDato: 'Superficie', UnidadDeMedida: sin_superficie },
    ];
  };

  const handleMostrarGrafico = (siniestro) => {
    setSelectedSiniestro(siniestro);
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
    sin_superficie: siniestro.sin_superficie,
  }));

  // Esto de aquí es la parte visual tanto de la tabla y los gráficos
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      {/* Renderizar el gráfico debajo de la tabla */}
      {selectedSiniestro && (
        <div>
          <h2>Gráfico del Siniestro N°: {selectedSiniestro.sin_numeroIncendio}</h2>
          <BarChart width={600} height={300} data={getChartData(selectedSiniestro)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreDelDato" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="UnidadDeMedida" fill="#8884d8" />
          </BarChart>
        </div>
      )}

      {/* Mostrar el gráfico del promedio total */}
      {siniestros.length > 0 && (
        <div>
          <h2>Promedio de Datos de Todos los Siniestros</h2>
          <BarChart width={600} height={300} data={calculateAverages()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombreDelDato" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="UnidadDeMedida" fill="#82ca9d" />
          </BarChart>
        </div>
      )}
    </div>
  );
};








export default EstadisticasListados;
