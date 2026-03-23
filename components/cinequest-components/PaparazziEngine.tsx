"use client";

import { useEffect } from "react";

export function PaparazziEngine({ onFlash }: { onFlash?: () => void }) {
  useEffect(() => {
    let t: NodeJS.Timeout;
    const fire = () => {
      window.dispatchEvent(new Event("ff"));
      onFlash?.();
      t = setTimeout(fire, 1800 + Math.random() * 5500);
    };
    t = setTimeout(fire, 2200);
    return () => clearTimeout(t);
  }, [onFlash]);
  return null;
}
