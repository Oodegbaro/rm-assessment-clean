import { Resend } from "resend";

let resendClient = null;
function getClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY environment variable is not set");
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendLoginCodeEmail(email, code) {
  const client = getClient();
  const fromAddress = process.env.EMAIL_FROM || "Account Planning Assessment <onboarding@resend.dev>";

  await client.emails.send({
    from: fromAddress,
    to: email,
    subject: `Your login code: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#3626DB;">Account Planning Assessment</h2>
        <p>Here's your one-time login code:</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 4px; color: #12182B;">${code}</p>
        <p style="color:#5B6474; font-size: 14px;">This code expires in 5 minutes. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });
}

// Sends the daily list of everyone currently certified (passed the
// assessment). Does nothing if ADMIN_NOTIFY_EMAIL isn't configured, and does
// nothing if there's currently no one certified -- an empty email every day
// forever isn't useful to anyone.
export async function sendCertifiedReportEmail(certifiedList) {
  const notifyTo = process.env.ADMIN_NOTIFY_EMAIL;
  if (!notifyTo) return { sent: false, reason: "ADMIN_NOTIFY_EMAIL not set" };
  if (!certifiedList || certifiedList.length === 0) {
    return { sent: false, reason: "no one certified yet" };
  }

  const client = getClient();
  const fromAddress = process.env.EMAIL_FROM || "Account Planning Assessment <onboarding@resend.dev>";

  const rows = certifiedList
    .sort((a, b) => b.savedAt - a.savedAt)
    .map(
      (p) => `
      <tr>
        <td style="padding:6px 10px;border-bottom:1px solid #EFF1F5;">${p.email}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #EFF1F5;text-align:right;">${p.pct}%</td>
        <td style="padding:6px 10px;border-bottom:1px solid #EFF1F5;text-align:right;color:#5B6474;">${new Date(p.savedAt).toLocaleDateString()}</td>
      </tr>`
    )
    .join("");

  await client.emails.send({
    from: fromAddress,
    to: notifyTo,
    subject: `Certified RMs \u2014 ${certifiedList.length} total as of ${new Date().toLocaleDateString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
        <h2 style="color:#3626DB; margin-bottom: 4px;">Certified Relationship Managers</h2>
        <p style="color:#5B6474; font-size: 13px; margin-top: 0;">Daily report &middot; ${new Date().toLocaleString()}</p>
        <table style="width:100%; font-size:14px; color:#12182B; border-collapse:collapse;">
          <tr>
            <th style="text-align:left; padding:6px 10px; background:#F7F6FF; color:#3626DB;">Email</th>
            <th style="text-align:right; padding:6px 10px; background:#F7F6FF; color:#3626DB;">Score</th>
            <th style="text-align:right; padding:6px 10px; background:#F7F6FF; color:#3626DB;">Certified on</th>
          </tr>
          ${rows}
        </table>
      </div>
    `,
  });

  return { sent: true, count: certifiedList.length };
}

// Fires the moment someone completes the assessment. Silently does nothing
// if ADMIN_NOTIFY_EMAIL isn't configured -- this is an optional add-on, not
// something that should ever block a real person's completed attempt.
export async function sendCompletionSummaryEmail({ email, pct, total, max, passed }) {
  const notifyTo = process.env.ADMIN_NOTIFY_EMAIL;
  if (!notifyTo) return;

  const client = getClient();
  const fromAddress = process.env.EMAIL_FROM || "Account Planning Assessment <onboarding@resend.dev>";
  const statusLabel = passed ? "Pass" : "Below pass mark";
  const statusColor = passed ? "#0B5F4F" : "#8F2E26";
  const statusBg = passed ? "#E4F6F1" : "#FBEAE8";

  await client.emails.send({
    from: fromAddress,
    to: notifyTo,
    subject: `Assessment completed: ${email} \u2014 ${pct}% (${statusLabel})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#3626DB; margin-bottom: 4px;">Assessment completed</h2>
        <p style="color:#5B6474; font-size: 14px; margin-top: 0;">${new Date().toLocaleString()}</p>
        <table style="width: 100%; font-size: 14px; color: #12182B;">
          <tr><td style="padding: 4px 0; color:#5B6474;">Participant</td><td style="padding: 4px 0; text-align:right; font-weight:700;">${email}</td></tr>
          <tr><td style="padding: 4px 0; color:#5B6474;">Score</td><td style="padding: 4px 0; text-align:right; font-weight:700;">${pct}% (${Math.round(total)} / ${max} points)</td></tr>
          <tr><td style="padding: 4px 0; color:#5B6474;">Result</td><td style="padding: 4px 0; text-align:right;">
            <span style="background:${statusBg}; color:${statusColor}; padding:3px 10px; border-radius:12px; font-weight:700; font-size:12px;">${statusLabel}</span>
          </td></tr>
        </table>
      </div>
    `,
  });
}
