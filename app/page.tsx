"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  r: number; base: number; alpha: number;
}

// Floor color from Scene.tsx: #B37CCB  Wall: #AC79B4
const COLOR_A = "179,124,203";  // #B37CCB — purple floor
const COLOR_B = "172,121,180";  // #AC79B4 — wall purple

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const orbsRef   = useRef<Orb[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    orbsRef.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.5,
      base: Math.random(),
      alpha: Math.random() * 0.45 + 0.15,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      // Vertical grid lines tinted purple
      for (let c = 0; c <= 20; c++) {
        const x = (c / 20) * W;
        const d = Math.abs((mouseRef.current.x / W) - c / 20);
        ctx.strokeStyle = `rgba(${COLOR_A},${Math.max(0.015, 0.055 - d * 0.1)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }

      // Orbs
      orbsRef.current.forEach((o) => {
        const dx   = mouseRef.current.x - o.x;
        const dy   = mouseRef.current.y - o.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = Math.max(0, 1 - dist / 260);

        o.vx += (dx / dist) * pull * 0.04;
        o.vy += (dy / dist) * pull * 0.04;
        o.vx *= 0.96; o.vy *= 0.96;
        o.x  += o.vx;  o.y  += o.vy;

        if (o.x < -10) o.x = W + 10; if (o.x > W + 10) o.x = -10;
        if (o.y < -10) o.y = H + 10; if (o.y > H + 10) o.y = -10;

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r + pull * 2.5, 0, Math.PI * 2);
        const col = o.base < 0.55 ? COLOR_A : COLOR_B;
        ctx.fillStyle = `rgba(${col},${o.alpha + pull * 0.5})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(frame);
    };
    frame();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#0a070e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }}
      />

      {/* Ambient glow blobs */}
      <div style={{
        position: "fixed", top: -150, left: -150,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(179,124,203,0.12) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: -100,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(172,121,180,0.10) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", top: "40%", left: "50%", transform: "translateX(-50%)",
        width: 700, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(179,124,203,0.07) 0%, transparent 70%)",
        filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Message */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            color: `rgba(${COLOR_A}, 0.85)`,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 300,
          }}
        >
          Website closed temporarily
        </p>
      </div>
    </div>
  );
}