---
name: github-sync-frontend-agent
description: Implements Task 2 of GitHub Projects Auto-Sync. Modifies src/content/profile.js to import projects from the generated src/data/projects.json instead of the static array. Run after github-sync-script-agent completes.
---

# Frontend Update Agent — Task 2

Replace static `PROJECTS` array in `profile.js` with import from generated `src/data/projects.json`.

## Pre-condition

`src/data/projects.json` must exist (created by `github-sync-script-agent`).

## File to modify

`src/content/profile.js`

## Change

Remove the entire `export const PROJECTS = [...]` block (currently lines 124–197).

Add this import near the top of the file, after the existing asset imports:

```js
import projectsData from '../data/projects.json';
```

Add this export after the imports section:

```js
export const PROJECTS = projectsData;
```

The final imports block should look like:

```js
import profilePhoto from '../assets/img/ProfilePhoto.png';
import defaultProjectImage from '../assets/img/default.jpg';
import cvPdf from '../assets/pdf/DuverBetancurCV.pdf';
import projectsData from '../data/projects.json';
```

And the PROJECTS export should be a one-liner replacing the old static array.

## Verification

Check Vite config supports JSON imports (default yes):
```bash
cat vite.config.js
```

Start dev server:
```bash
bun run dev
```

Open browser at the localhost URL shown. Verify:
- Projects carousel loads without errors
- First slide is Anthropic Certifications
- Cards show title, description, stack badges
- Cards with GH Pages link show "Ver demo" button
- Console has no import errors

## Commit

```bash
git add src/content/profile.js
git commit -m "feat: import PROJECTS from generated projects.json"
```
