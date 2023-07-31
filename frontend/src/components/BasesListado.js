import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const BasesListado = ({ bases, setEditingBaseId, onDelete }) => {
  const columns = [
    { field: 'base_descripcion', headerName: 'Nombre de la base', width: 150 },
    { field: 'base_latitud', headerName: 'Latitud', width: 70 },
    { field: 'base_incendios_asistidos', headerName: 'Incendios asistidos', width: 150 },
    { field: 'base_incendio_actual', headerName: 'Combate actual', width: 120 },
    { field: 'base_uterrestre', headerName: 'Unidades terrestres', width: 150 },
    { field: 'base_uaerea', headerName: 'Unidades aereas', width: 120 },
    { field: 'base_brigada', headerName: 'Brigadas', width: 100 },
    { field: 'base_estado', headerName: 'Estado de la base', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            if (window.confirm('¿Estás seguro de eliminar esta base?')) {
              onDelete(params.id);
            }
          }}
        >
          Eliminar
        </Button>
      </div>
      ),
    },
  ];

  const rows = bases.map((base) => ({
    id: base._id,
    base_descripcion: base.base_descripcion,
    base_latitud: base.base_latitud,
    base_incendios_asistidos: base.base_incendios_asistidos,
    base_incendio_actual: base.base_incendio_actual,
    base_uterrestre: base.base_uterrestre.length,
    base_uaerea: base.base_uaerea.length,
    base_brigada: base.base_brigada.length,
    base_estado: base.base_estado,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default BasesListado;


