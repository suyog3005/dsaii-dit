"use client"

import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useVideoTexture } from "../../hooks/useVideoTexture"
import { useDrag } from "../../hooks/useDrag"
import { VIDEO_SOURCES, VIDEO_FALLBACKS } from "@/lib/videoConfig"
import { scrollVelocity } from "@/lib/scrollVelocity"

// ── Panel content ─────────────────────────────────────────────────────────────
export const PANEL_CONTENT = [
  {
    title:       "Innovex",
    subtitle:    "The Ultimate Campus Hackathon",
    description: "Push the boundaries of innovation in a 24-hour sprint. Build, pitch, and win alongside the brightest minds on campus.",
    mobileBottom: "Gather your team, build the future, and compete for glory at Innovex.",
    cta:         "Join Innovex",
    route:       "/innovex",
    accent:      "#F97316",
    floorColor:  "#483d8b",
    wallColor:   "#bf00ff",
  },
  {
    title:       "CineQuest",
    subtitle:    "The Fandom Quiz",
    description: "Test your movie and pop-culture knowledge across rounds of trivia, clips, and deep-cut references. How well do you really know your fandoms?",
    mobileBottom: "Prove you're the ultimate fan and conquer the trivia at CineQuest.",
    cta:         "Enter the Quiz",
    route:       "/cinequest",
    accent:      "#EF4444",
    floorColor:  "#b22222",
    wallColor:   "#ff9f00",
  },
  {
    title:       "ContentFlux",
    subtitle:    "AI Video Generation Competition",
    description: "Create, generate, and compete. Use the latest AI tools to craft short-form videos that push creative boundaries.",
    mobileBottom: "Unleash your AI creativity and craft the best video at ContentFlux.",
    cta:         "Start Creating",
    route:       "/contentflux",
    accent:      "#8B5CF6",
    floorColor:  "#800080",
    wallColor:   "#bf00ff",
  },
  {
    title:       "The Spiral",
    subtitle:    "The Technical Treasure Hunt",
    description: "Follow the clues, crack the ciphers, and navigate layers of technical puzzles. Only the sharpest minds reach the centre.",
    mobileBottom: "Uncover the secrets and race to the centre at The Spiral.",
    cta:         "Begin the Hunt",
    route:       "/thespiral",
    accent:      "#10B981",
    floorColor:  "#555555",
    wallColor:   "#a9a9a9",
  },
  {
    title:       "GeoVoyager",
    subtitle:    "Find the Place Given",
    description: "Pinpoint locations from photos, clues, and satellite imagery. Every round takes you somewhere new — can you find it before time runs out?",
    mobileBottom: "Trust your instincts and pinpoint the hidden locations in GeoVoyager.",
    cta:         "Start Exploring",
    route:       "/geovoyager",
    accent:      "#3B82F6",
    floorColor:  "#1A2F6B",
    wallColor:   "#3cb371",
  },
]

const TOTAL       = 5
const IDLE_SPEED  = -0.0015
const IDLE_DELAY  = 3000
const IDLE_FADE   = 0.02

type Props = {
  dragEnabled: boolean
  onActivePanelChange?: (index: number) => void
  onAllReady?: () => void
  innerTintOpacity?: number
}

