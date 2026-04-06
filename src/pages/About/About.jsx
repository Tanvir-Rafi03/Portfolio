import { useState } from "react";
import "./About.css";
import Skills from "./Skills";

function About() {
  const [flip, setFlip] = useState(false);

  return (
    <div className="about reveal" id="about">

      <div className="about-title">
        <span className="title-tag">// about_me</span>
        <h2>ABOUT <span>ME</span></h2>
        <div className="title-line"></div>
      </div>

      <div className="content">

        <div className="photo-card" onClick={() => setFlip(!flip)}>
          <div className="card-scanline"></div>
          <div className="card-corner tl"></div>
          <div className="card-corner tr"></div>
          <div className="card-corner bl"></div>
          <div className="card-corner br"></div>

          <div className={flip ? "photo-inner flip" : "photo-inner"}>
            <div className="photo-front">
              <img src="img3.png" alt="" />
              <div className="photo-overlay">
                <span>CLICK TO FLIP</span>
              </div>
            </div>
            <div className="photo-back">
              <img src="img4.png" alt="" />
              <div className="photo-overlay">
                <span>CLICK TO FLIP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-about">
          <div className="glitch-label">SYS://PROFILE_LOADED</div>
          <p>
            Hi, I'm Amine, a passionate Frontend Developer and Computer Science student.
            I enjoy building modern, responsive, and interactive web interfaces that provide
            a great user experience. I focus on clean design, smooth animations, and writing
            efficient code using modern web technologies. I'm always learning new tools and
            improving my skills to create better digital products. My goal is to combine
            creativity with technology to build websites that are both beautiful and functional.
          </p>
          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">02+</span>
              <span className="stat-label">Years Exp</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>
        </div>

      </div>

      <Skills />

    </div>
  );
}

export default About;
