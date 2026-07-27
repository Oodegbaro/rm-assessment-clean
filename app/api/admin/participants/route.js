import { NextResponse } from "next/server";
import { verifySession } from "../../../../lib/session";
import { getAllParticipants } from "../../../../lib/kv";

export async function GET(req) {
  const token = req.cookies.get("admin_session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.admin) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const participants = await getAllParticipants();
  return NextResponse.json({ participants });
}
