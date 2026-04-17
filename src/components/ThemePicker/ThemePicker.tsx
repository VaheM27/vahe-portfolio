"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ThemePicker.module.scss";

const THEMES = [
  {
    name: "Emerald",
    color: "#059669",
    vars: {
      "--accent": "#059669", "--accent-rgb": "5, 150, 105",
      "--accent-alt": "#0d9488", "--accent-alt-rgb": "13, 148, 136",
      "--accent-3": "#16a34a", "--accent-3-rgb": "22, 163, 74",
      "--accent-4": "#65a30d", "--accent-4-rgb": "101, 163, 13",
      "--accent-5": "#10b981", "--accent-5-rgb": "16, 185, 129",
      "--accent-lt": "#34d399",
    },
  },
  {
    name: "Orange",
    color: "#ea580c",
    vars: {
      "--accent": "#ea580c", "--accent-rgb": "234, 88, 12",
      "--accent-alt": "#d97706", "--accent-alt-rgb": "217, 119, 6",
      "--accent-3": "#c2410c", "--accent-3-rgb": "194, 65, 12",
      "--accent-4": "#f97316", "--accent-4-rgb": "249, 115, 22",
      "--accent-5": "#fb923c", "--accent-5-rgb": "251, 146, 60",
      "--accent-lt": "#fdba74",
    },
  },
  {
    name: "Blue",
    color: "#2563eb",
    vars: {
      "--accent": "#2563eb", "--accent-rgb": "37, 99, 235",
      "--accent-alt": "#0891b2", "--accent-alt-rgb": "8, 145, 178",
      "--accent-3": "#1d4ed8", "--accent-3-rgb": "29, 78, 216",
      "--accent-4": "#0284c7", "--accent-4-rgb": "2, 132, 199",
      "--accent-5": "#06b6d4", "--accent-5-rgb": "6, 182, 212",
      "--accent-lt": "#60a5fa",
    },
  },
  {
    name: "Purple",
    color: "#7c3aed",
    vars: {
      "--accent": "#7c3aed", "--accent-rgb": "124, 58, 237",
      "--accent-alt": "#db2777", "--accent-alt-rgb": "219, 39, 119",
      "--accent-3": "#6d28d9", "--accent-3-rgb": "109, 40, 217",
      "--accent-4": "#9333ea", "--accent-4-rgb": "147, 51, 234",
      "--accent-5": "#a855f7", "--accent-5-rgb": "168, 85, 247",
      "--accent-lt": "#c084fc",
    },
  },
  {
    name: "Rose",
    color: "#e11d48",
    vars: {
      "--accent": "#e11d48", "--accent-rgb": "225, 29, 72",
      "--accent-alt": "#be123c", "--accent-alt-rgb": "190, 18, 60",
      "--accent-3": "#be185d", "--accent-3-rgb": "190, 24, 93",
      "--accent-4": "#ec4899", "--accent-4-rgb": "236, 72, 153",
      "--accent-5": "#f43f5e", "--accent-5-rgb": "244, 63, 94",
      "--accent-lt": "#fb7185",
    },
  },
  {
    name: "Cyan",
    color: "#0891b2",
    vars: {
      "--accent": "#0891b2", "--accent-rgb": "8, 145, 178",
      "--accent-alt": "#0e7490", "--accent-alt-rgb": "14, 116, 144",
      "--accent-3": "#0369a1", "--accent-3-rgb": "3, 105, 161",
      "--accent-4": "#06b6d4", "--accent-4-rgb": "6, 182, 212",
      "--accent-5": "#22d3ee", "--accent-5-rgb": "34, 211, 238",
      "--accent-lt": "#67e8f9",
    },
  },
];

function applyTheme(vars: Record<string, string>) {
  Object.entries(vars).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function adjustHex(hex: string, hShift: number, lShift = 0): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const nh = (((h * 360 + hShift) % 360) + 360) % 360 / 360;
  const nl = Math.max(0, Math.min(1, l + lShift));
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q2 = nl < 0.5 ? nl * (1 + s) : nl + s - nl * s;
  const p2 = 2 * nl - q2;
  const nr = Math.round(hue2rgb(p2, q2, nh + 1 / 3) * 255);
  const ng = Math.round(hue2rgb(p2, q2, nh) * 255);
  const nb = Math.round(hue2rgb(p2, q2, nh - 1 / 3) * 255);
  return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
}

function buildCustomTheme(hex: string): Record<string, string> {
  const alt = adjustHex(hex, -20);
  const a3 = adjustHex(hex, -10, -0.05);
  const a4 = adjustHex(hex, 15, 0.05);
  const a5 = adjustHex(hex, 8, 0.1);
  const lt = adjustHex(hex, 5, 0.2);
  return {
    "--accent": hex, "--accent-rgb": hexToRgb(hex),
    "--accent-alt": alt, "--accent-alt-rgb": hexToRgb(alt),
    "--accent-3": a3, "--accent-3-rgb": hexToRgb(a3),
    "--accent-4": a4, "--accent-4-rgb": hexToRgb(a4),
    "--accent-5": a5, "--accent-5-rgb": hexToRgb(a5),
    "--accent-lt": lt,
  };
}

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Emerald");
  const [customColor, setCustomColor] = useState("#059669");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved) {
        const parsed = JSON.parse(saved);
        applyTheme(parsed.vars);
        setActive(parsed.name);
        if (parsed.color) setCustomColor(parsed.color);
      }
    } catch {}
  }, []);

  function selectTheme(theme: (typeof THEMES)[0]) {
    applyTheme(theme.vars);
    setActive(theme.name);
    localStorage.setItem("portfolio-theme", JSON.stringify({ name: theme.name, vars: theme.vars }));
    setOpen(false);
  }

  function handleCustom(hex: string) {
    setCustomColor(hex);
    const vars = buildCustomTheme(hex);
    applyTheme(vars);
    setActive("Custom");
    localStorage.setItem("portfolio-theme", JSON.stringify({ name: "Custom", color: hex, vars }));
  }

  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className={styles.panelLabel}>Theme Color</p>
            <div className={styles.swatches}>
              {THEMES.map((t) => (
                <button
                  key={t.name}
                  className={`${styles.swatch} ${active === t.name ? styles.activeSwatch : ""}`}
                  style={{ background: t.color }}
                  title={t.name}
                  onClick={() => selectTheme(t)}
                />
              ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.customRow}>
              <span className={styles.customLabel}>Custom</span>
              <input
                type="color"
                value={customColor}
                onChange={(e) => handleCustom(e.target.value)}
                className={styles.colorInput}
                title="Pick custom color"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        title="Change theme color"
        aria-label="Open theme picker"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className={styles.icon}
        >
          {open ? "✕" : "🎨"}
        </motion.span>
      </motion.button>
    </div>
  );
}
