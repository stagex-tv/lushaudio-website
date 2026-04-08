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

          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Lush Plugins is a small team obsessed with one thing:{" "}
            <span className="text-white font-medium">workflow</span>. We&apos;re
            building the audio tools we always wanted — studio-grade sound at a
            price that works for up-and-coming artists and seasoned pros alike.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            At the heart of it all is{" "}
            <span className="text-primary font-semibold">Lush Studio</span> — our
            flagship suite and the ultimate workflow tool. Your entire vocal
            chain, backup chain, or master chain becomes a{" "}
            <span className="text-white font-medium">single plugin</span>. Walk
            into any studio, sign into your Lush account on their machine,
            download the suite, and every preset you&apos;ve built is ready to
            go in seconds. No more rebuilding sessions. No more missing plugins.
            No more lost time.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            We&apos;re shipping Lush Studio with{" "}
            <span className="text-white font-medium">dozens of presets</span>{" "}
            dialed in by working engineers — vocal chains, mastering templates,
            creative FX setups — all sounding incredible out of the box. Load
            one, tweak to taste, and you&apos;re done. Or build your own and
            take it anywhere.
          </p>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Every interface is{" "}
            <span className="text-white font-medium">ergonomically optimized</span>
            {" "}down to the pixel. Button placement, knob grouping, and mouse
            paths are all pre-thought to predict where your cursor is heading
            next — minimizing travel, reducing clicks, and keeping you in the
            creative flow. We&apos;re aiming to compete with the industry
            standard, at a fraction of the cost, with a workflow that actually{" "}
            <span className="text-tertiary">gets out of your way</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
