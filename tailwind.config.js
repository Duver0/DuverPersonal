/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        /**
         * Dirección «name-as-monument» §4 — máximo dos familias.
         * - display: Bodoni Moda (didona autoalojada, `public/fonts/`), con la
         *   cara de respaldo `Bodoni Moda Fallback` (Georgia + size-adjust 96 %)
         *   definida en `src/index.css` para que la portada no salte de métrica
         *   mientras la variable carga.
         * - body: Inter (autoalojada; ya era la fuente de texto del repo).
         */
        display: ['Bodoni Moda', 'Bodoni Moda Fallback', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        /**
         * Tokens semánticos de la dirección §5 «paper-grey-brass».
         * Los valores viven en `src/index.css` (`:root` / `.dark`), que es la
         * única fuente de verdad cromática. Aquí sólo se exponen como clases.
         *
         * Nota: al ser valores `var(...)` en hex, estos tokens NO admiten
         * modificador de opacidad (`bg-ground/50`). La dirección no lo necesita:
         * la transparencia se aplica a nivel de elemento (`opacity`).
         */
        ground: 'var(--ground)', // campo por defecto: papel prensa
        surface: 'var(--surface)', // un escalón más profundo: filetes, barras, muro
        ink: 'var(--ink)', // tinta plena
        muted: 'var(--muted)', // tinta apagada (pies, créditos, folios)
        field: {
          DEFAULT: 'var(--field)', // campo volteado (Disciplinas, Placa final)
          ink: 'var(--field-ink)',
          muted: 'var(--field-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)', // latón: SÓLO relleno de UI
          ink: 'var(--accent-ink)', // tinta sobre latón
        },
      },
    },
  },
  plugins: [],
};
