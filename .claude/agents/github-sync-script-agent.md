---
name: github-sync-script-agent
description: Implements Task 1 of GitHub Projects Auto-Sync. Creates scripts/sync-projects.js that fetches all public repos for Duver0 from GitHub API and generates src/data/projects.json. Run this agent first.
---

# Sync Script Agent — Task 1

Create the Bun script that fetches GitHub repos and generates the projects JSON.

## Files to create
- `scripts/sync-projects.js`
- `src/data/` directory (created by script)

## Implementation

Create `scripts/sync-projects.js` with this exact content:

```js
import { writeFileSync, mkdirSync } from 'fs';

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

## Verification

Run the script (unauthenticated is OK for testing — 60 req/h limit):
```bash
bun run scripts/sync-projects.js
```

Expected output: `Wrote N projects to src/data/projects.json`

Then verify JSON structure:
```bash
cat src/data/projects.json | head -30
```

Confirm:
- First entry has `"featured": true` and title contains "Anthropic"
- Each entry has `title`, `description`, `stack`, `link`, `repo`, `image`, `kind`, `metric`
- `stack` is array of strings (may be empty)

## Commit

```bash
git add scripts/sync-projects.js src/data/projects.json
git commit -m "feat: add sync-projects script and initial projects.json"
```
