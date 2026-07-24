"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Incorrect password.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={submit} style={styles.card}>
        <h1 style={styles.title}>Admin</h1>
        <p style={styles.subtitle}>Enter the admin password to view results.</p>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Password"
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Checking\u2026" : "Enter"}
        </button>
      </form>
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
    padding: "36px 32px",
    maxWidth: "360px",
    width: "100%",
    boxShadow: "0 1px 3px rgba(18,24,43,0.08)",
    border: "1px solid #DFE3EA",
  },
  title: { fontSize: "1.3rem", fontWeight: 800, color: "#3626DB", margin: "0 0 8px" },
  subtitle: { color: "#5B6474", fontSize: "0.88rem", margin: "0 0 20px" },
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
  error: {
    background: "#FBEAE8",
    color: "#8F2E26",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
};
