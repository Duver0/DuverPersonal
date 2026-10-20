# Reglas de diseño de la casa — DuverPersonal

Documento **vinculante** para todo agente de diseño del repositorio (humanos incluidos). Define la identidad visual real del portfolio y las decisiones que **no** se negocian.

> **Regla de oro:** cuando una skill de terceros contradiga este documento, **gana este documento**. No todas las recomendaciones de una skill aplican a este proyecto.

> **Cambio de identidad (2026-10-16).** Este documento describía la identidad índigo/violeta original. El usuario **aprobó explícitamente** una identidad nueva —old money / editorial— y el rediseño completo ya está implementado. §1, §2, §3 y §5 se reescribieron en consecuencia: **lo que aquí aparece es la identidad vigente**. La especificación de arte vinculante es `.opencode/docs/design-direction.md` («name-as-monument», seed 686337370, 650 líneas) y **manda sobre cualquier preferencia estética de una skill**.

---

## 1. Contexto técnico real

Hechos verificados del repositorio (no supuestos):

- **Stack:** React 18 + Vite 5, JavaScript/JSX plano (sin TypeScript). Single-page, sin router ni state library.
- **Estilos:** TailwindCSS 3.4. La página se compone en `src/App.jsx` con **8 secciones dentro de `<main>`** — `Inicio`, `Prologo`, `Cifras`, `Disciplinas`, `Trayectoria`, `Archivo`, `SobreMi` y `Contacto` — más `PlacaFinal` (`<footer>`, noveno bloque, sin ancla del índice), `SectionNav` y `ThemeToggle`.
- **Capa de primitivas:** `src/components/ui/**` (`Shell`, `Section`, `Surface`, `Type` → `Monument`/`Display`/`Lead`/`Body`/`Nano`, `Action`, `Icon`, `Reveal`, `tones`). Las secciones **consumen** primitivas; no inventan estilos propios.
- **Gestor de paquetes:** **Bun** (`bun@1.1.21` declarado; el entorno tiene 1.3.2). npm funciona pero Bun es el canónico.
- **Despliegue:** **GitHub Pages** con `base` = `/DuverPersonal/` (vía `VITE_BASE_PATH`, ver `vite.config.js` y `bun run deploy`).
- **Dependencias instaladas:** solo `react`, `react-dom`, `swiper`. **GSAP, Framer Motion y similares NO están instalados.**
  - `swiper` sigue declarado en `package.json` pero **ya no se usa**: no hay importadores en `src/` y su CSS se retiró de `src/index.css`. Se conserva por decisión explícita del usuario. **No lo "revivas"** ni reintroduzcas `swiper/css` sin aprobación.
- **Fuentes:** **autoalojadas** en `public/fonts/` (woff2 variables, licencia OFL). **Cero CDNs de fuentes o de iconos:** los iconos son SVG en línea (`src/components/ui/Icon.jsx`). La página no hace **ninguna** petición externa de runtime.
- **Contenido:** los hechos viven en `src/content/profile.js`; el manifiesto de fotos de archivo y sus créditos, en `src/content/archivo.js`; `PROJECTS` viene de `src/data/projects.json`, que es **generado** por `scripts/sync-projects.js` (no editar a mano).

---

## 2. Identidad visual (tokens reales)

Fuente de verdad cromática y tipográfica: **`src/index.css`** (`:root` y `.dark`). `tailwind.config.js` **sólo expone esas variables como clases**; no guarda hex. Los tonos (fondo + tinta como **par inseparable**) viven en `src/components/ui/tones.js`. **No se inventan tokens, ni valores, ni fuentes.**

### 2.1 Color — «paper-grey-brass»

| Token | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `--ground` | `#e8e8e3` | `#14140f` | campo por defecto: papel prensa |
| `--surface` | `#dcdcd6` | `#1f1f19` | un escalón más profundo: barras, filas alternas |
| `--ink` | `#181715` | `#ecebe4` | tinta plena |
| `--muted` | `#5b5a54` | `#a3a196` | tinta apagada (pies, créditos, folios) |
| `--accent` (latón) | `#bfb21a` | `#cfc253` | **sólo relleno de UI** |
| `--accent-ink` | `#181715` | `#14140f` | tinta sobre latón |
| `--field` / `--field-ink` / `--field-muted` | `#181715` / `#e8e8e3` / `#a9a79c` | `#23231c` / `#ecebe4` / `#a3a196` | el campo volteado |
| `--focus` | `#181715` | `#ecebe4` | anillo de foco: 2 px, offset 2 px |

Reglas de color:

