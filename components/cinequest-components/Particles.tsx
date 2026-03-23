"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = { id: number; left: number; sz: number; dur: number; del: number; drift: number; ash: boolean };

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      sz: 0.9 + Math.random() * 2.5,
      dur: 10 + Math.random() * 14,
      del: Math.random() * 18,
      drift: (Math.random() - 0.5) * 115,
      ash: Math.random() > 0.52,
    })));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div key={p.id}
          style={{
            position: "absolute", bottom: "-8px", left: `${p.left}%`,
            width: p.ash ? p.sz * 2.1 + "px" : p.sz + "px",
            height: p.ash ? p.sz * .6 + "px" : p.sz + "px",
            borderRadius: "50%",
            background: p.ash ? "rgba(148,138,126,0.42)" : `radial-gradient(circle,#ff7030 0%,#cc2200 55%,transparent 100%)`,
            boxShadow: p.ash ? "none" : `0 0 ${p.sz * 4}px ${p.sz}px rgba(200,65,0,0.5)`,
            filter: p.ash ? "blur(0.6px)" : "none",
          }}
          animate={{ y: [0, -1000], x: [0, p.drift], opacity: [0, p.ash ? .4 : .82, p.ash ? .18 : .5, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
