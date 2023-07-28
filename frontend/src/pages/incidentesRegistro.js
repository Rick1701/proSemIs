import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'; 

const IncidenteRegistroPage = () => {
  const [formData, setFormData] = useState({
    inc_descripcion: '',
    inc_brigadista: null,
    inc_uaerea: null,
    inc_uterrestre: null,
    inc_siniestro: null,
  });
  const registerIncidente = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/incidente', formData); 
      console.log('incidente registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar el incidente:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBrigadistaChange = (event, values) => {
    setFormData({
      ...formData,
      inc_brigadista: values,
    });
  };

  const handleUaereaChange = (event, value) => {
    setFormData({
      ...formData,
      inc_uaerea: value,
    });
  };

  const handleUterrestreChange = (event, value) => {
    setFormData({
      ...formData,
      inc_uterrestre: value,
    });
  };

  const handleSiniestroChange = (event, value) => {
    setFormData({
      ...formData,
      inc_siniestro: value,
    });
  };

  const handleSubmit = (a) => {
    a.preventDefault();
    registerIncidente(formData);
    console.log(formData); // Solo para verificar que los datos se están capturando correctamente.
  };

  return (
    <Layout>
      <h1>REGISTRO DE INCIDENTES</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="inc_descripcion"
            label="Descripción del incidente"
            value={formData.inc_descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Autocomplete para brigadista */}
        <div>
          <Autocomplete
            id="inc_brigadista"
            options={[]}
            value={formData.inc_brigadista}
            onChange={handleBrigadistaChange}
            renderInput={(params) => <TextField {...params} label="Brigadista afectado" />}
        />
        </div>
        {/* Autocomplete para unidad aérea, unidad terrestre y siniestro */}
        <div>
          <Autocomplete
            id="inc_uaerea"
            options={[]}
            value={formData.inc_uaerea}
            onChange={handleUaereaChange}
            renderInput={(params) => <TextField {...params} label="unidad aerea afectada" />}
        />
        </div>
        {/* Autocomplete para unidad terrestre */}
        <div>
          <Autocomplete
            id="inc_uterrestre"
            options={[]}
            value={formData.inc_uterrestre}
            onChange={handleUterrestreChange}
            renderInput={(params) => <TextField {...params} label="unidad terrestre afectada" />}
        />
        </div>
        {/* Autocomplete para siniestro */}
        <div>
          <Autocomplete
            id="inc_siniestro"
            options={[]}
            value={formData.inc_siniestro}
            onChange={handleSiniestroChange}
            renderInput={(params) => <TextField {...params} label="siniestro asociado" />}
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

export default IncidenteRegistroPage;
