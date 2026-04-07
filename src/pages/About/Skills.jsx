import "./Skills.css";
import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub, FaFigma, FaNodeJs, FaJava } from "react-icons/fa";
import { SiUnity, SiTailwindcss, SiFirebase, SiMongodb, SiExpress, SiMysql, SiPhp, SiTypescript, SiPostgresql } from "react-icons/si";

const ALL_SKILLS = [
  // Frontend
  { Icon: FaHtml5,       name: "HTML5",      color: "#e34c26", level: 5, cat: "FRONTEND" },
  { Icon: FaCss3Alt,     name: "CSS3",        color: "#264de4", level: 5, cat: "FRONTEND" },
  { Icon: FaJs,          name: "JavaScript",  color: "#f7df1e", level: 4, cat: "FRONTEND" },
  { Icon: FaReact,       name: "React",       color: "#61dafb", level: 4, cat: "FRONTEND" },
  { Icon: SiTypescript,  name: "TypeScript",  color: "#3178c6", level: 3, cat: "FRONTEND" },
  { Icon: SiTailwindcss, name: "Tailwind",    color: "#38bdf8", level: 4, cat: "FRONTEND" },
  { Icon: FaFigma,       name: "Figma",       color: "#a259ff", level: 3, cat: "FRONTEND" },
  // Backend
  { Icon: FaNodeJs,      name: "Node.js",     color: "#3c873a", level: 3, cat: "BACKEND" },
  { Icon: SiExpress,     name: "Express",     color: "#9080c0", level: 3, cat: "BACKEND" },
  { Icon: SiMongodb,     name: "MongoDB",     color: "#4db33d", level: 3, cat: "BACKEND" },
  { Icon: SiPostgresql,  name: "PostgreSQL",  color: "#336791", level: 3, cat: "BACKEND" },
  { Icon: FaJava,        name: "Java",        color: "#f89820", level: 3, cat: "BACKEND" },
  { Icon: SiMysql,       name: "MySQL",       color: "#00758f", level: 3, cat: "BACKEND" },
  { Icon: SiPhp,         name: "PHP",         color: "#8892be", level: 2, cat: "BACKEND" },
  // Tools
  { Icon: FaGitAlt,      name: "Git",         color: "#f14e32", level: 4, cat: "TOOLS" },
  { Icon: FaGithub,      name: "GitHub",      color: "#c0b0ff", level: 4, cat: "TOOLS" },
  { Icon: SiFirebase,    name: "Firebase",    color: "#ffca28", level: 2, cat: "TOOLS" },
  { Icon: SiUnity,       name: "Unity",       color: "#a0a0b0", level: 2, cat: "TOOLS" },
];

const CATS = ["ALL", "FRONTEND", "BACKEND", "TOOLS"];

const LEVEL_LABEL = ["", "NOVICE", "LEARNING", "PROFICIENT", "ADVANCED", "EXPERT"];

function SkillCard({ Icon, name, color, level }) {
  const pct = (level / 5) * 100;
  return (
    <div className="sk-card" style={{ "--c": color }}>
      <span className="sk-corner sk-tl" aria-hidden="true" />
      <span className="sk-corner sk-br" aria-hidden="true" />
      <span className="sk-scan"       aria-hidden="true" />
      <span className="sk-pulse-ring" aria-hidden="true" />

      <div className="sk-icon"><Icon /></div>
      <span className="sk-name">{name}</span>

      {/* Fill bar instead of dots */}
      <div className="sk-bar-wrap" title={LEVEL_LABEL[level]}>
        <div
          className="sk-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
      <span className="sk-level-label">{LEVEL_LABEL[level]}</span>

      <span className="sk-bottom-bar" aria-hidden="true" />
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("ALL");

  const filtered = active === "ALL" ? ALL_SKILLS : ALL_SKILLS.filter(s => s.cat === active);
  const row1 = filtered.slice(0, Math.ceil(filtered.length / 2));
  const row2 = filtered.slice(Math.ceil(filtered.length / 2));

  return (
    <div className="skills">

      {/* ── Header ── */}
      <div className="skills-header">
        <div className="skills-header-left">
          <span className="skills-label">// tech_stack</span>
          <span className="skills-status">
            <span className="skills-status-dot" />
            SCANNING
          </span>
        </div>
        <div className="skills-header-line" />
        <span className="skills-count">{filtered.length} MODULES</span>
      </div>

      {/* ── Category filter tabs ── */}
      <div className="skills-tabs">
        {CATS.map(cat => (
          <button
            key={cat}
            className={`skills-tab ${active === cat ? "skills-tab--active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {active === cat && <span className="skills-tab-dot" />}
            {cat}
            {active === cat && <span className="skills-tab-bar" />}
          </button>
        ))}
        <div className="skills-tabs-line" />
      </div>

      {/* ── Marquee rows ── */}
      <div className="skills-wrap" key={active}>
        <div className="skills-scanbar" aria-hidden="true" />

        <div className="skills-row">
          <div className="skills-track skills-track--left">
            {[...row1, ...row1].map((s, i) => <SkillCard key={i} {...s} />)}
          </div>
        </div>

        {row2.length > 0 && (
          <div className="skills-row">
            <div className="skills-track skills-track--right">
              {[...row2, ...row2].map((s, i) => <SkillCard key={i} {...s} />)}
            </div>
          </div>
        )}

        <div className="skills-fade skills-fade--left"  aria-hidden="true" />
        <div className="skills-fade skills-fade--right" aria-hidden="true" />
      </div>

    </div>
  );
}
