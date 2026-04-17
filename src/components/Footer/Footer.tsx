import styles from "./Footer.module.scss";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.bracket}>&lt;</span>
          <span className={styles.name}>VM</span>
          <span className={styles.bracket}>/&gt;</span>
        </a>
        <p className={styles.copy}>
          Designed & Built by <span className={styles.highlight}>{personalInfo.name}</span>
          {" · "}
          {new Date().getFullYear()}
        </p>
        <a href="#" className={styles.backTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
