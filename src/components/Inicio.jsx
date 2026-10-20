import { useEffect, useRef } from 'react';
import { CTA_LINKS, HERO_PROFILE } from '../content/profile.js';
import { INICIO_FOTOS, LEYENDA_INICIO } from '../content/archivo.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { Menu } from './SectionNav.jsx';
import { Action, Body, Monument, Nano, Reveal, Section } from './ui/index.js';

/**
 * Inicio (§8.0) — el nombre como monumento.
 *
 * Hasta 1024 px la geometría no cambia: la capa mide 100svh, el encabezado de
 * 52 px lleva la marca de agua a la izquierda y el `Menú` a la derecha (a
 * cualquier ancho: en ≥1280 es el acceso al índice mientras la portada ocupa la
 * franja del índice de margen, que allí no se pinta para no escribir sobre la
 * foto), el marco 2:3 se centra y, a partir de 768 px, baja hasta el borde
 * inferior; el nombre cruza su cuarto superior en dos líneas; abajo, la frase de
 * apoyo y una sola acción con la leyenda del archivo.
 *
 * A partir de 1024 px el nombre **nunca se apoya en píxeles de foto**: el bloque
 * pasa a una rejilla de 12 columnas con el nombre sobre papel en las 1–7 y la
 * placa fotográfica en las 8–12, a sangre por el borde derecho del viewport y
 * alta como el área útil (100svh − 52 px de encabezado). Se tocan en el borde y
 * no se solapan; el crossfade de tres capas y el duotono se conservan. El nombre
 * usa `.monumento-portada` (el token topado a 10.2vw) para que «BETANCUR» quepa
 * en sus siete columnas: a 1920 sigue midiendo los 190 px del token. El
 * contenedor se topa a 1920 px y se centra: a 2560 el hueco de tinta a foto baja
 * de 475 a 102 px sin mover ninguna caja por debajo de 1920. La frase de apoyo y
 * los créditos se quedan sobre papel, en la misma franja inferior pero sin
 * invadir la placa.
 *
 * Dos ajustes con números, medidos en Chrome:
 *  - `md:max-h-[69vw]`: el encaje por altura da 623 px de ancho a 768x1024 (81 %
 *    del ancho), el marco se comía los márgenes y el pie caía sobre la foto. El
 *    techo de 69vw (46vw de ancho, ×3/2 de alto) mantiene el 2:3 y deja 27 % de
 *    margen por lado; a 1440 no llega a actuar (540 px = 37 %).
 *  - `pr-[68px]`: el riel del control de tema (44 px + 24 px de margen). Sin él,
 *    la leyenda del archivo se metía debajo del conmutador y el primer renglón
 *    de la primera foto quedaba tapado a 390 y a 1440. En escritorio la franja
 *    termina antes de la placa y el `pr` vuelve a 0.
 *
 * Movimiento: el nombre se asienta un 5,5 % con el scroll (`.monumento-asienta`,
 * sólo `transform`) y las tres fotos se relevan en un crossfade de 7 s por
 * turno. Las TRES capas animan la misma receta y se desfasan 7 s entre sí con
 * `animation-delay`; la primera entra con −3,8 s, así que a t=0 ya está dentro de
 * su permanencia (opacity 1) y no se queda «sin animar» sobre las otras. Con
 * `prefers-reduced-motion` no se monta más que la primera foto, de modo que la
 * última nunca puede quedarse fija en pantalla, y el relevo se apaga desde
 * `src/index.css`.
 */
const Inicio = () => {
  const reduced = useReducedMotion();
  const marcoRef = useRef(null);
  const [principal] = INICIO_FOTOS;
  const fotos = reduced ? [principal] : INICIO_FOTOS;
  const [accion] = CTA_LINKS;

  /* §10: el relevo se detiene cuando la pestaña no se ve. */
  useEffect(() => {
    const nodo = marcoRef.current;
    if (!nodo) return undefined;
    const alCambiar = () => nodo.classList.toggle('is-pausado', document.hidden);
    document.addEventListener('visibilitychange', alCambiar);
    alCambiar();
    return () => document.removeEventListener('visibilitychange', alCambiar);
  }, []);

  return (
    <Section
      id="inicio"
      tone="ground"
      rhythm="none"
      labelledBy="inicio-nombre"
      className="flex min-h-[100svh] flex-col"
    >
      <header className="relative z-20 flex h-[52px] items-center justify-between gap-6 px-[var(--pad-x)]">
        <Reveal step={0}>
          <Nano as="span" className="text-muted">
            {HERO_PROFILE.name}
          </Nano>
        </Reveal>
        <Reveal step={0}>
          <Menu />
        </Reveal>
      </header>

      <div className="relative mx-auto w-full max-w-[1920px] flex-1 lg:grid lg:grid-cols-12 lg:gap-0 lg:pl-[var(--pad-x)]">
        <Reveal
          step={2}
          className="marco absolute left-1/2 top-[38px] aspect-[2/3] w-[min(78vw,340px)] -translate-x-1/2 md:h-[calc(100%-38px)] md:max-h-[69vw] md:w-auto lg:static lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:aspect-auto lg:top-auto lg:left-auto lg:h-[calc(100svh-52px)] lg:max-h-none lg:w-full lg:translate-x-0"
        >
          <div ref={marcoRef} className="absolute inset-0">
            {fotos.map((foto, i) => (
              <img
                key={foto.id}
                src={foto.src}
                srcSet={foto.srcSet}
                sizes={foto.sizes}
                width={foto.width}
                height={foto.height}
                alt={foto.alt}
                className="foto-turno absolute inset-0 h-full w-full object-cover"
                style={{
                  objectPosition: foto.objectPosition,
                  /*
                     Cada capa arranca su turno 7 s después de la anterior. La
                     primera se adelanta −3,8 s para que a t=0 esté ya en el tramo
                     de permanencia (opacity 1) y no en el fundido de entrada.
                  */
                  animationDelay: `${i * 7 - 3.8}s`,
                }}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : undefined}
                decoding="async"
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          step={0}
          className="absolute inset-x-0 top-[14px] z-10 text-center lg:static lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-start lg:text-left"
        >
          <Monument id="inicio-nombre" className="monumento-asienta monumento-portada">
            {HERO_PROFILE.name.split(' ').map((parte) => (
              <span key={parte} className="block">
                {parte}
              </span>
            ))}
          </Monument>
        </Reveal>

        <Reveal
          step={1}
          className="absolute inset-x-[var(--pad-x)] bottom-8 z-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 pr-[68px] lg:right-[41.6667%] lg:pr-0"
        >
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <Body className="max-w-[26ch]">{HERO_PROFILE.headline}</Body>
            <Action href={accion.href} variant="solid" icon="arrowUpRight">
              {accion.label}
            </Action>
          </div>
          <Nano className="max-w-[36ch] text-muted">
            Archivo · {LEYENDA_INICIO.place} · {LEYENDA_INICIO.authors} ·{' '}
            <a href={LEYENDA_INICIO.href} target="_blank" rel="noreferrer" className="u-link">
              {LEYENDA_INICIO.via}
            </a>
          </Nano>
        </Reveal>
      </div>
    </Section>
  );
};

export default Inicio;
