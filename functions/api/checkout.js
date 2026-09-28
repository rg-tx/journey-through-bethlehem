import { donationsConfigured, json } from "../../lib/donations.js";

export async function onRequestPost({ request, env }) {
  if (!donationsConfigured(env)) {
    return json({ configured: false, error: "Donations are not open yet." }, 503);
  }
  const origin = new URL(request.url).origin;
  if (request.headers.get("Origin") !== origin) {
    return json({ error: "Please start your donation from this website." }, 403);
  }
  let payload;
  try { payload = await request.json(); }
  catch { return json({ error: "Invalid request." }, 400); }

  const { amount, frequency, requestId } = payload || {};
  if (!Number.isInteger(amount) || amount < 100 || amount > 100000) {
    return json({ error: "Enter an amount between $1 and $1,000." }, 400);
  }
  if (!["once", "monthly", "annual"].includes(frequency)) {
    return json({ error: "Choose a donation frequency." }, 400);
  }
  if (typeof requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(requestId)) {
    return json({ error: "Please reload the page and try again." }, 400);
  }

  const recurring = frequency !== "once";
  const params = new URLSearchParams({
    mode: recurring ? "subscription" : "payment",
    ui_mode: "hosted_page",
    origin_context: "web",
    integration_identifier: "hosted_web_0002",
    success_url: `${origin}/donate/success`,
    cancel_url: `${origin}/donate/cancel`,
    billing_address_collection: "auto",
    "phone_number_collection[enabled]": "true",
    "automatic_tax[enabled]": "false",
    allow_promotion_codes: "false",
    submit_type: "auto",
    "name_collection[individual][enabled]": "true",
    "name_collection[business][enabled]": "true",
    "name_collection[business][optional]": "true",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(amount),
    "line_items[0][price_data][product]": env.STRIPE_DONATION_PRODUCT_ID,
    "metadata[fund]": "fff",
    "metadata[frequency]": frequency,
  });
  if (recurring) {
    params.set("payment_method_collection", "always");
    params.set("line_items[0][price_data][recurring][interval]", frequency === "monthly" ? "month" : "year");
    params.set("subscription_data[metadata][fund]", "fff");
    params.set("subscription_data[metadata][frequency]", frequency);
  } else {
    params.set("payment_intent_data[metadata][fund]", "fff");
    params.set("payment_intent_data[metadata][frequency]", frequency);
  }

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        // Repeated clicks/network retries for the same choice return the same session.
        "Idempotency-Key": `fff-${requestId}-${amount}-${frequency}`,
      },
      body: params,
      signal: AbortSignal.timeout(15000),
    });
    const session = await response.json();
    if (!response.ok || typeof session.url !== "string" ||
        new URL(session.url).origin !== "https://checkout.stripe.com") {
      console.error("stripe_checkout_failed", { status: response.status, code: session.error?.code });
      return json({ error: "Stripe checkout could not start. Please try again shortly." }, 502);
    }
    return json({ url: session.url });
  } catch {
    return json({ error: "Unable to reach Stripe. Please try again shortly." }, 502);
  }
}
