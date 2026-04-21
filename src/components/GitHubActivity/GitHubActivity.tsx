"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import styles from "./GitHubActivity.module.scss";

export default function GitHubActivity() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="github" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Open Source</p>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle">
            My coding consistency over the past year — every square is a commit.
          </p>
        </motion.div>

        <motion.div
          className={styles.calendarWrap}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <GitHubCalendar
            username="VaheM27"
            colorScheme="light"
            theme={{
              light: ["#e8faf0", "#86efac", "#4ade80", "#16a34a", "#15803d"],
            }}
            fontSize={13}
            blockSize={14}
            blockMargin={4}
            style={{ width: "100%" }}
          />
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "GitHub", value: "@VaheM27", link: "https://github.com/VaheM27" },
            { label: "Repositories", value: "Public repos", link: "https://github.com/VaheM27?tab=repositories" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statPill}
            >
              <span className={styles.statLabel}>{item.label}</span>
              <span className={styles.statValue}>{item.value}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
