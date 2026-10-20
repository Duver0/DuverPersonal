import { useEffect } from 'react';
import { cx } from './cx.js';

/**
 * La escalera de texto de §4, en cinco primitivas. Cada una aplica UNA receta de
 * `src/index.css` (`.t-*`), que es donde vive el tamaño, el interlineado, la
 * medida en `ch` y el eje óptico de Bodoni Moda. Nadie escribe un `font-size`
 * suelto: si falta un tamaño, falta un rol en la dirección, no una clase.
 */

/**
 * Monument — el nombre a `--t-monument` (56 → 190 px). §8.0 y §8.8 lo reservan
 * a **dos** sitios: la portada y la placa final. En desarrollo avisa si aparece
 * un tercero.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='h1']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Monument = ({ as: Tag = 'h1', className = '', children, ...rest }) => {
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const cuantos = document.querySelectorAll('.t-monument').length;
    if (cuantos > 2) {
      console.warn(
        `Monument: ${cuantos} elementos a --t-monument. §8.0/§8.8 la reservan a dos: portada y placa final.`,
      );
    }
  }, []);

  return (
    <Tag className={cx('t-monument', className)} {...rest}>
      {children}
    </Tag>
  );
};

/**
 * Display — el título de sección (`--t-head`, 30 → 44 px, máximo 2 líneas).
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='h2']
 * @param {string} [props.id] para el `aria-labelledby` de `Section`.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Display = ({ as: Tag = 'h2', className = '', children, ...rest }) => (
  <Tag className={cx('t-head', className)} {...rest}>
    {children}
  </Tag>
);

/**
 * Lead — el statement (`--t-lead`, 22 → 28 px, medida 62 ch, máximo 3 líneas).
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='p']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Lead = ({ as: Tag = 'p', className = '', children, ...rest }) => (
  <Tag className={cx('t-lead', className)} {...rest}>
    {children}
  </Tag>
);

/**
 * Body — el texto corriente (`--t-body`, 17 → 20 px, medida 62 ch).
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='p']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Body = ({ as: Tag = 'p', className = '', children, ...rest }) => (
  <Tag className={cx('t-body', className)} {...rest}>
    {children}
  </Tag>
);

/**
 * Nano — rótulos, leyendas y créditos (`--t-nano`, 13 → 14 px, medida 48 ch).
 * Va en caja baja: la versalita espaciada es una marca del generador y no entra
 * en esta casa.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='p']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export const Nano = ({ as: Tag = 'p', className = '', children, ...rest }) => (
  <Tag className={cx('t-nano', className)} {...rest}>
    {children}
  </Tag>
);
