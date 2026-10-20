import { Icon } from './ui/Icon.jsx';

/**
 * ThemeToggle — el conmutador de tema. Flota de verdad (abajo a la derecha), así
 * que se separa con un bloque RELLENO (`--surface`), no con una sombra ni un
 * filete; esquinas cuadradas, como el resto de la casa. 44 × 44 px.
 *
 * Conserva el contrato de `useTheme`: recibe `isDark` y `onToggle`.
 *
 * @param {object} props
 * @param {boolean} props.isDark
 * @param {() => void} props.onToggle
 */
const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={isDark}
    aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center bg-surface text-ink transition-[transform,opacity] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px active:opacity-90"
  >
    <Icon name={isDark ? 'sun' : 'moon'} size={18} />
  </button>
);

export default ThemeToggle;