export default function Cylinder({
  dragEnabled,
  onActivePanelChange,
  onAllReady,
  innerTintOpacity = 0.55,
}: Props) {
  const groupRef    = useRef<THREE.Group>(null!)
  const rotationRef = useRef(0)
  const lastActive  = useRef(0)
  const [activePanel, setActivePanel] = useState(0)

  // ── Snap-to-panel (arrow buttons) ────────────────────────────────────────
  const snapTarget   = useRef<number | null>(null)
  const isSnapping   = useRef(false)

  // ── Parallel video loading counter ───────────────────────────────────────
  // All 5 videos start loading immediately on mount.
  // When all 5 fire loadeddata, dispatch DOM event to lift loading screen.
  const loadedCount = useRef(0)
  const onVideoReady = useRef(() => {
    loadedCount.current += 1
    if (loadedCount.current >= TOTAL) {
      window.dispatchEvent(new Event("videos-ready"))
    }
  }).current

  // ── Idle rotation refs ────────────────────────────────────────────────────
  const idleActive      = useRef(false)
  const idleSpeed       = useRef(0)
  const idleTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY     = useRef(0)
  const isScrolling     = useRef(false)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const radius   = 5
  const height   = 3
  const segments = 64
  const videoArc = 1.2366
  const gapArc   = 0.023

  // ── Which panels should play ──────────────────────────────────────────────
  function isActive(index: number): boolean {
    if (!dragEnabled) return true
    const left  = (activePanel - 1 + TOTAL) % TOTAL
    const right = (activePanel + 1) % TOTAL
    return index === activePanel || index === left || index === right
  }

  // ── Video textures — all 5 load in parallel ───────────────────────────────
  const tex0 = useVideoTexture(VIDEO_SOURCES[0] ?? "", isActive(0), onVideoReady, VIDEO_FALLBACKS[0])
  const tex1 = useVideoTexture(VIDEO_SOURCES[1] ?? "", isActive(1), onVideoReady, VIDEO_FALLBACKS[1])
  const tex2 = useVideoTexture(VIDEO_SOURCES[2] ?? "", isActive(2), onVideoReady, VIDEO_FALLBACKS[2])
  const tex3 = useVideoTexture(VIDEO_SOURCES[3] ?? "", isActive(3), onVideoReady, VIDEO_FALLBACKS[3])
  const tex4 = useVideoTexture(VIDEO_SOURCES[4] ?? "", isActive(4), onVideoReady, VIDEO_FALLBACKS[4])
  const textures = [tex0, tex1, tex2, tex3, tex4]

  // ── Snap to panel via DOM event (mobile arrow buttons) ──────────────────
  useEffect(() => {
    const TWO_PI = Math.PI * 2
    const handler = (e: Event) => {
      const dir = (e as CustomEvent<"left" | "right">).detail
      // Which panel to snap to
      const current = lastActive.current
      const target  = dir === "right"
        ? (current + 1) % TOTAL
        : (current - 1 + TOTAL) % TOTAL

      // Centre angle for the target panel
      const centreAngle = panelCentres[target] ?? 0

      // We want: (centreAngle + rotation) mod TWO_PI ≈ 0
      // => rotation = -centreAngle + n*TWO_PI  (pick n so delta is shortest path)
      const baseTarget = -centreAngle
      const cur        = rotationRef.current
      // Normalise delta to [-π, π]
      let delta = ((baseTarget - cur) % TWO_PI + TWO_PI) % TWO_PI
      if (delta > Math.PI) delta -= TWO_PI
      snapTarget.current = cur + delta
      isSnapping.current = true
    }
    window.addEventListener("cylinder-nav", handler)
    return () => window.removeEventListener("cylinder-nav", handler)
  // panelCentres is computed below — pass it as stable array length dep
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Drag ─────────────────────────────────────────────────────────────────
  const isMobileDrag = typeof window !== "undefined" && window.innerWidth < 768
  useDrag({
    enabled: dragEnabled,
    sensitivity: isMobileDrag ? 0.005 : 0.002,  // 2.5× more sensitive on mobile
    damping:     isMobileDrag ? 0.92  : 0.88,   // more glide on mobile
    onVelocity: (v) => { isSnapping.current = false; rotationRef.current += v },
    onDrag:     (d) => { isSnapping.current = false; rotationRef.current += d },
  })

  // ── Idle rotation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (dragEnabled) return

    function startIdleTimer() {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        if (window.scrollY === 0) idleActive.current = true
      }, IDLE_DELAY)
    }

    function onScroll() {
      isScrolling.current = true
      idleActive.current  = false
      idleSpeed.current   = 0
      if (idleTimerRef.current)    clearTimeout(idleTimerRef.current)
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
      scrollStopTimer.current = setTimeout(() => {
        isScrolling.current = false
        if (window.scrollY === 0) startIdleTimer()
      }, 150)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    lastScrollY.current = window.scrollY
    if (window.scrollY === 0) startIdleTimer()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (idleTimerRef.current)    clearTimeout(idleTimerRef.current)
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current)
      idleActive.current = false
      idleSpeed.current  = 0
    }
  }, [dragEnabled])

  // ── Panel centre angles ───────────────────────────────────────────────────
  const panelCentres: number[] = []
  let a = 0
  for (let i = 0; i < TOTAL; i++) {
    panelCentres.push(a + videoArc / 2)
    a += videoArc + gapArc
  }

  // ── Per-frame ─────────────────────────────────────────────────────────────
  useFrame(() => {
    if (!groupRef.current) return

    // ── Snap lerp (arrow buttons) ─────────────────────────────────────────
    if (isSnapping.current && snapTarget.current !== null) {
      const remaining = snapTarget.current - rotationRef.current
      if (Math.abs(remaining) < 0.002) {
        rotationRef.current = snapTarget.current
        isSnapping.current  = false
        snapTarget.current  = null
      } else {
        rotationRef.current += remaining * 0.12
      }
    }

    if (!dragEnabled && !isSnapping.current) {
      if (scrollVelocity.value !== 0) rotationRef.current += scrollVelocity.value

      if (idleActive.current && !isScrolling.current && window.scrollY === 0) {
        idleSpeed.current += (IDLE_SPEED - idleSpeed.current) * IDLE_FADE
        rotationRef.current += idleSpeed.current
      } else if (idleSpeed.current !== 0) {
        idleSpeed.current *= 0.8
        if (Math.abs(idleSpeed.current) < 0.00001) idleSpeed.current = 0
      }
    }

    groupRef.current.rotation.y = rotationRef.current

    // Active panel detection — runs during drag and snap
    if (!dragEnabled && !isSnapping.current) return

    const TWO_PI = Math.PI * 2
    let bestIdx  = 0
    let bestDist = Infinity

    panelCentres.forEach((centre, i) => {
      const effective = ((centre + rotationRef.current) % TWO_PI + TWO_PI) % TWO_PI
      const dist      = Math.min(effective, TWO_PI - effective)
      if (dist < bestDist) { bestDist = dist; bestIdx = i }
    })

    if (bestIdx !== lastActive.current) {
      lastActive.current = bestIdx
      setActivePanel(bestIdx)
      onActivePanelChange?.(bestIdx)
    }
  })

  // ── Geometry ──────────────────────────────────────────────────────────────
  const panels: { videoStart: number; gapStart: number }[] = []
  let currentAngle = 0
  for (let i = 0; i < TOTAL; i++) {
    panels.push({ videoStart: currentAngle, gapStart: currentAngle + videoArc })
    currentAngle += videoArc + gapArc
  }

  return (
    <group ref={groupRef}>
      {panels.map((p, i) => (
        <group key={i}>
          {textures[i] ? (
            <mesh>
              <cylinderGeometry
                args={[radius, radius, height, segments, 1, true, p.videoStart, videoArc]}
              />
              <meshBasicMaterial
                map={textures[i]!}
                side={THREE.DoubleSide}
                toneMapped={false}
              />
            </mesh>
          ) : null}

          <mesh>
            <cylinderGeometry
              args={[radius, radius, height, segments, 1, true, p.gapStart, gapArc]}
            />
            <meshBasicMaterial color="black" side={THREE.FrontSide} />
          </mesh>
          {/* <mesh>
            <cylinderGeometry
              args={[radius, radius, height, segments, 1, true]}
            />
            <meshBasicMaterial color="white" side={THREE.DoubleSide} />
          </mesh> */}
        </group>
      ))}

      {/* Inner glass layer — meshBasicMaterial so it ignores all lighting.
          meshStandardMaterial with metalness here picked up spotlight reflections
          and turned the tint layer bright white/grey on mobile, washing out videos. */}
      <mesh>
        <cylinderGeometry
          args={[radius - 0.01, radius - 0.01, height, segments, 1, true]}
        />
        <meshBasicMaterial
          color="black" transparent opacity={innerTintOpacity}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}