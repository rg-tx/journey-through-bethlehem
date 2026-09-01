const MIN_CENTS = 100;
const MAX_CENTS = 100000;

function json(data, status = 200) {
  return Response.json(data, { status });
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) {
    return json({ configured: false, error: "Donations are not open yet." }, 503);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const amount = Number(payload?.amount);
  const frequency = payload?.frequency;
  if (!Number.isInteger(amount) || amount < MIN_CENTS || amount > MAX_CENTS) {
    return json({ error: "Enter an amount between $1 and $1,000." }, 400);
  }
  if (!["once", "monthly", "quarterly"].includes(frequency)) {
    return json({ error: "Choose a donation frequency." }, 400);
  }

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams();
  const recurring = frequency !== "once";
  params.set("mode", recurring ? "subscription" : "payment");
  params.set("success_url", `${origin}/donate/success`);
  params.set("cancel_url", `${origin}/donate/cancel`);
  params.set("billing_address_collection", "auto");
  if (!recurring) params.set("submit_type", "donate");
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(amount));
  params.set(
    "line_items[0][price_data][product_data][name]",
    "Gift to Faith & Fellowship Foundation",
  );
  params.set(
    "line_items[0][price_data][product_data][description]",
    "Journey Through Bethlehem and year-round community service",
  );
  if (frequency === "monthly") {
    params.set("line_items[0][price_data][recurring][interval]", "month");
  }
  if (frequency === "quarterly") {
    params.set("line_items[0][price_data][recurring][interval]", "month");
    params.set("line_items[0][price_data][recurring][interval_count]", "3");
  }

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const session = await stripeRes.json();
  if (!stripeRes.ok || !session.url) {
    return json(
      { error: session?.error?.message || "Stripe checkout could not start." },
      502,
    );
  }
  return json({ url: session.url, configured: true });
}
