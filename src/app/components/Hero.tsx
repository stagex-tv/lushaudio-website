"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const words = [
  "PLUGINS",
  "AUDIO",
  "HARMONIX",
  "VERB",
  "COMP",
  "PRO Q",
  "DELAY",
  "CLIPPER",
  "LIMITER",
  "DE-ESSER",
  "GATE",
];

const DISPLAY_TIME = 2200;
const LETTER_STAGGER = 35;

function RollingWord({
  word,
  cycle,
  className,
}: {
  word: string;
  cycle: number;
  className?: string;
}) {
  const [charStates, setCharStates] = useState<boolean[]>(() =>
    word.split("").map(() => true)
  );
  const [displayWord, setDisplayWord] = useState(word);
  const prevCycleRef = useRef(cycle);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (cycle === prevCycleRef.current) return;
    prevCycleRef.current = cycle;

    // Clear pending timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const oldWord = displayWord;
    const oldLen = oldWord.length;

    // Phase 1: Roll out old word right-to-left
    for (let i = 0; i < oldLen; i++) {
      const idx = oldLen - 1 - i;
      const t = setTimeout(() => {
        setCharStates((prev) => {
          const next = [...prev];
          next[idx] = false;
          return next;
        });
      }, i * LETTER_STAGGER);
      timeoutsRef.current.push(t);
    }

    // Phase 2: Switch word and roll in left-to-right
    const switchDelay = oldLen * LETTER_STAGGER + 60;
    const t2 = setTimeout(() => {
      setDisplayWord(word);
      const newLen = word.length;
      setCharStates(new Array(newLen).fill(false));

      for (let i = 0; i < newLen; i++) {
        const t = setTimeout(() => {
          setCharStates((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * LETTER_STAGGER);
        timeoutsRef.current.push(t);
      }
    }, switchDelay);
    timeoutsRef.current.push(t2);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [cycle, word]);

  const chars = displayWord.split("");

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={`${cycle}-${i}`}
          className="inline-block"
          style={{
            opacity: charStates[i] ? 1 : 0,
            transform: charStates[i] ? "translateY(0)" : "translateY(0.3em)",
            transition: "opacity 180ms ease-out, transform 180ms ease-out",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (wordIndexRef.current + 1) % words.length;
      wordIndexRef.current = nextIndex;
      setWordIndex(nextIndex);
      setCycle((c) => c + 1);
    }, DISPLAY_TIME);
    return () => clearInterval(interval);
  }, []);

  const currentWord = words[wordIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
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

        {/* Desktop: inline on one line */}
        <motion.h1
          layout
          transition={{ layout: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1.0] } }}
          className="hidden md:block font-bold tracking-tight mb-6 whitespace-nowrap text-8xl"
        >
          <span>LUSH </span>
          <RollingWord
            word={currentWord}
            cycle={cycle}
            className="text-primary text-glow-primary"
          />
        </motion.h1>

        {/* Mobile: stacked */}
        <div className="md:hidden font-bold tracking-tight mb-6 text-center">
          <div className="text-6xl mb-2">LUSH</div>
          <div className="text-5xl whitespace-nowrap">
            <RollingWord
              word={currentWord}
              cycle={cycle}
              className="text-primary text-glow-primary"
            />
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
