"use client";

import { motion } from "framer-motion";

const MotionLine = motion.line as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;

export function VineSVG() {
  const lp = (d: number) => ({ initial:{pathLength:0,opacity:0},animate:{pathLength:1,opacity:1},transition:{delay:d,duration:1.9,ease:"easeOut"} });
  return (
    <svg style={{ position:"fixed",inset:0,width:"100%",height:"100%",zIndex:14,pointerEvents:"none" }} preserveAspectRatio="none">
      <defs>
        <filter id="vg"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="h1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)"/><stop offset="100%" stopColor="rgba(135,18,18,0)"/></linearGradient>
        <linearGradient id="v1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)"/><stop offset="100%" stopColor="rgba(135,18,18,0)"/></linearGradient>
        <linearGradient id="h2" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.92)"/><stop offset="100%" stopColor="rgba(135,18,18,0)"/></linearGradient>
        <linearGradient id="bv" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="rgba(135,18,18,0.82)"/><stop offset="100%" stopColor="rgba(135,18,18,0)"/></linearGradient>
      </defs>
      {/* TL */}
      <MotionLine x1="0" y1="1" x2="20%" y2="1" stroke="url(#h1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.4)}/>
      <MotionLine x1="1" y1="0" x2="1" y2="36%" stroke="url(#v1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.5)}/>
      <MotionPath d="M0 0 Q5% 8%,11% 6%" fill="none" stroke="rgba(125,16,16,0.32)" strokeWidth="0.38" {...lp(2.9)}/>
      <MotionCircle cx="11%" cy="6%" r="1.4" fill="rgba(195,32,32,0.62)" animate={{opacity:[0.28,.88,.28],r:[0.9,1.9,0.9]}} transition={{duration:2.8,repeat:Infinity,delay:0.3}}/>
      {/* TR */}
      <MotionLine x1="100%" y1="1" x2="80%" y2="1" stroke="url(#h2)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.4)}/>
      <MotionLine x1="99.8%" y1="0" x2="99.8%" y2="36%" stroke="url(#v1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.5)}/>
      <MotionPath d="M100% 0 Q95% 8%,89% 6%" fill="none" stroke="rgba(125,16,16,0.32)" strokeWidth="0.38" {...lp(2.9)}/>
      <MotionCircle cx="89%" cy="6%" r="1.4" fill="rgba(195,32,32,0.62)" animate={{opacity:[0.28,.88,.28],r:[0.9,1.9,0.9]}} transition={{duration:2.8,repeat:Infinity,delay:0.7}}/>
      {/* BL */}
      <MotionLine x1="0" y1="99.8%" x2="16%" y2="99.8%" stroke="url(#h1)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.6)}/>
      <MotionLine x1="1" y1="100%" x2="1" y2="68%" stroke="url(#bv)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.7)}/>
      <MotionCircle cx="0.8%" cy="68%" r="1.2" fill="rgba(175,28,28,0.5)" animate={{opacity:[0.2,.62,.2]}} transition={{duration:3.4,repeat:Infinity,delay:1.1}}/>
      {/* BR */}
      <MotionLine x1="100%" y1="99.8%" x2="84%" y2="99.8%" stroke="url(#h2)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.6)}/>
      <MotionLine x1="99.8%" y1="100%" x2="99.8%" y2="68%" stroke="url(#bv)" strokeWidth="0.55" filter="url(#vg)" {...lp(2.7)}/>
      <MotionCircle cx="99.2%" cy="68%" r="1.2" fill="rgba(175,28,28,0.5)" animate={{opacity:[0.2,.62,.2]}} transition={{duration:3.4,repeat:Infinity,delay:1.5}}/>
    </svg>
  );
}
