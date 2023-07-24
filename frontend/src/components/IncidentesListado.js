import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';

const IncidentesListado = () => {
  console.log('GestionarIncidente se ha montado');
  const [incidentes, setIncidentes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/incidente')
      .then(response => {
        setIncidentes(response.data.data); // Modifica esta línea
      })
      .catch(error => {
        console.error('Error al obtener los Incidentes:', error);
      });
  }, []);

  console.log('hola', incidentes); // Verifica si se están recibiendo los datos correctamente

  if (!Array.isArray(incidentes)) {
    return <p>No se encontraron los incidentes.</p>;
  }

  const columns = [
    { field: 'inc_descripcion', headerName: 'Descripcion', width: 150 },
    { field: 'inc_estado', headerName: 'Estado', width: 150 },
    { field: 'inc_brigadista', headerName: 'Brigadistas afectados', width: 150 },
    { field: 'inc_uaerea', headerName: 'Unidades aereas afectadas', width: 150 },
    { field: 'inc_uterrestre', headerName: 'Unidades terrestres afectadas', width: 150 },
    { field: 'inc_siniestro', headerName: 'Siniestro asociado', width: 150 },
  ];

  const rows = incidentes.map(incidente => ({
    id: incidente._id,
    inc_descripcion: incidente.inc_descripcion,
    inc_estado: incidente.inc_estado,
    inc_brigadista: incidente.inc_brigadista,
    inc_uaerea: incidente.inc_uaerea,
    inc_uterrestre: incidente.inc_uterrestre,
    inc_siniestro: incidente.inc_siniestro,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default IncidentesListado;