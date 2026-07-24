import { NextResponse } from "next/server";
import { verifySession } from "../../../../lib/session";
import { getTrainingProgress, setTrainingProgress } from "../../../../lib/kv";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const moduleNum = await getTrainingProgress(payload.email);
  return NextResponse.json({ moduleNum: moduleNum || null });
}

export async function POST(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const moduleNum = Number(body.moduleNum);
  if (!moduleNum || moduleNum < 1 || moduleNum > 8) {
    return NextResponse.json({ error: "Invalid module number." }, { status: 400 });
  }

  await setTrainingProgress(payload.email, moduleNum);
  return NextResponse.json({ ok: true });
}
