"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const words = [
  "AUDIO",
  "PLUGINS",
  "VERB",
  "COMP",
  "PRO Q",
  "DELAY",
  "GATE",
  "LIMITER",
  "CLIPPER",
  "DE-ESSER",
  "HARMONIX",
  "AUTO-TUNE",
  "SATURATION",
  "MULTI-BAND",
];

const DISPLAY_TIME = 2500; // total time per word (visible + transition)
const TRANSITION_TIME = 400; // fixed transition time for all words

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const prev = indexRef.current;
      indexRef.current = (indexRef.current + 1) % words.length;
      setPrevIndex(prev);
      setIndex(indexRef.current);
    }, DISPLAY_TIME);

    return () => clearInterval(interval);
  }, []);

  const currentWord = words[index];
  const chars = currentWord.split("");

  const renderLetters = (prefix: string) => {
    const stagger = chars.length > 1 ? (TRANSITION_TIME / 1000 - 0.22) / (chars.length - 1) : 0;
    return (
      <span key={`${prefix}-${index}`} className="inline-block text-primary text-glow-primary">
        {chars.map((char, i) => (
          <span
            key={i}
            className="letter letter-in"
            style={{ animationDelay: `${i * stagger}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <style jsx>{`
        .letter {
          display: inline-block;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes letterIn {
          from {
            opacity: 0;
            transform: translate3d(0, 0.4em, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .letter-in {
          animation: letterIn 0.22s ease-out forwards;
        }
        @keyframes mobileRollIn {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes mobileRollOut {
          from {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          to {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
        }
        .mobile-word-container {
          position: relative;
          height: 1.2em;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-roll-in {
          animation: mobileRollIn 0.4s ease-out forwards;
          will-change: transform, opacity;
        }
        .mobile-roll-out {
          animation: mobileRollOut 0.4s ease-in forwards;
          position: absolute;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(121,0,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(121,0,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/6 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-tertiary text-sm tracking-[0.3em] uppercase mb-6"
        >
          Audio Tools for Creators
        </motion.p>

        {/* Desktop: inline */}
        <motion.h1
          layout
          transition={{ layout: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1.0] } }}
          className="hidden md:block font-bold tracking-tight mb-6 whitespace-nowrap text-8xl text-wave"
        >
          <span>LUSH </span>
          {renderLetters("d")}
        </motion.h1>

        {/* Mobile: stacked with rolling word */}
        <div className="md:hidden font-bold tracking-tight mb-6 text-center">
          <div className="text-6xl mb-2 text-wave">LUSH</div>
          <div className="text-5xl whitespace-nowrap mobile-word-container text-primary text-glow-primary">
            {prevIndex >= 0 && (
              <span key={`mo-${prevIndex}`} className="mobile-roll-out">
                {words[prevIndex]}
              </span>
            )}
            <span key={`mi-${index}`} className={prevIndex >= 0 ? "mobile-roll-in" : ""}>
              {currentWord}
            </span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-zinc-400 text-lg md:text-xl mx-auto mb-10 whitespace-nowrap"
        >
          Premium audio plugins crafted for modern music production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#plugins"
            className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:brightness-110 transition-all glow-primary"
          >
            Explore Plugins
          </a>
          <a
            href="#about"
            className="px-8 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:border-tertiary/50 hover:text-tertiary transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
