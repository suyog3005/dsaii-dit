"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FandomTitle from "./FandomTitle";
import GlassHUD from "./GlassHUD";
import SecondSection from "./SecondSection";

const REGISTER_URL = "https://dsaii-submission.vercel.app/";

export function HeroContent() {
  const [btnHot, setBtnHot] = useState(false);

  return (
    <>
      <div style={{ position: "relative", inset: 0, zIndex: 30, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", paddingBottom: "9vh" }}>
        <motion.div initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.52em" }} transition={{ delay: .6, duration: 1.9 }} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(9px,1vw,12px)", fontStyle: "italic", fontWeight: 300, color: "rgba(198,180,148,.50)", marginBottom: "16px" }}>THE ULTIMATE CINEPHILE CHALLENGE</motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.7, ease: "easeInOut" }} style={{ width: "200px", height: "0.5px", marginBottom: "20px", background: "linear-gradient(to right,transparent,rgba(255,195,75,.72),transparent)" }} />

        <FandomTitle />

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1.7, ease: "easeInOut" }} style={{ width: "200px", height: "0.5px", marginTop: "20px", marginBottom: "9px", background: "linear-gradient(to right,transparent,rgba(255,185,55,.68),transparent)" }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1.3 }} style={{ fontFamily: "'Courier New',monospace", fontSize: "clamp(6px,.65vw,8px)", letterSpacing: "0.82em", color: "rgba(158,142,108,.36)", marginBottom: "28px" }}>POP CULTURE QUIZ EVENT · 2026</motion.div>

        <div style={{ pointerEvents: "all", width: "min(680px,88vw)" }}>
          <GlassHUD />

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.0, duration: 1.0 }} style={{ display: "flex", justifyContent: "center" }}>
            <motion.button
              onClick={() => window.open(REGISTER_URL, "_blank", "noopener,noreferrer")}
              onMouseEnter={() => setBtnHot(true)}
              onMouseLeave={() => setBtnHot(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "transparent",
                border: `0.5px solid ${btnHot ? "rgba(255,195,75,0.9)" : "rgba(195,175,135,.38)"}`,
                color: btnHot ? "rgba(255,230,135,.98)" : "rgba(195,175,135,.62)",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(10px,.92vw,12px)", letterSpacing: "0.48em",
                padding: "13px 50px", cursor: "none",
                position: "relative", overflow: "hidden",
                transition: "color .22s,border-color .22s,box-shadow .22s",
                boxShadow: btnHot ? "0 0 25px rgba(255,185,50,.28),0 0 55px rgba(255,140,0,.12),inset 0 0 25px rgba(255,160,25,.05)" : "none",
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>REGISTER NOW</span>
              <motion.div
                initial={{ x: "-110%" }} whileHover={{ x: "110%" }}
                transition={{ duration: .52 }}
                style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,195,75,.11),transparent)" }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1.4 }} style={{ position: "fixed", bottom: "2.6vh", left: "50%", transform: "translateX(-50%)", zIndex: 22, whiteSpace: "nowrap", fontFamily: "'Courier New',monospace", fontSize: "clamp(5px,.58vw,7px)", letterSpacing: "0.52em", color: "rgba(115,102,75,.32)" }}>WHERE EVERY FRAME TELLS A STORY</motion.div>

      <SecondSection />
    </>
  );
}
