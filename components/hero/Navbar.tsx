"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const CONTACTS = [
  { name: "Ajinkya", phone: "7447422933" },
  { name: "Suyog", phone: "9421827472" },
]

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      navRef.current.style.borderBottomColor = window.scrollY > 20
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.06)"
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus with Escape
  useEffect(() => {
    if (!open && !contactOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        setContactOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, contactOpen])

  // Close menus on outside click
  useEffect(() => {
    const onDocPointerDown = (e: PointerEvent) => {
      if (!navContainerRef.current) return
      if (!navContainerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setContactOpen(false)
      }
    }
    document.addEventListener("pointerdown", onDocPointerDown)
    return () => document.removeEventListener("pointerdown", onDocPointerDown)
  }, [])

  return (
    <div ref={navContainerRef}>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50
                   flex items-center justify-between
                   px-4 md:px-10 h-12 md:h-16"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* ── Brand ── */}
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="text-white font-black tracking-tight
                     text-[1.1rem] md:text-[1.5rem]
                     hover:opacity-70 transition-opacity duration-200 select-none"
          style={{ letterSpacing: "-0.02em" }}
        >
          DSAII
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about"
             className="text-white/60 hover:text-white text-[0.85rem]
                        font-light tracking-widest uppercase transition-colors duration-200">
            About
          </a>
          <div className="relative">
            <button
              type="button"
              onClick={() => setContactOpen(v => !v)}
              className="text-white/60 hover:text-white text-[0.85rem]
                         font-light tracking-widest uppercase transition-colors duration-200"
            >
              Contact
            </button>

            {contactOpen && (
              <div
                className="absolute top-full mt-3 right-0 min-w-[220px] rounded-sm border border-white/20 p-2"
                style={{
                  background: "rgba(8,8,8,0.88)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                {CONTACTS.map((contact) => (
                  <a
                    key={contact.phone}
                    href={`tel:${contact.phone}`}
                    className="block px-3 py-2 text-white/85 hover:text-white hover:bg-white/10 text-[0.78rem] tracking-wide transition-colors"
                  >
                    {contact.name} - {contact.phone}
                  </a>
                ))}
              </div>
            )}
          </div>
           <a href="https://engg.dypvp.edu.in/dsaii-registrations.aspx"
             className="relative overflow-hidden px-5 py-2
                        text-[0.82rem] font-medium tracking-widest uppercase
                        text-white transition-all duration-300 hover:text-black group"
             style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: "2px" }}
          >
            <span className="absolute inset-0 bg-white translate-y-full
                             group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
                  aria-hidden />
            <span className="relative z-10">Register</span>
          </a>
        </div>

        {/* ── Mobile right: Register + Hamburger ── */}
        <div className="flex md:hidden items-center gap-3">
           <a href="https://engg.dypvp.edu.in/dsaii-registrations.aspx"
             className="relative overflow-hidden px-3 py-1
                        text-[0.65rem] font-medium tracking-widest uppercase
                        text-white transition-all duration-300 hover:text-black group"
             style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: "2px" }}
          >
            <span className="absolute inset-0 bg-white translate-y-full
                             group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
                  aria-hidden />
            <span className="relative z-10">Register</span>
          </a>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="flex flex-col justify-center items-center
                       w-8 h-8 gap-[5px] cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300"
              style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : {}}
            />
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300"
              style={open ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300"
              style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown — small floating panel top-right ── */}
      {open && (
        <div
          className="fixed top-[3rem] right-4 z-60 md:hidden
                     flex flex-col overflow-hidden rounded-sm"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            minWidth: "130px",
          }}
        >
          <a href="#about"
             onClick={() => setOpen(false)}
             className="px-5 py-3 text-white/80 hover:text-white
                        text-[0.72rem] tracking-widest uppercase
                        border-b border-white/10 transition-colors">
            About
          </a>
          <div className="px-5 py-3 border-t border-white/10">
            <p className="text-white/70 text-[0.68rem] tracking-widest uppercase mb-2">Contact</p>
            <div className="flex flex-col gap-1">
              {CONTACTS.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:${contact.phone}`}
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white text-[0.72rem] transition-colors"
                >
                  {contact.name} - {contact.phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}