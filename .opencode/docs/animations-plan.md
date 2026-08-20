# Plan de animaciones, movimiento y fondos — Portfolio

> Documento de diseño/planificación del feature de motion design.
> Estado: **fase de documentación** (sin implementación). Orquestado por
> `animation-orchestrator` con aportes de `ux-motion-expert`,
> `animation-reviewer`, `animation-evaluator` y `motion-perf-a11y`.

## 1. Contexto y lenguaje base

Portfolio one-page: React 18 + Vite + Tailwind + Swiper, estilo glassmorphism,
paleta brand índigo/violeta, modo oscuro (`dark`). Animaciones actuales:

- `GradientBackground.jsx`: 2 blobs con `animate-float-slow` / `float-fast`
  (`blur` grande, opacidad baja).
- `Reveal.jsx` + `useReveal.js`: entrada por IntersectionObserver,
  `opacity 0→1` + `translateY(6→0)`, 700 ms `ease-out`.
- `Hero.jsx`: `AnimatedItem` reimplementa lo mismo con `setTimeout` (duplicación).
- Hover sutiles (`scale-105`, `translate-y`), `shadow-glow` de marca.
- `ProjectsCarousel.jsx`: Swiper con `autoplay` + `loop`.
- `index.css`: guard global CSS de `prefers-reduced-motion` (solo cubre CSS,
  NO las animaciones JS/rAF).

**Lenguaje a conservar:** entradas = `opacity` + `translateY` 700 ms
`ease-out` con `delay` escalonado. Loops = `ease-in-out` lentos. Micro =
300–500 ms, `scale`/`translate` pequeños.

## 2. Principios acordados (consenso de los 4 subagentes)

1. **P0 accesibilidad:** todo efecto continuo nace con su contraparte en
   `prefers-reduced-motion`. Se necesita un hook `useReducedMotion` (JS) que
   corte los listeners rAF; el guard CSS actual es solo red de seguridad.
2. **Compos tables only:** animar `transform`/`opacity`. Nunca `width/height/
   top/left/margin` en loops. Gradientes por `filter: hue-rotate` o capas con
   `transform`, no moviendo `background-position`.
3. **rAF para scroll/mouse:** `scroll`, `mousemove` y parallax envueltos en
   `requestAnimationFrame`; escribir solo variables CSS / `transform`.
4. **Sin React por frame:** partículas en canvas, no re-render. Hooks estilo
   `useReveal` devuelven valores/vars CSS; el DOM/CSS queda en el componente.
5. **Una sola capa de fondo y 1–2 micro por sección:** evitar sobrecarga visual
   (fondo animado + glow + tilt + ripple simultáneos = ruido).
6. **Tokens de motion** comunes (duración, curva, delay) para que todo suene a
   la misma "familia".
7. **Sin librerías nuevas:** el stack actual (Tailwind + Swiper + hooks) cubre
   todo. No justifica Framer Motion/GSAP.

## 3. Roadmap priorizado

### P0 — Fundación accesible (hacer primero)
- Hook `useReducedMotion` (`matchMedia`) usado por todos los hooks rAF.
- Asegurar que el guard CSS global neutralice también aurora, glow, parallax,
  tilt, typewriter, count-up, ripple.
- Arreglos estructurales previos a otras features:
  - `App.jsx:16` `overflow-hidden` **bloquea `sticky`** → usar barra de progreso
    `fixed`, o mover overflow a subcontenedor.
  - `GradientBackground.jsx` `absolute inset-0 -z-10` solo cubre el primer
    viewport → fondo de página completa debe ser `fixed` o wrapper full-height.
  - `useReveal.js`: `options` se recrea por render → constante estable o
    quitar de deps.
  - Unificar `Hero` para usar `Reveal` (eliminar `AnimatedItem` duplicado).

### P1 — Mayor ROI, bajo riesgo (aprobar)
- **Diversificar `Reveal`** con prop `variant`:
  - skills → `slide-left` (`translateX(-16→0)` + base)
  - proyectos → `zoom-in` (`scale 0.96→1`)
  - about → `blur-in` (`blur(8px)→0`)
  - Conservar `translateY`+`opacity` 700 ms `ease-out` como base común.
- **Barra de progreso de lectura**: `fixed top-0`, 2–3 px, color brand, lineal
  al scroll (rAF), `aria-hidden`. Aparece tras el Hero.
- **Scroll-driven fade-out del Hero**: opacidad + `translateY` con clamp, inicia
  ~30% del viewport, lerp suave (o `animation-timeline: scroll()` con fallback).
- **Transiciones suaves entre secciones**: reusar 500 ms `ease-out` existente.

