"use client";

import { motion } from "framer-motion";
import PluginMockUI from "./PluginMockUI";

interface PluginCardProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  mockType: string;
  comingSoon?: boolean;
}

export default function PluginCard({
  name,
  tagline,
  description,
  accentColor,
  mockType,
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

      <PluginMockUI type={mockType} color={accentColor} />

      <div className="relative">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-2"
          style={{ color: accentColor }}
        >
          {tagline}
        </p>
        <h3 className="text-2xl font-bold mb-3">{name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

        {comingSoon && (
          <span className="inline-block mt-4 px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-zinc-500">
            Coming Soon
          </span>
        )}
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
