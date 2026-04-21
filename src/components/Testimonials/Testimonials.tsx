"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import styles from "./Testimonials.module.scss";

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  relationship: string;
  avatar?: string;
  text: string;
  linkedinUrl?: string;
}

// ─── Add your LinkedIn recommendations here ───────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Placeholder Name",
    title: "Senior Engineer",
    company: "Company",
    relationship: "Managed Vahe directly",
    text: "Paste LinkedIn recommendation text here.",
    linkedinUrl: "https://linkedin.com",
  },
];

function StarRating() {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Kind Words</p>
          <h2 className="section-title">Recommendations</h2>
          <p className="section-subtitle">
            What colleagues and managers say — straight from LinkedIn.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            >
              <div className={styles.cardTop}>
                <StarRating />
                {t.linkedinUrl && (
                  <a
                    href={t.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinBtn}
                    aria-label="View on LinkedIn"
                  >
                    <FiLinkedin size={15} />
                  </a>
                )}
              </div>

              <blockquote className={styles.quote}>
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className={styles.author}>
                <div className={styles.avatarWrap}>
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.avatar} alt={t.name} className={styles.avatar} />
                  ) : (
                    <div className={styles.avatarFallback}>
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{t.name}</span>
                  <span className={styles.authorTitle}>
                    {t.title} · {t.company}
                  </span>
                  <span className={styles.relationship}>{t.relationship}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.linkedinCta}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <a
            href="https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
          >
            <FiLinkedin size={16} />
            View all on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