### P2 — Micro-interacciones selectivas (aprobar con ajustes)
- **Glow radial que sigue el cursor** dentro de tarjetas (`--x/--y` en
  `pointermove`, lerp ~120 ms, brand ≤0.15, `pointer-events-none`). Reemplaza
  al ripple como lenguaje de feedback. *Alto deleite, medio esfuerzo.*
- **Conteo animado de stats** (`+6`, `+3`, `24`): 800–1200 ms `ease-out`,
  disparado en viewport, ancho reservado (sin CLS). One-shot con rAF.
- **Timeline que se "dibuja"**: línea `scaleY 0→1` 600 ms `ease-out` al entrar
  la sección (no atada a scroll fino); nodos `pulse` 1.5–2 s tras aparecer.
- **Parallax Hero**: foto y blobs en capas distintas, factor 0.1–0.2, lineal al
  scroll, solo en Hero, desactivado en móvil/touch.

### P3 — Fondo (contenido / restringido)
- Solo **aurora reactiva a scroll** (segundo layer lento sobre blobs, mapeado
  con lerp 0.05–0.1, desplazamiento ≤40 px, parallax, no rebote) **+ gradientes
  animados sutiles** (oscilación acotada índigo↔violeta ±20–25°, ciclo 24–30 s).
- **Descartar** partículas/grid animado (riesgo de ruido + coste) y grain
  animado. *Noise/grain estático* permitido solo si es ≤5% opacidad y sin
  flicker (quick win opcional, no prioritario).
- Todo gated por reduced-motion; pausar fuera de viewport (`IntersectionObserver`).

### P4 — Opcionales / bajo prioridad
- **Tilt 3D** en tarjetas: solo interior de `<article>` (no `SwiperSlide`),
  ángulo ≤4–6°, desactivar en drag de Swiper, touch y reduced-motion.
- **Magnetismo CTA**: solo en `hover` (nunca tracking continuo ni en foco),
  desplazamiento ≤4–8 px, spring 200–300 ms.
- **Ripple hover**: preferir glow; si se hace, tenue en brand, 250 ms.
- **Typewriter** en headline: solo fragmento corto, texto real en DOM con
  `aria`, cursor con `opacity pulse` (no on/off), fallback instantáneo en
  reduced-motion. Baja prioridad por riesgo a11y/CLS.

## 4. Dónde declarar cada animación (consistencia de stack)

- **Keyframes globales reutilizables** (float, pulse, gradient, grain, shine,
  ripple): `tailwind.config.js` (`keyframes` + `animation`).
- **Variantes Reveal**: extender `Reveal.jsx` con prop `variant`; mapear a
  clases en el componente. Unificar `Hero` para usarlo.
- **Valores por scroll/puntero** (progress, parallax, `--x/--y` glow, tilt,
  count-up, typewriter, magnetic, hero fade): hooks (`useScrollProgress`,
  `useSpotlight`, `useTilt`, `useCountUp`, `useTypewriter`, `useMagnetic`,
  `useParallax`, `useReducedMotion`) que devuelven vars CSS.
- **Decoración one-off** (timeline draw, ripple, aurora): inline en el
  componente + keyframes de config si se reusan.
- **Fondo de página** (aurora/grid/grain/parallax): única casa =
  `GradientBackground.jsx` (extender, no tocar `App`).

## 5. Checklist de aceptación (a11y / rendimiento)

- [ ] `prefers-reduced-motion` apaga blobs, aurora, glow, parallax, tilt,
      typewriter, count-up, ripple y reveal (JS + CSS).
- [ ] Sin flashes > 3/seg (WCAG 2.3.1); glow no parpadea.
- [ ] `:focus-visible` siempre visible; tilt/magnetismo no lo interceptan ni
      rompen hit-area de clic.
- [ ] Efectos de puntero tienen equivalente estático (teclado/lector).
- [ ] `mousemove`/`scroll` envueltos en `rAF`; `will-change` solo en hover
      activo y se quita al salir.
- [ ] Partículas (si alguna) en canvas, no React; blur/glow limitados a zonas
      pequeñas; medir paint/composite en DevTools antes de mergear.
- [ ] Toda animación con color tiene contraparte `dark:`.
- [ ] Animaciones fuera de viewport se pausan (`IntersectionObserver` /
      `visibilitychange`).

## 6. Anti-goals

- No introducir Framer Motion / GSAP / otras librerías de animación.
- No animar propiedades no compositables en loops.
- No sumar fondo animado + glow + tilt + ripple simultáneamente.
- No hacer typewriter que retrase la percepción de carga ni rompa SR/SEO.
