import GridLayer from './background/GridLayer.jsx';

/**
 * @deprecated Usar `AmbientBackground` (src/components/AmbientBackground.jsx).
 * Re-export delgado para compatibilidad: envuelve GridLayer en el
 * contenedor fijo original.
 */
const GridBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <GridLayer />
  </div>
);

export default GridBackground;
