# Journey Through Bethlehem — Design Review & Elevation Plan

> **Redesign pass (2026-09-01, branch `claude/fable-redesign`):** a second, holistic pass on top of this plan — invitation diptych hero, the Walk rebuilt as a route, interior title cards, engraved type system. Notes and before/after screenshots: `docs/artifacts/2026-09/design/redesign-notes.html`.
>
> **Execution status (2026-09-01):** all four phases below are implemented on this branch. The result passed a functional QA audit (state machine verified at four mocked dates, 332 KB cold home load, zero axe violations) and two rounds of adversarial design review, with a PASS verdict in round two. Facts still owed by organizers are tracked in `CONTENT-TODO.md`.

**Reviewed:** the public site on branch `cursor/jtb-public-site-b3ba` (commit `045267f`), built and audited on 2026-09-01.
**Method:** four independent expert reviews — (1) visual design & brand, (2) UX / conversion / information architecture, (3) accessibility, mobile & performance (with axe-core, keyboard testing, and measured page weights against the built site), and (4) front-end craft & motion — each working from the source, the running build, and full-page desktop (1440px) and mobile (390px) screenshots of every page. This document is the synthesis.

---

## 1. Executive summary

The foundation is genuinely good and should be protected: a coherent paper-and-ink palette sampled from the commissioned paintings, an invitation-card hero that reads like letterpress, task-based navigation that maps exactly to the three user journeys (attend / volunteer / donate), honest ticketing copy, native accessible widgets, and AA contrast throughout. This is already better than most community-event sites.

Three things stand between it and exceptional:

1. **It's heavy and partly broken for its real audience.** The home page ships **5.65 MB** (a 1.35 MB PNG is the LCP image) to families on phones. The live "Get tickets" button points at an unpublished Ticket Tailor listing, and for the two months before November 1 the site captures no interest at all — no email signup, no reminder path.
2. **It never answers the family's questions or tells the story.** Nothing says what the walk actually *is* (duration, outdoor, live animals, parking, strollers), and internal scaffolding copy ("Stripe is not connected yet", "no others added") leaks into production, eroding trust exactly where donations are asked for.
3. **The night is missing.** This is a candlelit night walk in December, and the site is a static daytime cream document. The night-sky painting — the most evocative asset owned — is a dead decorative band. The path to "a totally new level" is a clear creative direction all four reviews converged on: **a nocturne you scroll through** — the website *is* the walk.

The plan below is sequenced against the real calendar: fixes now → conversion content by October → the signature experience live for the **November 1 ticket launch** → event mode December 3–6 → post-event mode after.

---

## 2. What's already strong (keep it)

- **The invitation-card hero** ("Celebrate the birth of / **Christ** / at a free community event" with hairline rules, tappable address, single CTA, honest "Tickets open November 1" note). The site's best moment and the right emotional register.
- **The painting-dissolves-into-paper device** (`hero-art::after`) — the artwork becomes the page. The signature move; it just needs refinement, not replacement.
- **Palette & type**: paper `#f7f5f1`, umber ink, slate-teal accent; Playfair Display / PT Serif / Tenor Sans reads like a printed invitation.
- **Accessibility fundamentals** (verified): axe-core is clean apart from one violation site-wide; working skip link; native `<details>` accordions; real buttons with labels; 44px tap targets; excellent human-written alt text; AA contrast on every measured pair; no text ever laid over artwork.
- **Honest handoffs**: "We do not take payment for tickets on this site"; donation form fails safe when Stripe is unconfigured; real success/cancel pages; accommodation info at the point of reservation.
- **Voice**: "This page is not on the map." (404) — someone thought about tone. Extend that voice everywhere.

---

## 3. North star: a nocturne you scroll through

The exceptional version of this site rehearses the event itself. It opens at dusk in the painting's pastels with the invitation typography doing exactly what it does now. As you scroll, the night-sky painting takes over and the page genuinely goes dark — deep spruce-blue ground, the comet and stars from the artwork, showtimes glowing like windows in Bethlehem. A single candle-gold accent (sampled from the painted star, ~`#c9a04e`) threads through kickers, rules, and the star mark. Photos of real neighbors appear as warm, matted vignettes — artifacts brought back from the walk — never competing with the painted world. Every page, even the 404, carries a sliver of painted sky so the spell never breaks, and every page ends at night: a footer strip of stars, the star mark, and one line — *"See you in Bethlehem."*

