"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Audiowide, Chakra_Petch, Space_Mono } from "next/font/google";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"], variable: "--font-head" });
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

type Highlight = {
  icon: string;
  title: string;
  text: string;
};

type TimelineItem = {
  step: string;
  phase: string;
  name: string;
  date: string;
};

type EventSignal = {
  icon: string;
  value: string;
  label: string;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

type SignalCardStyle = CSSProperties & {
  "--signal-delay": string;
};

const highlights: Highlight[] = [
  {
    icon: "🤖",
    title: "AI-Powered Creation",
    text: "Build short-form videos with text-to-video, image generation, voice synthesis, and editing tools.",
  },
  {
    icon: "⚙️",
    title: "Tool Freedom",
    text: "Teams may use any AI platform of their choice; no tools or resources are provided by organizers.",
  },
  {
    icon: "🎭",
    title: "Story-First Thinking",
    text: "Transform a given theme or prompt into meaningful, engaging, and concept-driven visual storytelling.",
  },
  {
    icon: "🏆",
    title: "Big Prize Pool",
    text: "Compete for prizes up to ₹6,000 by showcasing originality, relevance, and strong execution.",
  },
];

const timeline: TimelineItem[] = [
  { step: "01", phase: "Event Day", name: "CONTENTFLUX Challenge (Offline)", date: "3 April 2026" },
];

const rules: string[] = [
  "Each team must consist of exactly 2 members.",
  "The event will be conducted in offline mode only.",
  "Content must be created only within the event timeframe.",
  "Participants may use any AI tools of their choice.",
  "No AI tools or resources will be provided by the organizers.",
  "All submitted content must be original and not pre-created.",
  "Teams must strictly follow the assigned theme/prompt.",
  "Any plagiarism or reuse of existing content will result in disqualification.",
  "No copyrighted or inappropriate content is allowed.",
  "Judges' decisions are final.",
];

const modalList: string[] = [
  "Event: CONTENTFLUX - AI Video Generation Challenge",
  "Team size: 2 members only",
  "Mode: Offline",
  "Date: 3 April 2026",
  "Entry fee: ₹149 per team",
  "Submission: Final video only",
  "Prize pool: Up to ₹6,000",
];

const eventSignals: EventSignal[] = [
  { icon: "👥", value: "2 Members", label: "Per Team" },
  { icon: "📍", value: "Offline", label: "Mode" },
  { icon: "🎟", value: "₹149", label: "Entry Fee" },
  { icon: "🏆", value: "₹6,000", label: "Prize Pool" },
];

const REGISTER_URL = "/reg-closed";

export default function ContentfluxPage() {
  const [showModal, setShowModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const heroOpacity = useMemo(() => Math.max(0, 1 - scrollY / 650), [scrollY]);
  const videoScale = useMemo(() => 1 + scrollY / 2200, [scrollY]);
  const videoBlur = useMemo(() => scrollY / 90, [scrollY]);

  return (
    <div
      ref={rootRef}
      className={`${audiowide.variable} ${chakraPetch.variable} ${mono.variable} contentflux-root`}
    >
      <div className="tech-bg" aria-hidden="true">
        <div className="tech-orb tech-orb--a" />
        <div className="tech-orb tech-orb--b" />
        <div className="tech-orb tech-orb--c" />
        <div className="tech-ring tech-ring--one" />
        <div className="tech-ring tech-ring--two" />
        <div className="tech-beam" />
      </div>

      <div className="scanlines" aria-hidden="true" />

      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-screen transition-all duration-300"
        style={{ transform: `scale(${videoScale})`, filter: `blur(${videoBlur}px)` }}
      >
        <source src="/videos/v3-opt.mp4" type="video/mp4" />
      </video>

      <section
        className="reveal-section is-visible relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-14 text-center sm:px-6 sm:py-16"
        data-reveal
        style={{ opacity: heroOpacity }}
      >
        <div className="pointer-events-none absolute left-4 top-4 h-14 w-14 border-l-2 border-t-2 border-cyan/60 sm:left-8 sm:top-8 sm:h-20 sm:w-20" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-14 w-14 border-b-2 border-r-2 border-cyan/60 sm:bottom-8 sm:right-8 sm:h-20 sm:w-20" />

        <p className="font-mono mb-5 text-xs uppercase tracking-[0.3em] text-pink">// DSAII Presents</p>

        <h1 className="font-head neon-title text-[2.45rem] font-black uppercase leading-[1.03] tracking-[0.02em] text-white sm:text-7xl sm:tracking-[0.06em] lg:text-8xl">
          <span className="glitch" data-text="CONTENTFLUX">
            CONTENTFLUX
          </span>
          <br />
          <span className="text-pink drop-shadow-[0_0_12px_#ff007a]">AI VIDEO</span>
          <br />
          <span className="text-cyan drop-shadow-[0_0_12px_#00fff7]">CHALLENGE</span>
        </h1>

        <p className="mt-5 max-w-2xl px-1 text-[1rem] leading-8 text-slate-300/70 sm:mt-6 sm:px-0 sm:text-lg">
          CONTENTFLUX is a creative AI-powered competition where teams transform ideas into visually compelling short videos from given themes and prompts.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
          <button
            className="font-head btn-tech rounded-sm bg-cyan px-8 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#040408] transition hover:scale-105 hover:bg-white hover:shadow-cyan"
            onClick={() => window.location.href = REGISTER_URL}
          >
            Register Now
          </button>
         
        </div>

        <div className="signal-grid mt-12 w-full max-w-5xl sm:mt-14">
          {eventSignals.map((signal, index) => (
            <article
              key={signal.label}
              className="signal-card"
              style={{ "--signal-delay": `${index * 90}ms` } as SignalCardStyle}
            >
              <div className="signal-icon" aria-hidden="true">{signal.icon}</div>
              <div>
                <p className="signal-value font-head">{signal.value}</p>
                <p className="signal-label font-mono">{signal.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan to-transparent opacity-30" />

        <section className="reveal-section grid gap-12 py-20 md:grid-cols-2 md:items-center" data-reveal style={{ "--reveal-delay": "50ms" } as RevealStyle}>
          <div>
            <p className="font-mono mb-3 text-xs uppercase tracking-[0.2em] text-cyan">// About the Event</p>
            <h2 className="font-head text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
              CREATE IMPACTFUL <span className="text-cyan">AI CONTENT</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300/70">
              Teams will receive a theme or problem statement and produce original short-form video content using modern AI tools.
              Entries can include storytelling videos, marketing-style edits, cinematic outputs, or concept-driven visual ideas.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300/70">
              The goal is to blend technology with creativity and demonstrate how effectively AI can be used for meaningful content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {[
              ["2", "Members per Team"],
              ["Offline", "Mode Only"],
              ["Any", "AI Tools Allowed"],
              ["₹6,000", "Prize Pool Up To"],
            ].map(([num, label]) => (
              <div key={label} className="neon-panel stat-card px-6 py-8 text-center transition hover:-translate-y-1 hover:border-cyan">
                <div className="font-head text-4xl font-black text-cyan drop-shadow-[0_0_12px_#00fff7]">{num}</div>
                <div className="font-mono mt-2 text-xs uppercase tracking-[0.12em] text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan to-transparent opacity-30" />

        <section className="reveal-section py-20" data-reveal style={{ "--reveal-delay": "90ms" } as RevealStyle}>
          <p className="font-mono mb-3 text-xs uppercase tracking-[0.2em] text-cyan">// Core Pillars</p>
          <h2 className="font-head text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
            EVENT <span className="text-cyan">HIGHLIGHTS</span>
          </h2>

          <div className="mt-12 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((card) => (
              <article
                key={card.title}
                className="neon-panel feature-card group px-7 py-9 transition hover:-translate-y-1 hover:border-cyan hover:bg-cyan/10"
              >
                <div className="text-4xl">{card.icon}</div>
                <h3 className="font-head mt-5 text-sm font-bold uppercase tracking-[0.08em] text-cyan">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-300/70">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan to-transparent opacity-30" />

        <section className="reveal-section py-20" data-reveal style={{ "--reveal-delay": "120ms" } as RevealStyle}>
          <p className="font-mono mb-3 text-xs uppercase tracking-[0.2em] text-cyan">// Event Schedule</p>
          <h2 className="font-head text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
            EVENT <span className="text-cyan">SCHEDULE</span>
          </h2>

          <div className="mx-auto mt-14 grid max-w-md gap-8 sm:grid-cols-1 lg:grid-cols-1">
            {timeline.map((item) => (
              <div key={item.step} className="text-center">
                <div className="font-head mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan text-sm font-black text-cyan shadow-cyan transition hover:bg-cyan hover:text-bg">
                  {item.step}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">{item.phase}</div>
                <div className="font-head mt-2 text-sm font-bold uppercase tracking-[0.06em] text-white">{item.name}</div>
                <div className="font-mono mt-2 text-sm text-cyan">{item.date}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan to-transparent opacity-30" />

        <section className="reveal-section py-20" data-reveal style={{ "--reveal-delay": "150ms" } as RevealStyle}>
          <p className="font-mono mb-3 text-xs uppercase tracking-[0.2em] text-cyan">// Reward Matrix</p>
          <h2 className="font-head text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
            PRIZE <span className="text-cyan">POOL</span>
          </h2>

          <div className="mx-auto mt-12 max-w-3xl">
            <article className="neon-panel jackpot-card px-6 py-12 text-center">
              <div className="text-5xl">🏆</div>
              <h3 className="font-head mt-5 text-base font-extrabold uppercase tracking-[0.12em] text-yellow">Total Prize Pool</h3>
              <p className="font-head mt-4 text-5xl font-black text-white">Up to ₹6,000</p>
              <p className="font-mono mt-3 text-xs uppercase tracking-[0.12em] text-slate-400">Final category-wise distribution will be announced on event day</p>
            </article>
          </div>
        </section>

        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan to-transparent opacity-30" />

        <section className="reveal-section py-20" data-reveal style={{ "--reveal-delay": "180ms" } as RevealStyle}>
          <p className="font-mono mb-3 text-xs uppercase tracking-[0.2em] text-cyan">// Compliance Protocol</p>
          <h2 className="font-head text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
            COMPETITION <span className="text-cyan">RULES</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-300/70">Submission format: Only the final video needs to be submitted.</p>

          <div className="neon-panel relative mt-12 p-8 sm:p-12">
            <span className="font-mono absolute -top-3 left-6 bg-bg px-2 text-xs uppercase tracking-[0.2em] text-cyan">//RULES</span>
            <ul className="space-y-5">
              {rules.map((rule, index) => (
                <li key={rule} className="flex gap-4 text-base leading-7 text-slate-300/80">
                  <span className="font-mono mt-1 border border-pink/40 bg-pink/10 px-2 py-0.5 text-xs text-pink">
                    R{String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

    

      <footer className="reveal-section relative z-10 border-t border-white/10 px-6 py-10 text-center" data-reveal style={{ "--reveal-delay": "80ms" } as RevealStyle}>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-500">CONTENTFLUX OFFICIAL</p>
        <p className="font-mono mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">
          AI Video Generation Challenge - Offline Event - 3 April 2026
        </p>
      </footer>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040408]/85 p-4 backdrop-blur-md"
          onClick={(event: ReactMouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) setShowModal(false);
          }}
        >
          <div className="relative w-full max-w-2xl border border-cyan bg-bg2 p-8 shadow-cyan sm:p-12">
            <button
              className="font-mono absolute right-5 top-4 text-xl text-slate-500 transition hover:text-pink"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <p className="font-mono mb-5 text-xs uppercase tracking-[0.2em] text-cyan">//EVENT_DETAILS.EXE</p>
            <h3 className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">Event Quick Info</h3>
            <ul className="mt-6 space-y-3">
              {modalList.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-slate-300/80">
                  <span className="text-cyan">{">"}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
