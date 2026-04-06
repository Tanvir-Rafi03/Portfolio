import "./Header.css"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"

function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState("hero")

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            const sections = ["hero", "about", "project", "serv", "contact"]
            for (let id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 200) {
                    setActive(id)
                    break
                }
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={scrolled ? "header scroll" : "header"}>
            <div className="logo">
                <h1><span>a</span>mine</h1>
            </div>

            <ul className="links">
                {[
                    { id: "hero", label: "Home" },
                    { id: "about", label: "About" },
                    { id: "project", label: "Projects" },
                    { id: "serv", label: "Services" },
                    { id: "contact", label: "Contact" },
                ].map(({ id, label }) => (
                    <li key={id}>
                        <a href={`#${id}`} className={active === id ? "nav-active" : ""}>{label}</a>
                    </li>
                ))}
            </ul>

            <ul className="icons">
                <li><a href="#"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            </ul>
        </header>
    )
}

export default Header
