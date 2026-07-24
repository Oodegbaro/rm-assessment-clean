// Lightweight signed-cookie session, no database round-trip needed to check a session.
// Payload: { email, iat }. Signature: HMAC-SHA256 with SESSION_SECRET.
// This is a browser-session cookie (no Max-Age set), so it disappears when the
// browser is fully closed. It does NOT expire on its own otherwise, since the
// requirement was "just the one session" rather than a fixed time window.
//
// Uses Web Crypto (crypto.subtle) rather than Node's `crypto` module, because
// this code runs both in Node API routes AND in Edge middleware, and Edge
// does not support Node's crypto module.

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function base64url(bytes) {
  const base64 = Buffer.from(bytes).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlToBytes(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return new Uint8Array(Buffer.from(base64, "base64"));
}

async function getKey() {
  const secret = getSecret();
  const enc = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function signSession(payload) {
  const key = await getKey();
  const bodyStr = JSON.stringify(payload);
  const bodyB64 = base64url(new TextEncoder().encode(bodyStr));
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(bodyB64));
  const sigB64 = base64url(new Uint8Array(sigBuf));
  return `${bodyB64}.${sigB64}`;
}

export async function verifySession(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [bodyB64, sigB64] = token.split(".");
  if (!bodyB64 || !sigB64) return null;
  try {
    const key = await getKey();
    const sigBytes = base64urlToBytes(sigB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(bodyB64)
    );
    if (!valid) return null;
    const bodyStr = new TextDecoder().decode(base64urlToBytes(bodyB64));
    return JSON.parse(bodyStr);
  } catch {
    return null;
  }
}

export async function makeUserSessionToken(email) {
  return signSession({ email, iat: Date.now() });
}

export async function makeAdminSessionToken() {
  return signSession({ admin: true, iat: Date.now() });
}

