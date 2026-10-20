import { DISCIPLINAS } from '../content/profile.js';
import { Body, Lead, Reveal, Section, Shell } from './ui/index.js';

/**
 * Disciplinas (§8.3) — el pliego de herramientas, en una sola frase.
 *
 * Campo volteado (`--field`) a sangre, de borde a borde; una única frase
 * cuadrada a la izquierda, a `--t-lead` (≤36 px: es un *statement*, no un
 * titular), medida 62 ch y leading de la receta. La **estructura** (Frontend,
 * backend, automatización) va en `--field-ink` y la **lista de herramientas**
 * también, a `--t-body`: es una enumeración, no un segundo statement, y a
 * `--t-lead` la frase se estiraba hasta el punto de leerse como un titular
 * partido. El color no baja a `--field-muted` porque en oscuro se queda en
 * 6,1:1 y el gate pide 7:1 para texto corrido; `--field-ink` da 13,2:1.
 * **Nada más**: ni logos, ni columnas, ni iconos, ni el ciclo de «un nombre
 * iluminado cada 2 segundos» que la v1 usaba como adorno perpetuo.
 *
 * Aire: §8.3 pide 120 px arriba y abajo y se usa `--space-section` (128–192 px)
 * por la misma razón que en Cifras: §7 fija dos alturas de respiración para toda
 * la página y un solo juego de márgenes entre secciones.
 *
 * El texto sale de `profile.js` (`DISCIPLINAS`), que es donde vive el contenido:
 * las doce herramientas no se pueden derivar de ningún otro campo (llegan como
 * frases con descriptores), así que la frase no se transcribe aquí.
 */
const Disciplinas = () => (
  <Section id="disciplinas" tone="field" labelledBy="disciplinas-frase">
    <Shell>
      <Reveal step={0}>
        <Lead id="disciplinas-frase">
          {DISCIPLINAS.estructura}{' '}
          {/* La lista de herramientas va un escalón por debajo: es textura. */}
          <Body as="span" className="text-field-ink">
            {DISCIPLINAS.detalle}
          </Body>
        </Lead>
      </Reveal>
    </Shell>
  </Section>
);

export default Disciplinas;
