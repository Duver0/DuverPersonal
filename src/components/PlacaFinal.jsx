import { CTA_LINKS, HERO_PROFILE } from '../content/profile.js';
import { ARCHIVO } from '../content/archivo.js';
import { Action, Body, Display, Monument, Nano, Reveal, Section, Shell } from './ui/index.js';

/**
 * Placa final (§8.8) — «invitación sobre el nombre completo».
 *
 * Es el **noveno bloque** de la página: el cierre y los créditos. NO es una
 * sección del índice: `SectionNav.SECCIONES` cierra en `contacto`, que ahora
 * apunta a la sección de Contacto (§8.7). Por eso su `id` es `placa-final`, que
 * describe su contenido (créditos y nombre completo) y no rompe ninguna ancla.
 *
 * Vive **fuera** de `<main>` (es el `<footer>` de la página) y por eso añade
 * `z-10`: sin él quedaría por debajo del grano fijo.
 *
 * Campo `--field` a sangre con la tinta en gris papel: la contratapa del
 * catálogo. Tercio superior, columnas 1–7, el titular y la frase reales con una
 * sola acción maciza de latón; columnas 10–12, los cuatro enlaces apilados.
 * Debajo, la fila de créditos a tinta plena y, al pie, el nombre a
 * `--t-monument` con el mismo techo de caja que la portada (`monumento-portada`,
 * `min(token, 10.2vw)` desde 1024), **sin recorte**: una línea de 1024 a 1920 y
 * dos de 320 a 768 («BETANCUR» mide 294 px a 320 dentro de 300 útiles). El
 * `pb-[0.33em]` del propio `Monument` da al campo del pie el alto de la tinta:
 * sin él, el descendente se dibujaba fuera del `<footer>` y quedaba una banda de
 * papel de 18–63 px. Antes se recortaba por abajo y por la derecha como recurso
 * de la dirección §8.8; la lectura del usuario lo señaló como defecto y se
 * retira.
 *
 * `Monument` SÍ se usa aquí: §4 lo reserva a la portada y a la placa final. Es la
 * única excepción autorizada fuera de Inicio; por eso conviven dos `.t-monument`
 * en la página (el aviso de `Monument` en desarrollo es esperado y está
 * autorizado). Va como `<p>`, no como encabezado: el `<h1>` es el nombre de la
 * portada.
 *
 * Créditos (§8.8, §8.9): el bloque `Pictures:` se genera a partir del manifiesto
 * `src/content/archivo.js`, que transcribe `.taste-skill/imagery/credits.md`
 * (producido por `assets.mjs --credits`). No se escriben a mano: sólo se filtran
 * las 5 piezas que la página usa y se conserva el orden del manifiesto. Ninguna
 * foto de archivo se atribuye a Duver. Encima, «Bodoni Moda · OFL» y
 * «React · Vite · Tailwind».
 */

const EMAIL = CTA_LINKS[0].href;
const CV = CTA_LINKS[2].href;

const ENLACES = [
  { label: 'Email', href: EMAIL },
  { label: 'LinkedIn', href: CTA_LINKS[1].href, external: true },
  { label: 'GitHub', href: 'https://github.com/Duver0', external: true },
  { label: 'CV', href: CV },
];

/**
 * Las cinco fotos de archivo que la página monta (§8.9), en el orden del
 * manifiesto de créditos: Inicio (3), Prólogo (1) y Cifras (1).
 */
const CREDITOS = [
  ARCHIVO.inicio[0],
  ARCHIVO.prologo,
  ARCHIVO.inicio[1],
  ARCHIVO.inicio[2],
  ARCHIVO.cifras,
];

const COMMONS = 'https://commons.wikimedia.org/';

/** Una pieza de crédito: «Título» by Autor, licencia, via Wikimedia Commons. */
const credito = (pieza, i) => {
  const c = pieza.credit;
  return (
    <span key={pieza.id}>
      {i > 0 ? '; ' : null}
      <a href={c.page} target="_blank" rel="noreferrer" className="u-link">
        {`«${c.title}»`}
      </a>
      {` by ${c.author}, `}
      <a href={c.licenseUrl} target="_blank" rel="noreferrer" className="u-link">
        {c.license}
      </a>
      {', via '}
      <a href={COMMONS} target="_blank" rel="noreferrer" className="u-link">
        {c.via}
      </a>
    </span>
  );
};

const PlacaFinal = () => (
  <Section
    as="footer"
    id="placa-final"
    tone="field"
    rhythm="none"
    labelledBy="placa-titular"
    className="z-10 pt-[var(--space-section)]"
  >
    <Shell grid>
      <Reveal step={0} className="col-span-12 lg:col-span-7">
        <Display id="placa-titular" className="max-w-[14ch]">
          Hablemos de tu backlog
        </Display>
      </Reveal>

      <Reveal step={1} className="col-span-12 mt-6 lg:col-span-7">
        <Body className="max-w-[45ch]">
          Puedo sumarme como freelancer o refuerzo temporal para reducir tu backlog y dejar procesos
          automatizados.
        </Body>
        <Action variant="solid" href={EMAIL} icon="arrowUpRight" className="mt-8">
          Agenda una llamada
        </Action>
      </Reveal>

      <Reveal step={2} className="col-span-12 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0">
        <ul className="flex flex-col">
          {ENLACES.map((enlace) => (
            <li key={enlace.label}>
              <Action
                variant="bare"
                href={enlace.href}
                external={enlace.external}
                className="min-h-[44px] py-2.5 text-[length:var(--t-body)]"
              >
                <span className="u-link">{enlace.label}</span>
              </Action>
            </li>
          ))}
        </ul>
      </Reveal>
    </Shell>

    {/* Fila de créditos a tinta plena, justo encima de la línea del nombre. */}
    <Shell className="mt-[var(--space-block)]">
      <Reveal
        step={2}
        className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"
      >
        <Nano className="max-w-[78ch]">Pictures: {CREDITOS.map(credito)}</Nano>
        <div className="flex shrink-0 flex-col gap-1 md:items-end">
          <Nano>Bodoni Moda · OFL</Nano>
          <Nano>React · Vite · Tailwind</Nano>
        </div>
      </Reveal>
    </Shell>

    {/* El nombre, completo: una línea si cabe y dos si no, sin recorte. */}
    <div className="mt-[var(--space-block)]">
      <Monument as="p" className="monumento-portada pb-[0.33em] pl-[var(--pad-x)]">
        {HERO_PROFILE.name}
      </Monument>
    </div>
  </Section>
);

export default PlacaFinal;
