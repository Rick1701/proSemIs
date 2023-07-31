import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'; 

const UterrestresListado = () => {
  console.log('Gestionaruterrestre se ha montado');
  const [uterrestres, setUterrestres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/uterrestre')
      .then(response => {
        setUterrestres(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener las unidades terrestres:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta unidad terrestre?')) {
      axios.delete(`http://localhost:3001/api/uterrestre/${id}`)
        .then(response => {
          setUterrestres(prevUterrestres => prevUterrestres.filter(uterrestre => uterrestre._id !== id));
          console.log('Unidad terrestre eliminada:', response.data);
        })
        .catch(error => {
          console.error('Error al eliminar la unidad terrestre:', error);
        });
    }
  };

  console.log('hola', uterrestres); // Verifica si se están recibiendo los datos correctamente

  const columns = [
    { field: 'uterrestre_nombre', headerName: 'Nombre de la unidad', width: 150 },
    { field: 'uterrestre_estado_unidad', headerName: 'Estado', width: 150 },
    { field: 'uterrestre_incidente', headerName: 'Incidente', width: 150 },
    { field: 'uterrestre_base', headerName: 'Base', width: 150 },
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

  const rows = uterrestres.map(uterrestre => ({
    id: uterrestre._id,
    uterrestre_nombre: uterrestre.uterrestre_nombre,
    uterrestre_estado_unidad: uterrestre.uterrestre_estado_unidad ? uterrestre.uterrestre_estado_unidad.est_uni_descripcion : 'N/A',
    uterrestre_incidente: uterrestre.uterrestre_incidente ? uterrestre.uterrestre_incidente.inc_descripcion : 'N/A',
    uterrestre_base: uterrestre.uterrestre_base ? uterrestre.uterrestre_base.base_descripcion : 'N/A',
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default UterrestresListado;
