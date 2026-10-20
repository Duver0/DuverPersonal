import { cx } from './cx.js';

/**
 * Shell — la caja de la rejilla (§7): centra, limita a `--shell-max` y aplica
 * el margen lateral `--pad-x` (20/24/32 px según ancho).
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div'] etiqueta a renderizar.
 * @param {boolean} [props.grid=false] activa las 12 columnas con `--shell-gap`.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
const Shell = ({ as: Tag = 'div', grid = false, className = '', children, ...rest }) => (
  <Tag
    className={cx(
      'mx-auto w-full max-w-[var(--shell-max)] px-[var(--pad-x)]',
      grid && 'grid grid-cols-12 gap-[var(--shell-gap)]',
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

export default Shell;
