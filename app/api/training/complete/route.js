import { NextResponse } from "next/server";
import { verifySession } from "../../../../lib/session";
import { setTrainingComplete } from "../../../../lib/kv";

export async function POST(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  await setTrainingComplete(payload.email);
  return NextResponse.json({ ok: true });
}
