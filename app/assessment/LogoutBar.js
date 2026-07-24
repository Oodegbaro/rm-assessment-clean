"use client";

import Link from "next/link";

export default function LogoutBar() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const btnStyle = {
    background: "transparent",
    border: "1.5px solid #DFE3EA",
    color: "#5B6474",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        maxWidth: "740px",
        margin: "0 auto",
        padding: "16px 20px 0",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        fontFamily: "Inter, -apple-system, sans-serif",
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
