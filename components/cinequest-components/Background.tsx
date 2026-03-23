"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MotionLine = motion.line as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;

function VolumetricBeams() {
  const BEAMS = [
    { pct: 36, w: 68, coreW: 1.5, coneOp: 0.13, coreOp: [0.45, 0.85, 0.45], rot: ["-7deg", "1deg", "-7deg"], dur: 10, del: 0 },
    { pct: 50, w: 100, coreW: 2.2, coneOp: 0.20, coreOp: [0.65, 1.00, 0.65], rot: ["0deg", "0deg", "0deg"], dur: 0, del: 0 },
    { pct: 64, w: 68, coreW: 1.5, coneOp: 0.13, coreOp: [0.45, 0.85, 0.45], rot: ["7deg", "-1deg", "7deg"], dur: 13, del: 2 },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "100vh", zIndex: 4, pointerEvents: "none", overflow: "hidden" }}>
      {BEAMS.map((b, i) => (
        <motion.div key={i}
          animate={b.dur > 0 ? { rotate: b.rot } : {}}
          transition={{ duration: b.dur, repeat: b.dur > 0 ? Infinity : 0, ease: "easeInOut", delay: b.del }}
          style={{ position: "absolute", top: 0, left: `calc(${b.pct}% - ${b.w / 2}px)`, width: `${b.w}px`, height: "70vh", transformOrigin: "top center" }}
        >
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,rgba(255,205,100,${b.coneOp}) 0%,rgba(255,185,60,${b.coneOp * 0.35}) 65%,transparent 100%)`, clipPath: "polygon(26% 0%,74% 0%,100% 100%,0% 100%)", filter: "blur(14px)" }} />
          <motion.div animate={{ opacity: b.coreOp }} transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: `${b.coreW}px`, height: "70vh", background: "linear-gradient(to bottom,rgba(255,240,170,1) 0%,rgba(255,210,120,0.5) 60%,transparent 100%)", filter: "blur(0.3px)" }} />
          {Array.from({ length: 5 }, (_, mi) => (
            <motion.div key={mi} animate={{ y: ["15vh", "67vh"], opacity: [0, 0.7, 0], x: [0, (mi % 2 ? 9 : -9), 0] }} transition={{ duration: 4 + mi * 0.7, delay: mi * 0.65 + b.del, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", left: `${24 + mi * 12}%`, top: 0, width: "1.8px", height: "1.8px", borderRadius: "50%", background: "rgba(255,235,160,0.9)", boxShadow: "0 0 5px 2px rgba(255,210,100,0.5)" }} />
          ))}
        </motion.div>
      ))}
      <motion.div animate={{ opacity: [0.18, 0.48, 0.18], scale: [0.88, 1.06, 0.88] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%,-50%)", width: "420px", height: "240px", background: "radial-gradient(ellipse,rgba(255,210,100,0.14) 0%,rgba(255,165,40,0.05) 52%,transparent 74%)", filter: "blur(26px)", borderRadius: "50%" }} />
    </div>
  );
}

function RedCarpet() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "20vh", zIndex: 6, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 0%,rgba(32,1,1,0.72) 38%,rgba(12,0,0,0.98) 100%)" }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <motion.div key={i} animate={{ x: [`${-4 + i * 2}%`, `${7 + i}%`, `${-3 + i}%`], opacity: [0.1 + i * 0.012, 0.2 + i * 0.014, 0.1 + i * 0.012] }} transition={{ duration: 14 + i * 3, delay: i * 2.1, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: 0, left: `${i * 18 - 4}%`, width: `${26 + i * 4}%`, height: "52%", background: "radial-gradient(ellipse 50% 100% at 50% 100%,rgba(30,2,2,0.55) 0%,transparent 100%)", filter: "blur(18px)", borderRadius: "50%" }} />
      ))}
      <motion.div animate={{ opacity: [0.06, 0.32, 0.06], scaleX: [0.4, 1.1, 0.4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: "28%", left: "15%", right: "15%", height: "0.5px", background: "linear-gradient(to right,transparent,rgba(255,255,255,0.42),transparent)", transformOrigin: "center" }} />
      {[{ l: "12%", del: 0 }, { r: "12%", del: 2.5 }].map((p, i) => (
        <motion.div key={i} animate={{ x: [i === 0 ? "-5vw" : "5vw", i === 0 ? "5vw" : "-5vw", i === 0 ? "-5vw" : "5vw"], opacity: [0.07, 0.2, 0.07] }} transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut", delay: p.del }} style={{ position: "absolute", bottom: "-4%", ...(p.l ? { left: p.l } : { right: p.r }), width: "16vw", height: "8vh", background: "radial-gradient(ellipse,rgba(255,255,255,0.2) 0%,transparent 70%)", filter: "blur(8px)", borderRadius: "50%" }} />
      ))}
    </div>
  );
}

function Particles() {
  const [particles, setParticles] = useState<{ id: number; left: number; sz: number; dur: number; del: number; drift: number; ash: boolean }[]>([]);

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
        <motion.div key={p.id} style={{ position: "absolute", bottom: "-8px", left: `${p.left}%`, width: p.ash ? p.sz * 2.1 + "px" : p.sz + "px", height: p.ash ? p.sz * .6 + "px" : p.sz + "px", borderRadius: "50%", background: p.ash ? "rgba(148,138,126,0.42)" : `radial-gradient(circle,#ff7030 0%,#cc2200 55%,transparent 100%)`, boxShadow: p.ash ? "none" : `0 0 ${p.sz * 4}px ${p.sz}px rgba(200,65,0,0.5)`, filter: p.ash ? "blur(0.6px)" : "none" }} animate={{ y: [0, -1000], x: [0, p.drift], opacity: [0, p.ash ? .4 : .82, p.ash ? .18 : .5, 0] }} transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

function VineSVG() {
  const lp = (d: number) => ({ initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { delay: d, duration: 1.9, ease: "easeOut" } });
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 14, pointerEvents: "none" }} preserveAspectRatio="none">
      <defs>
        <filter id="vg"><feGaussianBlur stdDeviation="1.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="h1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)" /><stop offset="100%" stopColor="rgba(135,18,18,0)" /></linearGradient>
        <linearGradient id="v1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)" /><stop offset="100%" stopColor="rgba(135,18,18,0)" /></linearGradient>
        <linearGradient id="h2" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)" /><stop offset="100%" stopColor="rgba(135,18,18,0)" /></linearGradient>
        <linearGradient id="bv" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.82)" /><stop offset="100%" stopColor="rgba(135,18,18,0)" /></linearGradient>
      </defs>
      <MotionLine x1="0" y1="1" x2="20%" y2="1" stroke="url(#h1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.4)} />
      <MotionLine x1="1" y1="0" x2="1" y2="36%" stroke="url(#v1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.5)} />
      <MotionPath d="M0 0 Q5% 8%,11% 6%" fill="none" stroke="rgba(125,16,16,0.32)" strokeWidth="0.38" {...lp(2.9)} />
      <MotionCircle cx="11%" cy="6%" r="1.4" fill="rgba(195,32,32,0.62)" animate={{ opacity: [0.28, .88, .28], r: [0.9, 1.9, 0.9] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }} />
      <MotionLine x1="100%" y1="1" x2="80%" y2="1" stroke="url(#h2)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.4)} />
      <MotionLine x1="99.8%" y1="0" x2="99.8%" y2="36%" stroke="url(#v1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.5)} />
      <MotionPath d="M100% 0 Q95% 8%,89% 6%" fill="none" stroke="rgba(125,16,16,0.32)" strokeWidth="0.38" {...lp(2.9)} />
      <MotionCircle cx="89%" cy="6%" r="1.4" fill="rgba(195,32,32,0.62)" animate={{ opacity: [0.28, .88, .28], r: [0.9, 1.9, 0.9] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }} />
      <MotionLine x1="0" y1="99.8%" x2="16%" y2="99.8%" stroke="url(#h1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.6)} />
      <MotionLine x1="1" y1="100%" x2="1" y2="68%" stroke="url(#bv)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.7)} />
      <MotionCircle cx="0.8%" cy="68%" r="1.2" fill="rgba(175,28,28,0.5)" animate={{ opacity: [0.2, .62, .2] }} transition={{ duration: 3.4, repeat: Infinity, delay: 1.1 }} />
      <MotionLine x1="100%" y1="99.8%" x2="84%" y2="99.8%" stroke="url(#h2)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.6)} />
      <MotionLine x1="99.8%" y1="100%" x2="99.8%" y2="68%" stroke="url(#bv)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.7)} />
      <MotionCircle cx="99.2%" cy="68%" r="1.2" fill="rgba(175,28,28,0.5)" animate={{ opacity: [0.2, .62, .2] }} transition={{ duration: 3.4, repeat: Infinity, delay: 1.5 }} />
    </svg>
  );
}

export function Background() {
  return (
    <>
      <Particles />
      <VolumetricBeams />
      <RedCarpet />
      <VineSVG />
    </>
  );
}
