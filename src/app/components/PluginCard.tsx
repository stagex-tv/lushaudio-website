"use client";

import { motion } from "framer-motion";

interface PluginCardProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  comingSoon?: boolean;
}

export default function PluginCard({
  name,
  tagline,
  description,
  accentColor,
  comingSoon,
}: PluginCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="relative group rounded-2xl border border-white/5 bg-[#111] p-8 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          boxShadow: `inset 0 0 60px ${accentColor}10, 0 0 40px ${accentColor}08`,
        }}
      />

      {/* Plugin "screen" placeholder — this is where a 3D render or screenshot will go */}
      <div className="relative w-full h-48 mb-6 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${accentColor}, transparent 70%)`,
          }}
        />
        <span className="text-zinc-600 text-sm tracking-wider font-mono">
          {comingSoon ? "COMING SOON" : "SCREENSHOT"}
        </span>
      </div>

      <div className="relative">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-2"
          style={{ color: accentColor }}
        >
          {tagline}
        </p>
        <h3 className="text-2xl font-bold mb-3">{name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

        {!comingSoon && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: accentColor,
              color: "#000",
            }}
          >
            Learn More
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
