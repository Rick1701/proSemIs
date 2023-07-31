import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import ArrowBack from '@mui/icons-material/ArrowBack';

const UaereasRegistroPage = () => {
  const [formData, setFormData] = useState({
    uaerea_nombre: '',
    uaerea_base: null,
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

  const registerUaerea = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/uaerea', formData);
      console.log('Unidad aérea registrada:', response.data);
      setUaereaRegistrada(true); 
      setShowSuccessMessage(true); 
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error al registrar la unidad aérea:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBaseChange = (event, value) => {
    setFormData({
      ...formData,
      uaerea_base: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUaerea(formData);
    console.log(formData); 
  };

  return (
    <Layout>
      <h1>REGISTRO DE UNIDADES AÉREAS</h1>
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
        {/* Autocomplete para bases */}
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
          Unidad aerea registrada con éxito
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

export default UaereasRegistroPage;
