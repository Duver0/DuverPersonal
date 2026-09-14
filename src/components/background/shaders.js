/**
 * Shaders del grid extraídos de GridBackground.jsx.
 * Valores derivados de `src/theme/backgroundTokens.js`:
 * GRID.scale = 44, revealRadius light 0.16 / dark 0.10.
 * Light usa SOLO dotGrid (sin lineGrid).
 */

export const GRID_VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

export const GRID_FRAG = `#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uHover;
uniform float uBaseA;
uniform vec3 uColor;
uniform float uIsDark;
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2((uMouse.x / uResolution.x) * aspect, uMouse.y / uResolution.y);
  vec2 toM = p - m;
  float dist = length(toM);
  vec2 dir = toM / max(dist, 1e-4);
  float radius = 0.22;
  float dip = 0.0; // deformación circular desactivada: solo revelado cerca del cursor
  float warpedDist = dist * (1.0 - dip * 0.5);
  float scale = 44.0;
  vec2 coord = (m + dir * warpedDist) * scale;
  vec2 gv = abs(fract(coord) - 0.5);
  vec2 edge = 0.5 - gv;
  float lwCell = 0.01;
  vec2 aa = fwidth(coord) * 0.0001;
  vec2 lines = 1.0 - smoothstep(lwCell - aa, lwCell + aa, edge);
  // Solo puntos de intersección en ambos temas (lineGrid eliminado en light).
  float dotGrid = lines.x * lines.y;
  float revealRadius = mix(0.16, 0.10, uIsDark);
  float sigma = revealRadius * 0.5;
  float reveal = exp(-(dist * dist) / (2.0 * sigma * sigma)) * uHover;
  // Modo oscuro: los puntos crecen cerca del cursor. Claro: puntos estáticos.
  float lwDot = mix(lwCell, 0.03, reveal * uIsDark);
  vec2 linesDot = 1.0 - smoothstep(lwDot - aa, lwDot + aa, edge);
  float dotBig = linesDot.x * linesDot.y;
  float gridLight = dotGrid;
  float gridDark = mix(dotGrid, dotBig, reveal);
  float grid = mix(gridLight, gridDark, uIsDark);
  float shade = 1.0 - dip * 0.35;
  float rim = (1.0 - smoothstep(0.0, 0.045, abs(dist - radius * 0.6))) * dip * 0.55;
  float ring = (1.0 - smoothstep(0.0, 0.03, abs(dist - radius))) * uHover * 0.22;
  float infl = dip;
  float glow = (infl * 0.18 + rim + ring) * 0.0;
  float radial = mix(0.5, 1.0, reveal);
  gl_FragColor = vec4(uColor, (uBaseA + glow) * grid * shade * radial);
}`;
