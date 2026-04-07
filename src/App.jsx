import { useEffect, useState } from "react"
import Lenis from "lenis"
import Cursor from "./components/Cursor"
import ParticleNet from "./components/ParticleNet"
import BootScreen from "./components/BootScreen"
import ScrollHUD from "./components/ScrollHUD"
import CommandPalette from "./components/CommandPalette"
import ActivityMonitor from "./components/ActivityMonitor"
import Header from "./components/Header"
import Hero from "./pages/Hero/Hero"
import About from "./pages/About/About"
import Project from "./pages/Project/Project"
import Services from "./pages/Services/Services"
import Contact from "./pages/Contact/Contact"
import Footer from "./pages/Footer/Footer"

function App() {
  const [booted, setBooted] = useState(false)

  // ── Lenis smooth scroll ──────────────────────────────
  useEffect(() => {
    if (!booted) return

    const lenis = new Lenis({
      duration: 0.65,                              // snappy, not sluggish
      easing: (t) => 1 - Math.pow(1 - t, 3),      // cubic ease-out — fast start, smooth stop
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.4,                        // faster wheel response
      touchMultiplier: 2.2,
      infinite: false,
    })

    // Expose so ScrollHUD can call lenis.scrollTo()
    window["__lenis"] = lenis

    // Make anchor links work with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) lenis.scrollTo(target, { offset: -80, duration: 1.0 })
      })
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [booted])

  // ── Scroll reveal ────────────────────────────────────
  useEffect(() => {
    if (!booted) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.04, rootMargin: "0px 0px -20px 0px" }
    )
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [booted])

  // ── Scroll progress bar (scaleX — no layout cost) ────
  useEffect(() => {
    const bar = document.getElementById("scroll-bar")
    let rafId
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        if (bar) bar.style.transform = `scaleX(${pct})`
        rafId = null
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <Cursor />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <ParticleNet />
          <ScrollHUD />
          <CommandPalette />
          <ActivityMonitor />
          <div id="scroll-bar" />
          <div className="noise-overlay" />
          <Header />
          <Hero />
          <About />
          <Project />
          <Services />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
