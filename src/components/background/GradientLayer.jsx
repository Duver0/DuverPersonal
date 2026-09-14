import { useEffect, useRef } from 'react';
import { useScrollEffect } from '../../hooks/useScrollEffect.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { BLOBS, PARALLAX } from '../../theme/backgroundTokens.js';

/**
 * Capa de gradiente presentacional: 3 manchas máx desde tokens (eco Hero/cards).
 * Solo `animate-float-slow`. Sin `animate-hue-slow`, sin rose/aurora tricolor.
 * El parallax se aplica al wrapper externo (translate3d); la animación float
 * vive en el div interno, por lo que no hay conflicto de transform.
 * Los wrappers no usan `-translate-x-1/2` (corrige bug aurora que JS
 * sobrescribía con `translate(-50%, …)`): posicionamiento solo con top/left/right.
 */
const GradientLayer = () => {
  const refs = useRef([]);
  const reduced = useReducedMotion();

  useScrollEffect((scrollY) => {
    const y = scrollY * PARALLAX.factor;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const mult = BLOBS[i]?.parallax ?? 0;
      el.style.transform = `translate3d(0, ${(-y * mult).toFixed(2)}px, 0)`;
    });
  });

  // Al activar reduced-motion a mitad de sesión, limpia el translate residual
  // que dejó el parallax (useScrollEffect ya no corre, pero el inline queda).
  useEffect(() => {
    if (reduced) {
      refs.current.forEach((el) => {
        if (el) el.style.transform = '';
      });
    }
  }, [reduced]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={blob.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`${blob.wrapper}`}
        >
          <div
            className={`${blob.size} rounded-full ${blob.blob} ${reduced ? '' : 'animate-float-slow'}`}
          />
        </div>
      ))}
    </div>
  );
};

export default GradientLayer;