- **El latón nunca escribe sobre papel** (1.78:1, ilegible). Es relleno, siempre con `--accent-ink` encima (8.2:1).
- Contraste mínimo medido del sitio: **5.02:1 en claro y 6.09:1 en oscuro**. Nadie baja de 4.5:1 en texto corrido.
- Los tokens son `var(<hex>)`, así que **no admiten modificador de opacidad** de Tailwind (`bg-ground/50` no existe): la transparencia se aplica a nivel de elemento con `opacity`.
- **No hay gradientes, sombras, radios ni superficies glass.** No son "una decisión de estilo pendiente": están fuera de la identidad. Única excepción, cerrada: el **disco de 44 px** de `Contacto` (`rounded-full`, tap target del enlace de correo) y el **pulgar del scrollbar** (2 px). Cualquier otro radio es defecto.

### 2.2 Tipografía

- **Display:** **Bodoni Moda** (didona, OFL, autoalojada, variable `wght 400–900`). **Texto:** **Inter** (autoalojada, ya era la fuente de texto). **Máximo dos familias.**
- Respaldo métrico: `Bodoni Moda Fallback` (Georgia local, `size-adjust: 96 %`) en la pila `fontFamily.display`, para que la portada no salte mientras la variable carga.
- **Escala de cinco escalones y ni uno más** (todos `clamp()`, válidos a cualquier ancho):

| Token | Rango | Uso |
| --- | --- | --- |
| `--t-nano` | 13,0 → 14,0 px | folios, créditos, metadatos |
| `--t-body` | 17,0 → 20,0 px | texto corrido |
| `--t-lead` | 22,0 → 28,0 px | entradillas, nombres de entrada del Archivo |
| `--t-head` | 30,0 → 44,0 px | cabeceras de sección |
| `--t-monument` | 56,0 → 190,0 px | **reservado**: el nombre de la portada y el nombre completo de la Placa final (sin recorte) |

- **Techo de caja, no sexto escalón.** A partir de `1024px`, la portada y la Placa final consumen `min(var(--t-monument), 10.2vw)` (clase `.monumento-portada`, `src/index.css`). Es el mismo token con un tope de caja: evita que el nombre desborde su columna y garantiza que la Placa **nunca sea mayor** que la portada. Por debajo de 1024 no se aplica (el token manda). Ese `10.2vw` **no es una excepción a la escala**: si aparece un sexto tamaño medido, es defecto.
- Los componentes **consumen las variables**: nadie escribe `font-size` ni un tamaño fuera de esta tabla.
- Titulares: **≤2 líneas** a 1440 / 768 / 390. Medida de párrafo sana: 45–75 caracteres.

### 2.3 Rejilla y ritmo

`--shell-max` `clamp(1240px, 80vw, 1600px)` (1240 a 1440, 1536 a 1920) · `--shell-gap` 24 px · `--pad-x` 20 / 24 / 32 px (móvil / tablet / escritorio) · `--space-section` 128 → 192 px, con un escalón a **144–160 px desde 1600 px** · `--space-block` 28 → 56 px.

### 2.4 Movimiento

`--dur-press` 140 ms · `--dur-hover` 180 ms · `--dur-enter` 620 ms · `--dur-fade` 1600 ms · `--stagger` 70 ms · `--rise` 24 px · `--ease-out` · `--ease-inout`.

- **Firma del sitio: una.** Entradas por sección `opacity` + `translate` (16–32 px, una sola vez, escalonadas 60–90 ms), feedback de controles, y el crossfade de archivo de la portada.
- Todo lo que se mueve lee estos tokens; nadie escribe una duración a mano.

### 2.5 Campo de papel y tema

- El fondo es **un campo de papel**: `.field-grain` (SVG `data:` con `feTurbulence`, `aria-hidden="true"`, fijo, sin red y sin movimiento). **No hay blobs, rejilla WebGL, canvas ni parallax.** `src/theme/backgroundTokens.js` quedó obsoleto y se retiró.
- El **cambio de campo por sección** se declara con los cuatro tonos (`ground` / `surface` / `field` / `accent`) de `src/components/ui/tones.js`, y cada tono sobrescribe `--focus`.
- **Dark mode por clase:** `darkMode: 'class'` en Tailwind; `src/hooks/useTheme.js` pone/quita la clase `dark` en `<html>`. El `ThemeToggle` **se conserva**. El oscuro no es "negro con neón": es el mismo catálogo en una sala de lectura de noche.
- El **índice fijo** (`SectionNav`) se retira con `visibility: hidden` cuando cruza una banda de latón (la de «Escríbeme»): la tinta sobre latón está a **1,4–3,2:1** y no se lee. Se oculta con `invisible`, **nunca con `display:none`** —eso colapsa su geometría y produce parpadeo (64 alternancias medidas).

