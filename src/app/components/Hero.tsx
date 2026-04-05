"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
const LETTER_STAGGER = 40; // ms between each letter rolling in

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState<{ char: string; visible: boolean }[]>(
    () => words[0].split("").map((c) => ({ char: c, visible: true }))
  );
  const [isRolling, setIsRolling] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Clear any pending timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      const currentWord = words[wordIndex];
      const nextIndex = (wordIndex + 1) % words.length;
      const nextWord = words[nextIndex];

      setIsRolling(true);

      // Phase 1: Roll out current letters one by one (right to left)
      const rollOutLetters = currentWord.split("").map((c) => ({ char: c, visible: true }));
      currentWord.split("").forEach((_, i) => {
        const reverseI = currentWord.length - 1 - i;
        const t = setTimeout(() => {
          rollOutLetters[reverseI] = { ...rollOutLetters[reverseI], visible: false };
          setLetters([...rollOutLetters]);
        }, i * LETTER_STAGGER);
        timeoutsRef.current.push(t);
      });

      // Phase 2: After rollout, switch to new word and roll in (left to right)
      const rollOutDuration = currentWord.length * LETTER_STAGGER + 80;
      const switchTimeout = setTimeout(() => {
        setWordIndex(nextIndex);
        const newLetters = nextWord.split("").map((c) => ({ char: c, visible: false }));
        setLetters(newLetters);

        nextWord.split("").forEach((_, i) => {
          const t = setTimeout(() => {
            newLetters[i] = { ...newLetters[i], visible: true };
            setLetters([...newLetters]);
            if (i === nextWord.length - 1) {
              setIsRolling(false);
            }
          }, i * LETTER_STAGGER);
          timeoutsRef.current.push(t);
        });
      }, rollOutDuration);
      timeoutsRef.current.push(switchTimeout);
    }, DISPLAY_TIME);

    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [wordIndex]);

  const currentWord = words[wordIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(121,0,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(121,0,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow — purple/blue blend */}
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

        {/* Desktop: inline on one line with smooth drift */}
        <motion.h1
          layout
          transition={{ layout: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1.0] } }}
          className="hidden md:block font-bold tracking-tight mb-6 whitespace-nowrap text-8xl"
        >
          <span>LUSH </span>
          <span className="inline-block text-primary text-glow-primary">
            {letters.map((letter, i) => (
              <span
                key={`${wordIndex}-${i}`}
                className="inline-block transition-all"
                style={{
                  opacity: letter.visible ? 1 : 0,
                  transform: letter.visible ? "translateY(0)" : "translateY(0.3em)",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-out",
                  fontSize: currentWord === "DE-ESSER" ? "0.7em" : undefined,
                }}
              >
                {letter.char === " " ? "\u00A0" : letter.char}
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Mobile: stacked — LUSH on top, purple word below */}
        <div className="md:hidden font-bold tracking-tight mb-6 text-center">
          <div className="text-6xl mb-2">LUSH</div>
          <div className="text-5xl text-primary text-glow-primary whitespace-nowrap">
            {letters.map((letter, i) => (
              <span
                key={`${wordIndex}-${i}`}
                className="inline-block transition-all"
                style={{
                  opacity: letter.visible ? 1 : 0,
                  transform: letter.visible ? "translateY(0)" : "translateY(0.3em)",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-out",
                }}
              >
                {letter.char === " " ? "\u00A0" : letter.char}
              </span>
            ))}
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
