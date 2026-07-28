import { NextResponse } from "next/server";
import { verifySession } from "../../../../lib/session";
import { setModuleComplete, getModuleProgress } from "../../../../lib/kv";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const completedModules = await getModuleProgress(payload.email);
  return NextResponse.json({ completedModules });
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

  const moduleNum = Number(body.module);
  if (!moduleNum || moduleNum < 1 || moduleNum > 7) {
    return NextResponse.json({ error: "Invalid module number." }, { status: 400 });
  }

  // Enforce the same sequential rule the middleware checks before letting
  // anyone reach a module file -- belt and suspenders. A module can only be
  // credited if every module before it is already done.
  const existing = await getModuleProgress(payload.email);
  const priorRequired = Array.from({ length: moduleNum - 1 }, (_, i) => i + 1);
  const missingPrior = priorRequired.filter((n) => !existing.includes(n));
  if (missingPrior.length > 0) {
    return NextResponse.json(
      { error: `Module ${moduleNum} can't be recorded before module ${missingPrior[0]} is complete.` },
      { status: 400 }
    );
  }

  const result = await setModuleComplete(payload.email, moduleNum);
  return NextResponse.json({ ok: true, ...result });
}
