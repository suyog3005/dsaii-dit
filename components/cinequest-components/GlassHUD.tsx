"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HUD_DATA = [
  { label:"PRIZE POOL", val:"₹10K",   color:"#ff2828", glow:"rgba(255,35,35,0.7)" },
  { label:"ROUNDS",     val:"03",     color:"#2288ff", glow:"rgba(25,130,255,0.7)" },
  { label:"DATE",       val:"APR 05", color:"#ff9500", glow:"rgba(255,145,0,0.65)" },
  { label:"VENUE",      val:"DIT",   color:"#aa2ff0", glow:"rgba(155,40,240,0.65)" },
];
export default function GlassHUD() {
    
  const [gi, setGi] = useState(-1);
  useEffect(() => {
    const loop = () => {
      const id = setTimeout(() => {
        setGi(Math.floor(Math.random()*HUD_DATA.length));
        setTimeout(() => { setGi(-1); loop(); }, 140+Math.random()*110);
      }, 2800+Math.random()*6500);
      return id;
    };
    const id = loop();
    return () => clearTimeout(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity:0, y:20, scale:0.95 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay:2.5, duration:1.4, ease:[0.16,1,0.3,1] }}
      style={{ position:"relative", marginBottom:"24px" }}
    >
      {/* LED float spheres */}
      <div style={{ position:"absolute",left:0,right:0,top:"-14px",height:"28px",pointerEvents:"none" }}>
        {HUD_DATA.map((d,i)=>(
          <motion.div key={i}
            animate={{ y:[-4,4,-4], opacity:[0.42,1,0.42] }}
            transition={{ duration:2.1+i*0.28,delay:i*0.32,repeat:Infinity,ease:"easeInOut" }}
            style={{
              position:"absolute",left:`${11+i*19}%`,top:"50%",transform:"translateY(-50%)",
              width:"4px",height:"4px",borderRadius:"50%",
              background:d.color,boxShadow:`0 0 8px 3px ${d.glow}`,
            }}
          />
        ))}
      </div>

      {/* capsule gradient border */}
      <div style={{
        borderRadius:"999px",padding:"1px",
        background:"linear-gradient(135deg,rgba(255,40,40,0.5),rgba(40,140,255,0.5),rgba(255,150,0,0.45),rgba(155,40,240,0.45),rgba(22,200,130,0.42))",
        boxShadow:[
          "0 0 28px rgba(255,40,40,0.10)",
          "0 0 50px rgba(40,140,255,0.08)",
          "0 8px 28px rgba(0,0,0,0.65)",
          "inset 0 1px 0 rgba(255,255,255,0.05)",
        ].join(","),
      }}>
        <div style={{
          borderRadius:"997px",
          background:"rgba(6,3,14,0.80)",
          backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",
          overflow:"hidden",position:"relative",
        }}>
         

          {/* inner top sheen */}
          <div style={{ position:"absolute",top:0,left:"6%",right:"6%",height:"0.5px",
            background:"linear-gradient(to right,transparent,rgba(255,255,255,0.16),transparent)" }}/>

          {/* scanning shimmer */}
          <motion.div
            animate={{ x:["-120%","220%"] }}
            transition={{ duration:4.2,repeat:Infinity,ease:"linear",repeatDelay:2.8 }}
            style={{
              position:"absolute",top:0,bottom:0,left:0,width:"28%",
              background:"linear-gradient(to right,transparent,rgba(255,255,255,0.032),transparent)",
              pointerEvents:"none",
            }}
          />

          {/* stats row */}
          <div style={{ display:"flex",alignItems:"stretch" }}>
            {HUD_DATA.map((d,i) => {
              const glitching = gi===i;
              return (
                <div key={i} style={{
                  flex:1,display:"flex",flexDirection:"column",alignItems:"center",
                  padding:"14px 10px",position:"relative",
                  borderRight: i<HUD_DATA.length-1 ? `0.5px solid ${d.color}1e` : "none",
                }}>
                  {/* icon */}
                  <motion.div
                    animate={{ opacity:[0.65,1,0.65], filter:[`drop-shadow(0 0 2px ${d.color})`,`drop-shadow(0 0 5px ${d.color})`,`drop-shadow(0 0 2px ${d.color})`] }}
                    transition={{ duration:2+i*0.25,repeat:Infinity,ease:"easeInOut" }}
                    style={{ marginBottom:"7px" }}
                  >
                    
                  </motion.div>

                  {/* label */}
                  <div style={{
                    fontFamily:"'Courier New',monospace",
                    fontSize:"clamp(6px,0.58vw,8px)",letterSpacing:"0.4em",
                    color:"rgba(185,170,210,0.45)",textTransform:"uppercase",marginBottom:"5px",
                  }}>{d.label}</div>

                  {/* value */}
                  <div style={{ position:"relative" }}>
                    {glitching && <>
                      <div style={{
                        position:"absolute",top:0,left:0,pointerEvents:"none",
                        fontFamily:"'Playfair Display',serif",fontWeight:900,
                        fontSize:"clamp(16px,2vw,26px)",letterSpacing:"0.05em",
                        color:`${d.color}66`,transform:"translate(-3px,1px) skewX(-3deg)",
                        clipPath:"inset(38% 0 24% 0)",whiteSpace:"nowrap",
                      }}>{d.val}</div>
                      <div style={{
                        position:"absolute",top:0,left:0,pointerEvents:"none",
                        fontFamily:"'Playfair Display',serif",fontWeight:900,
                        fontSize:"clamp(16px,2vw,26px)",letterSpacing:"0.05em",
                        color:"rgba(0,225,210,0.2)",transform:"translate(3px,-1px)",
                        clipPath:"inset(8% 0 55% 0)",whiteSpace:"nowrap",
                      }}>{d.val}</div>
                    </>}
                    <motion.div
                      animate={{
                        textShadow: glitching
                          ? `0 0 14px ${d.color},0 0 32px ${d.color}aa,0 0 60px ${d.color}55`
                          : [`0 0 9px ${d.glow}`,`0 0 20px ${d.glow}`,`0 0 9px ${d.glow}`],
                        color: glitching ? d.color : ["rgba(242,235,218,0.96)","rgba(255,255,255,0.99)","rgba(242,235,218,0.96)"],
                      }}
                      transition={{ duration:glitching?0.12:3,repeat:glitching?0:Infinity }}
                      style={{
                        fontFamily:"'Playfair Display',serif",fontWeight:900,
                        fontSize:"clamp(16px,2vw,26px)",letterSpacing:"0.05em",
                        whiteSpace:"nowrap",lineHeight:1,
                      }}
                    >{d.val}</motion.div>
                  </div>

                  {/* upside-down pulse line */}
                  <motion.div
                    animate={{ scaleX:[0.12,1,0.12],opacity:[0.18,0.52,0.18] }}
                    transition={{ duration:2.5,repeat:Infinity,ease:"easeInOut",delay:i*0.18 }}
                    style={{ marginTop:"6px",height:"0.5px",width:"38px",
                      background:`linear-gradient(to right,transparent,${d.color},transparent)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

