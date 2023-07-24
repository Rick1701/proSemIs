import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const UaereasListado = () => {
  console.log('GestionarUaerea se ha montado');
  const [uaereas, setUaereas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/uaerea')
      .then(response => {
        setUaereas(response.data.data); // Modifica esta línea
      })
      .catch(error => {
        console.error('Error al obtener las unidades aereas:', error);
      });
  }, []);

  console.log('hola', uaereas); // Verifica si se están recibiendo los datos correctamente

  if (!Array.isArray(uaereas)) {
    return <p>No se encontraron las unidades aereas.</p>;
  }

  const columns = [
    { field: 'uaerea_nombre', headerName: 'Nombre de la unidad', width: 150 },
    { field: 'uaerea_estado_unidad', headerName: 'Estado', width: 150 },
    { field: 'uaerea_incidente', headerName: 'Incidente', width: 150 },
    { field: 'uaerea_base', headerName: 'Base', width: 150 },
  ];

  const rows = uaereas.map(uaerea => ({
    id: uaerea._id,
    uaerea_nombre: uaerea.uaerea_nombre,
    uaerea_estado_unidad: uaerea.uaerea_estado_unidad,
    uaerea_incidente: uaerea.uaerea_incidente,
    uaerea_base: uaerea.uaerea_base,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default UaereasListado;