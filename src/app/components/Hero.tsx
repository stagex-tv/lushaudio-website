"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const words = [
  "PLUGINS",
  "AUDIO",
  "VERB",
  "COMP",
  "PRO Q",
  "DELAY",
  "GATE",
  "LIMITER",
  "CLIPPER",
  "DE-ESSER",
  "HARMONIX",
];

const DISPLAY_TIME = 2500; // total time per word (visible + transition)
const TRANSITION_TIME = 400; // fixed transition time for all words

export default function Hero() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
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
          className="hidden md:block font-bold tracking-tight mb-6 whitespace-nowrap text-8xl"
        >
          <span>LUSH </span>
          {renderLetters("d")}
        </motion.h1>

        {/* Mobile: stacked */}
        <div className="md:hidden font-bold tracking-tight mb-6 text-center">
          <div className="text-6xl mb-2">LUSH</div>
          <div className="text-5xl whitespace-nowrap">
            {renderLetters("m")}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-zinc-400 text-lg md:text-xl max-w-md mx-auto mb-10"
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

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 rounded-full border border-zinc-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
