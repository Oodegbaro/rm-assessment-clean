import Script from "next/script";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/session";
import { TRAINING_MARKUP } from "../../lib/trainingMarkup";
import TrainingTopBar from "./TrainingTopBar";

export default async function TrainingPage() {
  const token = cookies().get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    redirect("/login");
  }

  return (
    <>
      <link rel="stylesheet" href="/training-engine.css" />
      <TrainingTopBar />
      <div dangerouslySetInnerHTML={{ __html: TRAINING_MARKUP }} />
      <Script src="/training-engine.js" strategy="afterInteractive" />
    </>
  );
}
