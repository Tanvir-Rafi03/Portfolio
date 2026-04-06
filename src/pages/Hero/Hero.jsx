import UnicornScene from "unicornstudio-react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero" id="hero">
      <div className="hero-layout">
        <div className="unicorn-wrapper">
          <UnicornScene
            projectId="l5jBDOqYqfW2C3iONF81"
            width="900px"
            height="900px"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
          />
        </div>

        <div className="btns-overlay">
          <a href="#contact" className="hero-btn">Contact</a>
          <a href="#about" className="hero-btn">Who I'm</a>
        </div>
      </div>
    </div>
  );
}
