import GradientLayer from './background/GradientLayer.jsx';

/**
 * @deprecated Usar `AmbientBackground` (src/components/AmbientBackground.jsx).
 * Re-export delgado para compatibilidad: envuelve GradientLayer en el
 * contenedor fijo original.
 */
const GradientBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <GradientLayer />
  </div>
);

export default GradientBackground;
