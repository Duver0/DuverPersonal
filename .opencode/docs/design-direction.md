# Dirección de arte — rediseño total de DuverPersonal

**Estado:** especificación para implementar. No es código.
**Autora:** dirección de arte (subagente). **Fecha:** 2026-10-15.
**Dirección dibujada:** `name-as-monument` · **seed 686337370** · sector `personal-portfolio` · tono `luxury` · 3 redibujos.
**Hoja completa:** `.taste-skill/direction.json` (reproducible con `node .opencode/skills/design-taste-frontend/scripts/draw.mjs --show`).
**Vigencia:** `.opencode/docs/design-house-rules.md` §1, §3 y §6 siguen siendo vinculantes. **§2 (identidad) y §5 (conflictos de identidad) quedan sustituidos por este encargo** (paleta nueva + serif display autoalojada + campo de papel, aprobados por el usuario).

> ### Corrección de la v1 — 2026-10-15 (decisión del usuario, autoritativa)
>
> **Qué decía la v1.** §8.5 (Archivo) especificaba un «muro desigual» de **24 placas de captura** alimentadas por `project.image`, con esta premisa literal: *«capturas reales de los despliegues, servidas por mshots»*, y *«cuentan para el suelo de imágenes reales»*. §12 asumía el riesgo de terceros con mitigaciones de caja (`aspect-ratio` fija, `loading="lazy"`, `onError`).
>
> **Qué se midió** (`design-imagery` descargó y **miró** las 24 imágenes): **24/24** entradas de `src/data/projects.json` dependen de `s.wordpress.com/mshots` y **ninguna imagen de proyecto existe en el repo**. **18/24 son byte-idénticas** — GIF `GIF89a` de 400×300, **8 737 B**, SHA1 `37af25f411ac`, **12 fotogramas: el spinner animado de WordPress**; no son capturas de interfaz. **5/24 son muros de login** (Fit App, Auto Nomina, English Reminder, Ticketera, Photo Group) y **1/24** (DuverPersonal) es este mismo sitio. **0 de 24 comunica un proyecto.** mShots **rate-limita** (HTTP 429 a las ~30 peticiones) y no tiene SLA. Y un **GIF animado corre sin que ninguna media query CSS lo detenga**: **viola `prefers-reduced-motion`**, que es regla innegociable de la casa.
>
> **Qué se decidió.** **Opción A:** cada proyecto es una **placa tipográfica de índice** (nombre, stack, año y tipo, demo y repo) **sin captura**. **Cero imágenes inventadas y ninguna petición a mShots en la ruta de render.** La opción «captura real» compra hoy **1 de 24** y exige Playwright (dependencia nueva, sin aprobar); la opción «material propio» sólo cuenta con `ProfilePhoto.png` (313×313). Ambas quedan aplazadas.
>
> **Qué cambia aquí.** §8.5 reescrita como **pliego de índice**; **§8.9 nueva** con el sistema de imagen; el **recuento de imágenes reales** recalculado (§8.2 y §12); el **GIF animado prohibido** en toda la página (§10); y §2, §5.1, §5.4, §6.2, §7, §8.0, §8.1, §8.2, §8.6, §8.8, §9, §10, §11 y §12 alineadas. **§4 (tipografía) y §5 (color) no cambian de fondo**: en §4 sólo se corrigen **tres filas** de la tabla de asignación (el nombre de cada entrada del pliego se compone a `--t-lead`, para no computar un sexto tamaño) y la frase final de «Anulación consciente», que se apoyaba en el muro; en §5, un comentario de token y una viñeta de reparto cromático. Se marca dónde y por qué.

> **Enmiendas medidas — 2026-10-20 (decisiones del usuario + verificación independiente).** La implementación se midió a 320/390/768/1024/1280/1440/1920/2560, en claro y oscuro. Cinco puntos de esta spec quedaron **corregidos en la práctica** y aquí se registran para que el documento no contradiga lo construido:
>
> 1. **§8.0 — la portada no superpone tinta y foto en escritorio.** La spec pedía el nombre **cruzando** el cuarto superior de la fotografía. A 1920 eso dejaba el nombre ilegible sobre píxeles. La composición vigente: **el nombre sobre papel (columnas 1–7) y una placa fotográfica a sangre por la derecha (8–12)**, con el nombre alineado a la **primera línea base** de la placa. La idea de «el nombre sobre el archivo» **se conserva en móvil**, donde el nombre sí va sobre la foto (y es la composición que el usuario aprobó sin cambios). Criterio medido: **intersección nombre ∩ placa = 0 px** a 1024/1280/1440/1920/2560 en los tres instantes del crossfade; contraste del nombre **14,57:1** claro y **15,46:1** oscuro.
> 2. **§8.0 — la portada se capa y se centra a 1920.** A 2560 quedaban **475 px** de papel entre el nombre y la placa (tres bandas). El contenedor de la portada lleva `mx-auto max-w-[1920px]`: a 2560 el hueco baja a **101,8 px** y la composición se sostiene; **por debajo de 1920 no cambia nada** (mismas cajas de nombre y foto a 1920/1440/1024/768/390).
> 3. **§8.8 — el nombre de la placa final no se recorta.** La spec lo pedía recortado por el pie. El usuario lo rechazó dos veces: **va completo**, en una o dos líneas, con el **mismo techo de caja** que la portada para no invertir la jerarquía (a 1440 la Placa medía 187 px frente a 147 del hero: **6 tamaños**). El campo del `<footer>` **debe cubrir la caja de línea** del nombre (`pb-[0.33em]`): sin eso quedaban 18–63 px de papel y se cortaba la tinta. Criterio: `footer.bottom == scrollHeight ±1 px` en los 8 anchos y `glyphOut = 0`.
> 4. **§8.5 y §9 — ocho entradas por tirada, no doce.** El pliego de índice muestra **8** entradas por tirada → **3 tiradas** (24/8), no 2. Los conteos de las fichas no cambian (Todos 24 · JavaScript 18 · TypeScript 12 · Java 5 · Gherkin 4 · Python 3). Motivo: a 1920, 12 entradas alargaban el Archivo por encima de **dos pantallas** y la sección se leía como un listado infinito.
> 5. **§7 — caja útil y respiración.** `--shell-max` es `clamp(1240px, 80vw, 1600px)` (1536 a 1920, no 1240) y `--space-section` baja a **144–160 px desde 1600** para no acumular 192 + 192 px por sección a 1920. El móvil y la tablet no cambian.

---

## 1. Lectura y argumento

### La lectura, en una línea

Old money aplicado a un ingeniero no es una hacienda: es **el índice de un archivo profesional** — la portada grabada y el pliego de entradas de un catálogo bien impreso, no un folleto de agencia.

### Inventario real (de dónde sale la idea)

Todo verificado en el repo, sin inventar nada:

| Hecho | Dónde está |
| --- | --- |
| Su trabajo **es indexar**: `PPC Indexation · Indexer` en Talent.com | `src/content/profile.js:92-98` |
| Su proyecto destacado **es un índice de certificados** (`Anthropic-certifications`, `featured: true`) | `src/data/projects.json:3-17` |
| **Esta propia página es un índice generado**: 24 repos sincronizados desde la API de GitHub a un JSON | `scripts/sync-projects.js` → `src/data/projects.json` |
| 7 años desde 2019 · 24 lanzamientos · 5 casas (Sofka, Tecnología Jurídica, Talent.com, Emtelco, Fluid Attacks) | `profile.js:5`, `:39-43`, `:74-122` |
| 11 lenguajes distintos en el archivo · 10 proyectos solo-repo · 1 sin stack | medido sobre `projects.json` |
| Medellín, CO · disponible para freelance · CV en PDF | `profile.js:12-13`, `:34-36` |

### Argumento: secciones por *claim* y su prueba

Regla: cada sección existe porque tiene un claim que ninguna otra carga. Lo que no tiene claim, se elimina.

| # | Sección | Claim | Prueba (contenido real) | Veredicto |
| --- | --- | --- | --- | --- |
| 0 | **Inicio** (portada) | Quién es y qué hace. | El nombre; `HERO_PROFILE.headline` (`profile.js:9`); 1 acción (`mailto`) | Se queda |
| 1 | **Prólogo** | En qué consiste su trabajo y cómo trabaja. | `HERO_PROFILE.summary` (`:11`) + ubicación + disponibilidad | Se queda (nueva: hoy no existe) |
| 2 | **Cifras** | La escala del registro. | `STATS` (`:39-43`) | Se queda |
| 3 | **Disciplinas** | Qué sabe hacer, con nombres. | `SKILLS[].items` (`:51-67`) | Se queda (hoy: 3 tarjetas de icono) |
| 4 | **Trayectoria** | Dónde y cuándo lo hizo. | `EXPERIENCE` completo (`:74-122`) | Se queda |
| 5 | **Archivo** | Lo que ha construido, verificable. | `PROJECTS` (24, con demo/repo reales) | Se queda |
| 6 | **Sobre mí** | Cómo trabaja y con qué principios. | párrafo de `AboutSection.jsx:10-12` + `ABOUT_TAGS` (`:72`) | Se queda |
| 7 | **Contacto** | Cómo se le contrata. | `CTA_LINKS` (`:19-37`), LinkedIn, GitHub, CV | Se queda |
| 8 | **Placa final** | El cierre: invitación + el nombre otra vez. | `FooterCTA` (`FooterCTA.jsx:9-31`) | Se queda |

**Se retira del render** (el dato se conserva en `profile.js`, no se borra):
- `HERO_BADGES` (`profile.js:17`): cuatro píldoras con blur; el mismo stack ya vive en Disciplinas y en cada panel de Trayectoria. Sin claim propio.
- `SKILLS[].description` × 3 (`:50`, `:58`, `:66`): prosa genérica («priorizando performance y mantenibilidad») que el pliego de herramientas dice mejor y más corto. **Decisión para el usuario** (ver §11, marcado SAMPLE).
- `SKILLS[].gradient` / `icon` y `CTA_LINKS[].icon` (`fa-*`): son de la identidad retirada.
- `project.problem` / `solution` / `impact` (`ProjectsCarousel.jsx:56-58`): **código muerto**, esos campos no existen en `projects.json`. Se borra el bloque.

Orden final de la página (9 bloques): **Inicio → Prólogo → Cifras → Disciplinas → Trayectoria → Archivo → Sobre mí → Contacto → Placa final.**

---

## 2. Dirección elegida

### Elección entre las dos direcciones que se repartieron

Se repartieron dos (el pool del sector+tono sólo dio dos):

| id | Idea | Veredicto |
| --- | --- | --- |
| `name-as-monument` | El nombre es el titular; se agranda hasta ser arquitectura. | **Elegida** |
| `dark-room` | Un solo campo oscuro de arriba abajo; las cosas se iluminan como en una galería a media luz. | Descartada: exige «un campo oscuro de punta a punta sin bandas de sección», lo que **contradice el encargo aprobado** (campo de papel con cambio de campo por sección). No es una preferencia: es un choque de constraint. |

Por qué `name-as-monument` y no la otra: el índice de un archivo profesional **necesita** portada + pliego, y la portada de un catálogo es el nombre grabado. Además la dirección es la que mejor aguanta la contención: después de la portada la página se vuelve pequeña y ordenada, que es exactamente lo que un ingeniero con 24 repos necesita (jerarquía, no espectáculo).

### Hoja repartida (con los redibujos ya aplicados)

