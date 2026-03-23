"use client"

import { useThree, useFrame } from "@react-three/fiber"
import { useLayoutEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { scrollVelocity } from "@/lib/scrollVelocity"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin)

type Props = {
  onUnlockDrag?: (v: boolean) => void
}

const STOPS        = [0, 0.55, 1]
const TOTAL_SCROLL = 3000

// How much scroll speed converts to rotation speed.
// Negative = anticlockwise when scrolling down.
const SCROLL_TO_ROTATION        = -0.003   // desktop
const SCROLL_TO_ROTATION_MOBILE = -0.0075  // 2.5× more responsive on mobile

export default function CameraRig({ onUnlockDrag }: Props) {
  const { camera } = useThree()

  const lookTarget    = useRef(new THREE.Vector3(5, 0, 0))
  const committedStop = useRef(0)
  const isNavigating  = useRef(false)
  const stRef         = useRef<ScrollTrigger | null>(null)

  // Track raw scroll position each frame to compute velocity
  const lastScrollY   = useRef(0)
  const scrollSpeed   = useRef(0)

  useFrame(() => {
    camera.lookAt(lookTarget.current)

    // Compute scroll delta this frame
    const currentY = window.scrollY
    const delta    = currentY - lastScrollY.current
    lastScrollY.current = currentY

    // Smooth the speed with a small lerp to avoid jitter
    scrollSpeed.current += (delta - scrollSpeed.current) * 0.25

    // Write to shared ref — Cylinder reads this every frame
    // Only rotate during scroll phase (drag not yet unlocked)
    // Once drag is enabled the user controls rotation directly
    if (!scrollVelocity.locked) {
      const mobile   = window.innerWidth < 768
      const multiplier = mobile ? SCROLL_TO_ROTATION_MOBILE : SCROLL_TO_ROTATION
      scrollVelocity.value = scrollSpeed.current * multiplier
    }
  })

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768
    lastScrollY.current = window.scrollY

    // ── Paths ──────────────────────────────────────────────────────────────
    const desktopCameraPath = [
      { x: 5,  y: 20, z: 10  },
      { x: 6,  y: 4,  z: 12  },
      { x: 6,  y: 4,  z: 12  },
      { x: 4,  y: 1,  z: 11  },
      { x: -2, y: 0,  z: 9.5 },
    ]
    const desktopLookPath = [
      { x: 5, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    const mobileCameraPath = [
      { x: 5, y: 20, z: 10 },
      { x: 0, y: 6,  z: 12 },
      { x: 0, y: 6,  z: 14 },
      { x: 0, y: 2,  z: 15 },
      { x: 0, y: 0,  z: 17 },
    ]
    const mobileLookPath = [
      { x: 5, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]

    const cameraPath = isMobile ? mobileCameraPath : desktopCameraPath
    const lookPath   = isMobile ? mobileLookPath   : desktopLookPath

    camera.position.set(cameraPath[0].x, cameraPath[0].y, cameraPath[0].z)
    lookTarget.current.set(lookPath[0].x, lookPath[0].y, lookPath[0].z)

    // ── Arrow UI ────────────────────────────────────────────────────────────
    function updateArrowStates() {
      const stop  = committedStop.current
      const left  = document.querySelector(".nav-arrow-left")  as HTMLElement | null
      const right = document.querySelector(".nav-arrow-right") as HTMLElement | null
      if (!left || !right) return
      left.style.opacity        = stop === 0                 ? "0.25" : "1"
      right.style.opacity       = stop === STOPS.length - 1 ? "0.25" : "1"
      left.style.pointerEvents  = "auto"
      right.style.pointerEvents = "auto"
    }

    // ── Navigate ────────────────────────────────────────────────────────────
    function navigate(direction: 1 | -1) {
      if (isNavigating.current) return

      const next = committedStop.current + direction
      if (next < 0 || next >= STOPS.length) return

      const st = stRef.current
      if (!st) return

      isNavigating.current = true

      const targetScroll = st.start + STOPS[next] * TOTAL_SCROLL

      console.log(
        `[CameraRig] navigate ${committedStop.current} → ${next} | target: ${targetScroll}`
      )

      gsap.killTweensOf(window)

      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          committedStop.current = next
          isNavigating.current  = false
          updateArrowStates()
        },
      })
    }

    // ── Timeline ────────────────────────────────────────────────────────────
    // Track whether we've already disabled the pin so we don't repeat
    let pinDisabled = false

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: `+=${TOTAL_SCROLL}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          stRef.current = self

          if (onUnlockDrag) {
            const unlocked = self.progress > 0.98
            onUnlockDrag(unlocked)
            scrollVelocity.locked = unlocked
            if (unlocked) scrollVelocity.value = 0

            // Once drag is unlocked — release body scroll so mobile
            // top-half touch can scroll the page freely
            if (unlocked && !pinDisabled) {
              pinDisabled = true
              setTimeout(() => {
                // Release any overflow locks set by GSAP pin
                document.body.style.overflow        = ""
                document.body.style.overflowY       = ""
                document.documentElement.style.overflow  = ""
                document.documentElement.style.overflowY = ""
              }, 100)
            }

            if (!unlocked && pinDisabled) {
              pinDisabled = false
            }
          }

          if (!isNavigating.current) {
            const prev = committedStop.current
            if      (self.progress < 0.28) committedStop.current = 0
            else if (self.progress < 0.78) committedStop.current = 1
            else                           committedStop.current = 2
            if (committedStop.current !== prev) updateArrowStates()
          }
        },
      },
    })

    tl.to(camera.position, {
      motionPath: { path: cameraPath, curviness: 1.5 },
      ease: "none",
      duration: 3,
    })

    tl.to(lookTarget.current, {
      motionPath: { path: lookPath, curviness: 1.5 },
      ease: "none",
      duration: 3,
    }, "<")

    // Text + scroll indicator fade together at progress ~0.27
    tl.to([".text-start", ".scroll-indicator"], { opacity: 0, duration: 0.6 }, 0.8)
    tl.fromTo(".text-stop",  { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1)
    tl.to(".text-stop",   { opacity: 0, duration: 0.6 }, 2)
    tl.fromTo(".text-end", { opacity: 0 }, {
      opacity: 1,
      duration: 0.6,
      onStart: () => {
        // Enable pointer events so Register button becomes clickable
        document.querySelectorAll<HTMLElement>(".text-end").forEach(el => {
          el.style.pointerEvents = "auto"
        })
      },
    }, 2.2)

    // ── Buttons ─────────────────────────────────────────────────────────────
    let leftEl:  HTMLElement | null = null
    let rightEl: HTMLElement | null = null

    const onLeft  = () => { console.log("[btn] LEFT");  navigate(-1) }
    const onRight = () => { console.log("[btn] RIGHT"); navigate(+1) }

    const btnTimer = setTimeout(() => {
      leftEl  = document.querySelector<HTMLElement>(".nav-arrow-left")
      rightEl = document.querySelector<HTMLElement>(".nav-arrow-right")
      leftEl?.addEventListener("click",  onLeft)
      rightEl?.addEventListener("click", onRight)
      updateArrowStates()
    }, 300)

    // ── Keyboard ────────────────────────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        document.querySelector<HTMLElement>(".nav-arrow-right")?.click()
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        document.querySelector<HTMLElement>(".nav-arrow-left")?.click()
      }
    }
    window.addEventListener("keydown", onKey)

    return () => {
      // Revert pinning/wrappers before React unmounts DOM nodes.
      tl.scrollTrigger?.kill(true)
      tl.kill()
      gsap.killTweensOf(window)
      clearTimeout(btnTimer)
      window.removeEventListener("keydown", onKey)
      leftEl?.removeEventListener("click",  onLeft)
      rightEl?.removeEventListener("click", onRight)
      scrollVelocity.value  = 0
      scrollVelocity.locked = false
    }
  }, [camera, onUnlockDrag])

  return null
}