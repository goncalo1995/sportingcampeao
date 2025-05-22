// src/components/HourlyViewsBarChart.jsx
import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const HourlyViewsBarChart = ({ hourlyData }) => {
  // hourlyData seria um array de objetos, ex:
  // [ { hour: '2024-05-21T10:00:00Z', viewsInHour: 50 }, ... ]
  const chartRef = useRef(null);
  const [layout, setLayout] = useState({
    title: 'Visualizações por Hora (Agregado)',
    xaxis: {
      title: 'Hora',
      type: 'category', // Usar category para labels de hora
    },
    yaxis: {
      title: 'Nº de Visualizações na Hora',
      rangemode: 'tozero',
    },
    barmode: 'stack', // ou 'group'
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
        color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
    },
    margin: { l: 60, r: 30, b: 70, t: 50, pad: 4 }
  });

  useEffect(() => {
    if (chartRef.current && hourlyData && hourlyData.length > 0) {
      const trace = {
        x: hourlyData.map(d => {
            // Formatar a hora para ser mais legível
            const date = new Date(d.hour);
            return `${date.toLocaleDateString('pt-PT', {day: '2-digit', month: '2-digit'})} ${date.getHours()}:00`;
        }),
        y: hourlyData.map(d => d.viewsInHour),
        type: 'bar',
        name: 'Visualizações/Hora',
        marker: {
          color: '#22c55e', // Verde (pode ser um array de cores para "candles")
        },
      };
      Plotly.react(chartRef.current, [trace], layout, { responsive: true, displaylogo: false });
    } else if (chartRef.current) {
        Plotly.purge(chartRef.current); // Limpar o gráfico se não houver dados
    }
  }, [hourlyData, layout]); // Recriar quando os dados ou layout mudam

  // Atualizar a cor da fonte do layout quando o tema muda
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLayout(prevLayout => ({
        ...prevLayout,
        font: {
          ...prevLayout.font,
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        }
      }));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);


  if (!hourlyData || hourlyData.length === 0) {
    return (
        <div className="p-4 text-center text-muted-foreground">
            A aguardar dados de visualizações por hora...
        </div>
    );
  }

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default HourlyViewsBarChart;