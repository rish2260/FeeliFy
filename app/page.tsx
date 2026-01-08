"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  AnimatePresence,
} from "framer-motion";
import {
  Minus,
  Plus,
  Activity,
  Globe,
  Cpu,
  Zap,
  MoveHorizontal,
  ArrowUpRight,
} from "lucide-react";

/* --- UTILS --- */
const ScrambleText = ({ text, active }: { text: string; active: boolean }) => {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{display}</span>;
};

const DecryptText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          let iterations = 0;
          const interval = setInterval(() => {
            setDisplayText(
              text
                .split("")
                .map((letter, index) => {
                  if (index < iterations) return text[index];
                  return characters[
                    Math.floor(Math.random() * characters.length)
                  ];
                })
                .join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, inView]);

  return <span ref={ref}>{displayText}</span>;
};

/* --- 2. PRELOADER --- */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 bg-[#FF3300] z-[99999] flex flex-col justify-between p-8 md:p-12 text-black font-bold"
    >
      <div className="flex justify-between items-start">
        <span>FEELIFY™</span>
        <span>INITIALIZING...</span>
      </div>
      <div className="text-[20vw] leading-none tracking-tighter">
        {Math.min(count, 100)}%
      </div>
    </motion.div>
  );
};

/* --- 4. HERO TEXT 3D --- */
const HeroText3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]); // Reduced skew for subtlety

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotateX = useTransform(y, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(x, [0, windowSize.width], [-10, 10]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY, skewY: skew }}
        className="relative z-10 origin-center"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="text-[12vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter uppercase text-[var(--fg)]"
          >
            Transform
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="text-[12vw] md:text-[13vw] leading-[0.85] font-serif italic tracking-tight opacity-50 text-[var(--fg)]"
          >
            Your
          </motion.h1>
        </div>
        <div className="overflow-hidden flex flex-wrap items-center gap-4 md:gap-8">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
            className="text-[12vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter uppercase text-[var(--fg)]"
          >
            Business
          </motion.h1>
        </div>
      </motion.div>
    </div>
  );
};

const WebGLFlowSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(0);

  // Ref to track active item without re-triggering effect
  const activeItemRef = useRef<number | null>(0);

  const items = [
    {
      id: "01",
      title: "Creative",
      desc: "Energetic, innovative team bringing fresh ideas to make your brand stand out.",
    },
    {
      id: "02",
      title: "Execution",
      desc: "No delays. We move from idea to action fast, without sacrificing quality.",
    },
    {
      id: "03",
      title: "ROI-Focused",
      desc: "Every rupee is optimized to maximize returns and drive measurable results.",
    },
    {
      id: "04",
      title: "Support",
      desc: "24x7 Support on WhatsApp. We are just a ping away, day or night.",
    },
    {
      id: "05",
      title: "Pricing",
      desc: "Transparent, flexible plans for startups and growing brands.",
    },
  ];

  // Configuration for each item's smoke effect
  const ITEM_CONFIG = [
    {
      // Creative - Purple/Pink
      colors: { dark: [0.8, 0.4, 1.0], light: [0.5, 0.0, 0.8] },
      speed: 0.3,
      density: 1.2,
    },
    {
      // Execution - Blue/Cyan
      colors: { dark: [0.0, 0.8, 1.0], light: [0.0, 0.4, 0.8] },
      speed: 0.8, // Fast execution
      density: 0.9,
    },
    {
      // ROI-Focused - Green/Emerald
      colors: { dark: [0.0, 1.0, 0.5], light: [0.0, 0.6, 0.3] },
      speed: 0.4,
      density: 1.1, // Solid return
    },
    {
      // Support - Orange/Gold
      colors: { dark: [1.0, 0.6, 0.0], light: [0.8, 0.4, 0.0] },
      speed: 0.2, // Calm, steady
      density: 1.3, // Warm presence
    },
    {
      // Pricing - Teal/White
      colors: { dark: [0.0, 0.8, 0.8], light: [0.0, 0.5, 0.5] },
      speed: 0.5,
      density: 0.8, // Clear, transparent
    },
  ];

  // Update ref when state changes
  useEffect(() => {
    activeItemRef.current = activeItem;
  }, [activeItem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Smoke Shader
    const vertexShaderSource = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
    const fragmentShaderSource = `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_color;
        uniform float u_speed;
        uniform float u_density;

        float random (in vec2 _st) {
            return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);
        }

        // Based on Morgan McGuire @morgan3d
        // https://www.shadertoy.com/view/4dS3Wd
        float noise (in vec2 _st) {
            vec2 i = floor(_st);
            vec2 f = fract(_st);

            // Four corners in 2D of a tile
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f * f * (3.0 - 2.0 * f);

            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }

        #define NUM_OCTAVES 5

        float fbm ( in vec2 _st) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            // Rotate to reduce axial bias
            mat2 rot = mat2(cos(0.5), sin(0.5),
                            -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(_st);
                _st = rot * _st * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 st = gl_FragCoord.xy/u_resolution.xy;
            st.x *= u_resolution.x/u_resolution.y;

            // Use u_speed to modulate time flow specific to the pattern movement
            float t = u_time * u_speed;

            vec3 color = vec3(0.0);

            vec2 q = vec2(0.);
            q.x = fbm( st + 0.00 * t);
            q.y = fbm( st + vec2(1.0));

            vec2 r = vec2(0.);
            r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*t );
            r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*t);

            float f = fbm(st+r);

            // Enhance density calculation with u_density
            float smokeDensity = f * f * u_density + 0.6 * f;
            float alpha = smoothstep(0.2, 0.9, smokeDensity); 
            
            // Map to requested theme color
            gl_FragColor = vec4(u_color * smokeDensity, alpha * 0.4); 
        }
    `;

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };

    const vert = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const frag = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uColor = gl.getUniformLocation(program, "u_color");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uDensity = gl.getUniformLocation(program, "u_density");

    let w: number, h: number;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    window.addEventListener("resize", resize);
    resize();

    const startTime = Date.now();
    let animId: number;

    // Current interpolation state
    let curColor = [0.5, 0.5, 0.5];
    let curSpeed = 0.5;
    let curDensity = 1.0;

    const render = () => {
      gl.uniform1f(uTime, (Date.now() - startTime) / 1000);

      const isDark = document.documentElement.classList.contains("dark");

      // Read from REF instead of state to check latest hover without re-render
      const idx = activeItemRef.current !== null ? activeItemRef.current : 0;
      const config = ITEM_CONFIG[idx] || ITEM_CONFIG[0];

      const hovered = activeItemRef.current !== null;

      // Determine target values
      let targetColor;
      if (!hovered) {
        // Default idle state
        targetColor = isDark ? [0.8, 0.8, 0.8] : [0.2, 0.2, 0.2];
      } else {
        // Active item state
        targetColor = isDark ? config.colors.dark : config.colors.light;
      }

      const targetSpeed = hovered ? config.speed : 0.2;
      const targetDensity = hovered ? config.density : 0.8;

      // Smooth interpolation (lerp)
      curColor[0] += (targetColor[0] - curColor[0]) * 0.05;
      curColor[1] += (targetColor[1] - curColor[1]) * 0.05;
      curColor[2] += (targetColor[2] - curColor[2]) * 0.05;
      curSpeed += (targetSpeed - curSpeed) * 0.05;
      curDensity += (targetDensity - curDensity) * 0.05;

      gl.uniform3f(uColor, curColor[0], curColor[1], curColor[2]);
      gl.uniform1f(uSpeed, curSpeed);
      gl.uniform1f(uDensity, curDensity);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []); // Empty dependency array = Runs once, Loop persists!

  return (
    <section
      id="why-us"
      className="relative min-h-screen bg-[var(--surface)] overflow-hidden flex items-center justify-center border-y border-[var(--border)] transition-colors duration-700"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        <div className="hidden md:flex flex-col justify-center pointer-events-none text-[var(--fg)]">
          <div className="text-[var(--acc)] font-mono text-xs uppercase tracking-widest mb-4">
            Why Choose Us?
          </div>
          <h2 className="text-6xl font-black mb-6 leading-tight tracking-tighter">
            GROWTH
            <br />
            PARTNERS
          </h2>
          <p className="opacity-80 max-w-md text-lg leading-relaxed">
            We combine creativity with data-driven strategies to deliver real
            results. No delays, no confusion—just visible growth.
          </p>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveItem(i)}
              onMouseLeave={() => setActiveItem(null)}
              className={`group relative p-6 border-l-2 transition-all duration-500 cursor-pointer ${
                activeItem === i
                  ? "border-[var(--acc)] bg-[var(--bg)]/90 backdrop-blur-md pl-10 shadow-lg"
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              <div className="flex items-baseline gap-4 mb-1">
                <span
                  className={`font-mono text-sm transition-colors ${
                    activeItem === i ? "text-[var(--acc)]" : "text-neutral-500"
                  }`}
                >
                  {item.id}
                </span>
                <h3
                  className={`text-3xl font-black uppercase tracking-tighter transition-colors ${
                    activeItem === i ? "text-[var(--fg)]" : "text-neutral-500"
                  }`}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className={`text-sm transition-all duration-500 overflow-hidden ${
                  activeItem === i
                    ? "h-auto opacity-70 mt-2 text-[var(--fg)]"
                    : "h-0 opacity-0"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- 6. THE MONOLITHS (SERVICES) --- */
const TheMonoliths = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Add physics for smoother scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    damping: 15,
    stiffness: 100,
    restDelta: 0.001,
  });

  const services = [
    {
      title: "SEO",
      cat: "Growth",
      img: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=2680&auto=format&fit=crop",
    },
    {
      title: "Social Media",
      cat: "Community",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: "SEM / Ads",
      cat: "Traffic",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Content Mkt.",
      cat: "Story",
      img: "https://images.unsplash.com/photo-1493612276216-9c7837d0eb77?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Web Design",
      cat: "Identity",
      img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2664&auto=format&fit=crop",
    },
    {
      title: "Copywriting",
      cat: "Voice",
      img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format\u0026fit=crop",
    },
    {
      title: "Scripting",
      cat: "Media",
      img: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=2673&auto=format&fit=crop",
    },
    {
      title: "Performance",
      cat: "Analytics",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Influencer",
      cat: "Reach",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2528&auto=format&fit=crop",
    },
    {
      title: "Branding",
      cat: "Recall",
      img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2674&auto=format&fit=crop",
    },
  ];

  // Calculate total scrollable width
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current) {
        // Total width - viewport width = distance to scroll
        const range = contentRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Map vertical scroll progress to horizontal translation (precise pixels)
  // Use smoothProgress here instead of raw scrollYProgress
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={targetRef}
      id="services"
      className="relative h-[300vh] bg-[var(--surface)]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-[var(--border)]">
        <div className="px-6 md:px-12 mb-8 flex justify-between items-end absolute top-32 left-0 right-0 z-10 pointer-events-none">
          {/* Header Content */}
          <div className="flex items-center gap-4 text-[var(--fg)]">
            <div className="w-3 h-3 bg-[var(--acc)] rounded-full animate-pulse" />
            <h2 className="text-sm font-mono uppercase tracking-widest opacity-80">
              Our Services // Scroll Down to Explore
            </h2>
          </div>
        </div>

        <motion.div
          ref={contentRef}
          style={{ x }}
          className="flex gap-8 md:gap-16 px-12 will-change-transform w-max"
        >
          {services.map((service, i) => (
            // Pass SMMOTH progress to cards
            <ServiceCard
              key={i}
              service={service}
              i={i}
              progress={smoothProgress}
            />
          ))}
        </motion.div>

        {/* Progress Bar mapped to scroll */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex items-center gap-6 z-10">
          <div className="flex-1 h-[1px] bg-[var(--border)] overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, originX: 0 }}
              className="h-full bg-[var(--acc)]"
            />
          </div>
          <div className="font-mono text-xs text-[var(--fg)] opacity-50">
            {services.length} Services
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  service,
  i,
  progress,
}: {
  service: { title: string; cat: string; img: string };
  i: number;
  progress: any; // Using any to avoid MotionValue<number> import complexity if unnecessary, or strictly import it.
  // Ideally MotionValue<number> but let's keep it simple for this replacement context
}) => {
  const parallax = useTransform(progress, [0, 1], ["0%", `${(i - 2) * 5}%`]);

  return (
    <motion.div
      className="relative h-[60vh] w-[85vw] md:w-[45vw] flex-shrink-0 group"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full h-full bg-white dark:bg-black relative overflow-hidden rounded-sm border-l border-[var(--border)]">
        <motion.div
          className="absolute inset-0 w-[120%] h-full -left-[10%]"
          style={{ x: parallax }}
        >
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
          />
        </motion.div>
        {/* Updated Gradient: Forces dark overlay on hover for better text contrast */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 bg-gradient-to-t from-white/90 dark:from-black/80 group-hover:from-black/90 to-transparent transition-all duration-500">
          <div className="overflow-hidden">
            <h3 className="text-[10vw] md:text-[5vw] font-black uppercase leading-[0.85] tracking-tighter text-[var(--fg)] group-hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              {service.title}
            </h3>
          </div>
          <div className="flex justify-between items-end mt-4 border-t border-[var(--fg)]/20 group-hover:border-white/20 pt-4 transition-colors duration-500">
            <span className="font-mono text-sm text-[var(--acc)]">
              {service.cat}
            </span>
            <div className="flex items-center gap-2 text-[var(--fg)]/60 group-hover:text-white/60 font-mono text-xs uppercase transition-colors duration-500">
              <span>Details</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
      <span className="absolute -top-12 -left-2 text-[8rem] font-black text-[var(--fg)] opacity-[0.03] pointer-events-none select-none z-0">
        0{i + 1}
      </span>
    </motion.div>
  );
};

/* --- 7. THE DIGITAL LOOM (WHAT MAKES US DIFFERENT) --- */
const DigitalLoom = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const capabilities = [
    {
      id: "01",
      title: "DATA DRIVEN",
      desc: "We don't guess! We use the latest analytics and reporting tools to make smart, informed decisions that grow your brand efficiently.",
      tags: ["Analytics", "Intelligence"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    },
    {
      id: "02",
      title: "AUTOMATION",
      desc: "Save time and boost results with cutting-edge digital tools and streamlined automations that keep you ahead of your competition.",
      tags: ["Tools", "Efficiency"],
      img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2574&auto=format&fit=crop",
    },
    {
      id: "03",
      title: "TRANSPARENCY",
      desc: "No hidden fees, no generic reports. You get clear, open updates and full insight into every campaign, every step of the way.",
      tags: ["Trust", "Clarity"],
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    },
    {
      id: "04",
      title: "CLIENT FIRST",
      desc: "We take the time to understand your goals, your challenges, and your brand voice so every strategy delivers real impact for you.",
      tags: ["Partnership", "Care"],
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="about"
      className="py-32 px-4 md:px-12 bg-[var(--bg)] transition-colors duration-500"
    >
      <div className="max-w-[95vw] mx-auto">
        <div className="mb-20 flex items-end justify-between border-b border-[var(--border)] pb-8">
          <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none text-[var(--fg)] opacity-10">
            THE
            <br />
            DIFFERENCE
          </h2>
          <span className="font-mono text-sm text-[var(--acc)]">
            [ CORE VALUES ]
          </span>
        </div>

        <div className="flex flex-col">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ height: activeItem === index ? "50vh" : "120px" }}
              className="relative border-b border-[var(--border)] overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] group cursor-pointer"
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeItem === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.img}
                  alt="bg"
                  className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
              </motion.div>

              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-8">
                    <span className="font-mono text-sm text-[var(--acc)]">
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-4xl md:text-7xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                        activeItem === index
                          ? "text-[var(--acc)]"
                          : "text-[var(--fg)]"
                      }`}
                    >
                      <ScrambleText
                        text={item.title}
                        active={activeItem === index}
                      />
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeItem === index ? 90 : 0 }}
                    className="text-[var(--fg)]"
                  >
                    {activeItem === index ? (
                      <Minus size={32} />
                    ) : (
                      <Plus size={32} />
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeItem === index ? 1 : 0,
                    y: activeItem === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col md:flex-row justify-between items-end gap-8"
                >
                  <p className="max-w-xl text-xl md:text-2xl font-serif text-[var(--fg)] leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex gap-4">
                    {item.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="px-4 py-2 border border-[var(--border)] rounded-full text-xs font-mono uppercase tracking-widest text-[var(--fg)] bg-[var(--bg)]/50 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- 8. SYSTEM METRICS (IMPACT) --- */
const Globe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || 300);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 300);
    let rotation = 0;
    const dots: { x: number; y: number; z: number }[] = [];
    const numDots = 150; // Optimized for performance

    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(-1 + (2 * i) / numDots);
      const theta = Math.sqrt(numDots * Math.PI) * phi;
      dots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }

    let animId: number;
    const render = () => {
      if (!isVisibleRef.current) return; // Skip render if not visible

      ctx.clearRect(0, 0, width, height);

      // Gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        120
      );
      grad.addColorStop(0, "rgba(255, 51, 0, 0.05)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      rotation += 0.005;
      const cx = width / 2,
        cy = height / 2,
        scale = Math.min(width, height) * 0.35;

      const projected = dots.map((d) => {
        const x = d.x * Math.cos(rotation) - d.z * Math.sin(rotation);
        const z = d.z * Math.cos(rotation) + d.x * Math.sin(rotation);
        return { x, y: d.y, z };
      });
      projected.forEach((p) => {
        const alpha = (p.z + 1) / 2;
        if (p.z > -0.5) {
          const size = 1 + alpha * 1.5;
          const px = cx + p.x * scale;
          const py = cy + p.y * scale;
          ctx.fillStyle = `rgba(255, 51, 0, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    // Observer for visibility
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animId);
          render();
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.1 }
    );

    if (canvas) observerRef.current.observe(canvas);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || 300;
      height = canvas.height = canvas.parentElement?.offsetHeight || 300;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      observerRef.current?.disconnect();
    };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const ContinuousGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || 300);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 300);
    const step = 4,
      maxPoints = Math.ceil(width / step) + 5;
    const data: number[] = [];

    for (let i = 0; i < maxPoints; i++) {
      const t = i / maxPoints;
      data.push(height * 0.9 - t * height * 0.7 + (Math.random() - 0.5) * 10);
    }

    let scrollOffset = 0;
    let animId: number;

    const render = () => {
      if (!isVisibleRef.current) return;

      ctx.clearRect(0, 0, width, height);

      if (scrollOffset >= step) {
        data.shift();
        const last = data[data.length - 1],
          target = height * 0.25;
        data.push(last + (target - last) * 0.05 + (Math.random() - 0.5) * 15);
        scrollOffset = 0;
      }
      scrollOffset += 1;

      // Fill
      ctx.beginPath();
      ctx.moveTo(-step, height);
      for (let i = 0; i < data.length; i++) {
        const x = i * step - scrollOffset,
          y = data[i];
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(255, 51, 0, 0.2)");
      grad.addColorStop(1, "rgba(255, 51, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const x = i * step - scrollOffset,
          y = data[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#FF3300";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.stroke();

      const lastIndex = data.length - 1,
        lastX = lastIndex * step - scrollOffset,
        lastY = data[lastIndex];
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FF3300";
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animId);
          render();
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.1 }
    );

    if (canvas) observerRef.current.observe(canvas);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || 300;
      height = canvas.height = canvas.parentElement?.offsetHeight || 300;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      observerRef.current?.disconnect();
    };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const TerminalLog = () => {
  const [lines, setLines] = useState([
    { text: "> init_feelifysolutions", status: "", id: 0 },
  ]);
  useEffect(() => {
    const sequence = [
      { text: "> analyzing_seo...", status: "OK" },
      { text: "> optimizing_content...", status: "..." },
      { text: "> boosting_presence...", status: "OK" },
      { text: "> campaign_launch_v1", status: "" },
      { text: "> tracking_roi...", status: "..." },
      { text: "> success", status: "100%" },
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [
          ...prev,
          { ...sequence[i % sequence.length], id: Date.now() },
        ];
        if (newLines.length > 7) newLines.shift();
        return newLines;
      });
      i++;
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[10px] space-y-1 h-full flex flex-col justify-end text-[var(--fg)] opacity-80">
      {lines.map((l) => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          <span>{l.text}</span>
          {l.status && <span className="text-[var(--acc)]">{l.status}</span>}
        </motion.div>
      ))}
    </div>
  );
};

