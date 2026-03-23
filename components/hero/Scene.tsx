"use client"

import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useHelper } from "@react-three/drei"
import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { MeshReflectorMaterial } from "@react-three/drei"
import { Text } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import Cylinder, { PANEL_CONTENT } from "./Cylinder"
import CameraRig from "./CameraRig"
import { useVideoTexture } from "../../hooks/useVideoTexture"

// ── Constants outside component — never recreated ────────────────────────────
const ORIG_FLOOR = "#B37CCB"
const ORIG_WALL  = "#AC79B4"

// ── Lights ────────────────────────────────────────────────────────────────────
function Lights() {
  const lightRef1 = useRef<THREE.SpotLight>(null!)
  const lightRef2 = useRef<THREE.SpotLight>(null!)
  const lightRef3 = useRef<THREE.SpotLight>(null!)
  const lightRef4 = useRef<THREE.SpotLight>(null!)
  const lightRef5 = useRef<THREE.SpotLight>(null!)
  const lightRef6 = useRef<THREE.SpotLight>(null!)

  const target1 = useRef<THREE.Object3D>(null!)
  const target2 = useRef<THREE.Object3D>(null!)
  const target3 = useRef<THREE.Object3D>(null!)
  const target4 = useRef<THREE.Object3D>(null!)
  const target5 = useRef<THREE.Object3D>(null!)
  const target6 = useRef<THREE.Object3D>(null!)

  // Uncomment to debug spotlight positions:
  // useHelper(lightRef1, THREE.SpotLightHelper, "cyan")
  // useHelper(lightRef2, THREE.SpotLightHelper, "cyan")
  // useHelper(lightRef3, THREE.SpotLightHelper, "yellow")
  // useHelper(lightRef4, THREE.SpotLightHelper, "green")
  // useHelper(lightRef5, THREE.SpotLightHelper, "red")
  // useHelper(lightRef6, THREE.SpotLightHelper, "red")

  useEffect(() => {
    const pairs = [
      [lightRef1, target1], [lightRef2, target2], [lightRef3, target3],
      [lightRef4, target4], [lightRef5, target5], [lightRef6, target6],
    ] as const
    pairs.forEach(([l, t]) => {
      if (l.current && t.current) {
        l.current.target = t.current
        t.current.updateMatrixWorld()
      }
    })
  }, [])

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[-10, 30, -5]} intensity={0.15} />

      {/* Top Spotlight — castShadow kept */}
      <spotLight ref={lightRef1} position={[0, 8, 0]}
        angle={0.6} penumbra={0.6} intensity={90} distance={60} decay={2}
        castShadow shadow-radius={8} />
      <object3D ref={target1} position={[0, 0, 0]} />

      {/* Side Spotlight — castShadow kept */}
      <spotLight ref={lightRef2} position={[5, 15, 6]}
        angle={0.7} penumbra={0.4} intensity={150} distance={60} decay={2}
        castShadow shadow-radius={8} />
      <object3D ref={target2} position={[0, 0, 0]} />

      {/* Top right plane — shadow removed */}
      <spotLight ref={lightRef3} position={[27, 8, -12]}
        angle={1.2} penumbra={0.5} intensity={90} distance={80} decay={2} />
      <object3D ref={target3} position={[27, 0, -12]} />

      {/* Top right background — shadow removed */}
      <spotLight ref={lightRef5} position={[18, 10, -14]}
        angle={0.8} penumbra={0.6} intensity={150} distance={50} decay={1.5} />
      <object3D ref={target5} position={[36, 10, -40]} />

      {/* Top left background — shadow removed */}
      <spotLight ref={lightRef6} position={[-18, 10, -14]}
        angle={0.8} penumbra={0.6} intensity={150} distance={50} decay={1.5} />
      <object3D ref={target6} position={[-36, 10, -40]} />

      {/* Top left plane — shadow removed */}
      <spotLight ref={lightRef4} position={[-24, 6, -12]}
        angle={1.2} penumbra={0.5} intensity={50} distance={80} decay={2} />
      <object3D ref={target4} position={[-24, 0, -12]} />
    </>
  )
}

