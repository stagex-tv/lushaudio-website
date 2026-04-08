"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";

/* ─── Tiny helpers for the rack mock ─── */

function MiniKnob({ color, value = 0.5, size = 18, delay = 0 }: { color: string; value?: number; size?: number; delay?: number }) {
  const angle = -135 + value * 270;
  const idleStart = 0.5 + delay;
  return (
    <div
      className="rounded-full border relative"
      style={{
        width: size,
        height: size,
        borderColor: `${color}50`,
        background: "radial-gradient(circle at 40% 35%, #2a2a2a, #151515)",
        animation: `rackKnobIn 0.6s ${delay}s both cubic-bezier(0.22, 1, 0.36, 1), rackKnobBreath ${1.8 + delay * 0.5}s ${idleStart}s ease-in-out infinite`,
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
          "--knob-angle": `${angle}deg`,
          animation: `rackKnobIdle ${1.5 + delay * 0.4}s ${idleStart}s ease-in-out infinite`,
        } as React.CSSProperties}
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

/* ─── Preset chain data ─── */

interface ChainModule {
  type: string;
  name: string;
  color: string;
}

interface Preset {
  name: string;
  modules: ChainModule[];
}

const presets: Preset[] = [
  {
    name: "Vocal Chain — Warm",
    modules: [
      { type: "deess", name: "De-Ess", color: "#00bcff" },
      { type: "autotune", name: "Auto-Tune", color: "#00bcff" },
      { type: "comp", name: "Comp", color: "#00bcff" },
      { type: "proq", name: "Pro Q", color: "#f2a80d" },
      { type: "saturate", name: "Saturate", color: "#f2a80d" },
      { type: "gate", name: "Gate", color: "#0531fa" },
      { type: "verb", name: "Verb", color: "#0531fa" },
    ],
  },
  {
    name: "E-Mastering — Loud",
    modules: [
      { type: "clipper", name: "Clipper", color: "#f2a80d" },
      { type: "comp", name: "Comp", color: "#00bcff" },
      { type: "multiband", name: "Multi-Band", color: "#7900ff" },
      { type: "proq", name: "Pro Q", color: "#f2a80d" },
      { type: "imager", name: "Imager", color: "#7900ff" },
      { type: "limiter", name: "Limiter", color: "#7900ff" },
      { type: "loudness", name: "Loudness", color: "#00bcff" },
    ],
  },
  {
    name: "Backup FX — Thick",
    modules: [
      { type: "deess", name: "De-Ess", color: "#00bcff" },
      { type: "autotune", name: "Auto-Tune", color: "#00bcff" },
      { type: "comp", name: "Comp", color: "#00bcff" },
      { type: "proq_hpf", name: "Pro Q", color: "#f2a80d" },
      { type: "distortion", name: "Distort", color: "#f2a80d" },
      { type: "chorus", name: "Chorus", color: "#0531fa" },
      { type: "verb", name: "Verb", color: "#0531fa" },
    ],
  },
];

/* ─── Module content renderer (desktop) ─── */

/* Helpers for animated SVG paths and bars */
const cs = (props: Record<string, string | number>) => props as React.CSSProperties;

function AnimPath({ d, color, width = 1, delay = 0.1, len = 120, fill }: { d: string; color: string; width?: number; delay?: number; len?: number; fill?: string }) {
  return (
    <path
      d={d}
      fill={fill || "none"}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={len}
      style={cs({
        "--path-len": len,
        animation: `rackPathDraw 0.8s ${delay}s both ease-out, rackPathShimmer ${1.8 + delay * 0.5}s ${0.6 + delay}s ease-in-out infinite`,
      })}
    />
  );
}

function AnimBar({ h, color, i, pulse = true }: { h: number; color: string; i: number; pulse?: boolean }) {
  const d = 0.08 * i;
  const pulseScale = 0.7 + ((i * 7 + 3) % 10) * 0.025;
  return (
    <div
      className="w-0.5 rounded-t origin-bottom"
      style={cs({
        height: `${h * 100}%`,
        backgroundColor: color,
        "--pulse-scale": `${pulseScale}`,
        "--bar-opacity": h > 0.5 ? "1" : "0.6",
        transformOrigin: "bottom",
        animation: `rackBarGrow 0.5s ${d + 0.15}s both cubic-bezier(0.22,1,0.36,1)${pulse ? `, rackBarPulse ${1.2 + i * 0.15}s ${0.5 + d}s ease-in-out infinite` : ""}`,
      })}
    />
  );
}

function AnimWideBar({ h, color, i }: { h: number; color: string; i: number }) {
  const d = 0.06 * i;
  const pulseScale = 0.72 + ((i * 11 + 5) % 10) * 0.02;
  return (
    <div
      className="w-1 rounded-t origin-bottom"
      style={cs({
        height: `${h * 100}%`,
        backgroundColor: color,
        opacity: 0.7,
        "--pulse-scale": `${pulseScale}`,
        "--bar-opacity": "0.7",
        transformOrigin: "bottom",
        animation: `rackBarGrow 0.5s ${d + 0.1}s both cubic-bezier(0.22,1,0.36,1), rackBarPulse ${1.0 + i * 0.2}s ${0.4 + d}s ease-in-out infinite`,
      })}
    />
  );
}

function DriftIn({ children, dx = 0, dy = 15, delay = 0 }: { children: React.ReactNode; dx?: number; dy?: number; delay?: number }) {
  return (
    <div style={cs({ "--dx": `${dx}px`, "--dy": `${dy}px`, animation: `rackDriftIn 0.7s ${delay}s both cubic-bezier(0.22,1,0.36,1), rackSway ${3 + delay}s ${0.7 + delay}s ease-in-out infinite` })}>
      {children}
    </div>
  );
}

function DesktopModuleContent({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "deess":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-10} delay={0.05}>
            <svg viewBox="0 0 60 16" className="w-12 h-3">
              <AnimPath d="M0,8 L20,8 C30,8 35,12 42,14 C48,12 52,8 60,8" color={color} len={80} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.7} size={14} delay={0.15} />
            <MiniKnob color={color} value={0.4} size={14} delay={0.25} />
          </div>
        </div>
      );
    case "autotune":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dx={8} dy={-8} delay={0.05}>
            <svg viewBox="0 0 60 20" className="w-12 h-3.5">
              <line x1="0" y1="10" x2="60" y2="10" stroke="#222" strokeWidth="0.5" />
              <AnimPath d="M0,10 C5,8 10,6 15,6 L25,6 L25,14 L35,14 L35,6 L50,6 L50,14 L60,14" color={color} len={120} delay={0.15} />
              <AnimPath d="M0,10 C5,9 10,7 15,5 C20,8 25,15 30,13 C35,11 40,5 45,7 C50,9 55,13 60,14" color="#555" width={0.6} len={100} delay={0.3} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.3} size={14} delay={0.2} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "comp":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-12} delay={0.05}>
            <div className="flex gap-px items-end h-4">
              {[0.3, 0.5, 0.8, 1, 0.9, 0.6, 0.7, 0.85, 0.7, 0.4].map((v, i) => (
                <AnimBar key={i} h={v} color={v > 0.8 ? color : `${color}60`} i={i} />
              ))}
            </div>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.4} size={14} delay={0.15} />
            <MiniKnob color={color} value={0.6} size={14} delay={0.25} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.35} />
          </div>
        </div>
      );
    case "proq":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dx={-6} dy={-10} delay={0.05}>
            <svg viewBox="0 0 80 24" className="w-16 h-5">
              <line x1="0" y1="12" x2="80" y2="12" stroke="#222" strokeWidth="0.5" />
              <AnimPath d="M0,12 C10,12 15,10 25,6 C35,2 40,14 55,13 C65,12 70,8 80,12" color={color} len={120} delay={0.12} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.5} size={14} delay={0.18} />
            <MiniKnob color={color} value={0.65} size={14} delay={0.28} />
            <MiniKnob color={color} value={0.4} size={14} delay={0.38} />
          </div>
        </div>
      );
    case "saturate":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dx={5} dy={-8} delay={0.05}>
            <svg viewBox="0 0 40 40" className="w-6 h-5">
              <line x1="0" y1="40" x2="40" y2="0" stroke="#222" strokeWidth="0.4" strokeDasharray="2,2" />
              <AnimPath d="M0,40 C4,36 8,28 12,22 C16,16 20,10 24,7 C28,5 32,3.5 36,3 L40,2.5" color={color} len={60} delay={0.1} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.6} size={14} delay={0.2} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "gate":
      return (
        <div className="flex gap-1.5 items-center">
          <MiniKnob color={color} value={0.35} delay={0.1} />
          <MiniKnob color={color} value={0.5} delay={0.2} />
          <DriftIn dx={10} delay={0.08}>
            <div className="flex gap-px items-end h-5">
              {[0.1, 0.9, 0.9, 0.1, 0.1, 0.9, 0.9, 0.1].map((v, i) => (
                <AnimBar key={i} h={v} color={v > 0.5 ? color : `${color}30`} i={i} />
              ))}
            </div>
          </DriftIn>
        </div>
      );
    case "verb":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-10} dx={-5} delay={0.05}>
            <svg viewBox="0 0 60 16" className="w-12 h-3">
              <AnimPath d="M0,14 L5,2 C15,4 30,8 50,12 L60,14" color={color} width={0.8} len={80} fill={`${color}10`} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.7} size={14} delay={0.15} />
            <MiniKnob color={color} value={0.55} size={14} delay={0.25} />
            <MiniKnob color={color} value={0.4} size={14} delay={0.35} />
          </div>
        </div>
      );
    case "clipper":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-12} dx={6} delay={0.05}>
            <svg viewBox="0 0 60 20" className="w-12 h-4">
              <line x1="0" y1="5" x2="60" y2="5" stroke={`${color}30`} strokeWidth="0.4" strokeDasharray="2,2" />
              <line x1="0" y1="15" x2="60" y2="15" stroke={`${color}30`} strokeWidth="0.4" strokeDasharray="2,2" />
              <AnimPath d="M0,10 C4,10 6,2 10,5 L18,5 C20,5 22,18 28,15 L36,15 C38,15 40,4 44,5 L52,5 C54,5 56,14 60,15" color={color} len={130} delay={0.12} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.65} size={14} delay={0.2} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "multiband":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-10} delay={0.05}>
            <div className="flex gap-px items-end h-5">
              {[
                { h: 0.7, c: "#7900ff" },
                { h: 0.5, c: "#7900ff" },
                { h: 0.8, c: "#0531fa" },
                { h: 0.6, c: "#0531fa" },
                { h: 0.9, c: "#00bcff" },
                { h: 0.4, c: "#00bcff" },
                { h: 0.6, c: "#f2a80d" },
                { h: 0.3, c: "#f2a80d" },
              ].map((b, i) => (
                <AnimWideBar key={i} h={b.h} color={b.c} i={i} />
              ))}
            </div>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.55} size={14} delay={0.2} />
            <MiniKnob color="#00bcff" value={0.4} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "limiter":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dx={-8} dy={-6} delay={0.08}>
            <div className="w-full flex items-center gap-1.5">
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full origin-left"
                  style={cs({
                    width: "75%",
                    background: `linear-gradient(90deg, ${color}40, ${color})`,
                    animation: `rackBarGrow 0.6s 0.15s both cubic-bezier(0.22,1,0.36,1), rackBarPulse 3s 1s ease-in-out infinite`,
                    "--pulse-scale": "0.92",
                    "--bar-opacity": "1",
                    transformOrigin: "left",
                  })}
                />
              </div>
              <span className="text-[6px] text-zinc-600 font-mono" style={{ animation: "rackDriftIn 0.5s 0.3s both" }}>-2.1</span>
            </div>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.7} size={14} delay={0.2} />
            <MiniKnob color={color} value={0.85} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "loudness":
      return (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <DriftIn dy={12} delay={0.05}>
              <div className="w-2 h-8 bg-zinc-800 rounded-sm overflow-hidden relative">
                <div
                  className="absolute bottom-0 w-full rounded-sm origin-bottom"
                  style={cs({
                    "--meter-h": "72%",
                    background: `linear-gradient(to top, ${color}40, ${color})`,
                    animation: `rackBarGrow 0.5s 0.15s both, rackMeterFlicker 4s 1s ease-in-out infinite`,
                  })}
                />
                <div className="absolute w-full h-px" style={{ bottom: "60%", backgroundColor: "#fff", opacity: 0.3 }} />
              </div>
            </DriftIn>
            <DriftIn dy={12} delay={0.12}>
              <div className="w-2 h-8 bg-zinc-800 rounded-sm overflow-hidden relative">
                <div
                  className="absolute bottom-0 w-full rounded-sm origin-bottom"
                  style={cs({
                    "--meter-h": "65%",
                    background: `linear-gradient(to top, ${color}40, ${color})`,
                    animation: `rackBarGrow 0.5s 0.22s both, rackMeterFlicker 4.5s 1.2s ease-in-out infinite`,
                  })}
                />
                <div className="absolute w-full h-px" style={{ bottom: "60%", backgroundColor: "#fff", opacity: 0.3 }} />
              </div>
            </DriftIn>
          </div>
          <DriftIn dx={8} delay={0.2}>
            <div className="flex flex-col items-start">
              <span className="text-[6px] text-zinc-600">LUFS</span>
              <span className="text-[8px] font-mono" style={{ color }}>-14.2</span>
            </div>
          </DriftIn>
        </div>
      );
    case "imager":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-8} dx={-5} delay={0.05}>
            <svg viewBox="0 0 40 28" className="w-10 h-6">
              <ellipse cx="20" cy="14" rx="18" ry="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" style={cs({ animation: "rackPathShimmer 3s 0.5s ease-in-out infinite" })} />
              <ellipse cx="20" cy="14" rx="12" ry="8" fill="none" stroke={color} strokeWidth="0.3" opacity="0.2" style={cs({ animation: "rackPathShimmer 3.5s 0.8s ease-in-out infinite" })} />
              <ellipse cx="20" cy="14" rx="6" ry="4" fill="none" stroke="#00bcff" strokeWidth="0.3" opacity="0.15" style={cs({ animation: "rackPathShimmer 4s 1s ease-in-out infinite" })} />
              <line x1="2" y1="14" x2="38" y2="14" stroke={color} strokeWidth="0.2" opacity="0.15" />
              <line x1="20" y1="2" x2="20" y2="26" stroke={color} strokeWidth="0.2" opacity="0.15" />
              {[
                { cx: 20, cy: 13, r: 1.5, o: 0.9, d: 0.1 },
                { cx: 24, cy: 11, r: 1, o: 0.7, d: 0.2 },
                { cx: 16, cy: 12, r: 1.2, o: 0.8, d: 0.15 },
                { cx: 28, cy: 14, r: 0.8, o: 0.5, d: 0.25 },
                { cx: 12, cy: 16, r: 0.7, o: 0.4, d: 0.3 },
                { cx: 22, cy: 18, r: 0.8, o: 0.5, d: 0.35 },
                { cx: 32, cy: 12, r: 0.5, o: 0.3, d: 0.4 },
              ].map((dot, i) => (
                <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#f2a80d" opacity={dot.o} style={cs({ animation: `rackPathShimmer ${2.5 + i * 0.3}s ${dot.d + 0.5}s ease-in-out infinite` })} />
              ))}
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.7} size={14} delay={0.2} />
            <MiniKnob color="#00bcff" value={0.55} size={14} delay={0.3} />
          </div>
        </div>
      );
    case "proq_hpf":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dx={-6} dy={-10} delay={0.05}>
            <svg viewBox="0 0 80 24" className="w-16 h-5">
              <line x1="0" y1="12" x2="80" y2="12" stroke="#222" strokeWidth="0.5" />
              {/* HPF + LPF curve: low cut, flat mid, high cut */}
              <AnimPath d="M0,22 C5,22 8,20 12,16 C16,12 18,12 25,12 L55,12 C58,12 62,12 66,14 C70,17 74,20 80,22" color={color} len={100} delay={0.12} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.3} size={14} delay={0.18} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.28} />
            <MiniKnob color={color} value={0.7} size={14} delay={0.38} />
          </div>
        </div>
      );
    case "distortion":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-10} dx={5} delay={0.05}>
            <svg viewBox="0 0 50 24" className="w-10 h-5">
              {/* Hard-clip transfer curve */}
              <line x1="0" y1="24" x2="50" y2="0" stroke="#222" strokeWidth="0.3" strokeDasharray="2,2" />
              <AnimPath d="M0,24 C5,20 10,14 15,10 C18,8 20,6 22,6 L28,6 C30,6 32,8 35,10 C40,14 45,20 50,24" color={color} len={70} delay={0.1} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.75} size={14} delay={0.15} />
            <MiniKnob color={color} value={0.5} size={14} delay={0.25} />
          </div>
        </div>
      );
    case "chorus":
      return (
        <div className="flex flex-col items-center gap-1">
          <DriftIn dy={-8} dx={-5} delay={0.05}>
            <svg viewBox="0 0 60 20" className="w-12 h-4">
              {/* Multi-voice chorus waves */}
              <AnimPath d="M0,10 C5,4 10,4 15,10 C20,16 25,16 30,10 C35,4 40,4 45,10 C50,16 55,16 60,10" color={color} len={90} delay={0.1} />
              <AnimPath d="M0,7 C5,2 10,12 15,7 C20,2 25,12 30,7 C35,2 40,12 45,7 C50,2 55,12 60,7" color={color} width={0.7} len={85} delay={0.2} />
              <AnimPath d="M0,13 C5,18 10,8 15,13 C20,18 25,8 30,13 C35,18 40,8 45,13 C50,18 55,8 60,13" color="#00bcff" width={0.7} len={85} delay={0.3} />
            </svg>
          </DriftIn>
          <div className="flex gap-1">
            <MiniKnob color={color} value={0.45} size={14} delay={0.15} />
            <MiniKnob color={color} value={0.6} size={14} delay={0.25} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* ─── Animation variants ─── */

const chainVariants = {
  enter: {
    transition: {
      staggerChildren: 0.09,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.12,
      staggerDirection: -1,
    },
  },
};

const moduleVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 12,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: -12,
    transition: {
      duration: 0.4,
      ease: [0.55, 0, 1, 0.45] as const,
    },
  },
};