The palette is three notes played with confidence: **paper, night, and candlelight.** Before reading a word, the visitor should feel what they'll feel standing in line on Trophy Club Drive in December: it's cold, it's dark, and up ahead there's a light.

### The signature build: "The Walk" as a scroll-told night journey

Replace the static night-sky band + photo carousel with one continuous scene (`WalkJourney.astro`):

- A ~400–500vh wrapper; the night-sky painting is `position: sticky; top: 0; height: 100dvh` — the fixed backdrop the journey plays against, with a subtle twinkling-star layer.
- Five station panels rise through the night as you scroll: **Marketplace → Choir → The Road → Shepherds → The Stable.** Each is a photo in an arched "doorway" frame with the station name in Playfair and one line of copy ("Hear the choir before you see it.").
- A thin SVG path draws itself between stations (`stroke-dashoffset` on a scroll timeline), echoing the route visitors walk; the sky deepens and the star brightens as you approach the stable.
- **The climax breaks the pattern**: the final station is the nativity painting, full-bleed, star at full brightness, with the sequence's only CTA — "Reserve your night."
- Built with CSS scroll-driven animations (`animation-timeline: view()/scroll()`) behind `@supports`, a ~30-line IntersectionObserver fallback, no libraries. With `prefers-reduced-motion` or no JS it degrades to today's stacked cards. Works *better* on phones than the current clipped carousel.
- Taste guardrails: no audio, no snow, no cursor effects; parallax amplitude under 10%; stars breathe, never blink; the paintings stay the heroes and the motion gets out of the way of the button.

---

## 4. The plan

### Phase 0 — Fix now (bugs, weight, trust) · ~2–3 days

The audit's measured, verified problems. Every item here is small and high-certainty.

**Performance (the single biggest win on the site):**
1. Re-encode the three painting PNGs. `nativity-hero.png` (1,351 KB), `night-sky.png` (1,409 KB), `nativity-scene-2.png` (1,330 KB) re-encode to **42–80 KB each** as WebP/JPEG q80 with no visible loss (verified with sharp). One change in `scripts/optimize-images.mjs`: route painterly art to photo encoding; keep PNG only for wordmark/logos. Home page images: 5.6 MB → ~1.5 MB.
2. Add `loading="lazy" decoding="async"` to every below-fold image (currently zero on the site) and `fetchpriority="high"` on the hero. Initial load drops to ~300 KB.
3. Serve the header wordmark at rendered size (currently a 115 KB 2000px PNG shown at ≤56px on every page).

**Broken/misleading states:**
4. Gate the "Get tickets" button on `ticketsOpenIso` — it currently deep-links to an unpublished Ticket Tailor listing (empty page). Pre-launch it should be demoted/disabled in favor of email capture (Phase 1).
5. Fix the `ticketsOpenIso` UTC offset bug in `src/data/event.ts` (midnight Nov 1, 2026 in Chicago is CDT `-05:00`, not `-06:00`) — harmless until anything counts down to it.
6. Style the dead showtime "chips" on /tickets as plain text pre-launch (they look tappable and aren't; 18 fake buttons on mobile). Once live, deep-link each to Ticket Tailor.

**Trust & copy:**
7. Purge internal scaffolding language from production: "This form is ready for Faith & Fellowship Foundation's Stripe account", "Stripe is not connected yet", "The series is not on sale yet. When it is published…", "no others added" (partners), "Reservations are Ticket Tailor". Rewrite in visitor voice ("Online giving opens soon — check back in November.").
8. Reconcile the ASL contradiction (home says Friday 7 PM only; tickets says Friday 7 PM **and** every Sat/Sun showtime) — drive accommodations from a single source in `event.ts`. This matters most to the Deaf visitors the feature exists for.
9. Reconcile giving copy: home/get-involved say monetary gifts "not open yet" while /donate shows a full form.

**Accessibility (clears every audited issue):**
10. `tabindex="0" role="group" aria-label="Stations of the walk"` on `.walk-track` — the site's only axe violation (keyboard-only Safari users can't scroll it).
11. `aria-pressed` on donate amount/frequency toggles (selection is currently visual-only to screen readers) + `:focus-visible` and `[aria-pressed=true]` styles that survive High Contrast mode.
12. A `prefers-reduced-motion` block (none exists) covering smooth scroll and the carousel JS.
13. Mobile menu: close on Escape and outside click; return focus to the toggle.

