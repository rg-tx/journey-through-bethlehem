# Deploying

The site is a static Astro build on **Cloudflare Pages**, project
`journey-through-bethlehem`, served at https://journey-through-bethlehem.pages.dev
until the domain is cut over.

## Why merges didn't deploy on their own (Sept 2026)

The Pages project was created by direct upload and is **not connected to
GitHub** (the dashboard shows "Git provider: No"). Nothing was watching `main`,
so every production deploy so far was a manual `wrangler pages deploy` from a
laptop. `.github/workflows/deploy.yml` fixes that: GitHub Actions builds and
deploys on every push to `main`, and publishes a preview for every pull request.

## One-time setup (owner)

1. In the Cloudflare dashboard, create an API token: **My Profile → API Tokens →
   Create Token → Custom**, permission **Account · Cloudflare Pages · Edit**,
   scoped to this account.
2. Add it to the repo as a secret named `CLOUDFLARE_API_TOKEN`:
   **GitHub → Settings → Secrets and variables → Actions → New repository secret**,
   or from a terminal:

   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --repo rg-tx/journey-through-bethlehem
   ```

That's it. The next merge to `main` deploys itself; the run and its URL appear
under the repo's **Actions** tab.

## Manual deploy (fallback)

```bash
npm run build
npx wrangler pages deploy dist --project-name journey-through-bethlehem --branch main
```

## Preview any site state

Append `?state=prelaunch|open|eventWeek|past` to any page URL.
