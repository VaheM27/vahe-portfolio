"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./DarkModeToggle.module.scss";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("portfolio-dark") === "1";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("portfolio-dark", dark ? "1" : "0");
  }, [dark]);

  return (
    <button
      className={styles.toggle}
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className={styles.icon}
      >
        {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
      </motion.span>
    </button>
  );
}
