"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.scss";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    let dotX = 0,
      dotY = 0;
    let ringX = 0,
      ringY = 0;
    let raf: number;

    const moveDot = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!visible) setVisible(true);
    };

    const loop = () => {
      // Ring lags behind dot with lerp
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-hover]")) {
        setHovering(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-hover]")) {
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnterDoc = () => setVisible(true);

    document.addEventListener("mousemove", moveDot);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDoc);

    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", moveDot);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDoc);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${clicking ? styles.clicking : ""} ${hovering ? styles.hoveringDot : ""} ${visible ? styles.visible : ""}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${clicking ? styles.clickingRing : ""} ${hovering ? styles.hoveringRing : ""} ${visible ? styles.visible : ""}`}
      />
    </>
  );
}
