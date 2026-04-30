# GitHub Projects Auto-Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a daily CI/CD job that fetches all public GitHub repos for Duver0, generates `src/data/projects.json`, and commits it back — keeping the portfolio auto-updated with Anthropic Certifications always first.

**Architecture:** Bun script `scripts/sync-projects.js` calls GitHub REST API, maps repos to project shape, writes static JSON. GitHub Actions workflow runs daily, commits if changed, which triggers existing `deploy.yml` to redeploy the portfolio.

**Tech Stack:** Bun, GitHub REST API v3, GitHub Actions, Vite (JSON import), React (no changes)

---

### Task 1: Create `scripts/sync-projects.js`

**Files:**
- Create: `scripts/sync-projects.js`

- [ ] **Step 1: Create the script file**

```js
// scripts/sync-projects.js
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = 'Duver0';
const FEATURED_REPO = 'Anthropic-certifications';
const OUTPUT_PATH = 'src/data/projects.json';

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

function toTitleCase(str) {
  return str
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function screenshotUrl(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
}

async function fetchLanguages(repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repoName}/languages`,
    { headers }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Object.keys(data).slice(0, 4);
}

async function fetchRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&per_page=100&sort=pushed`,
    { headers }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  const repos = await fetchRepos();

  const filtered = repos.filter(
    (r) => !r.private && !r.fork && !r.archived
  );

  const projects = await Promise.all(
    filtered.map(async (repo) => {
      const stack = await fetchLanguages(repo.name);
      const hasPages = repo.has_pages || Boolean(repo.homepage);
      const link = repo.homepage || null;
      const imageUrl = link ? screenshotUrl(link) : screenshotUrl(repo.html_url);

      return {
        title: toTitleCase(repo.name),
        description: repo.description || '',
        stack,
        link,
        repo: repo.html_url,
        image: imageUrl,
        kind: hasPages ? 'pages' : 'repo',
        metric: hasPages ? 'GitHub Pages' : 'GitHub',
        featured: repo.name === FEATURED_REPO,
      };
    })
  );

  // Pin featured repo first, rest sorted by pushed_at (already sorted from API)
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const sorted = [...featured, ...rest];

  mkdirSync('src/data', { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(sorted, null, 2));
  console.log(`Wrote ${sorted.length} projects to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Run script locally to verify output**

```bash
cd /home/duver-betancur/Training/DuverPersonal
GITHUB_TOKEN=<your_token> bun run scripts/sync-projects.js
```

Expected: `Wrote N projects to src/data/projects.json`

- [ ] **Step 3: Inspect generated JSON**

```bash
cat src/data/projects.json | head -60
```

Expected: Array starting with `Anthropic-certifications` entry, `featured: true`, valid URLs.

- [ ] **Step 4: Commit script**

```bash
git add scripts/sync-projects.js
git commit -m "feat: add sync-projects script to fetch public repos from GitHub API"
```

---

### Task 2: Update `src/content/profile.js` to use generated JSON

**Files:**
- Modify: `src/content/profile.js`

- [ ] **Step 1: Replace static PROJECTS array with JSON import**

In `src/content/profile.js`, remove the entire `export const PROJECTS = [...]` block (lines 124–197) and replace with:

```js
import projectsData from '../data/projects.json';
export const PROJECTS = projectsData;
```

The file already imports `profilePhoto`, `defaultProjectImage`, `cvPdf` at the top — add the new import after those existing imports.

- [ ] **Step 2: Verify Vite can import JSON**

Check `vite.config.js` — Vite supports JSON imports by default, no plugin needed.

```bash
cat vite.config.js
```

No action needed unless you see `json: false` in config.

- [ ] **Step 3: Start dev server and confirm carousel loads**

```bash
bun run dev
```

Open browser at `http://localhost:5173` (or port shown). Projects carousel should show repos from `src/data/projects.json`. Anthropic Certifications should be first slide.

- [ ] **Step 4: Commit**

```bash
git add src/content/profile.js src/data/projects.json
git commit -m "feat: replace static PROJECTS array with auto-generated projects.json"
```

---

### Task 3: Create `.github/workflows/sync-projects.yml`

**Files:**
- Create: `.github/workflows/sync-projects.yml`

- [ ] **Step 1: Create workflow file**

```yaml
name: Sync GitHub Projects

on:
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: 1.1.21

      - name: Run sync script
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: bun run scripts/sync-projects.js

      - name: Commit updated projects.json if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git diff --quiet src/data/projects.json || (
            git add src/data/projects.json &&
            git commit -m "chore: sync projects from GitHub API [skip ci]" &&
            git push
          )
```

Note: `[skip ci]` in commit message prevents the sync commit from triggering itself, but `deploy.yml` listens on `push` to `main` without a skip-ci check — verify `deploy.yml` won't be skipped.

- [ ] **Step 2: Verify deploy.yml still triggers on sync commit**

Check current `deploy.yml` trigger:
```bash
head -10 .github/workflows/deploy.yml
```

If `deploy.yml` uses standard `push: branches: [main]` without `[skip ci]` filter, the sync commit will trigger a deploy. That is the intended behavior.

- [ ] **Step 3: Commit workflow**

```bash
git add .github/workflows/sync-projects.yml
git commit -m "feat: add daily GitHub projects sync workflow"
```

---

### Task 4: Push and verify end-to-end

**Files:** None (verification only)

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

- [ ] **Step 2: Manually trigger sync workflow**

Go to `https://github.com/Duver0/DuverPersonal/actions`, find "Sync GitHub Projects", click "Run workflow".

- [ ] **Step 3: Verify workflow run**

Expected:
- Sync job runs, generates `projects.json`
- If content changed: commits `chore: sync projects from GitHub API [skip ci]`
- `deploy.yml` triggers and deploys updated site

- [ ] **Step 4: Verify deployed portfolio**

Open `https://duver0.github.io/DuverPersonal/`. Confirm:
- Projects carousel visible
- Anthropic Certifications is first card
- Other public repos appear
- Cards with GH Pages show "Ver demo" link
- Cards without GH Pages show repo screenshot image

---

## Self-Review Notes

- **Spec coverage:** All requirements covered — daily cron ✅, public repos ✅, filter fork/archived ✅, GH Pages detection ✅, Anthropic first ✅, image strategy ✅
- **No placeholders:** All steps have actual code/commands
- **Type consistency:** `projects.json` shape matches what `ProjectsCarousel.jsx` consumes (`title`, `description`, `stack`, `link`, `repo`, `image`, `kind`, `metric`)
- **`[skip ci]` note:** Added clarification about deploy.yml behavior in Task 3 Step 2
