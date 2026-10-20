import { cx } from './cx.js';
import { TONES } from './tones.js';

/**
 * Surface — el escalón de tono dentro de una sección: barras de Trayectoria,
 * filas alternas de Contacto, muelas del Archivo. No lleva caja ni filete: el
 * cambio de tono es toda la separación (§6).
 *
 * @param {object} props
 * @param {'ground'|'surface'|'field'|'accent'} [props.tone='surface']
 * @param {React.ElementType} [props.as='div']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Surface = ({ tone = 'surface', as: Tag = 'div', className = '', children, ...rest }) => {
  if (import.meta.env.DEV && !TONES[tone]) {
    console.warn(`Surface: tono «${tone}» desconocido. Usa uno de: ${Object.keys(TONES).join(', ')}.`);
  }

  return (
    <Tag {...rest} data-tone={tone} className={cx(TONES[tone] ?? TONES.surface, className)}>
      {children}
    </Tag>
  );
};

export default Surface;
