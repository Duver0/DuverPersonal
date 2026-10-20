import { useEffect, useRef, useState } from 'react';
import { cx } from './ui/cx.js';
import { Icon } from './ui/Icon.jsx';

/**
 * La navegación son dos piezas del mismo módulo:
 *  - `SectionNav` (por defecto): el índice de margen, fijo a la derecha a partir
 *    de 1280 px. Ocho entradas en `--t-nano`, la activa en tinta plena y el
 *    resto en `--muted`, sin chrome, sin fondo, sin píldoras (§8.9). Mientras la
 *    portada ocupa su franja no se pinta: la placa fotográfica llega al borde y
 *    el `Menú` del encabezado hace de índice (así ninguna letra cae sobre foto).
 *  - `Menu`: el `<details>` con el índice completo, en el encabezado de la
 *    portada a cualquier ancho. Funciona sin JS.
 *
 * Los `id` de `SECCIONES` son el contrato con el resto de la página: cada ancla
 * existe una sola vez y corresponde al `id` de su sección en `App.jsx`
 * (`inicio`, `prologo`, `cifras`, `disciplinas`, `trayectoria`, `archivo`,
 * `sobre-mi`, `contacto`). El `<footer>` (Placa final) queda **fuera** de esta
 * lista: su `id` es `placa-final` y no se navega desde aquí, pero su campo
 * volteado sí cambia el color de los rótulos del índice.
 */
export const SECCIONES = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'prologo', label: 'Prólogo' },
  { id: 'cifras', label: 'Cifras' },
  { id: 'disciplinas', label: 'Disciplinas' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'archivo', label: 'Archivo' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

/** Devuelve el `id` de la sección que ocupa la banda central de la pantalla. */
const useSeccionActiva = () => {
  const [activa, setActiva] = useState(SECCIONES[0].id);

  useEffect(() => {
    const nodos = SECCIONES.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodos.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setActiva(entrada.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    nodos.forEach((nodo) => observador.observe(nodo));
    return () => observador.disconnect();
  }, []);

  return activa;
};

const SectionNav = () => {
  const activa = useSeccionActiva();

  /*
    El índice es fijo y puede quedar sobre dos fondos que no son papel: la placa
    fotográfica de la portada y las secciones de campo volteado (`disciplinas` y
    la placa final, que no está en el índice).
    - Mientras la portada ocupa la franja del índice, el índice **no se pinta**:
      en su lugar, el encabezado de `Inicio` ofrece el `Menú` (que hasta 1280 ya
      existía). Así no hay ni una letra sobre píxeles de foto.
    - Sobre el campo volteado, los rótulos cambian al par `--field-ink` /
      `--field-muted` para conservar el contraste sin añadir chrome.
    El umbral es geométrico: el índice mide 8 × 44 px (SECCIONES × el alto táctil)
    y se muestra cuando el borde inferior de la portada ya pasó su borde superior.
    Se oculta con `invisible`, no con `hidden`: `display:none` colapsa su rect a
    0, la condición de la banda vuelve a falso y el índice parpadeaba (64 toggles
    medidos). `visibility:hidden` conserva la geometría y la condición es estable.
  */
  const [pasadaPortada, setPasadaPortada] = useState(false);
  useEffect(() => {
    const portada = document.getElementById('inicio');
    if (!portada) return undefined;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const bordeSuperiorIndice = window.innerHeight / 2 - (SECCIONES.length * 44) / 2;
      setPasadaPortada(portada.getBoundingClientRect().bottom <= bordeSuperiorIndice);
    };
    const alScroll = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', alScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', alScroll);
      window.removeEventListener('resize', alScroll);
    };
  }, []);

  const [enPlaca, setEnPlaca] = useState(false);
  useEffect(() => {
    const nodo = document.getElementById('placa-final');
    if (!nodo || typeof IntersectionObserver === 'undefined') return undefined;
    const observador = new IntersectionObserver(
      ([entrada]) => setEnPlaca(entrada.isIntersecting),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  /*
    La banda maciza de latón de `Contacto` («Escríbeme») es el único fondo de la
    página sobre el que el índice no puede elegir un par de tinta estable: en
    oscuro, `--ink` sobre `--accent` baja a 1,5:1. Como el latón no es un campo
    volteado (el par `--field-*` tampoco sirve), el índice **no se pinta** mientras
    esa banda cruza su caja; reaparece en la placa final con el par de campo.
    Es geometría, no un color nuevo.
  */
  const navRef = useRef(null);
  const [enAcento, setEnAcento] = useState(false);
  useEffect(() => {
    const acento = document.querySelector('#contacto [data-tone="accent"]');
    const nav = navRef.current;
    if (!acento || !nav) return undefined;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const a = acento.getBoundingClientRect();
      const n = nav.getBoundingClientRect();
      setEnAcento(a.top < n.bottom && a.bottom > n.top && a.left < n.right && a.right > n.left);
    };
    const alScroll = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', alScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', alScroll);
      window.removeEventListener('resize', alScroll);
    };
  }, []);

  const sobreCampo = activa === 'disciplinas' || enPlaca;

  return (
    <nav
      ref={navRef}
      aria-label="Índice de secciones"
      className={cx(
        'fixed right-[var(--pad-x)] top-1/2 z-40 -translate-y-1/2',
        pasadaPortada && !enAcento ? 'invisible xl:visible' : 'invisible',
      )}
    >
      <ul className="flex flex-col items-end">
        {SECCIONES.map((seccion) => (
          <li key={seccion.id}>
            <a
              href={`#${seccion.id}`}
              aria-current={activa === seccion.id ? 'location' : undefined}
              className={cx(
                'flex min-h-[44px] items-center px-2 text-[length:var(--t-nano)] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]',
                sobreCampo
                  ? activa === seccion.id
                    ? 'text-field-ink'
                    : 'text-field-muted hover:text-field-ink'
                  : activa === seccion.id
                    ? 'text-ink'
                    : 'text-muted hover:text-ink',
                sobreCampo && 'focus-visible:[outline-color:var(--field-ink)]',
              )}
            >
              {seccion.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Menú — el índice completo, plegado, para anchos menores que 1280 px.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
export const Menu = ({ className = '' }) => (
  <details className={cx('group relative', className)}>
    <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 text-[length:var(--t-nano)] text-ink [&::-webkit-details-marker]:hidden">
      Menú
      <Icon
        name="chevronDown"
        size={12}
        className="transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] group-open:rotate-180"
      />
    </summary>
    <ul className="absolute right-0 top-full z-50 mt-2 w-[min(80vw,300px)] bg-surface p-1">
      {SECCIONES.map((seccion) => (
        <li key={seccion.id}>
          <a
            href={`#${seccion.id}`}
            className="u-link flex min-h-[44px] items-center px-3 text-[length:var(--t-nano)] text-ink"
          >
            {seccion.label}
          </a>
        </li>
      ))}
    </ul>
  </details>
);

export default SectionNav;
