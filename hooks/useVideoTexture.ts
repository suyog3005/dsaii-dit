// hooks/useVideoTexture.ts
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"

export function useVideoTexture(
  src:          string,
  active:       boolean   = true,
  onReady?:     () => void,
  fallbackSrc?: string
): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const videoRef        = useRef<HTMLVideoElement | null>(null)
  const readyFired      = useRef(false)
  const videoLoaded     = useRef(false)
  // Track whether the fallback image loader has finished (success or error)
  const fallbackDone    = useRef(false)
  const fallbackTexRef  = useRef<THREE.Texture | null>(null)

  // Keep onReady stable — never causes the effect to re-run
  const onReadyRef = useRef(onReady)
  useEffect(() => { onReadyRef.current = onReady }, [onReady])

  // ── Effect 1: create video + texture when src changes ──────────────────
  useEffect(() => {
    if (!src) return

    // ── Reset all state for this src ──────────────────────────────────────
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.src = ""
      videoRef.current.load()
    }
    readyFired.current   = false
    videoLoaded.current  = false
    fallbackDone.current = false
    fallbackTexRef.current = null

    // ── Helper: fire onReady exactly once ─────────────────────────────────
    function fireReady() {
      if (!readyFired.current) {
        readyFired.current = true
        onReadyRef.current?.()
      }
    }

    // ── Static image source (no video) ───────────────────────────────────
    const lowerSrc     = src.toLowerCase()
    const isImageSource = /\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/.test(lowerSrc)

    if (isImageSource) {
      const loader = new THREE.TextureLoader()
      loader.load(
        src,
        (tex) => {
          tex.colorSpace      = THREE.SRGBColorSpace
          tex.minFilter       = THREE.LinearFilter
          tex.magFilter       = THREE.LinearFilter
          tex.generateMipmaps = false
          // flipY left at Three.js default (true for TextureLoader) —
          // cylinder UVs are already oriented correctly for this.
          tex.needsUpdate     = true
          setTexture(tex)
          fireReady()
        },
        undefined,
        () => fireReady()   // error → still unblock loading counter
      )
      return () => {
        setTexture(prev => { prev?.dispose(); return null })
      }
    }

    // ── Fallback image — show while the video loads ───────────────────────
    if (fallbackSrc) {
      const loader = new THREE.TextureLoader()
      loader.load(
        fallbackSrc,
        (fallbackTex) => {
          fallbackDone.current = true
          fallbackTex.colorSpace      = THREE.SRGBColorSpace
          fallbackTex.minFilter       = THREE.LinearFilter
          fallbackTex.magFilter       = THREE.LinearFilter
          fallbackTex.generateMipmaps = false
          // flipY left at Three.js default (true for TextureLoader) —
          // matches how the cylinder geometry expects image UVs.
          fallbackTex.needsUpdate     = true

          if (!videoLoaded.current) {
            // Video not ready yet — show the fallback image now
            fallbackTexRef.current = fallbackTex
            setTexture(fallbackTex)
          } else {
            // Video already loaded while fallback was fetching — discard fallback
            fallbackTex.dispose()
          }

          // Unblock the loading counter regardless of video state
          fireReady()
        },
        undefined,
        () => {
          // Fallback image failed to load — still unblock the counter
          fallbackDone.current = true
          fireReady()
        }
      )
    }

    // ── Video element ─────────────────────────────────────────────────────
    const video          = document.createElement("video")
    video.crossOrigin    = "anonymous"
    video.loop           = true
    video.muted          = true
    video.playsInline    = true
    video.preload        = "auto"

    video.addEventListener("loadeddata", () => {
      videoLoaded.current = true

      // Build the real VideoTexture
      const tex           = new THREE.VideoTexture(video)
      tex.colorSpace      = THREE.SRGBColorSpace
      tex.minFilter       = THREE.LinearFilter
      tex.magFilter       = THREE.LinearFilter
      tex.generateMipmaps = false
      // flipY left at Three.js VideoTexture default (false) —
      // cylinder UVs are oriented correctly for this.

      // Swap out whatever is currently showing (fallback or null)
      setTexture(prev => {
        prev?.dispose()
        fallbackTexRef.current = null
        return tex
      })

      // If we have no fallback (or fallback hasn't resolved yet),
      // fire onReady from here so the counter isn't stuck.
      if (!fallbackSrc || fallbackDone.current) {
        fireReady()
      }
      // If fallback is still loading, it will call fireReady() when it finishes.
    }, { once: true })

    video.src = src
    video.load()
    videoRef.current = video

    // If no fallback, create the VideoTexture immediately so Three.js has
    // something to update each frame once video data arrives
    if (!fallbackSrc) {
      const tex           = new THREE.VideoTexture(video)
      tex.colorSpace      = THREE.SRGBColorSpace
      tex.minFilter       = THREE.LinearFilter
      tex.magFilter       = THREE.LinearFilter
      tex.generateMipmaps = false
      // flipY left at default — do not override
      setTexture(tex)
    }

    return () => {
      video.pause()
      video.src = ""
      video.load()
      videoRef.current       = null
      fallbackTexRef.current = null
      setTexture(prev => { prev?.dispose(); return null })
    }
  }, [src, fallbackSrc])

  // ── Effect 2: play / pause based on active prop ───────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) video.play().catch(() => {})
    else        video.pause()
  }, [active])

  return texture
}