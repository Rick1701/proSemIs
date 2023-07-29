import React from 'react';
import { Chrono } from 'react-chrono';

const SiniestrosTimeLine = ({ hitos = [] }) => {
  // Convierte los datos de 'hitos' al formato requerido por 'react-chrono'
  const items = hitos.map((hito, index) => ({
    title: hito.fecha, // Puedes personalizar esto según tus datos
    cardTitle: hito.descripcion, // Puedes personalizar esto según tus datos
    cardSubtitle: '', // Puedes personalizar esto según tus datos
    cardDetailedText: '', // Puedes personalizar esto según tus datos
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        theme={{
          primary: '#FF5733', // Color principal de la línea del tiempo
          secondary: '#4CAF50', // Color secundario de la línea del tiempo
          cardBgColor: '#FFFFFF', // Color de fondo de las tarjetas
          cardForeColor: '#000000', // Color de texto de las tarjetas
          titleColor: '#000000', // Color de texto del título de la tarjeta
          titleColorActive: '#FF5733', // Color de texto del título de la tarjeta activa
        }}
      />
    </div>
  );
};

export default SiniestrosTimeLine;
