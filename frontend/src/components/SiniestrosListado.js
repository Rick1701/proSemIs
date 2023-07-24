import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const SiniestrosListado = () => {
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
    { field: 'sin_fechaInicio', headerName: 'Fecha de Inicio', width: 150 },
    { field: 'sin_fechaTermino', headerName: 'Fecha de Termino', width: 150 },
    { field: 'sin_latitud', headerName: 'Latitud', width: 150 },
    { field: 'sin_superficie', headerName: 'Superficie', width: 150 },
    { field: 'sin_distribucion_fuego', headerName: 'Distribución de Fuego', width: 150 },
    { field: 'sin_categoria', headerName: 'Categoría', width: 150 },
    { field: 'sin_incidente', headerName: 'Incidente', width: 150 },
    { field: 'sin_bases_operando', headerName: 'Bases Operando', width: 150 },
    { field: 'sin_estado', headerName: 'Estado', width: 150 },
    { field: 'sin_estrategia', headerName: 'Estrategia', width: 150 },
  ];

  // Mapea los siniestros para obtener las filas del DataGrid
  const rows = siniestros.map(siniestro => {
    // Busca la categoría correspondiente al siniestro en el array de categorías
    console.log("sin_bases_operando:", siniestro.sin_bases_operando);
    // Crea un objeto con las propiedades necesarias para el DataGrid
    return {
      id: siniestro._id,
      sin_numeroIncendio: siniestro.sin_numeroIncendio,
      sin_velocidadViento: siniestro.sin_velocidadViento,
      sin_temperatura: siniestro.sin_temperatura,
      sin_humedad: siniestro.sin_humedad,
      sin_fechaInicio: new Date(siniestro.sin_fechaInicio).toLocaleDateString(), // Formatea la fecha de inicio
      sin_fechaTermino: new Date(siniestro.sin_fechaTermino).toLocaleDateString(), // Formatea la fecha de termino
      sin_latitud: siniestro.sin_latitud,
      sin_superficie: siniestro.sin_superficie,
      sin_distribucion_fuego: siniestro.sin_distribucion_fuego.join(', '),
      sin_categoria: siniestro.sin_categoria ? siniestro.sin_categoria.cat_nivel : 'N/A',// Utilizamos la propiedad cat_nivel de la categoría
      sin_incidente: siniestro.sin_incidente.join(', '),
      sin_bases_operando: siniestro.sin_bases_operando.length > 0 ? siniestro.sin_bases_operando[0].base_descripcion : 'N/A',      sin_estado: siniestro.sin_estado,
      sin_estrategia: siniestro.sin_estrategia,
    };
  });
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default SiniestrosListado;