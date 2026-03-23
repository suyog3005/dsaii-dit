"use client";

import { useState, useEffect, useRef } from "react";
import { MovieGrid } from "@/components/cinequest-components/MovieGrid";
import { Background } from "@/components/cinequest-components/Background";
import { PaparazziFlash } from "@/components/cinequest-components/PaparazziFlash";
import { HeroContent } from "@/components/cinequest-components/HeroContent";
import { GoldDust, WandCursor, type DustParticle } from "@/components/cinequest-components/CursorEffects";




export default function Page() {
  const [mouse, setMouse] = useState({ x: -300, y: -300 });
  const [dust, setDust] = useState<DustParticle[]>([]);
  const dustId = useRef(0);
  const lastD = useRef(0);

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      const now = Date.now();
      if (now - lastD.current < 36) return;
      lastD.current = now;
      const n = 2 + Math.floor(Math.random() * 2);
      setDust(d => [...d.slice(-70), ...Array.from({ length: n }, () => ({
        id: dustId.current++,
        x: e.clientX + (Math.random() - .5) * 7, y: e.clientY + (Math.random() - .5) * 7,
        s: 1.1 + Math.random() * 2.4, vx: (Math.random() - .5) * 1.7, vy: -(0.3 + Math.random() * .85),
        flash: Math.random() > .88,
      }))]);
    };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  return (
    <div style={{ position: "relative", inset: 0, overflowY: "auto", background: "#040209", cursor: "none" }}>

      <MovieGrid />
      <Background />
      <PaparazziFlash />

      <div style={{ position: "fixed", inset: 0, zIndex: 8, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E")`, opacity: 0.4, mixBlendMode: "overlay" }} />

      <div style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none", background: ["radial-gradient(ellipse 62% 60% at 50% 43%,rgba(4,2,9,0) 0%,rgba(4,2,9,0.58) 54%,rgba(4,2,9,0.96) 100%)", "linear-gradient(to bottom,rgba(4,2,9,0.68) 0%,transparent 17%,transparent 72%,rgba(4,2,9,0.84) 100%)", "linear-gradient(to right,rgba(4,2,9,0.50) 0%,transparent 13%,transparent 87%,rgba(4,2,9,0.50) 100%)"].join(",") }} />

      <HeroContent />

      <WandCursor x={mouse.x} y={mouse.y} hot={false} />
      <GoldDust trail={dust} />
    </div>
  );
}
