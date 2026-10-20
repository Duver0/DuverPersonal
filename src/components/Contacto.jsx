import { CTA_LINKS } from '../content/profile.js';
import { Icon, Reveal, Section, Shell, TONES } from './ui/index.js';

/**
 * Contacto (§8.7) — «direcciones en filas de display».
 *
 * Geometría: **seis filas a ancho completo**, todas al mismo tamaño (`--t-head`),
 * tinta plena, sangría de 20 px (`Shell` → `--pad-x`), `leading` 1,0, cada fila
 * de 150 px de alto con el texto en su tercio inferior. Las filas se distinguen
 * **por bandas de tono alternadas** (`--ground` / `--surface`), no por líneas.
 * Sin título y sin formulario: es la única sección del índice que no lleva
 * `Display`.
 *
 * Contenido [REAL] (nada inventado): el correo con `mailto:`, LinkedIn, GitHub,
 * «Descargar CV» (PDF), «Medellín, Colombia» **como texto, no como enlace** (es
 * el lugar) y una fila de cierre en `--accent` —la única mancha de latón de la
 * sección, §5.3— con la palabra «Escríbeme» y, 24 px a su derecha, un disco
 * macizo de 44 px con la flecha de salida que abre el correo.
 *
 * Por qué las filas van a sangre y no dentro de un `Shell` común: cada banda
 * cruza toda la pantalla (de borde a borde) y lleva **un** `Shell` dentro para
 * el margen de texto. Así el filete de tono llega al borde y la medida de 20 px
 * se respeta una sola vez.
 *
 * El `id` es el ancla `contacto` de `SectionNav.SECCIONES`. La Placa final
 * (créditos y nombre completo) sigue en su propio `<footer>`.
 *
 * La dirección de correo —30 caracteres— no cabe en una línea a 30 px dentro de
 * un 390 real: los rótulos llevan `[overflow-wrap:anywhere]`, que sí rebaja el
 * `min-content` y deja partir la palabra. Con `break-words` el rótulo medía
 * 20..516 px en una ventana de 390 y el `body` le recortaba el final.
 */

const EMAIL = CTA_LINKS[0].href; // mailto:…
const CORREO = EMAIL.replace(/^mailto:/, '');
const CV = CTA_LINKS[2].href;
const GITHUB = 'https://github.com/Duver0';

/**
 * Las cinco direcciones reales, en el orden del blueprint. El tono alterna por
 * fila —arranca en `--surface` para que la banda de tono no quede pegada, sin
 * cambio, al `--ground` de Sobre mí— y la sexta (el cierre) va aparte porque es un
 * enlace de banda completa en latón.
 */
const FILAS = [
  { id: 'correo', label: CORREO, href: EMAIL, tone: 'surface' },
  { id: 'linkedin', label: 'LinkedIn', href: CTA_LINKS[1].href, tone: 'ground', external: true },
  { id: 'github', label: 'GitHub', href: GITHUB, tone: 'surface', external: true },
  { id: 'cv', label: 'Descargar CV', href: CV, tone: 'ground' },
  { id: 'lugar', label: 'Medellín, Colombia', tone: 'surface' },
];

/**
 * Rótulo con oportunidad de quiebre tras cada `@`. El `[overflow-wrap:anywhere]`
 * parte la dirección donde toque; el `<wbr>` le dice dónde partir con criterio,
 * así a 390 la línea corta en «…betancurbedoya@» y no en «…bedoya@o».
 */
const conQuiebres = (texto) =>
  texto.split('@').flatMap((parte, i) => (i === 0 ? [parte] : ['@', <wbr key={`w${i}`} />, parte]));

const Contacto = () => (
  <Section id="contacto" tone="ground" rhythm="none" aria-label="Contacto">
    <Reveal step={0}>
      <ul className="flex flex-col">
        {FILAS.map((fila) => (
          <li key={fila.id}>
            {/*
              El tono va en la banda (el `div`), no en el `<li>`: el `<li>` es un
              elemento de lista transparente y la banda es lo que se pinta. Así la
              fila no se lee como «tarjeta» y el filete de color sigue a sangre.
            */}
            <div data-tone={fila.tone} className={TONES[fila.tone]}>
              <Shell className="flex min-h-[150px] items-end pb-8">
                {fila.href ? (
                  <a
                    href={fila.href}
                    {...(fila.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex min-h-[44px] min-w-0 max-w-full items-end"
                  >
                    {/*
                      El subrayado va en el rótulo, no en la caja de 44 px de tacto.
                      `[overflow-wrap:anywhere]` (y no `break-words`): sólo `anywhere`
                      rebaja el ancho `min-content` del rótulo, que es lo que deja
                      partir la dirección de correo en un 390 real. Con
                      `break-word` el `min-content` sigue siendo la palabra entera y
                      el `body.overflow-x-hidden` recortaba el final del correo
                      (medido: rótulo 20..516 en una ventana de 390).
                    */}
                    <span className="u-link t-head block min-w-0 max-w-none [overflow-wrap:anywhere] leading-[1]">
                      {conQuiebres(fila.label)}
                    </span>
                  </a>
                ) : (
                  <span className="t-head block min-w-0 max-w-none [overflow-wrap:anywhere] leading-[1]">
                    {conQuiebres(fila.label)}
                  </span>
                )}
              </Shell>
            </div>
          </li>
        ))}

        {/* Fila de cierre: banda entera en latón, la única de la sección. */}
        <li>
          <div data-tone="accent" className={TONES.accent}>
            <a href={EMAIL} className="block">
              <Shell className="flex min-h-[150px] items-end pb-8">
                <span className="flex items-center gap-6">
                  <span className="t-head block max-w-none leading-[1]">Escríbeme</span>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-ink text-accent"
                  >
                    <Icon name="arrowUpRight" size={16} />
                  </span>
                </span>
              </Shell>
            </a>
          </div>
        </li>
      </ul>
    </Reveal>
  </Section>
);

export default Contacto;
