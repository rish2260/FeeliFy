"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function ContactPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const questions = [
    {
      key: "name",
      label: "What's your name?",
      placeholder: "John Doe",
      type: "text",
    },
    {
      key: "email",
      label: "What's your email?",
      placeholder: "john@example.com",
      type: "email",
    },
    {
      key: "project",
      label: "Tell us about your project",
      placeholder: "I need a rebranding for my startup...",
      type: "text",
    },
  ];

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Submit
      setStep(step + 1); // Go to success
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      formData[questions[step]?.key as keyof typeof formData]
    ) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col pt-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--acc)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <h1 className="text-xl font-mono uppercase tracking-widest text-[var(--acc)] mb-20 opacity-80">
        Start a Project
      </h1>

      <div className="flex-1 flex items-center justify-center max-w-4xl mx-auto w-full pb-32">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="w-full"
            >
              <div className="flex gap-4 items-baseline mb-8">
                <span className="font-mono text-sm text-[var(--acc)]">
                  0{step + 1}
                </span>
                <span className="font-mono text-sm opacity-30">
                  / 0{questions.length}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
                {questions[step].label}
              </h2>

              <div className="relative group">
                <input
                  autoFocus
                  type={questions[step].type}
                  placeholder={questions[step].placeholder}
                  value={formData[questions[step].key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [questions[step].key]: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-2xl md:text-4xl border-b-2 border-[var(--border)] py-6 focus:outline-none focus:border-[var(--acc)] placeholder-white/10 transition-colors"
                />

                <button
                  onClick={handleNext}
                  disabled={
                    !formData[questions[step].key as keyof typeof formData]
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--acc)] opacity-50 hover:opacity-100 disabled:opacity-20 transition-opacity p-4"
                >
                  <ArrowRight size={32} />
                </button>
              </div>

              <p className="mt-8 font-mono text-xs opacity-40">Press Enter ↵</p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-[var(--acc)] rounded-full flex items-center justify-center mx-auto mb-8 text-black">
                <Check size={48} />
              </div>
              <h2 className="text-5xl font-black mb-6">Received.</h2>
              <p className="text-xl opacity-60 max-w-lg mx-auto leading-relaxed">
                We'll analyze your request and get back to you within 24 hours
                at{" "}
                <span className="text-white border-b border-white/20">
                  {formData.email}
                </span>
                .
              </p>

              <button
                onClick={() => setStep(0)}
                className="mt-12 text-[var(--acc)] font-mono text-sm uppercase tracking-widest hover:text-white transition-colors"
              >
                Start New Inquiry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
