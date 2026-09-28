# Design refinement preview

Preserves the painted night sky, warm paper palette, established fonts, and event photography.

Implemented: always-visible navigation; event dates and reservation opening date in the homepage hero; compact aligned interior banners; quieter schedule lists, photo treatment, and volunteer roles; earlier volunteer actions; deliberate closed donation state with an email alternative and donor portal. The amount/frequency form becomes available only when the server confirms giving is enabled. Removed the obstructive privacy notice; the footer policy link remains.

Corrected approved facts: production before Bethlehem, Sunday ends at 8 p.m., and Thursday–Saturday 9 p.m. performances are production-only. Removed unconfirmed ASL/Spanish/accessibility promises and supplied a contact link. Ticket links still fall back to the existing Ticket Tailor series; copy no longer promises exact occurrence links.

Release work remains: verify Ticket Tailor occurrence links and volunteer sign-ups; confirm accessibility, arrival and parking details; finish Stripe banking/verification, payment lifecycle tests, and production webhook setup; review dependencies and cutover redirects. Donations remain disabled. No domain cutover or main-branch merge is part of this review preview.

Validation: Astro production build, eight donation tests, clean diff whitespace, design detector, and desktop browser review. Browser viewport override did not change the rendered 1280px viewport, so mobile visual confirmation remains outstanding.
