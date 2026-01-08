"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

// Component to reveal text word by word on scroll
const ScrollRevealParagraph = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={element} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        return (
          <span key={i} className="relative mr-2 md:mr-3">
            <span className="absolute opacity-10">{word}</span>
            <motion.span style={{ opacity }}>{word}</motion.span>
          </span>
        );
      })}
    </p>
  );
};

export default function AboutPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-hidden">
      {/* HEADER */}
      <div className="pt-40 pb-20 px-6 md:px-12 relative">
        <motion.div
          style={{ y: y1 }}
          className="opacity-10 absolute top-20 right-0 text-[20vw] font-black leading-none pointer-events-none"
        >
          STORY
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="font-mono text-xs text-[var(--acc)] uppercase tracking-widest mb-8 block">
            Who We Are
          </span>
          <motion.h1
            style={{ y: y2 }}
            className="text-[10vw] font-black uppercase leading-[0.8] tracking-tighter mb-24"
          >
            About
            <br />
            Feelify<span className="text-[var(--acc)]">.</span>
          </motion.h1>

          <div className="max-w-4xl ml-auto border-l border-[var(--border)] pl-8 md:pl-20 py-12">
            <ScrollRevealParagraph
              text="We are a passionate digital marketing startup dedicated to helping businesses grow. We believe that every brand has a soul, and our job is to reveal it to the world through data-driven strategy and human-centric design."
              className="text-3xl md:text-5xl font-serif leading-tight mb-20"
            />

            <div className="grid gap-12">
              <div className="group">
                <h3 className="font-mono text-sm text-[var(--acc)] uppercase mb-4 tracking-widest">
                  Our Mission
                </h3>
                <ScrollRevealParagraph
                  text="To empower startups, local businesses & entrepreneurs with affordable, impactful digital growth solutions that drive measurable results. We don't just clear the path; we build the highway."
                  className="text-xl md:text-3xl font-light opacity-90 leading-relaxed"
                />
              </div>

              <div className="group">
                <h3 className="font-mono text-sm text-[var(--acc)] uppercase mb-4 tracking-widest">
                  Our Vision
                </h3>
                <ScrollRevealParagraph
                  text="To make every small business a Recognized Brand. We believe every business deserves to shine, regardless of its size. We see a world where creativity and technology bridge the gap between dream and reality."
                  className="text-xl md:text-3xl font-light opacity-90 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER QUOTE */}
      <section className="py-32 px-6 border-t border-[var(--border)] text-center">
        <h2 className="text-[15vw] font-black opacity-5 uppercase leading-none">
          Impact
        </h2>
      </section>
    </div>
  );
}
