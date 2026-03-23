"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const rules = [
  "This is a solo event. Each participant must complete all phases independently. Collaboration or team participation is not allowed.",
  "All progress must be made using the same registered email ID and username. Any mismatch may lead to disqualification.",
  "Every solution is designed to be derived logically. Random guessing, brute force, or trial-and-error approaches will not work.",
  "Each clue is part of a larger structure. Do not treat them as isolated problems — patterns and connections matter.",
  "Participants must rely only on their own reasoning. Sharing answers, using others’ solutions, or seeking outside help is strictly prohibited.",
  "Not all instructions will be given. Progress depends on your ability to observe, interpret, and adapt as you move deeper into the spiral.",
];

export default function RulesSection() {
  const [orbitRadius, setOrbitRadius] = useState(220);

  const toPx = (value: number) => `${value.toFixed(3)}px`;

  useEffect(() => {
    const updateRadius = () => {
      const maxSize = Math.min(window.innerWidth, 980);
      setOrbitRadius(Math.max(180, Math.min(280, maxSize * 0.38)));
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section id="rules" className="event-section rules-section">
      <div className="section-container text-center">
        <div data-animate="stagger">
          <p className="section-kicker">002 / Rules</p>
          <h2 className="section-title">Rings of behavior</h2>
        </div>

        <div className="rules-orbit" data-animate="stagger">
          {rules.map((rule, index) => {
            const angle = (index / rules.length) * Math.PI * 2;
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;

            return (
              <article
                className="rule-card"
                key={rule}
                style={{ "--x": toPx(x), "--y": toPx(y) } as CSSProperties}
              >
                <p>{rule}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}