# Journey Through Bethlehem

Public site for the Trophy Club live nativity. Replaces Squarespace.

- Tickets: Ticket Tailor (do not rebuild checkout)
- Donations: Stripe Checkout on Faith & Fellowship Foundation
- Host: Cloudflare Pages
- Domain `journeythroughbethlehem.org` stays on Squarespace until cutover

## Local

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

`preview` serves the static build only. Cloudflare Functions (`/api/donate-config`, `/api/checkout`) run on Pages, or locally with:

```bash
npx wrangler pages dev dist
```

## Pages deploy

Create a Cloudflare Pages project from this repo.

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Astro (static)

Preview the Pages URL. **Do not point `journeythroughbethlehem.org` at this project until Reed says cut over.** Squarespace stays live until then.

## Stripe (FFF only)

Set these on the Pages project (Production and Preview as needed). Use the Faith & Fellowship Foundation Stripe account — not a personal account.

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-only. Creates Checkout sessions. |
| `STRIPE_PUBLISHABLE_KEY` | Optional; reserved if Checkout.js is added later. |
| `STRIPE_DONATE_PRICE_ID` | Optional. Checkout currently sends custom amounts with `price_data`. |

If `STRIPE_SECRET_KEY` is missing, `/donate` shows suggested amounts and **Donations open soon**. Nothing is charged.

## Ticket Tailor

Public series URL (draft until published; may 404 if you are not signed in):

https://buytickets.at/trophyclubnativity/2388791

Tickets open November 1, 2026, 12:00 a.m. America/Chicago. Do not clone Ticket Tailor checkout, cart, or seat maps.

## Brand

Three notes: **paper, night, and candlelight.** Tokens live in `src/styles/global.css`.

- Paper `#f7f3ec` (warmed toward the painted plaster), plaster `#efe6da`, surface `#fffdf9`
- Ink `#3b2f25` / ink-strong `#231a12` / ink-soft `#6f6157`, lines `#e1d8ca`
- Slate (the wordmark's blue) `#395f72`, deep `#2c4a59`
- Candlelight: gold `#8a6420` on paper, gold-bright `#d9b667` and candle `#f4d59a` on night
- Night `#121d24` / `#1a2930`, night-text `#ede6d6`

Fonts (self-hosted WOFF2): Tenor Sans for the engraved voice (dates, labels, times, buttons), PT Serif for body, Playfair Display for display and the italic "voice" lines.

Rules: the home hero is the familiar nativity painting with the approved wordmark lockup (with "Presented by") laid over it, as on the flyer; the header uses the lockup without the presenter line. Other paintings carry no type; interior pages float a paper title card over a legible painting. No email capture or reminders anywhere, by decision of the organizers. Source art lives in the shared "JtB Images" folder; `scripts/import-brand-assets.mjs` converts it. Photographs are framed as artifacts: arched doorways on night, matted 4:3 on paper. The star is the one recurring glyph. 44px tap targets everywhere.

Preview any site state locally with `?state=prelaunch|open|eventWeek|past`.