```
seed 686337370 · drawn 2026-10-15 · redraws: 3 · sector personal-portfolio · tone luxury
| Direction    | The name as a monument |
| Hero         | Pinned title over portraits |
| Type         | Big Shoulders / Public Sans  (→ sustituido, ver §4) |
| Colour       | Newsprint and brass          (← redibujado, ver §5) |
| Sections     | intro (Heading captions a panorama) → stats (Quiet figure lines) →
                 list (Giant word, filled bar rows) → work (Giant title, uneven wall) →
                 about (Pinned title, portraits pass) → proof (Names as one sentence) →
                 contact (Address in display rows) → footer (Invitation over a cropped name) |
| Motion       | Scaling wordmark |
| Photographs  | the "Architecture" set, as atmosphere |
```

> **Dos casillas de esta hoja ya no se construyen tal cual.** `work (Giant title, uneven wall)` se resuelve como **pliego de índice sin imágenes** (§8.5): la decisión del usuario está al principio del documento y el «giant title» sigue anulado (§4). Y «the *Architecture* set» se sustituye por el set real de archivo verificado —Medellín 1930, impresos y papelería— descrito en §8.9; la hoja no se redibuja porque el dibujo gobierna tipo, color, hero y movimiento, y ninguno de los cuatro cambia con esto.

### Redibujos: los tres, con su motivo

| Slot | Qué se repartió | Qué salió al redibujar | Motivo (declarable) |
| --- | --- | --- | --- |
| **hero** | `name-under-photograph` (una foto a sangre en el 58 % superior) | `pinned-title-over-portraits` | **Falta el asset.** El blueprint pide una fotografía de ≥1440 px del sujeto. La única que existe es `src/assets/img/ProfilePhoto.png`: **313×313 px, opaca** (medido). A sangre serían 4,6× de ampliación. |
| **type** | `Unbounded / Onest` (dos familias, CDN de Google) | `Big Shoulders / Public Sans` (igual de CDN, gótica cívica) | **Choca con un constraint declarado:** el encargo fija *una* serif display autoalojada en `public/fonts/`, OFL, sin CDN. El segundo reparto vuelve a fallar el mismo constraint, así que **no se redibuja una tercera vez** (sería pesca): se toma la clase que la propia dirección ya permite —`typeClasses` incluye `serif-display` y `serif-light-large` (`library/directions.json:35`)— y se **sustituye sólo la familia**. Detalle en §4. |
| **palette** | `Cool grey, cobalt` (`--accent: #1f2de6`) | **`paper-grey-brass` — «Newsprint and brass»** (`library/palettes.json:64-85`) | El cobalto es lo más opuesto posible a «lujo callado» y el encargo ya trae paleta aprobada. La paleta repartida está **dentro del pool de la propia dirección** (tag `light-neutral`, y la hoja pide `mono-accent`/`two-tone`: «el acento aparece en una sola cosa»). Sobre el suite `#e8e8e3` + `#181715` + latón se aplica **un ajuste medido**: ver §5.2. |

Nota de reparto: los 3 redibujos son los que la hoja final registra (`redraws: 3`). No hay más.

---

## 3. La idea

> **En esta página, el oficio real de Duver —indexar— se convierte en un índice impreso navegable: la portada grabada y el pliego de entradas de su archivo.**

El primer hueco se llena desde su inventario, no desde la categoría: indexar es su trabajo (Talent.com: `profile.js:92`), es su proyecto destacado (`projects.json:3-17`) y es **cómo se construye este sitio** (`scripts/sync-projects.js` genera `projects.json`). El segundo hueco es el dispositivo que pide la dirección: el nombre como monumento + secciones que son entradas de un índice.

**Test del competidor.** Cambia «Duver Betancur» por cualquier otro desarrollador full stack de Medellín:
*«su oficio es indexar, su proyecto destacado es un índice de certificados y su catálogo se genera indexando la API de GitHub»* → **falso para el competidor**. La frase se rompe. La idea es de Duver.
Contra-prueba (lo que sería categoría y no vale): «un desarrollador que hace interfaces estables y monitoreables» → cabe en cualquier portfolio. Descartado.

### El live thing

**Componer el archivo.** El visitante filtra las 24 entradas por lenguaje y las recorre por tiradas, en vivo, sobre datos reales de `projects.json`; y la página entera funciona como **índice navegable**: la entrada que está leyendo se marca en tinta plena y el resto en tinta apagada (índice de margen en ≥1280 px, `Menú` desplegable por debajo). Detalle en §9.

---

## 4. Tipografía

### Familias (máximo 2, se cumple)

| Rol | Familia | Por qué |
| --- | --- | --- |
| **Display / títulos / statements** | **Bodoni Moda** (autoalojada, OFL) | Didona: la letra de la imprenta fina, del billete, de la cartilla grabada. Agnóstica de moda si se usa en un solo peso y a tamaños grandes. Es el «grabado» del índice. |
| **Texto / UI / cifras** | **Inter** (se conserva, se carga como hoy) | Ya es la fuente de texto del repo (`tailwind.config.js:8`, `index.html:15-17`), tiene x-height grande para 13–20 px de pantalla y **cifras tabulares**, que el ledger de Cifras y las fechas necesitan. Conservarla cuesta cero descargas y mantiene el techo de dos familias. |

El par (serif display + grotesca neutra) es el par que la propia biblioteca describe como «la portada de un periódico» (`library/type.json:264`), invertido: aquí la serif manda y la grotesca hace el trabajo práctico.

### Ficheros exactos (autoalojados, OFL, sin CDN)

Descargar a `public/fonts/` (rutas del repo `google/fonts`, verificadas por API):

| Fichero en `public/fonts/` | Origen exacto | Peso | Por qué |
| --- | --- | --- | --- |
| `BodoniModa-Variable.ttf` | `https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/BodoniModa%5Bopsz%2Cwght%5D.ttf` | 162.104 B | Una variable cubre **wght 400–900** y **opsz 6–96** (`METADATA.pb`). |
| `BodoniModa-OFL.txt` | `https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/OFL.txt` | 4.400 B | La OFL exige que la licencia acompañe a la fuente. Se sirve en `public/fonts/`. |

**No se incluye la itálica** (`BodoniModa-Italic[opsz,wght].ttf`, 176.300 B): no hay cursiva en el sistema, y la dirección prohíbe decorar las letras. Un solo fichero, 162 KB.
**No se toca la carga de Inter** (`index.html:15-17`): sigue igual.

```css
/* src/index.css — bloque nuevo */
@font-face {
  font-family: 'Bodoni Moda';
  src: url('/fonts/BodoniModa-Variable.ttf') format('truetype-variations');
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;            /* + <link rel="preload"> en index.html */
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC; /* latin + latin-ext */
}
```

Dos detalles que la fuente exige y que **no** son opcionales:

1. `registry_default_overrides: opsz 11` — el fichero arranca en la instancia óptica de texto. **Cada rol debe fijar `opsz` explícitamente**, o el monumento se dibuja con las formas gruesas del tamaño pequeño.
2. La ruta respeta el `base` de GitHub Pages: usar `/fonts/…` sólo funciona con `VITE_BASE_PATH`; en Vite, importar desde `public/` con la cadena `'fonts/BodoniModa-Variable.ttf'` o pasar por `import.meta.env.BASE_URL`. **Decisión del implementador; no romper el deploy a `/DuverPersonal/`.**

`size-adjust` de reserva para evitar el salto de maqueta en la portada: declarar un `@font-face` de respaldo con `local('Georgia')` y `size-adjust: 96%` mientras carga la variable.

### Escala: **5 tamaños** (hoy hay 9)

Techo duro del encargo: 5 valores computados distintos en la página. Esta escala da exactamente 5 **a cualquier ancho**, porque cada escalón es un `clamp()`.

```css
:root {
  --t-nano:      clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);  /* 13,0 → 14,0 px */
  --t-body:      clamp(1.0625rem, 1rem + 0.25vw, 1.25rem);     /* 17,0 → 20,0 px */
  --t-lead:      clamp(1.375rem, 1.28rem + 0.5vw, 1.75rem);    /* 22,0 → 28,0 px */
  --t-head:      clamp(1.875rem, 1.6rem + 1.2vw, 2.75rem);     /* 30,0 → 44,0 px */
  --t-monument:  clamp(3.5rem, 13vw, 11.875rem);               /* 56,0 → 190,0 px */
}
```

**Asignación por rol (nada se sale de estos cinco):**

| Escalón | Rol | Dónde |
| --- | --- | --- |
| `--t-nano` 13–14 | Pies de placa (stack, año · tipo), créditos, folios, fechas, etiquetas, el índice de margen, la línea viva del filtro, los rótulos de las barras | Derecha de las barras de Trayectoria, pies del pliego, fichas del filtro, créditos, `Menú` |
| `--t-body` 17–20 | Texto corrido y frases. **Nada de texto corrido por debajo de 17 px** (hoy hay cuerpo a 14 px y 19 bloques a 12 px) | Sobre mí, paneles de Trayectoria, filas de Contacto, frase de apoyo de la portada |
| `--t-lead` 22–28 | Statements: el bloque del Prólogo, el enunciado de Disciplinas, la despedida de la placa final **y el nombre de cada entrada del pliego** (§8.5) | Prólogo, Disciplinas, Placa final, entradas del Archivo |
| `--t-head` 30–44 | **Todos** los títulos de sección, y **sólo** ellos (las entradas del pliego van un escalón por debajo) | Cifras, Disciplinas, Trayectoria, Archivo, Sobre mí, invitación final |
| `--t-monument` 56–190 | **Sólo el nombre**: portada y placa final. En la placa, **completo y sin recorte**, con el mismo techo de caja que la portada (`min(var(--t-monument), 10.2vw)` a ≥1024) | Inicio, Placa final |

**Anulación consciente de dos blueprints.** La hoja ordena resolver choques así: **reglas de la casa → la dirección → tipo/paleta → hero → blueprints de sección**. La dirección dice literalmente, en su apartado de composición: *«después de la portada la página es deliberadamente pequeña y tranquila… dos tamaños hacen casi todo el trabajo: el monumento y un tamaño pequeño, con uno medio para los títulos de sección»* (`library/directions.json:28`). Por eso **el «giant word» de `list` y el «giant title» de `work` (72–136 px) se mapean a `--t-head`**: el monumento es el nombre y sólo el nombre. Sin esta decisión la página computa 6 tamaños y vuelve a romper el techo. La riqueza de la página la dan el pliego de índice de Archivo (§8.5), las cinco fotografías de archivo (§8.9) y los dos campos oscuros, no un segundo titular gigante.

### Tracking, leading y medida

| Rol | `opsz` | Tracking | Leading | Medida |
| --- | --- | --- | --- | --- |
| Monumento (caps) | `96` | `-0.005em` (caps de didona piden aire, no apretar) | `0.86` | cada línea dimensionada para llenar la medida |
| Título de sección (`--t-head`) | `40` | `-0.01em`, sentence case | `1.06` | 1–2 líneas, ≤ 30ch |
| Statement (`--t-lead`) | `20` | `-0.01em`, sentence case | `1.25` | **45–62ch** |
| Texto corrido (`--t-body`) | `14` | `0` | `1.55` | **62ch exactos** (`max-width: 62ch`) — hoy el párrafo de Sobre mí corre a **123 caracteres/línea** |
| Nano (`--t-nano`) | `11` | `0.01em` | `1.45` | 40–48ch |

