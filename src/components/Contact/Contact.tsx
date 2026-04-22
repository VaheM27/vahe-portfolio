"use client";
import { useState, FormEvent, useEffect } from "react";
import confetti from "canvas-confetti";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";
import styles from "./Contact.module.scss";

// ─── Types ────────────────────────────────────────────────────────────────────
type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Toast = { type: "success" | "error"; message: string } | null;

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const e: Errors = {};
  if (!fields.name.trim()) e.name = "Name is required.";
  else if (fields.name.trim().length < 2) e.name = "Name must be at least 2 characters.";

  if (!fields.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(fields.email)) e.email = "Please enter a valid email address.";

  if (!fields.subject.trim()) e.subject = "Subject is required.";
  else if (fields.subject.trim().length < 3) e.subject = "Subject must be at least 3 characters.";

  if (!fields.message.trim()) e.message = "Message is required.";
  else if (fields.message.trim().length < 10) e.message = "Message must be at least 10 characters.";

  return e;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function ToastNotification({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className={`${styles.toast} ${styles[toast.type]}`}
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className={styles.toastIcon}>
            {toast.type === "success" ? <FiCheckCircle size={18} /> : <FiXCircle size={18} />}
          </span>
          <span className={styles.toastMsg}>{toast.message}</span>
          <button className={styles.toastClose} onClick={onClose} aria-label="Dismiss">
            <FiX size={14} />
          </button>
          <motion.div
            className={styles.toastBar}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4.5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [toast, setToast] = useState<Toast>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const touch = (field: keyof Fields) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const e = validate({ ...form });
    setErrors(e);
  };

  const change = (field: keyof Fields, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Mark all touched so errors show
    setTouched({ name: true, email: true, subject: true, message: true });
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setToast({ type: "success", message: "Message sent! I'll get back to you within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
      // 🎉 Confetti celebration
      const end = Date.now() + 1800;
      const colors = ["#059669", "#34d399", "#10b981", "#6ee7b7", "#ffffff"];
      (function frame() {
        confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    } catch {
      setStatus("idle");
      setToast({
        type: "error",
        message: "Something went wrong. Please try again or email me directly.",
      });
    }
  };

  const fieldProps = (field: keyof Fields) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      change(field, e.target.value),
    onBlur: () => touch(field),
    className: `${styles.input} ${touched[field] && errors[field] ? styles.inputError : ""} ${touched[field] && !errors[field] && form[field] ? styles.inputValid : ""}`,
  });

  return (
    <section id="contact" ref={ref} className={styles.contact}>
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* ── Info column ── */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className={styles.callout}>
              I&apos;m currently open to new opportunities and exciting projects. Whether you have a
              question or just want to say hello — my inbox is always open.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FiMail size={18} />
                </div>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={`mailto:${personalInfo.email}`} className={styles.contactValue}>
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FiMapPin size={18} />
                </div>
                <div>
                  <span className={styles.contactLabel}>Location</span>
                  <span className={styles.contactValue}>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className={styles.socialRow}>
              {[
                { icon: FiGithub, href: personalInfo.social.github, label: "GitHub" },
                { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={label}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {status === "sent" ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.successIcon}>✓</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button
                  type="button"
                  className={`btn-primary ${styles.sendAnother}`}
                  onClick={() => setStatus("idle")}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input type="text" placeholder="John Doe" {...fieldProps("name")} />
                    <FieldError msg={touched.name ? errors.name : undefined} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input type="email" placeholder="john@example.com" {...fieldProps("email")} />
                    <FieldError msg={touched.email ? errors.email : undefined} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Subject</label>
                  <input type="text" placeholder="Project Inquiry" {...fieldProps("subject")} />
                  <FieldError msg={touched.subject ? errors.subject : undefined} />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    {...fieldProps("message")}
                    className={`${fieldProps("message").className} ${styles.textarea}`}
                  />
                  <div className={styles.fieldFooter}>
                    <FieldError msg={touched.message ? errors.message : undefined} />
                    <span
                      className={`${styles.charCount} ${form.message.length < 10 ? styles.charWarn : ""}`}
                    >
                      {form.message.length} / 10
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                  disabled={status === "sending"}
                >
                  <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  {status === "sending" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <FiSend size={16} />
                  )}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.span
          className={styles.fieldError}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          <FiAlertCircle size={12} />
          {msg}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
