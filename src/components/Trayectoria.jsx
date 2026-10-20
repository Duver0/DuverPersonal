import { EXPERIENCE } from '../content/profile.js';
import { Body, Display, Icon, Nano, Reveal, Section, Shell, Surface } from './ui/index.js';

/**
 * Trayectoria (§8.4) — barras rellenas, filas de libro de cuentas.
 *
 * Geometría: columna de lectura de 640 px hasta 1024 y, a partir de ahí, el ancho
 * útil completo en la rejilla de 12: empresa y periodo en las columnas 1–5, rol y
 * stack en las 6–11 y el signo `+` en la 12. Título a `--t-head` y, 20 px debajo,
 * **cinco** barras de ancho completo, 56 px de alto y 6 px de separación, rellenas
 * en `--surface` y de esquinas cuadradas (la casa usa una sola forma). El rótulo
 * va a 17 px (`--t-body`) con 18 px de padding, el periodo a `--t-nano` en
 * `--muted` y el signo `+` al extremo derecho, dibujado con el primitivo `Icon` y
 * girado 45° con `transform` al abrir. Cada barra es un `<details>`: **abre en su
 * sitio**, conserva el relleno y muestra en el panel el cargo (`--t-body`, tinta
 * plena), el periodo (`--t-nano`, `--muted`) cuando la casa tiene más de un
 * cargo, la descripción (`--t-body`, 62 ch) y el stack (`--t-nano`, separado por
 * puntos medios) en móvil. La primera va abierta.
 *
 * Cinco decisiones declaradas:
 *
 * 1. **Cinco barras, no seis filas.** §8.4 pide 6–9 barras y el dato sólo sostiene
 *    cinco casas: `Talent.com` aparece dos veces en `EXPERIENCE` (dos cargos) y se
 *    agrupa en **una** barra con los dos cargos dentro del panel, como manda el
 *    blueprint. No se inventan filas para llegar a seis.
 * 2. **El periodo sube a la barra.** §8.4 dibuja la barra con «la etiqueta a la
 *    izquierda y el signo `+` a la derecha» y pide el periodo dentro del panel; la
 *    tabla de asignación de §4 pide `--t-nano` en «los rótulos de las barras, a la
 *    derecha de las barras de Trayectoria». Se resuelve poniendo el periodo **en la
 *    barra**, a la derecha del rótulo: el pliego cerrado ya dice casa y fechas
 *    —que es lo que hace útil un libro de cuentas—, y el panel no repite el mismo
 *    dato dos veces. El periodo de cada cargo sí aparece en el panel de una casa
 *    con varios cargos, porque ahí distingue un cargo del otro.
 * 3. **El periodo de una casa con varios cargos** se compone de los dos extremos
 *    reales (arranque del cargo más antiguo, cierre del más reciente). No se
 *    escribe ninguna fecha nueva; es la única pieza derivada del dato.
 * 4. **Sin scroll anidado.** El `max-h-[720px] overflow-y-auto` heredado
 *    desaparece: la sección fluye con la página (§7), de modo que no hay dos
 *    barras de desplazamiento y el gesto del pulgar nunca se lo roba un
 *    contenedor.
 * 5. **Sin movimiento perpetuo.** Se retiran `animate-node-pulse-slow` y el filete
 *    que crecía con `scale-y`. Lo único que se mueve es el giro del `+`, con
 *    `transition-transform` y `--dur-hover` (0 ms con `prefers-reduced-motion`
 *    por el guard de `src/index.css`); la pulsación usa `transform`/`opacity` con
 *    `--dur-press`, como pide §10.
 * 6. **Riel del control de tema en móvil.** El `ThemeToggle` es fijo, 44 × 44 px y
 *    a 24 px del borde inferior y del derecho, así que ocupa la franja
 *    `[derecha-68, derecha-24]` del viewport. Por debajo de `md` la columna de
 *    Trayectoria alcanza el margen derecho, de modo que el `+` caía bajo el
 *    conmutador. Se reserva su riel con `max-md:pr-[56px]` sobre el `<summary>`
 *    (= 68 px del riel − 20 px de `--pad-x` + 8 px de aire; los 8 y no 4 porque
 *    el `+` abierto gira 45° y su caja pasa de 16 a 22,6 px). El relleno de la
 *    barra sigue a sangre y sólo el `+` se aparta. Es el mismo recurso que la
 *    portada ya usa con `pr-[68px]` (ver `Inicio.jsx`). A partir de `md` la
 *    columna (640 px) no alcanza el riel y el `+` vuelve a sus 18 px de §8.4; a
 *    partir de `lg` la barra ocupa el ancho útil y, entre 1280 y 1439 (cuando el
 *    índice de margen está visible y la caja útil casi toca el borde), se reserva
 *    su riel con `xl:pr-[88px]`; a 1440 la caja ya deja 100 px y vuelve a 24.
 *
 * Sin JavaScript: `<details>`/`<summary>` es el mecanismo nativo de apertura.
 */

