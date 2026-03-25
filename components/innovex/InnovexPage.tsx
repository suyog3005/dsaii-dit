"use client";

import { useState, useEffect } from "react";
import {
  Code,
  Users,
  Trophy,
  Calendar,
  Clock,
  Zap,
  Sparkles,
  Shield,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const REGISTER_URL = "https://engg.dypvp.edu.in/dsaii-registrations.aspx";

export default function InnovexPage() {
  const [codeFragments, setCodeFragments] = useState<
    Array<{
      left: string;
      animationDelay: string;
      animationDuration: string;
      x: number;
      y: number;
    }>
  >([]);

  // Generate random particles
  useEffect(() => {
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle: any) => {
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    });

    // Generate code-rain values after mount to avoid SSR hydration mismatch.
    setCodeFragments(
      Array.from({ length: 10 }, (_, i) => ({
        left: `${i * 10}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
        x: Math.floor(Math.random() * 999),
        y: Math.floor(Math.random() * 999),
      })),
    );
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Cyberpunk Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950"></div>

        {/* City skyline background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1688377051459-aebb99b42bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwbmVvbiUyMGxpZ2h0cyUyMG5pZ2h0fGVufDF8fHx8MTc3MzY4MDY4OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cyberpunk City"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-70"></div>

        {/* Circuit pattern */}
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>

        {/* Scanning line */}
        <div className="scanline"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}

        {/* Code rain effect */}
        {codeFragments.map((fragment, i) => (
          <div
            key={`code-${i}`}
            className="code-fragment"
            style={{
              left: fragment.left,
              animationDelay: fragment.animationDelay,
              animationDuration: fragment.animationDuration,
            }}
          >
            {`{x: ${fragment.x}, y: ${fragment.y}}`}
          </div>
        ))}

        {/* Gradient orbs for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Asymmetric Layout */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto">
              {/* Content */}
              <div className="lg:pl-12">
                {/* Tech corner decorations */}
                <div className="relative inline-block mb-8">
                  <div className="tech-corner tech-corner-tl opacity-50"></div>
                  <div className="tech-corner tech-corner-br opacity-50"></div>
                  <span
                    className="text-6xl md:text-8xl font-light text-cyan-300 tracking-[0.3em] px-8 py-4 neon-text"
                    style={{ fontFamily: "serif" }}
                  >
                    未来
                  </span>
                </div>

                <div className="space-y-6">
                  <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
                    <span className="block">INNOVEX</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 mt-2 text-4xl md:text-5xl">
                      Innovation in Action
                    </span>
                  </h1>

                  <div className="relative pl-6 border-l-2 border-cyan-400/50">
                    <p className="text-xl md:text-2xl text-slate-300 font-light">
                      Solve Real-World Challenges.{" "}
                      <span className="text-cyan-300">
                        Build Practical Solutions.
                      </span>{" "}
                      <span className="text-violet-300">
                        Transform Campus & Workplace.
                      </span>
                    </p>
                  </div>

                  {/* Info Pills - Staggered */}
                  <div className="flex flex-wrap gap-4 pt-8">
                    <div className="glass-panel px-6 py-3 rounded-lg hover-glow flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-300" />
                      <span className="text-white font-mono">
                        4 APR, 2026
                      </span>
                    </div>

                    <div className="glass-panel px-6 py-3 rounded-lg hover-glow flex items-center gap-3 mt-6">
                      <Clock className="w-5 h-5 text-violet-300" />
                      <span className="text-white font-mono">
                        6 HOURS
                      </span>
                    </div>

                    <div className="glass-panel px-6 py-3 rounded-lg hover-glow flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-fuchsia-300" />
                      <span className="text-white font-mono">
                        ₹35K PRIZE
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 pt-8">
                    <Button
                      type="button"
                      size="lg"
                      onClick={() => window.open(REGISTER_URL, "_blank", "noopener,noreferrer")}
                      className="relative bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white px-8 py-6 text-lg font-bold border-0 hover-glow group overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        REGISTER NOW
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="glass-panel border-cyan-400/50 text-cyan-300 hover:bg-cyan-950/30 px-8 py-6 text-lg font-bold"
                      onClick={() =>
                        document
                          .getElementById("info")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          })
                      }
                    >
                      LEARN MORE
                    </Button>
                  </div>

                  {/* Terminal-style status */}
                  <div className="terminal-input rounded-lg mt-8 font-mono text-sm text-green-400">
                    <span className="text-cyan-300">{">"}</span>{" "}
                    STATUS:{" "}
                    <span className="text-violet-300">
                      REGISTRATION OPEN
                    </span>{" "}
                    | SLOTS:{" "}
                    <span className="text-fuchsia-300">
                      LIMITED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 -left-12 w-24 h-24 border-2 border-cyan-500/20 rotate-45"></div>
          <div className="absolute bottom-1/4 -right-12 w-32 h-32 border-2 border-violet-500/20 rounded-full"></div>
        </section>

        {/* Themes/Tracks Section - Asymmetric Grid */}
        <section id="info" className="py-32 relative">
          <div className="container mx-auto px-4">
            {/* Event Description */}
            <div className="max-w-5xl mx-auto mb-32">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                <span className="text-cyan-300 font-mono text-sm tracking-wider">
                  EVENT_DESCRIPTION
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
                  INNOVEX
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-300">
                <p className="leading-relaxed">
                  INNOVEX is a high-intensity hackathon focused on solving real-world challenges within college campuses and workplace environments. Participants will identify and tackle issues faced by students, faculty, administration, or employees—ranging from academic workflows to inefficiencies in campus and corporate work culture—and build practical, tech-driven solutions.
                </p>

                <div className="holographic-card rounded-2xl p-8 my-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-violet-300" />
                    Problem Domains
                  </h3>
                  <p className="text-slate-300 mb-4">The hackathon revolves around problem statements inspired by real campus and workplace scenarios, such as:</p>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Inefficient attendance and academic tracking systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Communication gaps between students, faculty, and administration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Event and resource management within campuses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Productivity and workflow challenges in workplace environments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Campus navigation, hostel/mess management, and daily student life issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Digital solutions for improving collaboration, scheduling, and task management</span>
                    </li>
                  </ul>
                </div>

                <p className="leading-relaxed">
                  Participants can either choose from provided problem statements or identify their own relevant problem within campus or workplace ecosystems, ensuring the solution is meaningful and implementable.
                </p>

                <p className="leading-relaxed">
                  Teams will move from ideation to execution within a 6-hour time frame, developing working prototypes that are scalable, impactful, and user-focused. The goal is not just innovation, but relevance—solutions that could realistically be implemented in real environments.
                </p>
              </div>
            </div>

            {/* Rules & Guidelines */}
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"></div>
                <span className="text-violet-300 font-mono text-sm tracking-wider">
                  RULES_AND_GUIDELINES
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-12">
                Rules &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                  Guidelines
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Team Formation */}
                <div className="holographic-card rounded-2xl p-6 hover-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-cyan-300" />
                    <h3 className="text-xl font-bold text-white">Team Formation</h3>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Each team must consist of 2–4 members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-300 mt-1">▹</span>
                      <span>Teams can include participants from different colleges and branches</span>
                    </li>
                  </ul>
                </div>

                {/* General Rules */}
                <div className="holographic-card rounded-2xl p-6 hover-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-violet-300" />
                    <h3 className="text-xl font-bold text-white">General Rules</h3>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 mt-1">▹</span>
                      <span>All solutions must be original and developed during the hackathon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 mt-1">▹</span>
                      <span>AI tools are allowed based on participant preference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 mt-1">▹</span>
                      <span>Pre-built templates/tools are allowed, but core logic must be developed during the event</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 mt-1">▹</span>
                      <span>Solutions must focus on campus or workplace-related problems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-300 mt-1">▹</span>
                      <span>Evaluation will be feature-focused, prioritizing functionality and usability</span>
                    </li>
                  </ul>
                </div>

                {/* Submission Requirements */}
                <div className="holographic-card rounded-2xl p-6 hover-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-6 h-6 text-fuchsia-300" />
                    <h3 className="text-xl font-bold text-white">Submission Requirements</h3>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-300 mt-1">▹</span>
                      <span>Working prototype (web/app/model)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-300 mt-1">▹</span>
                      <span>Source code (GitHub repository or ZIP file)</span>
                    </li>
                  </ul>
                </div>

                {/* Judging Criteria */}
                <div className="holographic-card rounded-2xl p-6 hover-glow">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Judging Criteria</h3>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Problem relevance (campus/workplace impact)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Innovation & creativity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Technical implementation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Feasibility & scalability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">▹</span>
                      <span>Presentation & clarity</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Code of Conduct */}
              <div className="holographic-card rounded-2xl p-8 mt-6 hover-glow">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-cyan-300" />
                  <h3 className="text-2xl font-bold text-white">Code of Conduct</h3>
                </div>
                <ul className="space-y-3 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-300 mt-1">▹</span>
                    <span>No plagiarism or copying (instant disqualification)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-300 mt-1">▹</span>
                    <span>Maintain discipline and fair play</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-300 mt-1">▹</span>
                    <span>Judges' decisions will be final</span>
                  </li>
                </ul>
                <p className="text-slate-400 mt-4 italic">(Detailed Rule Book will be provided shortly)</p>
              </div>

              {/* Entry Fee & Prize Pool */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="holographic-card rounded-2xl p-8 hover-glow text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4">
                    <span className="text-3xl">💳</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Entry Fee</h3>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    ₹399
                  </p>
                  <p className="text-slate-400 mt-2">per team</p>
                </div>

                <div className="holographic-card rounded-2xl p-8 hover-glow text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-lg mb-4">
                    <Trophy className="w-8 h-8 text-violet-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Prize Pool</h3>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                    ₹35,000
                  </p>
                  <p className="text-slate-400 mt-2">up to</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Timeline - Vertical Flow */}
        <section className="py-32 relative bg-gradient-to-b from-transparent via-slate-950/50 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent"></div>
                  <span className="text-violet-300 font-mono text-sm tracking-wider">
                    TIMELINE
                  </span>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"></div>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  Event{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                    Schedule
                  </span>
                </h2>
                <p className="text-xl text-slate-400">
                  4th April 2026 - From 10 AM to 6 PM
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Central line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-violet-400/50 to-fuchsia-400/50"></div>

                {/* Timeline Items - Alternating */}
                <div className="space-y-12">
                  {[
                    {
                      time: "10:00 AM",
                      title: "Hackathon Begins",
                      desc: "Opening ceremony, team registration, and kickoff",
                      position: "left",
                      color: "cyan",
                    },
                    {
                      time: "10:00 AM – 4:00 PM",
                      title: "Development Phase",
                      desc: "6-hour intensive coding session. Build your prototypes! Lunch will be provided.",
                      position: "right",
                      color: "violet",
                    },
                    {
                      time: "4:00 PM – 6:00 PM",
                      title: "Presentations & Judging",
                      desc: "Teams present their solutions and judges evaluate the projects",
                      position: "left",
                      color: "fuchsia",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex ${item.position === "right" ? "md:flex-row-reverse" : "flex-row"} items-center gap-8`}
                    >
                      {/* Time badge */}
                      <div className="flex-shrink-0 w-20 md:w-1/2 md:text-right md:pr-12">
                        <div
                          className={`inline-block glass-panel px-4 py-2 rounded-lg border border-${item.color}-500/30`}
                        >
                          <Clock
                            className={`w-4 h-4 text-${item.color}-400 inline mr-2`}
                          />
                          <span
                            className={`text-${item.color}-400 font-mono font-bold`}
                          >
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Central dot */}
                      <div
                        className={`absolute left-8 md:left-1/2 w-4 h-4 bg-${item.color}-500 rounded-full border-4 border-black transform -translate-x-1/2 z-10 shadow-lg shadow-${item.color}-500/50`}
                      ></div>

                      {/* Content */}
                      <div className="flex-1 pl-16 md:pl-0 md:w-1/2 md:pr-12">
                        <div className="holographic-card rounded-lg p-6 hover-glow">
                          <h4 className="text-xl font-bold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Cyberpunk Style */}
        {/* <footer className="relative border-t border-slate-800 py-16 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-4xl font-light text-red-400"
                    style={{ fontFamily: "serif" }}
                  >
                    未来
                  </span>
                  <span className="text-2xl font-bold text-white">
                    INNOVEX
                  </span>
                </div>
                <p className="text-slate-400 font-mono text-sm">
                  Innovation in Action - Transforming Ideas
                </p>
              </div>

              <div>
                <h4 className="text-white font-mono mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  CONTACT
                </h4>
                <div className="space-y-2 text-slate-400 text-sm font-mono">
                  <p>{">"} info@innovex.com</p>
                  <p>{">"} +91 98765 43210</p>
                  <p>{">"} Tech Innovation Hub</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-mono mb-4">
                  CONNECT
                </h4>
                <div className="flex gap-3">
                  <div className="glass-panel px-4 py-2 rounded-lg text-blue-400 hover-glow cursor-pointer font-mono text-sm">
                    Twitter
                  </div>
                  <div className="glass-panel px-4 py-2 rounded-lg text-purple-400 hover-glow cursor-pointer font-mono text-sm">
                    Discord
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 text-center">
              <p className="text-slate-500 font-mono text-sm">
                © 2026 INNOVEX | ALL RIGHTS RESERVED |
                BUILT FOR THE FUTURE
              </p>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}