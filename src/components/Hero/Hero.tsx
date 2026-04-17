"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
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
              "React / Next.js apps.",
              2000,
              "3D web experiences.",
              2000,
              "pixel-perfect UIs.",
              2000,
              "scalable frontends.",
              2000,
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
          <a href="#projects" className="btn-primary">
            <span>View My Work</span>
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { icon: FiGithub, href: personalInfo.social.github, label: "GitHub" },
            { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
          <div className={styles.socialLine} />
        </motion.div>

        <motion.div
          className={styles.emailSide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <a href={`mailto:${personalInfo.email}`} className={styles.email}>
            {personalInfo.email}
          </a>
          <div className={styles.emailLine} />
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown size={20} />
        </motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
