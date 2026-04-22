"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      {/* Dot grid */}
      <div className={styles.bgDots} />

      <div className={styles.content}>

        {/* Terminal-style error badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.dot} />
          ERROR 404
        </motion.div>

        {/* Big 404 */}
        <motion.h1
          className={styles.code}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          404
        </motion.h1>

        {/* Terminal block */}
        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.termHeader}>
            <span className={styles.termDot} style={{ background: "#ff5f57" }} />
            <span className={styles.termDot} style={{ background: "#febc2e" }} />
            <span className={styles.termDot} style={{ background: "#28c840" }} />
            <span className={styles.termTitle}>vahemn.dev — bash</span>
          </div>
          <div className={styles.termBody}>
            <p><span className={styles.prompt}>$</span> <span className={styles.cmd}>navigate to {typeof window !== "undefined" ? window.location.pathname : "/unknown"}</span></p>
            <p className={styles.err}>bash: page not found: No such route exists</p>
            <p><span className={styles.prompt}>$</span> <span className={styles.cursor} /></p>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          className={styles.message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Looks like you took a wrong turn. Let&apos;s get you back on the road.
        </motion.p>

        {/* Car driving across */}
        <motion.div
          className={styles.carWrap}
          initial={{ x: "-20vw", opacity: 0 }}
          animate={{ x: "0vw", opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.road} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/car.png" alt="Jeep Compass" className={styles.car} draggable={false} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link href="/" className={styles.btn}>
            ← Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
