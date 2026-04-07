import "./Footer.css";
import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NAV = [
  { href: "#hero",    label: "Home" },
  { href: "#about",   label: "About" },
  { href: "#project", label: "Projects" },
  { href: "#serv",    label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time,   setTime]   = useState(new Date());
  const [show,   setShow]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("tmrafi@myseneca.ca");
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const scrollTop = () => {
    if (window["__lenis"]) window["__lenis"].scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pad = n => String(n).padStart(2, "0");
  const clock = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <footer className="footer">
      <div className="footer-topline" />
      <div className="footer-grid" aria-hidden="true" />

      <div className="footer-inner">

        {/* ── LEFT: brand ── */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-bracket">&lt;</span>
            <span className="footer-logo-name">tanvir</span>
            <span className="footer-logo-bracket">/&gt;</span>
          </div>
          <p className="footer-tagline">Building cool things with code.</p>
          <div className="footer-status">
            <span className="footer-status-dot" />
            AVAILABLE FOR WORK
          </div>
        </div>

        {/* ── CENTER: nav ── */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-nav-title">// NAVIGATE</span>
          <div className="footer-nav-grid">
            {NAV.map(({ href, label }, i) => (
              <a key={href} href={href} className="footer-nav-chip">
                <span className="footer-nav-chip-num">0{i + 1}</span>
                <span className="footer-nav-chip-label">{label}</span>
                <span className="footer-nav-chip-bar" />
              </a>
            ))}
          </div>
        </nav>

        {/* ── RIGHT: contact ── */}
        <div className="footer-contact">
          <span className="footer-nav-title">// CONTACT</span>
          <button
            className={`footer-email-btn ${copied ? "footer-email-btn--copied" : ""}`}
            onClick={copyEmail}
          >
            <span className="footer-email-text">tmrafi@myseneca.ca</span>
            <span className="footer-email-tag">{copied ? "✓ COPIED" : "COPY"}</span>
          </button>
          <div className="footer-socials">
            <a href="https://github.com/Tanvir-Rafi03" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Tanvir Mahmud Rafi</span>
        <span className="footer-bottom-stack">REACT · VITE · CYBERPUNK UI</span>
        <span className="footer-clock">{clock}</span>
      </div>

      {/* ── BACK TO TOP ── */}
      <button
        className={`footer-top-btn ${show ? "footer-top-btn--show" : ""}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </footer>
  );
}
