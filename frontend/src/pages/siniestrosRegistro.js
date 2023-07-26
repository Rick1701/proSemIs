import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Asegúrate de importar el AdapterDayjs correctamente.
import Dayjs from 'dayjs';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; 




const SiniestrosRegistroPage = () => {
  const [formData, setFormData] = useState({
    sin_velocidadViento: '',
    sin_temperatura: '',
    sin_humedad: '',
    sin_fechaInicio: null, // Cambiar a null para que funcione el DatePicker
    sin_fechaTermino: null, // Cambiar a null para que funcione el DatePicker
    sin_latitud: '10',
    sin_superficie: '2000',
    sin_distribucion_fuego: [],
    sin_categoria: null,
    sin_incidente: [],
    sin_bases_operando: [],
    sin_estado: '',
    sin_estrategia: '',
  });

  
  const registerSiniestro = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/siniestro', formData); // Asegúrate de tener la URL correcta para el endpoint de creación de siniestros
      console.log('Siniestro registrado:', response.data); // Puedes mostrar una notificación de éxito o redirigir al usuario a la página de inicio
    } catch (error) {
      console.error('Error al registrar el siniestro:', error);
      // Puedes mostrar una notificación de error o informar al usuario sobre el problema
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDistribucionFuegoChange = (event, values) => {
    setFormData({
      ...formData,
      sin_distribucion_fuego: values,
    });
  };

  const handleCategoriaChange = (event, value) => {
    setFormData({
      ...formData,
      sin_categoria: value,
    });
  };

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

  const handleBasesOperandoChange = (event, value) => {
    setFormData({
      ...formData,
      sin_bases_operando: value,
    });
  };


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
        <div>
          <TextField
            label="Velocidad del Viento"
            name="sin_velocidadViento"
            value={formData.sin_velocidadViento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            label="Temperatura"
            name="sin_temperatura"
            value={formData.sin_temperatura}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            label="Porcentaje de Humedad"
            name="sin_humedad"
            value={formData.sin_humedad}
            onChange={handleInputChange}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de Inicio"
            value={formData.sin_fechaInicio}
            onChange={handleDateChange}
            textField={(params) => <TextField {...params} />} // Utiliza el slot `textField` para personalizar el campo de texto
          />
        </LocalizationProvider>
        {/* Agregar los demás campos del formulario siguiendo el mismo patrón */}
        <Autocomplete
          multiple
          id="sin_distribucion_fuego"
          options={["copas", "superficie", "subsuelo"]}
          value={formData.sin_distribucion_fuego}
          onChange={handleDistribucionFuegoChange}
          renderInput={(params) => (
            <TextField {...params} label="Distribución del Fuego" />
          )}
        />
        <Autocomplete
          id="sin_categoria"
          options={[] /* Aquí debes agregar las opciones disponibles para las categorías */}
          value={formData.sin_categoria}
          onChange={handleCategoriaChange}
          renderInput={(params) => <TextField {...params} label="Categoría" />}
        />
        <Autocomplete
          multiple
          id="sin_incidente"
          options={[] /* Aquí debes agregar las opciones disponibles para los incidentes */}
          value={formData.sin_incidente}
          onChange={handleIncidenteChange}
          renderInput={(params) => <TextField {...params} label="Incidente" />}
        />
        <Autocomplete
          multiple
          id="sin_bases_operando"
          options={[] /* Aquí debes agregar las opciones disponibles para las bases operando */}
          value={formData.sin_bases_operando}
          onChange={handleBasesOperandoChange}
          renderInput={(params) => <TextField {...params} label="Bases Operando" />}
        />
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
        <div>
          <TextField
            label="Estrategia"
            name="sin_estrategia"
            value={formData.sin_estrategia}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Registrar Siniestro</Button>
      </form>
      {/* Agregar el botón de regresar */}
      <Link href="/home">
        <Button>Regresar</Button>
      </Link>
    </Layout>
  );
};

export default SiniestrosRegistroPage;