Reglas duras: **titulares ≤ 2 líneas a cualquier ancho**; statements ≤ 3 líneas desktop / 4 en móvil; el nombre nunca se parte en tres. Cifras siempre `font-variant-numeric: tabular-nums`.

**Aritmética del monumento** (el defecto medido: el h1 cae a 4 líneas a 390 px). El nombre se compone **en dos líneas por diseño**, alineadas a la izquierda del pliego, en una sola medida tipográfica:

- 1440 px: `13vw` = 187 px; «BETANCUR» (8 caps × ~0,72 em) ≈ 1077 px dentro de una medida de 1392 px → **cabe, 2 líneas**.
- 390 px: `13vw` = 50,7 px; «BETANCUR» ≈ 292 px dentro de 358 px → **cabe, 2 líneas**.
- El paso de tamaño lo fija la palabra más larga; «DUVER» queda más corto en la misma sangría (título de libro, no párrafo centrado sin criterio).
- **Verificación obligatoria del implementador:** medir con `inspect.mjs` que ninguna línea desborda ni se parte en 3 a 1440/768/390. Si sobra, bajar el techo en pasos de 0,2 vw. **Valor vigente medido: `min(var(--t-monument), 10.2vw)` a ≥1024** (a 1024, 147 px; a 1920 el token ya topa en 190 y el techo no actúa). Por debajo de 1024 manda el token (`13vw`), que es la composición móvil aprobada.

---

## 5. Color

### 5.1 Roles y valores exactos

Se reparte `paper-grey-brass` («Newsprint and brass», `library/palettes.json:64-85`). Su nota: *«papel cálido con tipo casi negro sostiene la página, luego secciones enteras se voltean a casi negro con tipo gris papel; ninguna sección se tiñe. El latón marca un solo detalle por pantalla»*. Es exactamente el registro de imprenta que pide el encargo.

```css
/* CLARO — el pliego de papel */
:root {
  --ground:      #e8e8e3;   /* papel prensa, el campo por defecto */
  --surface:     #dcdcd6;   /* un escalón más profundo: barras, filas, pliego del Archivo */
  --ink:         #181715;   /* tinta plena */
  --muted:       #5b5a54;   /* tinta apagada (pie de placa, créditos) */
  --accent:      #bfb21a;   /* latón: SÓLO relleno */
  --accent-ink:  #181715;   /* tinta sobre latón */
  --field:       #181715;   /* el campo volteado (Disciplinas, Placa final) */
  --field-ink:   #e8e8e3;
  --field-muted: #a9a79c;
  --focus:       #181715;   /* anillo de foco = tinta, 2px, offset 2px */
}

/* OSCURO — el mismo catálogo en la sala de lectura de noche */
.dark {
  --ground:      #14140f;
  --surface:     #1f1f19;
  --ink:         #ecebe4;
  --muted:       #a3a196;
  --accent:      #cfc253;
  --accent-ink:  #14140f;
  --field:       #23231c;   /* en oscuro el campo NO se invierte a papel: sube un escalón */
  --field-ink:   #ecebe4;
  --field-muted: #a3a196;
  --focus:       #ecebe4;
}
```

Mapeo en Tailwind (config nuevo, tokens semánticos, **nunca** `brand`/`accent` de la identidad retirada):

```js
colors: {
  ground: 'var(--ground)', surface: 'var(--surface)', ink: 'var(--ink)',
  muted: 'var(--muted)', accent: 'var(--accent)', 'accent-ink': 'var(--accent-ink)',
  field: 'var(--field)', 'field-ink': 'var(--field-ink)', 'field-muted': 'var(--field-muted)',
},
fontFamily: { display: ['Bodoni Moda', 'Georgia', 'serif'], body: [ /* Inter, igual que hoy */ ] },
```

Se **retiran** las claves `brand` (10 pasos) y `accent` (violeta) de `tailwind.config.js:11-29`, `boxShadow.glow` (`:30-32`) y los keyframes `float`/`hue`/`node-pulse` (`:33-52`).

### 5.2 El ajuste medido sobre la paleta repartida

La paleta de la biblioteca trae `--muted: #63625c`. Medido: **4,98:1 sobre `--ground` pero 4,44:1 sobre `--surface`** → falla AA en el escalón profundo. Se oscurece un escalón: **`#5b5a54`**, que da **5,63:1** y **5,02:1**. Un solo token de tinta apagada, AA sobre todos los papeles. Es el único valor que se toca.

### 5.3 Ratios calculados (pares críticos, medidos con la fórmula WCAG 2.1)

**Claro (papel):**

| Par | Ratio | Veredicto |
| --- | --- | --- |
| `--ink` sobre `--ground` | **14,57:1** | AA/AAA texto |
| `--muted` sobre `--ground` | **5,63:1** | AA texto |
| `--ink` sobre `--surface` | **13,01:1** | AA/AAA texto |
| `--muted` sobre `--surface` | **5,02:1** | AA texto |
| `--field-ink` sobre `--field` | **14,57:1** | AA/AAA texto |
| `--field-muted` sobre `--field` | **7,42:1** | AA texto |
| `--accent-ink` sobre `--accent` (botón) | **8,19:1** | AA texto |
| `--accent` sobre `--ground` | **1,78:1** | **NO es texto. El latón nunca escribe sobre papel: sólo rellena.** |
| `--accent` como texto sobre `--field` | 8,19:1 | permitido (marca de acento sobre el campo oscuro) |

**Oscuro (sala de lectura):**

| Par | Ratio | Veredicto |
| --- | --- | --- |
| `--ink` sobre `--ground` | **15,46:1** | AA/AAA texto |
| `--muted` sobre `--ground` | **7,12:1** | AA texto |
| `--ink` sobre `--surface` | **13,85:1** | AA/AAA texto |
| `--muted` sobre `--surface` | **6,38:1** | AA texto |
| `--field-ink` sobre `--field` | **13,22:1** | AA/AAA texto |
| `--field-muted` sobre `--field` | **6,09:1** | AA texto |
| `--accent-ink` sobre `--accent` | **10,11:1** | AA texto |
| `--accent` como texto sobre `--ground` | **10,11:1** | permitido (en oscuro el latón sí puede escribir) |

**Los dos pares que el encargo midió como defecto** quedan resueltos y documentados para comparar: `brand-500 #6366f1` sobre `#f8fafc` = **4,27:1** y `slate-500 #64748b` sobre `#000000` = **4,41:1** (ambos por debajo de 4,5). Ninguno de los dos existe ya en la página.

### 5.4 Reparto cromático (proporciones, no sólo valores)

- **Dos valores hacen la página**: papel y tinta. El latón es **siempre relleno** y marca **una sola mancha por pantalla**: el botón de acción de la portada, la **ficha activa** del filtro (§8.5), la fila de cierre de Contacto y el botón de la Placa final. Donde el acento no puede mantener esa disciplina se usa tinta: la barra de la entrada destacada del pliego va en `--ink` (§8.5, desviación 3).
- **Dos campos volteados**, nunca contiguos: Disciplinas (a mitad de página) y la Placa final. En oscuro no se invierten: suben un escalón (`--field: #23231c`).
- Las superficies se separan **por escalón de tono**, nunca por línea ni por sombra. **No hay sombras en la página** (ni `boxShadow.glow` ni equivalentes). El `ThemeToggle`, que flota de verdad, se separa con un bloque relleno, no con una sombra.
- `theme-color` de `index.html:8-9` se actualiza a `#e8e8e3` / `#14140f`. El negro puro `#000000` desaparece de `src/index.css:15-17`.

---

## 6. Campo de papel

Sustituye a los 3 blobs + a la rejilla WebGL, que se retiran por completo (aprobado por el usuario).

### Cómo se construye

Una **capa de grano fija**, sin imagen externa, sin dependencias y sin movimiento:

```css
.field-grain {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;   /* nunca sobre el contenido */
  opacity: .28;                          /* el velo real queda en 2–4 % */
  mix-blend-mode: multiply;              /* claro */
  background-image: url("data:image/svg+xml,…feTurbulence baseFrequency='.86' numOctaves='3'…");
  background-size: 180px 180px;          /* tesela repetida; el grano no escala con el viewport */
}
.dark .field-grain { mix-blend-mode: screen; opacity: .18; }
```

- Es un `feTurbulence` en `data:` URI (SVG inline, ~400 B). Nada de PNG, nada de red.
- `aria-hidden="true"`, `pointer-events:none`, `position:fixed` → **no** hay parallax (se retira `PARALLAX.factor = 0.06`, `backgroundTokens.js:119`).
- El grano **no se mueve**: es papel. Eso lo hace `prefers-reduced-motion`-seguro por construcción.
- Se sirve una vez en `App.jsx`, junto al contenido (un solo `<div class="field-grain">`).

### Cambio de campo por sección

El campo cambia en **seis lugares** y siempre por borde de sección, nunca a mitad de párrafo (un párrafo sobre dos colores se lee como error):

| Sección | Campo | Razón de composición |
| --- | --- | --- |
| Inicio | `--ground` (papel) + las fotos de archivo | La portada es la placa; el papel hace de cartón de montaje |
| Prólogo | `--surface` (un escalón más profundo) | Separa el prólogo del pliego sin línea |
| Cifras | `--ground` | Vuelta al papel: el descanso de la página |
| Disciplinas | **`--field` (volteado)** | El único golpe de la página a media altura; el pliego de herramientas se lee como cliché negro |
| Trayectoria | `--ground`, con las barras rellenas en `--surface` | El ledger: filas de un tono, sobre el papel |
| Archivo | `--surface` | El pliego se imprime sobre una hoja un escalón más profunda: las filas no flotan, y el campo cuenta como mancha (`filled`, `probe.mjs:528-548`) |
| Sobre mí | `--ground` | Vuelta al papel antes del cierre |
| Contacto | `--ground` alternando con `--surface` por fila; **una fila en `--accent`** | Las filas son bandas de tono; la última es la única mancha de latón |
| Placa final | **`--field` (volteado)** | La contratapa: tinta llena con el tipo en gris papel |

### Qué se retira exactamente

| Se retira | Dónde está hoy |
| --- | --- |
| `AmbientBackground` y su canvas WebGL | `src/App.jsx:19`; `src/components/AmbientBackground.jsx`, `GradientBackground.jsx` |
| `BLOBS` (3 manchas), `GRID` (rejilla interactiva), `PARALLAX` | `src/theme/backgroundTokens.js:58-80`, `:101-116`, `:119` |
| `BASE` con `#FAFAF9`/`#000000` | `backgroundTokens.js:88-91`, `src/index.css:11,15-17` |
| Gradientes de fondo y de botón | `App.jsx:18`; `Hero.jsx:30,33`; `FooterCTA.jsx:6`; `ProjectsCarousel.jsx:24,40,131`; `SkillsColumn.jsx:24`; `SectionNav.jsx:54` |
| `backdrop-blur` (5 copias del mismo shell) | `Hero.jsx:99`; `StatsGrid.jsx:17`; `SkillsColumn.jsx:14`; `ExperienceTimeline.jsx:54`; `ProjectsCarousel.jsx:24,113`; `AboutSection.jsx:6`; `SectionNav.jsx:69`; `ThemeToggle.jsx:6` |
| Foco radial que sigue al ratón (`--x/--y`) | `Hero.jsx:104-106`; `SkillsColumn.jsx:19-21`; `ProjectsCarousel.jsx:29-31` |
| `boxShadow.glow` y halo | `tailwind.config.js:31`; `Hero.jsx:30`; `FooterCTA.jsx:6` |
| `text-shadow` sobre foto | `ProjectsCarousel.jsx:42` |
| Movimiento perpetuo `float/hue/node-pulse` | `tailwind.config.js:33-52`; `ExperienceTimeline.jsx:19` |
| Máquina de escribir del h1 | `Hero.jsx:14,48-55` |
| Font Awesome (`cdnjs`) | `index.html:19-20`; usos `Hero.jsx:87`, `FooterCTA.jsx:20,29`, `ProjectsCarousel.jsx:80,91,97`, `SkillsColumn.jsx:28`, `ExperienceTimeline` (sin), `SectionNav` (sin), `ThemeToggle.jsx:8` |

