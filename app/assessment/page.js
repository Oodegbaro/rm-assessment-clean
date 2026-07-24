import Script from "next/script";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutBar from "./LogoutBar";
import { verifySession } from "../../lib/session";
import { getTrainingComplete } from "../../lib/kv";

export default async function AssessmentPage() {
  const token = cookies().get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    redirect("/login");
  }

  const training = await getTrainingComplete(payload.email);
  if (!training) {
    redirect("/training");
  }

  return (
    <>
      <link rel="stylesheet" href="/quiz-engine.css" />
      <LogoutBar />
      <div id="app" />
      <Script src="/quiz-engine.js" strategy="afterInteractive" />
    </>
  );
}
