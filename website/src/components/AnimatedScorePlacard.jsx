// src/components/AnimatedScorePlacard.jsx
import { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';

// Helper para dividir o número em dígitos e adicionar zeros à esquerda se necessário
const getDigits = (number, minDigits = 1) => {
  const str = String(number);
  const len = str.length;
  if (len >= minDigits) {
    return str.split('');
  }
  return Array(minDigits - len).fill('0').concat(str.split(''));
};

const DigitFlipper = ({ digit, prevDigit }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(prevDigit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) { // Só anima se o dígito realmente mudou
      setPreviousDigit(currentDigit); // O que era atual agora é o anterior
      setCurrentDigit(digit);
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 600); // Duração da animação
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative w-9 h-9 sm:w-12 sm:h-20 md:w-14 md:h-24 bg-primary text-primary-foreground rounded-md shadow-md overflow-hidden flex items-center justify-center">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary flex items-center justify-center">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums">
          {currentDigit}
        </span>
      </div>
    </div>
  );
};


const AnimatedScorePlacard = ({ viewCount, isLoading, minDisplayDigits = 4 }) => {
  const [digits, setDigits] = useState(getDigits(0, minDisplayDigits));
  const prevDigitsRef = useRef(getDigits(0, minDisplayDigits));

  useEffect(() => {
    const newDigits = getDigits(viewCount, minDisplayDigits);
    // Guardar os dígitos anteriores para a animação
    prevDigitsRef.current = digits;
    setDigits(newDigits);
  }, [viewCount, minDisplayDigits]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2 p-3 bg-primary/70 backdrop-blur-sm text-primary-foreground rounded-lg shadow-lg">
        <Eye size={24} className="animate-pulse" />
        <span className="text-lg font-semibold">A carregar...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-1 sm:gap-2 py-2">
        {digits.map((digit, index) => (
            <DigitFlipper
            key={index}
            digit={digit}
            prevDigit={prevDigitsRef.current[index] || '0'} // Fornece o dígito anterior
            />
        ))}
        </div>
        {/* <p className="mt-2 text-sm text-muted-foreground font-medium">Visualizações Totais</p> */}
    </div>
  );
};

export default AnimatedScorePlacard;