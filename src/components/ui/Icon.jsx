import { cx } from './cx.js';

/**
 * Icon — los únicos trazos de la casa. SVG en línea, `currentColor`, sin fuente
 * de iconos ni petición de red. Por defecto es decorativo (`aria-hidden`); si
 * recibe `title` pasa a ser una imagen con nombre.
 *
 * Sólo están los símbolos que la página usa hoy. Para añadir uno: una entrada
 * más en `ICONS` con los `d` de un solo trazo de 16×16 y grosor 1,5. Nada de
 * rellenos salvo la marca que ya es un relleno (GitHub).
 *
 * @param {object} props
 * @param {'arrowLeft'|'arrowRight'|'arrowUpRight'|'chevronDown'|'plus'|'mail'|'download'|'sun'|'moon'|'github'} props.name
 * @param {number} [props.size=16] lado de la caja, en px.
 * @param {string} [props.title] nombre accesible; sin él el icono es decorativo.
 * @param {string} [props.className]
 */

const ICONS = {
  /* La flecha de secuencia del Archivo: «Tirada anterior» (fase 2B-2). Frente a
     `arrowUpRight`, que es la salida de un enlace, ésta ordena un recorrido. */
  arrowLeft: { d: ['M13 8H3', 'm6.5 4.5-3.5 3.5 3.5 3.5'] },
  arrowRight: { d: ['M3 8h10', 'm9.5 4.5 3.5 3.5-3.5 3.5'] },
  arrowUpRight: { d: ['M5 11 11 5', 'M6 5h5v5'] },
  chevronDown: { d: ['m4.5 6.5 3.5 3.5 3.5-3.5'] },
  /* El signo de la barra de Trayectoria: gira 45° al abrir (§8.4). */
  plus: { d: ['M8 3.5v9', 'M3.5 8h9'] },
  mail: { d: ['M2.5 4.5h11v7h-11z', 'm2.5 5.2 5.5 4 5.5-4'] },
  download: { d: ['M8 2.5v8', 'm4.8 7.3 3.2 3.2 3.2-3.2', 'M2.8 13.2h10.4'] },
  sun: {
    d: [
      'M8 5.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2',
      'M8 1.4v1.6',
      'M8 13v1.6',
      'M1.4 8h1.6',
      'M13 8h1.6',
      'm3.35 3.35 1.13 1.13',
      'm11.52 3.35-1.13 1.13',
      'm3.35 12.65 1.13-1.13',
      'm11.52 12.65-1.13-1.13',
    ],
  },
  moon: { d: ['M8 2a4 4 0 0 0 6 6 6 6 0 1 1-6-6Z'] },
  github: {
    fill: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z',
  },
};

export const Icon = ({ name, size = 16, title, className = '' }) => {
  const def = ICONS[name];
  if (!def) {
    if (import.meta.env.DEV) {
      console.warn(`Icon: no existe «${name}». Disponibles: ${Object.keys(ICONS).join(', ')}.`);
    }
    return null;
  }

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={cx('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      fill={def.fill ? 'currentColor' : 'none'}
      stroke={def.fill ? 'none' : 'currentColor'}
      strokeWidth={def.fill ? undefined : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {def.fill ? <path d={def.fill} /> : null}
      {def.d ? def.d.map((d) => <path key={d} d={d} />) : null}
    </svg>
  );
};

export default Icon;
