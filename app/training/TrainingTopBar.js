"use client";

import Link from "next/link";

export default function TrainingTopBar() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const btnStyle = {
    background: "transparent",
    border: "1.5px solid #3a4258",
    color: "#D4D6E0",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        background: "#12182B",
        padding: "8px 20px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        fontFamily: "Inter, -apple-system, sans-serif",
        borderBottom: "1px solid #232b45",
      }}
    >
      <Link href="/home" style={btnStyle}>
        Home
      </Link>
      <button onClick={logout} style={btnStyle}>
        Log out
      </button>
    </div>
  );
}
