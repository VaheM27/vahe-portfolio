"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiReact, SiTypescript, SiNextdotjs, SiThreedotjs, SiNodedotjs } from "react-icons/si";
import { personalInfo } from "@/data/portfolio";
import styles from "./Hero.module.scss";

const techBadges = [
  { icon: SiReact,      label: "React",      color: "#61dafb" },
  { icon: SiTypescript, label: "TypeScript",  color: "#3178c6" },
  { icon: SiNextdotjs,  label: "Next.js",     color: "#000000" },
  { icon: SiThreedotjs, label: "Three.js",    color: "#049ef4" },
  { icon: SiNodedotjs,  label: "Node.js",     color: "#339933" },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "8+", label: "Projects"   },
  { value: "4",  label: "Companies"  },
];

export default function Hero() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth  - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      blob1Ref.current?.style.setProperty("transform", `translate(${x * 40}px, ${y * 30}px)`);
      blob2Ref.current?.style.setProperty("transform", `translate(${-x * 30}px, ${-y * 24}px)`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Parallax blobs */}
      <div ref={blob1Ref} className={styles.blob1} />
      <div ref={blob2Ref} className={styles.blob2} />

      <div className={`container ${styles.content}`}>
        {/* ── LEFT COLUMN ── */}
        <div className={styles.left}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.dot} />
            Available for work
          </motion.div>

          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div
            className={styles.roleWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <span className={styles.rolePrefix}>I build </span>
            <TypeAnimation
              sequence={[
                "React / Next.js apps.",  2000,
                "3D web experiences.",    2000,
                "pixel-perfect UIs.",     2000,
                "scalable frontends.",    2000,
              ]}
              wrapper="span"
              speed={50}
              className={styles.typeText}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <a href="#projects" className="btn-primary"><span>View My Work</span></a>
            <a href="#contact"  className="btn-outline">Get In Touch</a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          {/* Badge stack — desktop only, to the left of photo */}
          <div className={styles.badgeStack}>
            {techBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className={styles.techBadge}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <badge.icon size={14} style={{ color: badge.color, flexShrink: 0 }} />
                <span>{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Photo */}
          <div className={styles.photoWrap}>
            <div className={styles.glowRing} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vahe/me.png" alt="Vahe Mnatsakanyan" className={styles.photo} />
          </div>
        </motion.div>
      </div>

      {/* Fixed side decorations */}
      <motion.div className={styles.socials} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        {[
          { icon: FiGithub,   href: personalInfo.social.github,  label: "GitHub"   },
          { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
        ].map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
             className={styles.socialLink} aria-label={label}>
            <Icon size={18} />
          </a>
        ))}
        <div className={styles.socialLine} />
      </motion.div>

      <motion.div className={styles.emailSide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <a href={`mailto:${personalInfo.email}`} className={styles.email}>{personalInfo.email}</a>
        <div className={styles.emailLine} />
      </motion.div>

      <motion.div className={styles.scrollHint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <FiArrowDown size={20} />
        </motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
