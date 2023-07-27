import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const BrigadaRegistroPage = () => {
  const [formData, setFormData] = useState({
    bri_nombre: '',
    bri_especialidad: '',
    bri_brigadista: null,
    bri_base: null,
    bri_estado: null,
  });

  const [estadosBrigada, setEstadosBrigada] = useState([]);
  const [brigadista, setBrigadista] = useState([]);
  const [base, setBase] = useState([]);

  useEffect(() => {
    // Obtener la lista de estados de brigada
    axios.get('http://localhost:3001/api/estado_brigada')
      .then(response => {
        setEstadosBrigada(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los estados de la brigada:', error);
      });

    // Obtener la lista de brigadistas
    axios.get('http://localhost:3001/api/brigadista')
      .then(response => {
        setBrigadista(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los brigadadista:', error);
      });

    // Obtener la lista de incidentes
    axios.get('http://localhost:3001/api/base')
      .then(response => {
        setBase(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener las bases:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al backend utilizando axios.post()
    console.log('Formulario enviado:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          name="bri_nombre"
          label="Nombre"
          value={formData.bri_nombre}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          name="bri_especialidad"
          label="Especialidad"
          value={formData.bri_especialidad}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Autocomplete
          name="bri_estado"
          options={estadosBrigada}
          getOptionLabel={(estado) => estado.estabr_descripcion}
          onChange={(event, newValue) => setFormData({ ...formData, bri_estado: newValue })}
          renderInput={(params) => <TextField {...params} label="Estado de la Brigada" required />}
        />
      </div>
      {/* Autocomplete para brigadista */}
      <div>
        <Autocomplete
          name="bri_brigadista"
          options={brigadista}
          getOptionLabel={(brigadista) => brigadista.brig_rut}
          onChange={(event, newValue) => setFormData({ ...formData, bri_brigadista: newValue })}
          renderInput={(params) => <TextField {...params} label="Brigadista asignado" />}
      />
      </div>
      {/* Autocomplete para unidad aérea, unidad terrestre y siniestro */}
      <div>
        <Autocomplete
          name="bri_base"
          options={base}
          getOptionLabel={(base) =>base.base_nombre}
          onChange={(event, newValue) => setFormData({ ...formData, bri_base: newValue })}
          renderInput={(params) => <TextField {...params} label="Base Asociada" />}
      />
      </div>

      <Button type="submit" variant="contained" color="primary">Registrar</Button>
    </form>
  );
};

export default BrigadaRegistroPage;
