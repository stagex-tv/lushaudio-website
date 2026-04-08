"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="block whitespace-nowrap">Built by engineers and producers,</span>
            <span className="block whitespace-nowrap">made for engineers and producers.</span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Lush Plugins delivers{" "}
            <span className="text-white font-medium">industry-standard professional plugins</span>{" "}
            obsessed with one thing:{" "}
            <span className="text-primary font-semibold">workflow</span>. Every
            interface is ergonomically optimized down to the pixel — button
            placement, knob grouping, and mouse paths all pre-thought to keep
            you in the creative flow and{" "}
            <span className="text-tertiary">out of your way</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
