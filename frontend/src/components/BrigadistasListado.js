import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const BrigadistasListado = () => {
  console.log('Brigadistas se ha montado');
  const [brigadistas, setBrigadistas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/brigadista')
      .then(response => {
        setBrigadistas(response.data.data); // Modifica esta línea
      })
      .catch(error => {
        console.error('Error al obtener las brigadistas:', error);
      });
  }, []);

  console.log('hola', brigadistas); // Verifica si se están recibiendo los datos correctamente

  if (!Array.isArray(brigadistas)) {
    return <p>No se encontraron los brigadistas.</p>;
  }

  const columns = [
    { field: 'brig_rut', headerName: 'Rut', width: 150 },
    { field: 'brig_nombres', headerName: 'Nombres', width: 150 },
    { field: 'brig_apellidos', headerName: 'Apellidos', width: 150 },
    { field: 'brig_sexo', headerName: 'Sexo', width: 150 },
    { field: 'brig_edad', headerName: 'Edad', width: 150 },
    { field: 'brig_estado_brigadista', headerName: 'Estado actual', width: 150 },
    { field: 'brig_brigada', headerName: 'Brigada', width: 150 },
    { field: 'brig_incidente', headerName: 'Incidente', width: 150 },
  ];

  const rows = brigadistas.map(brigadista => ({
    id: brigadista._id,
    brig_rut: brigadista.brig_rut,
    brig_nombres: brigadista.brig_nombres,
    brig_apellidos: brigadista.brig_apellidos,
    brig_sexo: brigadista.brig_sexo,
    brig_edad: brigadista.brig_edad,
    brig_estado_brigadista: brigadista.brig_estado_brigadista,
    brig_brigada: brigadista.brig_brigada,
    brig_incidente: brigadista.brig_incidente,

  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default BrigadistasListado;