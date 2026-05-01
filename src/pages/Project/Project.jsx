import { useState, useRef } from "react";
import "./Project.css";

const projects = [
  {
    index: "01",
    title: "AI Resume Builder",
    desc: "Intelligent resume builder powered by AI — generates, formats and tailors resumes with real-time suggestions and a clean editor.",
    skills: ["TypeScript", "React", "PostgreSQL", "AI"],
    category: "fullstack",
    featured: true,
    demo: "https://ai-resume-builder-seven-woad.vercel.app",
    github: "https://github.com/Tanvir-Rafi03/Ai-Resume-Builder",
    gradient: "linear-gradient(135deg, rgba(0,100,255,0.18) 0%, rgba(112,0,255,0.22) 100%)",
    accent: "#00bfff",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="4" width="32" height="40" rx="3" />
        <line x1="16" y1="14" x2="32" y2="14" />
        <line x1="16" y1="20" x2="32" y2="20" />
        <line x1="16" y1="26" x2="24" y2="26" />
        <circle cx="36" cy="36" r="8" strokeWidth="1.5" />
        <path d="M33 36l2 2 4-4" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Photobooth",
    desc: "Fish-themed desktop photobooth app built with Electron. Apply filters, snap shots, and get a fun retro photo-strip experience.",
    skills: ["JavaScript", "Electron", "CSS", "HTML"],
    category: "frontend",
    featured: false,
    demo: "https://photobooth-two-phi.vercel.app/",
    github: "https://github.com/Tanvir-Rafi03/Photobooth",
    gradient: "linear-gradient(135deg, rgba(255,120,0,0.12) 0%, rgba(255,60,120,0.15) 100%)",
    accent: "#ff7b54",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="12" width="40" height="28" rx="3" />
        <circle cx="24" cy="26" r="8" />
        <circle cx="24" cy="26" r="4" />
        <rect x="16" y="6" width="16" height="6" rx="2" />
        <circle cx="38" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "EcoWorld",
    desc: "Climate solutions showcase platform — full-stack web app with Node.js, Express, PostgreSQL and Tailwind highlighting environmental initiatives.",
    skills: ["Node.js", "Express", "PostgreSQL", "Tailwind", "EJS"],
    category: "fullstack",
    featured: false,
    demo: "https://ecoworld-climate-solutions.vercel.app",
    github: "https://github.com/Tanvir-Rafi03/ecoworld-climate-solutions",
    gradient: "linear-gradient(135deg, rgba(0,200,83,0.12) 0%, rgba(0,150,60,0.18) 100%)",
    accent: "#00c853",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24 Q14 14 24 24 Q34 34 42 24" />
        <path d="M24 6 Q14 14 24 24 Q34 14 24 6" />
        <line x1="24" y1="6" x2="24" y2="42" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Calendar App",
    desc: "Clean and interactive calendar app with event management, date navigation, and a minimal UI built with vanilla web technologies.",
    skills: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    featured: false,
    demo: null,
    download: "https://github.com/Tanvir-Rafi03/Calendar/releases/download/v1.0.0/Calendar-1.0.0-arm64.dmg",
    github: "https://github.com/Tanvir-Rafi03/Calendar",
    gradient: "linear-gradient(135deg, rgba(160,80,255,0.14) 0%, rgba(0,100,255,0.12) 100%)",
    accent: "#bf80ff",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="8" width="36" height="34" rx="3" />
        <line x1="6" y1="18" x2="42" y2="18" />
        <line x1="16" y1="4" x2="16" y2="12" />
        <line x1="32" y1="4" x2="32" y2="12" />
        <rect x="14" y="24" width="6" height="6" rx="1" />
        <rect x="28" y="24" width="6" height="6" rx="1" />
        <rect x="14" y="34" width="6" height="4" rx="1" />
      </svg>
    ),
  },
  {
    index: "05",
    title: "NieR: Automata",
    desc: "Immersive fan tribute website for NieR: Automata — cinematic layout, atmospheric visuals, and fluid animations capturing the game's dystopian aesthetic.",
    skills: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    featured: false,
    demo: "https://nier-automata-website.vercel.app/",
    github: "https://github.com/Tanvir-Rafi03/nier-automata-website",
    gradient: "linear-gradient(135deg, rgba(30,20,10,0.30) 0%, rgba(180,145,60,0.22) 100%)",
    accent: "#c9a84c",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <line x1="24" y1="8" x2="24" y2="4" />
        <line x1="20" y1="9" x2="17" y2="6" />
        <line x1="28" y1="9" x2="31" y2="6" />
        <path d="M16 24 Q10 28 10 36 L38 36 Q38 28 32 24" />
        <line x1="18" y1="36" x2="16" y2="44" />
        <line x1="30" y1="36" x2="32" y2="44" />
        <line x1="24" y1="24" x2="24" y2="36" />
        <line x1="20" y1="20" x2="28" y2="20" />
      </svg>
    ),
  },
];