Los tres glifos que sobreviven (flecha de enlace externo, signo de apertura de las barras, marca del tema) se dibujan **SVG inline** (0 dependencias). Ver §12: la retirada de Font Awesome es una decisión de marca a confirmar.

---

## 7. Rejilla y espacio

- **Rejilla:** 12 columnas, `gap: 24px`, contenedor `--shell-max` (`clamp(1240px, 80vw, 1600px)`; 1536 a 1920), márgenes laterales **20 px / 24 px / 32 px** (móvil / tablet / desktop). El tipo grande puede romper a sangre (portada, el nombre completo de la placa final, la banda del Prólogo); el texto no.
- **Un solo juego de márgenes** en toda la página. Todos los bloques de texto comparten **tres sangrías como máximo** (columna 1, columna 5, y la columna del ledger).
- **Ritmo vertical:** gap entre secciones **128 px** (móvil) → **192 px** (desktop), dentro de la banda pedida (120–220). Dentro de una sección los huecos no pasan de 56 px: el salto entre secciones siempre es mayor que cualquier hueco interno.
- **Dos alturas de respiración** como máximo: `--space-section` (128/192) y `--space-block` (28/40/56).
- El **Prólogo** es el único descanso deliberado de la página (una sección con aire y una foto que se sale por abajo). Ni una más.
- Sin scroll interno en ninguna sección: hoy Experiencia mete 720 px de scroll propio dentro de un contenedor (`ExperienceTimeline.jsx:56`), lo que crea dos barras de scroll y roba el gesto del pulgar. Se elimina: la sección fluye con la página.

---

## 8. Blueprint por sección (9 bloques, más §8.9 transversal)

Regla transversal: ninguna sección es una rejilla de tarjetas, ninguna comparte composición con su vecina, ninguna usa iconos decorativos ni etiquetas en mayúsculas pequeñas con tracking.

### 0. Inicio — `pinned-title-over-portraits` (hero redibujado)
**Geometría.** Campo de papel. Una capa `position: sticky; top: 0; height: 100svh`. Detrás, **una fotografía de archivo de Medellín** en marco 2:3, centrada entre las columnas 5 y 8 (~37 %), desde 90 px bajo el borde superior hasta el borde inferior, recortada con `object-fit: cover` y foco en el tercio superior. **El nombre la cruza por su cuarto superior**, en dos líneas (`DUVER` / `BETANCUR`) centradas — **el único momento centrado de la página** — a `--t-monument` (`clamp(3.5rem,13vw,11.875rem)`), caps, `opsz 96`, leading 0,86, tinta `--ink`. **Enmienda 2026-10-20:** ese cruce se conserva **en móvil**; a **≥1024** el nombre va sobre papel (columnas 1–7) y la placa fotográfica sangra por la derecha (8–12), alineada su primera línea base con el nombre. Motivo: a 1920 la tinta sobre píxeles no se lee. Ver el bloque de enmiendas al inicio.
**Jerarquía.** Nombre → una frase de apoyo (`--t-body`, columna 1–3, ancho máximo 26ch, última línea a 32 px del borde inferior) → **una** acción (botón rectangular macizo: `--accent` latón, `--accent-ink`) → marca de agua `Duver Betancur` arriba a la izquierda en `--t-nano` → `Menú` arriba a la derecha.
**Lo que NO es.** No es una tarjeta con degradado índigo, no hay badges con blur, no hay foto circular con sombra, no hay máquina de escribir, no hay dos titulares.
**Las tres fotos reales aquí.** Tres **fotogramas de archivo de la misma ciudad** (colecciones abiertas, ≥1920 px) que **se relevan en crossfade** (§10): son el mundo del sujeto, nunca se presentan como trabajo suyo. Verificadas y **miradas** por `design-imagery`:

| Orden | Archivo | Nativo | Licencia |
| --- | --- | --- | --- |
| 1.ª (y única con `prefers-reduced-motion`) | `calle-de-san-juan-medellin-1930.jpg` | 1920×1226 | **Dominio público** (Gonzalo Escovar Gaviria) |
| 2.ª | `catedral-de-medellin-1930-benjamin-de-la.jpg` | 1920×1213 | **Dominio público** (Benjamín de la Calle Muñoz) |
| 3.ª | `banco-republicano-del-parque-berrio-medellin-1930.jpg` | 1920×1227 | **Dominio público** (estudio de Gonzalo Escovar Gaviria) |

Sustituyen a las tres que proponía la v1 (`commons:92496111`, CC BY-SA 4.0 → descartada porque el duotono la convierte en obra derivada; `commons:60577732`, un montaje compuesto, no una fotografía; `commons:146781892`, «silletero», que **no sobrevive al recorte 2:3** por tener el sujeto descentrado). **Todas las que se tratan son dominio público o CC0** (§8.9). Bajo el marco, su **línea de crédito** en `--t-nano` `--muted`, enlazada: `Archivo · Medellín, 1930 · Gonzalo Escovar Gaviria · Wikimedia Commons`. Marco, `object-position`, formatos y duotono: **§8.9**.
**El retrato de Duver no va aquí** (313×313 no aguanta este marco): va como inserto en Sobre mí.

### 1. Prólogo — `intro` (el título que rotula un panorama)
**Geometría.** Sección de 100svh. Tercio superior: el **statement real** (`HERO_PROFILE.summary`, 136 caracteres) a `--t-lead`, medida **62ch**, leading 1,25, máx 3 líneas. 28 px debajo, **dos rótulos** en `--t-nano` de dos líneas cada uno y ≤150 px de ancho con 48 px de separación: *«Medellín, Colombia · desde 2019»* y *«Disponible para freelance»*. 40 px más abajo empieza **una fotografía a sangre** (21:9 o más ancha) que se sale por debajo del pliegue: sólo se ve su 55–60 % superior; el resto llega con el scroll. El statement se lee como rótulo grande del panorama.
**Lo que NO es.** No es una sección con imagen a la derecha y texto a la izquierda, no hay tarjetas de «valores», no hay eyebrow.
**Desviación declarada:** el blueprint pide «un titular de dos líneas de 3–6 palabras». Se usa el statement real (3 líneas a `--t-lead`), que es la regla de la casa para statements y respeta la geometría (bloque grande arriba, dos rótulos, foto).
**La banda es fotografía de archivo** (§8.9): `riachuelo-santa-elena-av-derecha-medellin-1930.jpg` (postal coloreada a mano de 1930, **dominio público**, 1920×1219) en marco **21:9** a sangre, `object-fit: cover`, `object-position: 50% 42%`, `loading="lazy"`. Es el **único descanso** de la página y la única foto que se sale por el borde inferior. Su leyenda, en `--t-nano` `--muted` sobre el borde izquierdo: `Archivo · Medellín, 1930 · Gonzalo Escovar Gaviria · Wikimedia Commons`.

### 2. Cifras — `stats` (líneas de cifras tranquilas)
**Geometría.** Columnas 2–7. Lista de definición: **seis filas**, cada una de dos carriles. Carril 1: 132 px, cifra alineada a la derecha, `--t-head`, tinta plena, `tabular-nums`. 24 px de hueco. Carril 2: una frase de ≤48ch a `--t-body` en `--muted`, primera línea alineada con la cifra. Filas separadas 28 px. El título («Cifras», 1 palabra, `--t-head`) va 56 px arriba, sobre la sangría de las frases. 18vh de aire arriba y abajo. **Las seis cifras se derivan del dato** (años desde mayo de 2019, casas distintas de `EXPERIENCE`, `PROJECTS.length`, `kind === 'pages'`, tecnologías distintas de los `stack`) para que el `sync-projects` no las convierta en mentira; sólo «4 áreas» es una constante de copy.
**Contenido real.** `+6 / Años en la industria tech` · `+3 / Años como Full Stack developer` · `24 / Lanzamientos en producción`.
**Lo que NO es.** No son tres tarjetas con icono y número gigante en índigo, no hay contador animado (`useCountUp` se retira: «las cifras se dicen sin subir la voz»), no hay rejilla de 3 columnas.
**Un inserto de archivo, no una sección con foto.** Columnas 9–11, alineado con la primera fila de cifras: un **cajón de fichero de tarjetas** (`.taste-skill/imagery/assets/copyright-card-catalog-drawer.jpg`, **dominio público**, Wikimedia Commons) en **4:5, ≤200 px de ancho**, con el duotono de §8.9 y su leyenda en `--t-nano` `--muted`: `Archivo · Michael Holley Swtpc6800 · Wikimedia Commons`. Es el **antepasado físico de la sección que sustituye a las capturas** — fichas ordenadas, un índice dibujado — y entra como **viñeta de imprenta**, no como ilustración: la sección sigue sosteniéndose con el aire y el texto.
**Por qué es obligatorio y no opcional** (corrige el «sin fotografía» de la v1). El **suelo de imágenes reales del skill es 4**; el recuento de esta página sin capturas es de **6** imágenes reales: 3 en el Inicio + 1 en el Prólogo + este inserto + el retrato de Sobre mí. Con `prefers-reduced-motion` el crossfade deja **una sola** imagen montada (§10), y el recuento cae a **4**: exactamente el suelo (`few-pictures` falla por debajo de 4, `rules.mjs:111-113`). **Este inserto es ese margen.** Las 24 placas del Archivo **no cuentan** como imágenes: son texto.

### 3. Disciplinas — `proof` (los nombres en una sola frase)
**Geometría.** Campo volteado (`--field`) a sangre, de borde a borde. Una sola frase cuadrada a la izquierda sobre las 12 columnas, `--t-lead` (≤36 px: es un statement, no un titular), medida 62ch, leading 1,3, en `--field-ink`, con la lista de herramientas en `--field-muted` para que el bloque lea como textura y la estructura (Frontend / Backend / Automatización) en tinta plena. 120 px de aire arriba y abajo. **Nada más**: ni logos, ni columnas, ni iconos.
**Contenido real (todo de `profile.js:51-67`).** *«Frontend, backend y automatización: React, Redux, Vite, TailwindCSS, Laravel, PHP, MySQL, Python, Selenium, ETL, OWASP, Docker.»*
**Ajuste declarado del blueprint:** elimina el ciclo de «un nombre iluminado cada 2 segundos» (es adorno perpetuo y el encargo ya tiene su live thing). Estático, en tinta plena y apagada.
**Lo que NO es.** No son tres tarjetas con icono (`fa-code`, `fa-database`, `fa-shield-halved`), no son badges, no es una nube de etiquetas: es un pliego de herramientas leído como frase.