### Phase 1 — Conversion & content (by early October) · ~1 week

The UX review's verdict: the site's biggest losses are informational, not visual.

1. **Email capture — the highest-leverage change on the site.** "Email me when reservations open" as the primary CTA on home and /tickets until Nov 1, plus an add-to-calendar link. The privacy policy already anticipates newsletter signups; the entire Sept–Oct interest window currently converts nothing.
2. **"Plan your visit" FAQ** (on /tickets or its own page): how long the walk takes, that it's outdoor (weather/cold policy), parking, strollers & wheelchairs on the route, live animals (a camel appears in photos with zero explanation), ages, food/restrooms, what "reserving a showtime" means operationally, what happens if a night is full.
3. **Tell the story in one paragraph.** "The walk" is five photos with two-word captions; it never says *"a 30-minute outdoor walking tour through a recreated Bethlehem with live actors and animals, ending at the stable."* The experience is the product and it's currently untold.
4. **Volunteer page substance**: 4–6 role categories with time commitment, "no experience needed, costumes provided" reassurances, youth age range, a human contact. Replace raw `m.signupgenius.com` links with canonical URLs. The current entire youth pitch is one sentence.
5. **Donate trust & anchoring**: add EIN, link to the Foundation's site (already in `event.ts`, unused), 2–3 impact bullets ("$100 costumes a family of shepherds"), a mailing address for checks. Default-select **$50, not $10** (the current default anchors gifts down). For amounts over the $1,000 cap, show "For larger gifts, email team@…" instead of an error that turns a major donor away.
6. **Contact route**: `team@journeythroughbethlehem.org` exists in `event.ts` but only ever appears in the privacy policy. Put it in the footer.
7. **Un-hide the content**: homepage "Get involved" is three closed accordion rows hiding all the warmth — replace with three visible photo cards. Open the first showtimes night by default; reword "go to the full table" → "see the full schedule".
8. **IA touches**: Partners linked from a homepage strip + footer (header stays 3 items); "The walk" renamed "What to expect"; surface "3rd annual" (`event.annual`, defined but never rendered) as social proof.

### Phase 2 — Design elevation (October) · ~1.5–2 weeks

The brand and craft reviews, merged. This is where the site starts feeling designed rather than assembled.

**The night system:**
1. Introduce one **dark passage** on the homepage: set Showtimes (or The Walk) inside the night-sky painting — `--sky #1c2a30` ground, stars behind, times as softly glowing chips, warm off-white headings. Gives the homepage the dusk-to-night arc the event has, and gives the dead sky band a job.
2. **Footer as a closing scene** on every page: a top-masked strip of the night sky, the star mark, "See you in Bethlehem." above the link columns. Open in daylight, close under stars.
3. Add the missing third color: a **candle-gold token** (~`#c9a04e`, sampled from the painted star) used sparingly — kickers, the star icon, rules on dark sections. Move headings to a more confident near-black warm ink.

