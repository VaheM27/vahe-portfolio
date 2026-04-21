"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ScrollProgress.module.scss";

// Estimated rendered car width at height:52px (image is ~2:1 ratio)
const CAR_W = 104;

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const [driving, setDriving] = useState(false);
  const [reversed, setReversed] = useState(false);
  const prevPct = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const newPct = total > 0 ? (scrolled / total) * 100 : 0;

      // Determine direction — only update if actually moving
      if (newPct !== prevPct.current) {
        setReversed(newPct < prevPct.current);
        prevPct.current = newPct;
      }

      setPct(newPct);
      setDriving(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDriving(false), 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Car left position: travels from 0 to (100% - CAR_W)
  const carLeft = `calc(${pct}% - ${(pct / 100) * CAR_W}px)`;

  return (
    <div className={styles.road}>
      {/* Road track */}
      <div className={styles.track}>
        {/* Dashed upcoming road */}
        <div className={styles.upcoming} />
        {/* Filled driven road */}
        <div className={styles.driven} style={{ width: `${pct}%` }} />
      </div>

      {/* Dust trail — behind car when going forward, ahead when reversed */}
      {driving && (
        <div
          className={`${styles.dust} ${reversed ? styles.dustReversed : ""}`}
          style={{
            left: reversed
              ? `calc(${pct}% - ${(pct / 100) * CAR_W}px + ${CAR_W + 4}px)`
              : `calc(${pct}% - ${(pct / 100) * CAR_W}px - 18px)`,
          }}
        />
      )}

      {/* The car */}
      <div
        className={`${styles.car} ${driving ? styles.driving : ""} ${reversed ? styles.reversed : ""}`}
        style={{ left: carLeft }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/car.png" alt="Jeep Compass" draggable={false} />
      </div>
    </div>
  );
}
