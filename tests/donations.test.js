import { test, mock } from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import { onRequestPost as checkout } from "../functions/api/checkout.js";
import { onRequestGet as config } from "../functions/api/donate-config.js";
import { onRequestPost as webhook } from "../functions/api/stripe-webhook.js";

const env = { STRIPE_DONATIONS_ENABLED: "true", STRIPE_SECRET_KEY: "sk_test_fake", STRIPE_DONATION_PRODUCT_ID: "prod_test", STRIPE_WEBHOOK_SECRET: "whsec_test", STRIPE_PORTAL_URL: "https://billing.stripe.com/p/login/test" };
const payload = { amount: 2550, frequency: "once", requestId: "12345678-1234-1234-1234-123456789abc" };
function request(body = payload, origin = "https://example.org") {
  return new Request("https://example.org/api/checkout", { method: "POST", headers: { Origin: origin }, body: JSON.stringify(body) });
}

for (const frequency of ["once", "monthly", "annual"]) {
  test(`${frequency}: custom cents, shared product, correct recurrence, retry protection`, async () => {
    let calls = [];
    const fetch = mock.method(globalThis, "fetch", async (url, options) => {
      calls.push(options);
      return Response.json({ url: "https://checkout.stripe.com/c/pay/test" });
    });
    try {
      const body = { ...payload, frequency };
      assert.equal((await checkout({ request: request(body), env })).status, 200);
      await checkout({ request: request(body), env });
      const params = calls[0].body;
      assert.equal(params.get("mode"), frequency === "once" ? "payment" : "subscription");
      assert.equal(params.get("line_items[0][price_data][product]"), "prod_test");
      assert.equal(params.get("line_items[0][price_data][unit_amount]"), "2550");
      assert.equal(params.get("line_items[0][price_data][recurring][interval]"), { monthly: "month", annual: "year" }[frequency] ?? null);
      assert.equal(params.get("payment_method_collection"), frequency === "once" ? null : "always");
      assert.equal(params.has("payment_method_types"), false);
      assert.equal(calls[0].headers["Idempotency-Key"], calls[1].headers["Idempotency-Key"]);
    } finally { fetch.mock.restore(); }
  });
}

test("invalid amounts/frequencies/IDs and cross-origin requests never reach Stripe", async () => {
  const fetch = mock.method(globalThis, "fetch", () => { throw Error("Unexpected Stripe request"); });
  try {
    for (const amount of [0, 99, 100001, -100, 100.5, "500", null]) {
      assert.equal((await checkout({ request: request({ ...payload, amount }), env })).status, 400);
    }
    assert.equal((await checkout({ request: request({ ...payload, frequency: "quarterly" }), env })).status, 400);
    assert.equal((await checkout({ request: request({ ...payload, requestId: "bad" }), env })).status, 400);
    assert.equal((await checkout({ request: request(payload, "https://attacker.test"), env })).status, 403);
    assert.equal(fetch.mock.callCount(), 0);
  } finally { fetch.mock.restore(); }
});

test("configuration fails closed; public endpoint exposes no keys", async () => {
  for (const name of Object.keys(env)) {
    const incomplete = { ...env, [name]: "" };
    assert.equal((await config({ env: incomplete }).then(r => r.json())).configured, false);
    assert.equal((await checkout({ request: request(), env: incomplete })).status, 503);
  }
  const response = await config({ env });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  const body = await response.text();
  assert.equal(body.includes("sk_test_fake"), false);
  assert.equal(body.includes("whsec_test"), false);
  assert.equal((await config({ env: { ...env, STRIPE_PORTAL_URL: "https://bad.example/p/login/test" } }).then(r => r.json())).portalUrl, null);
});

test("Stripe/network errors show a safe, recoverable error", async () => {
  const log = mock.method(console, "error", () => {});
  let fetch;
  try {
    fetch = mock.method(globalThis, "fetch", async () => Response.json({ error: { message: "secret details" } }, { status: 400 }));
    const response = await checkout({ request: request(), env });
    assert.equal(response.status, 502);
    assert.equal((await response.text()).includes("secret details"), false);
    fetch.mock.restore();
    fetch = mock.method(globalThis, "fetch", async () => { throw Error("network unavailable"); });
    assert.equal((await checkout({ request: request(), env })).status, 502);
  } finally { fetch?.mock.restore(); log.mock.restore(); }
});

function signedRequest(type, object, options = {}) {
  const body = JSON.stringify({ id: "evt_test", type, data: { object } });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload: body, secret: env.STRIPE_WEBHOOK_SECRET, ...options });
  return new Request("https://example.org/api/stripe-webhook", { method: "POST", headers: { "stripe-signature": signature }, body });
}

test("webhook rejects forged and stale signatures", async () => {
  for (const options of [{ secret: "wrong" }, { timestamp: 1 }]) {
    assert.equal((await webhook({ env, request: signedRequest("invoice.paid", { id: "in_test" }, options) })).status, 400);
  }
});

test("signed events distinguish pending/paid/failure/cancellation and omit donor data", async () => {
  const log = mock.method(console, "log", () => {});
  try {
    for (const [type, status, expected] of [
      ["checkout.session.completed", "unpaid", "pending"],
      ["checkout.session.completed", "paid", "paid"],
      ["checkout.session.async_payment_succeeded", "paid", "paid"],
      ["invoice.paid", "paid", "paid"],
      ["invoice.payment_failed", "unpaid", "payment_failed"],
      ["customer.subscription.deleted", "canceled", "canceled"],
    ]) {
      const object = { id: "obj_test", payment_status: status, customer_email: "private@example.org" };
      assert.equal((await webhook({ env, request: signedRequest(type, object) })).status, 200);
      assert.equal(log.mock.calls.at(-1).arguments[1].outcome, expected);
    }
    assert.equal(JSON.stringify(log.mock.calls).includes("private@example.org"), false);
    // Duplicate deliveries do not send emails or mutate financial records.
    assert.equal((await webhook({ env, request: signedRequest("invoice.paid", { id: "obj_test" }) })).status, 200);
  } finally { log.mock.restore(); }
});
