import Stripe from "stripe";
import { json } from "../../lib/donations.js";

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) return json({ error: "Not configured" }, 503);
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await request.text(), request.headers.get("stripe-signature"),
      env.STRIPE_WEBHOOK_SECRET, undefined, Stripe.createSubtleCryptoProvider(),
    );
  } catch { return json({ error: "Invalid signature" }, 400); }

  const object = event.data.object;
  let outcome;
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      outcome = object.payment_status === "paid" ? "paid" : "pending";
      break;
    case "checkout.session.async_payment_failed":
    case "invoice.payment_failed": outcome = "payment_failed"; break;
    case "invoice.paid": outcome = "paid"; break;
    case "customer.subscription.updated": outcome = object.status; break;
    case "customer.subscription.deleted": outcome = "canceled"; break;
    default: return json({ received: true });
  }
  // Operational visibility only. Stripe is the financial system of record;
  // these events must never be summed as donations (Checkout + Invoice overlap).
  // No donor details, card data, emails, or raw payloads are logged.
  // Delivery retries are harmless: there are no emails or financial mutations here.
  console.log("stripe_donation_event", { eventId: event.id, type: event.type, objectId: object.id, outcome });
  return json({ received: true });
}
