"use client";

import { motion } from "framer-motion";

export interface DustParticle {
  id: number;
  x: number;
  y: number;
  s: number;
  vx: number;
  vy: number;
  flash: boolean;
}

export function GoldDust({ trail }: { trail: DustParticle[] }) {
  return (
    <>
      {trail.map(p=>(
        <motion.div key={p.id}
          style={{ position:"fixed",left:p.x,top:p.y,zIndex:160,pointerEvents:"none",transform:"translate(-50%,-50%)" }}
          initial={{ opacity:0.88,scale:1,x:0,y:0 }}
          animate={{ opacity:0,scale:0.1,x:p.vx*30,y:p.vy*30+16 }}
          transition={{ duration:0.82+Math.random()*0.32,ease:"easeOut" }}
        >
          <div style={{
            width:p.s+"px",height:p.s+"px",borderRadius:"50%",
            background:p.flash?"white":`radial-gradient(circle,#ffe0a0 0%,#bb8800 60%,transparent 100%)`,
            boxShadow:p.flash?"0 0 10px 4px rgba(255,255,255,.8)":`0 0 ${p.s*3}px ${p.s}px rgba(185,125,8,.52)`,
          }}/>
        </motion.div>
      ))}
    </>
  );
}

export function WandCursor({ x,y,hot }: { x: number; y: number; hot: boolean }) {
  return (
    <div style={{ position:"fixed",left:x,top:y,zIndex:200,pointerEvents:"none",transform:"translate(-50%,-50%)" }}>
      <motion.div
        animate={{ boxShadow: hot
          ?"0 0 14px 6px rgba(255,255,255,1),0 0 40px 16px rgba(255,210,80,.9),0 0 80px 28px rgba(255,140,0,.5)"
          :"0 0 6px 2px rgba(255,255,255,.95),0 0 16px 6px rgba(255,220,140,.52),0 0 32px 11px rgba(192,145,45,.24)" }}
        transition={{ duration:.2 }}
        style={{ width:"5px",height:"5px",borderRadius:"50%",background:"white" }}
      />
      <div style={{
        position:"absolute",top:"calc(50% + 3px)",left:"50%",transform:"translateX(-50%)",
        width:"1px",height:"21px",
        background:"linear-gradient(to bottom,rgba(255,240,175,.86) 0%,transparent 100%)",
      }}/>
    </div>
  );
}
