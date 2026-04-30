---
name: github-sync-workflow-agent
description: Implements Task 3 of GitHub Projects Auto-Sync. Creates .github/workflows/sync-projects.yml — the daily cron job that runs the sync script and commits updated projects.json. Run after github-sync-frontend-agent completes.
---

# Workflow Agent — Task 3

Create the GitHub Actions workflow that runs daily sync.

## File to create

`.github/workflows/sync-projects.yml`

## Implementation

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

## Verify deploy.yml won't be blocked

Check that `deploy.yml` trigger does NOT filter out `[skip ci]` commits:
```bash
cat .github/workflows/deploy.yml
```

Current `deploy.yml` uses:
```yaml
on:
  push:
    branches:
      - main
```

This will trigger on the sync commit. That is intentional — sync commit → redeploy portfolio. The `[skip ci]` only prevents the sync workflow from re-triggering itself (GitHub Actions respects `[skip ci]` for scheduled/push triggers from bots).

## Commit

```bash
git add .github/workflows/sync-projects.yml
git commit -m "feat: add daily GitHub projects sync workflow"
```
