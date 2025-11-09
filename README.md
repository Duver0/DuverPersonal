# DuverPersonal

Portafolio personal construido con React, Vite y Tailwind. Preparado para trabajar con Bun como package manager y desplegarse en GitHub Pages.

## Requisitos

- [Bun](https://bun.sh/) >= 1.1
- Node 18+ (solo si prefieres npm/pnpm)

## Scripts clave (con Bun)

- `bun install` – instala dependencias.
- `bun run dev` – levanta el servidor de desarrollo (Vite) en `http://localhost:5173`.
- `bun run build` – genera la carpeta `dist` lista para producción.
- `bun run preview` – sirve el build de producción de forma local.
- `bun run deploy` – compila con el `base` apuntando a `/DuverPersonal/` y publica `dist` en la rama `gh-pages` usando `gh-pages`.

> Si necesitas otro subdirectorio diferente a `/DuverPersonal/`, redefine `VITE_BASE_PATH` al ejecutar el script (`VITE_BASE_PATH=/tu/ruta bun run deploy`) o ajusta la variable directamente en `package.json`.

## Despliegue en GitHub Pages

### Opción automatizada (recomendada)

El repositorio incluye el workflow `.github/workflows/deploy.yml`. Cada push a `main` (o ejecución manual) hará:

1. `bun install` + `bun run build` con `VITE_BASE_PATH=/DuverPersonal/`.
2. Publicará automáticamente `dist/` en la rama `gh-pages`.
3. Configura Settings → Pages → Source = `gh-pages` para que GitHub Pages sirva esa rama.

### Opción manual

1. Configura la rama `gh-pages` como fuente en Settings → Pages.
2. Ejecuta `bun run deploy`; el script compila el sitio y sube el contenido de `dist` a `gh-pages`.
3. Cada nueva ejecución sobrescribe el contenido anterior, lo que facilita automatizarlo desde GitHub Actions.

## Estructura

- `src/` contiene la app en React completamente componentizada.
- `src/assets/` contiene imágenes y documentos estáticos que Vite empaca respetando el `base` configurado.
- `public/` queda disponible para cualquier archivo estático adicional que no necesite pasar por el pipeline.
- `bunfig.toml`, `tailwind.config.js`, `vite.config.js` contienen la configuración del tooling.
