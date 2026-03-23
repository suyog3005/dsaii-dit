"use client";
import { motion } from "framer-motion";
export default function FandomTitle() {
  const FS = "clamp(52px, 8.5vw, 112px)"; /* ← reduced so background breathes */
  return (
    <div style={{ position:"relative",display:"inline-block" }}>
      {/* shadow lift layer */}
      <div aria-hidden style={{
        position:"absolute",inset:0,zIndex:0,display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"'Playfair Display',serif",fontSize:FS,fontWeight:900,lineHeight:0.88,letterSpacing:"0.06em",
        color:"transparent",userSelect:"none",pointerEvents:"none",
        textShadow:"3px 7px 18px rgba(0,0,0,1),0 4px 35px rgba(0,0,0,1),0 0 70px rgba(0,0,0,0.95),0 0 140px rgba(0,0,0,0.8)",
      }}>CINEQUEST</div>
      {/* golden hour halo */}
      <div aria-hidden style={{
        position:"absolute",inset:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"'Playfair Display',serif",fontSize:FS,fontWeight:900,lineHeight:0.88,letterSpacing:"0.06em",
        color:"transparent",userSelect:"none",pointerEvents:"none",
        textShadow:[
          "0 0 7px rgba(255,212,90,0.95)",
          "0 0 22px rgba(255,185,50,0.75)",
          "0 0 50px rgba(255,148,28,0.52)",
          "0 0 95px rgba(255,110,0,0.32)",
          "0 0 165px rgba(255,80,0,0.16)",
        ].join(","),
      }}>CINEQUEST</div>
      {/* metallic silver text */}
      <motion.h1
        initial={{ opacity:0, scale:0.92 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ delay:0.4, duration:2, ease:[0.16,1,0.3,1] }}
        style={{
          position:"relative",zIndex:2,
          fontFamily:"'Playfair Display',serif",
          fontSize:FS,fontWeight:900,lineHeight:0.88,letterSpacing:"0.06em",
          color:"transparent",
          backgroundClip:"text",WebkitBackgroundClip:"text",
          backgroundImage:"linear-gradient(165deg,#ffffff 0%,#eee8da 16%,#d5c8b0 34%,#a89278 50%,#c8b898 64%,#eae0ce 80%,#ffffff 94%,#f0e8d8 100%)",
          userSelect:"none",
        }}
      >CINEQUEST</motion.h1>
    </div>
  );
} 