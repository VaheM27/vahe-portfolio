"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Loader.module.scss";

type Phase = "driving" | "stopped" | "exit" | "done";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("driving");
  // Lazy initializer runs only on the client, so window is available
  const [startX] = useState<number>(() =>
    typeof window !== "undefined" ? -window.innerWidth - 250 : -1800
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("stopped"), 1000); // car arrives
    const t2 = setTimeout(() => setPhase("exit"),    2200); // curtain begins
    const t3 = setTimeout(() => { setPhase("done"); onComplete(); }, 3100);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.bgDots} />

      {/* Road strip */}
      <div className={styles.roadStrip}>
        {/* dashed center line */}
        <div className={styles.centerLine} />
      </div>

      {/* Logo pops up above car once it stops — like the driver stepping out */}
      <AnimatePresence>
        {phase === "stopped" && (
          <motion.div
            className={styles.logoPopup}
            initial={{ opacity: 0, y: 50, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className={styles.glowBlob} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/og-image.png" alt="VM" className={styles.logoImg} />
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              vahe.dev — loading your experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Jeep */}
      <motion.div
        className={`${styles.carWrap} ${phase === "driving" ? styles.carDriving : ""}`}
        initial={{ x: startX }}
        animate={{ x: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brake-dust puff — appears right when car stops */}
        {phase === "stopped" && (
          <motion.div
            className={styles.brakeDust}
            initial={{ opacity: 0, scaleX: 0.1 }}
            animate={{ opacity: [0, 0.75, 0], scaleX: [0.1, 2, 3] }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/car.png" alt="Jeep Compass" draggable={false} className={styles.carImg} />
      </motion.div>

      {/* Curtain wipes up to reveal the site */}
      {phase === "exit" && (
        <motion.div
          className={styles.curtain}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