**Artwork & photography:**
4. Fix the hero crop/fade: the current gradient + `object-position: center 55%` dissolves Mary, Joseph, and the manger — the painting's emotional center — into fog. Raise the crop so star and stable sit in the safe zone; replace the single linear gradient with stacked `mask-image` gradients so the dissolve feels hand-feathered, not banded.
5. **Treat paintings as environment, photos as artifacts.** Never full-bleed-and-fade a photo (the get-involved hero currently dissolves a volunteer's body into mist). Frame photos consistently: uniform 4:3, hairline border or paper mat, a slight warm grade to pull the saturated flash photography toward the paintings' palette, Tenor Sans captions.
6. Rebuild the header wordmark in **live type/SVG** — at 48px the script "Journey through" nearly vanishes and the "Presented by" microtype is unreadable mush. Drop the presenter line from the header (footer already credits FFF); live type stays crisp and can invert for dark sections.
7. **Interior pages get a sliver of the painted world** — even a 6–8rem crop of night sky under the header on tickets/donate/partners/privacy; the 404 deserves the star painting behind "This page is not on the map." Standardize H1 voice (currently "Tickets" / "Your support unites us." / "Get involved." / "Our Partners" — four different registers).
8. Partner logos: uniform tiles on `--surface`, normalized optical size, grayscale with color on hover (currently eight logos in eight visual dialects).
9. Social/brand hygiene: default OG image to the existing (good, unused) `og-wordmark.jpg`; adopt the star mark as favicon/touch icon and recurring glyph; add `theme-color`.

**Motion & craft system:**
10. Tokens first: `--ease-out: cubic-bezier(0.22,1,0.36,1)`, two durations, consistent radius; one `data-reveal` IntersectionObserver pattern (~15 lines) for gentle rise-and-fade section reveals, gated behind `html.js` and `prefers-reduced-motion`.
11. Make the night sky live: 12–18 tiny stars breathing on randomized 3–6s opacity keyframes; a slow scroll-driven drift on the painting via `animation-timeline: view()` inside `@supports`. Stars breathe, never blink.
12. Micro-craft pass: button hover lift + real `:focus-visible` rings; animated link underlines; header condenses on scroll with a soft shadow.
13. **View transitions** (`@view-transition { navigation: auto }` or Astro's ClientRouter): a 300ms cross-fade with the header persisted makes the site feel like one continuous place — thematically right for a "journey."

### Phase 3 — The signature experience (ship for the Nov 1 ticket launch) · ~1–1.5 weeks

1. Build **"The Walk" scroll journey** (Section 3) as the homepage centerpiece.
2. **"Nights until Bethlehem"**: under the invitation date, the star mark and a quiet line of type — "94 nights until Bethlehem" — computed from `event.dateStart` with a server-rendered fallback. During Dec 3–6 it becomes "Tonight — 6:00–9:00 PM." No flip-clocks, no ticking seconds.
3. **Site state machine**, driven from `event.ts`: pre-launch (email capture) → tickets open Nov 1 (Get tickets primary, "showtimes fill quickly" urgency, deep-linked time chips) → event week ("Tonight" mode) → post-event (thank-you, photo gallery from the existing `public/images/photos/`, email capture for 2027). Nothing on the site should ever be manually stale.

### Structural (parallel, any time)

- Adopt Astro's `<Image>/<Picture>` asset pipeline instead of `public/` + hand-rolled sharp script — automatic srcset/sizes, AVIF/WebP negotiation, correctly sized mobile variants.
- Add `public/_headers` with `Cache-Control: public, max-age=31536000, immutable` for `/images/*` (Cloudflare Pages currently uses default revalidation for multi-hundred-KB stable URLs).
- Self-host the 2–3 actually-used font weights (subset WOFF2) — removes ~150–250 KB and a render-blocking third-party request, and honors the privacy policy's no-third-party posture.

---

## 5. Sequencing against the calendar

| When | Milestone |
|---|---|
| Now → mid-Sept | Phase 0 (fixes, weight, trust) — small, high-certainty, do first |
| Mid-Sept → early Oct | Phase 1 (email capture, FAQ, story, volunteer/donate content) |
| October | Phase 2 (night system, artwork treatment, motion system) |
| Before **Nov 1** | Phase 3 (The Walk, countdown, state machine) — live for ticket launch |
| Dec 3–6 | Event mode ("Tonight") |
| After Dec 6 | Post-event mode (thanks, gallery, 2027 email capture) |

Everything proposed is static-site-friendly (Astro + Cloudflare Pages), library-free, degrades gracefully without JS or with reduced motion, and respects the two hard constraints: Ticket Tailor checkout is never rebuilt, and Stripe Checkout on the Foundation account handles donations.

---

## Appendix: measured evidence (from the audit)

- Home page cold load at 390px: **5.65 MB transferred, 5.76 MB of images, zero lazy-loading**; LCP element is the 1,351 KB `nativity-hero.png`. Re-encoded test: hero 59 KB WebP / 81 KB JPEG q80, night-sky 42 KB, scene-2 80 KB — visually indistinguishable.
- axe-core across all six pages: one violation total (`scrollable-region-focusable` on `.walk-track`, serious).
- Contrast (computed): ink on paper 6.96:1; white on accent 6.88:1; ink-soft on paper 4.77:1 — all AA.
- Keyboard: skip link works and is first tab stop; accordions toggle with Enter; carousel buttons function; no suppressed focus outlines. Mobile menu does not close on Escape.
- `grep -c 'loading="lazy"' dist/**/*.html` → 0. No `prefers-reduced-motion` rules anywhere. No `_headers` file. Header wordmark: 115 KB, 2000×706, rendered ≤56px.
