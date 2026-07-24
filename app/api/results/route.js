import { NextResponse } from "next/server";
import { verifySession } from "../../../lib/session";
import { saveResult } from "../../../lib/kv";

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

  const { pct, total, max, bySection, passed } = body;
  if (typeof pct !== "number" || typeof total !== "number" || typeof max !== "number") {
    return NextResponse.json({ error: "Malformed result." }, { status: 400 });
  }

  await saveResult(payload.email, { pct, total, max, bySection, passed });
  return NextResponse.json({ ok: true });
}
