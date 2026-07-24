import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/session";
import { getTrainingComplete } from "../../lib/kv";
import LogoutButton from "./LogoutButton";

export default async function HomePage() {
  const token = cookies().get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    redirect("/login");
  }

  const training = await getTrainingComplete(payload.email);
  const trainingDone = Boolean(training);

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.masthead}>
          <h1 style={styles.title}>Account Planning Assessment</h1>
          <LogoutButton />
        </div>
        <p style={styles.subtitle}>Signed in as {payload.email}</p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.badge}>Step 1</div>
            <h2 style={styles.cardTitle}>Training</h2>
            <p style={styles.cardText}>
              A walkthrough of the account planning framework, the real template structure,
              and how to use GenAI well &mdash; before you're tested on it.
            </p>
            <Link href="/training" style={styles.buttonPrimary}>
              {trainingDone ? "Review training \u2192" : "Start training \u2192"}
            </Link>
            {trainingDone && <div style={styles.doneNote}>&#10003; Completed</div>}
          </div>

          <div style={{ ...styles.card, opacity: trainingDone ? 1 : 0.55 }}>
            <div style={styles.badge}>Step 2</div>
            <h2 style={styles.cardTitle}>Assessment</h2>
            <p style={styles.cardText}>
              30 questions across 11 sections, one client, start to finish. Randomized each
              attempt, with a 70% pass mark.
            </p>
            {trainingDone ? (
              <Link href="/assessment" style={styles.buttonPrimary}>
                Take the assessment {"\u2192"}
              </Link>
            ) : (
              <div style={styles.locked}>Complete training first to unlock this</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F2F4F8",
    fontFamily: "Inter, -apple-system, sans-serif",
    padding: "40px 20px",
  },
  wrap: { maxWidth: "760px", margin: "0 auto" },
  masthead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: {
    fontFamily: "Manrope, sans-serif",
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#3626DB",
    margin: 0,
  },
  logout: {
    background: "transparent",
    border: "1.5px solid #DFE3EA",
    color: "#5B6474",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  subtitle: { color: "#5B6474", fontSize: "0.9rem", margin: "6px 0 32px" },
  cards: { display: "flex", flexDirection: "column", gap: "20px" },
  card: {
    background: "#fff",
    border: "1px solid #DFE3EA",
    borderRadius: "16px",
    padding: "28px",
  },
  badge: {
    display: "inline-block",
    fontFamily: "Manrope, sans-serif",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#3626DB",
    background: "#EEEBFF",
    padding: "4px 10px",
    borderRadius: "20px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontFamily: "Manrope, sans-serif",
    fontSize: "1.25rem",
    fontWeight: 800,
    margin: "0 0 8px",
    color: "#12182B",
  },
  cardText: { color: "#5B6474", fontSize: "0.92rem", lineHeight: 1.55, margin: "0 0 20px" },
  buttonPrimary: {
    display: "inline-block",
    background: "#4A3AFF",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    padding: "11px 20px",
    borderRadius: "10px",
  },
  locked: {
    color: "#8F2E26",
    background: "#FBEAE8",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "10px 14px",
    borderRadius: "8px",
    display: "inline-block",
  },
  doneNote: {
    marginTop: "10px",
    color: "#0B5F4F",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
};
