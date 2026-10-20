import { ABOUT_TAGS, HERO_PROFILE } from '../content/profile.js';
import { Body, Display, Nano, Reveal, Section, Shell } from './ui/index.js';

/**
 * Sobre mí (§8.6) — «título fijado, el retrato pasa».
 *
 * Hasta 1024 px: rejilla de 12 columnas. El **título real** vive en las columnas
 * 1–6 y se fija (`sticky`, a 40svh) mientras la columna de la derecha (7–12)
 * —retrato, nombre, rol, párrafo y etiquetas— pasa a su lado. El retrato ocupa
 * las columnas que el título NO ocupa, así que la banda del título nunca cruza la
 * foto: la intersección es 0 **por geometría**, no por capa.
 *
 * Por debajo de 768 px el título **no se fija**: va en el flujo, encima del
 * retrato. Antes se fijaba a 16 px con una banda `--ground` opaca que tapaba la
 * foto (39 % a 390, 26 % a 768, 30 % a 1440, medido en la auditoría); en móvil no
 * hay ancho para dos columnas, así que la banda desaparece en vez de recortar.
 *
 * A partir de 1024 px se recompone sin mover una sola medida por debajo de esa
 * anchura: el título baja a las columnas 1–5 y se suelta del `sticky` (ya no hay
 * una columna que pase a su lado), el párrafo y las etiquetas suben bajo el
 * titular y el retrato se monta como **lámina impresa** en las columnas 7–12:
 * campo `--surface` alrededor de la foto, padding generoso (32 px), la leyenda
 * dentro del montaje y ninguna sombra, filete ni radio. La foto no se amplía
 * (313 px nativos, 1:1); lo que crece es el passe-partout. Así el titular queda
 * anclado a la composición —a la misma altura que la lámina— en vez de flotar
 * sobre una columna vacía.
 *
 * El retrato es la única foto propia (`src/assets/img/ProfilePhoto.png`) y mide
 * 313×313 px, medido. Va como INSERTO 1:1 de ≤156 px CSS por debajo de 1024 y de
 * ≤313 px en la lámina de escritorio: nunca se amplía. El `srcset` 320/640 de
 * §8.9 no se puede honrar (640 > 313 sería ampliar), de modo que se sirve el
 * único tamaño nativo con `width`/`height` reales (CLS 0).
 *
 * El párrafo real corre a 62 ch (`--t-body`), el texto no baja de 17 px y el
 * titular usa `--t-head` con un techo de 22 ch a partir de 1024 y `text-wrap:
 * pretty`, para que la última palabra no caiga sola en una línea huérfana.
 *
 * Es material propio: no lleva línea de crédito de archivo (nunca se atribuye
 * material de archivo a Duver, §8.9), sí `alt` en español.
 */

/** Párrafo [REAL], el del copy deck §11. */
const PARRAFO =
  'Colaboro de cerca con producto y áreas operativas para automatizar procesos manuales, crear dashboards accionables y desplegar aplicaciones robustas. Me mantengo cerca del usuario final y documento cada entrega para acelerar la adopción.';

const SobreMi = () => (
  <Section
    id="sobre-mi"
    tone="ground"
    rhythm="none"
    labelledBy="sobre-mi-titulo"
    className="pt-[var(--space-section)]"
  >
    <Shell className="md:grid md:grid-cols-12">
      {/*
        La capa fijada: el título espera en las columnas 1–6 mientras la columna
        de contenido (7–12) sube a su derecha. La banda va en `--ground` (el mismo
        campo, invisible) y su ancho no llega a la columna del retrato, así que no
        puede taparlo. `self-start` es lo que deja viajar al `sticky` dentro de su
        área de rejilla; el `py` cubre la caja real de la didona, que desborda su
        caja de línea. A partir de 1024 el título se suelta y comparte columna con
        el párrafo.
      */}
      <div
        data-banda="sobre-mi"
        className="md:sticky md:top-[40svh] md:z-10 md:col-span-6 md:self-start md:bg-ground md:py-2.5 lg:static lg:col-span-5 lg:bg-transparent lg:py-0"
      >
        <Reveal step={0}>
          <Display
            id="sobre-mi-titulo"
            className="lg:max-w-[22ch] lg:[text-wrap:pretty]"
          >
            Diseño soluciones con foco en negocio
          </Display>
        </Reveal>

        {/* Copia de escritorio: el párrafo sube bajo el titular. La de móvil
            (columna derecha) queda oculta por `display`, así que nunca hay dos
            copias en el árbol de accesibilidad. */}
        <Reveal step={1} className="hidden lg:mt-10 lg:block">
          <Body>{PARRAFO}</Body>
          <Nano className="mt-6 text-muted">{ABOUT_TAGS.join(' · ')}</Nano>
        </Reveal>
      </div>

      <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
        <Reveal step={1} className="mt-10 md:mt-0">
          {/* Lámina montada: el papel (`--surface`) es el passe-partout. */}
          <figure className="lg:ml-auto lg:w-full lg:max-w-[480px] lg:bg-surface lg:p-8 xl:p-10">
            <div className="lg:mx-auto lg:max-w-[313px]">
              <div
                data-retrato="sobre-mi"
                className="marco aspect-square w-[min(56vw,156px)] lg:w-full"
              >
                <img
                  src={HERO_PROFILE.photo}
                  width={313}
                  height={313}
                  alt="Retrato de Duver Betancur."
                  style={{ objectPosition: '50% 50%' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="hidden lg:mt-6 lg:block">
                <Nano>{HERO_PROFILE.name}</Nano>
                <Nano className="text-muted">{HERO_PROFILE.headline}</Nano>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <Reveal step={2} className="mt-8 lg:hidden">
          <Nano>{HERO_PROFILE.name}</Nano>
          <Nano className="text-muted">{HERO_PROFILE.headline}</Nano>

          <Body className="mt-6">{PARRAFO}</Body>

          <Nano className="mt-6 text-muted">{ABOUT_TAGS.join(' · ')}</Nano>
        </Reveal>
      </div>

      {/* Aire antes de que el título se suelte (§8.6). En escritorio no hay
          recorrido de `sticky`, así que el bloque desaparece. */}
      <div className="h-[12svh] md:col-span-12 lg:hidden" aria-hidden="true" />
    </Shell>
  </Section>
);

export default SobreMi;
