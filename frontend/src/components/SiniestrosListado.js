import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { DataGrid } from '@mui/x-data-grid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const SiniestrosListado = () => {
  const [siniestros, setSiniestros] = useState([]);


  useEffect(() => {
    // Obtener los siniestros
    axios.get('http://localhost:3001/api/siniestro')
      .then(response => {
        setSiniestros(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los siniestros:', error);
      });
  }, []);


  if (!Array.isArray(siniestros)) {
    return <p>No se encontraron siniestros.</p>;
  }

  // Función para manejar el clic del enlace "Administrar" y mostrar detalles del siniestro
  const handleAdministrarClick = (row) => {
    // Aquí puedes realizar alguna acción al hacer clic en el enlace "Administrar" para una fila específica
    console.log('Administrar siniestro:', row.id);
    // Por ejemplo, puedes mostrar un diálogo o redirigir a otra página para ver los detalles del siniestro.
    console.log('Mostrar detalles del siniestro:', row.id);
  };

  const columns = [
    {
      field: 'administrarButton',
      headerName: 'Detalles',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Link href={`/siniestrosShow/${params.row.id}`}> {/* Utiliza el ID del siniestro para crear la URL */}
            <ContentPasteSearchIcon style={{ cursor: 'pointer' }} />
        </Link>
      ),
    },
    { field: 'sin_numeroIncendio', headerName: 'N° Incendio', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_velocidadViento', headerName: 'Vlocidad Viento ( nudos )  ', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_temperatura', headerName: 'Temperatura ( ° )', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_humedad', headerName: 'Humedad ( % )', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_fechaInicio', headerName: 'Fecha de Inicio', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_fechaTermino', headerName: 'Fecha de Termino', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_latitud', headerName: 'Latitud ( ° )', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_longitud', headerName: 'Longitud ( ´ )', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_superficie', headerName: 'Superficie', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_distribucion_fuego', headerName: 'Distribución de Fuego', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_categoria', headerName: 'Categoría', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_incidente', headerName: 'Incidente', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_bases_operando', headerName: 'Bases Operando', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_estado', headerName: 'Estado', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'sin_estrategia', headerName: 'Estrategia', width: 150 },

  ];

  // Mapea los siniestros para obtener las filas del DataGrid
  const rows = siniestros.map(siniestro => {
    // Busca la categoría correspondiente al siniestro en el array de categorías
    // Crea un objeto con las propiedades necesarias para el DataGrid
    return {
      id: siniestro._id,
      sin_numeroIncendio: siniestro.sin_numeroIncendio,
      sin_velocidadViento: siniestro.sin_velocidadViento,
      sin_temperatura: siniestro.sin_temperatura,
      sin_humedad: siniestro.sin_humedad,
      sin_fechaInicio: new Date(siniestro.sin_fechaInicio).toLocaleDateString(), // Formatea la fecha de inicio
      sin_fechaTermino: new Date(siniestro.sin_fechaTermino).toLocaleDateString(), // Formatea la fecha de termino
      sin_latitud: siniestro.sin_latitud,
      sin_longitud: siniestro.sin_longitud,
      sin_superficie: siniestro.sin_superficie,
      sin_distribucion_fuego: siniestro.sin_distribucion_fuego.join(', '),
      sin_categoria: siniestro.sin_categoria ? siniestro.sin_categoria.cat_nivel : 'N/A',// Utilizamos la propiedad cat_nivel de la categoría
      sin_incidente: siniestro.sin_incidente.length > 0 ? siniestro.sin_incidente[0].inc_descripcion : 'N/A',      
      sin_bases_operando: siniestro.sin_bases_operando.length > 0 ? siniestro.sin_bases_operando[0].base_descripcion : 'N/A',      
      sin_estado: siniestro.sin_estado,
      sin_estrategia: siniestro.sin_estrategia,
    };
  });
  return (
    <div style={{ height: 500, width: '100%' }}>
      {/* Modificar los colores de la tabla */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          // Personalizar el encabezado de la tabla
          Header: ({ headerClassName, ...props }) => (
            <div
              className={`${headerClassName} custom-header`}
              style={{
                backgroundColor: '#f5f5f5', // Color de fondo del encabezado
                borderBottom: '1px solid #ccc', // Borde inferior
                color: '#333', // Color del texto del encabezado
                fontWeight: 'bold', // Fuente en negrita
              }}
              {...props}
            />
          ),
          
          }}
          sx={{
            // Estilo global para la tabla (opcional)
            '.custom-header': {
              fontSize: '16px', // Tamaño de fuente del encabezado
            },
            '.custom-cell': {
              fontSize: '14px', // Tamaño de fuente de las celdas
            },
            '.MuiDataGrid-row': {
              // Estilo de las filas de la tabla
              '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9', // Color de fondo de las filas impares
              },
              '&:hover': {
                backgroundColor: '#f0f0f0', // Color de fondo al pasar el mouse por encima
              },
            },
          }}
        />
    </div>
  );
};

export default SiniestrosListado;