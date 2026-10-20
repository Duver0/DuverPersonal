import { useRef, useState } from 'react';
import { PROJECTS } from '../content/profile.js';
import { POR_TIRADA, useProjectFilter } from '../hooks/useProjectFilter.js';
import { Action, Body, Display, Icon, Lead, Nano, Reveal, Section, Shell, cx } from './ui/index.js';

/**
 * Archivo (§8.5) — el pliego de índice (opción A), **sin una sola `<img>`**.
 *
 * Por qué no hay capturas, con el dato medido el 2026-10-15: las 24 entradas de
 * `src/data/projects.json` apuntan a `s.wordpress.com/mshots` y **ninguna imagen
 * de proyecto existe en el repo**. 18 de las 24 son byte-idénticas (GIF `GIF89a`
 * de 400×300, 8 737 B, SHA1 `37af25f411ac`, 12 fotogramas: el spinner animado de
 * WordPress), 5 son muros de login y 1 es este mismo sitio. **Cero de 24 comunica
 * un proyecto**; mShots rate-limita (HTTP 429) y un GIF animado se mueve sin que
 * ninguna media query lo detenga, es decir, viola `prefers-reduced-motion`. Por
 * eso el campo `image` **no se renderiza nunca**: esta sección pasa de 24
 * peticiones externas a **0** y el peso cae sobre la tipografía, que es
 * exactamente lo que pide una dirección de catálogo impreso.
 *
 * Geometría (§8.5, con sus cinco desviaciones declaradas):
 *  - Sobre `--surface` a sangre. Título a `--t-head` y, en su línea base a la
 *    derecha, la línea viva del filtro en `--t-nano`.
 *  - Tira de fichas: la activa con **relleno de latón** (única mancha de color
 *    de la pantalla), las demás sólo texto en `--muted`. `aria-pressed`, 44 px.
 *  - Pliego: `<ul>` de 8 entradas por tirada (24 ÷ 8 = tres tiradas exactas). Cada
 *    entrada es un `<li>` con el
 *    nombre a `--t-lead` —un escalón por debajo del título de sección, para no
 *    computar un sexto tamaño y para no caer en el techo de dos líneas de los
 *    titulares—, el stack en `--t-nano` (sentence case, sin recortar), el año y
 *    el tipo, y las salidas en un carril a la derecha, siempre en el mismo sitio.
 *  - La entrada destacada lleva una barra de **3 px × alto de fila en `--ink`**
 *    (no en latón: el acento marca un solo detalle por pantalla) y su texto
 *    sangra 18 px.
 *  - Las filas se separan **por aire (32 px) y por nada más**: ni filetes, ni
 *    sombras, ni bandas de cebra, ni números `01–24`.
 *  - Los 10 proyectos `kind: "repo"` con `link: null` dibujan **sólo** el enlace
 *    que existe: no se finge un hueco vacío.
 *
 * Fallback sin script (honesto, §9): esta app es una SPA de React sin SSR, así
 * que «sin JavaScript» no renderiza nada, hoy tampoco. Lo que sí se garantiza es
 * que **el primer render es el estado completo**: sin filtro aplicado y con las
 * 24 entradas en el pliego. Los controles (fichas y tiradas) sólo existen si el
 * módulo cargó, y la ocultación de las entradas que no son de la tirada en curso
 * vive en CSS colgando de la clase `js` (ver `src/index.css`), de modo que
 * quitando esa clase aparecen las 24. El `<noscript>` con GitHub, correo y CV
 * pertenece a `index.html`, que no es de esta fase.
 */

/** El `kind` del JSON, tal como lo lee una persona. */
const TIPO = { pages: 'Pages', repo: 'Repo' };

/**
 * §10 / §9: la clase `js` la pone `src/App.jsx` en el ámbito del módulo, antes
 * del primer render. Se consulta una sola vez, como estado inicial.
 */
const hayScript = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('js');

/**
 * El perfil de GitHub se deduce de los propios datos: no se escribe una URL a
 * mano que pueda quedar desincronizada con el archivo.
 */
const perfilDe = (proyectos) => {
  const repo = proyectos
    .map((p) => p.repo)
    .find((url) => typeof url === 'string' && url.includes('github.com'));
  if (!repo) return null;
  try {
    const { origin, pathname } = new URL(repo);
    const cuenta = pathname.split('/').filter(Boolean)[0];
    return cuenta ? `${origin}/${cuenta}` : null;
  } catch {
    return null;
  }
};

/** El rótulo de posición de la tirada, a la izquierda del pie del pliego. */
const posicionDe = (tirada, total) => {
  if (total === 1) return 'Única · 1 de 1';
  if (tirada === 1) return `Primera · 1 de ${total}`;
  if (tirada === total) return `Última · ${total} de ${total}`;
  return `Tirada ${tirada} de ${total}`;
};

/** Una ficha del filtro. Esquinas cuadradas, 44 px de alto, sin borde. */
const Ficha = ({ ficha, activa, onElegir }) => (
  <button
    type="button"
    aria-pressed={activa}
    onClick={() => onElegir(ficha.id)}
    className={cx(
      'inline-flex min-h-[44px] items-center px-3.5 transition-[opacity,transform] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px',
      activa ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink',
    )}
  >
    <Nano as="span">
      {ficha.label} · {ficha.n}
    </Nano>
  </button>
);

/**
 * Una salida del pliego. El rótulo va a `--t-body` en tinta plena cuando es la
 * demo y a `--t-nano` en `--muted` cuando es el código, como pide §8.5. El
 * área táctil es de 44 px en todos los casos (el defecto medido eran 19 px) y el
 * subrayado de 2 px vive en la receta `.salida`, sobre el rótulo y no sobre la
 * caja, para que no quede despegado del texto.
 */
