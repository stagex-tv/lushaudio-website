"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";

/* ─── Tiny helpers for the rack mock ─── */

function MiniKnob({ color, value = 0.5, size = 18 }: { color: string; value?: number; size?: number }) {
  const angle = -135 + value * 270;
  return (
    <div
      className="rounded-full border relative"
      style={{
        width: size,
        height: size,
        borderColor: `${color}50`,
        background: "radial-gradient(circle at 40% 35%, #2a2a2a, #151515)",
      }}
    >
      <div
        className="absolute w-px rounded-full"
        style={{
          height: size * 0.35,
          backgroundColor: color,
          top: "15%",
          left: "50%",
          transformOrigin: "bottom center",
          transform: `translateX(-50%) rotate(${angle}deg)`,
        }}
      />
    </div>
  );
}

function MiniFader({ color, value = 0.6 }: { color: string; value?: number }) {
  return (
    <div className="w-1 h-6 bg-zinc-800 rounded-full relative">
      <div
        className="absolute bottom-0 w-full rounded-full"
        style={{ height: `${value * 100}%`, backgroundColor: `${color}60` }}
      />
    </div>
  );
}

/* Each plugin module in the rack */
interface ModuleProps {
  name: string;
  color: string;
  active?: boolean;
  children: React.ReactNode;
}

