import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact reveal" id="contact">

      <div className="section-title">
        <span className="tag">// contact</span>
        <h2>GET IN <span>TOUCH</span></h2>
        <div className="line"></div>
      </div>

      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">connection.init</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-line"><span className="prompt">$</span> Establishing connection...</p>
            <p className="terminal-line"><span className="prompt">$</span> Ready to collaborate.</p>
            <p className="terminal-line muted">// feel free to reach out</p>
          </div>

          <div className="info-items">
            <div className="info-item">
              <FaEnvelope className="contact-icon"/>
              <span>aminehamzaoui1925@gmail.com</span>
            </div>
            <div className="info-item">
              <FaPhone className="contact-icon"/>
              <span>+213 XX XX XX XX</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="contact-icon"/>
              <span>Algeria</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <div className="form-header">
            <span className="form-tag">// send_message.exe</span>
          </div>

          <div className="form-group">
            <label>NAME_</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>EMAIL_</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>MESSAGE_</label>
            <textarea placeholder="Type your message..." rows="5" required></textarea>
          </div>

          <button type="submit">
            <span>TRANSMIT</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>

      </div>
    </div>
  );
}

export default Contact;
