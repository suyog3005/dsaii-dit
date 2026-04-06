"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section id="home" className="event-section hero-section">
      <div className="section-container hero-content">
        <motion.p
          className="hero-brand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          VOID EVENT 2026
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          THE SPIRAL
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
        >
          Progress is not a straight line
        </motion.p>

        <motion.div
          className="hero-register-wrap"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        >
          <button
            type="button"
            className="hero-register-btn"
            onClick={() => router.push("/reg-closed")}
          >
            Register Now
          </button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span>Scroll</span>
        </motion.div>
        </div>
    </section>
  );
}