function RackModule({ name, color, active = true, children }: ModuleProps) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Module header */}
      <div
        className="flex items-center justify-between px-2 py-1 rounded-t-md border-b"
        style={{
          borderColor: `${color}20`,
          background: active ? `linear-gradient(180deg, ${color}12, transparent)` : "#0d0d0d",
        }}
      >
        <span className="text-[8px] md:text-[9px] font-bold tracking-wider uppercase" style={{ color: active ? color : "#444" }}>
          {name}
        </span>
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: active ? color : "#333" }}
        />
      </div>
      {/* Module body */}
      <div
        className="flex-1 flex items-center justify-center p-2 md:p-3 rounded-b-md border-x border-b"
        style={{
          borderColor: active ? `${color}15` : "#1a1a1a",
          background: active ? "#0c0c0c" : "#090909",
          opacity: active ? 1 : 0.4,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Signal flow arrow between modules */
function FlowArrow({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center w-4 md:w-6 flex-shrink-0 self-center">
      <svg viewBox="0 0 16 8" className="w-3 md:w-4 h-2">
        <path d="M0,4 L10,4 M8,1 L12,4 L8,7" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function LushStudioSection() {
  const rackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rack = rackRef.current;
    const glow = glowRef.current;
    if (!rack || !glow) return;
    const rect = rack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    rack.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(121,0,255,0.12), transparent 50%)`;
    glow.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const rack = rackRef.current;
    const glow = glowRef.current;
    if (!rack || !glow) return;
    rack.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    glow.style.opacity = "0";
  }, []);

  return (
    <section id="lush-studio" className="pt-6 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
            The Flagship
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-wave">
            LUSH
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Your entire signal chain in one plugin.{" "}
            <span className="text-primary font-medium">Load, stack, and save</span>{" "}
            any combination of Lush tools — then take your presets anywhere with your Lush account.
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12 mt-8"
        >
          {[
            { label: "Preset Chains", icon: "⛓" },
            { label: "Cloud Sync", icon: "☁" },
            { label: "Marketplace", icon: "🏪" },
            { label: "Basic / Advanced", icon: "⇔" },
          ].map((f) => (
            <span
              key={f.label}
              className="px-4 py-2 rounded-full border border-white/10 text-sm text-zinc-400 bg-white/[0.02]"
            >
              <span className="mr-2 opacity-60">{f.icon}</span>
              {f.label}
            </span>
          ))}
        </motion.div>

        {/* Pricing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-2xl md:text-3xl font-bold text-white">
            Only <span className="text-primary">$12.99</span>/month for the entire suite
          </p>
        </motion.div>

        {/* Giant rack mock-up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            ref={rackRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
            style={{
              transition: "transform 0.4s ease-out",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Mouse-follow glow */}
            <div
              ref={glowRef}
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{ opacity: 0, transition: "opacity 0.3s" }}
            />

            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/5 bg-[#0d0d0d]">
              <div className="flex items-center gap-3">
                <span className="text-sm md:text-base font-bold tracking-wider text-white">LUSH</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-medium tracking-wider">STUDIO</span>
              </div>
              {/* Preset selector */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500">PRESET</span>
                  <span className="text-[10px] text-zinc-300 font-medium">Vocal Chain — Warm</span>
                  <svg viewBox="0 0 10 6" className="w-2 h-1.5 ml-1"><path d="M1,1 L5,5 L9,1" fill="none" stroke="#555" strokeWidth="1.5" /></svg>
                </div>
              </div>
              {/* Account */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
                  <span className="text-[8px] text-primary font-bold">L</span>
                </div>
              </div>
            </div>

            {/* ── Signal chain row (desktop) ── */}
            <div className="hidden md:block p-5">
              <div className="flex items-stretch gap-0">
                {/* Input */}
                <div className="flex flex-col items-center justify-center px-3">
                  <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5"><path d="M7,2 L7,12 M4,5 L7,2 L10,5" fill="none" stroke="#00bcff" strokeWidth="1.5" /></svg>
                  </div>
                  <span className="text-[7px] text-zinc-600 mt-1">INPUT</span>
                </div>

                <FlowArrow color="#00bcff" />

                {/* 1. De-Esser */}
                <RackModule name="De-Ess" color="#00bcff">
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 60 16" className="w-12 h-3">
                      <path d="M0,8 L20,8 C30,8 35,12 42,14 C48,12 52,8 60,8" fill="none" stroke="#00bcff" strokeWidth="1" />
                    </svg>
                    <div className="flex gap-1">
                      <MiniKnob color="#00bcff" value={0.7} size={14} />
                      <MiniKnob color="#00bcff" value={0.4} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#00bcff" />

                {/* 2. Auto-Tune */}
                <RackModule name="Auto-Tune" color="#00bcff">
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 60 20" className="w-12 h-3.5">
                      <line x1="0" y1="10" x2="60" y2="10" stroke="#222" strokeWidth="0.5" />
                      <path d="M0,10 C5,8 10,6 15,6 L25,6 L25,14 L35,14 L35,6 L50,6 L50,14 L60,14" fill="none" stroke="#00bcff" strokeWidth="1" />
                      <path d="M0,10 C5,9 10,7 15,5 C20,8 25,15 30,13 C35,11 40,5 45,7 C50,9 55,13 60,14" fill="none" stroke="#555" strokeWidth="0.6" strokeDasharray="2,2" />
                    </svg>
                    <div className="flex gap-1">
                      <MiniKnob color="#00bcff" value={0.3} size={14} />
                      <MiniKnob color="#00bcff" value={0.5} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#00bcff" />

                {/* 3. Comp */}
                <RackModule name="Comp" color="#00bcff">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-px items-end h-4">
                      {[0.3, 0.5, 0.8, 1, 0.9, 0.6, 0.7, 0.85, 0.7, 0.4].map((v, i) => (
                        <div key={i} className="w-0.5 rounded-t" style={{ height: `${v * 100}%`, backgroundColor: v > 0.8 ? "#00bcff" : "#00bcff60" }} />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <MiniKnob color="#00bcff" value={0.4} size={14} />
                      <MiniKnob color="#00bcff" value={0.6} size={14} />
                      <MiniKnob color="#00bcff" value={0.5} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#f2a80d" />

                {/* 4. Pro Q */}
                <RackModule name="Pro Q" color="#f2a80d">
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 80 24" className="w-16 h-5">
                      <line x1="0" y1="12" x2="80" y2="12" stroke="#222" strokeWidth="0.5" />
                      <path d="M0,12 C10,12 15,10 25,6 C35,2 40,14 55,13 C65,12 70,8 80,12" fill="none" stroke="#f2a80d" strokeWidth="1" />
                    </svg>
                    <div className="flex gap-1">
                      <MiniKnob color="#f2a80d" value={0.5} size={14} />
                      <MiniKnob color="#f2a80d" value={0.65} size={14} />
                      <MiniKnob color="#f2a80d" value={0.4} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#f2a80d" />

                {/* 5. Saturation */}
                <RackModule name="Saturate" color="#f2a80d">
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 40 40" className="w-8 h-8">
                      <line x1="0" y1="40" x2="40" y2="0" stroke="#222" strokeWidth="0.4" strokeDasharray="2,2" />
                      <path d="M0,40 C4,36 8,28 12,22 C16,16 20,10 24,7 C28,5 32,3.5 36,3 L40,2.5" fill="none" stroke="#f2a80d" strokeWidth="1" />
                    </svg>
                    <div className="flex gap-1">
                      <MiniKnob color="#f2a80d" value={0.6} size={14} />
                      <MiniKnob color="#f2a80d" value={0.5} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#0531fa" />

                {/* 6. Gate */}
                <RackModule name="Gate" color="#0531fa">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#0531fa" value={0.35} />
                    <MiniKnob color="#0531fa" value={0.5} />
                    <div className="flex gap-px items-end h-5">
                      {[0.1, 0.9, 0.9, 0.1, 0.1, 0.9, 0.9, 0.1].map((v, i) => (
                        <div key={i} className="w-0.5 rounded-t" style={{ height: `${v * 100}%`, backgroundColor: v > 0.5 ? "#0531fa" : "#0531fa30" }} />
                      ))}
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#0531fa" />

                {/* 7. Verb */}
                <RackModule name="Verb" color="#0531fa">
                  <div className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 60 16" className="w-12 h-3">
                      <path d="M0,14 L5,2 C15,4 30,8 50,12 L60,14" fill="#0531fa10" stroke="#0531fa" strokeWidth="0.8" />
                    </svg>
                    <div className="flex gap-1">
                      <MiniKnob color="#0531fa" value={0.7} size={14} />
                      <MiniKnob color="#0531fa" value={0.55} size={14} />
                      <MiniKnob color="#0531fa" value={0.4} size={14} />
                    </div>
                  </div>
                </RackModule>

                <FlowArrow color="#7900ff" />

                {/* Output */}
                <div className="flex flex-col items-center justify-center px-3">
                  <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5"><path d="M7,12 L7,2 M4,9 L7,12 L10,9" fill="none" stroke="#7900ff" strokeWidth="1.5" /></svg>
                  </div>
                  <span className="text-[7px] text-zinc-600 mt-1">OUTPUT</span>
                </div>
              </div>
            </div>

            {/* ── Signal chain (mobile — 2-col grid) ── */}
            <div className="md:hidden p-4">
              <div className="grid grid-cols-2 gap-2">
                <RackModule name="De-Ess" color="#00bcff">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#00bcff" value={0.7} />
                    <MiniKnob color="#00bcff" value={0.4} />
                  </div>
                </RackModule>
                <RackModule name="Auto-Tune" color="#00bcff">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#00bcff" value={0.3} />
                    <MiniKnob color="#00bcff" value={0.5} />
                  </div>
                </RackModule>
                <RackModule name="Comp" color="#00bcff">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#00bcff" value={0.4} />
                    <MiniKnob color="#00bcff" value={0.6} />
                  </div>
                </RackModule>
                <RackModule name="Pro Q" color="#f2a80d">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#f2a80d" value={0.5} />
                    <MiniKnob color="#f2a80d" value={0.65} />
                  </div>
                </RackModule>
                <RackModule name="Saturate" color="#f2a80d">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#f2a80d" value={0.6} />
                    <MiniKnob color="#f2a80d" value={0.5} />
                  </div>
                </RackModule>
                <RackModule name="Gate" color="#0531fa">
                  <div className="flex gap-1.5 items-center">
                    <MiniKnob color="#0531fa" value={0.35} />
                    <MiniKnob color="#0531fa" value={0.5} />
                  </div>
                </RackModule>
                <div className="col-span-2">
                  <RackModule name="Verb" color="#0531fa">
                    <div className="flex items-center gap-2 w-full justify-center">
                      <MiniKnob color="#0531fa" value={0.7} size={16} />
                      <MiniKnob color="#0531fa" value={0.55} size={16} />
                      <MiniKnob color="#0531fa" value={0.4} size={16} />
                      <svg viewBox="0 0 60 16" className="w-12 h-3 ml-1">
                        <path d="M0,14 L5,2 C15,4 30,8 50,12 L60,14" fill="#0531fa10" stroke="#0531fa" strokeWidth="0.8" />
                      </svg>
                    </div>
                  </RackModule>
                </div>
              </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="flex items-center justify-between px-4 md:px-6 py-2.5 border-t border-white/5 bg-[#080808]">
              {/* Chain info */}
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-zinc-600">7 MODULES</span>
                <span className="text-[9px] text-zinc-700">|</span>
                <span className="text-[9px] text-zinc-600">48kHz / 32-bit</span>
              </div>
              {/* Marketplace & sharing */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800">
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5"><path d="M6,1 L6,8 M3,5 L6,8 L9,5 M2,10 L10,10" fill="none" stroke="#555" strokeWidth="1.2" /></svg>
                  <span className="text-[8px] text-zinc-500">Share</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5"><circle cx="6" cy="6" r="5" fill="none" stroke="#7900ff" strokeWidth="1" /><path d="M4,6 L8,6 M6,4 L6,8" fill="none" stroke="#7900ff" strokeWidth="1" /></svg>
                  <span className="text-[8px] text-primary">Marketplace</span>
                </div>
              </div>
              {/* Master output */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1 h-6 bg-zinc-800 rounded-sm overflow-hidden flex flex-col justify-end">
                    <div className="w-full rounded-sm" style={{ height: "65%", background: "linear-gradient(to top, #00bcff60, #00bcff)" }} />
                  </div>
                  <div className="w-1 h-6 bg-zinc-800 rounded-sm overflow-hidden flex flex-col justify-end">
                    <div className="w-full rounded-sm" style={{ height: "58%", background: "linear-gradient(to top, #00bcff60, #00bcff)" }} />
                  </div>
                </div>
                <span className="text-[9px] text-zinc-500 font-mono">-3.2dB</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description cards below rack */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-white/5 bg-[#111] p-6"
          >
            <h3 className="text-base font-semibold mb-2 text-white">Preset Chains</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Save your entire vocal, master, or FX chain as a single preset. Walk into any studio, sign in, and load your sound in seconds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-white/5 bg-[#111] p-6"
          >
            <h3 className="text-base font-semibold mb-2 text-white">Marketplace</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Browse and sell user-made chains — vocal templates, mastering setups, creative FX, telephone effects, and more. Built by the community, for the community.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/5 bg-[#111] p-6"
          >
            <h3 className="text-base font-semibold mb-2 text-white">Basic &amp; Advanced</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every module has a compact basic mode for quick tweaks and an advanced mode for full control. See your whole chain at a glance or dive deep into any plugin.
            </p>
          </motion.div>
        </div>

        {/* Pricing + Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block rounded-2xl border border-primary/20 bg-primary/[0.03] px-10 py-8">
            <p className="text-sm text-zinc-400 mb-2">All plugins included</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-white">$12.99</span>
              <span className="text-zinc-400 text-lg">/mo</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2 mb-5">
              Access every Lush plugin, preset chain, and marketplace.
            </p>
            <span className="inline-block px-6 py-2 rounded-full text-sm font-medium border border-primary/30 text-primary bg-primary/5">
              Coming Soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
