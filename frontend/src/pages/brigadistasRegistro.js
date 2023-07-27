import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

const BrigadistaRegistroPage = () => {
  const [formData, setFormData] = useState({
    brig_rut: '',
    brig_nombres: '',
    brig_apellidos: '',
    brig_sexo: '',
    brig_edad: '',
    brig_estado_brigadista: null,
    brig_brigada: null,
    brig_incidente: null,
  });

  const [estadosBrigadista, setEstadosBrigadista] = useState([]);
  const [brigada, setBrigada] = useState([]);
  const [incidente, setIncidente] = useState([]);

  useEffect(() => {
    // Obtener la lista de estados de brigadista
    axios.get('http://localhost:3001/api/estado_brigadista')
      .then(response => {
        setEstadosBrigadista(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los estados del brigadista:', error);
      });

    // Obtener la lista de brigada
    axios.get('http://localhost:3001/api/brigada')
      .then(response => {
        setBrigada(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener las brigada:', error);
      });

    // Obtener la lista de incidentes
    axios.get('http://localhost:3001/api/incidente')
      .then(response => {
        setIncidente(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los incidentes:', error);
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
          name="brig_rut"
          label="Rut"
          value={formData.brig_rut}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          name="brig_nombres"
          label="Nombrees"
          value={formData.brig_nombres}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          name="brig_apellidos"
          label="Apellidos"
          value={formData.brig_apellidos}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <TextField
          name="brig_sexo"
          label="Sexo"
          value={formData.brig_sexo}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <numberField
          name="brig_edad"
          label="Edad"
          value={formData.brig_edad}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Autocomplete
          name="brig_estado_brigadista"
          options={estadosBrigadista}
          getOptionLabel={(estado) => estado.estado_brigadista}
          onChange={(event, newValue) => setFormData({ ...formData, brig_estado_brigadista: newValue })}
          renderInput={(params) => <TextField {...params} label="Estado del Brigadista" required />}
        />
      </div>
      {/* Autocomplete para brigadista */}
      <div>
        <Autocomplete
          name="brig_brigada"
          options={brigada}
          getOptionLabel={(brigada) => brigada.bri_nombre}
          onChange={(event, newValue) => setFormData({ ...formData, brig_brigada: newValue })}
          renderInput={(params) => <TextField {...params} label="Brigada asignada" />}
      />
      </div>
      {/* Autocomplete para unidad aérea, unidad terrestre y siniestro */}
      <div>
        <Autocomplete
          name="brig_incidente"
          options={incidente}
          getOptionLabel={(incidente) =>incidente.inc_descripcion}
          onChange={(event, newValue) => setFormData({ ...formData, brig_incidente: newValue })}
          renderInput={(params) => <TextField {...params} label="incidente asociado" />}
      />
      </div>

      <Button type="submit" variant="contained" color="primary">Registrar</Button>
    </form>
  );
};

export default BrigadistaRegistroPage;
