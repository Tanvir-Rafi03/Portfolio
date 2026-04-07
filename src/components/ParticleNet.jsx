import { useEffect, useRef } from "react";

export default function ParticleNet() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d", { alpha: true });
    let animId;
    const mouse  = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onResize   = () => resize();
    // passive — never blocks scroll
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    window.addEventListener("resize",    onResize,    { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Fixed palette — no per-draw object creation
    const COLORS = [
      [112,   0, 255],
      [  0, 120, 255],
      [  0, 191, 255],
      [160,  80, 255],
    ];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x   = Math.random() * canvas.width;
        this.y   = Math.random() * canvas.height;
        this.vx  = (Math.random() - 0.5) * 0.35;
        this.vy  = (Math.random() - 0.5) * 0.35;
        this.r   = Math.random() * 1.2 + 0.5;
        this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const d2   = dx * dx + dy * dy;
        if (d2 < 12000) { // 110^2
          const d     = Math.sqrt(d2);
          const force = (110 - d) / 110;
          this.x += (dx / d) * force * 2;
          this.y += (dy / d) * force * 2;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
    }

    // Keep particle count low — big win
    const MAX_PARTICLES = Math.min(
      Math.floor((canvas.width * canvas.height) / 18000),
      55
    );
    const particles = Array.from({ length: MAX_PARTICLES }, () => new Particle());

    const MAX_DIST    = 120;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const MOUSE_DIST  = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Connections — no gradient objects, just solid rgba lines
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > MAX_DIST_SQ) continue;

          const alpha = (1 - Math.sqrt(d2) / MAX_DIST) * 0.28;
          const [r, g, b] = pi.col;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      // ── Mouse attraction lines — capped at 8
      let mouseLines = 0;
      for (let i = 0; i < particles.length && mouseLines < 8; i++) {
        const p  = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_DIST * MOUSE_DIST) {
          const alpha = (1 - Math.sqrt(d2) / MOUSE_DIST) * 0.45;
          const [r, g, b] = p.col;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
          mouseLines++;
        }
      }

      // ── Particles — no shadowBlur (most expensive canvas op)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        const [r, g, b] = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}
