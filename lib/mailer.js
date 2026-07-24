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
