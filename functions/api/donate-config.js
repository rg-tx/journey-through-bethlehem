import { donationsConfigured, donorPortalUrl, json } from "../../lib/donations.js";

export async function onRequestGet({ env }) {
  return json({ configured: donationsConfigured(env), portalUrl: donorPortalUrl(env) });
}
