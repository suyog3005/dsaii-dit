"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const G = {
  romance:  { c:"rgba(255,100,150,0.78)", glow:"#ff5090", gc:"#ff3070" },
  action:   { c:"rgba(255,48,48,0.80)",   glow:"#ff1818", gc:"#ee0000" },
  drama:    { c:"rgba(255,168,45,0.76)",  glow:"#ffaa18", gc:"#ee8800" },
  epic:     { c:"rgba(205,162,65,0.74)",  glow:"#cc9920", gc:"#bb8800" },
  thriller: { c:"rgba(42,148,255,0.78)",  glow:"#1a80ff", gc:"#0055ee" },
  social:   { c:"rgba(58,210,148,0.74)",  glow:"#18cc80", gc:"#00aa60" },
  crime:    { c:"rgba(170,42,218,0.72)",  glow:"#aa18dd", gc:"#8800cc" },
  horror:   { c:"rgba(68,232,95,0.66)",   glow:"#28dd44", gc:"#00cc22" },
  comedy:   { c:"rgba(252,212,45,0.72)",  glow:"#ffcc00", gc:"#ddaa00" },
  biopic:   { c:"rgba(112,190,252,0.70)", glow:"#55aaff", gc:"#3388ee" },
} as const;

export function LegendCell({ title, genre, idx }: { title: string; genre: keyof typeof G; idx: number }) {
  const [glitch, setGlitch] = useState(false);
  const [lit,    setLit]    = useState(false);
  const g   = G[genre] || G.drama;
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const s = () => {
      ref.current = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => { setGlitch(false); s(); }, 140 + Math.random()*190);
      }, 4000 + Math.random()*13000 + idx*22);
    };
    s();
    return () => clearTimeout(ref.current || undefined);
  }, [idx]);

  useEffect(() => {
    const h = () => {
      if (Math.random() > 0.52) return;
      setLit(true);
      setTimeout(() => setLit(false), 80 + Math.random()*120);
    };
    window.addEventListener("ff", h);
    return () => window.removeEventListener("ff", h);
  }, []);

  const base = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: "clamp(11px, 1.55vw, 20px)",
    letterSpacing: "0.12em",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div style={{
      padding: "10px 14px",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      {lit && <div style={{
        position:"absolute", inset:"-3px",
        background:`${g.glow}1a`, borderRadius:"3px",
        pointerEvents:"none",
      }}/>}

      {glitch ? (
        <div style={{ position:"relative" }}>
          <div style={{ ...base, position:"absolute", top:0, left:0, color:`${g.gc}77`,
            transform:"translate(-3px,1px) skewX(-5deg)", clipPath:"inset(38% 0 35% 0)",
            pointerEvents:"none" }}>{title}</div>
          <div style={{ ...base, position:"absolute", top:0, left:0, color:"rgba(0,255,220,0.25)",
            transform:"translate(3px,-1px)", clipPath:"inset(8% 0 58% 0)",
            pointerEvents:"none" }}>{title}</div>
          <motion.div
            animate={{ textShadow:[`0 0 16px ${g.gc},0 0 36px ${g.gc}88`,`0 0 6px ${g.gc}`,`0 0 20px ${g.gc}`] }}
            transition={{ duration:0.14, repeat:2 }}
            style={{ ...base, color:g.gc }}
          >{title}</motion.div>
        </div>
      ) : (
        <motion.div
          animate={{ textShadow:[`0 0 6px ${g.glow}44`,`0 0 12px ${g.glow}77`,`0 0 6px ${g.glow}44`] }}
          transition={{ duration:2.8+(idx%4)*0.4, repeat:Infinity, ease:"easeInOut" }}
          style={{ ...base, color:g.c }}
        >{title}</motion.div>
      )}
    </div>
  );
}
