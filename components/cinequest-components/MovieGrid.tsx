"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

const G = {
  romance: { c: "rgba(255,100,150,0.78)", glow: "#ff5090", gc: "#ff3070" },
  action: { c: "rgba(255,48,48,0.80)", glow: "#ff1818", gc: "#ee0000" },
  drama: { c: "rgba(255,168,45,0.76)", glow: "#ffaa18", gc: "#ee8800" },
  epic: { c: "rgba(205,162,65,0.74)", glow: "#cc9920", gc: "#bb8800" },
  thriller: { c: "rgba(42,148,255,0.78)", glow: "#1a80ff", gc: "#0055ee" },
  social: { c: "rgba(58,210,148,0.74)", glow: "#18cc80", gc: "#00aa60" },
  crime: { c: "rgba(170,42,218,0.72)", glow: "#aa18dd", gc: "#8800cc" },
  horror: { c: "rgba(68,232,95,0.66)", glow: "#28dd44", gc: "#00cc22" },
  comedy: { c: "rgba(252,212,45,0.72)", glow: "#ffcc00", gc: "#ddaa00" },
  biopic: { c: "rgba(112,190,252,0.70)", glow: "#55aaff", gc: "#3388ee" },
} as const;

// ── 7 columns × 9 rows = 63 cells, zero duplicates across all columns ─────────
// Col 0 · Bollywood Classics
// Col 1 · Bollywood Modern
// Col 2 · Hollywood Blockbusters
// Col 3 · Hollywood Prestige
// Col 4 · Anime Series
// Col 5 · Web Series
// Col 6 · Sitcoms

