"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SecondSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10%",
        position: "relative",
        zIndex: 50,
        background: "transparent",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            title: "ABOUT CINEQUEST",
            text: `CINEQUEST is a dynamic and immersive pop culture quiz event designed for fans of movies, anime, and web series.

It challenges participants to explore fictional universes and test their knowledge across characters, storylines, hidden details, and iconic cinematic moments.

This is not just about memory—it’s about observation, attention to detail, and true fandom depth.`,
          },
          {
            title: "RULES & FORMAT",
            text: `• Team of 2–4 members
• Multiple elimination rounds
• No mobile phones or external help
• Time-bound answers
• Points decide elimination

Rounds include:
• Guess characters, scenes, dialogues
• Identify clips/images
• Spot inconsistencies`,
          },
          {
            title: "EVENT DETAILS",
            text: `📅 Date: 5 April 2026
💰 Entry Fee: ₹299 per team
🏆 Prize Pool: Up to ₹10,000

Round-wise eliminations leading to final winners announcement.`,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
            style={{
              flex: 1,
              padding: "40px",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              boxShadow: "0 0 40px rgba(255,0,50,0.15)",
            }}
          >
            <h1
              style={{
                fontSize: "28px",
                marginBottom: "20px",
                color: "#ff2a2a",
              }}
            >
              {item.title}
            </h1>

            <p
              style={{
                lineHeight: "1.8",
                whiteSpace: "pre-line",
              }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
