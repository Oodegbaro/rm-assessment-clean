"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/results")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load results.");
        return res.json();
      })
      .then((data) => setResults(data.results))
      .catch(() => setError("Couldn't load results. Please refresh."));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>Assessment results</h1>
        <p style={styles.subtitle}>
          {results ? `${results.length} completed attempt${results.length === 1 ? "" : "s"}` : "Loading\u2026"}
        </p>
        {error && <div style={styles.error}>{error}</div>}
        {results && results.length === 0 && (
          <p style={styles.empty}>No completed attempts yet.</p>
        )}
        {results && results.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Points</th>
                <th style={styles.th}>Result</th>
                <th style={styles.th}>Completed</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td style={styles.td}>{r.email}</td>
                  <td style={styles.td}>{r.pct}%</td>
                  <td style={styles.td}>
                    {Math.round(r.total)} / {r.max}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: r.passed ? "#E4F6F1" : "#FBEAE8",
                        color: r.passed ? "#0B5F4F" : "#8F2E26",
                      }}
                    >
                      {r.passed ? "Pass" : "Below 70%"}
                    </span>
                  </td>
                  <td style={styles.td}>{new Date(r.savedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
  wrap: { maxWidth: "900px", margin: "0 auto" },
  title: { fontSize: "1.6rem", fontWeight: 800, color: "#3626DB", margin: "0 0 4px" },
  subtitle: { color: "#5B6474", fontSize: "0.9rem", margin: "0 0 24px" },
  empty: { color: "#5B6474" },
  error: {
    background: "#FBEAE8",
    color: "#8F2E26",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #DFE3EA",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    background: "#4A3AFF",
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #EFF1F5",
    fontSize: "0.88rem",
    color: "#12182B",
  },
  badge: {
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
};
