import { cx } from './cx.js';
import { TONES } from './tones.js';

const RITMOS = {
  /** §7: el ritmo de sección, 128 → 192 px arriba y abajo. */
  section: 'py-[var(--space-section)]',
  /** Para cortes más cortos dentro de una misma sección. */
  block: 'py-[var(--space-block)]',
  none: '',
};

/**
 * Section — el bloque de página: ancla, tono y ritmo vertical.
 *
 * @param {object} props
 * @param {string} [props.id] el ancla que usa la navegación.
 * @param {'ground'|'surface'|'field'|'accent'} [props.tone='ground']
 * @param {'section'|'block'|'none'} [props.rhythm='section']
 * @param {string} [props.labelledBy] `id` del título que hay dentro: es lo que
 *   convierte la sección en una región con nombre para lectores de pantalla.
 * @param {React.ElementType} [props.as='section']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Section = ({
  id,
  tone = 'ground',
  rhythm = 'section',
  labelledBy,
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}) => {
  if (import.meta.env.DEV && !TONES[tone]) {
    console.warn(`Section: tono «${tone}» desconocido. Usa uno de: ${Object.keys(TONES).join(', ')}.`);
  }

  return (
    <Tag
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cx('relative', TONES[tone] ?? TONES.ground, RITMOS[rhythm], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Section;
