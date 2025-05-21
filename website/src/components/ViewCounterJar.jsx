// src/components/ViewCounterJar.jsx
import { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react'; // Ou outro ícone para a "gota"

const ViewCounterJar = ({ viewCount, isLoading }) => {
  const [showDrop, setShowDrop] = useState(false);
  const prevViewCountRef = useRef(viewCount);

  useEffect(() => {
    // Animar a gota apenas se a contagem aumentou e não é o carregamento inicial
    if (!isLoading && viewCount > prevViewCountRef.current) {
      setShowDrop(true);
      const timer = setTimeout(() => {
        setShowDrop(false);
      }, 700); // Duração da animação da gota + um pouco

      // Atualiza a referência da contagem anterior
      prevViewCountRef.current = viewCount;
      return () => clearTimeout(timer);
    }
    // Se for o carregamento inicial ou a contagem não aumentou, apenas atualiza a referência
    prevViewCountRef.current = viewCount;

  }, [viewCount, isLoading]);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50 p-2 px-3 bg-primary/70 backdrop-blur-sm text-primary-foreground rounded-lg shadow-lg text-sm">
        A carregar...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 px-3 bg-primary/80 backdrop-blur-md text-primary-foreground rounded-lg shadow-xl">
      {/* O "Frasco" é mais o conceito do que um desenho literal aqui,
          focamos no número e na animação da gota */}
      
      <div className="w-8 h-8 flex items-center justify-center">
        {/* Ícone base do olho (ou do frasco) */}
        <Eye size={28} className="opacity-70" />

        {/* A Gota a cair - animação simples */}
        {showDrop && (
          <div
            className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 animate-drop"
            // style={{ animation: 'drop 0.7s ease-out forwards' }} // Alternativa à classe animate-drop
          >
            {/* <Eye size={16} /> */}
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
          </div>
        )}
      </div>

      <span className="text-xl text-primary font-bold tabular-nums">
        {viewCount.toLocaleString('pt-PT')}
      </span>
      {/* <span className="text-xs opacity-80 ml-1">visualizações</span> */}
    </div>
  );
};

export default ViewCounterJar;