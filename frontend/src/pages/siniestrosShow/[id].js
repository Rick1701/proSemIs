import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import SiniestrosTimeLine from '../../components/SiniestrosTimeLine';
import Link from 'next/link';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Save, Delete, ArrowBack } from '@mui/icons-material'; // Importa los iconos que desees usar
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EventIcon from '@mui/icons-material/Event';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import axios from 'axios';

// Función que configura la Typography con estilo estándar
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

const SiniestrosShowPage = () => {
  // Enrutador
  const router = useRouter();
  // Variable que recibe la id del siniestro desde la URL
  const { id } = router.query;
  // Estado inicial del siniestro
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

  // Estado para almacenar los hitos asociados al siniestro
  const [hitos, setHitos] = useState([]);

  // Variable de estado para controlar si los datos se han cargado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/api/siniestro/${id}`);
          setSiniestro(response.data);
          setHitos(response.data.hitos); // Actualiza el estado de 'hitos' con los hitos reales
          console.log(response.data.hitos)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del siniestro:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  
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
                value={siniestro.sin_velocidadViento ? siniestro.sin_velocidadViento : ''}
                disabled
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
              <FieldTitle title="Temperatura:" icon={<FilterDramaIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <TextField
                value={siniestro.sin_temperatura ? siniestro.sin_temperatura : ''}
                disabled
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
              <FieldTitle title="Porcentaje de Humedad:" icon={<BloodtypeIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <TextField
                value={siniestro.sin_humedad ? siniestro.sin_humedad : ''}
                disabled
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
              <FieldTitle title="Fecha de Inicio:" icon={<EventIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <TextField
                value={siniestro.sin_fechaInicio ? formatDate(siniestro.sin_fechaInicio) : ''}
                disabled
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
              <FieldTitle title="Latitud:" icon={<TravelExploreIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <TextField
                value={siniestro.sin_latitud ? siniestro.sin_latitud : ''}
                disabled
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
              <FieldTitle title="Superficie:" icon={<TabUnselectedIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <TextField
                value={siniestro.sin_superficie ? siniestro.sin_superficie : ''}
                disabled
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
              <FieldTitle title="Distribución del Fuego" icon={<WhatshotIcon fontSize="small" style={{ marginRight: '4px' }} />}  />
              <Autocomplete
                multiple
                id="sin_distribucion_fuego"
                options={['copas', 'superficie', 'subsuelo']}
                value={siniestro.sin_distribucion_fuego ? siniestro.sin_distribucion_fuego : []}
                disabled
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            {/*<Grid item xs={12} sm={3}>
              <FieldTitle title="Estado siniestro:" icon={<AirIcon fontSize="small" style={{ marginRight: '4px' }} />}  /> 
              <FormControlLabel
                control={
                  <Checkbox
                    checked={siniestro.sin_estado === 'iniciacion'}
                    disabled
                    name="sin_estado"
                    value="iniciacion"
                  />
                }
                label="Iniciación"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={siniestro.sin_estado === 'propagacion'}
                    disabled
                    name="sin_estado"
                    value="propagacion"
                  />
                }
                label="Propagación"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={siniestro.sin_estado === 'extincion'}
                    disabled
                    name="sin_estado"
                    value="extincion"
                  />
                }
                label="Extinción"
              />
            </Grid>*/}
          </Grid>

          <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: '70px' }}>
            <Grid item>
              <Link href={`/siniestrosEdit/${id}`} passHref>
                <Button variant="contained" startIcon={<Save />}>
                  Modificar
                </Button>
              </Link>
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
    <SiniestrosTimeLine hitos={hitos} />
    </Layout>
  );
};

export default SiniestrosShowPage;
