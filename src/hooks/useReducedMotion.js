import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Devuelve `true` cuando el usuario pidió reducir el movimiento.
 *  Todos los hooks de animación lo consultan para apagarse. */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const matcher = window.matchMedia(QUERY);
    const handler = () => setReduced(matcher.matches);
    matcher.addEventListener('change', handler);
    return () => matcher.removeEventListener('change', handler);
  }, []);

  return reduced;
};
