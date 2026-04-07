import { useState, useEffect } from "react";
import "./Services.css";
import { FaCode, FaPalette, FaLaptopCode } from "react-icons/fa";
import { FaReact, FaNodeJs, FaFigma, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiTypescript } from "react-icons/si";
import { MdSpeed, MdSecurity, MdDevices, MdAutoAwesome } from "react-icons/md";

const services = [
  {
    id: "SVC_01",
    icon: <FaCode />,
    title: "Frontend Development",
    subtitle: "INTERFACE ENGINEERING",
    desc: "Building modern, interactive websites using React, HTML, CSS, JavaScript, Node.js, PHP, MySQL and Next.js. Every pixel crafted with precision.",
    tags: ["React", "Next.js", "Node.js", "MySQL", "PHP"],
    badges: [
      { icon: <FaReact />,      label: "React",       level: "EXPERT" },
      { icon: <SiNextdotjs />,  label: "Next.js",     level: "PRO" },
      { icon: <FaNodeJs />,     label: "Node.js",     level: "PRO" },
      { icon: <SiTypescript />, label: "TypeScript",  level: "ADV" },
    ],
    color: "#00bfff",
    code: [
      "import React from 'react'",
      "const App = () => {",
      "  return <Portfolio />",
      "}",
    ],
  },
  {
    id: "SVC_02",
    icon: <FaPalette />,
    title: "UI / UX Design",
    subtitle: "VISUAL SYSTEMS",
    desc: "Creating clean, immersive user interfaces with a focus on aesthetics, design systems and usability. Form meets function.",
    tags: ["Figma", "Prototyping", "Design Systems", "Wireframing"],
    badges: [
      { icon: <FaFigma />,         label: "Figma",      level: "EXPERT" },
      { icon: <SiTailwindcss />,   label: "Tailwind",   level: "PRO" },
      { icon: <MdAutoAwesome />,   label: "Motion",     level: "PRO" },
      { icon: <MdDevices />,       label: "Responsive", level: "ADV" },
    ],
    color: "#bf80ff",
    code: [
      "const theme = {",
      "  primary: '#00bfff',",
      "  accent: '#7000ff',",
      "  mode: 'cyberpunk'",
      "}",
    ],
  },
  {
    id: "SVC_03",
    icon: <FaLaptopCode />,
    title: "Web Applications",
    subtitle: "FULL-STACK SYSTEMS",
    desc: "Building full-stack web applications with dynamic features, REST APIs and smooth performance. End-to-end execution.",
    tags: ["Full-Stack", "REST API", "Performance", "MongoDB"],
    badges: [
      { icon: <SiMongodb />,   label: "MongoDB",     level: "PRO" },
      { icon: <FaDatabase />,  label: "SQL",         level: "ADV" },
      { icon: <MdSecurity />,  label: "Auth & JWT",  level: "PRO" },
      { icon: <MdSpeed />,     label: "Performance", level: "EXPERT" },
    ],
    color: "#7000ff",
    code: [
      "app.get('/api/data',",
      "  auth.verify,",
      "  async (req, res) => {",
      "    res.json(await db.find())",
      "  })",
    ],
  },
];

const levelColors = {
  EXPERT: { bg: "rgba(0,180,255,0.12)", border: "rgba(0,180,255,0.5)", text: "#00bfff" },
  PRO:    { bg: "rgba(160,80,255,0.12)", border: "rgba(160,80,255,0.5)", text: "#bf80ff" },
  ADV:    { bg: "rgba(112,0,255,0.12)", border: "rgba(112,0,255,0.4)", text: "#9060d0" },
};