const Salida = ({ href, tinta, tipo, etiqueta, children }) => {
  const Texto = tipo === 'nano' ? Nano : Body;
  return (
    <Action
      href={href}
      variant="bare"
      external
      icon="arrowUpRight"
      aria-label={etiqueta}
      className={cx('salida !min-h-[44px]', tinta)}
    >
      <Texto as="span">{children}</Texto>
    </Action>
  );
};

/** Una entrada del pliego: tres líneas a la izquierda, las salidas a la derecha. */
const Fila = ({ proyecto, enPliego }) => {
  const destacado = proyecto.featured === true;
  const stack = (proyecto.stack || []).join(' · ');
  const anio = (proyecto.pushed_at || '').slice(0, 4);
  const tipo = TIPO[proyecto.kind] ?? proyecto.kind ?? '';
  const meta = [anio, tipo].filter(Boolean).join(' · ');
  const demo = typeof proyecto.link === 'string' && proyecto.link.trim() ? proyecto.link : null;
  const repo = typeof proyecto.repo === 'string' && proyecto.repo.trim() ? proyecto.repo : null;

  return (
    <li
      data-en-pliego={enPliego ? 'true' : undefined}
      tabIndex={-1}
      className={cx(
        'relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10',
        destacado && 'pl-[18px]',
      )}
    >
      {destacado ? (
        <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-ink" />
      ) : null}

      <div className="flex min-w-0 flex-col gap-1">
        <Lead className="tracking-[-0.01em]">{proyecto.title}</Lead>
        {stack ? <Nano className="text-muted">{stack}</Nano> : null}
        {meta ? <Nano className="text-muted">{meta}</Nano> : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-6 md:flex-col md:items-end md:gap-x-0">
        {demo ? (
          <Salida href={demo} tinta="text-ink" etiqueta={`Demo de ${proyecto.title}`}>
            Demo
          </Salida>
        ) : null}
        {repo ? (
          <Salida
            href={repo}
            tinta="text-muted"
            tipo="nano"
            etiqueta={`Código de ${proyecto.title}`}
          >
            Código
          </Salida>
        ) : null}
      </div>
    </li>
  );
};

const Archivo = () => {
  /* Se lee una vez: si el módulo no hubiera cargado, este árbol no existiría. */
  const [conScript] = useState(hayScript);
  const {
    fichas,
    ficha,
    filtrar,
    filtrados,
    total,
    tirada,
    totalTiradas,
    irATirada,
    enPliego,
    visibles,
  } = useProjectFilter(PROJECTS);

  const pliegoRef = useRef(null);
  const etiqueta = fichas.find((f) => f.id === ficha)?.label ?? 'Todos';
  const mostradas = conScript ? visibles : filtrados.length;
  const lineaViva = `Mostrando ${mostradas} de ${total} · ${etiqueta}`;
  const perfil = perfilDe(PROJECTS);

  /**
   * §9.3: al cambiar de tirada el foco viaja a la primera entrada de la tirada
   * nueva, sin saltar el viewport (la entrada ocupa la misma altura del pliego
   * que ocupaba la primera de la tirada anterior).
   */
  const moverTirada = (paso) => {
    irATirada(tirada + paso);
    requestAnimationFrame(() => {
      pliegoRef.current?.querySelector('li[data-en-pliego]')?.focus({ preventScroll: true });
    });
  };

  return (
    <Section id="archivo" tone="surface" labelledBy="archivo-titulo">
      <Shell>
        <Reveal step={0} className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
          <Display id="archivo-titulo">Archivo</Display>
          <Nano aria-live="polite" className="text-muted">
            {lineaViva}
          </Nano>
        </Reveal>

        {conScript && fichas.length > 1 ? (
          <Reveal
            step={1}
            role="group"
            aria-label="Filtrar el archivo por lenguaje"
            className="mt-8 flex flex-wrap items-center"
          >
            {fichas.map((f) => (
              <Ficha key={f.id} ficha={f} activa={f.id === ficha} onElegir={filtrar} />
            ))}
          </Reveal>
        ) : null}

        <Reveal step={2} className="mt-10">
          {filtrados.length ? (
            <ul ref={pliegoRef} className="pliego flex flex-col gap-8">
              {filtrados.map((proyecto, i) => (
                <Fila
                  key={proyecto.repo || proyecto.title}
                  proyecto={proyecto}
                  enPliego={enPliego(i)}
                />
              ))}
            </ul>
          ) : (
            /* §9.5: sin entradas no se dibuja un pliego vacío. */
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <Body className="text-muted">El archivo todavía no tiene entradas.</Body>
              {perfil ? (
                <Action variant="link" href={perfil} external icon="arrowUpRight" className="text-ink !min-h-[44px]">
                  Ver el perfil en GitHub
                </Action>
              ) : null}
            </div>
          )}

          {conScript && filtrados.length ? (
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <Nano className="text-muted">{posicionDe(tirada, totalTiradas)}</Nano>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <button
                  type="button"
                  onClick={() => moverTirada(-1)}
                  disabled={tirada === 1}
                  className="inline-flex min-h-[44px] w-full items-center gap-1.5 text-ink transition-[opacity,transform] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px disabled:opacity-40 sm:w-auto"
                >
                  <Icon name="arrowLeft" size={14} />
                  <Body as="span">Tirada anterior</Body>
                </button>
                <button
                  type="button"
                  onClick={() => moverTirada(1)}
                  disabled={tirada === totalTiradas}
                  className="inline-flex min-h-[44px] w-full items-center gap-1.5 text-ink transition-[opacity,transform] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px disabled:opacity-40 sm:w-auto"
                >
                  <Body as="span">Siguiente tirada</Body>
                  <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          ) : null}
        </Reveal>
      </Shell>
    </Section>
  );
};

export default Archivo;
