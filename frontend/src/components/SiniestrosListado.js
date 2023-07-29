import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { DataGrid } from '@mui/x-data-grid';
import SettingsIcon from '@mui/icons-material/Settings';


const SiniestrosListado = () => {
  console.log('SiniestrosListado se ha montado');
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

  //console.log('hola', siniestros); // Verifica si se están recibiendo los datos correctamente

  /* // Variable que recibe la id del siniestro desde la URL
  const { id } = router.query;
  // Estado inicial del siniestro
  const [siniestro, setSiniestro] = useState({
    sin_velocidadViento: '',
    sin_temperatura: '',
    sin_humedad: '',
    sin_fechaInicio: null,
    sin_fechaTermino: null,
    sin_latitud: '',
    sin_superficie: '',
    sin_distribucion_fuego: [],
    sin_categoria: null,
    sin_incidente: [],
    sin_bases_operando: [],
    sin_estado: '',
    sin_estrategia: '',
  });

  // Variable de estado para controlar si los datos se han cargado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const timestamp = Date.now(); // Obtiene el timestamp actual
      axios.get(`http://localhost:3001/api/siniestro/${id}?timestamp=${timestamp}`)
        .then(response => {
          setSiniestro(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los detalles del siniestro:', error);
        })
        .finally(() => {
          setLoading(false); // Actualiza el estado de loading a false cuando la solicitud se complete (ya sea éxito o error)
        });
    }
  }, []);
  */

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
    {
      field: 'administrarButton',
      headerName: 'Administrar',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Link href={`/siniestrosShow/${params.row.id}`}> {/* Utiliza el ID del siniestro para crear la URL */}
            <SettingsIcon style={{ cursor: 'pointer' }} />
        </Link>
      ),
    },
  ];

  // Mapea los siniestros para obtener las filas del DataGrid
  const rows = siniestros.map(siniestro => {
    // Busca la categoría correspondiente al siniestro en el array de categorías
    console.log("sin_bases_operando:", siniestro.sin_bases_operando);
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
      sin_incidente: siniestro.sin_incidente.join(', '),
      sin_bases_operando: siniestro.sin_bases_operando.length > 0 ? siniestro.sin_bases_operando[0].base_descripcion : 'N/A',      
      sin_estado: siniestro.sin_estado,
      sin_estrategia: siniestro.sin_estrategia,
    };
  });
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default SiniestrosListado;