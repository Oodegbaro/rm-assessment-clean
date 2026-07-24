import { kv } from "@vercel/kv";

// ---- Login codes (6-digit, 5 minute expiry) ----
const CODE_TTL_SECONDS = 5 * 60;

export async function setLoginCode(email, code) {
  await kv.set(`code:${email}`, code, { ex: CODE_TTL_SECONDS });
}

export async function getLoginCode(email) {
  return kv.get(`code:${email}`);
}

export async function clearLoginCode(email) {
  await kv.del(`code:${email}`);
}

// Basic per-email request throttling: at most one new code every 30 seconds.
export async function canRequestCode(email) {
  const key = `codecooldown:${email}`;
  const existing = await kv.get(key);
  if (existing) return false;
  await kv.set(key, "1", { ex: 30 });
  return true;
}

// ---- Saved progress ----
export async function getProgress(email) {
  return kv.get(`progress:${email}`);
}

export async function setProgress(email, progress) {
  await kv.set(`progress:${email}`, progress);
}

export async function clearProgress(email) {
  await kv.del(`progress:${email}`);
}

// ---- Training completion ----
export async function setTrainingComplete(email) {
  await kv.set(`training:${email}`, { completedAt: Date.now() });
}

export async function getTrainingComplete(email) {
  return kv.get(`training:${email}`);
}

// ---- Training in-progress module (which module the RM last reached).
// Kept for 30 days, then expires naturally -- this is "resume for a while",
// not permanent storage of exactly where inside a module they were.
const TRAINING_PROGRESS_TTL_SECONDS = 30 * 24 * 60 * 60;

export async function setTrainingProgress(email, moduleNum) {
  await kv.set(`trainingprogress:${email}`, moduleNum, { ex: TRAINING_PROGRESS_TTL_SECONDS });
}

export async function getTrainingProgress(email) {
  return kv.get(`trainingprogress:${email}`);
}

// ---- Results (for the admin view) ----
export async function saveResult(email, result) {
  const record = { email, ...result, savedAt: Date.now() };
  await kv.set(`result:${email}`, record);
  await kv.sadd("result-emails", email);
}

export async function getAllResults() {
  const emails = await kv.smembers("result-emails");
  if (!emails || emails.length === 0) return [];
  const results = await Promise.all(emails.map((e) => kv.get(`result:${e}`)));
  return results.filter(Boolean).sort((a, b) => b.savedAt - a.savedAt);
}
