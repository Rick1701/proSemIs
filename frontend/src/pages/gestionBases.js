import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BasesListado from '../components/BasesListado';
import axios from 'axios';
import Button from '@mui/material/Button';

const GestionBasesPage = () => {
  const [bases, setBases] = useState([]);
  const [formData, setFormData] = useState({
    base_descripcion: '',
    base_latitud: '',
    base_incendios_asistidos: '',
    // Añade aquí más campos necesarios para crear una base
  });
  const [editingBaseId, setEditingBaseId] = useState(null);

  useEffect(() => {
    cargarBases();
  }, []);

  const cargarBases = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/base');
      setBases(response.data.data);
    } catch (error) {
      console.error('Error al cargar las bases:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos antes de enviar la solicitud al backend
    if (!formData.base_descripcion || !formData.base_latitud) {
      console.error('Los campos "base_descripcion" y "base_latitud" son obligatorios.');
      return;
    }

    try {
      if (editingBaseId) {
        // Si hay un editingBaseId, significa que se está editando una base existente
        await axios.put(`http://localhost:3001/api/base/${editingBaseId}`, formData);
      } else {
        // Si no hay editingBaseId, significa que se está creando una nueva base
        await axios.post('http://localhost:3001/api/base', formData);
      }
      setEditingBaseId(null);
      setFormData({
        base_descripcion: '',
        base_latitud: '',
        base_incendios_asistidos: '',
        // Limpia los demás campos del formulario
      });
      cargarBases(); // Actualizar la lista de bases después de crear o editar una base
    } catch (error) {
      console.error('Error al guardar la base:', error);
    }
  };

  const handleEditBase = (base) => {
    setEditingBaseId(base._id);
    setFormData({
      base_descripcion: base.base_descripcion,
      base_latitud: base.base_latitud,
      base_incendios_asistidos: base.base_incendios_asistidos,
    });
  };

  const handleDeleteBase = async (baseId) => {
    try {
      await axios.delete(`http://localhost:3001/api/base/${baseId}`);
      cargarBases(); // Actualizar la lista de bases después de eliminar una base
    } catch (error) {
      console.error('Error al eliminar la base:', error);
    }
  };

  return (
    <Layout>
      <h1>Gestión de Bases</h1>
      {/* Formulario para crear o editar una base */}
      {/* Listado de bases */}
      <BasesListado bases={bases} setEditingBaseId={handleEditBase} onDelete={handleDeleteBase} />
    </Layout>
  );
};

export default GestionBasesPage;
