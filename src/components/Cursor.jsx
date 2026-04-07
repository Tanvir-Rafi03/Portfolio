import { useEffect, useRef } from "react";
import "./Cursor.css";

const HOVER_SELECTOR = "a, button, input, textarea, [class*='card'], [class*='btn'], label";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don't run cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId;

    // ── Dot follows instantly (compositor thread via transform3d)
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // ── Ring lerps behind the dot each frame
    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    // ── Single delegated listener — no MutationObserver, no per-element loops
    const onEnter = (e) => {
      if (!e.target.matches(HOVER_SELECTOR)) return;
      dotRef.current?.classList.add("cursor-hover");
      ringRef.current?.classList.add("cursor-hover");
    };
    const onLeave = (e) => {
      if (!e.target.matches(HOVER_SELECTOR)) return;
      dotRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    // Capture phase so we catch events on all descendants without per-element binding
    document.addEventListener("mouseover",  onEnter, { passive: true });
    document.addEventListener("mouseout",   onLeave, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
