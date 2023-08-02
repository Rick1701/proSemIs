import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
const IncidentesListado = () => {
  console.log('GestionarIncidente se ha montado');
  const [incidentes, setIncidentes] = useState([]);
  const [brigadistas, setBrigadistas] = useState([]);
  useEffect(() => {
    axios.get('http://146.83.198.35:1047/api/incidente')
      .then(response => {
        setIncidentes(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los Incidentes:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://146.83.198.35:1047/api/brigadista')
      .then(response => {
        setBrigadistas(response.data.data);
        console.log("Daniiiiiii",response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los Brigadistas', error);
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
  console.log(brigadistas.brig_estado_brigadista);
  const rows = incidentes.map(incidente => ({
    id: incidente._id,
    inc_descripcion: incidente.inc_descripcion,
    inc_estado: incidente.inc_estado ? incidente.inc_estado.est_inc_descripcion : 'N/A',
    inc_brigadista: incidente.inc_brigadista.length > 0 ? incidente.inc_brigadista[0].brig_rut : 'N/A',
    inc_uaerea: incidente.inc_uaerea.length > 0 ? incidente.inc_uaerea[0].uaerea_nombre : 'N/A',
    inc_uterrestre: incidente.inc_uterrestre.length > 0 ? incidente.inc_uterrestre[0].uterrestre_nombre : 'N/A',
    inc_siniestro: incidente.inc_siniestro ? incidente.inc_siniestro.sin_numeroIncendio : 'N/A',
  }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default IncidentesListado;