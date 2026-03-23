// hooks/useVideoPreloader.ts
"use client"

import { useEffect, useRef, useState } from "react"
import { VIDEO_SOURCES, CACHE_NAME } from "@/lib/videoConfig"

export type PreloadStatus = {
  ready:    boolean
  progress: number   // 0–100
  urls:     string[] // blob:// URLs — pass directly to <video> / VideoTexture
  error:    string | null
}

export function useVideoPreloader(): PreloadStatus {
  const [status, setStatus] = useState<PreloadStatus>({
    ready:    false,
    progress: 0,
    urls:     [],
    error:    null,
  })

  const didRun   = useRef(false)
  const blobUrls = useRef<string[]>([])

  useEffect(() => {
    if (didRun.current) return
    didRun.current = true

    let cancelled = false

    async function load() {
      // Open the Cache API — same cache the SW uses
      let cache: Cache | null = null
      try {
        if (typeof caches !== "undefined") {
          cache = await caches.open(CACHE_NAME)
          console.log("[preloader] Cache API open")
        }
      } catch (e) {
        console.warn("[preloader] Cache API unavailable:", e)
      }

      const urls: string[] = new Array(VIDEO_SOURCES.length).fill("")
      let loaded = 0

      const tick = () => {
        loaded++
        if (!cancelled) {
          setStatus((s) => ({
            ...s,
            progress: Math.round((loaded / VIDEO_SOURCES.length) * 100),
            urls: [...urls],
          }))
        }
      }

      await Promise.all(
        VIDEO_SOURCES.map(async (src, i) => {
          try {
            let blob: Blob

            if (cache) {
              const cached = await cache.match(src)
              if (cached) {
                console.log(`[preloader] cache hit: ${src}`)
                blob = await cached.blob()
              } else {
                console.log(`[preloader] fetching: ${src}`)
                const res = await fetch(src, { mode: "cors" })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const resForCache = res.clone()
                blob = await res.blob()
                cache.put(src, resForCache).catch((e) =>
                  console.warn("[preloader] cache.put failed:", e)
                )
              }
            } else {
              const res = await fetch(src, { mode: "cors" })
              if (!res.ok) throw new Error(`HTTP ${res.status}`)
              blob = await res.blob()
            }

            const blobUrl = URL.createObjectURL(blob)
            urls[i] = blobUrl
            blobUrls.current.push(blobUrl)
            tick()
          } catch (err) {
            console.error(`[preloader] failed: ${src}`, err)
            urls[i] = src // fallback to direct URL
            tick()
            if (!cancelled) {
              setStatus((s) => ({ ...s, error: `Failed to load video ${i + 1}` }))
            }
          }
        })
      )

      if (!cancelled) {
        setStatus({ ready: true, progress: 100, urls, error: null })
        console.log("[preloader] all videos ready")
      }
    }

    load()

    return () => {
      cancelled = true
      blobUrls.current.forEach((u) => {
        if (u.startsWith("blob:")) URL.revokeObjectURL(u)
      })
      blobUrls.current = []
    }
  }, [])

  return status
}