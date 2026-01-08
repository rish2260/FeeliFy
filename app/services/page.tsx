"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- VISUALS FOR PREVIEW ---
// Abstract CSS-only visualizations to represent services (Performance optimized)
const VisualSEO = () => (
  <div className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[length:100%_4px]" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="w-48 h-48 border border-[#00FF00] rounded-full flex items-center justify-center relative"
    >
      <div className="w-32 h-32 border border-[#00FF00]/50 rounded-full animate-pulse" />
      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-[#00FF00]/20" />
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#00FF00]/20" />
    </motion.div>
    <div className="absolute bottom-4 right-4 font-mono text-[#00FF00] text-xs">
      SEARCH_INDEX_OPTIMIZED
    </div>
  </div>
);

const VisualSocial = () => (
  <div className="w-full h-full bg-black relative overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-24 h-24 rounded-full border border-[var(--acc)] mix-blend-screen bg-[var(--acc)]/20 blur-xl"
        animate={{
          x: [Math.random() * 300, Math.random() * 300],
          y: [Math.random() * 300, Math.random() * 300],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    ))}
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-[var(--acc)] font-black text-6xl tracking-tighter opacity-50 mix-blend-overlay">
        CONNECT
      </h3>
    </div>
  </div>
);

const VisualAds = () => (
  <div className="w-full h-full bg-black relative overflow-hidden flex items-end justify-center gap-2 p-12">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="w-8 bg-white/10"
        initial={{ height: "10%" }}
        animate={{
          height: `${Math.random() * 80 + 20}%`,
          backgroundColor: i % 2 === 0 ? "var(--acc)" : "#ffffff",
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.1,
        }}
      />
    ))}
    <div className="absolute top-12 left-12 font-mono text-white text-4xl font-bold">
      +480%
    </div>
  </div>
);

const VisualContent = () => (
  <div className="w-full h-full bg-black relative overflow-hidden flex flex-col items-center justify-center">
    <motion.div
      animate={{ y: [-20, 0, -20] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="text-8xl font-serif text-white/20 italic"
    >
      "Story"
    </motion.div>
    <motion.div
      animate={{ y: [20, 0, 20] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
      className="text-8xl font-black text-white/5 uppercase"
    >
      TELLING
    </motion.div>
  </div>
);

// Map service titles to visuals
const getVisual = (title: string) => {
  if (title.includes("SEO")) return <VisualSEO />;
  if (title.includes("Social")) return <VisualSocial />;
  if (title.includes("Ads") || title.includes("Performance"))
    return <VisualAds />;
  return <VisualContent />;
};

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "SEO",
      subtitle: "Search Engine Optimization",
      desc: "Dominate search rankings. We engineer your digital infrastructure to be found, indexing your brand into the fabric of the web.",
      tags: ["Technical SEO", "Backlinking", "Content Strategy"],
    },
    {
      title: "Social Media",
      subtitle: "Community & Virality",
      desc: "Architecting noise. We build engaged communities and craft viral moments that amplify your brand resonance across platforms.",
      tags: ["Instagram", "LinkedIn", "Twitter/X", "Content Creation"],
    },
    {
      title: "SEM / Ads",
      subtitle: "Paid Acquisition",
      desc: "Precision targeting. We deploy capital efficiently to acquire customers with high intent, ensuring maximum ROI.",
      tags: ["Google Ads", "Meta Ads", "Retargeting", "Analytics"],
    },
    {
      title: "Content",
      subtitle: "Storytelling & Production",
      desc: "Narrative warfare. We produce world-class multimedia content that pierces through the scroll fatigue.",
      tags: ["Video Production", "Copywriting", "Visual Design"],
    },
    {
      title: "Web Design",
      subtitle: "Digital Experience",
      desc: "Immersive interfaces. We build responsive, aesthetic, and high-performance websites that convert visitors.",
      tags: ["UI/UX", "Next.js", "WebGL", "E-commerce"],
    },
    {
      title: "Performance",
      subtitle: "Growth Hacking",
      desc: "Data-driven scaling. We analyze, optimize, and iterate on every touchpoint to unlock exponential growth.",
      tags: ["CRO", "Funnel Optimization", "A/B Testing"],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="pt-32 pb-12 px-6 md:px-12 border-b border-[var(--border)]">
        <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-[var(--fg)] opacity-90">
          Our
          <span className="text-[var(--acc)] ml-4">Services</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Column: List */}
        <div className="w-full lg:w-1/2 border-r border-[var(--border)]">
          {services.map((s, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setActiveService(i)}
              className={`group relative p-8 md:p-12 border-b border-[var(--border)] cursor-pointer overflow-hidden transition-colors duration-500 ${
                activeService === i
                  ? "bg-[var(--fg)] text-[var(--bg)]"
                  : "hover:bg-[var(--surface)]"
              }`}
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span
                    className={`font-mono text-xs tracking-widest uppercase mb-2 ${
                      activeService === i
                        ? "text-[var(--bg)]/60"
                        : "text-[var(--acc)]"
                    }`}
                  >
                    (0{i + 1})
                  </span>
                  <ArrowUpRight
                    className={`transition-transform duration-300 ${
                      activeService === i
                        ? "rotate-45"
                        : "group-hover:rotate-45"
                    }`}
                  />
                </div>

                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight">
                  {s.title}
                </h2>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeService === i ? "auto" : 0,
                    opacity: activeService === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-lg md:text-xl font-light leading-relaxed mt-4 opacity-90 max-w-md">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {s.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-mono uppercase border px-2 py-1 rounded-full ${
                          activeService === i
                            ? "border-[var(--bg)]/40 text-[var(--bg)]/80"
                            : "border-[var(--fg)]/20 text-[var(--fg)]/50"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Sticky Preview */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 bg-[#050505] flex items-center justify-center p-12"
            >
              {/* Dynamic Background Visual */}
              <div className="absolute inset-0 opacity-40">
                {getVisual(services[activeService].title)}
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-center">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--fg)] font-mono text-xs uppercase tracking-[0.3em] mb-4"
                >
                  {services[activeService].subtitle}
                </motion.h3>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-8xl font-black text-white uppercase tracking-tighter mix-blend-difference"
                >
                  {services[activeService].title}
                </motion.h2>
              </div>

              {/* Noise Overlay */}
              <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
