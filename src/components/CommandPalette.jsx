import { useEffect, useState, useRef, useCallback } from "react";
import "./CommandPalette.css";

const COMMANDS = [
  // ── Navigate ──────────────────────────────────────────
  { id: "nav-home",     group: "NAVIGATE",  label: "Go to Home",      hint: "hero",    icon: "⌂", action: "scroll", target: "hero" },
  { id: "nav-about",   group: "NAVIGATE",  label: "Go to About",     hint: "about",   icon: "◈", action: "scroll", target: "about" },
  { id: "nav-projects",group: "NAVIGATE",  label: "Go to Projects",  hint: "work",    icon: "◧", action: "scroll", target: "project" },
  { id: "nav-services",group: "NAVIGATE",  label: "Go to Services",  hint: "skills",  icon: "◆", action: "scroll", target: "serv" },
  { id: "nav-contact", group: "NAVIGATE",  label: "Go to Contact",   hint: "contact", icon: "◉", action: "scroll", target: "contact" },
  // ── Connect ───────────────────────────────────────────
  { id: "open-github",  group: "CONNECT",   label: "Open GitHub",     hint: "Tanvir-Rafi03", icon: "GH", action: "link", target: "https://github.com/Tanvir-Rafi03" },
  { id: "open-linkedin",group: "CONNECT",   label: "Open LinkedIn",   hint: "profile",      icon: "IN", action: "link", target: "https://linkedin.com" },
  { id: "copy-email",   group: "CONNECT",   label: "Copy Email",      hint: "tmrafi@myseneca.ca", icon: "✉", action: "copy", target: "tmrafi@myseneca.ca" },
  { id: "copy-phone",   group: "CONNECT",   label: "Copy Phone",      hint: "+1 (416) 578-4507",  icon: "☏", action: "copy", target: "+1(416)578-4507" },
  // ── System ────────────────────────────────────────────
  { id: "scroll-top",   group: "SYSTEM",    label: "Scroll to Top",   hint: "↑ top",   icon: "↑", action: "scroll", target: "hero" },
  { id: "theme-glitch", group: "SYSTEM",    label: "Trigger Glitch",  hint: "👾 fun",  icon: "⚡", action: "glitch" },
  { id: "sys-info",     group: "SYSTEM",    label: "System Info",     hint: "about site", icon: "ℹ", action: "sysinfo" },
];

function groupCommands(list) {
  const groups = {};
  list.forEach(cmd => {
    if (!groups[cmd.group]) groups[cmd.group] = [];
    groups[cmd.group].push(cmd);
  });
  return groups;
}

