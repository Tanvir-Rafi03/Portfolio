import "./Project.css";
import img1 from "../../assets/images/Cleveroad.jpg";
import img2 from "../../assets/images/Capture d'écran 2025-10-22 182207.png";
import img3 from "../../assets/images/Weather Forecast Dashboard.jpg";
import img4 from "../../assets/images/WordPress dashboard design concept.jpg";
import img5 from "../../assets/images/Game Dashboard Design.jpg";
import img6 from "../../assets/images/Task manager app.jpg";

const projects = [
  { title: "E-Commerce Website", img: img1, desc: "Modern online store with product filtering, cart, and payment system.", skills: ["HTML", "CSS", "JavaScript"], index: "01" },
  { title: "Portfolio Website",   img: img2, desc: "Personal portfolio to showcase my design and coding projects.", skills: ["HTML", "CSS", "Bootstrap"], index: "02" },
  { title: "Weather App",         img: img3, desc: "Responsive app showing real-time weather data using API integration.", skills: ["HTML", "CSS", "API"], index: "03" },
  { title: "Blog Website",        img: img4, desc: "Clean and simple blogging platform with markdown support.", skills: ["HTML", "Tailwind", "JavaScript"], index: "04" },
  { title: "Game Landing Page",   img: img5, desc: "Landing page for a game with animations and parallax effects.", skills: ["HTML", "CSS", "GSAP"], index: "05" },
  { title: "Task Manager",        img: img6, desc: "Task tracking web app with CRUD features and clean UI.", skills: ["HTML", "CSS", "JS"], index: "06" }
];

export default function Project() {
  return (
    <section className="project reveal" id="project">

      <div className="section-title">
        <span className="tag">// projects</span>
        <h2>MY <span>WORK</span></h2>
        <div className="line"></div>
      </div>

      <div className="projects-container">
        {projects.map((p, i) => (
          <div className="project-card" key={i}>

            <div className="card-img-wrap">
              <img src={p.img} alt={p.title} />
              <div className="img-overlay">
                <div className="overlay-btns">
                  <a href="#" className="btn">GitHub</a>
                  <a href="#" className="btn btn-fill">Live Demo</a>
                </div>
              </div>
              <div className="card-index">{p.index}</div>
            </div>

            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="skills">
                {p.skills.map((s, j) => <a href="#" key={j}>{s}</a>)}
              </div>
            </div>

            <div className="corner tl"></div>
            <div className="corner tr"></div>
            <div className="corner bl"></div>
            <div className="corner br"></div>
          </div>
        ))}
      </div>

    </section>
  );
}
