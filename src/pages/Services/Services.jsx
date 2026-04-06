import "./Services.css"
import { FaCode, FaPalette, FaLaptopCode } from "react-icons/fa";

const services = [
  {
    icon: <FaCode />,
    num: "01",
    title: "Frontend Development",
    desc: "Building modern, interactive websites using React, HTML, CSS, JavaScript, Node.js, PHP, MySQL and Next.js.",
    tags: ["React", "Next.js", "Node.js"]
  },
  {
    icon: <FaPalette />,
    num: "02",
    title: "UI / UX Design",
    desc: "Creating clean, immersive user interfaces with a focus on aesthetics, design systems and usability.",
    tags: ["Figma", "Design", "Prototyping"]
  },
  {
    icon: <FaLaptopCode />,
    num: "03",
    title: "Web Applications",
    desc: "Building full-stack web applications with dynamic features, APIs and smooth performance.",
    tags: ["Full-Stack", "API", "Performance"]
  }
]

function Services(){
  return(
    <div className="services reveal" id="serv">

      <div className="section-title">
        <span className="tag">// services</span>
        <h2>WHAT I <span>DO</span></h2>
        <div className="line"></div>
      </div>

      <div className="services-container">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-num">{s.num}</div>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t, j) => <span key={j}>{t}</span>)}
            </div>
            <div className="card-border-anim"></div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Services;
