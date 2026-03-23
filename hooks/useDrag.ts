import { useRef, useEffect, useCallback } from "react"

type UseDragOptions = {
  enabled: boolean
  sensitivity?: number
  damping?: number
  onDrag?: (delta: number) => void
  onVelocity?: (velocity: number) => void
}

const CURSOR_OPEN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='16' stroke='rgba(255,255,255,0.55)' stroke-width='1.5' fill='rgba(255,255,255,0.08)'/%3E%3C/svg%3E") 20 20, crosshair`
const CURSOR_DRAG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='12' stroke='rgba(255,255,255,0.7)' stroke-width='1.5' fill='rgba(255,255,255,0.18)'/%3E%3C/svg%3E") 16 16, crosshair`

function setCursor(cursor: string) {
  document.documentElement.style.cursor = cursor
  document.body.style.cursor = cursor
}

let styleTag: HTMLStyleElement | null = null
function lockCursor(cursor: string) {
  if (!styleTag) {
    styleTag = document.createElement("style")
    styleTag.id = "drag-cursor-lock"
    document.head.appendChild(styleTag)
  }
  styleTag.textContent = `* { cursor: ${cursor} !important; }`
}
function unlockCursor() {
  if (styleTag) styleTag.textContent = ""
}

// Returns true if the touch started in the top half of the screen
function isTouchInTopHalf(clientY: number): boolean {
  return clientY < window.innerHeight / 3
}

export function useDrag({
  enabled,
  sensitivity = 0.002,
  damping     = 0.88,
  onDrag,
  onVelocity,
}: UseDragOptions) {
  const isDragging      = useRef(false)
  const isTopHalfTouch  = useRef(false)  // true = this touch is a scroll gesture
  const previousX       = useRef(0)
  const previousY       = useRef(0)      // track Y for top-half scroll
  const velocityRef     = useRef(0)
  const rafRef          = useRef<number | null>(null)
  const enabledRef      = useRef(enabled)

  useEffect(() => {
    enabledRef.current = enabled
    if (!enabled) {
      isDragging.current     = false
      isTopHalfTouch.current = false
      velocityRef.current    = 0
      unlockCursor()
      setCursor("default")
    } else {
      lockCursor(CURSOR_OPEN)
      setCursor(CURSOR_OPEN)
    }
  }, [enabled])

  const startInertia = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const loop = () => {
      if (Math.abs(velocityRef.current) < 0.0001) {
        velocityRef.current = 0
        return
      }
      velocityRef.current *= damping
      onVelocity?.(velocityRef.current)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [damping, onVelocity])

  useEffect(() => {
    // ── Mouse (desktop) ────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      if (!enabledRef.current) return
      isDragging.current  = true
      previousX.current   = e.clientX
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      velocityRef.current = 0
      lockCursor(CURSOR_DRAG)
      setCursor(CURSOR_DRAG)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current || !isDragging.current) return
      const delta = e.clientX - previousX.current
      previousX.current   = e.clientX
      velocityRef.current = delta * sensitivity
      onDrag?.(delta * sensitivity)
    }

    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      if (enabledRef.current) {
        lockCursor(CURSOR_OPEN)
        setCursor(CURSOR_OPEN)
      }
      startInertia()
    }

    // ── Touch (mobile) ─────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      if (!enabledRef.current) return

      const touch = e.touches[0]

      // Top half → treat as native scroll — do NOT preventDefault
      // Bottom half → treat as cylinder drag — preventDefault
      if (isTouchInTopHalf(touch.clientY)) {
        isTopHalfTouch.current = true
        isDragging.current     = false
        // Let browser handle scroll natively — don't intercept
        return
      }

      isTopHalfTouch.current = false
      isDragging.current     = true
      previousX.current      = touch.clientX
      previousY.current      = touch.clientY
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      velocityRef.current = 0
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!enabledRef.current) return

      // Top half touch — let browser scroll natively
      if (isTopHalfTouch.current) return

      if (!isDragging.current) return

      // Bottom half — horizontal drag rotates cylinder
      e.preventDefault()
      const touch = e.touches[0]
      const delta = touch.clientX - previousX.current
      previousX.current   = touch.clientX
      velocityRef.current = delta * sensitivity
      onDrag?.(delta * sensitivity)
    }

    const onTouchEnd = () => {
      isTopHalfTouch.current = false
      if (!isDragging.current) return
      isDragging.current = false
      startInertia()
    }

    window.addEventListener("mousedown",  onMouseDown)
    window.addEventListener("mousemove",  onMouseMove)
    window.addEventListener("mouseup",    onMouseUp)
    // passive: false only needed for bottom-half drag (preventDefault)
    // We conditionally call preventDefault inside, so passive:false is required
    window.addEventListener("touchstart", onTouchStart, { passive: true  })
    window.addEventListener("touchmove",  onTouchMove,  { passive: false })
    window.addEventListener("touchend",   onTouchEnd)

    return () => {
      window.removeEventListener("mousedown",  onMouseDown)
      window.removeEventListener("mousemove",  onMouseMove)
      window.removeEventListener("mouseup",    onMouseUp)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove",  onTouchMove)
      window.removeEventListener("touchend",   onTouchEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      unlockCursor()
      setCursor("default")
    }
  }, [sensitivity, onDrag, startInertia])

  return { velocityRef }
}