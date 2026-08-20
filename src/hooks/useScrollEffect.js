import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/** Ejecuta `callback(scrollY, progress)` en cada scroll, throttle-ado con
 *  requestAnimationFrame para no bloquear el main thread. No causa re-render:
 *  el callback debe escribir estilos directamente en refs.
 *  Se desactiva solo si el usuario prefiere reduced-motion. */
export const useScrollEffect = (callback) => {
  const reduced = useReducedMotion();
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (reduced) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      cbRef.current(scrollY, progress);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);
};
