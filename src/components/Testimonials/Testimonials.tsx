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

// ─── LinkedIn recommendations ─────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Lilit Aydinyan",
    title: "IT Project Manager | Scrum Master | PMEC™",
    company: "SmartCode",
    relationship: "Managed Vahe directly",
    text: "Vahe is one of the best among all the people I have ever worked with. As I remember, Vahe is a very productive person, is hardworking, broad-minded and forward thinking individual. Intelligent, ambitious, energetic and proactive perfectionist. Desire for proficiency and education makes Vahe a valuable asset to the team. His focus keeps everything moving smoothly, he makes sure all the deadlines are met, and makes sure that whatever project he is working on meets the highest standards. It is an honor for me to recommend and endorse him.",
    linkedinUrl: "https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/details/recommendations/",
  },
  {
    name: "Mari Mirzoyan",
    title: "Product Designer",
    company: "Homebuddy",
    relationship: "Worked on the same team",
    text: "Vahe has been working as a Software developer within a team where I was involved too. Having worked with him on many projects, I must say he is really good at development. His work is always outstanding, and he always goes the extra mile to ensure the company standards and requirements. He is a highly-skilled, experienced, and helpful professional with a positive attitude. Working with Vahe has been a great experience for me as I learned many hard and soft skills from him.",
    linkedinUrl: "https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/details/recommendations/",
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
