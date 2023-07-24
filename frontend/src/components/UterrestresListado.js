import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const UterrestresListado = () => {
  console.log('Gestionaruterrestre se ha montado');
  const [uterrestres, setUterrestres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/uterrestre')
      .then(response => {
        setUterrestres(response.data.data); // Modifica esta línea
      })
      .catch(error => {
        console.error('Error al obtener las unidades aereas:', error);
      });
  }, []);

  console.log('hola', uterrestres); // Verifica si se están recibiendo los datos correctamente

  if (!Array.isArray(uterrestres)) {
    return <p>No se encontraron las unidades aereas.</p>;
  }

  const columns = [
    { field: 'uterrestre_nombre', headerName: 'Nombre de la unidad', width: 150 },
    { field: 'uterrestre_estado_unidad', headerName: 'Estado', width: 150 },
    { field: 'uterrestre_incidente', headerName: 'Incidente', width: 150 },
    { field: 'uterrestre_base', headerName: 'Base', width: 150 },
  ];

  const rows = uterrestres.map(uterrestre => ({
    id: uterrestre._id,
    uterrestre_nombre: uterrestre.uterrestre_nombre,
    uterrestre_estado_unidad: uterrestre.uterrestre_estado_unidad,
    uterrestre_incidente: uterrestre.uterrestre_incidente,
    uterrestre_base: uterrestre.uterrestre_base,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default UterrestresListado;