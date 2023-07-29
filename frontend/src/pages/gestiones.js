import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const GestionesPage = () => {
  const router = useRouter();

  const handleGestionBasesClick = () => {
    router.push('/gestionBases');
  };

  const handleGestionIncidentesClick = () => {
    router.push('/gestionIncidentes');
  };

  return (
    <Layout>
      {/* Contenido de la página de gestión */}
      <h1>Gestión</h1>
      <p>Bienvenido a la página de gestión de bases e incidentes</p>

      {/* Contenedor de los botones */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Botones para redireccionar a las páginas de gestión */}
        <button onClick={handleGestionBasesClick} style={{ width: '500px', height: '100px', margin: '100px' }}>
          Gestión de Bases
        </button>
        <button onClick={handleGestionIncidentesClick} style={{ width: '500px', height: '100px', margin: '100px' }}>
          Gestión de Incidentes
        </button>
      </div>
    </Layout>
  );
};

export default GestionesPage;
