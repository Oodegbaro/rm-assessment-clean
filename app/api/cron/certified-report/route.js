import { NextResponse } from "next/server";
import { getAllParticipants } from "../../../../lib/kv";
import { sendCertifiedReportEmail } from "../../../../lib/mailer";

export async function GET(req) {
  // Vercel automatically sends "Authorization: Bearer <CRON_SECRET>" when it
  // triggers this on schedule, if CRON_SECRET is set as an env var. If it's
  // set, we require it -- this stops anyone else from hitting this URL and
  // spamming the report on demand. If it's not set, we still run (so a
  // forgotten env var doesn't silently break the whole feature), but that's
  // a real security gap worth closing before this is relied on long-term.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }
  }

  try {
    const participants = await getAllParticipants();
    const certified = participants
      .filter((p) => p.assessment?.passed)
      .map((p) => ({ email: p.email, pct: p.assessment.pct, savedAt: p.assessment.savedAt }));

    const result = await sendCertifiedReportEmail(certified);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Certified report cron failed:", err);
    return NextResponse.json({ error: "Report failed to send." }, { status: 500 });
  }
}
