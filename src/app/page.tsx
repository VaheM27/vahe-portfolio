"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader/Loader";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import GitHubActivity from "@/components/GitHubActivity/GitHubActivity";
import Testimonials from "@/components/Testimonials/Testimonials";
import CommandPalette from "@/components/CommandPalette/CommandPalette";
import SectionReveal from "@/components/SectionReveal/SectionReveal";
import { AnimatePresence, motion } from "framer-motion";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onComplete={() => setLoaded(true)} />}</AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ParticleBackground />
            <Navbar />
            <CommandPalette />
            <main>
              <Hero />
              <SectionReveal><About /></SectionReveal>
              <SectionReveal delay={0.05}><Skills /></SectionReveal>
              <SectionReveal delay={0.05}><Projects /></SectionReveal>
              <SectionReveal delay={0.05}><Experience /></SectionReveal>
              <SectionReveal delay={0.05}><GitHubActivity /></SectionReveal>
              <SectionReveal delay={0.05}><Testimonials /></SectionReveal>
              <SectionReveal delay={0.05}><Contact /></SectionReveal>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
