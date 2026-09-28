# Stripe donation integration

Updated September 28, 2026. Implementation is on `codex/recurring-donations`.
Preview: https://codex-recurring-donations.journey-through-bethlehem.pages.dev/donate

## Implemented

- Frequency first: one-time, monthly, annual; suggested $25/$50/$100 or a custom USD amount from $1 to $1,000.
- Clear recurring-charge summary before redirecting to Stripe-hosted Checkout.
- One reusable product with inline prices: payment mode for one-time gifts, subscription mode with month/year intervals for recurring gifts. No quarterly option or duplicated products.
- Server-side amount/frequency validation, same-origin checks, idempotency for retries, safe errors, and fail-closed configuration.
- Donor portal link for payment-method updates and cancellation.
- Signed webhook receiver: pending versus paid Checkout events, recurring invoice success/failure, subscription changes/cancellations. Logs contain event/object IDs and status only.
- Stripe remains the financial source of truth; webhook logs are operational, not an accounting ledger. Do not sum Checkout and invoice notifications, which overlap. No automated donor acknowledgements or Google Sheets writes have been added.
- Success page does not treat a browser redirect as proof of payment.

## Live Stripe configuration completed

Account: `acct_1UBQqsEf2RYKO6o9` (Faith and Fellowship Foundation).
Existing product `prod_VLRjXYQey9n2XO` renamed to **Donation to Faith and Fellowship Foundation**. Its existing default price is preserved; the website supplies the chosen amount and frequency explicitly.

Portal configuration: `bpc_1UKlBnEf2RYKO6o9lrGVWpUx`.
Portal: https://billing.stripe.com/p/login/6oU3cvbWr8H2e9V5JR04800
Donors can update name/email/payment methods, view invoices, and cancel immediately with no prorations. Cancellation stops future gifts; it does not refund past donations. Plan switching is disabled. Portal return URL is the current public JtB donation page.

No charges, subscriptions, or test donors were created in live mode. Six live Checkout Sessions (two sets covering all three frequencies) were created to verify the actual application code against Stripe and immediately expired without payment.

### Connection completed

- Restricted key `FFF website donations — Cloudflare`: Checkout Sessions write, Prices write, Products read. Stored encrypted as `STRIPE_SECRET_KEY` in preview and production; not committed or saved locally.
- Live webhook `we_1UKleVEf2RYKO6o9IolJsMw3` registered at the preview URL's `/api/stripe-webhook`, with signing secret encrypted in preview.
- Actual application Checkout requests returned HTTP 200 for one-time/payment, monthly/subscription, and annual/subscription; $1 amount/currency verified, sessions expired successfully. This verifies credentials and API compatibility, not card settlement or renewals.
- Deployed webhook: synthetic signed connection event returned HTTP 200; invalid signature returned HTTP 400. This was an ignored diagnostic event, not a donation record or proof of Stripe event delivery.
- Dashboard shows Payments/Payouts active, but also an overdue **Provide an external account** task and business information **In review**. Resolve the bank task before public launch.
- Giving remains disabled; no public domain cutover has occurred.

## Required before accepting gifts

1. Connect a Stripe sandbox/test environment and create its donation product and portal. The plugin currently exposes only the live account. Use sandbox IDs and keys together; never mix modes.
2. DONE for live mode: restricted key saved as Cloudflare Pages secret `STRIPE_SECRET_KEY`; Checkout creation and expiration verified. Add a separate sandbox key when testing payments. Do not put secrets in source, browser JavaScript, or chat. Hosted Checkout does not need a publishable key.
3. DONE for live preview: `/api/stripe-webhook` registered. Register the final production URL separately before cutover. Subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   Store that endpoint's signing secret as Cloudflare secret `STRIPE_WEBHOOK_SECRET`.
4. Set the matching public `STRIPE_DONATION_PRODUCT_ID` and `STRIPE_PORTAL_URL`. Wrangler configuration owns preview variables; dashboard edits to these plain variables can be overwritten at deploy. Preview contains live identifiers and both required secrets, but giving is disabled. Production has the API secret only and needs its final webhook and public variables.
5. In the test deployment only, enable `STRIPE_DONATIONS_ENABLED="true"` and redeploy. Verify one-time/monthly/annual Checkout with preset and custom amounts, successful/declined/asynchronous payments, signed webhook deliveries, renewals, and donor-portal cancellation. Confirm current account API compatibility with `ui_mode=hosted_page` and name collection. No API version override is specified.
6. Verify Stripe successful-payment receipts, recurring-payment failure emails, account verification, RBFCU payouts, and nonprofit pricing. None of those settings was verified by this implementation. Receipt email is not a substitute for the foundation's annual acknowledgement process.
7. Have Reed reconcile Stripe exports to Google Sheets/bank deposits. Use unique Stripe payment IDs, gross amounts, fees, refunds, and net payouts; never count webhook deliveries as gifts. Monitor failed payments/disputes in Stripe Dashboard; webhook logs alone do not notify the treasurer.
8. Configure the production environment separately, using live credentials and its own signing secret. Enable giving only after verification. Public JtB remains on Squarespace until Reed explicitly authorizes the domain cutover. Update FFF donation links when the new donation URL is live.

## Checkout configuration

Preserves the supplied Checkout Studio choices: hosted page, automatic billing-address collection, phone collection, individual name required, business name optional, automatic tax disabled, no promotion codes, submit type auto, origin web, integration identifier `hosted_web_0002`; payment-method collection always for subscriptions only. Payment methods remain managed in Stripe rather than hardcoded. Existing success/cancel routes remain.

## Verification

- `npm test`: 8 tests pass: interval/mode mapping, custom cents, shared product, retries, input/origin rejection, fail-closed config, error privacy, webhook signatures/age and event outcomes.
- `npm run build`: successful Astro static build.
- Cloudflare successfully compiled/deployed Pages Functions.
- Browser verified annual selection and annual recurring-charge disclosure on deployed preview.
- Real Stripe Checkout creation/expiration and deployed webhook signature checks pass. Payment settlement, renewal, receipt delivery, portal cancellation, and real Stripe webhook delivery tests remain outstanding. No end-to-end payment success is claimed.
- Existing dependency audit reports five issues (including critical Astro and high sharp/tooling advisories). This change adds Stripe but does not upgrade the existing framework. Review/update dependencies before public cutover; the deployed site uses a static build, not Astro SSR.

## References

- https://docs.stripe.com/api/checkout/sessions/create
- https://docs.stripe.com/billing/subscriptions/webhooks
- https://docs.stripe.com/webhooks/signature
- https://docs.stripe.com/customer-management
