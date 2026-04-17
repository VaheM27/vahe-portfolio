"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.scss";

const SLATS = 7;

const STATUS = [
  "Initializing...",
  "Loading components...",
  "Rendering visuals...",
  "Almost ready...",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(22), 250),
      setTimeout(() => setProgress(50), 650),
      setTimeout(() => setProgress(78), 1050),
      setTimeout(() => setProgress(100), 1420),
      setTimeout(() => setPhase("exit"), 1780),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2850),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  const statusIdx = Math.floor((progress / 100) * (STATUS.length - 1));

  return (
    <div className={styles.overlay}>
      <div className={styles.bgDots} />

      {/* ── Center content ── */}
      <motion.div
        className={styles.content}
        animate={{ opacity: phase === "exit" ? 0 : 1, y: phase === "exit" ? -18 : 0 }}
        transition={{ duration: 0.32, ease: "easeIn" }}
      >
        {/* Rings + logo */}
        <div className={styles.logoWrap}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
          <span className={styles.orbitDot} />
          <div className={styles.logo}>
            <span className={styles.bracket}>&lt;</span>
            <span className={styles.logName}>VM</span>
            <span className={styles.bracket}>/&gt;</span>
          </div>
        </div>

        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.barTrack}>
            <motion.div
              className={styles.barFill}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            />
          </div>
          <div className={styles.metaRow}>
            <motion.span
              key={statusIdx}
              className={styles.statusText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {STATUS[statusIdx]}
            </motion.span>
            <span className={styles.pct}>{progress}%</span>
          </div>
        </div>
      </motion.div>

      {/* ── Exit slats ── */}
      {phase === "exit" &&
        Array.from({ length: SLATS }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.slat}
            style={{
              top: `${(i / SLATS) * 100}%`,
              height: `${100 / SLATS + 0.3}%`,
            }}
            initial={{ x: 0 }}
            animate={{ x: "110vw" }}
            transition={{
              duration: 0.7,
              delay: i * 0.075,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
    </div>
  );
}
