import "./Contact.css";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const TERMINAL_LINES = [
  { text: "$ initializing secure channel...", color: "cyan", delay: 0 },
  { text: "$ encryption: AES-256 ✓", color: "green", delay: 600 },
  { text: "$ node_id: TANVIR_RAFI_DEV", color: "purple", delay: 1200 },
  { text: "$ status: ONLINE & AVAILABLE", color: "green", delay: 1800 },
  { text: "// ready to collaborate →", color: "muted", delay: 2400 },
];

function CornerDeco({ position }) {
  return <span className={`corner-deco corner-${position}`} aria-hidden="true" />;
}

function TerminalBlock() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    TERMINAL_LINES.forEach(({ delay }, i) => {
      const t = setTimeout(() => setVisible((v) => [...v, i]), delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div className="terminal-wrap">
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">connection.init</span>
        <span className="terminal-status">
          <span className="status-dot" />
          LIVE
        </span>
      </div>
      <div className="terminal-body">
        <div className="scanlines" aria-hidden="true" />
        {TERMINAL_LINES.map((line, i) =>
          visible.includes(i) ? (
            <p key={i} className={`terminal-line tl-${line.color}`}>
              {line.color !== "muted" && <span className="prompt">›</span>}
              {line.text}
              {i === visible[visible.length - 1] && <span className="cursor-blink">▋</span>}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mykbokle", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact reveal" id="contact">

      {/* Section title */}
      <div className="section-title">
        <span className="tag">// contact</span>
        <h2 className="glitch-title" data-text="GET IN TOUCH">
          GET IN <span>TOUCH</span>
        </h2>
        <div className="line" />
      </div>

      <div className="contact-container">

        {/* ── LEFT PANEL ── */}
        <div className="contact-info">
          <TerminalBlock />

          {/* Signal bars */}
          <div className="signal-row" aria-label="Connection strength: full">
            <span className="signal-label">SIG_STRENGTH</span>
            <div className="signal-bars">
              {[1,2,3,4,5].map((n) => (
                <span key={n} className={`bar bar-${n}`} />
              ))}
            </div>
            <span className="signal-val">98%</span>
          </div>

          {/* Info items */}
          <div className="info-items">
            <CornerDeco position="tl" />
            <CornerDeco position="tr" />
            <CornerDeco position="bl" />
            <CornerDeco position="br" />

            <a href="mailto:tmrafi@myseneca.ca" className="info-item" aria-label="Email">
              <span className="icon-wrap">
                <FaEnvelope />
              </span>
              <div className="info-text">
                <span className="info-label">EMAIL</span>
                <span className="info-val">tmrafi@myseneca.ca</span>
              </div>
            </a>

            <a href="tel:+14165784507" className="info-item" aria-label="Phone">
              <span className="icon-wrap">
                <FaPhone />
              </span>
              <div className="info-text">
                <span className="info-label">PHONE</span>
                <span className="info-val">+1 (416) 578-4507</span>
              </div>
            </a>

            <div className="info-item">
              <span className="icon-wrap">
                <FaMapMarkerAlt />
              </span>
              <div className="info-text">
                <span className="info-label">LOCATION</span>
                <span className="info-val">Toronto, Canada</span>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="social-row">
            <span className="social-label">CONNECT //</span>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                <FaGithub />
                <span className="social-tooltip">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <FaLinkedin />
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                <FaTwitter />
                <span className="social-tooltip">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="contact-form-wrap">
          <CornerDeco position="tl" />
          <CornerDeco position="tr" />
          <CornerDeco position="bl" />
          <CornerDeco position="br" />

          <div className="form-header">
            <span className="form-tag">// send_message.exe</span>
            <div className="form-header-dots">
              <span /><span /><span />
            </div>
          </div>

          {sent ? (
            <div className="success-state">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="success-title">TRANSMISSION COMPLETE</p>
              <p className="success-sub">Message received. I'll get back to you shortly.</p>
              <button className="reset-btn" onClick={() => { setSent(false); setFormState({ name: "", email: "", message: "" }); }}>
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${focused === "name" ? "is-focused" : ""} ${formState.name ? "has-value" : ""}`}>
                <label htmlFor="cf-name">NAME_</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  autoComplete="name"
                />
                <span className="input-glow" aria-hidden="true" />
              </div>

              <div className={`form-group ${focused === "email" ? "is-focused" : ""} ${formState.email ? "has-value" : ""}`}>
                <label htmlFor="cf-email">EMAIL_</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  autoComplete="email"
                />
                <span className="input-glow" aria-hidden="true" />
              </div>

              <div className={`form-group ${focused === "message" ? "is-focused" : ""} ${formState.message ? "has-value" : ""}`}>
                <label htmlFor="cf-message">MESSAGE_</label>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder="Type your message..."
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  required
                />
                <span className="input-glow" aria-hidden="true" />
              </div>

              <button type="submit" className="submit-btn" disabled={sending} aria-label="Send message">
                {sending ? (
                  <span className="sending-state">
                    <span className="sending-dots">
                      <span /><span /><span />
                    </span>
                    TRANSMITTING...
                  </span>
                ) : (
                  <>
                    <span>TRANSMIT</span>
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default Contact;