const FILTERS = [
  { key: "all",       label: "ALL" },
  { key: "fullstack", label: "FULL-STACK" },
  { key: "frontend",  label: "FRONTEND" },
];

/* ── NEXT PROJECT LOADING CARD ── */
function NextProjectCard() {
  return (
    <div className="project-card project-card--next">
      <div className="next-scene">
        {/* 3D rotating cube */}
        <div className="cube-wrap">
          <div className="cube">
            <div className="cube-face cube-front"  />
            <div className="cube-face cube-back"   />
            <div className="cube-face cube-left"   />
            <div className="cube-face cube-right"  />
            <div className="cube-face cube-top"    />
            <div className="cube-face cube-bottom" />
          </div>
        </div>

        {/* Orbiting ring */}
        <div className="next-orbit">
          <div className="next-orbit-dot" />
        </div>

        <div className="next-text">
          <span className="next-tag">// NEXT_PROJECT</span>
          <p className="next-title">SOMETHING<br />COOL</p>
          <div className="next-progress">
            <div className="next-bar" />
          </div>
          <span className="next-status">BUILDING<span className="next-dots"><span /><span /><span /></span></span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />
    </div>
  );
}

/* ── PROJECT CARD ── */
function ProjectCard({ p, index }) {
  const cardRef  = useRef(null);
  const shineRef = useRef(null);
  const rafRef   = useRef(null);

  const onMouseMove = (e) => {
    if (rafRef.current) return; // throttle to one update per frame
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) { rafRef.current = null; return; }
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / rect.height) * -10;
      const ry = ((x - rect.width  / 2) / rect.width)  *  10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
      // Use transform instead of left/top — compositor only, no layout
      if (shineRef.current) {
        shineRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = null;
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (cardRef.current)  cardRef.current.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (shineRef.current) shineRef.current.style.transform = "translate3d(-999px,-999px,0)";
  };

  return (
    <div
      ref={cardRef}
      className={`project-card ${p.featured ? "project-card--featured" : ""}`}
      style={{ animationDelay: `${index * 0.08}s`, "--accent": p.accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card-shine" ref={shineRef} />
      <div className="card-scan" />

      {/* Visual panel (gradient + SVG icon instead of photo) */}
      <div className="card-img-wrap" style={{ background: p.gradient }}>
        <div className="card-svg-icon" style={{ color: p.accent }}>
          {p.icon}
        </div>
        <div className="img-overlay">
          <div className="overlay-btns">
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{marginRight:4}}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-fill">Live Demo</a>
            )}
            {!p.demo && p.download && (
              <a href={p.download} className="btn btn-fill">Download</a>
            )}
          </div>
        </div>
        <div className="card-index">{p.index}</div>
        {p.featured && <div className="featured-badge">FEATURED</div>}
      </div>

      <div className="card-body">
        <h3><span className="card-arrow">›</span> {p.title}</h3>
        <p>{p.desc}</p>
        <div className="card-skills">
          {p.skills.map((s, j) => <span key={j}>{s}</span>)}
        </div>
      </div>

      <div className="corner tl" /><div className="corner tr" />
      <div className="corner bl" /><div className="corner br" />
    </div>
  );
}

export default function Project() {
  const [filter, setFilter] = useState("all");

  const visible = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section className="project reveal" id="project">
      <div className="section-title">
        <span className="tag">// projects</span>
        <h2>MY <span>WORK</span></h2>
        <div className="line" />
      </div>

      <div className="filter-row">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? "filter-btn--active" : ""}`}
            onClick={() => setFilter(key)}
          >
            {label}
            {filter === key && <span className="filter-indicator" />}
          </button>
        ))}
        <span className="filter-count">{visible.length} PROJECT{visible.length !== 1 ? "S" : ""}</span>
      </div>

      <div className="projects-container" key={filter}>
        {visible.map((p, i) => (
          <ProjectCard key={p.index} p={p} index={i} />
        ))}
        {/* Always show the "next project" card */}
        {(filter === "all") && <NextProjectCard />}
      </div>
    </section>
  );
}
