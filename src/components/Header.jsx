import "./Header.css"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const NAV = [
  { id: "hero",    label: "Home",     num: "01" },
  { id: "about",   label: "About",    num: "02" },
  { id: "project", label: "Projects", num: "03" },
  { id: "serv",    label: "Services", num: "04" },
  { id: "contact", label: "Contact",  num: "05" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState("hero")
  const [scanPos,  setScanPos]  = useState(-100)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, show: false })
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const scanRef   = useRef(null)
  const rafRef    = useRef(null)

  // ── Scroll tracking ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(NAV[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Scan sweep animation ─────────────────────────────
  useEffect(() => {
    let pos = -100
    const step = () => {
      pos += 0.6
      if (pos > 110) pos = -100
      setScanPos(pos)
      scanRef.current = requestAnimationFrame(step)
    }
    scanRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(scanRef.current)
  }, [])

  // ── Mouse spotlight only (no tilt) ───────────────────
  const onMouseMove = (e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const rect = headerRef.current?.getBoundingClientRect()
      if (!rect) { rafRef.current = null; return }
      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      setSpotlight({ x: px, y: py, show: true })
      rafRef.current = null
    })
  }

  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setSpotlight(s => ({ ...s, show: false }))
  }

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (window["__lenis"]) window["__lenis"].scrollTo(el, { offset: -80, duration: 1.0 })
    else el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
    <header
      ref={headerRef}
      className={`header ${scrolled ? "scroll" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Mouse spotlight glow */}
      <div
        className="hdr-spotlight"
        style={{
          opacity:    spotlight.show ? 1 : 0,
          background: `radial-gradient(180px circle at ${spotlight.x}% ${spotlight.y}%, rgba(0,191,255,0.07), transparent 70%)`,
          transition: spotlight.show ? "none" : "opacity 0.5s",
        }}
      />

      {/* Scan sweep */}
      <div className="hdr-scan" style={{ left: `${scanPos}%` }} />

      {/* HUD corner marks */}
      <span className="hdr-corner hdr-tl" />
      <span className="hdr-corner hdr-tr" />
      <span className="hdr-corner hdr-bl" />
      <span className="hdr-corner hdr-br" />

      {/* ── LOGO ── */}
      <div className="hdr-logo">
        <span className="hdr-logo-bracket">&lt;</span>
        <span className="hdr-logo-name">tanvir</span>
        <span className="hdr-logo-bracket">/&gt;</span>
        <span className="hdr-logo-cursor" />
      </div>

      {/* ── NAV ── */}
      <nav className="hdr-nav">
        {NAV.map(({ id, label, num }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              className={`hdr-link ${isActive ? "hdr-link--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span className="hdr-link-num">{num}</span>
              <span className="hdr-link-label">{label}</span>
              {isActive && <span className="hdr-link-bar" />}
              <span className="hdr-link-bracket hdr-link-bracket--l">[</span>
              <span className="hdr-link-bracket hdr-link-bracket--r">]</span>
            </button>
          )
        })}
      </nav>

      {/* ── RIGHT: status + socials ── */}
      <div className="hdr-right">
        <span className="hdr-status">
          <span className="hdr-status-dot" />
          ONLINE
        </span>
        <div className="hdr-socials">
          <a
            className="hdr-social"
            href="https://github.com/Tanvir-Rafi03"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            className="hdr-social"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>

      {/* ── HAMBURGER (mobile only) ── */}
      <button
        className={`hdr-hamburger ${menuOpen ? "hdr-hamburger--open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        <span /><span /><span />
      </button>
    </header>

    {/* ── MOBILE MENU ── */}
    {menuOpen && (
      <div className="hdr-mobile-menu">
        <nav className="hdr-mobile-nav">
          {NAV.map(({ id, label, num }) => (
            <button
              key={id}
              className={`hdr-mobile-link ${active === id ? "hdr-mobile-link--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span className="hdr-mobile-num">{num}</span>
              <span className="hdr-mobile-label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="hdr-mobile-socials">
          <a href="https://github.com/Tanvir-Rafi03" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
        </div>
      </div>
    )}
    </>
  )
}
