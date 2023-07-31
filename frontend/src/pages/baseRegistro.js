import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; 

const BaseRegistroPage = () => {
  const [formData, setFormData] = useState({
    base_descripcion: '',
    base_latitud: '',
    base_incendios_asistidos: '',
  });
  const registerBase = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/base', formData); 
      console.log('Base registrada:', response.data);
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
        <Button type="submit">Registrar</Button>
      </form>
      {/* Agregar el botón de regresar */}
      <Link href="/home">
        <Button>Regresar</Button>
      </Link>
    </Layout>
  );
};

export default BaseRegistroPage;
