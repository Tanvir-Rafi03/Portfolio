import { useEffect, useState, useRef } from "react";
import "./BootScreen.css";

// ── Scramble config ───────────────────────────────────
const TARGET   = "TANVIR_";
const CHARS    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&*$";
const rand     = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// ── Terminal lines ────────────────────────────────────
const LOG = [
  { t: 0,    text: "CYBERDECK OS v3.7.1 — QUANTUM CORE", type: "header" },
  { t: 100,  text: "──────────────────────────────────────────────────", type: "sep" },
  { t: 350,  text: "[SYS]  Booting neural interface..............  [ OK ]", type: "ok" },
  { t: 620,  text: "[MEM]  Allocating memory banks (16 GB)........  [ OK ]", type: "ok" },
  { t: 870,  text: "[NET]  Establishing secure uplink.............  [ OK ]", type: "ok" },
  { t: 1090, text: "[SEC]  Verifying cryptographic signature......  [ OK ]", type: "ok" },
  { t: 1300, text: "[ENV]  Injecting environment variables........  [ OK ]", type: "ok" },
  { t: 1550, text: "──────────────────────────────────────────────────", type: "sep" },
  { t: 1800, text: "[ID ]  TANVIR MAHMUD RAFI", type: "id" },
  { t: 2000, text: "[ROL]  FULL-STACK DEVELOPER", type: "id" },
  { t: 2180, text: "[LOC]  TORONTO, CANADA", type: "id" },
  { t: 2360, text: "[STA]  ONLINE  ●  READY", type: "id" },
  { t: 2580, text: "──────────────────────────────────────────────────", type: "sep" },
  { t: 2850, text: "LAUNCHING PORTFOLIO INTERFACE...", type: "launch" },
];

const TOTAL_MS  = 3600;  // when progress hits 100 %
const EXIT_AT   = 3700;  // start exit animation
const DONE_AT   = 4500;  // call onDone

export default function BootScreen({ onDone }) {
  const [logo,    setLogo]    = useState(() => TARGET.split("").map(() => rand()));
  const [lines,   setLines]   = useState([]);
  const [pct,     setPct]     = useState(0);
  const [phase,   setPhase]   = useState("boot"); // boot | exit
  const [corners, setCorners] = useState(false);
  const termRef = useRef(null);

  // ── Logo scramble → decrypt ───────────────────────
  useEffect(() => {
    const resolved = new Array(TARGET.length).fill(false);
    let frame = 0;
    const RESOLVE_INTERVAL = 80; // ms per char resolved

    const iv = setInterval(() => {
      frame++;
      // Resolve one char every N frames
      const resolveIdx = Math.floor(frame / 3);
      if (resolveIdx < TARGET.length) resolved[resolveIdx] = true;

      setLogo(prev =>
        prev.map((_, i) => resolved[i] ? TARGET[i] : rand())
      );

      if (resolved.every(Boolean)) clearInterval(iv);
    }, RESOLVE_INTERVAL);

    return () => clearInterval(iv);
  }, []);

  // ── HUD corners appear ────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setCorners(true), 200);
    return () => clearTimeout(t);
  }, []);

  // ── Terminal lines ────────────────────────────────
  useEffect(() => {
    const timers = LOG.map(({ t, text, type }) =>
      setTimeout(() => {
        setLines(prev => [...prev, { text, type }]);
        if (termRef.current)
          termRef.current.scrollTop = termRef.current.scrollHeight;
      }, t)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Progress counter ──────────────────────────────
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / TOTAL_MS) * 100, 100);
      setPct(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Exit ──────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), EXIT_AT);
    const t2 = setTimeout(() => onDone(), DONE_AT);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const segments = 20;

  return (
    <div className={`boot-screen ${phase === "exit" ? "boot-exit" : ""}`}>

      {/* ── CRT scanlines overlay ── */}
      <div className="boot-crt" />

      {/* ── Moving scan beam ── */}
      <div className="boot-beam" />

      {/* ── HUD corners ── */}
      {(["tl","tr","bl","br"]).map(pos => (
        <span key={pos} className={`boot-hud-corner boot-hud-${pos} ${corners ? "boot-hud-in" : ""}`} />
      ))}

      {/* ── Side data streams ── */}
      <div className="boot-side boot-side--left">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="boot-side-char" style={{ animationDelay: `${i * 0.12}s` }}>
            {Math.floor(Math.random() * 16).toString(16).toUpperCase()}
          </span>
        ))}
      </div>
      <div className="boot-side boot-side--right">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="boot-side-char" style={{ animationDelay: `${i * 0.1}s` }}>
            {Math.floor(Math.random() * 16).toString(16).toUpperCase()}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="boot-inner">

        {/* Logo */}
        <div className="boot-logo-wrap">
          <span className="boot-logo-tag">&lt;SYSTEM_INIT&gt;</span>
          <div className="boot-logo">
            {logo.map((ch, i) => (
              <span
                key={i}
                className={`boot-logo-ch ${ch === TARGET[i] ? "boot-logo-ch--resolved" : "boot-logo-ch--scramble"}`}
              >
                {ch}
              </span>
            ))}
          </div>
          <span className="boot-logo-sub">FULL-STACK DEVELOPER  //  TORONTO</span>
        </div>

        {/* Terminal */}
        <div className="boot-terminal" ref={termRef}>
          <div className="boot-terminal-bar">
            <span className="boot-terminal-dot" />
            <span className="boot-terminal-dot" />
            <span className="boot-terminal-dot" />
            <span className="boot-terminal-title">SYSTEM_TERMINAL  v3.7.1</span>
          </div>
          <div className="boot-terminal-body">
            {lines.map(({ text, type }, i) => (
              <div key={i} className={`boot-line boot-line--${type}`}>
                {type === "sep" || type === "header"
                  ? <span className="boot-text">{text}</span>
                  : <>
                      <span className="boot-prompt">&gt;&nbsp;</span>
                      <span className="boot-text">{text}</span>
                    </>
                }
              </div>
            ))}
            <span className="boot-cursor">█</span>
          </div>
        </div>

        {/* Progress */}
        <div className="boot-progress-wrap">
          <div className="boot-progress-hud">
            <span className="boot-progress-label">LOADING</span>
            <span className="boot-progress-pct">{pct}<span className="boot-pct-sym">%</span></span>
          </div>
          <div className="boot-seg-track">
            {Array.from({ length: segments }).map((_, i) => (
              <div
                key={i}
                className={`boot-seg ${(i / segments) * 100 <= pct ? "boot-seg--on" : ""}`}
                style={{ transitionDelay: `${i * 0.02}s` }}
              />
            ))}
          </div>
          <div className="boot-progress-footer">
            <span className="boot-progress-sys">SYS://PORTFOLIO.INIT</span>
            <span className="boot-progress-ver">BUILD_2025.v1</span>
          </div>
        </div>

      </div>
    </div>
  );
}
