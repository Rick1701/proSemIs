import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

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
  const [brigadaOptions, setBrigadaOptions] = useState([]); // Opciones para el campo "Brigada"


  const registerBrigadista = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/brigadista', formData);
      console.log('Brigadista registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar el brigadista:', error);
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
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="brig_rut"
            label="RUT"
            value={formData.brig_rut}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            name="brig_nombres"
            label="Nombres"
            value={formData.brig_nombres}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <TextField
            name="brig_apellidos"
            label="Apellidos"
            value={formData.brig_apellidos}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          {/* Utilizamos Autocomplete para el campo "Sexo" */}
          <Autocomplete
            name="brig_sexo"
            options={sexoOptions}
            getOptionLabel={(option) => option}
            value={formData.brig_sexo}
            onChange={(event, newValue) => setFormData({ ...formData, brig_sexo: newValue })}
            renderInput={(params) => <TextField {...params} label="Sexo" required />}
          />
        </div>
        <div>
          <TextField
            name="brig_edad"
            label="Edad"
            value={formData.brig_edad}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          {/* Utilizamos Autocomplete para el campo "Brigada" */}
          <Autocomplete
            name="brig_brigada"
            options={brigadaOptions}
            getOptionLabel={(option) => option.nombre} // Ajustar al nombre de la propiedad que representa el nombre de la base en tu objeto base
            value={formData.brig_brigada}
            onChange={handleBrigadaChange}
            renderInput={(params) => <TextField {...params} label="Brigada" />}
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


export default BrigadistaRegistroPage;
