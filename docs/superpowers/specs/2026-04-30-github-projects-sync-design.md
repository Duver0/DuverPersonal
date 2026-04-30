# GitHub Projects Auto-Sync — Design Spec

**Date:** 2026-04-30  
**Status:** Approved  

---

## Goal

Auto-sync portfolio projects from GitHub public repos. Daily CI/CD job fetches repos, generates static JSON, commits back. Anthropic Certifications always first.

---

## Architecture

### Data Flow

```
GitHub API (daily cron)
  → fetch all public repos for Duver0
  → for each repo: fetch languages
  → detect GitHub Pages (has_pages || homepage)
  → build PROJECTS array
  → pin Anthropic-certifications to index 0
  → write src/data/projects.json
  → commit + push → triggers deploy.yml → GitHub Pages deploy
```

### Components

**1. `.github/workflows/sync-projects.yml`**  
Daily cron at 06:00 UTC + manual trigger. Calls GitHub API, generates `src/data/projects.json`, commits if changed.

**2. `scripts/sync-projects.js`** (Bun script)  
Core logic:
- `GET /users/Duver0/repos?type=owner&per_page=100` — all public repos
- Filter: `private === false`
- For each repo: `GET /repos/Duver0/{repo}/languages` — get language list
- Map to project shape (see below)
- Sort: Anthropic-certifications first, rest by `pushed_at` desc
- Write to `src/data/projects.json`

**3. `src/content/profile.js`**  
Change: `import PROJECTS from '../data/projects.json'` instead of static array.

**4. `src/components/ProjectsCarousel.jsx`**  
No changes needed. Already handles missing `problem/solution/impact` with conditional rendering.

---

## Data Schema

GitHub API → `src/data/projects.json`:

```json
[
  {
    "title": "Anthropic Certifications",
    "description": "SPA estática con Astro + Tailwind v4...",
    "stack": ["Astro", "TypeScript", "CSS"],
    "link": "https://duver0.github.io/Anthropic-certifications/",
    "repo": "https://github.com/Duver0/Anthropic-certifications",
    "image": "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fduver0.github.io%2F...?w=1200",
    "kind": "pages",
    "metric": "GitHub Pages",
    "featured": true
  }
]
```

**Field mapping:**
| Field | Source |
|-------|--------|
| `title` | `repo.name` (replace `-` with space, title-case) |
| `description` | `repo.description` |
| `stack` | keys of `/languages` response (top 4) |
| `link` | `repo.homepage` if truthy, else null |
| `repo` | `repo.html_url` |
| `image` | WordPress screenshots API: pages URL if has link, else GitHub repo URL |
| `kind` | `'pages'` if `repo.has_pages \|\| repo.homepage`, else `'repo'` |
| `metric` | `'GitHub Pages'` if pages, else `'GitHub'` |
| `featured` | `true` only for `Anthropic-certifications` |
| `problem/solution/impact` | not included (component handles missing) |

**Image URL pattern:**
- Has pages: `https://s.wordpress.com/mshots/v1/{encodeURIComponent(link)}?w=1200`
- No pages: `https://s.wordpress.com/mshots/v1/{encodeURIComponent(repo.html_url)}?w=1200`

---

## CI/CD Workflow

```yaml
# .github/workflows/sync-projects.yml
name: Sync GitHub Projects
on:
  schedule:
    - cron: '0 6 * * *'   # daily 06:00 UTC
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup Bun
      - run scripts/sync-projects.js (with GITHUB_TOKEN env)
      - git diff check
      - commit + push if changed (triggers deploy.yml)
```

No additional secrets needed — `GITHUB_TOKEN` is auto-provided by Actions.

---

## Error Handling

- API rate limit: unauthenticated = 60 req/h, with GITHUB_TOKEN = 5000/h. Token always available in Actions.
- Empty description: use empty string `""`.
- No languages detected: `stack = []`.
- Script failure: workflow fails, no commit, no broken deploy. Existing `projects.json` stays unchanged.

---

## Out of Scope

- Manual metadata overrides (problem/solution/impact)
- Private repos
- Forked repos (filtered out: `fork === true`)
- Archived repos (filtered out: `archived === true`)

---

## Files Changed

| File | Action |
|------|--------|
| `.github/workflows/sync-projects.yml` | Create |
| `scripts/sync-projects.js` | Create |
| `src/data/projects.json` | Create (generated) |
| `src/content/profile.js` | Modify import |
| `.gitignore` | No changes (json committed intentionally) |
