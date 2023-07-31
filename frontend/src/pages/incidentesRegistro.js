import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import ArrowBack from '@mui/icons-material/ArrowBack';

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
    axios.get('http://localhost:3001/api/brigadista')
      .then(response => {
        const brigadistas = response.data.data;
        setBrigadistasOptions(brigadistas);
      })
      .catch(error => {
        console.error('Error al obtener los brigadistas:', error);
      });

    // Obtener las unidades aéreas
    axios.get('http://localhost:3001/api/uaerea')
      .then(response => {
        const uaereas = response.data.data;
        setUaereasOptions(uaereas);
      })
      .catch(error => {
        console.error('Error al obtener las unidades aéreas:', error);
      });

    // Obtener las unidades terrestres
    axios.get('http://localhost:3001/api/uterrestre')
      .then(response => {
        const uterrestres = response.data.data;
        setUterrestresOptions(uterrestres);
      })
      .catch(error => {
        console.error('Error al obtener las unidades terrestres:', error);
      });

    // Obtener los siniestros
    axios.get('http://localhost:3001/api/siniestro')
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
      const response = await axios.post('http://localhost:3001/api/incidente', formData);
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
            options={brigadistasOptions}
            getOptionLabel={(option) => option.brig_rut} // Opción a mostrar en el campo
            value={formData.inc_brigadista}
            onChange={(event, newValue) => setFormData({ ...formData, inc_brigadista: newValue })}
            renderInput={(params) => <TextField {...params} label="Brigadista afectado" />}
          />
        </div>
        {/* Autocomplete para unidad aérea */}
        <div>
          <Autocomplete
            id="inc_uaerea"
            options={uaereasOptions}
            getOptionLabel={(option) => option.uaerea_nombre} // Opción a mostrar en el campo
            value={formData.inc_uaerea}
            onChange={(event, newValue) => setFormData({ ...formData, inc_uaerea: newValue })}
            renderInput={(params) => <TextField {...params} label="Unidad aérea afectada" />}
          />
        </div>
        {/* Autocomplete para unidad terrestre */}
        <div>
          <Autocomplete
            id="inc_uterrestre"
            options={uterrestresOptions}
            getOptionLabel={(option) => option.uterrestre_nombre} // Opción a mostrar en el campo
            value={formData.inc_uterrestre}
            onChange={(event, newValue) => setFormData({ ...formData, inc_uterrestre: newValue })}
            renderInput={(params) => <TextField {...params} label="Unidad terrestre afectada" />}
          />
        </div>
        {/* Autocomplete para siniestro */}
        <div>
          <Autocomplete
            id="inc_siniestro"
            options={siniestrosOptions}
            getOptionLabel={(option) => option.sin_numeroIncendio} // Opción a mostrar en el campo
            value={formData.inc_siniestro}
            onChange={(event, newValue) => setFormData({ ...formData, inc_siniestro: newValue })}
            renderInput={(params) => <TextField {...params} label="Siniestro asociado" />}
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
          Incidente registrado con éxito
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

export default IncidenteRegistroPage;
