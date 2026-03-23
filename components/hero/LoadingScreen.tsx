"use client"

import { useEffect, useState } from "react"

type Props = {
  ready?: boolean
  minDuration?: number
}

const SPINNER_LINES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * 2 * Math.PI
  const cx = 28, cy = 28, r1 = 18, r2 = 24
  const round = (n: number) => Math.round(n * 10000) / 10000
  return {
    x1:      round(cx + r1 * Math.sin(angle)),
    y1:      round(cy - r1 * Math.cos(angle)),
    x2:      round(cx + r2 * Math.sin(angle)),
    y2:      round(cy - r2 * Math.cos(angle)),
    opacity: round(0.15 + (i / 12) * 0.85),
  }
})

export default function LoadingScreen({ ready = false, minDuration = 1000 }: Props) {
  const [minMet,  setMinMet]  = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [visible, setVisible] = useState(true)

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  // Min duration timer
  useEffect(() => {
    const t = setTimeout(() => setMinMet(true), minDuration)
    return () => clearTimeout(t)
  }, [minDuration])

  // Single effect watching BOTH ready and minMet — triggers fade when both true
  useEffect(() => {
    if (!ready || !minMet || fadeOut) return
    // Both conditions met — start fade
    document.body.style.overflow = ""
    setFadeOut(true)
    const t = setTimeout(() => setVisible(false), 800)
    return () => clearTimeout(t)
  }, [ready, minMet, fadeOut])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      style={{
        opacity:       fadeOut ? 0 : 1,
        transition:    "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >

      <div className="ls-spinner mb-8" style={{ width: 56, height: 56 }}>
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
             width="56" height="56">
          {SPINNER_LINES.map((l, i) => (
            <line key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="white" strokeWidth="2.2" strokeLinecap="round"
              opacity={l.opacity}
            />
          ))}
        </svg>
      </div>

      <div className="flex flex-col items-center" style={{ gap: 8 }}>
        <span className="ls-word-1" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
          fontWeight: 300, letterSpacing: "0.3em", color: "rgba(255,255,255,0.9)",
        }}>
          Loading . . .
        </span>
        <span className="ls-word-2" style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(0.75rem, 1.6vw, 0.85rem)",
          fontWeight: 300, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)",
        }}>
          THE LEAP INTO FUTURE
        </span>
      </div>
    </div>
  )
}