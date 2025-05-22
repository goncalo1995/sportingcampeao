import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  // Estado e setters para o valor debounced
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Atualiza o valor debounced após o delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancela o timeout se o valor mudar (isto é, se o efeito for re-executado)
      // ou se o componente for desmontado.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Re-executa o efeito apenas se o valor ou o delay mudarem
  );

  return debouncedValue;
}