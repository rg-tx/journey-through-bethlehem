export function donorPortalUrl(env) {
  try {
    const url = new URL(env.STRIPE_PORTAL_URL);
    return url.origin === "https://billing.stripe.com" && url.pathname.startsWith("/p/login/")
      ? url.href : null;
  } catch { return null; }
}

export function donationsConfigured(env) {
  return env.STRIPE_DONATIONS_ENABLED === "true" &&
    Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_DONATION_PRODUCT_ID &&
      env.STRIPE_WEBHOOK_SECRET && donorPortalUrl(env));
}

export function json(data, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
