"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Cpu,
  Activity,
  Globe,
  Zap,
  Star,
  Share2,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./providers/ThemeProvider";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { name: "Home", href: "/", icon: LayoutGrid },
    { name: "Services", href: "/services", icon: Cpu },
    { name: "Work", href: "/clients", icon: Activity },
    { name: "Brands", href: "/brands", icon: Star },
    { name: "Media", href: "/influencers-and-media", icon: Share2 },
    { name: "About", href: "/about", icon: Globe },
    { name: "Contact", href: "/contact", icon: Zap },
  ];

  const menuVariants = {
    closed: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
    open: {
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[var(--acc)] z-[40] flex flex-col justify-center px-6 md:px-20 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 min-h-full justify-center py-20">
              {menuItems.map((item, i) => (
                <div key={i} className="overflow-hidden group">
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)} // Close menu on item click
                      className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter group-hover:text-white transition-colors block w-fit"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-10 left-6 md:left-20 flex gap-8 text-black font-mono text-sm uppercase tracking-widest pointer-events-none md:pointer-events-auto">
              <span>Instagram</span>
              <span>LinkedIn</span>
              <span>Twitter</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none"
      >
        <div className="flex flex-col mix-blend-difference text-[var(--inverse)] pointer-events-auto">
          <Link href="/" className="text-xl font-black tracking-tighter">
            FEELIFY.
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            Solutions
          </span>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={toggleTheme}
            className="w-12 h-12 border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors relative z-[60] bg-[var(--bg)]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-4 cursor-pointer relative z-[60]"
          >
            <div
              className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all bg-[var(--bg)] ${
                isOpen
                  ? "border-black text-black !bg-transparent"
                  : "border-[var(--border)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              }`}
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </div>
          </button>
        </div>
      </motion.nav>
    </>
  );
};
