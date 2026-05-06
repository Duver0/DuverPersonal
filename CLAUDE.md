# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **Bun** (`bun@1.1.21`). npm works too but Bun is canonical (used in CI).

- `bun install` — install deps
- `bun run dev` — Vite dev server at `http://localhost:5173` (auto-opens)
- `bun run build` — production build to `dist/`
- `bun run preview` — serve built `dist/` locally
- `bun run deploy` — build with `VITE_BASE_PATH=/DuverPersonal/` and push `dist/` to `gh-pages` branch
- `bun run scripts/sync-projects.js` — regenerate `src/data/projects.json` from GitHub API (set `GITHUB_TOKEN` to avoid rate limits)

No test runner, linter, or typechecker configured. Plain JS + JSX.

## Architecture

Single-page React 18 + Vite + Tailwind portfolio. No router, no state library — one page composed top-to-bottom in `src/App.jsx`.

### Data flow

Static content lives in `src/content/profile.js` (hero, CTAs, skills, experience, about, footer). Components import named exports directly from it — no props drilling, no fetch at runtime.

`profile.js` re-exports `PROJECTS` from `src/data/projects.json`. That JSON is **generated** — do not hand-edit. The source of truth is `scripts/sync-projects.js`:

- Fetches public, non-fork, non-archived repos for GitHub user `Duver0`
- For each: fetches top languages (stack), derives screenshot via WordPress mshots service from `homepage` URL or repo URL
- `kind: 'pages'` if `has_pages` or `homepage` set, else `'repo'`
- Sort order: `FEATURED_REPO` (`Anthropic-certifications`) first → repos with Pages → repos without Pages
- Writes `src/data/projects.json`

Daily cron (`.github/workflows/sync-projects.yml`, 06:00 UTC) runs the sync and commits if `projects.json` changed. Re-running the script locally is safe.

### Deploy paths

`vite.config.js` sets `base` from `VITE_BASE_PATH` env var (default `./`) when `mode !== 'development'`. GitHub Pages needs `/DuverPersonal/` so assets resolve under the subpath — that is what `bun run deploy` and `.github/workflows/deploy.yml` set. Local dev always uses `/`.

Two deploy mechanisms coexist:
1. `deploy.yml` workflow (push to `main`) → builds and uses `actions/deploy-pages` artifact. Settings → Pages → Source must be **GitHub Actions**.
2. `bun run deploy` → pushes `dist/` to `gh-pages` branch via `gh-pages` package. Requires Source = **Deploy from a branch**.

Switching between them requires toggling the Pages source in repo settings.

### Theming

`src/hooks/useTheme.js` toggles a `dark` class on `<html>`; Tailwind dark variants apply. `ThemeToggle` is a fixed floating button rendered in `App.jsx`.

### Assets

- `src/assets/` — bundled by Vite, respects `base`. Use this for images/PDFs imported in JS.
- `public/` — copied as-is, served from root.
