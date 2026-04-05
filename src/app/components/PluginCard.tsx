"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${accentColor}20, transparent 60%)`;
    glow.style.opacity = "1";
  }, [accentColor]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    glow.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group rounded-2xl border border-white/5 bg-[#111] p-8 overflow-hidden"
        style={{
          transition: "transform 0.3s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease-out",
          }}
        />

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 1px 0 ${accentColor}30, 0 0 30px ${accentColor}08`,
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
      </div>
    </motion.div>
  );
}
