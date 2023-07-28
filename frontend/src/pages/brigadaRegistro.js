import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'; 

const optionsEspecialidad = [
  "Especialistas en ataque directo",
  "Especialistas en ataque indirecto"
];

const BrigadaRegistroPage = () => {
  const [formData, setFormData] = useState({
    bri_nombre: '',
    bri_especialidad: '',
    bri_base: null,
  });

  const registerBrigada = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/brigada', formData); 
      console.log('Brigada registrada:', response.data);
    } catch (error) {
      console.error('Error al registrar la brigada:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBaseChange = (event, values) => {
    setFormData({
      ...formData,
      bri_base: values,
    });
  };

  const handleEspecialidadChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      bri_especialidad: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerBrigada(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE BRIGADA</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="bri_nombre"
            label="Nombre"
            value={formData.bri_nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <FormControl>
            <Select
              name="bri_especialidad"
              value={formData.bri_especialidad}
              onChange={handleEspecialidadChange}
              required
            >
              <MenuItem value="" disabled>Selecciona una especialidad</MenuItem>
              {optionsEspecialidad.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Autocomplete
            id="bri_base"
            options={[]}
            value={formData.bri_base}
            onChange={handleBaseChange}
            renderInput={(params) => <TextField {...params} label="Base asociada" />}
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

export default BrigadaRegistroPage;
