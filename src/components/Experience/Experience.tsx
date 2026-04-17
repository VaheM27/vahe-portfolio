"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCalendar, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { experience } from "@/data/portfolio";
import styles from "./Experience.module.scss";

export default function Experience() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const job = experience[active];

  return (
    <section id="experience" ref={ref} className={styles.experience}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Work History</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            A track record of delivering quality across different team sizes and domains.
          </p>
        </motion.div>

        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.tabs}>
            {experience.map((exp, i) => (
              <button
                key={exp.id}
                className={`${styles.tab} ${active === i ? styles.activeTab : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabIndicator} />
                <span className={styles.tabText}>{exp.company}</span>
              </button>
            ))}
          </div>

          <div className={styles.content}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.jobHeader}>
                  <div>
                    <h3 className={styles.role}>
                      {job.role}
                      <span className={styles.atSign}> @ </span>
                      <span className={styles.company}>{job.company}</span>
                    </h3>
                    <div className={styles.meta}>
                      <span>
                        <FiCalendar size={13} />
                        {job.duration}
                      </span>
                      <span>
                        <FiMapPin size={13} />
                        {job.location}
                      </span>
                      <span className={styles.typeBadge}>{job.type}</span>
                    </div>
                  </div>
                </div>

                <p className={styles.description}>{job.description}</p>

                <ul className={styles.responsibilities}>
                  {job.responsibilities.map((r, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <FiChevronRight size={14} className={styles.bullet} />
                      {r}
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.techStack}>
                  {job.tech.map((t) => (
                    <span key={t} className={styles.techItem}>
                      <FiCheckCircle size={11} />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
