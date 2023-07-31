import React from 'react';
import { Chrono } from 'react-chrono';
import { format, utcToZonedTime } from 'date-fns-tz';


const SiniestrosTimeLine = ({ hitos = [] }) => {
  const timeZone = 'America/Santiago'; // Zona horaria de Chile

  // Convierte los datos de 'hitos' al formato requerido por 'react-chrono'
  const items = hitos.map((hito, index) => {
    const fechaChile = utcToZonedTime(hito.fecha, timeZone);
    const formattedDate = format(fechaChile, 'dd/MM/yyyy HH:mm:ss', { timeZone });
  
    return {
      title: formattedDate,
      cardTitle: `Descripción: ${hito.descripcion}`,
      cardSubtitle: `Estado: ${hito.siniestroCompleto.sin_estado}`,
      cardDetailedText: hito.siniestroCompleto.sin_estado === 'EXTINCIÓN' ? 'Incendio Apagado.' : `Estrategia: ${hito.siniestroCompleto.sin_estrategia}`,
    };
  }).filter(Boolean); // Filtra los elementos que no son null

  // Agrega un console.log aquí para asegurarte de que los datos se están pasando correctamente.
  console.log('items: ',items);
  console.log('Hitos: ',hitos)

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {/* Agrega un console.log aquí para verificar que la variable 'items' contenga los datos de los hitos */}
      {items.length > 0 ? (
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          theme={{
            primary: '#313236 ',
            secondary: '#F3F3FB ',
            cardBgColor: '#FFFFFF',
            cardForeColor: '#000000',
            titleColor: '#000000',
            titleColorActive: '#313236 ',
            cardTitleColor: '#212226',
            cardSubtitleColor:'#FFA570',
          }}
        />
      ) : (
        <p>No hay hitos registrados para este siniestro.</p>
      )}
    </div>
  );
};

export default SiniestrosTimeLine;
