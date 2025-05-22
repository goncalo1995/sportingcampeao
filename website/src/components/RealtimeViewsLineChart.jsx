import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { useDebounce } from '@/hooks/useDebounce'; // Importar o hook

const RealtimeViewsLineChart = ({ initialViewCount, viewCountUpdates$, videoIdentifier }) => {
  const chartRef = useRef(null);
  const isInitialMount = useRef(true); // Para tratar o primeiro render do gráfico

  // Usar o estado local para os dados do gráfico que serão atualizados
  const [xData, setXData] = useState([new Date()]);
  const [yData, setYData] = useState([initialViewCount || 0]);

  // Debounce o viewCount que vem das props (ou do estado da HomePage)
  // Se viewCountUpdates$ for um valor primitivo (número), isto funciona diretamente.
  // Se for um objeto ou array, useDebounce precisaria ser ajustado ou usado com cuidado.
  const debouncedViewCount = useDebounce(viewCountUpdates$, 500); // Debounce de 500ms

  const [layout, setLayout] = useState({
    // ... (layout como antes, com deteção de tema)
    title: 'Visualizações em Tempo Real',
    xaxis: { title: 'Tempo', type: 'date' },
    yaxis: { title: 'Nº de Visualizações', rangemode: 'tozero' },
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151' },
    margin: { l: 50, r: 30, b: 50, t: 50, pad: 4 }
  });

  // Efeito para criar o gráfico inicial ou recriá-lo se o layout mudar (ex: tema)
  useEffect(() => {
    if (chartRef.current) {
      Plotly.newPlot(chartRef.current, [{
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Visualizações',
        line: { color: '#16a34a' },
        marker: { color: '#16a34a' },
      }], layout, { responsive: true, displaylogo: false });
      isInitialMount.current = false; // Marcar que o gráfico inicial foi montado
    }
  }, [layout]); // Apenas recriar o gráfico inteiro se o layout mudar

  // Efeito para atualizar os dados do gráfico com o valor debounced
  useEffect(() => {
    // Não atualizar no mount inicial se o gráfico já foi criado com initialViewCount
    // ou se o valor debounced for o mesmo que o último ponto Y (evitar re-render desnecessário)
    if (isInitialMount.current || (yData.length > 0 && debouncedViewCount === yData[yData.length - 1])) {
      // Se for o mount inicial, e o debouncedViewCount for diferente do initialViewCount,
      // pode ser que a primeira atualização real-time chegou antes do gráfico montar.
      // Neste caso, ajustamos o ponto inicial.
      if (isInitialMount.current && initialViewCount !== debouncedViewCount) {
        setYData([debouncedViewCount]); // Ajusta o primeiro ponto se necessário
      }
      return;
    }

    const currentTime = new Date();

    setXData(prevX => {
      const newX = [...prevX, currentTime];
      const maxPoints = 100; // Limitar o número de pontos
      return newX.length > maxPoints ? newX.slice(newX.length - maxPoints) : newX;
    });

    setYData(prevY => {
      const newY = [...prevY, debouncedViewCount];
      const maxPoints = 100; // Limitar o número de pontos
      return newY.length > maxPoints ? newY.slice(newY.length - maxPoints) : newY;
    });

  }, [debouncedViewCount, initialViewCount]); // Depender de debouncedViewCount

  // Efeito para re-renderizar o gráfico com Plotly.react quando xData ou yData mudam
  useEffect(() => {
    if (chartRef.current && chartRef.current.data && !isInitialMount.current) {
      // Atualizar os dados do primeiro trace (índice 0)
      const update = {
        x: [xData], // Plotly espera arrays de arrays para x e y em restyle/react
        y: [yData]
      };
      Plotly.restyle(chartRef.current, update, [0]); // Atualizar apenas o trace 0

      // Opcional: Animar a transição da range do eixo Y para suavizar o "salto"
      // const yMax = Math.max(...yData, 0);
      // Plotly.animate(chartRef.current, {
      //   layout: {
      //     yaxis: { range: [0, yMax + (yMax * 0.1)] } // Adiciona 10% de margem no topo
      //   }
      // }, {
      //   transition: { duration: 300, easing: 'cubic-in-out' },
      //   frame: { duration: 300 }
      // });
    }
  }, [xData, yData]);


  // Atualizar a cor da fonte do layout quando o tema muda (como antes)
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

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default RealtimeViewsLineChart;