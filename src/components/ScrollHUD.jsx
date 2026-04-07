import { useEffect, useRef, useState } from "react";
import "./ScrollHUD.css";

const SECTIONS = [
  { id: "hero",    label: "HOME" },
  { id: "about",   label: "ABOUT" },
  { id: "project", label: "PROJECTS" },
  { id: "serv",    label: "SERVICES" },
  { id: "contact", label: "CONTACT" },
];

const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20

export default function ScrollHUD() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [progress, setProgress]     = useState(0);   // 0-1 total page
  const [segFill, setSegFill]       = useState(0);   // 0-1 within current section
  const [hovered, setHovered]       = useState(null);
  const [flash, setFlash]           = useState(false);
  const prevActiveIdx               = useRef(0);
  const rafRef                      = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollY  = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? scrollY / maxScroll : 0;
      setProgress(pct);

      // Find active section
      const offsets = SECTIONS.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });

      let idx = 0;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollY >= offsets[i] - 160) { idx = i; break; }
      }
      setActiveIdx(idx);

      // How far through current section (for segment partial fill)
      const sectionTop    = offsets[idx] ?? 0;
      const sectionBottom = offsets[idx + 1] ?? document.body.scrollHeight;
      const sectionLen    = sectionBottom - sectionTop;
      const fill = sectionLen > 0 ? Math.min((scrollY - sectionTop + 160) / sectionLen, 1) : 1;
      setSegFill(fill);

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Flash when active section changes
  useEffect(() => {
    if (activeIdx !== prevActiveIdx.current) {
      prevActiveIdx.current = activeIdx;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [activeIdx]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window["__lenis"]) {
      window["__lenis"].scrollTo(el, { offset: -80, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <>
      {/* ── SECTION FLASH ── */}
      {flash && <div className="section-flash" aria-hidden="true" />}

      {/* ── VERTICAL NAV HUD ── */}
      <nav className="scroll-hud" aria-label="Section navigation">
        <div className="hud-nodes">
          {SECTIONS.map(({ id, label }, i) => {
            const isActive  = i === activeIdx;
            const isPast    = i < activeIdx;
            const isNext    = i === activeIdx + 1;

            // Segment fill: full if past, partial if next (current seg), 0 otherwise
            const lineH = isPast ? 1 : isNext ? segFill : 0;

            return (
              <div key={id} className="hud-node-wrap">
                {/* Dot */}
                <button
                  className={`hud-dot ${isActive ? "hud-dot--active" : ""} ${isPast ? "hud-dot--past" : ""}`}
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`Navigate to ${label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="hud-dot-inner" />
                  {isActive && <span className="hud-dot-ring" />}
                </button>

                {/* Label */}
                <span className={`hud-label ${isActive ? "hud-label--active" : ""} ${hovered === i ? "hud-label--hover" : ""}`}>
                  {label}
                </span>

                {/* Connecting line (except after last) */}
                {i < SECTIONS.length - 1 && (
                  <div className="hud-line">
                    <div className="hud-line-fill" style={{ transform: `scaleY(${lineH})` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress % */}
        <span className="hud-pct">{Math.round(progress * 100)}%</span>
      </nav>

      {/* ── CIRCULAR PROGRESS RING ── */}
      <div className="scroll-ring" aria-hidden="true">
        <svg viewBox="0 0 50 50" fill="none">
          {/* Track */}
          <circle cx="25" cy="25" r="20" stroke="rgba(80,0,200,0.2)" strokeWidth="2" />
          {/* Fill */}
          <circle
            cx="25" cy="25" r="20"
            stroke="url(#ringGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 25 25)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#7000ff" />
              <stop offset="100%" stopColor="#00bfff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="scroll-ring-pct">{Math.round(progress * 100)}</span>
      </div>
    </>
  );
}
