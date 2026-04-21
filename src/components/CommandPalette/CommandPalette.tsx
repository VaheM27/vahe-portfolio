"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import {
  FiUser, FiCode, FiBriefcase, FiMail, FiGithub, FiLinkedin,
  FiHome, FiExternalLink, FiFileText, FiStar,
} from "react-icons/fi";
import styles from "./CommandPalette.module.scss";

const sections = [
  { id: "home",       label: "Home",            icon: FiHome,       action: "scroll" },
  { id: "about",      label: "About Me",         icon: FiUser,       action: "scroll" },
  { id: "skills",     label: "Skills",           icon: FiCode,       action: "scroll" },
  { id: "experience", label: "Experience",       icon: FiBriefcase,  action: "scroll" },
  { id: "projects",   label: "Projects",         icon: FiStar,       action: "scroll" },
  { id: "github",     label: "GitHub Activity",  icon: FiGithub,     action: "scroll" },
  { id: "contact",    label: "Contact",          icon: FiMail,       action: "scroll" },
];

const links = [
  { label: "GitHub Profile",  icon: FiGithub,    href: "https://github.com/VaheM27" },
  { label: "LinkedIn",        icon: FiLinkedin,  href: "https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/" },
  { label: "Download CV",     icon: FiFileText,  href: "/resume.pdf" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = id === "home" ? document.body : document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      {/* Trigger hint in navbar — optional, rendered separately */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Command className={styles.command} label="Command palette">
                <div className={styles.inputWrap}>
                  <span className={styles.searchIcon}>⌘</span>
                  <Command.Input
                    className={styles.input}
                    placeholder="Type a command or search…"
                    autoFocus
                  />
                  <kbd className={styles.escHint} onClick={() => setOpen(false)}>ESC</kbd>
                </div>

                <Command.List className={styles.list}>
                  <Command.Empty className={styles.empty}>No results found.</Command.Empty>

                  <Command.Group heading="Navigate" className={styles.group}>
                    {sections.map((s) => (
                      <Command.Item
                        key={s.id}
                        value={s.label}
                        onSelect={() => scrollTo(s.id)}
                        className={styles.item}
                      >
                        <s.icon size={15} className={styles.itemIcon} />
                        <span>{s.label}</span>
                        <span className={styles.itemHint}>Go to section</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Links" className={styles.group}>
                    {links.map((l) => (
                      <Command.Item
                        key={l.label}
                        value={l.label}
                        onSelect={() => {
                          setOpen(false);
                          window.open(l.href, "_blank");
                        }}
                        className={styles.item}
                      >
                        <l.icon size={15} className={styles.itemIcon} />
                        <span>{l.label}</span>
                        <FiExternalLink size={12} className={styles.itemHint} />
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                <div className={styles.footer}>
                  <span><kbd>↑↓</kbd> navigate</span>
                  <span><kbd>↵</kbd> select</span>
                  <span><kbd>ESC</kbd> close</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
