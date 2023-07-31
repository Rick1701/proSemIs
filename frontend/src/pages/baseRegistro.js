import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
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
      setBaseRegistrada(true); // Marcar la base como registrada exitosamente
      setShowSuccessMessage(true); // Mostrar el mensaje de éxito
      // Ocultar el mensaje de éxito después de segundos
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

  const handleSubmit = (a) => {
    a.preventDefault();
    registerBase(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE BASES</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="base_descripcion"
            label="Nombre"
            value={formData.base_descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            name="base_latitud"
            label="Latitud"
            value={formData.base_latitud}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            name="base_incendios_asistidos"
            label="Incendios Asistidos"
            value={formData.base_incendios_asistidos}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }} >Registrar</Button>
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
      {/* Agregar el botón de regresar */}
      <Link href="/home" passHref>
        <Button variant="contained" startIcon={<ArrowBack />} sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }}>
          Regresar
        </Button>
      </Link>
    </Layout>
  );
};

export default BaseRegistroPage;
