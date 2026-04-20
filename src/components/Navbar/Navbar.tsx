"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import styles from "./Navbar.module.scss";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map((l) => document.querySelector(l.href));
      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) setActive(`#${sec.id}`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.bracket}>&lt;</span>
          <span className={styles.logoName}>VM</span>
          <span className={styles.bracket}>/&gt;</span>
        </a>

        <nav className={styles.nav}>
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`${styles.link} ${active === link.href ? styles.active : ""}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
            >
              <span className={styles.linkNum}>0{i + 1}.</span>
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="/resume.pdf"
            className={styles.resumeBtn}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Resume
          </motion.a>
        </nav>

        <DarkModeToggle />

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" className={`${styles.resumeBtn} ${styles.mobileResume}`}>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
