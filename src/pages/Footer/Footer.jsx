import "./Footer.css"
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer(){
  return(
    <footer className="footer">
      <div className="footer-line"></div>
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo"><span>a</span>mine_</span>
          <p className="footer-copy">© 2026 Amine Hamzaoui. All rights reserved.</p>
        </div>

        <div className="footer-center">
          <span className="footer-status">
            <span className="status-dot"></span>
            Available for work
          </span>
        </div>

        <div className="social-icons">
          <a href="#"><FaGithub/></a>
          <a href="#"><FaLinkedin/></a>
          <a href="#"><FaInstagram/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
