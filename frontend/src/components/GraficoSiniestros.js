import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const GraficoSiniestros = () => {
  const [dataFromApi, setDataFromApi] = useState([]);

  // Hacer la solicitud HTTP para obtener los datos de los siniestros desde el backend
  useEffect(() => {
    fetch('http://localhost:3001/api/siniestro')
      .then((response) => response.json())
      .then((data) => setDataFromApi(data.data))
      .catch((error) => console.error(error));
  }, []);

  // Procesar los datos para el gráfico y renderizarlo
  useEffect(() => {
    const labels = dataFromApi.map((siniestro) => siniestro._id);
    const velocidadVientoData = dataFromApi.map((siniestro) => siniestro.sin_velocidadViento);

    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Velocidad del Viento',
          data: velocidadVientoData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [dataFromApi]);

  return (
    <canvas id="chart"></canvas>
  );
};

export default GraficoSiniestros;
