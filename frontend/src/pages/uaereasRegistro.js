import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; 

const UaereasRegistroPage = () => {
  const [formData, setFormData] = useState({
    uaerea_nombre: '',
    uaerea_base: null,
  });
  const registerUaerea = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/uaerea', formData); 
      console.log('Unidad aerea registrada:', response.data);
    } catch (error) {
      console.error('Error al registrar la unidad aerea:', error);
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
      uaerea_base: values,
    });
  };

  const handleSubmit = (a) => {
    a.preventDefault();
    registerUaerea(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE UNIDADES AEREAS</h1>
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
            id="uaerea_base"
            options={[]}
            value={formData.uaerea_base}
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
