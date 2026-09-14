import GradientLayer from './background/GradientLayer.jsx';
import GridLayer from './background/GridLayer.jsx';

/**
 * Fondo ambiental: compone gradiente sutil (z-0) + grid de puntos (z-1).
 * `variant="subtle"` (defecto) atenúa ambas capas; `variant="vivid"` las
 * muestra a opacidad plena. Wrapper fijo tras el contenido (`-z-10`).
 * En dark sobre negro puro, subtle deja blobs /5 + grid neutro casi
 * invisibles (solo textura mínima).
 */
const AmbientBackground = ({ variant = 'subtle' }) => {
  const subtle = variant === 'subtle';
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      data-variant={variant}
    >
      <div className={`absolute inset-0 ${subtle ? 'opacity-80' : ''}`}>
        <GradientLayer />
      </div>
      <div className={`absolute inset-0 ${subtle ? 'opacity-70' : ''}`}>
        <GridLayer />
      </div>
    </div>
  );
};

export default AmbientBackground;
