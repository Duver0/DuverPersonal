import { useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/** Combina glow radial que sigue el cursor (vars --x/--y) con tilt 3D
 *  (vars --rx/--ry) sobre el MISMO nodo, sin conflicts de transform.
 *  El tilt solo se aplica si `tilt > 0`; si es 0 el nodo conserva su
 *  transform de Tailwind (p.ej. hover lift en project cards). */
export const useCardMotion = (tilt = 0) => {
  const reduced = useReducedMotion();
  const enabled = !reduced && canHover();
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || !enabled) return;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--x', `${x}%`);
        el.style.setProperty('--y', `${y}%`);
        if (tilt) {
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          el.style.setProperty('--ry', `${px * tilt}deg`);
          el.style.setProperty('--rx', `${-py * tilt}deg`);
          el.style.transform = 'perspective(800px) rotateY(var(--ry,0deg)) rotateX(var(--rx,0deg))';
        }
      });
    },
    [enabled, tilt],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--x', '50%');
    el.style.setProperty('--y', '50%');
    if (tilt) {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
      el.style.transform = '';
    }
  }, [tilt]);

  return {
    ref,
    onMove: enabled ? onMove : undefined,
    onLeave: enabled ? onLeave : undefined,
    enabled,
    tilt,
  };
};
