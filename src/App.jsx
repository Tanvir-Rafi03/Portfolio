import { useEffect } from "react"
import Cursor from "./components/Cursor"
import ParticleNet from "./components/ParticleNet"
import Header from "./components/Header"
import Hero from "./pages/Hero/Hero"
import About from "./pages/About/About"
import Project from "./pages/Project/Project"
import Services from "./pages/Services/Services"
import Contact from "./pages/Contact/Contact"
import Footer from "./pages/Footer/Footer"

function App() {

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("scroll-bar")
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (bar) bar.style.width = pct + "%"
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <Cursor />
      <ParticleNet />
      <div id="scroll-bar"></div>
      <div className="noise-overlay"></div>
      <Header />
      <Hero />
      <About />
      <Project />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}

export default App
