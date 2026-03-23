"use client"
import React from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { useState, useEffect, useCallback, useRef } from "react"
import Navbar from "./Navbar"
import LoadingScreen from "./LoadingScreen"
import { PANEL_CONTENT } from "./Cylinder"

const Scene = dynamic(
  () => import("./Scene") as any,
  { ssr: false }
) as React.ComponentType<{ onAllReady?: () => void }>

// ── Sentinel: renders null, but navigates in useEffect (after Scene commits) ──
function SceneGone({ route }: { route: string }) {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(route)
    // Give React/Fiber enough time to fully remove the Canvas from the DOM 
    // before Next.js triggers the route change, avoiding removeChild errors.
    const t = setTimeout(() => {
      router.push(route)
    }, 80)
    return () => clearTimeout(t)
  }, [route, router])
  return null
}

export default function HeroSection() {
  const router = useRouter()
  const [loaded, setLoaded]           = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)
  const [activePanel, setActivePanel]  = useState(0)
  const prefetchedRoutes = useRef<Set<string>>(new Set())

  const prefetchRoute = useCallback((route?: string | null) => {
    if (!route || prefetchedRoutes.current.has(route)) return
    prefetchedRoutes.current.add(route)
    router.prefetch(route)
  }, [router])

  // Listen for DOM event from Cylinder
  useEffect(() => {
    const handler = () => setLoaded(true)
    window.addEventListener("videos-ready", handler)
    return () => window.removeEventListener("videos-ready", handler)
  }, [])

  // Listen for navigate-to event from RegisterBtn
  // Storing route triggers Scene unmount; SceneGone then calls router.push
  // after the React DOM commit — no setTimeout race condition.
  useEffect(() => {
    const handler = (e: Event) => {
      const route = (e as CustomEvent<string>).detail
      prefetchRoute(route)
      setPendingRoute(route)
    }
    window.addEventListener("navigate-to", handler)
    return () => window.removeEventListener("navigate-to", handler)
  }, [prefetchRoute])

  // Prefetch on intent (hover/focus/touch) from register buttons.
  useEffect(() => {
    const handler = (e: Event) => {
      const route = (e as CustomEvent<string>).detail
      prefetchRoute(route)
    }
    window.addEventListener("prefetch-route", handler)
    return () => window.removeEventListener("prefetch-route", handler)
  }, [prefetchRoute])

  // Stagger background prefetch so panel routes are warm before user clicks.
  useEffect(() => {
    const routes = PANEL_CONTENT.map((p) => (p as any).route as string | undefined)
      .filter((route): route is string => Boolean(route))
    const timers = routes.map((route, index) =>
      window.setTimeout(() => prefetchRoute(route), 400 + index * 220)
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [prefetchRoute])

  // Track which panel is front-and-center from Scene's rotation
  useEffect(() => {
    const handler = (e: Event) => {
      setActivePanel((e as CustomEvent<number>).detail)
    }
    window.addEventListener("panel-change", handler)
    return () => window.removeEventListener("panel-change", handler)
  }, [])

  const panel = PANEL_CONTENT[activePanel] ?? PANEL_CONTENT[0]

  return (
    <>
      {/* /* Loading screen stays visible until all 5 videos fire canplay */ }
      <LoadingScreen ready={loaded} minDuration={2000} />

      <Navbar />

      <section className="hero-section h-screen w-full bg-black relative overflow-hidden">

        {/* Scene lives only while no navigation is pending.
            Once pendingRoute is set, SceneGone mounts (Scene is gone from DOM)
            and useEffect inside SceneGone calls router.push. */}
        {pendingRoute
          ? <SceneGone route={pendingRoute} />
          : <Scene onAllReady={() => setLoaded(true)} />}

        
        <div className="overlay-wrapper pointer-events-none absolute inset-0 z-10">

          {/* ── Navigation arrows — below navbar ── */}
          <div className="absolute top-[3.5rem] md:top-[4.5rem] right-4 md:right-6
                          flex items-center gap-2 md:gap-3 z-20">
            <button
              className="nav-arrow-left pointer-events-auto
                         w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/30
                         flex items-center justify-center bg-white/10 backdrop-blur-sm
                         transition-all duration-300 hover:bg-white/20 cursor-pointer"
              aria-label="Previous stage"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M11 14L6 9L11 4" stroke="white" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="nav-arrow-right pointer-events-auto
                         w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/30
                         flex items-center justify-center bg-white/10 backdrop-blur-sm
                         transition-all duration-300 hover:bg-white/20 cursor-pointer"
              aria-label="Next stage"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              STAGE 1 — text-start
              Desktop: right half from 45%, top 18%
              Mobile:  right half from 44%, bottom 6%
          ════════════════════════════════════════════════════════════════ */}
          <div className="text-start absolute
            md:left-[45%] md:top-[18%] md:w-[43%] md:pr-10 md:bottom-auto
            left-[44%] bottom-[36%] w-[56%] pr-3
          ">
            {/* ── Desktop text ── */}
            <div className="hidden md:block">
              <h1 className="anim-fade-up anim-d1
                             text-white font-black leading-[0.9] tracking-tight
                             text-[7rem] mb-0">
                DSAII
              </h1>
              <p className="anim-fade-up anim-d2
                            text-white font-bold leading-tight
                            text-[1.8rem] mt-1 mb-3">
                Technovation 4.0
              </p>
              <div className="anim-fade anim-d2 h-[1px] bg-white/60 mb-5"
                   style={{ width: "clamp(200px, 55%, 380px)" }} />
              <p className="anim-fade-up anim-d3
                            text-white/90 font-light leading-[1.65]
                            text-[1rem] mb-8">
                The Data Science and Artificial Intelligence Inquisitive Club (DSAII)
                 of the Department of Artificial Intelligence and Data Science at Dr.
                  D. Y. Patil Institute of Technology, Pimpri, Pune proudly presents 
                  Technovation 4.0, the flagship event of the department. This event 
                  aims to promote innovation, technical excellence, and analytical 
                  thinking by providing a platform for students to showcase their skills
                   and engage in meaningful competition.
              </p>
              <button
                 onClick={() => window.scrollBy({ top: window.innerHeight * 1.8, behavior: 'smooth' })}
                 className="anim-fade-up anim-d4 pointer-events-auto text-white font-light
                            border-b border-white pb-1 inline-block hover:opacity-70
                            transition-opacity text-[1.05rem] cursor-pointer bg-transparent">
                Explore More!
              </button>
            </div>

            {/* ── Mobile text — shorter ── */}
            <div className="md:hidden bottom-[40%]" >
              <h1 className="anim-fade-up anim-d1
                             text-white font-black leading-[0.9] tracking-tight
                             text-[2.8rem] mb-0">
                DSAII
              </h1>
              <p className="anim-fade-up anim-d2
                            text-white font-bold leading-tight
                            text-[0.85rem] mt-1 mb-2">
                Technovation 4.0
              </p>
              <div className="anim-fade anim-d2 h-[1px] bg-white/60 mb-3"
                   style={{ width: "100px" }} />
              <p className="anim-fade-up anim-d3
                            text-white/85 font-light leading-[1.6]
                            text-[1.0rem] mb-5">
                The DSAII Club of AI&DS proudly presents Technovation 4.0,
                 a platform designed to foster innovation, technical excellence, 
                 and analytical thinking through engaging and competitive student participation.
              </p>
              <button
                 onClick={() => window.scrollBy({ top: window.innerHeight * 1.8, behavior: 'smooth' })}
                 className="anim-fade-up anim-d4 pointer-events-auto text-white font-light
                            border-b border-white pb-1 inline-block hover:opacity-70
                            transition-opacity text-[0.85rem] cursor-pointer bg-transparent">
                Explore More!
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              STAGE 2 — text-stop
              Desktop: right half from 54%, top 18%
              Mobile:  right half from 44%, bottom 6%
          ════════════════════════════════════════════════════════════════ */}
          <div className="text-stop opacity-0 absolute
            md:left-[54%] md:top-[18%] md:w-[43%] md:pr-10 md:bottom-auto
            left-[44%] bottom-[50%] w-[56%] pr-3
          ">
            {/* ── Desktop text ── */}
            <div className="hidden md:block">
              <h2 className="text-white font-black leading-[0.9] tracking-tight
                             text-[5.5rem] mb-6">
                MIRAI <span className="font-black">未来</span>
              </h2>
              <div className="h-[1px] bg-white/60 mb-5"
                   style={{ width: "clamp(200px, 55%, 380px)" }} />
              <p className="text-white/90 font-light leading-[1.65] text-[1rem]">
                Our theme represents a bold leap into the future, 
                where imagination meets innovation and boundaries 
                cease to exist. Inspired by the concept of Mirai,
                 it reflects the journey from curiosity to creation, 
                 empowering individuals to explore uncharted possibilities, 
                 embrace emerging technologies, and redefine what lies ahead
                  in an ever-evolving digital world
              </p>
            </div>

            {/* ── Mobile text — shorter ── */}
            <div className="md:hidden">
              <h2 className="text-white font-black leading-[0.9] tracking-tight
                             text-[2rem] mb-3">
                MIRAI <span className="font-black">未来</span>
              </h2>
              <div className="h-[1px] bg-white/60 mb-3" style={{ width: "80px" }} />
              <p className="text-white/85 font-light leading-[1.6] text-[0.82rem]">
                Our theme represents a leap into the future, 
                where imagination meets innovation, inspiring 
                curiosity, creativity, and exploration of new 
                possibilities in an ever-evolving digital world.
              </p>
            </div>
          </div>



          {/* ── Bottom label — desktop only ── */}
          <div className="text-end opacity-0 absolute left-6 bottom-6
                          hidden md:flex items-center gap-3">
            <span className="text-white/40 text-[0.7rem] tracking-widest font-mono">01</span>
            <span className="text-white/40 text-[0.7rem] tracking-widest uppercase">
              2026 DSAII Technovation 4.0
            </span>
          </div>

          {/* ── Scroll indicator — bottom center ── */}
          <div className="scroll-indicator absolute bottom-6 md:bottom-8
                          left-1/2 -translate-x-1/2
                          flex flex-col items-center pointer-events-none">
            <span className="text-white/30 text-[0.55rem] md:text-[0.6rem]
                             tracking-[0.25em] uppercase mb-2">
              Scroll
            </span>
            <div className="relative w-[1px] h-10 md:h-12"
                 style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="scroll-dot absolute left-1/2 -translate-x-1/2
                              w-[3px] h-[3px] rounded-full"
                   style={{ background: "rgba(255,255,255,0.7)" }} />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}