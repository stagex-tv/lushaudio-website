"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Built by engineers and producers,
            <br />
            made for engineers and producers.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Lush Plugins is a small team building the audio tools we always wanted.
            Every plugin is designed with a focus on sound quality, creative
            control, and a workflow that stays out of your way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
