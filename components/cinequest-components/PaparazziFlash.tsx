"use client";

import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

export function PaparazziFlash() {
  const [flash, setFlash] = useState(false);

  const onFlash = useCallback(() => { setFlash(true); setTimeout(() => setFlash(false), 88); }, []);

  useEffect(() => {
    let t: NodeJS.Timeout;
    const fire = () => {
      window.dispatchEvent(new Event("ff"));
      onFlash();
      t = setTimeout(fire, 1800 + Math.random() * 5500);
    };
    t = setTimeout(fire, 2200);
    return () => clearTimeout(t);
  }, [onFlash]);

  if (!flash) return null;

  return (
    <motion.div
      key="pf"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, .52, .10, .40, 0] }}
      transition={{ duration: .34, times: [0, .07, .16, .26, 1] }}
      style={{ position: "fixed", inset: 0, zIndex: 55, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 38%,rgba(255,255,255,.58) 0%,rgba(255,248,228,.18) 42%,transparent 68%)" }}
    />
  );
}