---

## 3. Reglas innegociables

1. **`prefers-reduced-motion` es obligatorio.**
   - Hay un guard global en `src/index.css` (`@media (prefers-reduced-motion: reduce)`) que corta duraciones y apaga animaciones; su lista de clases debe cubrir **las animaciones que existen** (nombrar clases inexistentes y olvidar una real es un bug ya cometido una vez).
   - El hook `src/hooks/useReducedMotion.js` lo consulta **la portada** (`src/components/Inicio.jsx`), que es el único movimiento que no se puede resolver sólo con CSS (el crossfade de fotos). Todo lo demás —`Reveal`, feedback de controles, hover— lo corta el **guard global de CSS**. Un movimiento nuevo que necesite JS **debe** consultar el hook.
   - Estado verificado del sitio: con la preferencia activa, **0 elementos animados, 4 imágenes montadas y 0 contenido oculto**. Que siga siendo así es parte de "terminado".
2. **No se inventan tokens, fuentes ni paletas.** Todo valor cromático y tipográfico sale de `src/index.css` (§2) y de `tailwind.config.js`. Si falta un valor, se pide aprobación; no se improvisa.
3. **No se agregan dependencias sin aprobación explícita del usuario.** En particular **GSAP**, Framer Motion, librerías de iconos, CDNs de fuentes, servicios externos de captura de imágenes (tipo mShots) o cualquier cosa que añada una petición de runtime. Si una skill las asume, se **adaptan** a CSS/Tailwind + hooks propios.
4. **La identidad no se destruye por un linter, y el linter tampoco se complace.**
   - Con la identidad vigente, `gradient`, `shadow`, `glass`, `hairline`, `micro-label`, `palette-purple` y `numbering` deben dar **0**: si aparecen, son **defectos reales**, no decisiones de la casa.
   - Lo único que esta casa **sí** defiende frente al linter está enumerado, cerrado, en §5.3. Todo lo demás que marque el gate se arregla.
5. **Se conserva la funcionalidad:** tema claro/oscuro y su `ThemeToggle`, el **filtro del Archivo** (live thing: fichas, conteos, tiradas), los **anclajes del índice** (ni un ancla rota ni una sección sin ancla), accesibilidad (foco visible en todos los controles, `alt`, semántica, tap targets ≥24 px con objetivo 44) y layout responsive. Las **tiradas del Archivo** son la única paginación del sitio: el carousel Swiper ya no existe.
6. **La salida de las skills no se commitea.** Los artefactos de trabajo en **`.taste-skill/`** (capturas, direcciones dibujadas, assets descargados, sondas) son efímeros. **Ya está dentro de `.gitignore`** (verificado); no hay que volver a añadirlo. `dist/` tampoco se commitea.
7. **Material visual:** sólo **fotos propias** o de **dominio público / CC0**, con **crédito en el pie** y en el manifiesto (`src/content/archivo.js`). **Nunca** se atribuye material de archivo a Duver. **Prohibidos**: GIF animado (anima sin poder respetar `prefers-reduced-motion`), capturas falsas de proyectos, mockups inventados y stock genérico. Los 24 proyectos se representan como **placas tipográficas de índice**; el campo `image` de `projects.json` (mShots) **no se renderiza**.
8. **No se tocan** `src/data/projects.json` (generado), `CLAUDE.md`, `AGENTS.md` ni la configuración de despliegue (`.github/workflows/`, `bun run deploy`). **`.gitignore` tampoco** se modifica sin aprobación explícita; su contenido actual ya cubre `.taste-skill/` y `dist/`.

---

## 4. Skills disponibles y su rol

Todas viven en `.opencode/skills/<id>/SKILL.md` y son **autodescubiertas** por OpenCode.

