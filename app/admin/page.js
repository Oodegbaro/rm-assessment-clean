"use client";

import { useEffect, useState, useMemo } from "react";

export default function AdminPage() {
  const [participants, setParticipants] = useState(null);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [emailSearch, setEmailSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    fetch("/api/admin/participants")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load dashboard.");
        return res.json();
      })
      .then((data) => setParticipants(data.participants))
      .catch(() => setError("Couldn't load the dashboard. Please refresh."));
  }, []);

  function lastActivity(p) {
    return p.assessment?.savedAt || p.trainingCompletedAt || null;
  }

  function statusKey(p) {
    if (p.assessment) return p.assessment.passed ? "passed" : "failed";
    if (p.trainingCompletedAt) return "training";
    return "loginonly";
  }

  const filtered = useMemo(() => {
    if (!participants) return [];
    return participants.filter((p) => {
      if (statusFilter !== "all" && statusKey(p) !== statusFilter) return false;
      if (emailSearch && !p.email.toLowerCase().includes(emailSearch.toLowerCase())) return false;
      const la = lastActivity(p);
      if (dateFrom && (!la || la < new Date(dateFrom).getTime())) return false;
      if (dateTo && (!la || la > new Date(dateTo).getTime() + 86400000)) return false;
      return true;
    });
  }, [participants, statusFilter, emailSearch, dateFrom, dateTo]);

  const total = filtered.length;
  const trainingDone = filtered.filter((p) => p.trainingCompletedAt).length;
  const assessed = filtered.filter((p) => p.assessment).length;
  const passed = filtered.filter((p) => p.assessment?.passed).length;
  const failed = assessed - passed;

  const scores = filtered.filter((p) => p.assessment).map((p) => p.assessment.pct);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const sortedScores = [...scores].sort((a, b) => a - b);
  const medianScore = sortedScores.length
    ? sortedScores[Math.floor(sortedScores.length / 2)]
    : null;

  const buckets = [
    { label: "0–49%", min: 0, max: 49 },
    { label: "50–59%", min: 50, max: 59 },
    { label: "60–69%", min: 60, max: 69 },
    { label: "70–79%", min: 70, max: 79 },
    { label: "80–89%", min: 80, max: 89 },
    { label: "90–100%", min: 90, max: 100 },
  ];
  const histogram = buckets.map((b) => ({
    ...b,
    count: scores.filter((s) => s >= b.min && s <= b.max).length,
  }));
  const maxBucketCount = Math.max(1, ...histogram.map((b) => b.count));

  const sectionTotals = {};
  filtered.forEach((p) => {
    if (!p.assessment?.bySection) return;
    Object.entries(p.assessment.bySection).forEach(([sec, v]) => {
      if (!sectionTotals[sec]) sectionTotals[sec] = { got: 0, max: 0 };
      sectionTotals[sec].got += v.got;
      sectionTotals[sec].max += v.max;
    });
  });
  const sectionRows = Object.entries(sectionTotals)
    .map(([sec, v]) => ({ sec, pct: v.max ? Math.round((v.got / v.max) * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct);

  const dayBuckets = {};
  filtered.forEach((p) => {
    const la = lastActivity(p);
    if (!la) return;
    const day = new Date(la).toISOString().slice(0, 10);
    if (!dayBuckets[day]) dayBuckets[day] = { training: 0, assessed: 0 };
    if (p.assessment?.savedAt && new Date(p.assessment.savedAt).toISOString().slice(0, 10) === day) {
      dayBuckets[day].assessed += 1;
    } else if (p.trainingCompletedAt) {
      dayBuckets[day].training += 1;
    }
  });
  const timelineDays = Object.keys(dayBuckets).sort().slice(-14);
  const maxDayCount = Math.max(1, ...timelineDays.map((d) => dayBuckets[d].training + dayBuckets[d].assessed));

  function statusFor(p) {
    if (p.assessment) return p.assessment.passed ? "Passed" : "Completed \u2014 below 70%";
    if (p.trainingCompletedAt) return "Training done, not yet assessed";
    return "Logged in, not started";
  }
  function statusStyle(p) {
    if (p.assessment) {
      return p.assessment.passed
        ? { background: "#E4F6F1", color: "#0B5F4F" }
        : { background: "#FBEAE8", color: "#8F2E26" };
    }
    if (p.trainingCompletedAt) return { background: "#FFF4DE", color: "#8A5A00" };
    return { background: "#EFF1F5", color: "#5B6474" };
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <h1 style={styles.title}>Participation analytics</h1>
        <p style={styles.subtitle}>Every email that has ever logged in. Filters below apply to every number and chart on this page, not just the table.</p>

        {error && <div style={styles.error}>{error}</div>}
        {!participants && !error && <p style={styles.empty}>Loading&hellip;</p>}

        {participants && (
          <>
            <div style={styles.filterBar}>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
                <option value="all">All statuses</option>
                <option value="loginonly">Logged in, not started</option>
                <option value="training">Training done, not assessed</option>
                <option value="passed">Passed</option>
                <option value="failed">Completed, below 70%</option>
              </select>
              <input
                type="text"
                placeholder="Search email..."
                value={emailSearch}
                onChange={(e) => setEmailSearch(e.target.value)}
                style={styles.input}
              />
              <label style={styles.dateLabel}>
                From <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={styles.dateInput} />
              </label>
              <label style={styles.dateLabel}>
                To <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={styles.dateInput} />
              </label>
              {(statusFilter !== "all" || emailSearch || dateFrom || dateTo) && (
                <button
                  onClick={() => { setStatusFilter("all"); setEmailSearch(""); setDateFrom(""); setDateTo(""); }}
                  style={styles.clearBtn}
                >
                  Clear filters
                </button>
              )}
            </div>

            <div style={styles.statGrid}>
              <StatCard label="Matching participants" value={total} />
              <StatCard label="Completed training" value={`${trainingDone} / ${total}`} />
              <StatCard label="Completed assessment" value={`${assessed} / ${total}`} />
              <StatCard label="Passed" value={`${passed} / ${total}`} />
              <StatCard label="Average score" value={avgScore !== null ? `${avgScore}%` : "\u2014"} />
              <StatCard label="Median score" value={medianScore !== null ? `${medianScore}%` : "\u2014"} />
            </div>

            <div style={styles.chartRow}>
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Funnel</h3>
                <FunnelBar label="Logged in" count={total} of={total} />
                <FunnelBar label="Completed training" count={trainingDone} of={total} />
                <FunnelBar label="Completed assessment" count={assessed} of={total} />
                <FunnelBar label="Passed" count={passed} of={total} color="#0F8A72" />
              </div>

              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Score distribution</h3>
                {histogram.map((b) => (
                  <div key={b.label} style={styles.histRow}>
                    <span style={styles.histLabel}>{b.label}</span>
                    <div style={styles.histTrack}>
                      <div style={{ ...styles.histFill, width: `${(b.count / maxBucketCount) * 100}%` }} />
                    </div>
                    <span style={styles.histCount}>{b.count}</span>
                  </div>
                ))}
                {scores.length === 0 && <p style={styles.emptySmall}>No assessment attempts in this filter.</p>}
              </div>
            </div>

            <div style={{ ...styles.chartCard, marginBottom: "20px" }}>
              <h3 style={styles.chartTitle}>Weakest topics (lower % = more people getting this wrong)</h3>
              {sectionRows.length === 0 && <p style={styles.emptySmall}>No section data in this filter.</p>}
              {sectionRows.map((s) => (
                <div key={s.sec} style={styles.histRow}>
                  <span style={{ ...styles.histLabel, width: "220px" }}>{s.sec}</span>
                  <div style={styles.histTrack}>
                    <div style={{ ...styles.histFill, width: `${s.pct}%`, background: s.pct < 60 ? "#D6473C" : s.pct < 80 ? "#D97706" : "#0F8A72" }} />
                  </div>
                  <span style={styles.histCount}>{s.pct}%</span>
                </div>
              ))}
            </div>

            <div style={{ ...styles.chartCard, marginBottom: "28px" }}>
              <h3 style={styles.chartTitle}>Activity, last 14 active days in this filter</h3>
              {timelineDays.length === 0 && <p style={styles.emptySmall}>No dated activity in this filter.</p>}
              <div style={styles.timelineRow}>
                {timelineDays.map((d) => {
                  const v = dayBuckets[d];
                  const h = ((v.training + v.assessed) / maxDayCount) * 60;
                  return (
                    <div key={d} style={styles.timelineCol} title={`${d}: ${v.training} training, ${v.assessed} assessed`}>
                      <div style={{ ...styles.timelineBar, height: `${h}px` }} />
                      <span style={styles.timelineLabel}>{d.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p style={styles.empty}>No one matches these filters.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Training</th>
                    <th style={styles.th}>Score</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Last activity</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const la = lastActivity(p);
                    return (
                      <tr key={i}>
                        <td style={styles.td}>{p.email}</td>
                        <td style={styles.td}>{p.trainingCompletedAt ? "\u2713 Done" : "\u2014"}</td>
                        <td style={styles.td}>
                          {p.assessment ? `${p.assessment.pct}% (${Math.round(p.assessment.total)}/${p.assessment.max})` : "\u2014"}
                        </td>
                        <td style={styles.td}>
                          <span style={{ ...styles.badge, ...statusStyle(p) }}>{statusFor(p)}</span>
                        </td>
                        <td style={styles.td}>{la ? new Date(la).toLocaleString() : "\u2014"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function FunnelBar({ label, count, of, color }) {
  const pct = of ? (count / of) * 100 : 0;
  return (
    <div style={styles.histRow}>
      <span style={{ ...styles.histLabel, width: "160px" }}>{label}</span>
      <div style={styles.histTrack}>
        <div style={{ ...styles.histFill, width: `${pct}%`, background: color || "#4A3AFF" }} />
      </div>
      <span style={styles.histCount}>{count}</span>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#F2F4F8", fontFamily: "Inter, -apple-system, sans-serif", padding: "40px 20px" },
  wrap: { maxWidth: "1100px", margin: "0 auto" },
  title: { fontSize: "1.6rem", fontWeight: 800, color: "#3626DB", margin: "0 0 4px" },
  subtitle: { color: "#5B6474", fontSize: "0.9rem", margin: "0 0 20px" },
  empty: { color: "#5B6474" },
  emptySmall: { color: "#5B6474", fontSize: "0.82rem", margin: "8px 0 0" },
  error: { background: "#FBEAE8", color: "#8F2E26", padding: "10px 12px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "16px" },

  filterBar: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "20px", background: "#fff", border: "1px solid #DFE3EA", borderRadius: "12px", padding: "14px 16px" },
  select: { border: "1px solid #DFE3EA", borderRadius: "8px", padding: "7px 10px", fontSize: "0.85rem", background: "#fff" },
  input: { border: "1px solid #DFE3EA", borderRadius: "8px", padding: "7px 10px", fontSize: "0.85rem", minWidth: "200px" },
  dateLabel: { fontSize: "0.8rem", color: "#5B6474", display: "flex", alignItems: "center", gap: "6px" },
  dateInput: { border: "1px solid #DFE3EA", borderRadius: "8px", padding: "6px 8px", fontSize: "0.82rem" },
  clearBtn: { border: "1px solid #DFE3EA", background: "transparent", color: "#5B6474", borderRadius: "8px", padding: "7px 12px", fontSize: "0.82rem", cursor: "pointer" },

  statGrid: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" },
  statCard: { background: "#fff", border: "1px solid #DFE3EA", borderRadius: "12px", padding: "14px 16px" },
  statLabel: { fontSize: "0.72rem", color: "#5B6474", marginBottom: "6px" },
  statValue: { fontSize: "1.25rem", fontWeight: 800, color: "#12182B" },

  chartRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" },
  chartCard: { background: "#fff", border: "1px solid #DFE3EA", borderRadius: "12px", padding: "18px 20px" },
  chartTitle: { fontSize: "0.9rem", fontWeight: 700, color: "#12182B", margin: "0 0 14px" },

  histRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" },
  histLabel: { fontSize: "0.78rem", color: "#5B6474", width: "70px", flex: "none" },
  histTrack: { flex: 1, background: "#F2F4F8", borderRadius: "6px", height: "14px", overflow: "hidden" },
  histFill: { height: "100%", background: "#4A3AFF", borderRadius: "6px" },
  histCount: { fontSize: "0.78rem", color: "#12182B", fontWeight: 700, width: "36px", textAlign: "right" },

  timelineRow: { display: "flex", alignItems: "flex-end", gap: "8px", height: "80px" },
  timelineCol: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
  timelineBar: { width: "100%", background: "#4A3AFF", borderRadius: "4px 4px 0 0", minHeight: "2px" },
  timelineLabel: { fontSize: "0.65rem", color: "#5B6474", marginTop: "6px", writingMode: "vertical-rl", transform: "rotate(180deg)" },

  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #DFE3EA" },
  th: { textAlign: "left", padding: "12px 16px", background: "#4A3AFF", color: "#fff", fontSize: "0.8rem", fontWeight: 700 },
  td: { padding: "12px 16px", borderBottom: "1px solid #EFF1F5", fontSize: "0.88rem", color: "#12182B" },
  badge: { padding: "3px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" },
};