const COL_DATA: [string, keyof typeof G][][] = [
  // ── Col 0 · Bollywood Classics ───────────────────────────────────────────
  [
    ["SHOLAY",          "action"],
    ["DEVDAS",          "romance"],
    ["MUGHAL-E-AZAM",   "epic"],
    ["MOTHER INDIA",    "social"],
    ["AWAARA",          "drama"],
    ["PYAASA",          "drama"],
    ["GUIDE",           "drama"],
    ["PAKEEZAH",        "drama"],
    ["ARADHANA",        "romance"],
    ["ANAND",           "drama"],
    ["BANDINI",         "drama"],
    ["MADHUMATI",       "romance"],
    ["DEEWAR",          "action"],
    ["ZANJEER",         "action"],
    ["HAQEEQAT",        "epic"],
    ["SUJATA",          "social"],
    ["PARAKH",          "social"],
    ["SAHIB BIBI AUR",  "drama"],
    ["KAGAZ KE PHOOL",  "drama"],
    ["CHAUDHVIN KA",    "romance"],
  ],
  // ── Col 1 · Bollywood Modern ─────────────────────────────────────────────
  [
    ["DDLJ",            "romance"],
    ["3 IDIOTS",        "comedy"],
    ["LAGAAN",          "epic"],
    ["DANGAL",          "biopic"],
    ["ANDHADHUN",       "thriller"],
    ["GULLY BOY",       "biopic"],
    ["JAWAN",           "action"],
    ["PATHAAN",         "action"],
    ["ANIMAL",          "crime"],
    ["GANGS OF WAS.",   "crime"],
    ["SWADES",          "social"],
    ["TAARE ZAMEEN",    "social"],
    ["QUEEN",           "drama"],
    ["PINK",            "social"],
    ["ARTICLE 15",      "social"],
    ["URI",             "biopic"],
    ["RAAZI",           "thriller"],
    ["SHERSHAAH",       "biopic"],
    ["BRAHMASTRA",      "epic"],
    ["KAL HO NA HO",   "romance"],
  ],
  // ── Col 2 · Hollywood Blockbusters ───────────────────────────────────────
  [
    ["AVENGERS",        "action"],
    ["TITANIC",         "romance"],
    ["THE DARK KNIGHT", "thriller"],
    ["INCEPTION",       "thriller"],
    ["AVATAR",          "epic"],
    ["JURASSIC PARK",   "action"],
    ["TOP GUN",         "action"],
    ["GLADIATOR",       "epic"],
    ["INTERSTELLAR",    "epic"],
    ["IRON MAN",        "action"],
    ["SPIDER-MAN",      "action"],
    ["THE MATRIX",      "thriller"],
    ["STAR WARS",       "epic"],
    ["BATMAN BEGINS",   "action"],
    ["MAD MAX FURY",    "action"],
    ["JOHN WICK",       "action"],
    ["MISSION IMP.",    "thriller"],
    ["FAST & FURIOUS",  "action"],
    ["DOCTOR STRANGE",  "epic"],
    ["BLACK PANTHER",   "action"],
  ],
  // ── Col 3 · Hollywood Prestige ───────────────────────────────────────────
  [
    ["THE GODFATHER",   "crime"],
    ["SCHINDLER'S LIST","drama"],
    ["FORREST GUMP",    "drama"],
    ["SHAWSHANK",       "drama"],
    ["GOODFELLAS",      "crime"],
    ["PULP FICTION",    "crime"],
    ["NO COUNTRY",      "thriller"],
    ["A BEAUTIFUL MIND","biopic"],
    ["THE SILENCE",     "horror"],
    ["FIGHT CLUB",      "thriller"],
    ["AMERICAN BEAUTY", "drama"],
    ["THERE WILL BE BLOOD","drama"],
    ["12 ANGRY MEN",    "drama"],
    ["ONE FLEW OVER",   "drama"],
    ["CHINATOWN",       "crime"],
    ["TAXI DRIVER",     "crime"],
    ["APOCALYPSE NOW",  "epic"],
    ["CASABLANCA",      "romance"],
    ["CITIZEN KANE",    "drama"],
    ["BLADE RUNNER",    "thriller"],
  ],
  // ── Col 4 · Anime Series ─────────────────────────────────────────────────
  [
    ["ATTACK ON TITAN", "action"],
    ["DEATH NOTE",      "thriller"],
    ["FULLMETAL ALCH.", "epic"],
    ["DEMON SLAYER",    "action"],
    ["NARUTO",          "action"],
    ["ONE PIECE",       "epic"],
    ["DRAGON BALL Z",   "action"],
    ["HUNTER×HUNTER",   "epic"],
    ["JUJUTSU KAISEN",  "horror"],
    ["COWBOY BEBOP",    "thriller"],
    ["STEINS;GATE",     "thriller"],
    ["CODE GEASS",      "epic"],
    ["VINLAND SAGA",    "epic"],
    ["MOB PSYCHO 100",  "action"],
    ["MY HERO ACAD.",   "action"],
    ["SWORD ART ONLINE","epic"],
    ["TOKYO GHOUL",     "horror"],
    ["NEON GENESIS",    "drama"],
    ["BLEACH",          "action"],
    ["FAIRY TAIL",      "epic"],
  ],
  // ── Col 5 · Web Series ───────────────────────────────────────────────────
  [
    ["BREAKING BAD",    "crime"],
    ["GAME OF THRONES", "epic"],
    ["STRANGER THINGS", "horror"],
    ["MONEY HEIST",     "thriller"],
    ["DARK",            "thriller"],
    ["SQUID GAME",      "thriller"],
    ["SACRED GAMES",    "crime"],
    ["MIRZAPUR",        "crime"],
    ["THE CROWN",       "biopic"],
    ["OZARK",           "crime"],
    ["NARCOS",          "crime"],
    ["BETTER CALL SAUL","crime"],
    ["PEAKY BLINDERS",  "crime"],
    ["THE WIRE",        "crime"],
    ["BAND OF BROTHERS","epic"],
    ["CHERNOBYL",       "drama"],
    ["THE BOYS",        "action"],
    ["WEDNESDAY",       "horror"],
    ["HOUSE OF CARDS",  "thriller"],
    ["SUCCESSION",      "drama"],
  ],
  // ── Col 6 · Sitcoms ──────────────────────────────────────────────────────
  [
    ["FRIENDS",         "comedy"],
    ["THE OFFICE",      "comedy"],
    ["SEINFELD",        "comedy"],
    ["HOW I MET YOU",   "comedy"],
    ["BROOKLYN 99",     "comedy"],
    ["PARKS & REC",     "comedy"],
    ["BIG BANG THEORY", "comedy"],
    ["MODERN FAMILY",   "comedy"],
    ["NEW GIRL",        "comedy"],
    ["IT'S ALWAYS",     "comedy"],
    ["ARRESTED DEV.",   "comedy"],
    ["30 ROCK",         "comedy"],
    ["COMMUNITY",       "comedy"],
    ["SCRUBS",          "comedy"],
    ["FRASIER",         "comedy"],
    ["THAT 70S SHOW",   "comedy"],
    ["MALCOLM IN MID.", "comedy"],
    ["CURB YOUR ENT.",  "comedy"],
    ["WHAT WE DO",      "comedy"],
    ["ABBOTT ELEM.",    "comedy"],
  ],
];

