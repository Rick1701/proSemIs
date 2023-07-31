import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';

const BaseRegistroPage = () => {
  const [formData, setFormData] = useState({
    base_descripcion: '',
    base_latitud: '',
    base_incendios_asistidos: '',
  });

  const [baseRegistrada, setBaseRegistrada] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const registerBase = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/base', formData);
      console.log('Base registrada:', response.data);
      setBaseRegistrada(true);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error al registrar la base:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerBase(formData);
    console.log(formData);
  };

  return (
    <Layout>
      <h1>REGISTRO DE BASES</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              name="base_descripcion"
              label="Nombre"
              value={formData.base_descripcion}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="base_latitud"
              label="Latitud"
              value={formData.base_latitud}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="base_incendios_asistidos"
              label="Incendios Asistidos"
              value={formData.base_incendios_asistidos}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Link href="/home" passHref>
            <Button
              type="submit"
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }}
              fullWidth
            >
              Regresar
            </Button>
          </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }}
              fullWidth
            >
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
          Base registrada con éxito
        </div>
      )}
    </Layout>
  );
};

export default BaseRegistroPage;