/**
 * Las casas del perfil, agrupadas por empresa y en el orden de `EXPERIENCE`
 * (que ya viene de la más reciente a la más antigua).
 */
const CASAS = EXPERIENCE.reduce((casas, puesto) => {
  const casa = casas.find((item) => item.company === puesto.company);
  if (casa) casa.roles.push(puesto);
  else casas.push({ company: puesto.company, roles: [puesto] });
  return casas;
}, []);

/**
 * El separador de un periodo: guion, semirraya o guion largo, con el espacio que
 * lleve alrededor. Se escribe con escapes para no dejar un guion largo literal en
 * el código (los datos sí lo traen, y ahí es copy legítimo).
 */
const SEPARADOR_PERIODO = /\s*[-\u2013\u2014]\s*/;

/**
 * El periodo de una casa: el suyo si tiene un solo cargo; si tiene varios, el
 * rango entre el arranque del más antiguo y el cierre del más reciente, leídos de
 * los periodos reales del perfil. Se rinde con **semirraya** (–), que es el signo
 * de rango del español; el guion largo de los datos es un separador tipográfico.
 */
const periodoDe = ({ roles }) => {
  if (roles.length === 1) return roles[0].period;
  const [arranque] = roles[roles.length - 1].period.split(SEPARADOR_PERIODO);
  const [, cierre] = roles[0].period.split(SEPARADOR_PERIODO);
  if (!arranque || !cierre) return roles[0].period;
  return `${arranque.trim()} \u2013 ${cierre.trim()}`;
};

const Trayectoria = () => (
  <Section id="trayectoria" tone="ground" labelledBy="trayectoria-titulo">
    <Shell>
      <div className="max-w-[640px] lg:max-w-none">
        <Reveal step={0}>
          <Display id="trayectoria-titulo">Trayectoria</Display>
        </Reveal>

        <Reveal step={1} className="mt-5 flex flex-col gap-1.5">
          {CASAS.map((casa, indice) => (
            <details key={casa.company} className="group" open={indice === 0 ? true : undefined}>
              <Surface
                as="summary"
                tone="surface"
                className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-[18px] transition-[transform,opacity] duration-[var(--dur-press)] ease-[var(--ease-out)] active:translate-y-px active:opacity-90 max-md:pr-[56px] sm:gap-6 lg:grid lg:grid-cols-12 lg:gap-[var(--shell-gap)] lg:px-6 xl:pr-[88px] min-[1440px]:pr-6 [&::-webkit-details-marker]:hidden"
              >
                {/* El rótulo y su periodo comparten línea mientras quepan: en móvil
                    el periodo baja a la línea siguiente entero, nunca partido. */}
                <span className="flex flex-wrap items-baseline gap-x-5 gap-y-0.5 lg:col-span-5 lg:flex-nowrap lg:gap-x-6">
                  <Body as="span">{casa.company}</Body>
                  <Nano as="span" className="text-muted">
                    {periodoDe(casa)}
                  </Nano>
                </span>

                {/* Sólo escritorio: el rol y el stack ocupan la mitad derecha de la
                    barra. En móvil viven en el panel (oculto aquí con `display`,
                    así que no se anuncian dos veces). */}
                <span className="hidden lg:col-span-6 lg:col-start-6 lg:flex lg:min-w-0 lg:flex-col lg:gap-1">
                  <Body as="span">{casa.roles.map((rol) => rol.role).join(' · ')}</Body>
                  <Nano as="span" className="text-muted">
                    {[...new Set(casa.roles.flatMap((rol) => rol.stack))].join(' · ')}
                  </Nano>
                </span>

                <Icon
                  name="plus"
                  size={16}
                  className="self-center transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] group-open:rotate-45 lg:col-span-1 lg:justify-self-end"
                />
              </Surface>

              <Surface tone="surface" className="px-[18px] pb-6 pt-2 lg:px-6">
                {casa.roles.map((rol, i) => (
                  <div
                    key={rol.role}
                    className={`lg:grid lg:grid-cols-12 lg:gap-[var(--shell-gap)] ${i > 0 ? 'mt-6 lg:mt-5' : ''}`}
                  >
                    <div className="lg:col-span-5">
                      <Body>{rol.role}</Body>
                      {/* Con un solo cargo el periodo ya está en la barra: aquí se
                          repite sólo cuando distingue un cargo de otro. */}
                      {casa.roles.length > 1 ? (
                        <Nano className="mt-1 text-muted">{rol.period}</Nano>
                      ) : null}
                    </div>
                    <Body className="mt-3 lg:col-span-7 lg:col-start-6 lg:mt-0">{rol.description}</Body>
                    <Nano className="mt-3 text-muted lg:hidden">{rol.stack.join(' · ')}</Nano>
                  </div>
                ))}
              </Surface>
            </details>
          ))}
        </Reveal>
      </div>
    </Shell>
  </Section>
);

export default Trayectoria;
