import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';

const BrigadistaRegistroPage = () => {
  const [formData, setFormData] = useState({
    brig_rut: '',
    brig_nombres: '',
    brig_apellidos: '',
    brig_sexo: '',
    brig_edad: '',
    brig_brigada: null,
  });

  const sexoOptions = ["Masculino", "Femenino", "Otro"]; // Opciones para el campo "Sexo"
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [brigadaOptions, setBrigadaOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [brigadistaRegistrado, setBrigadistaRegistrado] = useState(false); 
  useEffect(() => {
    // Obtener las brigadas
    axios.get('http://localhost:3001/api/brigada')
      .then(response => {
        const brigadas = response.data.data;
        setBrigadaOptions(brigadas); // Corregir el nombre de la función a setBrigadaOptions
      })
      .catch(error => {
        console.error('Error al obtener las brigadas:', error);
      });
  }, []);


  const registerBrigadista = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/brigadista', formData);
      console.log('Brigadista registrado:', response.data);
      setRegistroExitoso(true); // Establecer el estado de registro exitoso en true
      setBrigadistaRegistrado(true);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error al registrar el brigadista:', error);
      setRegistroExitoso(false); // Establecer el estado de registro exitoso en false
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBrigadaChange = (event, value) => {
    setFormData({
      ...formData,
      brig_brigada: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerBrigadista(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE BRIGADISTAS</h1>
      {registroExitoso ? ( // Mostrar el mensaje de registro exitoso si el estado es true
        <div>
          <p>Registro exitoso</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Campos a rellenar */}
            <TextField
              name="brig_rut"
              label="RUT"
              value={formData.brig_rut}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }} // Añadimos margen inferior
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="brig_nombres"
              label="Nombres"
              value={formData.brig_nombres}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }} // Añadimos margen inferior
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="brig_apellidos"
              label="Apellidos"
              value={formData.brig_apellidos}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }} // Añadimos margen inferior
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Utilizamos Autocomplete para el campo "Sexo" */}
            <Autocomplete
              name="brig_sexo"
              options={sexoOptions}
              getOptionLabel={(option) => option}
              value={formData.brig_sexo}
              onChange={(event, newValue) => setFormData({ ...formData, brig_sexo: newValue })}
              renderInput={(params) => <TextField {...params} label="Sexo" required />}
              style={{ marginBottom: '16px' }} // Añadimos margen inferior
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="brig_edad"
              label="Edad"
              value={formData.brig_edad}
              onChange={handleInputChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              name="brig_brigada"
              options={brigadaOptions}
              getOptionLabel={(option) => option.bri_nombre}
              value={formData.brig_brigada}
              onChange={handleBrigadaChange}
              renderInput={(params) => <TextField {...params} label="Brigada" />}
              style={{ marginBottom: '16px' }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '-10px' }}>
          <Grid item xs={12} sm={6}>
            <Link href="/home" passHref>
              <Button variant="contained" startIcon={<ArrowBack />} sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }} fullWidth>
                Regresar
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }} fullWidth>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
      {showSuccessMessage && (
        <div
          style={{
            background: 'green',
            color: 'white',
            padding: '10px',
            marginTop: '10px',
            textAlign: 'center',
            borderRadius: '4px',
          }}
        >
          Brigadista registrado con éxito
        </div>
      )}
    </Layout>

  );
};

export default BrigadistaRegistroPage;
