import { cx } from './cx.js';
import { Icon } from './Icon.jsx';

/**
 * Action — la acción de la casa. Un solo componente para enlaces y botones:
 * con `href` renderiza `<a>`, sin él un `<button type="button">`.
 *
 * Variantes:
 *  solid  el botón macizo de latón (la única CTA de la página). Cuadrado, 44 px
 *         de alto y rótulo en `--t-nano`: es la forma de la casa.
 *  link   enlace de texto con el subrayado de 2 px que aparece de izquierda a
 *         derecha (§10).
 *  bare   control de texto sin subrayado (entradas del índice, controles).
 *
 * @param {object} props
 * @param {'solid'|'link'|'bare'} [props.variant='link']
 * @param {string} [props.href]
 * @param {string} [props.icon] nombre del `Icon` a poner.
 * @param {'start'|'end'} [props.iconPosition='end']
 * @param {boolean} [props.external] añade destino y `rel` de enlace externo.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Action = ({
  variant = 'link',
  href,
  icon,
  iconPosition = 'end',
  external = false,
  className = '',
  children,
  ...rest
}) => {
  const base =
    'transition-[transform,opacity] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px active:opacity-90';
  const formas = {
    solid:
      'inline-flex min-h-[44px] items-center justify-center gap-2 bg-accent px-5 text-[length:var(--t-nano)] leading-none text-accent-ink',
    link: 'u-link inline-flex min-h-[24px] items-center gap-1.5',
    bare: 'inline-flex min-h-[24px] items-center gap-1.5',
  };
  const Tag = href ? 'a' : 'button';
  const enlaces = href ? { href } : { type: 'button' };
  const externo = external ? { target: '_blank', rel: 'noreferrer' } : {};
  const marca = icon ? <Icon name={icon} size={14} /> : null;

  return (
    <Tag className={cx(base, formas[variant] ?? formas.link, className)} {...enlaces} {...externo} {...rest}>
      {marca && iconPosition === 'start' ? marca : null}
      <span>{children}</span>
      {marca && iconPosition === 'end' ? marca : null}
    </Tag>
  );
};

export default Action;
