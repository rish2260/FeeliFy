"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 bg-[var(--surface)] relative z-10 w-full overflow-hidden border-t border-[var(--border)] transition-colors duration-700"
    >
      <div className="z-10 relative mb-20 w-full max-w-[95vw] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-3xl"
          >
            <div className="mb-16">
              <h4 className="font-mono text-sm text-[var(--acc)] uppercase tracking-widest mb-6">
                Get In Touch
              </h4>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--fg)] mb-8 leading-[0.9] tracking-tighter uppercase transition-colors">
                Ready to transform
                <br />
                your business?
              </h2>
              <p className="text-xl md:text-2xl text-[var(--fg)] opacity-60 leading-relaxed font-light max-w-xl transition-colors">
                Let&apos;s Build Something Great Together. Whether you&apos;re a
                startup looking to make your mark or an established business
                ready to scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
              <div className="group">
                <div className="flex items-center gap-4 text-[var(--acc)] mb-4">
                  <Mail size={20} />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/60 group-hover:text-[var(--fg)] transition-colors">
                    Email
                  </span>
                </div>
                <a
                  href="mailto:contact@feelifysolution.com"
                  className="text-xl md:text-2xl font-bold text-[var(--fg)] hover:text-[var(--acc)] transition-colors block border-b border-[var(--border)] pb-4 hover:border-[var(--acc)]"
                >
                  contact@feelifysolution.com
                </a>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 text-[var(--acc)] mb-4">
                  <Phone size={20} />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/60 group-hover:text-[var(--fg)] transition-colors">
                    Phone
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+916394806825"
                    className="text-xl md:text-2xl font-bold text-[var(--fg)] hover:text-[var(--acc)] transition-colors"
                  >
                    +91 63948 06825
                  </a>
                  <a
                    href="tel:+919554739955"
                    className="text-xl md:text-2xl font-bold text-[var(--fg)] hover:text-[var(--acc)] transition-colors opacity-60 hover:opacity-100"
                  >
                    +91 95547 39955
                  </a>
                </div>
              </div>

              <div className="group md:col-span-2">
                <div className="flex items-center gap-4 text-[var(--acc)] mb-4">
                  <MapPin size={20} />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/60 group-hover:text-[var(--fg)] transition-colors">
                    Locate
                  </span>
                </div>
                <p className="text-xl text-[var(--fg)] leading-relaxed max-w-md opacity-80 transition-colors">
                  Vikas Nagar, Mama Chauraha, Lucknow, Uttar Pradesh
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-xs font-mono uppercase tracking-widest text-[var(--acc)] hover:text-[var(--fg)] transition-colors"
                >
                  View on Google Maps <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full max-w-xl"
          >
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-8">
                <div className="group relative">
                  <input
                    type="text"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[var(--border)] py-4 text-xl text-[var(--fg)] focus:outline-none focus:border-[var(--acc)] transition-colors"
                  />
                  <label className="absolute left-0 top-4 text-[var(--fg)] opacity-40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-[var(--acc)] peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:opacity-100">
                    Your Name
                  </label>
                </div>

                <div className="group relative">
                  <input
                    type="email"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[var(--border)] py-4 text-xl text-[var(--fg)] focus:outline-none focus:border-[var(--acc)] transition-colors"
                  />
                  <label className="absolute left-0 top-4 text-[var(--fg)] opacity-40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-[var(--acc)] peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:opacity-100">
                    Email Address
                  </label>
                </div>

                <div className="group relative">
                  <input
                    type="tel"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[var(--border)] py-4 text-xl text-[var(--fg)] focus:outline-none focus:border-[var(--acc)] transition-colors"
                  />
                  <label className="absolute left-0 top-4 text-[var(--fg)] opacity-40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-[var(--acc)] peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:opacity-100">
                    Phone Number
                  </label>
                </div>

                <div className="group relative">
                  <textarea
                    rows={4}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[var(--border)] py-4 text-xl text-[var(--fg)] focus:outline-none focus:border-[var(--acc)] transition-colors resize-none"
                  ></textarea>
                  <label className="absolute left-0 top-4 text-[var(--fg)] opacity-40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-[var(--acc)] peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:opacity-100">
                    Your Message
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-12 py-5 bg-[var(--acc)] text-black font-black uppercase tracking-widest hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300 transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-20 border-t border-[var(--border)]">
        <div className="flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest opacity-60 text-[var(--fg)]">
          <a href="#" className="hover:text-[var(--acc)] transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-[var(--acc)] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[var(--acc)] transition-colors">
            WhatsApp
          </a>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs uppercase tracking-widest opacity-40 text-[var(--fg)]">
            © 2024 Feelify Solutions.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