| Skill | Rol en este repo |
| --- | --- |
| `design-taste-frontend` | Criterio maestro anti-slop y de art direction. Trae el gate (`scripts/lint.mjs`, `scripts/inspect.mjs`) y el sorteo de direcciones (`scripts/draw.mjs`). |
| `high-end-visual-design` | Reglas de acabado "de agencia" (tipos, espaciado, sombras, tarjetas, animación). |
| `gpt-taste` | Dirección UX/UI avanzada, estructura AIDA, variación de layout, bento, tipografía editorial. |
| `redesign-existing-projects` | Metodología de auditoría + upgrade sobre UI existente. |
| `minimalist-ui` | Estética editorial, bento plano. Alineada en "sin gradientes ni sombras pesadas". |
| `industrial-brutalist-ui` | Estética mecánica/swiss-military para vistas densas. |
| `stitch-design-taste` | Design system semántico anti-genérico. |
| `imagegen-frontend-web` | Referencias de secciones de landing (una imagen por sección). **Referencias, no producto.** |
| `imagegen-frontend-mobile` | Referencias de pantallas y flujos móviles. **Referencias, no producto.** |
| `brandkit` | Tableros de identidad, sistemas de logo, decks de marca. **Referencias, no producto.** |
| `image-to-code` | Puente de referencia visual a implementación. |
| `full-output-enforcement` | Obliga a salida completa y sin atajos (usado por auditoría). |
| `impeccable` | Design director de alto nivel: `shape`/`craft` (construir), `critique`/`audit` (evaluar), `polish`/`bolder`/`quieter`/`distill` (refinar). Aplicada por dirección, rediseño y auditoría. |

---

## 5. Conflictos conocidos con las skills

Estos choques son **reales** y esperables. La resolución es siempre la misma: **este documento gana**.

### 5.1 `gpt-taste` y `high-end-visual-design` asumen GSAP

- **Conflicto:** ambas describen ScrollTrigger, pinning, scrubbing y timelines de **GSAP**.
- **Realidad:** **GSAP no está instalado** (solo `react`, `react-dom` y un `swiper` sin uso).
- **Resolución:** traduce esos patrones a **CSS + Tailwind + hooks propios** (`useReveal`, `useReducedMotion`). **No instales GSAP** sin aprobación explícita.

### 5.2 `stitch-design-taste` y `high-end-visual-design` empujan micro-movimiento perpetuo

- **Conflicto:** promueven animaciones continuas/ambientales en todo momento.
- **Realidad:** `prefers-reduced-motion` es obligatorio y la identidad no tiene ni un elemento animándose de forma perpetua.
- **Resolución:** ningún movimiento perpetuo. Todo movimiento es finito, disparado por entrada o interacción, y apagado por el guard.

### 5.3 Reglas del linter que esta casa **sí** defiende (lista cerrada)

Reglas de `scripts/lib/rules.mjs` que pueden quedar en WARN —y, en **un solo caso acotado**, en FAIL— sin que sean defecto. **Cualquier otro FAIL/WARN se arregla.**

| Regla del linter | Nivel | Por qué se defiende |
| --- | --- | --- |
| `default-font` | WARN | **Inter es la fuente de texto real**, autoalojada y elegida (no un fallback). La display sí es Bodoni Moda. |
| `palette-cream` | WARN | El campo es un **stone de croma muy baja** (`#e8e8e3`, saturación ≈2 %), que es literalmente el remedio que la propia regla propone ("si quieres calidez, toma un stone o un hueso de croma baja, **no un crema amarillo**"). El oscuro es el mismo catálogo en penumbra. **No hay terracota ni `palette-claude`**, y el acento es latón, no óxido. |
| `no-footage` | WARN | La dirección no pide vídeo: el campo visual son **6 fotos reales de archivo** con crédito. |
| `em-dash` | WARN | Los em-dash que quedan están en **datos/copy legítimos** (periodos de empleo, textos). No son adorno tipográfico. |
| `statement-length` | WARN | Sólo defendible **si el titular mide ≤2 líneas** a 1440 / 768 / 390. Si mide 3, es defecto. |
| `pinned-over-picture` | WARN | El concepto de §8.6 (título fijado, el retrato pasa) es deliberado. **Sólo defendible si la banda no tapa el retrato**: intersección 0 medida cada 20 px de scroll en 320 / 390 / 768 / 1440. Si lo tapa, es defecto. |
| `mixed-font-headline` | WARN | El nodo marcado es `#disciplinas-frase`: un `Lead` de **prosa** (`<p>`), no un titular, donde la enumeración de herramientas va un escalón por debajo en Inter. **Sólo defendible si el nodo no es `h1–h6`** y la mezcla de familias es la jerarquía de §2.2 (display para la frase, Inter para la enumeración). Si marca un titular real, es defecto. |
| `eyebrow` | **FAIL (sólo a 1024)** | Único caso: a **1024 px** el pie de la lámina de Sobre mí queda a 72 px del primer rótulo de Contacto y el detector lo lee como kicker. **Sólo defendible si** el nodo marcado es el **pie de una `<figure>`/lámina** y el titular siguiente **pertenece a la sección siguiente**: el detector no conoce los límites de `<section>` y su ventana llega hasta 72–140 px. A 1440, 1920 y 390 da 0 y en móvil no existe. Si el pie y el titular están en la **misma** sección, es defecto. **Mejora estructural pendiente** (no bloqueante): subir el pie dentro del montaje, como rótulo de lámina sobre la foto, o abrir aire entre Sobre mí y Contacto. |