### 4. Trayectoria — `list` (barras rellenas, filas de ledger)
**Geometría.** Columna de lectura 520–640 px, alineada a la columna 1. Título «Trayectoria» a `--t-head`. 20 px debajo, **5 barras** a ancho completo, 56 px de alto, 6 px de separación, rellenas en `--surface` (esquinas **cuadradas**: la casa usa una sola forma), etiqueta a 17 px (`--t-body`) a la izquierda con 18 px de padding y el signo `+` a la derecha (SVG inline, gira 45° al abrir con `transform`). Cada barra es un `<details>` que **abre en su sitio**, conserva el relleno y muestra: cargo (`--t-body`, tinta plena), periodo (`--t-nano`, `--muted`), descripción (`--t-body`, 62ch) y el stack del puesto en `--t-nano` separado por puntos medios. **La primera abierta por defecto.** Sin JavaScript: `<details>` funciona igual.
**Contenido real (5 casas, `profile.js:74-122`).** Sofka Technologies (2026–) · Tecnología Jurídica (2024–2026) · Talent.com (2022–2024, con sus dos cargos dentro del panel: `Content Intern` y `PPC Indexation · Indexer`) · Emtelco (2020–2022) · Fluid Attacks (2019).
**Lo que NO es.** No es una timeline con puntos que pulsan (`animate-node-pulse-slow`), no es scroll interno, no son tarjetas con chips de colores.
**Nota:** el blueprint pide 6–9 barras; hay 5 casas reales. No se inventan filas para llegar a 6.

### 5. Archivo — `work` → **pliego de índice** (opción A: sin capturas)
**Base estructural.** `.taste-skill/imagery/reference-index-plate-desktop.svg` (1440) y `.taste-skill/imagery/reference-index-plate-mobile.svg` (390), construidas por `design-imagery` **con los tokens de §5.1 y los tipos de §4**. De ahí sale la estructura: título + línea viva en su línea base · tira de fichas · pliego de entradas · paginación a pie. Es la **única sección del blueprint sin un solo `<img>`**.
**Por qué no hay capturas (medido el 2026-10-15).** **24/24** entradas de `src/data/projects.json` apuntan a `s.wordpress.com/mshots` y **ninguna imagen de proyecto existe en el repo**: 18/24 son byte-idénticas (GIF `GIF89a` 400×300, 8 737 B, SHA1 `37af25f411ac`, 12 fotogramas = **el spinner animado de WordPress**), 5/24 son muros de login y 1/24 es este mismo sitio. **0 de 24 comunica un proyecto**; el servicio rate-limita (429) y no tiene SLA, y un GIF animado **se mueve sin que ninguna media query lo detenga** (`prefers-reduced-motion`). Decisión del usuario: placa tipográfica de índice. **Cero imágenes inventadas, cero peticiones externas en esta sección.**
**Geometría (escritorio ≥1024 px).** Sobre `--surface` a sangre. Título «Archivo» a `--t-head` en el margen; **en su línea base, a la derecha**, la **línea viva** (`Mostrando 8 de 24 · Todos`) en `--t-nano`. 32 px debajo, la **tira de fichas** (§9): la activa con **relleno de latón** y etiqueta en `--accent-ink` (8,19:1), las demás **sólo texto** en `--muted` (5,02:1 sobre `--surface`); todas `--t-nano`, esquinas cuadradas, **sin borde de 1 px**, **44 px de alto**. 40 px debajo, el **pliego**: una `<ul>` de 8 entradas por tirada. Cada entrada es un `<li>` con **tres líneas a la izquierda y las salidas en un carril a la derecha, siempre en el mismo sitio**:
- **L1 · el nombre** del repo a `--t-lead` (Bodoni, `-0.01em`, `--ink`), **máximo 2 líneas** (ver desviación 2). Va **un escalón por debajo del título de sección** (`--t-head`): la sección manda sobre sus entradas, y así el pliego no computa un sexto tamaño.
- **L2 · el stack** en `--t-nano` `--muted`, **sentence case** (nunca versalitas con tracking: `micro-label`), separado por puntos medios y **sin recortar** lo que trae el JSON. Si la entrada no tiene stack (`Prompts Constructor`, `projects.json:250-259`), la línea **no existe** y no deja hueco.
- **L3 · año · tipo** (`2026 · Pages`): `pushed_at` · `kind` (`pages`/`repo`). El campo `metric` **no se renderiza** (es redundante con `kind`); el dato queda intacto.
- **Carril derecho**, alineado a la derecha: `Demo ↗` a `--t-body` en **tinta plena** y `Código ↗` a `--t-nano` en `--muted`, apilados. **Sólo se dibuja el enlace que existe**: 10 de 24 son `kind: "repo"` con `link: null` y **no se finge un hueco vacío**.
- **Las filas se separan por aire —32 px— y por nada más**: sin filetes, sin sombras, sin bandas de cebra. (La referencia dibuja un `.rule` de 1 px con `stroke: #dcdcd6`: el **mismo** color del campo. No se ve. Se lee como lo que es: separación por espacio, que es además lo que exige la casa.)
- **La entrada destacada** (`featured: true`, 1 de 24) lleva una **barra de 3 px × alto de la fila a su izquierda, en `--ink`**, y su texto sangra 18 px.
- **El nombre no es un enlace**: esto es un índice que se lee, y las salidas viven en una sola columna reconocible. Todas las salidas con **área de 44 px** en ≤640 px y ≥32 px en escritorio (el defecto medido eran 19 px).
- **Paginación a pie de pliego:** izquierda `Primera · 1 de 3` en `--t-nano` `--muted`; derecha `Siguiente tirada ↗` a `--t-body` en tinta, con 44 px de área.
**Geometría (≤640 px, versión de pulgar).** Una entrada por fila, apilada: nombre → stack → año · tipo → enlaces (cada uno de 44 px de alto). **Cero scroll horizontal**: el pliego nunca se recorta a lo ancho. La tira de fichas **envuelve en dos líneas** en vez de arrastrarse (ver desviación 5). La paginación son dos controles de ancho completo, alcanzables con el pulgar.
**Desviaciones declaradas respecto de las referencias de `design-imagery`** (5, todas medidas):
1. **Sin números de índice.** El informe proponía `01–24`; `probe.mjs:207` marca como `numbering` **FAIL** todo nodo de texto que sea `01`/`02`… y el skill lo prohíbe. El orden lo dan la posición y la fecha. (Las dos referencias SVG ya no los llevan.)
2. **El nombre de cada entrada se compone a `--t-lead` (28 px / 22 px), no a `--t-head` (30 px) como en las referencias.** Tres motivos medidos: (a) **techo de 5 tamaños** — el nombre a 30 px obligaría a un valor computado dentro de `--t-head` distinto del de los títulos de sección, y la página pasaría a **6**; a `--t-lead` reutiliza un escalón que ya existe (5 exactos); (b) **jerarquía** — el título de sección (30–44 px) manda sobre sus entradas (22–28 px), como en cualquier catálogo; (c) **gate** — todo bloque de más de 24 px lo clasifica `probe.mjs:148` como **titular** con techo de 2 líneas por debajo de 600 px; a 22 px/28 px queda dentro de *statement* (`stmtMaxPx` = 24 en móvil, 36 en escritorio) y la regla de diseño de **≤2 líneas** pasa a ser disciplina, no un FAIL esperando a ocurrir. El caso «Generador De Historias Interactivas» (34 caracteres) entra en dos líneas a 28 px dentro de 350 px útiles (~0,47 em de avance medio).
3. **La barra de la entrada destacada va en `--ink`, no en latón.** La paleta repartida dice *«el latón marca un solo detalle por pantalla»* (`palettes.json:64-85`) y en esta pantalla ese detalle es la **ficha activa**; dos manchas de latón en el mismo cuadro rompen la regla. La barra de tinta marca lo mismo con menos voz (§5.4).
4. **Sin filete horizontal y con fichas de 44 px** (la referencia las dibuja de 34 px): el mínimo lo fija el defecto medido de tap targets (19 px) y la regla de la casa.
5. **La tira de fichas envuelve a dos líneas en ≤640 px**, en vez del arrastre con `scroll-snap` de la referencia: `side-scroll` marca como WARN toda fila que se corta en el borde (`rules.mjs:117`) y un control que exige descubrirse con el pulgar es peor que 50 px de alto extra. Todo visible de una vez.
**Lo que NO es.** No son tarjetas con degradado, sombra y texto sobre la foto (`ProjectsCarousel.jsx:24,40,42`), no hay píldoras de métrica, no hay «Cargar más» degradado, no hay rejilla de imágenes de terceros, no hay skeletons ni «próximamente».
**El live thing vive aquí** (§9): el índice navegable y el filtro en vivo son las dos mitades de esta sección.

### 6. Sobre mí — `about` (título fijado, el retrato pasa)
**Geometría.** Sobre `--ground`. Una capa `position: sticky; top: 0` con el **título real** («Diseño soluciones con foco en negocio», `--t-head`, ≤2 líneas) fijado a 16 px del borde superior en móvil / centrado verticalmente en desktop. Bajo él, en flujo normal, **un retrato** en un marco **cuadrado (1:1) de ≤220 px** que pasa por detrás del título (adaptación de «los retratos pasan»: hay una persona, no seis). Bajo el retrato, alineado a su sangría: el nombre en `--t-nano`, el rol en `--t-nano` `--muted`, y el **párrafo real** de Sobre mí (246 caracteres) a `--t-body` con **medida 62ch** (arregla el defecto de 123 caracteres/línea). Cierra la línea de etiquetas reales: `Discovery técnico · Arquitectura ligera · DevSecOps · Mentoría de equipos`, en `--t-nano` separadas por puntos medios. 40svh de aire antes de que el título se suelte.
**La foto real aquí: el retrato de Duver** (`src/assets/img/ProfilePhoto.png`), a **≤220 px** (el original mide **313×313 y es opaco**; por encima de ~230 px se nota la ampliación en pantallas 2×). Marco **1:1** (no 2:3: recortar el cuadrado a 2:3 exigiría 313×470 imposibles sin ampliar), `object-fit: cover`, `object-position` centrado, `width`/`height` intrínsecos, 320/640 en `srcset`, `loading="lazy"`. Es **material propio**: no lleva línea de crédito de archivo, sí `alt` en español. Es el único punto del sitio donde aparece su cara, y aparece a tamaño de inserto, no de póster.
**Ajuste declarado:** el blueprint pide `mix-blend-mode: difference` para el título. **No se usa**: sobre papel y fotos da colores aleatorios. El título lleva tinta sólida elegida para su campo.
**Lo que NO es.** No es un panel de cristal con etiquetas en píldora, no es una rejilla de cuatro «principios» con iconos.

### 7. Contacto — `contact` (direcciones en filas de display)
**Geometría.** Seis filas a ancho completo, todas al mismo tamaño (`--t-head`), tinta plena, sangría de 20 px, leading 1,0, cada fila ~150 px de alto con el texto en su tercio inferior. Las filas se distinguen **por bandas de tono alternadas** (`--ground` / `--surface`), no por líneas. Sin título y sin formulario.
**Contenido real.** `duverbetancurbedoya@outlook.com` (mailto) · `LinkedIn` · `GitHub` · `Descargar CV` (PDF) · `Medellín, Colombia` (no enlaza: es el lugar) · fila de cierre en **`--accent`** con la palabra de saludo («Escríbeme») y, 24 px a su derecha, centrado en la x-height, un botón redondo macizo con flecha (SVG) que abre el correo.
**Lo que NO es.** No es un bloque con degradado, no hay formulario (no hay backend: la acción primaria es `mailto:` con asunto y cuerpo escritos), no hay iconos de redes sociales.

