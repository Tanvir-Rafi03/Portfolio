import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";
import "./Hero.css";

const ROLES = [
  "Frontend Developer",
  "UI / UX Designer",
  "Full-Stack Engineer",
  "React Specialist",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero" id="hero">
      <div className="hero-layout">

        {/* UnicornScene */}
        <div className="unicorn-wrapper">
          <UnicornScene
            projectId="l5jBDOqYqfW2C3iONF81"
            width="900px"
            height="900px"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
          />
        </div>

        {/* Overlay buttons (keep original) */}
        <div className="btns-overlay">
          <a href="#contact" className="hero-btn">Contact</a>
          <a href="#about" className="hero-btn">Who I'm</a>
        </div>

        {/* ── TEXT OVERLAY (bottom-left) ── */}
        <div className={`hero-text ${mounted ? "hero-text--visible" : ""}`}>
          <span className="hero-tag">// PORTFOLIO_v2.0</span>

          <h1 className="hero-name">
            TANVIR<br />
            <span className="hero-name-accent">RAFI</span>
          </h1>

          <div className="hero-role-line">
            <span className="role-arrow">›</span>
            <span className="role-text">{role}</span>
            <span className="role-cursor">|</span>
          </div>

          <div className="hero-chips">
            <span className="chip chip-green">
              <span className="chip-dot" />
              AVAILABLE
            </span>
            <span className="chip">REACT</span>
            <span className="chip">FULL-STACK</span>
          </div>
        </div>

        {/* ── HUD READOUTS (right side) ── */}
        <div className={`hero-hud ${mounted ? "hero-hud--visible" : ""}`}>
          <div className="hud-item">
            <span className="hud-label">STACK</span>
            <span className="hud-val">FULL</span>
          </div>
          <div className="hud-divider" />
          <div className="hud-item">
            <span className="hud-label">PROJECTS</span>
            <span className="hud-val">10+</span>
          </div>
          <div className="hud-divider" />
          <div className="hud-item">
            <span className="hud-label">STATUS</span>
            <span className="hud-val hud-online">
              <span className="hud-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div className="scroll-indicator">
          <span className="scroll-label">SCROLL</span>
          <div className="scroll-track">
            <div className="scroll-thumb" />
          </div>
        </div>

      </div>
    </div>
  );
}