const SystemMetrics = () => {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg)] transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {/* Item 1: GLOBAL */}
        <div className="min-h-[450px] relative overflow-hidden group hover:bg-[var(--surface)] transition-colors duration-300 flex flex-col justify-between">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Globe3D />
          </div>
          <div className="relative z-10 p-10 h-full flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <Globe className="text-[var(--acc)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--fg)] opacity-50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                NETWORK
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-[var(--fg)] leading-none traling-tighter">
                GLOBAL
              </h3>
              <p className="font-mono text-xs text-[var(--fg)] opacity-70 bg-black/40 inline-block backdrop-blur-sm p-2 rounded border border-white/10">
                Reach: Nationwide
                <br />
                Impact: Limitless
              </p>
            </div>
          </div>
        </div>

        {/* Item 2: GROWTH */}
        <div className="min-h-[450px] p-10 relative overflow-hidden group hover:bg-[var(--surface)] transition-colors duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start relative z-10">
            <Activity className="text-[var(--acc)]" />
            <span className="font-mono text-xs text-[var(--fg)] opacity-50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              GROWTH
            </span>
          </div>
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <ContinuousGraph />
          </div>
          <div className="relative z-10 pt-4 flex justify-between items-end bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent p-4 -mx-4 -mb-4">
            <div>
              <h3 className="text-4xl font-black text-[var(--fg)] leading-none">
                High
              </h3>
              <p className="font-mono text-xs text-[var(--fg)] opacity-60 mt-1">
                ROI Yield
              </p>
            </div>
            <div className="w-2 h-2 bg-[var(--acc)] rounded-full animate-ping mb-2" />
          </div>
        </div>

        {/* Item 3: EXECUTION */}
        <div className="min-h-[450px] p-10 relative overflow-hidden group hover:bg-[var(--surface)] transition-colors duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <Cpu className="text-[var(--acc)]" />
            <span className="font-mono text-xs text-[var(--fg)] opacity-50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              EXECUTION
            </span>
          </div>
          <div className="h-48 overflow-hidden mask-image-b mb-6 relative font-mono text-xs opacity-70">
            <TerminalLog />
          </div>
          <div className="relative z-10 border-t border-[var(--border)] pt-4">
            <h3 className="text-4xl font-black text-[var(--fg)] mb-1">Fast</h3>
            <p className="font-mono text-xs text-[var(--fg)] opacity-60">
              Deployment Speed
              <br />
              No Delays
            </p>
          </div>
        </div>

        {/* Item 4: SUPPORT */}
        <div className="min-h-[450px] p-10 relative overflow-hidden group hover:bg-[var(--surface)] transition-colors duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Zap className="text-[var(--acc)]" />
            <span className="font-mono text-xs text-[var(--fg)] opacity-50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              SUPPORT
            </span>
          </div>
          <div className="text-right mt-auto">
            <h3 className="text-[8rem] leading-[0.8] font-black text-[var(--acc)] tracking-tighter">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                24/7
              </motion.span>
            </h3>
            <p className="font-mono text-xs text-[var(--fg)] opacity-60 mt-4">
              WhatsApp Support
              <br />
              Always Online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandTicker = () => {
  const brands = [
    "NEXUS",
    "VERTEX",
    "CYBERDYNE",
    "MASSIVE",
    "OMNI",
    "CORP",
    "FUTURE",
    "SYSTEMS",
  ];
  const allBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 border-y border-[var(--border)] bg-[var(--bg)] overflow-hidden flex relative z-10">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />

      <motion.div
        className="flex gap-16 md:gap-32 w-max"
        animate={{ x: "-33%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {allBrands.map((b, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-black text-[var(--fg)] opacity-20 uppercase tracking-tighter whitespace-nowrap hover:opacity-100 hover:text-[var(--acc)] hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            {b}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

/* --- MAIN APP --- */
export default function Page() {
  const [loading, setLoading] = useState(true);

  // Scroll hooks if needed globally, but HeroText3D handles its own.

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-32 pb-20">
          <div className="max-w-[95vw] mx-auto z-10">
            <HeroText3D />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-32 left-6 md:left-12 max-w-[80vw] md:max-w-2xl px-4 md:px-0 z-20"
          >
            <p className="font-mono text-xs md:text-sm leading-relaxed uppercase tracking-wide opacity-80 text-[var(--acc)] mb-4">
              We Don&apos;t Just Market - We Build Brands that People Feel.
            </p>
            <p className="font-mono text-[10px] md:text-xs leading-relaxed uppercase tracking-wide text-neutral-400">
              Empowering startups, local businesses & entrepreneurs with
              affordable, impactful digital growth solutions.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 border border-[var(--acc)] text-[var(--acc)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--acc)] hover:text-white transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>
        </section>

        <BrandTicker />

        {/* --- WHO WE ARE / MISSION --- */}
        <section className="min-h-[60vh] md:min-h-[80vh] flex items-center py-20 border-t border-[var(--border)]">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 font-mono text-xs md:text-sm tracking-widest uppercase opacity-40 sticky top-32 h-fit text-[var(--fg)]">
              (001) <br /> Who We Are
            </div>
            <div className="md:col-span-8 flex flex-col gap-12">
              <h3 className="text-3xl md:text-6xl font-serif leading-[1.2] text-[var(--fg)]">
                A passionate digital marketing startup dedicated to{" "}
                <span className="text-[var(--acc)] italic">
                  <DecryptText text="Helping Businesses Grow" />
                </span>
                .
              </h3>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="font-mono text-sm text-[var(--acc)] uppercase mb-2">
                    Our Mission
                  </h4>
                  <p className="text-lg opacity-80">
                    To empower startups, local businesses & entrepreneurs with
                    affordable, impactful digital growth solutions that drive
                    measurable results.
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-sm text-[var(--acc)] uppercase mb-2">
                    Our Vision
                  </h4>
                  <p className="text-lg opacity-80">
                    To make every small business a Recognized Brand. We believe
                    every business deserves to shine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WebGLFlowSection />
        <TheMonoliths />
        <DigitalLoom />
        <SystemMetrics />
      </main>
    </>
  );
}