### 8. Placa final — `footer` (invitación sobre el nombre completo)
**Geometría.** Campo `--field` con la tinta en gris papel (invierte campo y tinta). Tercio superior, columnas 1–7: el **titular real** a `--t-head` en dos líneas (≤5 palabras) — *«Hablemos de tu backlog»* (SAMPLE) —, y debajo, a `--t-body` en 45ch, la frase real de `FooterCTA.jsx:11-13`; un único botón rectangular macizo (latón) con `mailto:` y etiqueta real *«Agenda una llamada»* (`profile.js:21`). Columnas 10–12, alineadas arriba: cuatro enlaces apilados en `--t-body` (Email · LinkedIn · GitHub · CV). Justo encima de la línea de mayúsculas del nombre, **una fila de créditos** a **tinta plena** (`--field-ink` sobre `--field` = **14,57:1**) y `--t-nano`, repartida a izquierda y derecha: el bloque **`Pictures:`** con **las cinco fotos de archivo de §8.9** — formato exacto por pieza, `«Título» by Autor, licencia, via Wikimedia Commons`, **con los enlaces a la ficha y a la licencia intactos**, copiado del bloque HTML que genera `node .opencode/skills/design-taste-frontend/scripts/assets.mjs --credits --to .taste-skill/imagery/assets` (`.taste-skill/imagery/credits.md:12`) y **nunca escrito a mano**; a la derecha, «Bodoni Moda · OFL» y «React · Vite · Tailwind». Lo que no se use se borra de `credits.json` **y** de la fila: hoy `credits.json` lista material de reserva que no se renderiza. Abajo, el nombre **en una sola línea** (`white-space: nowrap`) a `--t-monument`, más grande de lo que cabe: se empuja con `transform: translateY(22%)` y **se recorta por el borde inferior y por el derecho** (`overflow: hidden`). Debe reconocerse por su tercio superior solo.
**Lo que NO es.** No es un sitemap, no es una barra con copyright centrado, no es un degradado índigo→púrpura.

### 9. Sistema de imagen (transversal, §8.9)
Fijado por `design-imagery` (`.taste-skill/imagery/REPORT.md` §4) **sobre los tokens de §5.1 y los tipos de §4**. Vale para **las 6 imágenes reales** de la página — 5 de archivo + el retrato propio — y para ninguna más.

| Hueco | Pieza | Marco | Encuadre | `loading` | `srcset` |
| --- | --- | --- | --- | --- | --- |
| Inicio · 1.ª del crossfade | `calle-de-san-juan-medellin-1930.jpg` (1920×1226 · DP) | **2:3** | `cover` · `50% 34%` | `eager` + `fetchPriority="high"` | 640/1280/1920 |
| Inicio · 2.ª | `catedral-de-medellin-1930-benjamin-de-la.jpg` (1920×1213 · DP) | 2:3 | `cover` · `50% 38%` | `lazy` | 640/1280/1920 |
| Inicio · 3.ª | `banco-republicano-del-parque-berrio-medellin-1930.jpg` (1920×1227 · DP) | 2:3 | `cover` · `50% 40%` | `lazy` | 640/1280/1920 |
| Prólogo · banda a sangre | `riachuelo-santa-elena-av-derecha-medellin-1930.jpg` (1920×1219 · DP) | **21:9** | `cover` · `50% 42%` | `lazy` | 1280/1920 |
| Cifras · inserto | `copyright-card-catalog-drawer.jpg` (DP) | **4:5** ≤200 px | `cover` · centro | `lazy` | 320/640 |
| Sobre mí · retrato | `src/assets/img/ProfilePhoto.png` (313×313 · material propio) | **1:1** ≤220 px | `cover` · centro | `lazy` | 320/640 |

- **Los `object-position` de la tabla son el punto de partida obligatorio, no una medida final.** Las originales son ~1,57:1 y el marco del Inicio es 2:3: el recorte conserva **~42 % del ancho** (`REPORT.md` §4.1) y con el `50% 50%` por defecto se cortan cornisas y remates. Se ajustan **a ojo en la implementación**, por foto, y **nunca se suben por encima del ancho nativo**.
- **Tratamiento: duotono de dos paradas, y nada más.** `grayscale → gradient map` con **sombra `--ink` `#181715` · luz `--ground` `#e8e8e3`** (en oscuro: `#14140f` → `#ecebe4`), 8-bit con *dither* para no producir bandas, y aplanado de papel (punto negro ~20, blanco ~235). **El latón no entra en la foto** (1,78:1 sobre papel; su regla es «sólo relleno», §5.3) y **nada de índigo ni violeta** (§5.3). Prohibido: degradados, viñetas, halos, `blur`, sepia, `hue-rotate`, saturación local, virados a naranja, y mezclar en una misma sección una foto tratada con una sin tratar. El **grano** es opcional a ≤3 % de opacidad, una sola vez, nunca encima del duotono.
- **Sólo se tratan DP/CC0.** CC BY-SA + duotono = **obra derivada**, y la derivada obligaría a publicarse CC BY-SA: ese material no se usa tratado. Las **5 de archivo asignadas son dominio público**; el retrato es material propio.
- **Formato y peso.** **WebP** (calidad ≈78 sin alpha; ≈85 el retrato). **AVIF sólo con fallback WebP** en `<picture>`, y **sólo si el usuario aprueba un plugin de Vite**: la casa no tiene build de imágenes y **no se añade ninguna dependencia sin aprobación**. Los archivos se **pre-hornear** (es trabajo de implementación, no una dependencia). Objetivos: ≤120 KB el de 1280, ≤180 KB la banda, ≤90 KB el retrato.
- **Los horneados van a `src/assets/archivo/`** (importados, no en `public/`): Vite les aplica el `base` de despliegue (`/DuverPersonal/`, `vite.config.js`). Una ruta absoluta escrita a mano en JSX (`src="/assets/…"`) **se rompe en GitHub Pages**.
- **`srcset` + `sizes` obligatorios** en toda foto. `width`/`height` **siempre explícitos** e iguales al ratio intrínseco del archivo servido (**CLS 0**); el **marco** lo fija el CSS con `aspect-ratio`, no los atributos. `decoding="async"` siempre. Sólo la **primera** del crossfade va `eager`.
- **Leyenda y sello de los fotogramas de Escovar Gaviria: se quedan.** Los originales traen leyenda grabada y marca de agua del estudio; son **procedencia de catálogo**, no suciedad, y limpiarlas obligaría a un encuadre distinto por foto. Decisión de dirección, no técnica.
- **`alt` en español, frase, sin «imagen de», con lugar y año** cuando es de archivo: p. ej. «Calle de San Juan, Medellín, en una fotografía de 1930 del estudio de Gonzalo Escovar Gaviria». Decorativo ⇒ `alt=""`. **Nunca** se repite el título de un proyecto como `alt`: ya no hay capturas.
- **Créditos, en tres sitios:** (1) bajo cada imagen de archivo, en `--t-nano` `--muted` y con nombre + «Wikimedia Commons» enlazados: `Archivo · Medellín, 1930 · Gonzalo Escovar Gaviria · Wikimedia Commons`; (2) la **fila `Pictures:`** de la Placa final (§8.8), a tinta plena y generada con `assets.mjs --credits`; (3) ninguna foto de archivo se atribuye a Duver ni se pone junto a su retrato sin su línea.
- **Ninguna imagen se mueve fuera del crossfade del Inicio** (§10), y **ningún GIF animado se monta en la página** en ningún caso.

**Índice de margen (no es una sección, es el aparato del índice).** En ≥1280 px, columna fija a la derecha con las **8 entradas** en `--t-nano` siempre visibles (hoy el rótulo sólo aparece al pasar el ratón, `SectionNav.jsx:69`): la entrada activa en `--ink`, el resto en `--muted`, cada una con **≥44 px de alto** y foco visible. Por debajo de 1280 px, un `Menú` que es un `<details>` (funciona sin JavaScript) con el índice completo.

---

## 9. Live thing — Componer el archivo

### Dónde y qué es
Vive en **Archivo** (§8.5). Dos mitades: (a) el índice navegable de la página; (b) el filtro en vivo del archivo.

### (b) Filtro en vivo — comportamiento exacto

**Datos reales** (`src/data/projects.json`, 24 entradas, 11 lenguajes distintos). Las fichas se derivan del JSON en tiempo de ejecución; **nunca se escriben a mano** y **nunca se inventan lenguajes**:

| Ficha | Entradas | Criterio |
| --- | --- | --- |
| Todos | 24 | — |
| JavaScript | 18 | ≥3 proyectos |
| TypeScript | 12 | ≥3 |
| Java | 5 | ≥3 |
| Gherkin | 4 | ≥3 |
| Python | 3 | ≥3 |

Curado, no volcado: `CSS (16)`, `HTML (10)`, `Dockerfile (2)`, `Astro (1)`, `Shell (1)`, `PLpgSQL (1)` **no son fichas** (no son lenguajes que alguien vaya a pedir en una entrevista), pero **siguen visibles** en la línea de stack de cada placa. Regla: toda ficha existe sólo si el dato la sostiene (los conteos se calculan del JSON; si un lenguaje baja de 3, la ficha desaparece sola).

**Estados**
1. **Todos (estado inicial):** 24 entradas ordenadas por `pushed_at` desc (igual que hoy, `ProjectsCarousel.jsx:6-8`), paginadas de **8 en 8** → 3 tiradas.
2. **Filtrado:** una sola ficha activa (nunca multi-selección: multiplicar filtros puede dejar la vista vacía y complica la paginación). `<button aria-pressed="true|false">` con **fichas de 44 px** y, en la línea viva, **el conteo real**: `Todos · 24`, `JavaScript · 18`, `TypeScript · 12`, `Java · 5`, `Gherkin · 4`, `Python · 3` (calculado del JSON; si un lenguaje baja de 3, la ficha desaparece sola). Al cambiar: la página vuelve a la tirada 1, las entradas se reordenan **en el mismo pliego** y la **línea viva** se actualiza.
3. **Paginación:** «Siguiente tirada» / «Tirada anterior», más el rango en texto (`Primera · 1 de 3`). Al cambiar de tirada, **el foco se mueve a la primera entrada** (no se salta el viewport de forma brusca).
4. **Línea viva:** `Mostrando 8 de 24 · TypeScript` en `--t-nano`, con `aria-live="polite"` **sólo en esa línea**.
5. **Cero resultados:** con selección única no puede ocurrir; si el JSON llegara vacío, la sección muestra una frase fija y el enlace al perfil de GitHub, sin pliego vacío.

**Fallback sin script (honesto).** Esta app es una SPA de React 18 + Vite **sin SSR** (`index.html:36`, `src/main.jsx`): sin JavaScript no se renderiza nada, hoy tampoco. Lo que se especifica no es «sin JS» sino **«sin el script del filtro»**:
- El **primer render es el estado completo**: 24 entradas, sin filtro aplicado. Nada depende de JS para ser legible.
- Los filtros y las tiradas son controles que **sólo existen si el módulo cargó**; si no, no queda un control muerto en pantalla.
- `index.html` recibe un `<noscript>` con una frase y los tres enlaces honestos: perfil de GitHub, correo, CV en PDF.
- Las animaciones de entrada sólo se activan cuando el documento lleva la clase `js` (la pone el script inline de `index.html:21-32`). Sin JS, **todo el contenido se ve**: es la regla que el inspector comprueba («nunca contenido que se quede oculto si falla el script»).
- Dejarlo como verdadero no-JS exigiría prerender/SSR: fuera de alcance, y se declara en §12.

