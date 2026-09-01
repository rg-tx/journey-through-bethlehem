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

Locked restyle tokens: paper `#f7f5f1`, surface `#fff`, ink `#645044`, ink-soft `#7a6a5d`, line `#e4dfd4`, accent `#395f72`, accent-deep `#2c4a59`, sky `#1c2a30`. Fonts: Tenor Sans (UI), PT Serif (body), Playfair Display (display). Paintings and the marketplace photo have no overlay type. Header wordmark max-height 48px, unclipped. 44px tap targets.
