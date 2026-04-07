import { useEffect, useState, useRef } from "react";
import "./ActivityMonitor.css";

// ── Fake activity stream ──────────────────────────────
const ACTIVITIES = [
  { text: "Pushing commits to main...",     color: "#00c853" },
  { text: "Debugging CSS edge cases...",    color: "#ffab00" },
  { text: "Writing React hooks...",          color: "#00bfff" },
  { text: "Optimizing bundle size...",       color: "#7000ff" },
  { text: "Reviewing pull request #47...",   color: "#00bfff" },
  { text: "Fixing that one TypeScript error...", color: "#ff5252" },
  { text: "npm install (again)...",          color: "#ffab00" },
  { text: "Designing component system...",   color: "#7000ff" },
  { text: "Reading MDN docs...",             color: "#00c853" },
  { text: "Stack Overflow session #12...",   color: "#ff5252" },
  { text: "Coffee.exe loading...",           color: "#ffab00" },
  { text: "Building portfolio v2.0...",      color: "#00bfff" },
];

// ── Fake commit ticker ────────────────────────────────
const COMMITS = [
  "fix: resolved hydration mismatch",
  "feat: add command palette",
  "perf: remove backdrop-filter on cards",
  "style: update HUD corner marks",
  "feat: particle network rewrite",
  "fix: lenis scroll duration tuned",
  "chore: clean up idle animations",
  "feat: boot screen scramble effect",
];

// ── Animated bar hook ─────────────────────────────────
function useAnimatedValue(base, variance, interval = 1400) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const iv = setInterval(() => {
      setVal(Math.max(5, Math.min(98, base + (Math.random() - 0.5) * variance * 2)));
    }, interval);
    return () => clearInterval(iv);
  }, [base, variance, interval]);
  return Math.round(val);
}

export default function ActivityMonitor() {
  const [minimized, setMinimized] = useState(true);
  const [time, setTime]           = useState(new Date());
  const [actIdx, setActIdx]       = useState(0);
  const [commitIdx, setCommitIdx] = useState(0);
  const [actVisible, setActVisible] = useState(true);
  const [uptime, setUptime]       = useState(0);
  const startRef = useRef(Date.now());

  const cpu  = useAnimatedValue(34, 22, 1200);
  const ram  = useAnimatedValue(58, 12, 1800);
  const net  = useAnimatedValue(20, 40, 900);

  // ── Clock ─────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 50);
    return () => clearInterval(iv);
  }, []);

  // ── Uptime counter ────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setUptime(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // ── Activity feed rotation ────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setActVisible(false);
      setTimeout(() => {
        setActIdx(i => (i + 1) % ACTIVITIES.length);
        setActVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  // ── Commit ticker ─────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setCommitIdx(i => (i + 1) % COMMITS.length);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  const ms   = String(time.getMilliseconds()).padStart(3, "0");
  const sec  = String(time.getSeconds()).padStart(2, "0");
  const min  = String(time.getMinutes()).padStart(2, "0");
  const hr   = String(time.getHours()).padStart(2, "0");
  const uptimeFmt = `${String(Math.floor(uptime/3600)).padStart(2,"0")}:${String(Math.floor((uptime%3600)/60)).padStart(2,"0")}:${String(uptime%60).padStart(2,"0")}`;

  const act = ACTIVITIES[actIdx];

  return (
    <div className={`am-wrap ${minimized ? "am-wrap--min" : ""}`}>

      {/* ── Title bar ── */}
      <div className="am-titlebar" onClick={() => setMinimized(m => !m)}>
        <div className="am-titlebar-left">
          <span className="am-status-dot" />
          <span className="am-title">DEV_MONITOR</span>
        </div>
        <div className="am-titlebar-right">
          <span className="am-uptime">{uptimeFmt}</span>
          <button className="am-toggle" aria-label="Toggle monitor">
            {minimized ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* ── Body (hidden when minimized) ── */}
      <div className="am-body">

        {/* Clock */}
        <div className="am-clock">
          <span className="am-clock-hms">{hr}<span className="am-colon">:</span>{min}<span className="am-colon">:</span>{sec}</span>
          <span className="am-clock-ms">.{ms}</span>
          <span className="am-clock-tz">EST</span>
        </div>

        <div className="am-divider" />

        {/* Metrics */}
        <div className="am-metrics">
          <MetricBar label="CPU" value={cpu} color={cpu > 70 ? "#ff5252" : cpu > 45 ? "#ffab00" : "#00c853"} />
          <MetricBar label="RAM" value={ram} color={ram > 80 ? "#ff5252" : ram > 60 ? "#ffab00" : "#00bfff"} />
          <MetricBar label="NET" value={net} color="#7000ff" />
        </div>

        <div className="am-divider" />

        {/* Activity feed */}
        <div className="am-activity">
          <span className="am-activity-label">ACTIVITY</span>
          <span
            className={`am-activity-text ${actVisible ? "am-act--in" : "am-act--out"}`}
            style={{ color: act.color }}
          >
            {act.text}
          </span>
        </div>

        <div className="am-divider" />

        {/* Commit ticker */}
        <div className="am-commit">
          <span className="am-commit-icon">git</span>
          <span className="am-commit-text" key={commitIdx}>
            {COMMITS[commitIdx]}
          </span>
        </div>

      </div>

      {/* HUD corners */}
      <span className="am-corner am-tl" />
      <span className="am-corner am-br" />
    </div>
  );
}

function MetricBar({ label, value, color }) {
  return (
    <div className="am-metric">
      <span className="am-metric-label">{label}</span>
      <div className="am-metric-track">
        <div
          className="am-metric-fill"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 6px ${color}88`,
            transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span className="am-metric-val" style={{ color }}>{value}%</span>
    </div>
  );
}
