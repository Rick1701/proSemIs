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

const UterrestreRegistroPage = () => {
  const [formData, setFormData] = useState({
    uterrestre_nombre: '',
    uterrestre_base: null,
  });
  const [basesOptions, setBasesOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  
  useEffect(() => {
    // Obtener las bases
    axios.get('http://localhost:3001/api/base')
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
      const response = await axios.post('http://localhost:3001/api/uterrestre', formData); 
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
        <div>
          <TextField
            name="uaerea_nombre"
            label="Nombre"
            value={formData.uaerea_nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Autocomplete para brigadista */}
        <div>
          <Autocomplete
            id="bri_base"
            options={basesOptions}
            getOptionLabel={(option) => option.base_descripcion} 
            value={formData.bri_base}
            onChange={handleBaseChange}
            renderInput={(params) => <TextField {...params} label="Base asociada" />}
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
          Unidad terrestre registrada con éxito
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

export default UterrestreRegistroPage;
