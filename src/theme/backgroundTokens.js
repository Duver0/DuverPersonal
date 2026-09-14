/**
 * Única fuente de verdad para fondos ambientales — variante light-first "papel cálido con ecos".
 * Toda capa de fondo (gradiente / grid) debe leer de aquí. No duplicar
 * valores de color, blur, alpha o escala en componentes.
 *
 * Lenguaje de movimiento/color coherente con Hero + cards:
 * - Hero: `from-brand-700 via-brand-600 to-violet-600` → el fondo responde con
 *   ecos apagados de brand (arriba) y violeta (abajo en dark).
 * - Skills: `from-brand-500/20` / `from-amber-400/20` / `from-emerald-400/20`
 *   → los 3 acentos reales del sistema reaparecen como manchas al 10-40%,
 *   nunca saturados, para que el fondo "dialogue" sin competir con los CTAs.
 * - Stats: `text-brand-600 dark:text-brand-400` → el grid dark usa tinte brand
 *   en vez de gris puro para resonar con los números.
 *
 * Por qué se abandona el teal (teal-100/30 + teal-950/20):
 * - Era un 4º idioma cromático que no existe en Hero/cards/stats: generaba
 *   disonancia (el fondo hablaba "salvia tech", el contenido "índigo+miel").
 * - Se sustituye por ámbar (eco skill Backend) en light y violeta (eco Hero)
 *   en dark, más esmeralda apagado como 3ª mancha mínima.
 *
 * Cómo cambiar a otra variante en 1 línea: edita solo el campo `blob` del
 * objeto en BLOBS (ej. cambia `bg-amber-100/40` por `bg-emerald-100/30` para
 * un acento más salvia). No toques GradientLayer, App.jsx ni useTheme.js.
 */

/** Convierte "#rrggbb" (o "#rgb") a vec3 [r, g, b] en rango 0-1 para WebGL. */
export const hexToVec3 = (hex) => {
  const clean = String(hex).replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num) || full.length !== 6) return [0, 0, 0];
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
};

/**
 * Light-first "papel cálido con ecos": 3 manchas max, sin hue-rotate.
 * - Mancha 1 (eco Hero brand): light bg-brand-200/30 blur-130 / dark bg-brand-600/20 blur-140.
 *   Resonancia directa con `via-brand-600` del Hero: el oscuro se siente como
 *   reflejo apagado del Hero, el claro como halo editorial legible.
 * - Mancha 2 (eco cálido / violeta): light bg-amber-100/40 blur-120 / dark bg-violet-600/15 blur-130.
 *   En light cita el gradient `from-amber-400/20` de la skill Backend (miel editorial);
 *   en dark cita el `to-violet-600` del Hero (cierre premium del degradado).
 * - Mancha 3 (la más pequeña y apagada, eco Data): light bg-emerald-100/30 blur-110
 *   / dark bg-amber-500/10 blur-120. Cita `from-emerald-400/20` (Automation & Data)
 *   en light y aporta brasa miel mínima en dark. Nunca compite: es 2/3 del tamaño.
 * Opacidad percibida: brand-200 (#C7D2FE) al 30% sobre papel #FAFAF9 se lee como
 * velo frío sutil (~10% efectivo); amber-100 (#FEF3C7) al 40% como calidez papel.
 * En dark sobre negro puro #000000, los 3 blobs quedan a /5: con variant
 * subtle (~0.8 opacidad) son casi invisibles, solo halo mínimo sin teñir.
 * `parallax` es el multiplicador aplicado sobre PARALLAX.factor * scrollY.
 */
export const BLOBS = [
  {
    id: 'brand',
    wrapper: 'absolute right-[-60px] top-[-100px]',
    size: 'h-96 w-96',
    blob: 'bg-brand-200/30 blur-[130px] dark:bg-brand-400/5 dark:blur-[140px]',
    parallax: -0.4,
  },
  {
    id: 'warm',
    wrapper: 'absolute bottom-16 left-[-80px]',
    size: 'h-80 w-80',
    blob: 'bg-amber-100/40 blur-[120px] dark:bg-amber-300/5 dark:blur-[130px]',
    parallax: 0.25,
  },
  {
    id: 'ember',
    wrapper: 'absolute left-[30%] top-[38%]',
    size: 'h-64 w-64',
    blob: 'bg-emerald-100/30 blur-[110px] dark:bg-fuchsia-300/5 dark:blur-[120px]',
    parallax: -0.15,
  },
];

/**
 * Base — DARK negro puro #000000 (única 000000):
 * - light: #FAFAF9 (stone-100 papel cálido) — `bg-[#FAFAF9]` (intacto).
 * - dark: #000000 — unificado con App.jsx `dark:bg-black` e
 *   `index.css html.dark body`. Sin #471F52 / #1A0A33 / #28104d en paralelo.
 */
export const BASE = {
  light: { hex: '#FAFAF9', tailwind: 'stone-100', class: 'bg-[#FAFAF9]' },
  dark: { hex: '#000000', tailwind: 'black', class: 'dark:bg-black' },
};

/**
 * Grid interactivo: puntos cálidos apagados en light, gris neutro mínimo en dark.
 * - light (stone-brand): stone-500 #78716C [0.47, 0.44, 0.42], alpha 0.08.
 *   Cálido editorial, no compite con dots `bg-brand-500` de las skills.
 * - dark (gris neutro sobre #000000): slate-400 #94A3B8 [0.58, 0.64, 0.72],
 *   alpha 0.07. Neutro para no teñir el negro puro; con variant subtle
 *   (~0.7 opacidad) queda ca000000isible, solo textura mínima al hover.
 */
export const GRID = {
  scale: 44,
  revealRadius: { light: 0.16, dark: 0.1 },
  light: {
    vec3: [0.47, 0.44, 0.42],
    alpha: 0.08,
    css: 'rgba(120,113,108,0.08)',
    revealRadius: 0.16,
  },
  dark: {
    vec3: [0.58, 0.64, 0.72],
    alpha: 0.07,
    css: 'rgba(148,163,184,0.07)',
    revealRadius: 0.1,
  },
};

/** Parallax sutil unificado para capas de fondo. */
export const PARALLAX = { factor: 0.06 };
