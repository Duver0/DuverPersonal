import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/** Escribe `text` carácter a carácter. Si el usuario prefiere
 *  reduced-motion, devuelve el texto completo de inmediato (sin caret). */
export const useTypewriter = (text, { speed = 45, startDelay = 650 } = {}) => {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : '');

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return undefined;
    }
    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [reduced, text, speed, startDelay]);

  return out;
};