const COLS = 7, ROWS = 9;

function LegendCell({ title, genre, idx }: { title: string; genre: keyof typeof G; idx: number }) {
  const [glitch, setGlitch] = useState(false);
  const [lit, setLit] = useState(false);
  const g = G[genre] || G.drama;
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const s = () => {
      ref.current = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => { setGlitch(false); s(); }, 140 + Math.random() * 190);
      }, 4000 + Math.random() * 13000 + idx * 22);
    };
    s();
    return () => clearTimeout(ref.current || undefined);
  }, [idx]);

  useEffect(() => {
    const h = () => {
      if (Math.random() > 0.52) return;
      setLit(true);
      setTimeout(() => setLit(false), 80 + Math.random() * 120);
    };
    window.addEventListener("ff", h);
    return () => window.removeEventListener("ff", h);
  }, []);

  const base = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: "clamp(11px, 1.55vw, 20px)",
    letterSpacing: "0.12em",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {lit && <div style={{ position: "absolute", inset: "-3px", background: `${g.glow}1a`, borderRadius: "3px", pointerEvents: "none" }} />}
      {glitch ? (
        <div style={{ position: "relative" }}>
          <div style={{ ...base, position: "absolute", top: 0, left: 0, color: `${g.gc}77`, transform: "translate(-3px,1px) skewX(-5deg)", clipPath: "inset(38% 0 35% 0)", pointerEvents: "none" }}>{title}</div>
          <div style={{ ...base, position: "absolute", top: 0, left: 0, color: "rgba(0,255,220,0.25)", transform: "translate(3px,-1px)", clipPath: "inset(8% 0 58% 0)", pointerEvents: "none" }}>{title}</div>
          <motion.div animate={{ textShadow: [`0 0 16px ${g.gc},0 0 36px ${g.gc}88`, `0 0 6px ${g.gc}`, `0 0 20px ${g.gc}`] }} transition={{ duration: 0.14, repeat: 2 }} style={{ ...base, color: g.gc }}>{title}</motion.div>
        </div>
      ) : (
        <motion.div animate={{ textShadow: [`0 0 6px ${g.glow}44`, `0 0 12px ${g.glow}77`, `0 0 6px ${g.glow}44`] }} transition={{ duration: 2.8 + (idx % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }} style={{ ...base, color: g.c }}>{title}</motion.div>
      )}
    </div>
  );
}

export function MovieGrid() {
  const gridData = useMemo(() => {
    return Array.from({ length: COLS }, (_, col) =>
      Array.from({ length: ROWS }, (_, row) => {
        const item = COL_DATA[col][row % COL_DATA[col].length];
        return { title: item[0], genre: item[1] as keyof typeof G, idx: col * ROWS + row };
      })
    );
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1, opacity: 0.65,
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      alignItems: "center", justifyItems: "center",
    }}>
      {Array.from({ length: COLS }, (_, colIdx) => (
        <motion.div key={colIdx}
          animate={{ y: colIdx % 2 === 0 ? [0, -120, 0] : [0, 120, 0] }}
          transition={{ duration: 28 + colIdx * 1.2, repeat: Infinity, ease: "linear" }}
          style={{
            gridColumn: colIdx + 1, gridRow: "1 / -1",
            display: "grid", gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            height: "100vh", width: "100%",
            alignItems: "center", justifyItems: "center",
          }}
        >
          {Array.from({ length: ROWS }, (_, rowIdx) => {
            const item = gridData[colIdx][rowIdx];
            return (
              <div key={rowIdx} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LegendCell title={item.title} genre={item.genre} idx={item.idx} />
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}