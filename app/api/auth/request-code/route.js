import { NextResponse } from "next/server";
import { setLoginCode, canRequestCode } from "../../../../lib/kv";
import { sendLoginCodeEmail } from "../../../../lib/mailer";

function isBcgEmail(email) {
  return typeof email === "string" && /^[^\s@]+@bcg\.com$/i.test(email.trim());
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();

  if (!isBcgEmail(email)) {
    return NextResponse.json(
      { error: "Please use an email address ending in @bcg.com." },
      { status: 400 }
    );
  }

  const allowed = await canRequestCode(email);
  if (!allowed) {
    return NextResponse.json(
      { error: "A code was just sent. Please wait a moment before requesting another." },
      { status: 429 }
    );
  }

  const code = generateCode();
  await setLoginCode(email, code);

  try {
    await sendLoginCodeEmail(email, code);
  } catch (err) {
    console.error("Failed to send login email:", err);
    return NextResponse.json(
      { error: "Couldn't send the email. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