**Versión de pulgar (<640 px).** La tira de fichas **envuelve en dos líneas** (seis fichas de ~110 px en 350 px útiles): fichas de **44 px de alto**, la primera alineada al margen, **sin scroll horizontal y sin `scroll-snap`** (corrige la v1 y se aparta de la referencia móvil: `side-scroll` marca WARN toda fila cortada en el borde, `rules.mjs:117`, y un control que hay que descubrir deslizando es peor que 50 px extra). El pliego apila **una entrada por fila** — nombre a `--t-lead`, stack, año · tipo, enlaces de 44 px — y **nunca** se recorta a lo ancho, así que **nunca hay scroll lateral**. La paginación son dos controles de ancho completo, alcanzables con el pulgar, por encima del borde inferior.

### (a) Índice navegable
- El índice de margen (≥1280) y el `Menú` (`<details>`) marcan la entrada activa con `--ink` frente a `--muted`, con el `IntersectionObserver` que ya existe (`SectionNav.jsx:18-31`), pero **sólo como color**, sin gradiente ni barra de relleno.
- Las entradas no llevan números (prohibido 01/02/03): el orden lo dan la posición y las palabras.
- Sin JS: el índice es una lista de anclas que funciona; ninguna entrada queda en gris inalcanzable.

---

## 10. Movimiento

### La firma (una sola)
**El nombre escala con el scroll** (`scaling-wordmark`, `library/motions.json:13-16`). Implementación **sin JavaScript y sin librerías**:

```css
@supports (animation-timeline: scroll()) {
  .monument { animation: monument linear both; animation-timeline: scroll(root block);
              animation-range: 0 60vh; transform-origin: 50% 100%; }
  @keyframes monument { from { transform: scale(1); } to { transform: scale(0.945); } }
}
```
Recorrido **< 8 %**, sólo `scale`. Sin `@supports` (o sin timeline) el nombre se queda quieto: fallback estático explícito.

### Entradas por sección
- Por sección, en tres tiempos: título → texto → imagen, con **stagger 60–90 ms**, subida de **16–32 px** + `opacity`, disparadas **una sola vez** al entrar. Reutilizar `useReveal` (`src/hooks/useReveal.js`) y `Reveal`, pero **con una sola variante** (`fade+rise`): se retiran `slide-left`, `zoom-in` y `blur-in` (`Reveal.jsx:3-8`), que son tres voces distintas para el mismo gesto.
- La clase inicial de ocultado se aplica **sólo** si `document.documentElement` lleva `js` (la pone `index.html:21-32`). Sin JS, contenido visible.

### Feedback de controles
- Pulsación: `translateY(1px)` + tinta al 90 %, **140 ms**.
- Hover en enlaces: subrayado de **2 px** (nunca filete de 1 px) que aparece de izquierda a derecha, **180 ms**; color de tinta, no de acento.
- Foco: anillo de **2 px** en `--focus` con offset 2 px, **sin retardo** (0 ms), siempre visible. Hoy la nav tiene `outline-none` y ningún anillo (`SectionNav.jsx:66`): se corrige.
- Entrada del pliego: al pasar el ratón, la fila activa marca su **nombre en tinta plena** y sus salidas subrayan (2 px); **no se atenúan las demás**. Sin `scale`, sin sombra, sin `filter`. (La v1 atenuaba las otras placas del muro a `opacity: .72`: con texto, doce filas atenuándose a la vez es ruido, no foco.)

### Una imagen en movimiento
El paisaje de la portada: **tres fotografías de archivo de la misma ciudad en crossfade** (receta `slow-crossfade`, `motions.json:33-36`), 5–6 s de permanencia, 1,6 s de fundido, `animation-play-state: paused` cuando la pestaña se oculta (un `visibilitychange` de 6 líneas en el hook existente, sin dependencias). Con `prefers-reduced-motion`: **sólo la primera imagen, y las otras dos no se montan** (no se descargan ni cuentan para el suelo de imágenes: §8.2, §12).
**Límite duro (añadido por la corrección de la v1):** es la **única** pieza en movimiento de la página y la única que puede moverse. **Ningún GIF animado se monta en la página** en ninguna sección: un GIF anima por sí mismo, **ninguna media query CSS lo detiene** y por tanto **viola `prefers-reduced-motion`**, que es regla innegociable. Si alguna vez entra una imagen que deba moverse, se mueve con **`transform`/`opacity` bajo el guard** de `src/index.css:32-45`, nunca con su propio fotograma.

### Tokens de tiempo y easing

