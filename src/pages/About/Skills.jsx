import "./Skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub, FaFigma, FaNodeJs, FaJava } from "react-icons/fa";
import { SiUnity, SiTailwindcss, SiFirebase, SiMongodb, SiExpress, SiMysql, SiPhp } from "react-icons/si";

const icons = [
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, SiMysql, SiPhp,
  FaNodeJs, SiExpress, SiMongodb, FaGitAlt, FaGithub, FaFigma,
  SiUnity, SiTailwindcss, SiFirebase
];

function Skills(){
  return(
    <div className="skills">
      <p className="skills-label">// tech_stack</p>
      <div className="skills-slider">
        <div className="skills-track">
          {[...icons, ...icons].map((Icon, i) => <Icon key={i} />)}
        </div>
      </div>
    </div>
  )
}

export default Skills;
