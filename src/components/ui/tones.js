/**
 * Los cuatro tonos de la casa (§6). Un tono es un par fondo + tinta, nunca un
 * color suelto: se declara en `data-tone` para que el anillo de foco viaje con
 * el fondo (`src/index.css`).
 *
 * ground  papel prensa, el campo por defecto
 * surface un escalón más profundo: barras, muelas, filas alternas
 * field   el campo volteado: Disciplinas y Placa final
 * accent  latón macizo: sólo relleno de UI, con `--accent-ink` encima
 */
export const TONES = {
  ground: 'bg-ground text-ink',
  surface: 'bg-surface text-ink',
  field: 'bg-field text-field-ink',
  accent: 'bg-accent text-accent-ink',
};
