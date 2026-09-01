// Stores "remind me when tickets open" signups in a KV namespace.
// Bind a KV namespace called SUBSCRIBERS to this Pages project to enable it;
// until then the endpoint reports configured: false and the form tells
// visitors to email the team instead.

function json(data, status = 200) {
  return Response.json(data, { status });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  if (!env.SUBSCRIBERS) {
    return json({ configured: false, error: "Signups are not open yet." }, 503);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill every field; humans never see this one.
  if (payload?.website) {
    return json({ ok: true });
  }

  const email = String(payload?.email || "")
    .trim()
    .toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const key = `email:${email}`;
  const existing = await env.SUBSCRIBERS.get(key);
  if (!existing) {
    await env.SUBSCRIBERS.put(
      key,
      JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
    );
  }
  return json({ ok: true });
}
