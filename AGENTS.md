# AGENTS.md

Guía breve para agentes que trabajan en este repositorio. (Equivalentes: `CLAUDE.md` para Claude Code.)

## Qué es

Portafolio personal de Duver Betancur: app **React 18 + Vite + TailwindCSS**, una sola página, sin router ni state library. Se despliega en **GitHub Pages**.

## Comandos

Package manager: **Bun** (`bun@1.1.21`). npm funciona, pero Bun es canónico.

- `bun install` — instalar dependencias.
- `bun run dev` — Vite dev server en `http://localhost:5173` (auto-abre).
- `bun run build` — build de producción en `dist/`.
- `bun run preview` — servir `dist/` localmente.
- `bun run deploy` — build con `VITE_BASE_PATH=/DuverPersonal/` y push de `dist/` a `gh-pages`.
- `bun run scripts/sync-projects.js` — regenera `src/data/projects.json` desde la API de GitHub (define `GITHUB_TOKEN` para evitar rate limits).

No hay test runner, linter ni typechecker configurados. JavaScript/JSX plano.

## Arquitectura (mínima)

- Toda la página se compone en `src/App.jsx` con 8 secciones: `Inicio`, `Prologo`, `Cifras`, `Disciplinas`, `Trayectoria`, `Archivo`, `SobreMi` y `PlacaFinal`.
- UI por primitivas: `src/components/ui/**` (`Shell`, `Section`, `Surface`, `Type`, `Action`, `Icon`, `Reveal`, `tones`). Las secciones consumen primitivas en vez de inventar estilos.
- Contenido factual en `src/content/profile.js`; fotos de archivo y sus créditos en `src/content/archivo.js`. Los componentes importan exports nombrados directamente.
- `PROJECTS` viene de `src/data/projects.json`, que es **generado** por `scripts/sync-projects.js` — **no editar a mano**.
- Tema: `src/hooks/useTheme.js` alterna la clase `dark` en `<html>`; Tailwind `darkMode: 'class'`.
- Fondo: campo de papel (`.field-grain`, SVG en `data:`) definido en `src/index.css` (`:root`/`.dark`), que es la **única fuente de verdad cromática y tipográfica**. El acento (latón) es relleno de UI, nunca texto sobre papel.
- Fuentes autoalojadas en `public/fonts/` (Bodoni Moda + Inter, OFL). **Cero CDNs** de fuentes o de iconos: los iconos son SVG en línea.
- Assets: `src/assets/` (empaquetados por Vite, respetan `base`) y `public/` (servidos tal cual).
- Deploy: `vite.config.js` toma `base` de `VITE_BASE_PATH`; GitHub Pages usa `/DuverPersonal/`.

## Convenciones

- **No editar archivos generados** (`src/data/projects.json`) ni configuración de despliegue sin motivo.
- Mantener la coherencia visual con la identidad old money / editorial (paleta `paper-grey-brass`, Bodoni Moda + Inter, campo de papel). Los tokens reales están en `src/index.css`.
- `prefers-reduced-motion` es obligatorio en todo movimiento (ver reglas de diseño).

## Diseño

Antes de tocar UI, lee **`.opencode/docs/design-house-rules.md`** (vinculante): tokens reales, paleta de marca, dark mode, glassmorphism, y las reglas innegociables. En caso de choque entre una skill y ese documento, **gana el documento**.

Agentes de diseño en `.opencode/agents/` (`design-lead` es el principal) y skills autodescubiertas en `.opencode/skills/`. Los artefactos de trabajo de las skills (`.taste-skill/`) son efímeros y no se commitean.
