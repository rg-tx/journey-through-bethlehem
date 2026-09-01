# Content the organizers should confirm or supply

The site avoids stating facts it can't stand behind. These answers are
currently written conservatively (or point to email); replace them with
specifics when confirmed.

- **Walk duration** — the FAQ doesn't state a length. Add "plan about X
  minutes" to the "What is Journey Through Bethlehem?" answer once timed.
- **Parking** — FAQ says directions will be posted before opening night.
  Add the actual lots/route when decided.
- **Weather policy** — FAQ promises updates here and via Ticket Tailor.
  Confirm that's the real channel.
- **Wheelchair/stroller specifics** — FAQ invites email. If the route is
  fully accessible, say so outright.
- **EIN** — the donate page cites 501(c)(3) status but no EIN. Add it to
  the "Where your gift goes" block for donor-trust (and matching-gift
  lookups).
- **Mailing address for checks** — donate page routes check donors to
  email; add the address if you'd rather publish it.
- **SignUpGenius links** — swap the m.signupgenius.com URLs in
  `src/data/event.ts` for the canonical www.signupgenius.com share links
  (the m. versions force the mobile UI on desktop).
- **Per-showtime Ticket Tailor links** — every time chip has an optional
  `url` in `event.showtimes[].slots` and falls back to the series page. Each
  occurrence of a recurring Ticket Tailor event has its own page (dashboard →
  the date → Share, or `GET /v1/event_series/{id}/events` → `url`). Paste
  those in so a tap lands on the exact showtime. Ticket Tailor's site blocks
  automated fetches, so this could not be verified from here.
- **Cookie / privacy notice** — copy in `src/components/Consent.astro` says
  the site sets no tracking cookies. Keep that true, or update the copy if
  analytics are ever added.
