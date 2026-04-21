"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
}

const variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

export default function SectionReveal({ children, delay = 0 }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
