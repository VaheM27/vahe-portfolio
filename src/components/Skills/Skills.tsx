"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiSass,
  SiHtml5,
  SiGit,
  SiWebpack,
  SiFigma,
  SiStorybook,
  SiPostman,
  SiOpenai,
  SiVercel,
  SiThreedotjs,
  SiClaude,
  SiMake,
  SiV0,
  SiGithubcopilot,
  SiDigitalocean,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { skills, skillCategories as categories } from "@/data/portfolio";
import styles from "./Skills.module.scss";

// ─── Icon map ────────────────────────────────────────────────────────────────
type IconEntry =
  | { component: React.ElementType; color: string }
  | { label: string; color: string }
  | { favicon: string; color: string };

const ICON_MAP: Record<string, IconEntry> = {
  react: { component: SiReact, color: "#61DAFB" },
  nextjs: { component: TbBrandNextjs, color: "#000000" },
  javascript: { component: SiJavascript, color: "#F7DF1E" },
  typescript: { component: SiTypescript, color: "#3178C6" },
  redux: { component: SiRedux, color: "#764ABC" },
  sass: { component: SiSass, color: "#CC6699" },
  html5: { component: SiHtml5, color: "#E34F26" },
  threejs: { component: SiThreedotjs, color: "#000000" },
  git: { component: SiGit, color: "#F05032" },
  webpack: { component: SiWebpack, color: "#8DD6F9" },
  figma: { component: SiFigma, color: "#F24E1E" },
  digitalocean: { component: SiDigitalocean, color: "#3178C6" },
  storybook: { component: SiStorybook, color: "#FF4785" },
  postman: { component: SiPostman, color: "#FF6C37" },
  openai: { component: SiOpenai, color: "#10A37F" },
  claude: { component: SiClaude, color: "#D97706" },
  vercel: { component: SiVercel, color: "#000000" },
  v0: { component: SiV0, color: "#000000" },
  copilot: { component: SiGithubcopilot, color: "#181717" },
  make: { component: SiMake, color: "#6D00CC" },
  // image-based (no react-icon available)
  spline: { favicon: "/icons/spline.png", color: "#0D0D0D" },
  midjourney: { favicon: "/icons/midjourney.png", color: "#23272A" },
  cursor: {
    favicon: "https://www.google.com/s2/favicons?domain=cursor.com&sz=64",
    color: "#1D1D1D",
  },
  // text fallbacks
  nanobanana: { label: "NB", color: "#7C3AED" },
};

function SkillIcon({ iconKey }: { iconKey: string }) {
  const entry = ICON_MAP[iconKey];
  if (!entry) return <span className={styles.fallback}>?</span>;
  if ("component" in entry) {
    const Comp = entry.component;
    return <Comp size={34} className={styles.svgIcon} />;
  }
  if ("favicon" in entry) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={entry.favicon} alt={iconKey} className={styles.faviconIcon} />
    );
  }
  return (
    <span className={styles.textIcon} style={{ background: entry.color }}>
      {entry.label}
    </span>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" ref={ref} className={styles.skills}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">My Toolkit</h2>
          <p className="section-subtitle">
            Technologies I work with to craft fast, scalable, and beautiful
            interfaces.
          </p>
        </motion.div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.filter} ${activeCategory === cat.key ? styles.active : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className={styles.grid}>
          {filtered.map((skill, i) => {
            const entry = ICON_MAP[skill.icon];
            const hoverColor = entry
              ? "color" in entry
                ? entry.color
                : "var(--accent)"
              : "var(--accent)";

            return (
              <motion.a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.skillCard}
                data-category={skill.category}
                style={{ "--hover-color": hoverColor } as React.CSSProperties}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                layout
              >
                <div className={styles.iconWrap}>
                  <SkillIcon iconKey={skill.icon} />
                </div>
                <span className={styles.skillName}>
                  {skill.name}
                  {skill.category === "ai" && (
                    <span className={styles.aiTag}>AI</span>
                  )}
                </span>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className={styles.techCloud}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {skills
            .filter((s) => s.category !== "ai")
            .map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tag}
              >
                {s.name}
              </a>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
