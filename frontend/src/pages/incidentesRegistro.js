import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const IncidenteRegistroPage = () => {
  const [formData, setFormData] = useState({
    inc_descripcion: '',
    inc_brigadista: null,
    inc_uaerea: null,
    inc_uterrestre: null,
    inc_siniestro: null,
  });

  const [brigadistasOptions, setBrigadistasOptions] = useState([]);
  const [uaereasOptions, setUaereasOptions] = useState([]);
  const [uterrestresOptions, setUterrestresOptions] = useState([]);
  const [siniestrosOptions, setSiniestrosOptions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [incidenteRegistrada, setIncidenteRegistrado] = useState(false);
  useEffect(() => {
    // Obtener los brigadistas
    axios.get('http://146.83.198.35:1047/api/brigadista')
      .then(response => {
        const brigadistas = response.data.data;
        setBrigadistasOptions(brigadistas);
      })
      .catch(error => {
        console.error('Error al obtener los brigadistas:', error);
      });

    // Obtener las unidades aéreas
    axios.get('http://146.83.198.35:1047/api/uaerea')
      .then(response => {
        const uaereas = response.data.data;
        setUaereasOptions(uaereas);
      })
      .catch(error => {
        console.error('Error al obtener las unidades aéreas:', error);
      });

    // Obtener las unidades terrestres
    axios.get('http://146.83.198.35:1047/api/uterrestre')
      .then(response => {
        const uterrestres = response.data.data;
        setUterrestresOptions(uterrestres);
      })
      .catch(error => {
        console.error('Error al obtener las unidades terrestres:', error);
      });

    // Obtener los siniestros
    axios.get('http://146.83.198.35:1047/api/siniestro')
      .then(response => {
        const siniestros = response.data.data;
        setSiniestrosOptions(siniestros);
      })
      .catch(error => {
        console.error('Error al obtener los siniestros:', error);
      });
  }, []);

  const registerIncidente = async (formData) => {
    try {
      const response = await axios.post('http://146.83.198.35:1047/api/incidente', formData);
      console.log('incidente registrado:', response.data);
      setIncidenteRegistrado(true); 
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si el brigadista seleccionado está disponible
    const selectedBrigadista = brigadistasOptions.find(brigadista => brigadista.brig_rut === formData.inc_brigadista);
if (selectedBrigadista) {
  // Obtener el estado del brigadista seleccionado
  const brigadistaEstado = selectedBrigadista.estado_brigadista.estab_descripcion;
  if (brigadistaEstado === 'No Disponible') {
    alert('El brigadista seleccionado no está disponible. Por favor, elige otro brigadista.');
    return;
  }
}


    // Verificar si la unidad aérea seleccionada está operativa
    const selectedUaerea = uaereasOptions.find(uaerea => uaerea.uaerea_nombre === formData.inc_uaerea);
    if (selectedUaerea && selectedUaerea.estado === 'No Operativa') {
      alert('La unidad aérea seleccionada no está operativa. Por favor, elige otra unidad.');
      return;
    }

    // Verificar si la unidad terrestre seleccionada está operativa
    const selectedUterrestre = uterrestresOptions.find(uterrestre => uterrestre.uterrestre_nombre === formData.inc_uterrestre);
    if (selectedUterrestre && selectedUterrestre.estado === 'No Operativa') {
      alert('La unidad terrestre seleccionada no está operativa. Por favor, elige otra unidad.');
      return;
    }

    // Continuar con el registro del incidente si todo está correcto
    registerIncidente(formData);
    console.log(formData);
  };

  return (
    <Layout>
      <h1>REGISTRO DE INCIDENTES</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="inc_descripcion"
            label="Descripción del incidente"
            value={formData.inc_descripcion}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="inc_brigadista"
            options={brigadistasOptions}
            getOptionLabel={(option) => option.brig_rut} // Opción a mostrar en el campo
            value={formData.inc_brigadista}
            onChange={(event, newValue) => setFormData({ ...formData, inc_brigadista: newValue })}
            renderInput={(params) => <TextField {...params} label="Brigadista afectado" />}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="inc_uaerea"
            options={uaereasOptions}
            getOptionLabel={(option) => option.uaerea_nombre} // Opción a mostrar en el campo
            value={formData.inc_uaerea}
            onChange={(event, newValue) => setFormData({ ...formData, inc_uaerea: newValue })}
            renderInput={(params) => <TextField {...params} label="Unidad aérea afectada" />}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="inc_uterrestre"
            options={uterrestresOptions}
            getOptionLabel={(option) => option.uterrestre_nombre} // Opción a mostrar en el campo
            value={formData.inc_uterrestre}
            onChange={(event, newValue) => setFormData({ ...formData, inc_uterrestre: newValue })}
            renderInput={(params) => <TextField {...params} label="Unidad terrestre afectada" />}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="inc_siniestro"
            options={siniestrosOptions}
            getOptionLabel={(option) => option.sin_numeroIncendio} // Opción a mostrar en el campo
            value={formData.inc_siniestro}
            onChange={(event, newValue) => setFormData({ ...formData, inc_siniestro: newValue })}
            renderInput={(params) => <TextField {...params} label="Siniestro asociado" />}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
              <Grid item xs={12} sm={6} textAlign="left">
                <Link href="/home" passHref>
                  <Button variant="contained" startIcon={<ArrowBack />} sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }} fullWidth>
                    Regresar
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Button type="submit" sx={{ bgcolor: '#313236', color: '#FFFFFF', '&:hover': { bgcolor: '#F3F3FB' } }} fullWidth>
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
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
        Incidente registrado con éxito
      </div>
    )}
  </Layout>
  );
};

export default IncidenteRegistroPage;
