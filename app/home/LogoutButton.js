"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <button
      onClick={logout}
      style={{
        background: "transparent",
        border: "1.5px solid #DFE3EA",
        color: "#5B6474",
        borderRadius: "8px",
        padding: "6px 14px",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      Log out
    </button>
  );
}
