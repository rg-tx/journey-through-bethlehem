export async function onRequestGet({ env }) {
  const configured = Boolean(env.STRIPE_SECRET_KEY);
  return Response.json({
    configured,
    publishableKey: configured ? env.STRIPE_PUBLISHABLE_KEY || null : null,
  });
}
