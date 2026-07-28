import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/session";
import { getModuleProgress } from "../../lib/kv";
import TrainingTopBar from "./TrainingTopBar";

const MODULES = [
  { num: 1, file: "module-01-wallet-share-mapping.html", title: "Map the Wallet Before the Review" },
  { num: 2, file: "module-02-pipeline-conversion.html", title: "Turn What the Client Said Into a Pipeline Entry" },
  { num: 3, file: "module-03-living-document.html", title: "Keep the Plan Alive Between Reviews" },
  { num: 4, file: "module-04-decision-maker-mapping.html", title: "Map Who Actually Decides" },
  { num: 5, file: "module-05-trigger-events.html", title: "Get There Before the Window Closes" },
  { num: 6, file: "module-06-genai-verification.html", title: "Let AI Draft, You Verify" },
  { num: 7, file: "module-07-tier-based-effort.html", title: "Spend Your Week Where the Value Is" },
];

export default async function TrainingPage() {
  const token = cookies().get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    redirect("/login");
  }

  const completed = await getModuleProgress(payload.email);
  const allDone = completed.length === MODULES.length;

  return (
    <>
      <TrainingTopBar />
      <div style={styles.page}>
        <div style={styles.wrap}>
          <h1 style={styles.title}>Training</h1>
          <p style={styles.subtitle}>
            Seven short modules, done in order. Each one takes 8&ndash;12 minutes.
          </p>

          {allDone && (
            <div style={styles.doneBanner}>
              &#10003; All 7 modules complete &mdash; the assessment is unlocked on your home page.
            </div>
          )}

          <div style={styles.list}>
            {MODULES.map((m) => {
              const isDone = completed.includes(m.num);
              const isUnlocked = m.num === 1 || completed.includes(m.num - 1);
              return (
                <div key={m.num} style={{ ...styles.card, ...(isUnlocked ? {} : styles.cardLocked) }}>
                  <div style={styles.cardLeft}>
                    <div style={{ ...styles.badge, ...(isDone ? styles.badgeDone : {}) }}>
                      {isDone ? "\u2713" : m.num}
                    </div>
                    <div>
                      <div style={styles.cardTitle}>Module {m.num}</div>
                      <div style={styles.cardSubtitle}>{m.title}</div>
                    </div>
                  </div>
                  {isDone ? (
                    <a href={`/training-modules/${m.file}`} style={styles.btnGhost}>
                      Review
                    </a>
                  ) : isUnlocked ? (
                    <a href={`/training-modules/${m.file}`} style={styles.btnPrimary}>
                      Start &rarr;
                    </a>
                  ) : (
                    <span style={styles.btnLocked}>Locked</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#F2F4F8", fontFamily: "Inter, -apple-system, sans-serif", padding: "40px 20px" },
  wrap: { maxWidth: "700px", margin: "0 auto" },
  title: { fontFamily: "Manrope, sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#3626DB", margin: "0 0 6px" },
  subtitle: { color: "#5B6474", fontSize: "0.92rem", margin: "0 0 24px" },
  doneBanner: { background: "#E4F6F1", color: "#0B5F4F", padding: "14px 18px", borderRadius: "12px", fontWeight: 700, fontSize: "0.9rem", marginBottom: "24px" },
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  card: { background: "#fff", border: "1px solid #DFE3EA", borderRadius: "14px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardLocked: { opacity: 0.55 },
  cardLeft: { display: "flex", alignItems: "center", gap: "14px" },
  badge: { width: "34px", height: "34px", borderRadius: "50%", background: "#EEEBFF", color: "#4A3AFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", flex: "none" },
  badgeDone: { background: "#E4F6F1", color: "#0B5F4F" },
  cardTitle: { fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#8890B8", textTransform: "uppercase", letterSpacing: "0.03em" },
  cardSubtitle: { fontSize: "0.92rem", color: "#12182B", fontWeight: 600 },
  btnPrimary: { background: "#4A3AFF", color: "#fff", textDecoration: "none", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.85rem", padding: "9px 16px", borderRadius: "10px", flex: "none" },
  btnGhost: { background: "transparent", border: "1.5px solid #DFE3EA", color: "#5B6474", textDecoration: "none", fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.85rem", padding: "9px 16px", borderRadius: "10px", flex: "none" },
  btnLocked: { color: "#8A93A3", fontSize: "0.82rem", fontWeight: 600, flex: "none" },
};
