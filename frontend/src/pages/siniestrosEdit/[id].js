import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EventIcon from '@mui/icons-material/Event';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import axios from 'axios';

const FieldTitle = ({ title, icon }) => {
  return (
    <Typography variant="subtitle1" style={{ marginBottom: '8px', fontFamily: 'Arial', fontWeight: 'bold' }}>
      {icon} {title}
    </Typography>
  );
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SiniestrosEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [siniestro, setSiniestro] = useState({
    sin_velocidadViento: '',
    sin_temperatura: '',
    sin_humedad: '',
    sin_fechaInicio: null,
    sin_fechaTermino: null,
    sin_latitud: '',
    sin_superficie: '',
    sin_distribucion_fuego: [],
    sin_categoria: null,
    sin_incidente: [],
    sin_bases_operando: [],
    sin_estado: '',
    sin_estrategia: '',
  });

  const [siniestroInicial, setSiniestroInicial] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/api/siniestro/${id}`);
          setSiniestro(response.data);
          setSiniestroInicial(response.data); // Configurar siniestroInicial con los datos iniciales del siniestro
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del siniestro:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleModificarClick = async () => {
    try {
      // Crear un objeto auxiliar para almacenar solo los campos modificados
      const camposModificados = {};
      console.log('Botón "Modificar" clickeado');

      // Verificar si cada campo ha sido modificado y agregarlo al objeto auxiliar
      if (siniestro.sin_velocidadViento !== siniestroInicial.sin_velocidadViento) {
        camposModificados.sin_velocidadViento = siniestro.sin_velocidadViento;
      }

      if (siniestro.sin_temperatura !== siniestroInicial.sin_temperatura) {
        camposModificados.sin_temperatura = siniestro.sin_temperatura;
      }

      if (siniestro.sin_humedad !== siniestroInicial.sin_humedad) {
        camposModificados.sin_humedad = siniestro.sin_humedad;
      }

      if (siniestro.sin_fechaInicio !== siniestroInicial.sin_fechaInicio) {
        camposModificados.sin_fechaInicio = siniestro.sin_fechaInicio;
      }

      if (siniestro.sin_fechaTermino !== siniestroInicial.sin_fechaTermino) {
        camposModificados.sin_fechaTermino = siniestro.sin_fechaTermino;
      }

      if (siniestro.sin_latitud !== siniestroInicial.sin_latitud) {
        camposModificados.sin_latitud = siniestro.sin_latitud;
      }

      if (siniestro.sin_superficie !== siniestroInicial.sin_superficie) {
        camposModificados.sin_superficie = siniestro.sin_superficie;
      }

      if (siniestro.sin_distribucion_fuego.join(',') !== siniestroInicial.sin_distribucion_fuego.join(',')) {
        camposModificados.sin_distribucion_fuego = siniestro.sin_distribucion_fuego;
      }

      if (siniestro.sin_categoria !== siniestroInicial.sin_categoria) {
        camposModificados.sin_categoria = siniestro.sin_categoria;
      }

      if (siniestro.sin_incidente.join(',') !== siniestroInicial.sin_incidente.join(',')) {
        camposModificados.sin_incidente = siniestro.sin_incidente;
      }

      if (siniestro.sin_bases_operando.join(',') !== siniestroInicial.sin_bases_operando.join(',')) {
        camposModificados.sin_bases_operando = siniestro.sin_bases_operando;
      }

      if (siniestro.sin_estado !== siniestroInicial.sin_estado) {
        camposModificados.sin_estado = siniestro.sin_estado;
      }

      if (siniestro.sin_estrategia !== siniestroInicial.sin_estrategia) {
        camposModificados.sin_estrategia = siniestro.sin_estrategia;
      }
    
      // Repetir este proceso para cada campo que quieras actualizar
  
      // Realizar la llamada a la API para actualizar el siniestro con los campos modificados
      await axios.put(`http://localhost:3001/api/siniestro/${id}`, camposModificados);
  
      // Si todo va bien, redirigir a la página de detalles del siniestro
      router.push(`/siniestrosShow/${id}`);
    } catch (error) {
      console.error('Error al modificar el siniestro:', error);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSiniestro({
      ...siniestro,
      [name]: value,
    });
  };

  const handleDistribucionFuegoChange = (_, newValue) => {
    setSiniestro({
      ...siniestro,
      sin_distribucion_fuego: newValue,
    });
  };

  return (
    <Layout>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <form>
          <h1>Detalles del Siniestro N° '{siniestro.sin_numeroIncendio}'</h1>
          <Grid container spacing={2} style={{ marginTop: '70px' }}>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Velocidad del Viento:" icon={<AirIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_velocidadViento"
                value={siniestro.sin_velocidadViento}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Temperatura:" icon={<FilterDramaIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_temperatura"
                value={siniestro.sin_temperatura}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Porcentaje de Humedad:" icon={<BloodtypeIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_humedad"
                value={siniestro.sin_humedad}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Fecha de Inicio:" icon={<EventIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_fechaInicio"
                value={siniestro.sin_fechaInicio ? formatDate(siniestro.sin_fechaInicio) : ''}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: '70px' }}>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Latitud:" icon={<TravelExploreIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_latitud"
                value={siniestro.sin_latitud}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Superficie:" icon={<TabUnselectedIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <TextField
                name="sin_superficie"
                value={siniestro.sin_superficie}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FieldTitle title="Distribución del Fuego" icon={<WhatshotIcon fontSize="small" style={{ marginRight: '4px' }} />} />
              <Autocomplete
                multiple
                id="sin_distribucion_fuego"
                options={['copas', 'superficie', 'subsuelo']}
                value={siniestro.sin_distribucion_fuego}
                onChange={handleDistribucionFuegoChange}
                fullWidth
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: '70px' }}>
            <Grid item>
            <Button variant="contained" startIcon={<Save />} onClick={handleModificarClick}>
                Modificar
              </Button>
            </Grid>
            <Grid item>
              <Link href="/siniestros" passHref>
                <Button variant="contained" startIcon={<ArrowBack />}>
                  Regresar
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </Layout>
  );
};

export default SiniestrosEditPage;
