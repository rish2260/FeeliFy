"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* --- DATA --- */
const CLIENTS = [
  {
    name: "Nebula AI",
    desc: "Optimizing enterprise workflows with neural networks.",
    tags: ["AI", "SaaS"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    height: "h-[400px]",
  },
  {
    name: "Oasis Health",
    desc: "Personalized medicine platform for the digital age.",
    tags: ["Biotech", "App"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    height: "h-[500px]",
  },
  {
    name: "Vertex Arch",
    desc: "Parametric design for modern urban living.",
    tags: ["Spatial", "VR"],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2670&auto=format&fit=crop",
    height: "h-[450px]",
  },
  {
    name: "Cipher Systems",
    desc: "Next-gen cybersecurity for financial data.",
    tags: ["Fintech", "Security"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
    height: "h-[350px]",
  },
  {
    name: "Terra Climate",
    desc: "Tracking carbon footprints with satellite data.",
    tags: ["Green Tech", "Data"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    height: "h-[480px]",
  },
  {
    name: "Flux Energy",
    desc: "Predictive ML for renewable energy grids.",
    tags: ["Energy", "ML"],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
    height: "h-[420px]",
  },
  {
    name: "Ascend Capital",
    desc: "Algorithmic trading interfaces.",
    tags: ["Fintech", "Web3"],
    image:
      "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop",
    height: "h-[400px]",
  },
  {
    name: "Lumina Vision",
    desc: "Smart optics for autonomous vehicles.",
    tags: ["Robotics", "Hardware"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    height: "h-[550px]",
  },
];

const ParallaxCard = ({
  item,
  index,
}: {
  item: (typeof CLIENTS)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative mb-12 w-full rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${mouseX}px ${mouseY}px,
                        rgba(128, 128, 128, 0.15), 
                        transparent 80%
                    )
                `,
        }}
      />

      <div className="p-4 md:p-6 relative z-10">
        <div
          className={`relative w-full ${item.height} overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-900 mb-6`}
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out will-change-transform"
            />
          </motion.div>

          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-[var(--acc)] text-white flex items-center justify-center backdrop-blur-md">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase text-[var(--fg)] mb-2 group-hover:text-[var(--acc)] transition-colors">
              {item.name}
            </h3>
            <p className="font-mono text-sm text-[var(--fg)] opacity-60 max-w-sm">
              {item.desc}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end max-w-[120px]">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 border border-black/10 dark:border-white/10 rounded-full text-[10px] uppercase font-mono text-[var(--fg)] opacity-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ClientsPage() {
  // Split clients into two columns
  const leftColumn = CLIENTS.filter((_, i) => i % 2 === 0);
  const rightColumn = CLIENTS.filter((_, i) => i % 2 !== 0);

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter text-[var(--fg)]"
            >
              Selected <br />
              <span className="text-[var(--acc)]">Works</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-sm text-right"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] opacity-50 mb-2">
              (2023 — 2026)
            </p>
            <p className="text-lg text-[var(--fg)] opacity-80 font-serif italic">
              "We craft digital experiences that define the future of brands."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col">
            {leftColumn.map((client, i) => (
              <ParallaxCard key={i} item={client} index={i} />
            ))}
          </div>
          <div className="flex flex-col md:pt-32">
            {rightColumn.map((client, i) => (
              <ParallaxCard key={`right-${i}`} item={client} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-20 py-12 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-[var(--fg)] opacity-50 font-mono text-xs uppercase tracking-widest">
          <span>© 2026 FeeliFy</span>
          <span>Scroll for more</span>
        </div>
      </div>
    </main>
  );
}