export default function CommandPalette() {
  const [open,    setOpen]    = useState(false);
  const [query,   setQuery]   = useState("");
  const [cursor,  setCursor]  = useState(0);
  const [toast,   setToast]   = useState(null);
  const [glitch,  setGlitch]  = useState(false);
  const [sysOpen, setSysOpen] = useState(false);
  const inputRef  = useRef(null);
  const listRef   = useRef(null);
  const toastRef  = useRef(null);

  // ── Filter ──────────────────────────────────────────
  const filtered = query.trim()
    ? COMMANDS.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.hint.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // ── Open/close keyboard shortcut ───────────────────
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setCursor(0);
        setSysOpen(false);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setSysOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Focus input on open ─────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // ── Arrow keys + Enter ──────────────────────────────
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(c => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor(c => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      if (filtered[cursor]) execute(filtered[cursor]);
    }
  };

  // ── Scroll active item into view ────────────────────
  useEffect(() => {
    const el = listRef.current?.querySelector(".cp-item--active");
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  // ── Reset cursor on query change ────────────────────
  useEffect(() => { setCursor(0); }, [query]);

  // ── Execute ─────────────────────────────────────────
  const execute = useCallback((cmd) => {
    setOpen(false);
    setQuery("");

    if (cmd.action === "scroll") {
      const el = document.getElementById(cmd.target);
      if (!el) return;
      if (window["__lenis"]) window["__lenis"].scrollTo(el, { offset: -80, duration: 1.0 });
      else el.scrollIntoView({ behavior: "smooth" });
    }

    if (cmd.action === "link") {
      window.open(cmd.target, "_blank", "noopener,noreferrer");
    }

    if (cmd.action === "copy") {
      navigator.clipboard.writeText(cmd.target).then(() => showToast(`Copied: ${cmd.target}`));
    }

    if (cmd.action === "glitch") {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 800);
    }

    if (cmd.action === "sysinfo") {
      setSysOpen(true);
      setOpen(false);
    }
  }, []);

  const showToast = (msg) => {
    if (toastRef.current) clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(() => setToast(null), 2200);
  };

  const groups = groupCommands(filtered);
  let flatIdx = 0;

  return (
    <>
      {/* ── GLOBAL GLITCH OVERLAY ── */}
      {glitch && <div className="cp-glitch-overlay" aria-hidden="true" />}

      {/* ── TOAST ── */}
      {toast && <div className="cp-toast">{toast}</div>}

      {/* ── TRIGGER PILL ── */}
      <button
        className="cp-trigger"
        onClick={() => { setOpen(true); setQuery(""); setCursor(0); }}
        aria-label="Open command palette"
      >
        <span className="cp-trigger-icon">⌘</span>
        <span className="cp-trigger-label">CMD</span>
        <kbd className="cp-trigger-kbd">CTRL+K</kbd>
      </button>

      {/* ── SYS INFO PANEL ── */}
      {sysOpen && (
        <div className="cp-backdrop" onClick={() => setSysOpen(false)}>
          <div className="cp-sysinfo" onClick={e => e.stopPropagation()}>
            <div className="cp-sysinfo-header">
              <span className="cp-sysinfo-title">// SYSTEM_INFO</span>
              <button className="cp-close" onClick={() => setSysOpen(false)}>✕</button>
            </div>
            <div className="cp-sysinfo-grid">
              {[
                ["OPERATOR",  "Tanvir Mahmud Rafi"],
                ["ROLE",      "Full-Stack Developer"],
                ["LOCATION",  "Toronto, Canada"],
                ["STACK",     "React · Node · PostgreSQL"],
                ["STATUS",    "ONLINE · AVAILABLE"],
                ["BUILD",     "Portfolio v1.0 · 2025"],
                ["RUNTIME",   navigator.userAgent.split(" ").slice(-1)[0]],
                ["VIEWPORT",  `${window.innerWidth} × ${window.innerHeight}`],
              ].map(([k, v]) => (
                <div key={k} className="cp-sysinfo-row">
                  <span className="cp-sysinfo-key">{k}</span>
                  <span className="cp-sysinfo-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PALETTE ── */}
      {open && (
        <div className="cp-backdrop" onClick={() => setOpen(false)}>
          <div
            className="cp-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            {/* Header */}
            <div className="cp-header">
              <span className="cp-header-prompt">&gt;_</span>
              <input
                ref={inputRef}
                className="cp-input"
                placeholder="Type a command or search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="cp-esc" onClick={() => setOpen(false)}>ESC</kbd>
            </div>

            {/* Scan line */}
            <div className="cp-scanline" />

            {/* Results */}
            <div className="cp-list" ref={listRef}>
              {filtered.length === 0 && (
                <div className="cp-empty">NO COMMANDS FOUND — "{query}"</div>
              )}
              {Object.entries(groups).map(([group, cmds]) => (
                <div key={group} className="cp-group">
                  <div className="cp-group-label">{group}</div>
                  {cmds.map((cmd) => {
                    const isActive = flatIdx === cursor;
                    const myIdx = flatIdx++;
                    return (
                      <button
                        key={cmd.id}
                        className={`cp-item ${isActive ? "cp-item--active" : ""}`}
                        onMouseEnter={() => setCursor(myIdx)}
                        onClick={() => execute(cmd)}
                      >
                        <span className="cp-item-icon">{cmd.icon}</span>
                        <span className="cp-item-label">{cmd.label}</span>
                        <span className="cp-item-hint">{cmd.hint}</span>
                        {isActive && <span className="cp-item-arrow">↵</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cp-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>ESC</kbd> close</span>
              <span className="cp-footer-brand">// TANVIR_OS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
