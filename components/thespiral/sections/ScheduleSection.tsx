"use client";

import { motion } from "framer-motion";

const timeline = [
  { time: "08:00", label: "Day 1 — Entry & Phase 1", detail: "Participants receive initial clues,Begin Website Discovery phase" },
  { time: "19:10", label: "Day 2 — Phase 2 Unlock", detail: "Begin Instagram Discovery phase,Focus shifts to deeper reasoning and connection" },
  { time: "20:40", label: "Day 3 — Final Phase & Submission", detail: "Phase 3 begins (Campus-based clues),Participants collect and organize final answers,Final submission via email" },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="event-section schedule-section">
      <div className="section-container section-narrow">
        <div data-animate="stagger">
          <p className="section-kicker">003 / Timeline</p>
          <h2 className="section-title">Night sequence</h2>
        </div>

        <div className="timeline-track" data-animate="stagger">
          {timeline.map((item, index) => (
            <motion.div
              className="timeline-item"
              key={item.time}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <p className="timeline-time">{item.time}</p>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}