- **Estado del gate al cierre del rediseño (2026-10-20):** `lint.mjs src` y `lint.mjs .` **0 FAIL**; `inspect.mjs` **0 FAIL** en claro y oscuro a **1920 / 1440 / 768 / 390**. A **1024** queda el `eyebrow` de la fila anterior, y nada más. Los WARN restantes son, exactamente, filas de esta tabla.

- **Procedimiento de auditoría:** cada hallazgo se coteja contra esta tabla. Lo que no esté aquí se reporta como **defecto real** y se arregla; lo que esté aquí se reporta como **defendido**, citando la fila.

### 5.4 `minimalist-ui` / `industrial-brutalist-ui` proponen estéticas y paletas propias

- **Conflicto:** sus paletas (monocroma cálida, utilitaria) y su jerarquía no son la identidad del repo.
- **Resolución:** se toma **solo lo compatible** (jerarquía, composición, ritmo, densidad). **No se importan sus paletas.** Su "sin gradientes ni sombras pesadas" ahora coincide con la casa, pero por decisión propia, no por influencia suya.

### 5.5 `impeccable`

- **Estado:** **mayormente alineada** con la identidad vigente. Su *craft floor* refusa el glass/blur decorativo, el gradient text, los halos de color sin offset y el movimiento perpetuo — todo eso la casa ya no tiene. Su regla de "un solo momento de movimiento" es **compatible y deseable**.
- **Discrepancias que conserva la casa:** el **campo de papel con grano** es deliberado (no es "ruido decorativo": es la superficie); el **latón como relleno de UI** es identidad, no un color de acento arbitrario; y la **escala de cinco escalones** manda sobre cualquier sugerencia de escala alternativa.
- **Gana este documento.**

### 5.6 `design-taste-frontend` trae su propia casa

- **Conflicto:** su `draw.mjs` reparte paletas y tipografías de una biblioteca (en este repo llegó a repartir "Big Shoulders / Public Sans" y una gótica cívica) y su linter tiene su propio criterio de "no slop".
- **Realidad:** usamos su **mecanismo** (sorteo de direcciones, gate, crítica de 14 pases), no su **estética**.
- **Resolución:** cualquier dirección que reparta se **adapta a la identidad de §2**; el gate se interpreta a través de §5.3. Su "suelo de imágenes reales" se cumple con **fotos reales de archivo con crédito**, nunca con capturas inventadas.

### 5.7 `imagegen-*`, `brandkit` e `image-to-code` producen **referencias**

- Generan imágenes de referencia para dirigir la implementación. **No son producto**: no se suben al repo, no se presentan como material de Duver y no sustituyen ni una foto ni un componente real.

---

## 6. Definición de "terminado"

Un cambio de diseño está terminado cuando:

- [ ] Usa **sólo** los tokens de §2 y no agrega fuentes, paletas, dependencias ni peticiones externas.
- [ ] Respeta la escala: **5 tamaños** y ninguno más (el techo `min(var(--t-monument), 10.2vw)` de ≥1024 no cuenta como sexto); `--t-monument` reservado a portada y Placa final, con el nombre de la Placa **completo** y nunca mayor que el de la portada; titulares **≤2 líneas** a 1440 / 768 / 390.
- [ ] `prefers-reduced-motion` verificado **en navegador real** (0 animaciones, 0 contenido oculto, la portada no aterriza en la última foto).
- [ ] Contraste medido **≥4.5:1** en claro y oscuro; tap targets ≥24 px (objetivo 44); **foco visible en todos los controles**.
- [ ] Conserva la funcionalidad: tema y `ThemeToggle`, filtro del Archivo, anclajes del índice, responsive, y resuelve bajo el `base` de GitHub Pages.
- [ ] Pasó por el gate de auditoría (`lint.mjs` + `inspect.mjs`, claro **y** oscuro) y sus hallazgos se cotejaron contra §5.3.
- [ ] No introduce artefactos de `.taste-skill/` ni de `dist/` en el commit.
- [ ] Aplana el "test del extraño": nada que un desconocido notaría como roto (solapes, colas vacías, pantallas al 12 % de ocupación).
