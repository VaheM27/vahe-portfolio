"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiUser, FiMapPin, FiMail, FiCode, FiPhone, FiBookOpen } from "react-icons/fi";
import { personalInfo, education, languages } from "@/data/portfolio";
import styles from "./About.module.scss";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "4", label: "Companies" },
  { value: "3", label: "Languages" },
  { value: "10+", label: "Students Taught" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" ref={ref} className={styles.about}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className={styles.lead}>{personalInfo.about}</p>
            <p className={styles.body}>{personalInfo.aboutExtended}</p>

            <div className={styles.details}>
              {[
                { icon: FiUser, label: "Name", value: personalInfo.name },
                { icon: FiMapPin, label: "Location", value: personalInfo.location },
                { icon: FiMail, label: "Email", value: personalInfo.email },
                { icon: FiPhone, label: "Phone", value: personalInfo.phone },
                { icon: FiBookOpen, label: "Education", value: education.school },
                { icon: FiCode, label: "Languages", value: languages.join(" · ") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.detailRow}>
                  <span className={styles.detailIcon}><Icon size={14} /></span>
                  <span className={styles.detailLabel}>{label}</span>
                  <span className={styles.detailValue}>{value}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <a href="#contact" className="btn-primary"><span>Hire Me</span></a>
              <a href="/resume.pdf" target="_blank" className="btn-outline">Download CV</a>
            </div>
          </motion.div>

          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatarInner}>
                <img
                  src="/vahe/me.png"
                  alt="Vahe Mnatsakanyan"
                  className={styles.avatarPhoto}
                />
              </div>
              <div className={styles.avatarOrbit}>
                {["⚛️", "🚀", "💻", "✨"].map((emoji, i) => (
                  <span
                    key={i}
                    className={styles.orbitDot}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
