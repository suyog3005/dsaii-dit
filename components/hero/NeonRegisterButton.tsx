"use client"

import Link from "next/link"
import { useEffect } from "react"

type Props = {
  href:       string
  glowColor:  string
  className?: string
}

// Module-level style tag — created once, never touched by React's fiber tree.
// Updating textContent directly avoids any React reconciliation issues.
function injectNeonStyles(glowColor: string) {
  if (typeof document === "undefined") return
  const id  = "neon-register-styles"
  let tag   = document.getElementById(id) as HTMLStyleElement | null
  if (!tag) {
    tag    = document.createElement("style")
    tag.id = id
    // Append to head OUTSIDE React's managed container — React never tracks this node
    document.head.appendChild(tag)
  }
  tag.textContent = `
    @keyframes neonPulse {
      0%, 100% { box-shadow:
        0 0 0.25em 0.05em ${glowColor}99,
        0 0 0.8em  0.2em  ${glowColor}44,
        inset 0 0  0.25em 0.05em ${glowColor}66;
      }
      50% { box-shadow:
        0 0 0.4em  0.1em  ${glowColor}bb,
        0 0 1.2em  0.4em  ${glowColor}33,
        inset 0 0  0.35em 0.1em  ${glowColor}88;
      }
    }
    .neon-register-btn {
      border: 0.12em solid ${glowColor}cc;
      color: ${glowColor} !important;
      background-color: ${glowColor}15;
      border-radius: 0.6em;
      font-weight: bold;
      letter-spacing: 0.1em;
      text-shadow: 0 0 0.3em ${glowColor}99;
      box-shadow:
        0 0 0.25em 0.05em ${glowColor}99,
        0 0 0.8em  0.2em  ${glowColor}44,
        inset 0 0  0.25em 0.05em ${glowColor}66;
      animation: neonPulse 2.5s ease-in-out infinite;
      position: relative;
      transition: all 0.3s;
    }
    .neon-register-btn:hover {
      color: #0a0a0a !important;
      background-color: ${glowColor}dd;
      box-shadow:
        0 0 0.4em  0.1em  ${glowColor}cc,
        0 0 1.5em  0.6em  ${glowColor}55,
        inset 0 0  0.4em  0.1em  ${glowColor}88;
    }
    .neon-register-btn:active {
      box-shadow:
        0 0 0.2em 0.05em ${glowColor}88,
        0 0 0.8em 0.3em  ${glowColor}33,
        inset 0 0 0.2em  0.05em ${glowColor}55;
    }
  `
}

export default function NeonRegisterButton({ href, glowColor, className = "" }: Props) {
  useEffect(() => {
    injectNeonStyles(glowColor)
  }, [glowColor])

  // ⚠️ No fragment — renders ONLY the Link element.
  // React's fiber has exactly one DOM node to track: the <a> tag.
  // The style tag lives in document.head outside React's tree — it is
  // never a child of this component in React's view, so removeChild never fires.
  return (
    <Link
      href={href}
      className={`neon-register-btn inline-block ${className}`}
      style={{ color: glowColor }}
    >
      Register Now
    </Link>
  )
}