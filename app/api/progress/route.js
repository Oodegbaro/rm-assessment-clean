import { NextResponse } from "next/server";
import { verifySession } from "../../../lib/session";
import { getProgress, setProgress, clearProgress } from "../../../lib/kv";

async function getEmailFromRequest(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) return null;
  return payload.email;
}

export async function GET(req) {
  const email = await getEmailFromRequest(req);
  if (!email) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const progress = await getProgress(email);
  return NextResponse.json({ progress: progress || null });
}

export async function POST(req) {
  const email = await getEmailFromRequest(req);
  if (!email) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  await setProgress(email, body.progress);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const email = await getEmailFromRequest(req);
  if (!email) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  await clearProgress(email);
  return NextResponse.json({ ok: true });
}
