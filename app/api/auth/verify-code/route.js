import { NextResponse } from "next/server";
import { getLoginCode, clearLoginCode } from "../../../../lib/kv";
import { makeUserSessionToken } from "../../../../lib/session";

function isBcgEmail(email) {
  return typeof email === "string" && /^[^\s@]+@bcg\.com$/i.test(email.trim());
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const code = (body.code || "").trim();

  if (!isBcgEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "Please enter the code." }, { status: 400 });
  }

  const storedCode = await getLoginCode(email);
  const universalCode = process.env.UNIVERSAL_CODE;
  const usedUniversalCode = universalCode && code === universalCode;

  if (!usedUniversalCode) {
    if (!storedCode) {
      return NextResponse.json(
        { error: "That code has expired. Please request a new one." },
        { status: 400 }
      );
    }
    if (String(storedCode) !== code) {
      return NextResponse.json({ error: "That code isn't right. Please try again." }, { status: 400 });
    }
  }

  await clearLoginCode(email);

  const token = await makeUserSessionToken(email);
  const res = NextResponse.json({ ok: true, email });
  // No maxAge/expires set => browser-session cookie, cleared when the browser fully closes.
  res.cookies.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