| Token | Valor | Dónde | Fallback reduced-motion |
| --- | --- | --- | --- |
| `--dur-press` | 140 ms | Botones, fichas, barras | transición 0 ms; el cambio de estado es instantáneo, la información se ve igual |
| `--dur-hover` | 180 ms | Enlaces, subrayados, entradas del pliego | 0 ms |
| `--dur-enter` | 620 ms | Entradas de sección | 0 ms y **sin desplazamiento** (opacity 1 directa) |
| `--stagger` | 70 ms | Título → texto → imagen | 0 ms (todo aparece junto) |
| `--rise` | 24 px | Desplazamiento de entrada | 0 px |
| `--dur-fade` | 1600 ms | Crossfade de la portada | **sin crossfade**: primera imagen fija |
| `--dur-scroll-scale` | ligado al scroll, 0–60vh | Firma del monumento | escala fija 1 |
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` | Entradas y feedback | — |
| `--ease-inout` | `cubic-bezier(.4,0,.2,1)` | Crossfade | — |

Todo se anima con **transform/opacity**, nunca con `width`, `top`, `height`, color de pantalla completa ni `filter`. El guard global de `src/index.css:32-45` se **conserva tal cual**, y cada receta lleva además su propio `@media (prefers-reduced-motion: reduce)` — hoy el guard sólo apaga `float/hue`, que desaparecen.

---

## 11. Copy deck

Todo lo marcado **[REAL]** sale del repo y no se toca. Lo marcado **[SAMPLE]** es propuesta y **el usuario debe confirmarla**.

| Bloque | Texto | Caracteres | Estado |
| --- | --- | --- | --- |
| Inicio · monumento | `DUVER` / `BETANCUR` | 5 / 8 | [REAL] `profile.js:8` |
| Inicio · apoyo (≤26ch) | «Desarrollador Full Stack & Automation Engineer» | 46 (2 líneas) | [REAL] `profile.js:9` |
| Inicio · acción primaria | «Agenda una llamada» | 18 | [REAL] `profile.js:21` |
| Inicio · marca de agua | «Duver Betancur» | 14 | [REAL] |
| Menú / índice | Inicio · Prólogo · Cifras · Disciplinas · Trayectoria · Archivo · Sobre mí · Contacto | — | [SAMPLE] los rótulos de sección son nuevos; «Inicio» y «Contacto» ya existían (`SectionNav.jsx:5-11`) |
| Prólogo · statement | «Desarrollo web, ciberseguridad y automatización: productos estables, monitoreables y listos para crecer.» | 105 (4 líneas a 390) | [REAL] `profile.js:17-18` |
| Prólogo · párrafo | «Desde 2019 construyo software: empecé revisando código y atendiendo soporte de segundo nivel; hoy trabajo de la interfaz a la base de datos y automatizo lo que se repite.» | 167 (3 líneas a 1440 / 5 a 390) | [REAL] `profile.js:19-20` |
| Prólogo · rótulo 1 | «Medellín, CO · desde 2019» | 24 | [REAL] (año: `profile.js:4`) |
| Prólogo · rótulo 2 | «Disponible para freelance» | 25 | [REAL] `profile.js:22` |
| Cifras · título | «Cifras» | 6 | [SAMPLE] |
| Cifras · filas (6) | «+7 / Años en la industria tech» · «24 / Proyectos con repositorio público» · «14 / Aplicaciones desplegadas y enlazadas» · «5 / Empresas y equipos desde 2019» · «11 / Tecnologías en uso entre esos proyectos» · «4 / Áreas: web, backend, automatización y seguridad» | — | [REAL] derivadas de `projects.json` y `EXPERIENCE`; se recalculan solas |
| Cifras · leyenda del inserto | «Archivo · Michael Holley Swtpc6800 · Wikimedia Commons» | — | [REAL] `assets.mjs --credits` |
| Disciplinas · título | «Disciplinas» | 11 | [SAMPLE] |
| Disciplinas · frase | «Frontend, backend y automatización: interfaces que aguantan uso real, APIs que otros equipos consumen y procesos que dejan de hacerse a mano.» | 150 (3 líneas a 62ch) | [REAL] `profile.js:53-55`; el orden es [SAMPLE] |
| Disciplinas · detalle | «React, Redux, Vite y TailwindCSS en la interfaz; Laravel, PHP y MySQL en el servidor; Python, Selenium y ETL para lo repetitivo; OWASP y Docker antes de producción.» | 169 (3 líneas a 62ch) | [REAL] `profile.js:56-57`; agrupa las doce herramientas por dónde se usan |
| Disciplinas · retirado | las 3 descripciones de `SKILLS[].description` | 105–120 c/u | **[SAMPLE] decisión: salen del render, siguen en `profile.js`.** Alternativa: tres líneas con glosa en `--t-nano` |
| Trayectoria · título | «Trayectoria» | 11 | [SAMPLE] |
| Trayectoria · barras (5) | Sofka Technologies · Tecnología Jurídica · Talent.com · Emtelco · Fluid Attacks (+ periodo) | — | [REAL] `profile.js:74-122` |
| Trayectoria · paneles | cargo, periodo, descripción y stack de cada puesto | — | [REAL] sin recortar |
| Archivo · título | «Archivo» | 7 | [SAMPLE] |
| Archivo · línea viva | «Mostrando 8 de 24 · Todos» | — | [SAMPLE] generado del dato |
| Archivo · fichas | Todos · 24 · JavaScript · 18 · TypeScript · 12 · Java · 5 · Gherkin · 4 · Python · 3 | — | [REAL] derivado del JSON |
| Archivo · placas (24) | nombre del repo (`title`) a `--t-lead`; stack (`stack`, sentence case, sin recortar); `año · tipo` (`pushed_at` · `kind`); salidas «Demo ↗» · «Código ↗» (sólo las que existen: 10 sin demo) | — | [REAL] sin huecos ni «undefined» |
| Archivo · placa destacada | sin texto propio: la marca es la barra de 3 px en `--ink` (`featured: true`, 1 de 24) | — | [REAL] |
| Sobre mí · título | «Diseño soluciones con foco en negocio» | 36 (1 línea) | [REAL] `AboutSection.jsx:8` |
| Sobre mí · párrafo | «Colaboro de cerca con producto y áreas operativas para automatizar procesos manuales, crear dashboards accionables y desplegar aplicaciones robustas. Me mantengo cerca del usuario final y documento cada entrega para acelerar la adopción.» | 246 (4 líneas a 62ch) | [REAL] `AboutSection.jsx:10-12` |
| Sobre mí · etiquetas | Discovery técnico · Arquitectura ligera · DevSecOps · Mentoría de equipos | — | [REAL] `profile.js:72` |
| Contacto · filas | correo · LinkedIn · GitHub · Descargar CV · Medellín, Colombia | — | [REAL] `profile.js:19-37`, `FooterCTA.jsx:24` |
| Contacto · saludo | «Escríbeme» | 9 | [SAMPLE] (reemplaza a «¿Listo para crear?», que era eyebrow) |
| Placa final · titular | «Hablemos de tu backlog» | 21 (2 líneas) | [SAMPLE] alternativa: usar sólo la frase real de abajo y quitar el titular |
| Placa final · frase | «Puedo sumarme como freelancer o refuerzo temporal para reducir tu backlog y dejar procesos automatizados.» | 108 (3 líneas a 45ch) | [REAL] `FooterCTA.jsx:11-13` |
| Placa final · acción | «Agenda una llamada» | 18 | [REAL] `profile.js:21` |
| Placa final · enlaces | Email · LinkedIn · GitHub · CV | — | [REAL] |
| Placa final · créditos | bloque `Pictures:` con las 5 fotos de archivo (`«Título» by Autor, licencia, via Wikimedia Commons`, enlaces intactos, generado con `assets.mjs --credits`) + «Bodoni Moda · OFL» + «React · Vite · Tailwind» | — | [REAL / obligatorio] |

**Microcopy de estados:** línea viva del filtro (`Mostrando 8 de 24 · TypeScript`), controles «Tirada anterior / Siguiente tirada», `aria-label` del `ThemeToggle` («Cambiar tema», se conserva), `<noscript>`: «Esta página necesita JavaScript para el archivo filtrable. Duver Betancur: GitHub, correo, CV.» (los tres enlaces reales).

**Prohibido en el copy:** eyebrows, «New», «01/02/03», mayúsculas pequeñas con tracking, cualquier logotipo o cifra inventada, cualquier cliente o testimonio que no exista en el repo.

---

## 12. Secciones de riesgo y lo que no se puede hacer

### Lo que no se puede hacer con lo que existe

| No se puede | Por qué |
| --- | --- |
| Enseñar a Duver a tamaño grande | El único retrato es **313×313 px** (`ProfilePhoto.png`, medido). Por encima de ~230 px se ve blando en pantallas 2×. **Falta una foto en alta** del usuario. |
| Enseñar el trabajo de sus clientes | Tecnología Jurídica, Sofka, Emtelco no tienen material público. El Archivo usa **sólo** los 24 repos públicos. |
| Mostrar logos, testimonios o métricas de clientes | No existen en el repo y el skill lo prohíbe. |
| Levantar el proof con «nombres de clientes» | El blueprint pedía nombres de clientes; se usa para el pliego de herramientas. Las casas aparecen como barras reales. |
| Rellenar el Archivo con 9–16 placas y creer que todas tienen demo | **10 de 24 son sólo repo** (`link: null`, medido); una no tiene stack (`Prompts Constructor`, `projects.json:250-259`) y dos no tienen descripción (`Calendar Test`, `Mayerli Portfolio`). El pliego y el filtro deben tolerar los tres casos **sin huecos ni «undefined»**. |
| Mostrar una captura de cada proyecto | **24/24** entradas de `projects.json` dependen de `s.wordpress.com/mshots` y **ninguna imagen de proyecto existe en el repo**: 18/24 son byte-idénticas (GIF 400×300 de 8 737 B = el spinner de WordPress), 5 son muros de login, 1 es este mismo sitio. **0 de 24 comunica un proyecto**, mShots rate-limita (429) y un GIF animado viola `prefers-reduced-motion`. Por eso el Archivo es un **pliego de índice sin `<img>`** (§8.5) y la sección pasa de 24 peticiones externas a **0**. |

### Riesgos (los que pueden hundir la implementación)

1. **El retrato no aguanta las pantallas que la dirección pide, y la portada no muestra a la persona.** La portada enseña Medellín, no a Duver. Si el usuario quiere su cara en la portada, **necesita subir una foto de ≥1600 px de ancho**; y el hero redibujado (`pinned-title-over-portraits`) vuelve a tener sentido pleno con 5–8 retratos reales.
2. **El Archivo ya no enseña el trabajo: es un índice, y todo el peso cae sobre la tipografía.** Se pierde la «prueba visual» que la v1 creía tener y que en realidad eran 18 spinners de WordPress. En una dirección *old money* de catálogo eso **es** el punto, pero deja dos deudas abiertas: (a) la sección depende de que §4 esté de verdad resuelto (Bodoni Moda con `opsz` fijado, 5 pasos medidos); (b) si el usuario quiere prueba visual, las rutas honestas son **capturas reales** (Playwright: dependencia nueva, sin aprobar; compraría 1 de 24, y 10 de 24 no tienen app desplegada) o **material propio** (hoy sólo existe `ProfilePhoto.png`). Ambas quedan aplazadas y **esta sección no las necesita para funcionar**.
3. **El cambio de identidad desactiva cosas que la casa hoy *defiende*.** `design-house-rules.md` §5.3 protege `gradient`, `shadow`, `glass` y `palette-purple` por ser la identidad índigo. Al cambiar la identidad, esa defensa caduca: el documento §2/§5 **debe actualizarse a mano por el usuario**, o la auditoría seguirá «defendiendo» un degradado índigo que ya no existe. Efectos colaterales a cerrar en el mismo cambio: `tailwind.config.js` (claves `brand`/`accent`, `glow`, keyframes), `backgroundTokens.js` (borrar `BLOBS`/`GRID`/`PARALLAX`/`hexToVec3`), `index.html:8-9` (`theme-color`), `index.html:19-20` (Font Awesome, a confirmar), `index.css:1-3` (el `@import 'swiper/css'` es **muerto**: `swiper` está instalado pero **no se usa en ningún componente** — `grep` sobre `src/` sólo devuelve CSS — igual que las reglas `.projects-pagination`, `index.css:19-30`, que hay que borrar). La afirmación «Carousel (Swiper 11)» de `design-house-rules.md:15` y `:63` **ya está desactualizada hoy**: `ProjectsCarousel` es una rejilla con botón «Cargar más».
4. **El monumento es la pieza más frágil.** 190 px de didona dependen de que la variable se cargue y de que `opsz` se fije a 96. Con la instancia por defecto (`opsz 11`) el nombre se ve grueso y vulgar; con `font-display` mal puesto, la portada salta. Obligatorio: `preload` del fichero, respaldo Georgia con `size-adjust`, y medición con el inspector a 1440/768/390.
5. **Las imágenes de archivo traen obligaciones de licencia.** Las CC BY-SA exigen compartir igual si se alteran (recolor, mezcla, tinte) y crédito con enlace en la página. Por eso **sólo se tratan DP/CC0**: las **5 de archivo asignadas son todas dominio público** y quedan fuera del *share-alike*. El crédito va en la leyenda bajo cada foto (§8.9) y en la fila `Pictures:` de la Placa final, y **debe ser real** (generado con `assets.mjs --credits`, no escrito a mano). Si no apareciera un juego honesto y silencioso, el fallback es una portada **sin fotografía** (sólo tipo sobre papel), que sigue siendo una portada válida.
6. **Choque con `inspect.mjs`: el techado de titulares.** Algunas secciones usan statements de 2–3 líneas (Prólogo, Disciplinas, Placa final). Están dentro de la regla de la casa (≤36 px, ≤3 líneas desktop) pero un inspector mal leído los contará como titulares largos: **la auditoría debe recibir esta nota** (§4 y §8). En el pliego (§8.5) el nombre de cada entrada va a `--t-lead` **a cualquier ancho** y dentro de un `<li>`: cuenta como *statement* (`probe.mjs:145`), nunca como titular de sección, y su techo de dos líneas es disciplina de diseño (desviación 2).
7. **El suelo de imágenes reales queda justo en el borde, y lo salva un inserto.** Sin las 24 capturas, el recuento es **6**: 3 en el Inicio + 1 en el Prólogo + 1 en Cifras + el retrato de Sobre mí (el suelo del skill es **4**: `rules.mjs:111-113`; el inspector cuenta `<img>` raster de ≥120×90 px, `probe.mjs:405-417`). **Las placas de índice no son fotos: no cuentan** — son texto. Con `prefers-reduced-motion` sólo se monta 1 de las 3 del crossfade (§10) y el recuento cae a **4**, exactamente el suelo: por eso el inserto de Cifras (§8.2) es **obligatorio** y **no se puede retirar** sin romper la comprobación. Hay **22 piezas de reserva verificada** más (`.taste-skill/imagery/candidates.json`), pero abrir huecos nuevos cambiaría una composición que hoy está cerrada.
8. **`no-footage` saltará (WARN) y se defiende.** No hay clip verificado: la única pieza en movimiento es el crossfade. Si el usuario quiere uno, hay que buscarlo con `assets.mjs --video` (archivo fílmico de la ciudad), hornearlo y usarlo **mudo, en bucle y con póster**, bajo el guard de `prefers-reduced-motion`. Mientras no exista, la ausencia se declara y no se simula.

### Lo que se conserva obligatoriamente
Paginación del archivo (8 en 8; cambia la forma, no el comportamiento), tema claro/oscuro por clase `dark` con su `ThemeToggle` (`useTheme.js`, `darkMode: 'class'`), `prefers-reduced-motion` (guard de `index.css:32-45` + `useReducedMotion`), foco visible, `alt` reales, semántica (`<section>` + `aria-labelledby`, `<ul>/<li>`, `<details>`, `aria-pressed`, `aria-live`), responsive, las 8 secciones, **las 6 imágenes reales de §8.9 con su crédito** y todo el contenido real. **No se tocan** `src/content/profile.js`, `src/data/projects.json`, `.gitignore`, despliegue ni `.opencode/docs/design-house-rules.md`.

### Handoff a auditoría (obligatorio)
Antes de dar por cerrado: `node .opencode/skills/design-taste-frontend/scripts/lint.mjs src/` y `node …/inspect.mjs <url>` a 1440/768/390. Éxitos esperados y **defendidos por este documento**: `gradient` (cero, ya no hay), `shadow` (cero), `glass` (cero), `hairline` (cero: nada de bordes de 1 px), `outlined-box` (cero: las fichas activas son relleno, no contorno), `numbering` (cero: el pliego no lleva `01–24`), `micro-label` (cero: nada de mayúsculas pequeñas con tracking; el stack va en sentence case), `default-font` (Inter es la fuente de texto **elegida y justificada**, §4). Fallos reales a resolver: contraste (los pares de §5.3 son el mínimo, no el objetivo), desbordamiento horizontal, tap targets <24 px, foco invisible, y **recuento de tamaños de fuente: debe dar 5**.

**Comprobaciones específicas de la corrección de la v1** (las que la auditoría debe leer en el informe, no estimar): (a) **imágenes reales = 6** en carga normal y **4** con `prefers-reduced-motion` emulado — el suelo es 4, así que ninguna de las dos puede bajar de ahí (`few-pictures`); (b) **cero peticiones a `s.wordpress.com`** en la red y **cero `<img>` en Archivo**; (c) `headline-lines`: **ningún nombre de entrada por encima de 2 líneas** a 1440/768/390 — van a `--t-lead` a todo ancho y dentro de `<li>`, así que cuentan como *statement*; es el punto que la referencia móvil daba por «aceptable» sin medir (§8.5 desviación 2); (d) `side-scroll` en cero: ni la tira de fichas ni el pliego se recortan a lo ancho; (e) `broken-image` deja de ser riesgo real (ya no hay imágenes de terceros); (f) `no-footage` seguirá saltando como **WARN**: se defiende, §12.8.