const arrowVariants = {
  initial: {
    opacity: 0,
    scaleX: 0,
  },
  enter: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scaleX: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const presetNameVariants = {
  initial: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" as const } },
};

/* ─── Component ─── */

export default function LushStudioSection() {
  const [currentPreset, setCurrentPreset] = useState(0);
  const hasAnimated = useRef(false);
  const rackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      hasAnimated.current = true;
      setCurrentPreset((prev) => (prev + 1) % presets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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

  const preset = presets[currentPreset];
  const firstModColor = preset.modules[0].color;
  const lastModColor = preset.modules[preset.modules.length - 1].color;

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            LUSH SUITE
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
          className="flex flex-wrap justify-center gap-3 mb-6 mt-8"
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-white underline">Only</span>{" "}
            <span className="text-primary text-glow-primary">$12.99</span>
            <span className="text-white">/month</span>
            <span className="text-zinc-500 font-normal text-xl md:text-2xl ml-3">for the entire suite</span>
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
            className="relative rounded-2xl border border-white/15 bg-[#050505] overflow-hidden"
            style={{
              transition: "transform 0.4s ease-out",
              transformStyle: "preserve-3d",
              willChange: "transform",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.6)",
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
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <span className="text-[10px] text-zinc-500">PRESET</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={preset.name}
                      variants={presetNameVariants}
                      initial={hasAnimated.current ? "initial" : false}
                      animate="enter"
                      exit="exit"
                      className="text-[10px] text-zinc-300 font-medium"
                    >
                      {preset.name}
                    </motion.span>
                  </AnimatePresence>
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
                {/* Input node — always visible */}
                <div className="flex flex-col items-center justify-center px-3">
                  <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5"><path d="M7,2 L7,12 M4,5 L7,2 L10,5" fill="none" stroke="#00bcff" strokeWidth="1.5" /></svg>
                  </div>
                  <span className="text-[7px] text-zinc-600 mt-1">INPUT</span>
                </div>

                {/* Animated chain */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preset.name}
                    className="flex items-stretch gap-0 flex-1"
                    variants={chainVariants}
                    initial={hasAnimated.current ? "initial" : "enter"}
                    animate="enter"
                    exit="exit"
                  >
                    {preset.modules.map((mod, i) => {
                      const arrowColor = i === 0 ? firstModColor : mod.color;
                      return (
                        <div key={`${mod.type}-${i}`} className="flex items-stretch flex-1 min-w-0">
                          {/* Arrow before module */}
                          <motion.div variants={arrowVariants} className="flex-shrink-0 self-center">
                            <FlowArrow color={arrowColor} />
                          </motion.div>
                          {/* Module */}
                          <motion.div variants={moduleVariants} className="flex-1 min-w-0">
                            <RackModule name={mod.name} color={mod.color}>
                              <DesktopModuleContent type={mod.type} color={mod.color} />
                            </RackModule>
                          </motion.div>
                        </div>
                      );
                    })}
                    {/* Final arrow to output */}
                    <motion.div variants={arrowVariants} className="flex-shrink-0 self-center">
                      <FlowArrow color="#7900ff" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Output node — always visible */}
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={preset.name}
                  className="grid grid-cols-2 gap-2"
                  variants={chainVariants}
                  initial={hasAnimated.current ? "initial" : "enter"}
                  animate="enter"
                  exit="exit"
                >
                  {preset.modules.map((mod, i) => (
                    <motion.div
                      key={`${mod.type}-${i}`}
                      variants={moduleVariants}
                      className={
                        i === preset.modules.length - 1 && preset.modules.length % 2 !== 0
                          ? "col-span-2"
                          : ""
                      }
                    >
                      <RackModule name={mod.name} color={mod.color}>
                        <div className="flex gap-1.5 items-center">
                          <MiniKnob color={mod.color} value={0.5} />
                          <MiniKnob color={mod.color} value={0.5} />
                        </div>
                      </RackModule>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Bottom bar ── */}
            <div className="flex items-center justify-between px-4 md:px-6 py-2.5 border-t border-white/5 bg-[#080808]">
              {/* Chain info */}
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={preset.modules.length + preset.name}
                    initial={hasAnimated.current ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[9px] text-zinc-600"
                  >
                    {preset.modules.length} MODULES
                  </motion.span>
                </AnimatePresence>
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
            className="rounded-xl border border-white/15 bg-[#050505] p-6"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.6)",
            }}
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
            className="rounded-xl border border-white/15 bg-[#050505] p-6"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.6)",
            }}
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
            className="rounded-xl border border-white/15 bg-[#050505] p-6"
            style={{
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.6)",
            }}
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
