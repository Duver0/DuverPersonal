import { EXPERIENCE_START_YEAR, HERO_PROFILE } from '../content/profile.js';
import { PROLOGO_FOTO } from '../content/archivo.js';
import { Lead, Nano, Reveal, Section, Shell } from './ui/index.js';

/**
 * Prólogo (§8.1) — el único descanso deliberado de la página.
 *
 * Tercio superior: el statement real de `profile.js` en `--t-lead` y 62 ch,
 * sin pasar de cuatro líneas a 390 px (medido: 4). 28 px debajo, dos rótulos en
 * `--t-nano`. 40 px más abajo, la postal coloreada a mano a sangre, 21:9, que se
 * sale por debajo del pliegue: en la primera pantalla del Prólogo se ve su 60 %
 * superior y el resto llega con el scroll. Debajo, la leyenda y el sello de
 * crédito.
 */
const Prologo = () => (
  <Section
    id="prologo"
    tone="surface"
    rhythm="none"
    labelledBy="prologo-statement"
    className="pb-[var(--space-block)] pt-[var(--space-section)]"
  >
    <Shell>
      <Reveal step={0}>
        <Lead id="prologo-statement">{HERO_PROFILE.summary}</Lead>
      </Reveal>
      <Reveal step={1} className="mt-7 flex flex-wrap gap-x-12 gap-y-4">
        <Nano className="max-w-[150px] text-muted">
          {HERO_PROFILE.location} · desde {EXPERIENCE_START_YEAR}
        </Nano>
        <Nano className="max-w-[150px] text-muted">
          {HERO_PROFILE.availability}
        </Nano>
      </Reveal>
    </Shell>

    <Reveal step={2} className="mt-10">
      <div className="marco aspect-[21/9] w-full">
        <img
          src={PROLOGO_FOTO.src}
          srcSet={PROLOGO_FOTO.srcSet}
          sizes={PROLOGO_FOTO.sizes}
          width={PROLOGO_FOTO.width}
          height={PROLOGO_FOTO.height}
          alt={PROLOGO_FOTO.alt}
          style={{ objectPosition: PROLOGO_FOTO.objectPosition }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <Shell className="mt-3">
        <Nano className="text-muted">
          {`«${PROLOGO_FOTO.credit.title}»`} · {PROLOGO_FOTO.credit.author} ·{' '}
          {PROLOGO_FOTO.credit.license} ·{' '}
          <a
            href={PROLOGO_FOTO.credit.page}
            target="_blank"
            rel="noreferrer"
            className="u-link"
          >
            {PROLOGO_FOTO.credit.via}
          </a>
        </Nano>
      </Shell>
    </Reveal>
  </Section>
);

export default Prologo;
