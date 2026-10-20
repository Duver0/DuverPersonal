import { useReveal } from '../../hooks/useReveal.js';
import { cx } from './cx.js';

/**
 * Reveal — la única entrada de la casa (§10): `opacity` y una subida de
 * `--rise` (24 px) en `--dur-enter`, escalonada por `step` (`--stagger`, 70 ms).
 * Se ejecuta UNA vez, cuando el bloque entra en pantalla.
 *
 * Sin `IntersectionObserver` o sin la clase `js` en `<html>`, el contenido se
 * pinta VISIBLE: nunca se deja texto invisible por depender de un script (§9).
 * La clase `js` la pone `App.jsx` en el ámbito del módulo, antes del primer
 * render; por eso se consulta en cada render y no al importar.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div']
 * @param {number} [props.step=0] posición en el escalonado: 0 título, 1 texto, 2 imagen.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Reveal = ({ as: Tag = 'div', step = 0, className = '', children, ...rest }) => {
  const { ref, visible } = useReveal();
  const animable =
    typeof IntersectionObserver !== 'undefined' &&
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('js');
  const oculto = animable && !visible;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `calc(var(--stagger) * ${step})` }}
      className={cx(
        'transition-[opacity,transform] duration-[var(--dur-enter)] ease-[var(--ease-out)]',
        oculto ? 'translate-y-[var(--rise)] opacity-0' : 'translate-y-0 opacity-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
