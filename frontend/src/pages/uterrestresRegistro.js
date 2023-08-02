import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; 
import ArrowBack from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';

const UterrestreRegistroPage = () => {
  const [formData, setFormData] = useState({
    uterrestre_nombre: '',
    uterrestre_base: null,
  });
  const [basesOptions, setBasesOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [uterrestreRegistrada, setUterrestreRegistrada] = useState(false); 
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
  const registerUterrestre = async (formData) => {
    try {
      const response = await axios.post('http://146.83.198.35:1047/api/uterrestre', formData); 
      console.log('Unidad terrestre registrada:', response.data);
      setUterrestreRegistrada(true);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error al registrar la unidad terrestre:', error);
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
      uterrestre_base: values,
    });
  };

  const handleSubmit = (a) => {
    a.preventDefault();
    registerUterrestre(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
    <h1>REGISTRO DE UNIDADES TERRESTRES</h1>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Campos a rellenar */}
        <Grid item xs={12} sm={6} textAlign="center">
          <TextField
            name="uterrestre_nombre"
            label="Nombre"
            value={formData.uterrestre_nombre}
            onChange={handleInputChange}
            required
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Autocomplete para base */}
          <Autocomplete
            id="bri_base"
            options={basesOptions}
            getOptionLabel={(option) => option.base_descripcion}
            value={formData.uterrestre_base}
            onChange={handleBaseChange}
            renderInput={(params) => <TextField {...params} label="Base asociada" />}
            style={{ marginBottom: '16px' }}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* Botones "Regresar" y "Registrar" */}
      <Grid container spacing={2} style={{ marginTop: '-20px' }}>
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
        Unidad terrestre registrada con éxito
      </div>
    )}
  </Layout>
  );
};

export default UterrestreRegistroPage;
