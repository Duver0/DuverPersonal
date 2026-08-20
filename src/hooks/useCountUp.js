import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/** Cuenta desde `start` hasta `target` con easing, disparado al entrar en
 *  viewport (IntersectionObserver). Muestra el valor final de inmediato si
 *  el usuario prefiere reduced-motion. */
export const useCountUp = (target, { duration = 1100, start = 0 } = {}) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [value, setValue] = useState(reduced ? target : start);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return undefined;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let startTime = 0;
    const run = (now) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(start + (target - start) * eased));
      if (t < 1) raf = requestAnimationFrame(run);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(run);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, target, duration, start]);

  return { ref, value };
};
