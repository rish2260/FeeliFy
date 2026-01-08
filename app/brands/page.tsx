"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Timer, Sparkles } from "lucide-react";

/* --- DATA --- */
const BRANDS_ROW_1 = [
  "Aether",
  "Chronos",
  "Kinetix",
  "Vortex",
  "Nebula",
  "Quantum",
  "Helix",
  "Pulsar",
];
const BRANDS_ROW_2 = [
  "HYPERION",
  "OMEGA",
  "ZENITH",
  "APEX",
  "TITAN",
  "NOVA",
  "ECLIPSE",
  "HORIZON",
];
const BRANDS_ROW_3 = [
  "Flux",
  "Ion",
  "Orbit",
  "Solar",
  "Luna",
  "Astra",
  "Cosmos",
  "Stellar",
];

/* --- COMPONENTS --- */

// Simple fallback marquee for simpler infinite scroll
function InfiniteLoop({
  children,
  direction = "left",
  speed = 20,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="flex overflow-hidden w-full mask-image-x">
      <motion.div
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        className="flex gap-4 md:gap-8 min-w-max px-2 md:px-4"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

const BrandCardSmall = ({ name }: { name: string }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm text-[var(--fg)] opacity-60">
    <Sparkles size={12} className="text-[var(--acc)]" />
    <span className="font-mono text-sm uppercase tracking-widest">{name}</span>
    <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1 rounded text-[var(--acc)] ml-2">
      SOON
    </span>
  </div>
);

const BrandCardLarge = ({ name }: { name: string }) => (
  <div className="relative group w-[300px] md:w-[500px] h-[200px] md:h-[300px] flex-shrink-0 border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-xl overflow-hidden flex items-center justify-center">
    {/* Background Animation */}
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent_100%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute inset-0 bg-[var(--acc)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <div className="text-center z-10">
      <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-black to-black/40 dark:from-white dark:to-white/40 uppercase tracking-tighter mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
        {name}
      </h2>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--acc)]/30 text-[var(--acc)] bg-white/50 dark:bg-black/50 backdrop-blur-md text-xs font-mono uppercase tracking-widest">
        <Lock size={12} />
        <span>Confidential</span>
      </div>
      <div className="mt-4 flex justify-center gap-2 opacity-50 text-[10px] font-mono uppercase text-[var(--fg)]">
        <span className="animate-pulse">Loading Assets...</span>
      </div>
    </div>

    {/* Scanlines */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01),rgba(0,0,0,0.03))] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]" />
  </div>
);

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32 pb-20 relative overflow-hidden flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--acc)_0%,_transparent_50%)] opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

      <div className="mb-12 text-center relative z-10 px-4">
        <span className="font-mono text-xs text-[var(--acc)] uppercase tracking-[0.5em] mb-4 block animate-pulse">
          Terminal Access
        </span>
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter text-[var(--fg)] opacity-90">
          Future <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--acc)] to-black/50 dark:to-white/50">
            Partners
          </span>
        </h1>
      </div>

      <div className="space-y-8 md:space-y-16 relative z-10 w-full py-12">
        {/* Row 1: Fast Left */}
        <div className="transform -rotate-1 origin-center opacity-70 hover:opacity-100 transition-opacity">
          <InfiniteLoop direction="left" speed={30}>
            {BRANDS_ROW_1.map((brand, i) => (
              <BrandCardSmall key={i} name={brand} />
            ))}
          </InfiniteLoop>
        </div>

        {/* Row 2: Slow Right (Main) */}
        <div className="transform rotate-2 scale-110 z-20 my-8">
          <InfiniteLoop direction="right" speed={50}>
            {BRANDS_ROW_2.map((brand, i) => (
              <BrandCardLarge key={i} name={brand} />
            ))}
          </InfiniteLoop>
        </div>

        {/* Row 3: Fast Left */}
        <div className="transform -rotate-1 origin-center opacity-70 hover:opacity-100 transition-opacity">
          <InfiniteLoop direction="left" speed={35}>
            {BRANDS_ROW_3.map((brand, i) => (
              <BrandCardSmall key={i} name={brand} />
            ))}
          </InfiniteLoop>
        </div>
      </div>

      <div className="absolute bottom-12 w-full text-center">
        <div className="inline-flex items-center gap-2 text-[var(--fg)] opacity-30 font-mono text-xs uppercase tracking-widest">
          <Timer size={14} />
          <span>Integration in progress</span>
        </div>
      </div>
    </main>
  );
}
