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
- **Per-showtime Ticket Tailor links** — time chips currently deep-link to
  the series page. If Ticket Tailor exposes per-occurrence URLs, wire them
  into `event.showtimes`.
- **Email capture** — bind a KV namespace named `SUBSCRIBERS` to the Pages
  project to activate the form (see wrangler.toml), and decide who mails
  the list when tickets open.
