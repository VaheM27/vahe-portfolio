"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Loader.module.scss";

const LINES = [
  { text: "initializing runtime...",   done: "> npm run dev" },
  { text: "loading components...",     done: "> components loaded ✓" },
  { text: "rendering visuals...",      done: "> visuals ready ✓" },
  { text: "launching portfolio...",    done: "> launching... ✓" },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const timers = [
      setTimeout(() => { setProgress(26); setLineIdx(1); }, 320),
      setTimeout(() => { setProgress(54); setLineIdx(2); }, 750),
      setTimeout(() => { setProgress(83); setLineIdx(3); }, 1150),
      setTimeout(() => setProgress(100),                    1500),
      setTimeout(() => setPhase("exit"),                    1820),
      setTimeout(() => { setPhase("done"); onComplete(); }, 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.bgDots} />

      {/* Big ghost percentage — decorative bg number */}
      <div className={styles.ghostPct} aria-hidden>
        {progress}
      </div>

      <motion.div
        className={styles.content}
        animate={{
          opacity: phase === "exit" ? 0 : 1,
          y:       phase === "exit" ? -28 : 0,
          scale:   phase === "exit" ? 0.96 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        {/* ── Logo ── */}
        <motion.div
          className={styles.logoWrap}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.46, 0.64, 1] }}
        >
          <div className={styles.glowBlob} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/og-image.png" alt="VM" className={styles.logoImg} />
        </motion.div>

        {/* ── Terminal lines ── */}
        <div className={styles.terminal}>
          <div className={styles.termHeader}>
            <span className={styles.termDot} style={{ background: "#ff5f57" }} />
            <span className={styles.termDot} style={{ background: "#febc2e" }} />
            <span className={styles.termDot} style={{ background: "#28c840" }} />
            <span className={styles.termTitle}>vm — portfolio</span>
          </div>
          <div className={styles.termBody}>
            <AnimatePresence>
              {LINES.slice(0, lineIdx + 1).map((line, i) => (
                <motion.div
                  key={i}
                  className={styles.termLine}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className={styles.prompt}>$</span>
                  <span className={i < lineIdx ? styles.lineDone : styles.lineActive}>
                    {i < lineIdx ? line.done : line.text}
                  </span>
                  {i === lineIdx && <span className={styles.cursor} />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className={styles.progressWrap}>
          <div className={styles.barTrack}>
            <motion.div
              className={styles.barFill}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          <div className={styles.metaRow}>
            <span className={styles.statusLabel}>
              {progress < 100 ? LINES[lineIdx]?.text : "Ready."}
            </span>
            <span className={styles.pct}>{progress}%</span>
          </div>
        </div>
      </motion.div>

      {/* ── Exit: curtain wipe up ── */}
      {phase === "exit" && (
        <motion.div
          className={styles.curtain}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
