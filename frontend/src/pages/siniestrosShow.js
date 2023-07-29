import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dayjs from 'dayjs';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material'; // Importa los iconos que desees usar
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EventIcon from '@mui/icons-material/Event';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import WhatshotIcon from '@mui/icons-material/Whatshot';



import axios from 'axios';

// Función que configura la Typography con estilo estándar
const FieldTitle = ({ title, icon }) => {
  return (
    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontFamily: 'Arial', fontWeight: 'bold' }}>
      {icon} {title} 
    </Typography>
  );
};


const SiniestrosRegistroPage = () => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
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

  // Función para registrar el siniestro en el backend
  const registerSiniestro = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/siniestro', formData);
      //console.log('Siniestro registrado:', response.data._id);
  
      // Luego, obtienes el ID del siniestro registrado desde la respuesta
      const { _id } = response.data;
      console.log('ID del siniestro:', _id);
    
      // Realizas la segunda solicitud GET para obtener la estrategia del siniestro
      if (_id) {
        console.log('Realizando solicitud GET para obtener la estrategia del siniestro...');
        const estrategiaResponse = await axios.get(`http://localhost:3001/api/siniestro/estrategia/${_id}`);
        console.log('Estrategia del siniestro:', estrategiaResponse.data);
      }
  
      // Puedes mostrar una notificación de éxito o redirigir al usuario a la página de inicio
    } catch (error) {
      console.error('Error al registrar el siniestro:', error);
      // Puedes mostrar una notificación de error o informar al usuario sobre el problema
    }
  };

  // Manejador de cambio de los campos de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador de cambio para el campo de "Distribución del Fuego"
  const handleDistribucionFuegoChange = (event, values) => {
    setFormData({
      ...formData,
      sin_distribucion_fuego: values,
    });
  };

  // Manejador de cambio para el campo de "Categoría"
  const handleCategoriaChange = (event, value) => {
    setFormData({
      ...formData,
      sin_categoria: value,
    });
  };

  // Manejador de cambio para el campo de "Incidente"
  const handleIncidenteChange = (event, value) => {
    setFormData({
      ...formData,
      sin_incidente: value,
    });
  };

  // Función para manejar el cambio de fecha en sin_fechaInicio
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      sin_fechaInicio: date,
    });
  };

  // Manejador de cambio para el campo de "Bases Operando"
  const handleBasesOperandoChange = (event, value) => {
    setFormData({
      ...formData,
      sin_bases_operando: value,
    });
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    registerSiniestro(formData); // Llama a la función para registrar el siniestro en el backend
    // Aquí puedes enviar el formData al backend para registrar el siniestro
    // mediante una función o servicio que se comunique con el backend.
    // Por ejemplo, podrías llamar a una función "registerSiniestro(formData)".
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE SINIESTROS</h1>
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2} style={{ marginTop: '70px' }}>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Velocidad del Viento:" icon={<AirIcon fontSize="small" style={{ marginRight: '4px' }} />} />
            <TextField
              label="En nudos (ej: '15')"
              name="sin_velocidadViento"
              value={formData.sin_velocidadViento}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Temperatura:" icon={<FilterDramaIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <TextField
              label="En grados (ej: '20')"
              name="sin_temperatura"
              value={formData.sin_temperatura}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Porcentaje de Humedad:" icon={<BloodtypeIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <TextField
              label="En porcentajes enteros (ej: '40')"
              name="sin_humedad"
              value={formData.sin_humedad}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Fecha de Inicio:" icon={<EventIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ dayOfMonth: 'DD', month: 'MM', year: 'YYYY' }}>
              <DatePicker
                label=""
                value={formData.sin_fechaInicio}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '70px' }}>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Latitud:" icon={<TravelExploreIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <TextField
              label="En grados (ej: '37')"
              name="sin_latitud"
              value={formData.sin_latitud}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Superficie:" icon={<TabUnselectedIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <TextField
              label="En hectáreas (ej: '4000')"
              name="sin_superficie"
              value={formData.sin_superficie}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldTitle title="Distribución del Fuego" icon={<WhatshotIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
            <Autocomplete
              multiple
              id="sin_distribucion_fuego"
              options={['copas', 'superficie', 'subsuelo']}
              value={formData.sin_distribucion_fuego}
              onChange={handleDistribucionFuegoChange}
              renderInput={(params) => <TextField {...params} label="Seleccione una distribución" fullWidth />}
            />
          </Grid>
          {/*<Grid item xs={12} sm={3}>
            <Typography variant="" style={{ marginBottom: '8px', fontFamily: 'Arial', fontWeight: 'bold' }}>
              Categoría
            </Typography>
            <Autocomplete
              id="sin_categoria"
              options={[]} // Agregar las opciones disponibles para las categorías
              value={formData.sin_categoria}
              onChange={handleCategoriaChange}
              renderInput={(params) => <TextField {...params} label="Seleccione una categoría" fullWidth />}
            />
          </Grid>*/}
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '70px' }}>
          {/*<Grid item xs={12} sm={4}>
            <Typography variant="" style={{ marginBottom: '8px', fontFamily: 'Arial', fontWeight: 'bold' }}>
              Incidente
            </Typography>
            <Autocomplete
              multiple
              id="sin_incidente"
              options={[]} // Agregar las opciones disponibles para los incidentes
              value={formData.sin_incidente}
              onChange={handleIncidenteChange}
              renderInput={(params) => <TextField {...params} label="Incidente" fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="" style={{ marginBottom: '8px', fontFamily: 'Arial', fontWeight: 'bold' }}>
              Bases Operando
            </Typography>
            <Autocomplete
              multiple
              id="sin_bases_operando"
              options={[]} // Agregar las opciones disponibles para las bases operando
              value={formData.sin_bases_operando}
              onChange={handleBasesOperandoChange}
              renderInput={(params) => <TextField {...params} label="Bases Operando" fullWidth />}
            />
          </Grid>*/}
          <Grid item xs={12} sm={8}>
            <FieldTitle title="Estado siniestro:" icon={<AirIcon fontSize="small" style={{ marginRight: '4px' }} />}  /> 
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sin_estado === 'iniciacion'}
                  onChange={handleInputChange}
                  name="sin_estado"
                  value="iniciacion"
                />
              }
              label="Iniciación"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sin_estado === 'propagacion'}
                  onChange={handleInputChange}
                  name="sin_estado"
                  value="propagacion"
                />
              }
              label="Propagación"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sin_estado === 'extincion'}
                  onChange={handleInputChange}
                  name="sin_estado"
                  value="extincion"
                />
              }
              label="Extinción"
            />
          </Grid>
        </Grid>


        <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: '70px' }}>
          <Grid item>
            <Button endIcon={<Save />} type="submit">Registrar</Button>
          </Grid>
          <Grid item>
            {/* botón de regresar */}
            <Link href="/home">
              <Button endIcon={<ArrowBack />}>Cancelar</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default SiniestrosRegistroPage;
