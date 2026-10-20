import { STATS } from '../content/profile.js';
import { CIFRAS_INSERTO } from '../content/archivo.js';
import { Body, Display, Nano, Reveal, Section, Shell } from './ui/index.js';

/**
 * Cifras (§8.2) — las líneas de cifras tranquilas: el descanso de la página.
 *
 * Geometría, en números: el bloque de texto ocupa las **columnas 2–7** y el
 * inserto de archivo las **9–11**; las dos piezas arrancan en la misma fila de
 * la rejilla, de modo que el cajón queda alineado con la **primera** cifra. Cada
 * fila son dos carriles: 132 px para la cifra (a la derecha, `--t-head`,
 * `tabular-nums`) y 24 px de hueco hasta la frase, que va en `--t-body` y
 * `--muted`. Las filas se separan **28 px**; el título va sobre la sangría de las
 * frases (132 + 24 = 156 px) y **56 px** por encima de la primera.
 *
 * Tres decisiones declaradas, ninguna improvisada:
 *
 * 1. **Aire.** §8.2 pide «18vh de aire arriba y abajo»; se usa el ritmo
 *    `--space-section` (128–192 px) porque §7 fija **dos alturas de respiración**
 *    para toda la página y prohíbe que ningún hueco interno iguale el salto entre
 *    secciones. 18vh a 900 px de alto son 162 px: la misma banda.
 * 2. **Sin contador.** §8.2 retira el contador animado («las cifras se dicen sin
 *    subir la voz»). La cifra se pinta en su valor final, así que el requisito de
 *    `prefers-reduced-motion` se cumple por construcción: aquí no hay movimiento
 *    que apagar.
 * 3. **El inserto no es opcional.** Es el margen que sostiene el suelo de
 *    imágenes reales de la página cuando el crossfade de la portada deja una sola
 *    foto montada (§8.2, §12.7). Va con su `alt` y su crédito, tomados del
 *    manifiesto `src/content/archivo.js`.
 *
 * La fila `132px minmax(0,1fr)` evita el desbordamiento horizontal en móvil: el
 * carril nunca se estira por debajo de su contenido.
 */
const Cifras = () => {
  const inserto = CIFRAS_INSERTO;

  return (
    <Section id="cifras" tone="ground" labelledBy="cifras-titulo">
      <Shell grid>
        <Reveal step={0} className="col-span-12 lg:col-start-2 lg:col-span-6">
          {/* 156 px = el carril de la cifra (132) + su hueco (24): el título se
              asienta sobre la sangría de las frases, como una cabecera de libro
              de cuentas. */}
          <Display id="cifras-titulo" className="ml-[156px]">
            Cifras
          </Display>
        </Reveal>

        {/* mt-8 + los 24 px del `gap` de la rejilla = los 56 px que pide §8.2. */}
        <Reveal
          as="dl"
          step={1}
          className="col-span-12 mt-8 flex flex-col gap-7 lg:col-start-2 lg:col-span-6"
        >
          {STATS.map((cifra) => (
            <div key={cifra.label} className="grid grid-cols-[132px_minmax(0,1fr)] gap-x-6">
              <Display as="dt" className="max-w-none text-right tabular-nums">
                {cifra.value}
              </Display>
              <Body as="dd" className="text-muted">
                {cifra.label}
              </Body>
            </div>
          ))}
        </Reveal>

        {/* Mismo `mt-8`: en escritorio comparte fila con la lista y la punta del
            cajón cae exactamente sobre la primera cifra. */}
        <Reveal
          as="figure"
          step={2}
          className="col-span-12 mt-8 lg:col-start-9 lg:col-span-3"
        >
          <div className="marco aspect-[4/5] w-full max-w-[200px]">
            <img
              src={inserto.src}
              srcSet={inserto.srcSet}
              sizes={inserto.sizes}
              width={inserto.width}
              height={inserto.height}
              alt={inserto.alt}
              style={{ objectPosition: inserto.objectPosition }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="mt-3">
            <Nano className="text-muted">
              Archivo · {inserto.credit.author} ·{' '}
              <a href={inserto.credit.page} target="_blank" rel="noreferrer" className="u-link">
                {inserto.credit.via}
              </a>
            </Nano>
          </figcaption>
        </Reveal>
      </Shell>
    </Section>
  );
};

export default Cifras;
