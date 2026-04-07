import { useState, useEffect, useRef } from "react";
import "./About.css";
import Skills from "./Skills";

function useCountUp(target, duration = 1500, suffix = "+") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === "∞") return;
    const num = parseInt(target);
    const step = Math.ceil(num / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  if (target === "∞") return [ref, "∞"];
  return [ref, started ? `${count}${suffix}` : `0${suffix}`];
}

function StatItem({ value, suffix, label }) {
  const [ref, display] = useCountUp(value, 1500, suffix);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-num">{display}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function About() {
  const [flip, setFlip] = useState(false);

  return (
    <div className="about reveal" id="about">

      <div className="about-title">
        <span className="title-tag">// about_me</span>
        <h2>ABOUT <span>ME</span></h2>
        <div className="title-line" />
      </div>

      <div className="content">

        {/* Photo card */}
        <div className="photo-card reveal-left" onClick={() => setFlip(!flip)}>
          <div className="card-scanline" />
          <div className="card-corner tl" />
          <div className="card-corner tr" />
          <div className="card-corner bl" />
          <div className="card-corner br" />

          {/* Glowing border ring */}
          <div className="card-glow-ring" />

          <div className={flip ? "photo-inner flip" : "photo-inner"}>
            <div className="photo-front">
              <img src="img3.png" alt="Tanvir Mahmud Rafi" />
              <div className="photo-overlay"><span>CLICK TO FLIP</span></div>
            </div>
            <div className="photo-back">
              <img src="img4.png" alt="Tanvir Mahmud Rafi" />
              <div className="photo-overlay"><span>CLICK TO FLIP</span></div>
            </div>
          </div>

          {/* HUD overlay on photo */}
          <div className="photo-hud">
            <span className="photo-hud-id">ID:0042</span>
            <span className="photo-hud-status">
              <span className="photo-hud-dot" />
              ACTIVE
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="text-about reveal-right">

          <div className="glitch-label">SYS://PROFILE_LOADED</div>

          {/* Availability badge */}
          <div className="avail-badge">
            <span className="avail-dot" />
            <span>Open to opportunities</span>
          </div>

          <p>
            Hi, I'm <span className="highlight">Tanvir</span>, a passionate{" "}
            <span className="highlight">Frontend Developer</span> and Computer Science student.
            I enjoy building modern, responsive, and interactive web interfaces that provide
            a great user experience. I focus on clean design, smooth animations, and writing
            efficient code using modern web technologies. I'm always learning new tools and
            improving my skills to create better digital products. My goal is to combine{" "}
            <span className="highlight">creativity</span> with{" "}
            <span className="highlight">technology</span> to build websites that are both
            beautiful and functional.
          </p>

          {/* Stats with count-up */}
          <div className="stats-row">
            <div className="stat stat-badge">
              <div className="stat-orbit">
                <span className="orbit-core" />
                <span className="orbit-ring orbit-ring--1">
                  <span className="orbit-dot" />
                </span>
                <span className="orbit-ring orbit-ring--2">
                  <span className="orbit-dot" />
                </span>
              </div>
              <span className="stat-label">Rising Dev</span>
            </div>
            <div className="stat-divider" />
            <StatItem value="10" suffix="+" label="Projects" />
            <div className="stat-divider" />
            <StatItem value="∞" label="Curiosity" />
          </div>

        </div>
      </div>

      <Skills />
    </div>
  );
}

export default About;
