import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top = mouseY + "px";
      }
    };

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }

      requestAnimationFrame(animate);
    };

    // Hover effects on interactive elements
    const onEnter = () => {
      dotRef.current?.classList.add("cursor-hover");
      ringRef.current?.classList.add("cursor-hover");
    };

    const onLeave = () => {
      dotRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("cursor-hover");
    };

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [class*='card'], input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    addHoverListeners();
    animate();

    // Re-apply on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
