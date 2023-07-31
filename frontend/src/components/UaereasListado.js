import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const UaereasListado = () => {
  console.log('GestionarUaerea se ha montado');
  const [uaereas, setUaereas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/uaerea')
      .then(response => {
        setUaereas(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener las unidades aereas:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta unidad aérea?')) {
      axios.delete(`http://localhost:3001/api/uaerea/${id}`)
        .then(response => {
          setUaereas(prevUaereas => prevUaereas.filter(uaerea => uaerea._id !== id));
          console.log('Unidad aérea eliminada:', response.data);
        })
        .catch(error => {
          console.error('Error al eliminar la unidad aérea:', error);
        });
    }
  };

  console.log('hola', uaereas); // Verifica si se están recibiendo los datos correctamente

  const columns = [
    { field: 'uaerea_nombre', headerName: 'Nombre de la unidad', width: 150 },
    { field: 'uaerea_estado_unidad', headerName: 'Estado', width: 150 },
    { field: 'uaerea_incidente', headerName: 'Incidente', width: 150 },
    { field: 'uaerea_base', headerName: 'Base', width: 150 },
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

  const rows = uaereas.map(uaerea => ({
    id: uaerea._id,
    uaerea_nombre: uaerea.uaerea_nombre,
    uaerea_estado_unidad: uaerea.uaerea_estado_unidad ? uaerea.uaerea_estado_unidad.est_uni_descripcion : 'N/A',
    uaerea_incidente: uaerea.uaerea_incidente ? uaerea.uaerea_incidente.inc_descripcion : 'N/A',
    uaerea_base: uaerea.uaerea_base ? uaerea.uaerea_base.base_descripcion : 'N/A',
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default UaereasListado;
