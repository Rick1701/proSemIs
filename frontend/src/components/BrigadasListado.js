import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const BrigadasListado = () => {
  console.log('GestionarBrigadas se ha montado');
  const [brigadas, setBrigadas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/brigada')
      .then(response => {
        setBrigadas(response.data.data); // Modifica esta línea
      })
      .catch(error => {
        console.error('Error al obtener las brigadas:', error);
      });
  }, []);

  console.log('hola', brigadas); // Verifica si se están recibiendo los datos correctamente

  const columns = [
    { field: 'bri_nombre', headerName: 'Nombre de la brigada', width: 150 },
    { field: 'bri_especialidad', headerName: 'Especialidad', width: 150 },
    { field: 'bri_brigadista', headerName: 'Brigadistas', width: 150 },
    { field: 'bri_base', headerName: 'Base', width: 150 },
    { field: 'bri_estado', headerName: 'Estado', width: 150 },
  ];

  const rows = brigadas.map(brigada => ({
    id: brigada._id,
    bri_nombre: brigada.bri_nombre,
    bri_especialidad: brigada.bri_especialidad,
    bri_bri: brigada.bri_base,
    bri_estado: brigada.bri_estado,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default BrigadasListado;