function TypeWriter({ lines, active }) {
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (!active) { setDisplayed([]); return; }
    setDisplayed([]);
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) {
        setDisplayed((prev) => [...prev, lines[i]]);
        i++;
      } else clearInterval(timer);
    }, 220);
    return () => clearInterval(timer);
  }, [active, lines]);

  return (
    <div className="srv-code">
      {displayed.map((line, i) => (
        <div key={i} className="srv-code-line">
          <span className="srv-ln">{String(i + 1).padStart(2, "0")}</span>
          <span className="srv-code-text">{line}</span>
        </div>
      ))}
      {active && <span className="srv-cursor">█</span>}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const select = (i) => {
    if (i === active) return;
    setLoading(true);
    setLoadPct(0);
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 30 + 10;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setTimeout(() => { setActive(i); setLoading(false); setLoadPct(0); }, 200);
      }
      setLoadPct(Math.min(pct, 100));
    }, 80);
  };

  const s = services[active];

  return (
    <div className="services reveal" id="serv">

      <div className="section-title">
        <span className="tag">// services</span>
        <h2>WHAT I <span>DO</span></h2>
        <div className="line"></div>
      </div>

      <div className="srv-os">

        {/* SIDEBAR */}
        <div className="srv-sidebar">
          <div className="srv-sidebar-header">
            <span className="srv-sb-tag">PROGRAMS</span>
            <span className="srv-sb-count">{services.length} LOADED</span>
          </div>

          {services.map((item, i) => (
            <div
              key={i}
              className={`srv-item ${active === i ? "srv-item--active" : ""}`}
              onClick={() => select(i)}
            >
              <div className="srv-item-icon" style={{ color: active === i ? item.color : undefined }}>
                {item.icon}
              </div>
              <div className="srv-item-info">
                <span className="srv-item-id">{item.id}</span>
                <span className="srv-item-name">{item.title}</span>
              </div>
              {active === i && <div className="srv-item-dot" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>}
            </div>
          ))}

          <div className="srv-sidebar-footer">
            <span className="srv-status-dot"></span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>

        {/* PANEL */}
        <div className="srv-panel" style={{ "--srv-color": s.color }}>

          {loading && (
            <div className="srv-loading">
              <div className="srv-load-bar" style={{ width: loadPct + "%" }}></div>
              <span className="srv-load-text">LOADING {Math.round(loadPct)}%</span>
            </div>
          )}

          {!loading && (
            <>
              <div className="srv-panel-header">
                <div className="srv-panel-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="srv-panel-id">{s.id} — {s.subtitle}</span>
                <span className="srv-panel-status">● ACTIVE</span>
              </div>

              <div className="srv-panel-body">

                <div className="srv-panel-left">
                  <div className="srv-big-icon" style={{ color: s.color, filter: `drop-shadow(0 0 20px ${s.color})` }}>
                    {s.icon}
                  </div>
                  <h3 className="srv-panel-title" style={{ textShadow: `0 0 16px ${s.color}` }}>
                    {s.title}
                  </h3>
                  <p className="srv-panel-desc">{s.desc}</p>
                  <div className="srv-tags">
                    {s.tags.map((t, j) => (
                      <span key={j} className="srv-tag" style={{ borderColor: `${s.color}55`, color: s.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="srv-panel-right">

                  {/* HUD Badges */}
                  <div className="srv-badges">
                    {s.badges.map((b, j) => {
                      const lc = levelColors[b.level];
                      return (
                        <div key={j} className="srv-badge" style={{ "--bc": s.color, animationDelay: `${j * 0.1}s` }}>
                          <div className="srv-badge-top">
                            <div className="srv-badge-icon" style={{ color: s.color, filter: `drop-shadow(0 0 6px ${s.color})` }}>
                              {b.icon}
                            </div>
                            <span className="srv-badge-name">{b.label}</span>
                          </div>
                          <span
                            className="srv-badge-level"
                            style={{ background: lc.bg, border: `1px solid ${lc.border}`, color: lc.text }}
                          >
                            {b.level}
                          </span>
                          <div className="srv-badge-scan"></div>
                          <div className="srv-badge-corner srv-badge-corner--tl"></div>
                          <div className="srv-badge-corner srv-badge-corner--br"></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Code window */}
                  <div className="srv-code-wrap">
                    <div className="srv-code-header">
                      <span style={{ color: s.color }}>▶</span> OUTPUT
                    </div>
                    <TypeWriter lines={s.code} active={!loading} key={active} />
                  </div>
                </div>

              </div>

              <div className="srv-panel-footer">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`srv-dot-nav ${active === i ? "active" : ""}`}
                    style={active === i ? { background: s.color, boxShadow: `0 0 8px ${s.color}` } : {}}
                    onClick={() => select(i)}
                  ></div>
                ))}
                <span className="srv-footer-hint">CLICK TO SWITCH SERVICE</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
