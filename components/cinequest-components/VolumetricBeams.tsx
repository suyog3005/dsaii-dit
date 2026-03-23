"use client";

import { motion } from "framer-motion";

export function VolumetricBeams() {
  const BEAMS = [
    { pct:36, w:68,  coreW:1.5, coneOp:0.13, coreOp:[0.45,0.85,0.45], rot:["-7deg","1deg","-7deg"], dur:10, del:0   },
    { pct:50, w:100, coreW:2.2, coneOp:0.20, coreOp:[0.65,1.00,0.65], rot:["0deg","0deg","0deg"],   dur:0,  del:0   },
    { pct:64, w:68,  coreW:1.5, coneOp:0.13, coreOp:[0.45,0.85,0.45], rot:["7deg","-1deg","7deg"],  dur:13, del:2   },
  ];

  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,height:"100vh",zIndex:4,pointerEvents:"none",overflow:"hidden" }}>
      {BEAMS.map((b,i) => (
        <motion.div key={i}
          animate={b.dur > 0 ? { rotate:b.rot } : {}}
          transition={{ duration:b.dur, repeat:b.dur>0?Infinity:0, ease:"easeInOut", delay:b.del }}
          style={{ position:"absolute",top:0,left:`calc(${b.pct}% - ${b.w/2}px)`,width:`${b.w}px`,height:"70vh",transformOrigin:"top center" }}
        >
          {/* soft gold cone */}
          <div style={{
            position:"absolute",inset:0,
            background:`linear-gradient(to bottom,rgba(255,205,100,${b.coneOp}) 0%,rgba(255,185,60,${b.coneOp*0.35}) 65%,transparent 100%)`,
            clipPath:"polygon(26% 0%,74% 0%,100% 100%,0% 100%)",
            filter:"blur(14px)",
          }}/>
          {/* core needle */}
          <motion.div
            animate={{ opacity:b.coreOp }}
            transition={{ duration:3.5+i,repeat:Infinity,ease:"easeInOut" }}
            style={{
              position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
              width:`${b.coreW}px`,height:"70vh",
              background:"linear-gradient(to bottom,rgba(255,240,170,1) 0%,rgba(255,210,120,0.5) 60%,transparent 100%)",
              filter:"blur(0.3px)",
            }}
          />
          {/* dust motes */}
          {Array.from({length:5},(_,mi) => (
            <motion.div key={mi}
              animate={{ y:["15vh","67vh"], opacity:[0,0.7,0], x:[0,(mi%2?9:-9),0] }}
              transition={{ duration:4+mi*0.7, delay:mi*0.65+b.del, repeat:Infinity, ease:"linear" }}
              style={{
                position:"absolute",left:`${24+mi*12}%`,top:0,
                width:"1.8px",height:"1.8px",borderRadius:"50%",
                background:"rgba(255,235,160,0.9)",
                boxShadow:"0 0 5px 2px rgba(255,210,100,0.5)",
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* title statue halo */}
      <motion.div
        animate={{ opacity:[0.18,0.48,0.18], scale:[0.88,1.06,0.88] }}
        transition={{ duration:4.2, repeat:Infinity, ease:"easeInOut" }}
        style={{
          position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",
          width:"420px",height:"240px",
          background:"radial-gradient(ellipse,rgba(255,210,100,0.14) 0%,rgba(255,165,40,0.05) 52%,transparent 74%)",
          filter:"blur(26px)",borderRadius:"50%",
        }}
      />
    </div>
  );
}
