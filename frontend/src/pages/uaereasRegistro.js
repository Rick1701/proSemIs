import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const UaereasRegistroPage = () => {
  const [formData, setFormData] = useState({
    uaerea_nombre: '',
    uaerea_base: null,
  });

  const [basesOptions, setBasesOptions] = useState([]);

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
        <Button type="submit">Registrar</Button>
      </form>
      {/* Agregar el botón de regresar */}
      <Link href="/home">
        <Button>Regresar</Button>
      </Link>
    </Layout>
  );
};

export default UaereasRegistroPage;
