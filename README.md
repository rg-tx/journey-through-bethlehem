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

Match the live Squarespace theme: paper `#EFEFEE`, ink `#645044`, accent `#395F72`, dark accent `#A1B2B1`, sand `#E4DFD4`. Fonts: Playfair Display, Tenor Sans, PT Serif. Use the event wordmark and real nativity photos.