// ── Debug helpers (kept, commented out) ──────────────────────────────────────
function VideoTest() {
  const tex = useVideoTexture("/videos/v1.mp4")
  if (!tex) return null
  return (
    <mesh position={[0, 5, 0]}>
      <planeGeometry args={[10, 6]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

function InitialCameraArrow() {
  const { scene } = useThree()
  useEffect(() => {
    const start     = new THREE.Vector3(5, 20, 10)
    const target    = new THREE.Vector3(5, 0, 0)
    const direction = new THREE.Vector3().subVectors(target, start).normalize()
    const arrow     = new THREE.ArrowHelper(direction, start, 10, 0xff0000)
    scene.add(arrow)
    return () => { scene.remove(arrow) }
  }, [scene])
  return null
}

function VideoPanels() {
  const radius    = 5
  const height    = 6
  const total     = 4
  const angleStep = (Math.PI * 2) / total
  const textures  = [
    useVideoTexture("/videos/v1.mp4"),
    useVideoTexture("/videos/v2.mp4"),
    useVideoTexture("/videos/v3.mp4"),
    useVideoTexture("/videos/v4.mp4"),
  ]
  return (
    <>
      {textures.map((tex, i) => {
        if (!tex) return null
        const angle = i * angleStep
        return (
          <mesh key={i} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
                rotation={[0, angle, 0]}>
            <planeGeometry args={[4, height, 32, 1]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        )
      })}
    </>
  )
}

// ── Color lerper ──────────────────────────────────────────────────────────────
// setFloorColor is throttled — only fires when hex string actually changes,
// preventing a React re-render every frame during transitions.
type ColorLerperProps = {
  wallMatRef:    React.MutableRefObject<THREE.MeshStandardMaterial | null>
  floorMatRef:   React.MutableRefObject<THREE.MeshStandardMaterial | null>
  currentWall:   React.MutableRefObject<THREE.Color>
  targetWall:    React.MutableRefObject<THREE.Color>
  currentFloor:  React.MutableRefObject<THREE.Color>
  targetFloor:   React.MutableRefObject<THREE.Color>
  lerpSpeed:     React.MutableRefObject<number>
  lerpMaxSpeed:  React.MutableRefObject<number>
  lerpRunning:   React.MutableRefObject<boolean>
  setFloorColor: (c: string) => void
}

function ColorLerper({
  wallMatRef, floorMatRef, currentWall, targetWall,
  currentFloor, targetFloor,
  lerpSpeed, lerpMaxSpeed, lerpRunning,
  setFloorColor,
}: ColorLerperProps) {
  // Track last emitted hex to avoid redundant setState calls
  const prevHex = useRef("")

  useFrame(() => {
    if (!lerpRunning.current) return

    lerpSpeed.current = Math.min(lerpSpeed.current + 0.0015, lerpMaxSpeed.current)
    const a = lerpSpeed.current

    // Wall — direct material mutation, no React re-render
    const wall = wallMatRef.current
    if (wall?.color) {
      currentWall.current.lerp(targetWall.current, a)
      wall.color.copy(currentWall.current)
      wall.needsUpdate = true
    }

    // Floor — lerp the color object
    currentFloor.current.lerp(targetFloor.current, a)

    // Mutate mobile floor material directly (same as wall — no re-render needed)
    const floor = floorMatRef.current
    if (floor?.color) {
      floor.color.copy(currentFloor.current)
      floor.needsUpdate = true
    }

    // Also update floorColor state for desktop MeshReflectorMaterial
    // (can't be mutated by ref — needs React re-render)
    const hex = "#" + currentFloor.current.getHexString()
    if (hex !== prevHex.current) {
      prevHex.current = hex
      setFloorColor(hex)
    }

    // Stop when close enough
    const dw = Math.abs(currentWall.current.r - targetWall.current.r)
             + Math.abs(currentWall.current.g - targetWall.current.g)
             + Math.abs(currentWall.current.b - targetWall.current.b)
    const df = Math.abs(currentFloor.current.r - targetFloor.current.r)
             + Math.abs(currentFloor.current.g - targetFloor.current.g)
             + Math.abs(currentFloor.current.b - targetFloor.current.b)

    if (dw + df < 0.008) {
      currentWall.current.copy(targetWall.current)
      currentFloor.current.copy(targetFloor.current)
      if (wall?.color) { wall.color.copy(targetWall.current); wall.needsUpdate = true }
      const finalHex = "#" + targetFloor.current.getHexString()
      if (finalHex !== prevHex.current) {
        prevHex.current = finalHex
        setFloorColor(finalHex)
      }
      lerpRunning.current = false
      lerpSpeed.current   = 0
    }
  })
  return null
}


// ── Register button ──────────────────────────────────────────────────────────
// Fires a CustomEvent carrying the route. HeroSection listens, unmounts Scene,
// then SceneGone (rendered in place of Scene) calls router.push in useEffect —
// guaranteed to run only AFTER React has committed the Scene unmount to the DOM.
function RegisterBtn({ route }: { route?: string }) {
  const emitPrefetch = () => {
    window.dispatchEvent(
      new CustomEvent("prefetch-route", { detail: route ?? "/" })
    )
  }

  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("navigate-to", { detail: route ?? "/" })
    )
  }

  return (
    <button
      onMouseEnter={emitPrefetch}
      onFocus={emitPrefetch}
      onTouchStart={emitPrefetch}
      onClick={handleClick}
      className="neon-btn"
    >
      Register Now
    </button>
  )
}

// ── Panel overlay ─────────────────────────────────────────────────────────────
type OverlayProps = {
  activePanel: number
  visible:     boolean
}

function PanelOverlay({ activePanel, visible }: OverlayProps) {
  const panel = PANEL_CONTENT[activePanel] ?? PANEL_CONTENT[0]

  // ── Phase 1: invisible for first 5s after drag unlocks ───────────────────
  // ── Phase 2: fade in, then blink after 3s of idle ────────────────────────
  const [shown,    setShown]    = useState(false)  // becomes true after 5s
  const [blinking, setBlinking] = useState(false)  // becomes true after 3s idle

  // 5s reveal timer — resets if visible toggles off/on
  useEffect(() => {
    if (!visible) { setShown(false); setBlinking(false); return }
    const revealTimer = setTimeout(() => setShown(true), 5000)
    return () => clearTimeout(revealTimer)
  }, [visible])

  // 3s idle blink timer — starts only once arrows are shown
  useEffect(() => {
    if (!visible || !shown) return
    let idleTimer: ReturnType<typeof setTimeout>
    const reset = () => {
      setBlinking(false)
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => setBlinking(true), 3000)
    }
    reset()
    window.addEventListener("touchstart",  reset, { passive: true })
    window.addEventListener("pointerdown", reset, { passive: true })
    window.addEventListener("pointermove", reset, { passive: true })
    return () => {
      clearTimeout(idleTimer)
      window.removeEventListener("touchstart",  reset)
      window.removeEventListener("pointerdown", reset)
      window.removeEventListener("pointermove", reset)
    }
  }, [visible, shown])

  // ── Update neon glow color to match active panel wall color ─────────────
  useEffect(() => {
    const wall = (panel as any).wallColor ?? panel.accent
    document.querySelectorAll<HTMLElement>(".neon-btn").forEach(el => {
      el.style.setProperty("--neon-color", wall + "99") // 60% opacity for glow
      el.style.borderColor = wall + "aa"
    })
  }, [activePanel, panel])

  return (
    <>
      {/* Desktop — bottom left */}
      <div
        className={`absolute transition-opacity duration-500
          hidden md:block left-10 bottom-[14%] w-[25%]
          ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <p className="text-white font-bold leading-[1.05] mb-1"
           style={{ fontSize: "clamp(1.5rem, 4vw, 3.4rem)" }}>
          {panel.title}
        </p>
        <p className="text-white/40 font-light tracking-widest uppercase mb-4 text-[0.75rem]">
          {panel.subtitle}
        </p>
        <p className="text-white/70 font-light leading-relaxed mb-5 text-[1rem]">
          {panel.description}
        </p>
        <RegisterBtn route={(panel as any).route} />

      </div>

      {/* ── Mobile: title block — top ── */}
      <div
        className={`absolute transition-opacity duration-500
          md:hidden left-0 top-[12%] w-full px-5 
          ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: "none" }}
      >
        <p className="text-white font-bold leading-tight text-[1.9rem] mb-1">
          {panel.title}
        </p>
        <p className="text-white/40 font-light tracking-widest uppercase text-[0.6rem] mb-3">
          {panel.subtitle}
        </p>
        {/* Top description — short tagline */}
        <p className="text-white/70 font-light text-[0.9rem] leading-relaxed">
          {panel.description}
        </p>
        
      </div>

      {/* ── Mobile: bottom description + Register button ── */}
      <div
        className={`absolute transition-opacity duration-500
          md:hidden left-0 bottom-[14%]  w-full px-5 flex flex-col items-center gap-4
          ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        {/* Bottom description — event-specific detail */}
        <p className="text-white/60 font-light text-[0.9rem] leading-relaxed text-center">
          {(panel as any).mobileBottom}
        </p>
          
        <RegisterBtn route={(panel as any).route} />
      </div>

      {/* ── Mobile: cylinder nav arrows — hidden 5s, then fade in, blink on idle ── */}
      {visible && shown && (
        <>
          {/* Left chevron */}
          <button
            aria-label="Previous event"
            onClick={() => window.dispatchEvent(new CustomEvent("cylinder-nav", { detail: "left" }))}
            className={`md:hidden absolute bottom-[30%] left-4 z-20
                        p-2 bg-transparent border-none
                        transition-opacity duration-300
                        ${blinking ? "nav-arrow-flicker" : "opacity-60"}
                        active:opacity-100`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Right chevron */}
          <button
            aria-label="Next event"
            onClick={() => window.dispatchEvent(new CustomEvent("cylinder-nav", { detail: "right" }))}
            className={`md:hidden absolute bottom-[30%] right-4 z-20
                        p-2 bg-transparent border-none
                        transition-opacity duration-300
                        ${blinking ? "nav-arrow-flicker" : "opacity-60"}
                        active:opacity-100`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

    </>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
type SceneProps = {
  onAllReady?: () => void
}

export default function Scene({ onAllReady }: SceneProps) {
  // Also dispatch a DOM event so HeroSection can listen regardless of
  // React batching issues from inside the R3F Canvas context
  useEffect(() => {
    const handler = () => onAllReady?.()
    window.addEventListener("videos-ready", handler)
    return () => window.removeEventListener("videos-ready", handler)
  }, [onAllReady])
  const [dragEnabled, setDragEnabled] = useState(false)
  const [activePanel, setActivePanel] = useState(0)
  const [floorColor, setFloorColor]   = useState(ORIG_FLOOR)

  const wallMatRef   = useRef<THREE.MeshStandardMaterial | null>(null)
  const floorMatRef  = useRef<THREE.MeshStandardMaterial | null>(null)
  const currentFloor = useRef(new THREE.Color(ORIG_FLOOR))
  const currentWall  = useRef(new THREE.Color(ORIG_WALL))
  const targetFloor  = useRef(new THREE.Color(ORIG_FLOOR))
  const targetWall   = useRef(new THREE.Color(ORIG_WALL))
  const lerpSpeed    = useRef(0)
  const lerpMaxSpeed = useRef(0.035)
  const lerpRunning  = useRef(false)
  const delayRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  // isMobile computed once on mount — stable, no re-render cost
  const isMobile = useRef(
    typeof window !== "undefined" && window.innerWidth < 768
  ).current

  // Drag state transition — 1s delay then slow lerp
  useEffect(() => {
    if (delayRef.current) clearTimeout(delayRef.current)
    delayRef.current = setTimeout(() => {
      if (dragEnabled) {
        const p = PANEL_CONTENT[activePanel] ?? PANEL_CONTENT[0]
        targetFloor.current.set(p.floorColor.trim())
        targetWall.current.set(p.wallColor.trim())
      } else {
        targetFloor.current.set(ORIG_FLOOR)
        targetWall.current.set(ORIG_WALL)
      }
      lerpSpeed.current    = 0
      lerpMaxSpeed.current = 0.035
      lerpRunning.current  = true
    }, 1000)
    return () => { if (delayRef.current) clearTimeout(delayRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragEnabled])

  // Stable callback — recreated only when dragEnabled changes
  const handlePanelChange = useCallback((idx: number) => {
    setActivePanel(idx)
    // Broadcast to HeroSection so it can update the text-end panel content
    window.dispatchEvent(new CustomEvent("panel-change", { detail: idx }))
    const p = PANEL_CONTENT[idx]
    if (p && dragEnabled) {
      targetFloor.current.set(p.floorColor.trim())
      targetWall.current.set(p.wallColor.trim())
      lerpSpeed.current    = 0
      lerpMaxSpeed.current = 0.06   // fast for panel drag switch
      lerpRunning.current  = true
    }
  }, [dragEnabled])

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        gl={{ toneMapping: THREE.NoToneMapping }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
        camera={{ position: [10, 15, 25], fov: isMobile ? 55 : 45 }}
      >
        <Lights />

        {/* <OrbitControls />
        <axesHelper args={[40]} />
        <InitialCameraArrow /> */}
        {/* <VideoTest /> */}
        {/* <VideoPanels /> */}

        <CameraRig onUnlockDrag={setDragEnabled} />

        <ColorLerper
          wallMatRef={wallMatRef}
          floorMatRef={floorMatRef}
          currentWall={currentWall}
          targetWall={targetWall}
          currentFloor={currentFloor}
          targetFloor={targetFloor}
          lerpSpeed={lerpSpeed}
          lerpMaxSpeed={lerpMaxSpeed}
          lerpRunning={lerpRunning}
          setFloorColor={setFloorColor}
        />

        {/* Back curved wall */}
        <mesh position={[0, 0, -10]}>
          <cylinderGeometry args={[40, 40, 80, 64, 1, true]} />
          <meshStandardMaterial
            ref={wallMatRef}
            color={ORIG_WALL}
            roughness={0.6}
            metalness={0.5}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
          <planeGeometry args={[150, 150]} />
          {isMobile ? (
            <meshStandardMaterial
              ref={floorMatRef}
              color={floorColor}
              roughness={0.8}
              metalness={0.5}
            />
          ) : (
            <MeshReflectorMaterial
              blur={[100, 50]}
              resolution={512}
              mixBlur={0.7}
              mixStrength={3}
              roughness={0.7}
              metalness={0.5}
              color={floorColor}
            />
          )}
        </mesh>

        <Cylinder
          dragEnabled={dragEnabled}
          onActivePanelChange={handlePanelChange}
          onAllReady={onAllReady}
          innerTintOpacity={isMobile ? 0.35 : 0.55}
        />

      </Canvas>

      <PanelOverlay activePanel={activePanel} visible={dragEnabled} />
    </div>
  )
}