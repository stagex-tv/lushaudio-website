"use client";

import { motion } from "framer-motion";
import PluginCard from "./PluginCard";

export default function PluginsSection() {
  return (
    <section id="plugins" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
            Our Tools
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Plugins</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <PluginCard
            name="Lush Harmonix"
            tagline="Harmonic Shaper"
            description="Shape your sound with precision harmonic control, advanced cut filters with up to 96dB/oct slopes, and a brick wall mode. Full colour theming included."
            accentColor="#7900ff"
          />
          <PluginCard
            name="Coming Soon"
            tagline="Next Release"
            description="More tools are on the way. Stay tuned for our next plugin release."
            accentColor="#f2a80d"
            comingSoon
          />
        </div>
      </div>
    </section>
  );
}
