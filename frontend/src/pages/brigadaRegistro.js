import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';

const optionsEspecialidad = [
  "Ataque directo",
  "Ataque indirecto",
  "Trabajo en altura"
];

const BrigadaRegistroPage = () => {
  const [formData, setFormData] = useState({
    bri_nombre: '',
    bri_especialidad: '',
    bri_base: null,
  });
  const [brigadaRegistrada, setBrigadaRegistrada] = useState(false); 
  const [basesOptions, setBasesOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  useEffect(() => {
    // Obtener las bases
    axios.get('http://146.83.198.35:1047/api/base')
      .then(response => {
        const bases = response.data.data;
        setBasesOptions(bases);
      })
      .catch(error => {
        console.error('Error al obtener las bases:', error);
      });
  }, []);

  const registerBrigada = async (formData) => {
    try {
      const response = await axios.post('http://146.83.198.35:1047/api/brigada', formData); 
      console.log('Brigada registrada:', response.data);
      setBrigadaRegistrada(true);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
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
    <Grid container spacing={2}>
      {/* Campos a rellenar */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="bri_nombre"
          label="Nombre"
          value={formData.bri_nombre}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          id="bri_base"
          options={basesOptions}
          getOptionLabel={(option) => option.base_descripcion} 
          value={formData.bri_base}
          onChange={handleBaseChange}
          renderInput={(params) => <TextField {...params} label="Base asociada" fullWidth />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="bri_especialidad">Especialidad</InputLabel>
          <Select
            id="bri_especialidad"
            name="bri_especialidad"
            value={formData.bri_especialidad}
            onChange={handleEspecialidadChange}
            required
            style={{ marginBottom: '16px', minWidth: '200px' }} // Añadimos margen bottom y modificamos el ancho
          >
            {optionsEspecialidad.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    {/* Botones "Regresar" y "Registrar" */}
    <Grid container spacing={2}>
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
      Brigada registrada con éxito
    </div>
  )}
</Layout>
  );
};

export default BrigadaRegistroPage;
