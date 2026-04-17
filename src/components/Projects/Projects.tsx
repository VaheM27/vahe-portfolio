"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import styles from "./Projects.module.scss";

function SitePreview({
  url,
  title,
  previewImage,
}: {
  url: string;
  title: string;
  previewImage?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Use a local screenshot if provided (for sites that block iframes)
  if (previewImage) {
    return (
      <div className={styles.iframeWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewImage}
          alt={`${title} preview`}
          className={styles.screenshotImg}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={styles.iframeWrap}>
      {failed ? (
        <div className={styles.previewFallback}>
          <div className={styles.fallbackContent}>
            <span className={styles.fallbackTitle}>{title.split("—")[0].trim()}</span>
            <span className={styles.fallbackUrl}>{url.replace("https://", "")}</span>
          </div>
        </div>
      ) : (
        <iframe
          src={url}
          title={title}
          scrolling="no"
          frameBorder="0"
          onError={() => setFailed(true)}
          sandbox="allow-same-origin allow-forms"
          className={styles.iframe}
        />
      )}
    </div>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" ref={ref} className={styles.projects}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A curated selection of things I&apos;ve built — from AI platforms to gaming experiences.
          </p>
        </motion.div>

        {/* Featured projects — large cards */}
        <div className={styles.featured}>
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <motion.div
                key={project.id}
                className={`${styles.featuredCard} ${i % 2 === 1 ? styles.reverse : ""}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={styles.cardVisual}>
                  <div
                    className={styles.projectImg}
                    style={{ "--accent": project.color } as React.CSSProperties}
                  >
                    <div className={styles.browserBar}>
                      <div className={styles.browserDots}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.browserUrl}>
                        <span className={styles.lock}>🔒</span>
                        {project.liveUrl.replace("https://", "")}
                      </div>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.browserOpen}
                        title="Open site"
                      >
                        <FiExternalLink size={13} />
                      </a>
                    </div>
                    <SitePreview
                      url={project.liveUrl}
                      title={project.title}
                      previewImage={project.previewImage}
                    />
                  </div>
                  <AnimatePresence>
                    {hovered === project.id && (
                      <motion.div
                        className={styles.cardGlow}
                        style={{
                          background: `radial-gradient(circle at center, ${project.color}30 0%, transparent 70%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Featured Project</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.cardDesc}>
                    <p>{project.description}</p>
                  </div>
                  <div className={styles.cardTech}>
                    {project.tech.map((t) => (
                      <span key={t} className={styles.techTag}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardLinks}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      <FiExternalLink size={15} />
                      <span>Visit Site</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other projects — grid */}
        <motion.h3
          className={styles.otherTitle}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Other Noteworthy Projects
        </motion.h3>
        <div className={styles.otherGrid}>
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <motion.div
                key={project.id}
                className={styles.otherCard}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.08 }}
              >
                <div className={styles.otherCardTop}>
                  <div className={styles.folderIcon}>
                    <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M4 10C4 8.9 4.9 8 6 8h10l4 4h14c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.otherLiveBtn}
                    aria-label="Visit site"
                  >
                    <FiExternalLink size={15} />
                  </a>
                </div>
                <h4 className={styles.otherCardTitle}>{project.title}</h4>
                <p className={styles.otherCardDesc}>{project.description}</p>
                <div className={styles.otherCardTech}>
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>

        <motion.div
          className={styles.viewMore}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <a
            href={projects[0] && "https://github.com/VaheM27"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreLink}
          >
            View GitHub Profile
            <FiArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
