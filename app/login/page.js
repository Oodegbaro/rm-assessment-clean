"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("email"); // "email" | "code"
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setStep("code");
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "That code isn't right. Please try again.");
      } else {
        router.push("/home");
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Account Planning Assessment</h1>
        <p style={styles.subtitle}>Sign in with your BCG email to begin.</p>

        {step === "email" && (
          <form onSubmit={requestCode}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              required
              placeholder="yourname@bcg.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Sending\u2026" : "Send me a code"}
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={verifyCode}>
            <p style={styles.note}>
              We sent a 6-digit code to <b>{email}</b>. It expires in 5 minutes.
            </p>
            <label style={styles.label}>Enter the code</label>
            <input
              type="text"
              required
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              style={{ ...styles.input, letterSpacing: "6px", fontWeight: 700 }}
            />
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Checking\u2026" : "Verify and continue"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
              }}
              style={styles.linkButton}
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F2F4F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, -apple-system, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px 36px",
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 1px 3px rgba(18,24,43,0.08)",
    border: "1px solid #DFE3EA",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#3626DB",
    margin: "0 0 8px",
  },
  subtitle: { color: "#5B6474", fontSize: "0.92rem", margin: "0 0 24px" },
  label: {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 700,
    color: "#5B6474",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    border: "1.5px solid #DFE3EA",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "1rem",
    marginBottom: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    background: "#4A3AFF",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
  },
  linkButton: {
    width: "100%",
    background: "transparent",
    color: "#5B6474",
    border: "none",
    padding: "12px",
    fontSize: "0.88rem",
    cursor: "pointer",
    marginTop: "6px",
  },
  error: {
    background: "#FBEAE8",
    color: "#8F2E26",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
  note: { fontSize: "0.88rem", color: "#5B6474", marginBottom: "18px" },
};
