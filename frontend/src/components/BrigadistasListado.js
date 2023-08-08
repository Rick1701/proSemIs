import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const BrigadistasListado = () => {
  console.log('Brigadistas se ha montado');
  const [brigadistas, setBrigadistas] = useState([]);

  useEffect(() => {
    axios.get('http://146.83.198.35:1047/api/brigadista')
      .then(response => {
        setBrigadistas(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los brigadistas:', error);
      });
  }, []);


  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este brigadista?')) {
      axios.delete(`http://146.83.198.35:1047/api/brigadista/${id}`)
        .then(response => {
          setBrigadistas(prevBrigadistas => prevBrigadistas.filter(brigadista => brigadista._id !== id));
          console.log('Brigadista eliminado:', response.data);
        })
        .catch(error => {
          console.error('Error al eliminar el brigadista:', error);
        });
    }
  };

  if (!Array.isArray(brigadistas)) {
    return <p>No se encontraron brigadistas.</p>;
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
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const rows = brigadistas.map(brigadista => ({
    id: brigadista._id,
    brig_rut: brigadista.brig_rut,
    brig_nombres: brigadista.brig_nombres,
    brig_apellidos: brigadista.brig_apellidos,
    brig_sexo: brigadista.brig_sexo,
    brig_edad: brigadista.brig_edad,
    brig_estado_brigadista: brigadista.brig_estado_brigadista ? brigadista.brig_estado_brigadista.estab_descripcion : 'N/A',
    brig_brigada: brigadista.brig_brigada ? brigadista.brig_brigada.bri_nombre : 'N/A' ,
    brig_incidente: brigadista.brig_incidente ? brigadista.brig_incidente.inc_descripcion : 'N/A',
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default BrigadistasListado;
