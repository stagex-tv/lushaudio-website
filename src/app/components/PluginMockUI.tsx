"use client";

interface MockKnobProps {
  label: string;
  color: string;
  size?: number;
  value?: number; // 0-1
}

function MockKnob({ label, color, size = 32, value = 0.5 }: MockKnobProps) {
  const angle = -135 + value * 270;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-full border-2 relative"
        style={{
          width: size,
          height: size,
          borderColor: `${color}60`,
          background: `radial-gradient(circle at 40% 35%, #333, #1a1a1a)`,
        }}
      >
        <div
          className="absolute w-0.5 rounded-full"
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
      <span className="text-[7px] text-zinc-500 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

function MockFader({ label, color, value = 0.6 }: { label: string; color: string; value?: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-1.5 h-12 bg-zinc-800 rounded-full relative">
        <div
          className="absolute bottom-0 w-full rounded-full"
          style={{ height: `${value * 100}%`, backgroundColor: `${color}80` }}
        />
        <div
          className="absolute w-3 h-1.5 rounded-sm -left-[3px]"
          style={{ bottom: `${value * 100 - 4}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[7px] text-zinc-500 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

function LushKnob({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-full border relative"
        style={{
          width: 28,
          height: 28,
          borderColor: "#7900ff80",
          background: "radial-gradient(circle at 40% 35%, #2a1a4a, #150a2a)",
          boxShadow: "0 0 8px rgba(121,0,255,0.3)",
        }}
      >
        <div
          className="absolute w-0.5 rounded-full"
          style={{
            height: 9,
            backgroundColor: "#7900ff",
            top: "15%",
            left: "50%",
            transformOrigin: "bottom center",
            transform: "translateX(-50%) rotate(45deg)",
          }}
        />
      </div>
      <span className="text-[6px] text-purple-400 tracking-wider uppercase font-bold">
        LUSH
      </span>
    </div>
  );
}

function MockEQCurve({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-12">
      <line x1="0" y1="30" x2="200" y2="30" stroke="#333" strokeWidth="0.5" />
      <path
        d="M0,30 C20,30 30,28 50,20 C70,12 80,35 110,32 C130,30 150,18 170,22 C185,25 195,30 200,30"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.8"
      />
      <path
        d="M0,30 C20,30 30,28 50,20 C70,12 80,35 110,32 C130,30 150,18 170,22 C185,25 195,30 200,30 L200,60 L0,60 Z"
        fill={color}
        opacity="0.08"
      />
    </svg>
  );
}

function MockGainReduction({ color }: { color: string }) {
  return (
    <div className="flex gap-0.5 items-end h-10">
      {[0.3, 0.5, 0.8, 1, 0.9, 0.6, 0.7, 0.85, 0.95, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3].map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-t-sm"
          style={{
            height: `${v * 100}%`,
            backgroundColor: v > 0.8 ? color : `${color}60`,
          }}
        />
      ))}
    </div>
  );
}

interface PluginMockUIProps {
  type: string;
  color: string;
}

export default function PluginMockUI({ type, color }: PluginMockUIProps) {
  const renderMock = () => {
    switch (type) {
      case "harmonix":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex gap-4 items-end">
              <MockFader label="3rd" color={color} value={0.7} />
              <MockFader label="5th" color={color} value={0.4} />
              <MockFader label="7th" color={color} value={0.55} />
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Drive" color={color} value={0.6} />
              <MockKnob label="Tone" color={color} value={0.45} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.7} />
            </div>
          </div>
        );
      case "verb":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="w-full h-16 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 64" className="w-full h-full">
                {/* Early reflections */}
                {[15, 22, 28, 35, 42].map((x, i) => (
                  <line key={i} x1={x} y1={60} x2={x} y2={60 - (30 - i * 5)} stroke={color} strokeWidth="1" opacity={0.3 - i * 0.04} />
                ))}
                {/* Reverb tail */}
                <path d="M0,60 L12,8 C30,12 55,22 90,35 C130,46 170,56 200,60" fill={`${color}12`} stroke={color} strokeWidth="1.2" opacity="0.7" />
                {/* Decay envelope line */}
                <path d="M12,8 C40,10 80,20 130,38 C160,48 185,56 200,60" fill="none" stroke={`${color}`} strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                {/* Pre-delay marker */}
                <line x1="12" y1="4" x2="12" y2="62" stroke={color} strokeWidth="0.5" opacity="0.25" strokeDasharray="2,2" />
                <text x="14" y="8" fill={color} fontSize="5" opacity="0.4" fontFamily="monospace">PRE</text>
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Size" color={color} value={0.7} />
              <MockKnob label="Decay" color={color} value={0.55} />
              <MockKnob label="Damp" color={color} value={0.4} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.35} />
            </div>
          </div>
        );
      case "comp":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <MockGainReduction color={color} />
            <div className="flex gap-3 items-center">
              <MockKnob label="Thresh" color={color} value={0.4} />
              <MockKnob label="Ratio" color={color} value={0.6} />
              <MockKnob label="Atk" color={color} value={0.3} />
              <MockKnob label="Rel" color={color} value={0.5} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "proq":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <MockEQCurve color={color} />
            <div className="flex gap-3 items-center">
              <MockKnob label="Freq" color={color} value={0.5} />
              <MockKnob label="Gain" color={color} value={0.65} />
              <MockKnob label="Q" color={color} value={0.4} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "delay":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex gap-1 items-end h-8">
              {[1, 0.6, 0.36, 0.22, 0.13, 0.08, 0.04].map((v, i) => (
                <div key={i} className="w-3 rounded-t" style={{ height: `${v * 100}%`, backgroundColor: `${color}${Math.round(v * 200).toString(16).padStart(2, "0")}` }} />
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Time" color={color} value={0.5} />
              <MockKnob label="Fdbk" color={color} value={0.45} />
              <MockKnob label="Tone" color={color} value={0.6} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.3} />
            </div>
          </div>
        );
      case "gate":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Gate waveform with threshold line */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Threshold line */}
                <line x1="0" y1="18" x2="200" y2="18" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="4,4" />
                <text x="3" y="15" fill={color} fontSize="5" opacity="0.35" fontFamily="monospace">THR</text>
                {/* Input signal (grey, crosses threshold) */}
                <path d="M0,28 C5,28 8,25 12,15 C16,8 20,10 25,22 C28,30 32,35 38,35 C42,35 45,32 48,28 C52,22 55,12 60,8 C65,14 68,28 72,35 C76,38 80,38 85,35 C88,30 92,28 95,30 C98,32 102,18 108,10 C112,6 115,14 120,25 C125,35 130,38 135,35 C140,30 142,28 148,30 C152,35 158,12 162,8 C166,14 170,28 175,35 C180,38 185,30 190,22 C195,14 198,20 200,28" fill="none" stroke="#555" strokeWidth="0.8" />
                {/* Gated output (colored, only where open) */}
                <path d="M8,28 C10,22 12,15 16,8 C20,10 22,18 25,22" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
                <path d="M50,28 C52,22 55,12 60,8 C65,14 68,28 70,32" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
                <path d="M100,20 C104,12 108,10 112,6 C115,14 118,22 120,25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
                <path d="M155,16 C158,12 162,8 166,14 C168,20 170,28 172,32" fill="none" stroke={color} strokeWidth="1.2" opacity="0.8" />
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Thresh" color={color} value={0.35} />
              <MockKnob label="Atk" color={color} value={0.2} />
              <MockKnob label="Hold" color={color} value={0.5} />
              <MockKnob label="Rel" color={color} value={0.6} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "limiter":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Gain reduction history + meter */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Ceiling line */}
                <line x1="0" y1="10" x2="200" y2="10" stroke={color} strokeWidth="0.5" opacity="0.35" strokeDasharray="4,4" />
                <text x="3" y="8" fill={color} fontSize="5" opacity="0.35" fontFamily="monospace">CEIL</text>
                {/* Input signal waveform */}
                <path d="M0,30 C10,28 15,22 25,16 C35,10 40,8 50,12 C60,18 65,25 75,20 C85,14 90,8 100,10 C110,14 115,22 125,18 C135,12 140,6 150,10 C160,16 165,24 175,20 C185,14 190,10 200,14" fill="none" stroke="#555" strokeWidth="0.8" />
                {/* Limited output (flat at ceiling) */}
                <path d="M0,30 C10,28 15,22 25,16 C30,12 32,10 35,10 L45,10 C48,10 50,12 55,16 C60,18 65,25 75,20 C80,16 85,14 88,10 L112,10 C115,12 118,18 125,18 C130,14 135,12 138,10 L162,10 C165,14 170,20 175,20 C180,16 185,14 188,10 L200,10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
                {/* GR amount shading */}
                <path d="M35,10 L35,8 C35,6 40,6 45,8 L45,10 Z" fill={color} opacity="0.15" />
                <path d="M88,10 L88,5 C95,4 105,4 112,5 L112,10 Z" fill={color} opacity="0.15" />
                <path d="M138,10 L138,6 C145,5 155,5 162,6 L162,10 Z" fill={color} opacity="0.15" />
              </svg>
            </div>
            {/* Meter bar */}
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "75%", background: `linear-gradient(90deg, ${color}40, ${color})` }} />
              </div>
              <span className="text-[8px] text-zinc-500 font-mono">-3.2 dB</span>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Input" color={color} value={0.7} />
              <MockKnob label="Ceil" color={color} value={0.85} />
              <MockKnob label="Release" color={color} value={0.5} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "clipper":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <line x1="0" y1="25" x2="200" y2="25" stroke="#333" strokeWidth="0.5" />
              <line x1="0" y1="10" x2="200" y2="10" stroke={`${color}40`} strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="0" y1="40" x2="200" y2="40" stroke={`${color}40`} strokeWidth="0.5" strokeDasharray="4,4" />
              <path d="M0,25 C10,25 15,5 25,10 L35,10 C40,10 45,45 55,40 L65,40 C70,40 75,8 85,10 L95,10 C100,10 110,42 120,40 L130,40 C135,40 140,10 150,10 L160,10 C165,10 175,38 185,40 L200,40" fill="none" stroke={color} strokeWidth="1.5" />
            </svg>
            <div className="flex gap-3 items-center">
              <MockKnob label="Drive" color={color} value={0.65} />
              <MockKnob label="Clip" color={color} value={0.5} />
              <MockKnob label="Output" color={color} value={0.55} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "autotune":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Pitch correction visualization */}
            <div className="w-full h-12 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 48" className="w-full h-full">
                {/* Grid lines for notes */}
                {[8, 16, 24, 32, 40].map((y) => (
                  <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#222" strokeWidth="0.5" />
                ))}
                {/* Input pitch (wobbly) */}
                <path
                  d="M0,24 C10,22 15,20 25,18 C35,16 40,19 50,22 C60,25 65,28 75,26 C85,23 90,18 100,16 C110,14 120,17 130,20 C140,23 150,27 160,24 C170,21 180,17 190,19 L200,20"
                  fill="none"
                  stroke="#555"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                {/* Corrected pitch (snapped to grid) */}
                <path
                  d="M0,24 L25,24 L25,16 L50,16 L50,24 L75,24 L75,16 L100,16 L100,24 L130,24 L130,16 L160,16 L160,24 L200,24"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                />
                {/* Note labels */}
                <text x="3" y="7" fill={`${color}80`} fontSize="5" fontFamily="monospace">C4</text>
                <text x="3" y="19" fill="#444" fontSize="5" fontFamily="monospace">B3</text>
                <text x="3" y="27" fill="#444" fontSize="5" fontFamily="monospace">A3</text>
                <text x="3" y="43" fill="#444" fontSize="5" fontFamily="monospace">G3</text>
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Speed" color={color} value={0.3} size={28} />
              <MockKnob label="Note" color={color} value={0.5} size={28} />
              <MockKnob label="Pitch" color={color} value={0.65} size={28} />
              <MockKnob label="Form" color={color} value={0.45} size={28} />
              <LushKnob color={color} />
            </div>
            {/* Key selector */}
            <div className="flex gap-1">
              {["C", "D", "E", "F", "G", "A", "B"].map((note, i) => (
                <span
                  key={note}
                  className="text-[7px] px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: i === 0 ? `${color}30` : "transparent",
                    color: i === 0 ? color : "#555",
                    border: `1px solid ${i === 0 ? `${color}50` : "#333"}`,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        );
      case "saturation":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Transfer curve + harmonic bars */}
            <div className="w-full flex gap-3 items-end justify-center">
              {/* Saturation transfer curve */}
              <svg viewBox="0 0 60 60" className="w-14 h-14">
                <line x1="0" y1="60" x2="60" y2="0" stroke="#222" strokeWidth="0.5" strokeDasharray="2,2" />
                <path
                  d="M0,60 C5,55 10,45 15,35 C20,25 25,16 30,12 C35,8 40,5 45,4 C50,3 55,2.5 60,2"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                />
                <rect x="0" y="0" width="60" height="60" fill="none" stroke="#333" strokeWidth="0.5" />
              </svg>
              {/* Harmonic bars */}
              <div className="flex gap-0.5 items-end h-12">
                {[0.9, 0.55, 0.35, 0.2, 0.12, 0.06].map((v, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-t"
                    style={{
                      height: `${v * 100}%`,
                      backgroundColor: i < 2 ? color : `${color}60`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Drive" color={color} value={0.6} />
              <MockKnob label="Tone" color={color} value={0.5} />
              <MockKnob label="Mix" color={color} value={0.7} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "deesser":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <line x1="0" y1="25" x2="200" y2="25" stroke="#333" strokeWidth="0.5" />
              <path d="M0,25 L80,25 C100,25 110,15 130,15 C150,15 160,25 200,25" fill="none" stroke="#555" strokeWidth="1" />
              <path d="M0,25 L80,25 C100,25 110,35 130,40 C150,35 160,25 200,25" fill="none" stroke={color} strokeWidth="1.5" />
              <rect x="105" y="8" width="50" height="6" rx="3" fill={`${color}30`} />
              <rect x="105" y="8" width="30" height="6" rx="3" fill={`${color}80`} />
            </svg>
            <div className="flex gap-3 items-center">
              <MockKnob label="Freq" color={color} value={0.7} />
              <MockKnob label="Thresh" color={color} value={0.4} />
              <MockKnob label="Range" color={color} value={0.5} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "multiband":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* 4-band spectrum with crossover points */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Crossover lines */}
                <line x1="50" y1="0" x2="50" y2="56" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="100" y1="0" x2="100" y2="56" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="150" y1="0" x2="150" y2="56" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
                {/* Band labels */}
                <text x="22" y="8" fill="#555" fontSize="6" textAnchor="middle" fontFamily="monospace">LOW</text>
                <text x="75" y="8" fill="#555" fontSize="6" textAnchor="middle" fontFamily="monospace">MID</text>
                <text x="125" y="8" fill="#555" fontSize="6" textAnchor="middle" fontFamily="monospace">HI-M</text>
                <text x="175" y="8" fill="#555" fontSize="6" textAnchor="middle" fontFamily="monospace">HIGH</text>
                {/* Band fill regions */}
                <rect x="0" y="18" width="50" height="38" fill={`${color}08`} />
                <rect x="50" y="22" width="50" height="34" fill="#0531fa08" />
                <rect x="100" y="20" width="50" height="36" fill="#00bcff08" />
                <rect x="150" y="24" width="50" height="32" fill="#f2a80d08" />
                {/* Gain reduction bars per band */}
                <rect x="10" y="20" width="8" height="28" rx="2" fill={`${color}20`} />
                <rect x="10" y={20 + 28 * 0.35} width="8" height={28 * 0.65} rx="2" fill={`${color}80`} />
                <rect x="22" y="20" width="8" height="28" rx="2" fill={`${color}20`} />
                <rect x="22" y={20 + 28 * 0.25} width="8" height={28 * 0.75} rx="2" fill={`${color}80`} />
                <rect x="60" y="22" width="8" height="26" rx="2" fill="#0531fa20" />
                <rect x="60" y={22 + 26 * 0.4} width="8" height={26 * 0.6} rx="2" fill="#0531fa80" />
                <rect x="72" y="22" width="8" height="26" rx="2" fill="#0531fa20" />
                <rect x="72" y={22 + 26 * 0.5} width="8" height={26 * 0.5} rx="2" fill="#0531fa80" />
                <rect x="110" y="20" width="8" height="28" rx="2" fill="#00bcff20" />
                <rect x="110" y={20 + 28 * 0.3} width="8" height={28 * 0.7} rx="2" fill="#00bcff80" />
                <rect x="122" y="20" width="8" height="28" rx="2" fill="#00bcff20" />
                <rect x="122" y={20 + 28 * 0.55} width="8" height={28 * 0.45} rx="2" fill="#00bcff80" />
                <rect x="160" y="24" width="8" height="24" rx="2" fill="#f2a80d20" />
                <rect x="160" y={24 + 24 * 0.45} width="8" height={24 * 0.55} rx="2" fill="#f2a80d80" />
                <rect x="172" y="24" width="8" height="24" rx="2" fill="#f2a80d20" />
                <rect x="172" y={24 + 24 * 0.6} width="8" height={24 * 0.4} rx="2" fill="#f2a80d80" />
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Low" color={color} value={0.55} />
              <MockKnob label="Mid" color="#0531fa" value={0.4} />
              <MockKnob label="Hi-M" color="#00bcff" value={0.6} />
              <MockKnob label="High" color="#f2a80d" value={0.35} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "imager":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* 3D Spatial Audio Sphere */}
            <div className="w-full flex justify-center">
              <svg viewBox="0 0 200 120" className="w-full h-28">
                <defs>
                  <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7900ff" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#00bcff" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background glow */}
                <ellipse cx="100" cy="60" rx="95" ry="55" fill="url(#sphereGlow)" />

                {/* Outer sphere boundary */}
                <ellipse cx="100" cy="60" rx="90" ry="50" fill="none" stroke="#7900ff" strokeWidth="0.8" opacity="0.3" />

                {/* 3D perspective grid - concentric ellipses */}
                <ellipse cx="100" cy="60" rx="70" ry="38" fill="none" stroke="#7900ff" strokeWidth="0.4" opacity="0.2" />
                <ellipse cx="100" cy="60" rx="50" ry="27" fill="none" stroke="#7900ff" strokeWidth="0.4" opacity="0.15" />
                <ellipse cx="100" cy="60" rx="30" ry="16" fill="none" stroke="#00bcff" strokeWidth="0.4" opacity="0.15" />
                <ellipse cx="100" cy="60" rx="12" ry="6" fill="none" stroke="#00bcff" strokeWidth="0.4" opacity="0.12" />

                {/* Longitude lines for 3D sphere effect */}
                <ellipse cx="100" cy="60" rx="20" ry="50" fill="none" stroke="#7900ff" strokeWidth="0.3" opacity="0.1" />
                <ellipse cx="100" cy="60" rx="50" ry="50" fill="none" stroke="#7900ff" strokeWidth="0.3" opacity="0.08" />
                <ellipse cx="100" cy="60" rx="75" ry="50" fill="none" stroke="#7900ff" strokeWidth="0.3" opacity="0.06" />

                {/* Cross-hair grid lines */}
                <line x1="10" y1="60" x2="190" y2="60" stroke="#7900ff" strokeWidth="0.3" opacity="0.15" />
                <line x1="100" y1="8" x2="100" y2="112" stroke="#7900ff" strokeWidth="0.3" opacity="0.15" />

                {/* Gold audio dots - center cluster (main focus) */}
                <circle cx="100" cy="58" r="3.5" fill="#f2a80d" opacity="0.95" />
                <circle cx="108" cy="54" r="2.5" fill="#f2a80d" opacity="0.85" />
                <circle cx="92" cy="56" r="2.8" fill="#f2a80d" opacity="0.9" />
                <circle cx="104" cy="65" r="2" fill="#f2a80d" opacity="0.8" />
                <circle cx="96" cy="63" r="2.2" fill="#f2a80d" opacity="0.82" />

                {/* Mid-field dots */}
                <circle cx="130" cy="52" r="2" fill="#f2a80d" opacity="0.7" />
                <circle cx="70" cy="55" r="1.8" fill="#f2a80d" opacity="0.65" />
                <circle cx="125" cy="68" r="1.8" fill="#f2a80d" opacity="0.6" />
                <circle cx="75" cy="70" r="1.5" fill="#f2a80d" opacity="0.55" />
                <circle cx="115" cy="42" r="1.5" fill="#f2a80d" opacity="0.5" />
                <circle cx="85" cy="45" r="1.6" fill="#f2a80d" opacity="0.55" />
                <circle cx="120" cy="75" r="1.3" fill="#f2a80d" opacity="0.45" />
                <circle cx="80" cy="78" r="1.4" fill="#f2a80d" opacity="0.48" />

                {/* Far-field dots - smaller and more transparent */}
                <circle cx="155" cy="55" r="1.2" fill="#f2a80d" opacity="0.35" />
                <circle cx="45" cy="62" r="1" fill="#f2a80d" opacity="0.3" />
                <circle cx="150" cy="70" r="1" fill="#f2a80d" opacity="0.28" />
                <circle cx="50" cy="50" r="1.1" fill="#f2a80d" opacity="0.32" />
                <circle cx="160" cy="45" r="0.8" fill="#f2a80d" opacity="0.25" />
                <circle cx="40" cy="72" r="0.9" fill="#f2a80d" opacity="0.22" />
                <circle cx="140" cy="38" r="0.9" fill="#f2a80d" opacity="0.2" />
                <circle cx="60" cy="82" r="0.8" fill="#f2a80d" opacity="0.18" />
                <circle cx="170" cy="60" r="0.7" fill="#f2a80d" opacity="0.15" />
                <circle cx="30" cy="58" r="0.7" fill="#f2a80d" opacity="0.12" />

                {/* Glow halos on center dots */}
                <circle cx="100" cy="58" r="8" fill="#f2a80d" opacity="0.06" />
                <circle cx="108" cy="54" r="6" fill="#f2a80d" opacity="0.04" />
                <circle cx="92" cy="56" r="6" fill="#f2a80d" opacity="0.04" />

                {/* L/R labels */}
                <text x="14" y="63" fill="#7900ff" fontSize="6" opacity="0.4" fontFamily="monospace">L</text>
                <text x="183" y="63" fill="#7900ff" fontSize="6" opacity="0.4" fontFamily="monospace">R</text>
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Width" color={color} value={0.7} />
              <MockKnob label="Depth" color="#00bcff" value={0.55} />
              <MockKnob label="Center" color={color} value={0.5} />
              <MockKnob label="Spread" color="#00bcff" value={0.6} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "chorus":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Chorus voices visualization */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Center reference */}
                <line x1="0" y1="28" x2="200" y2="28" stroke="#333" strokeWidth="0.4" />
                {/* Dry signal (center) */}
                <path d="M0,28 C20,18 40,38 60,28 C80,18 100,38 120,28 C140,18 160,38 180,28 L200,28" fill="none" stroke="#666" strokeWidth="1" />
                {/* Voice 1 — slightly delayed/detuned */}
                <path d="M0,22 C22,12 42,32 62,22 C82,12 102,32 122,22 C142,12 162,32 182,22 L200,22" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
                {/* Voice 2 — opposite detune */}
                <path d="M0,34 C18,24 38,44 58,34 C78,24 98,44 118,34 C138,24 158,44 178,34 L200,34" fill="none" stroke="#00bcff" strokeWidth="1" opacity="0.7" />
                {/* Voice 3 */}
                <path d="M0,18 C24,8 44,28 64,18 C84,8 104,28 124,18 C144,8 164,28 184,18 L200,18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
                <path d="M0,38 C16,28 36,48 56,38 C76,28 96,48 116,38 C136,28 156,48 176,38 L200,38" fill="none" stroke="#00bcff" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Rate" color={color} value={0.35} />
              <MockKnob label="Depth" color={color} value={0.6} />
              <MockKnob label="Voices" color={color} value={0.7} />
              <MockKnob label="Width" color="#00bcff" value={0.75} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.5} />
            </div>
          </div>
        );
      case "flanger":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Comb filter sweep visualization */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Comb filter notches */}
                {[10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 190].map((x, i) => {
                  const dip = Math.sin((i / 13) * Math.PI * 2) * 8;
                  return (
                    <path
                      key={i}
                      d={`M${x - 5},10 Q${x},${30 + dip} ${x + 5},10`}
                      fill="none"
                      stroke={color}
                      strokeWidth="0.8"
                      opacity={0.4 + Math.abs(dip) / 16}
                    />
                  );
                })}
                {/* Spectrum line */}
                <path d="M0,12 L200,12" stroke={color} strokeWidth="0.5" opacity="0.3" />
                <path d="M0,46 L200,46" stroke={color} strokeWidth="0.5" opacity="0.3" />
                {/* LFO sweep indicator */}
                <path d="M0,28 C20,16 40,40 60,28 C80,16 100,40 120,28 C140,16 160,40 180,28 L200,28" fill="none" stroke="#00bcff" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.4" />
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Rate" color={color} value={0.25} />
              <MockKnob label="Depth" color={color} value={0.7} />
              <MockKnob label="Fdbk" color={color} value={0.55} />
              <MockKnob label="Manual" color={color} value={0.4} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.5} />
            </div>
          </div>
        );
      case "phaser":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Phaser stages visualization */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                <line x1="0" y1="28" x2="200" y2="28" stroke="#333" strokeWidth="0.4" />
                {/* Multi-stage phase shift curves */}
                <path d="M0,28 C25,8 35,48 55,28 C75,8 85,48 105,28 C125,8 135,48 155,28 C175,8 185,48 200,28" fill="none" stroke={color} strokeWidth="1.4" opacity="0.85" />
                {/* Secondary phase curve */}
                <path d="M0,28 C20,18 30,38 50,28 C70,18 80,38 100,28 C120,18 130,38 150,28 C170,18 180,38 200,28" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
                {/* Stage notch markers */}
                {[35, 65, 95, 125, 155, 185].map((x, i) => (
                  <circle key={i} cx={x} cy="28" r="1.5" fill={color} opacity="0.7" />
                ))}
                {/* Stages label */}
                <text x="3" y="10" fill={color} fontSize="6" opacity="0.5" fontFamily="monospace">12 STAGES</text>
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Rate" color={color} value={0.3} />
              <MockKnob label="Depth" color={color} value={0.65} />
              <MockKnob label="Reson" color={color} value={0.55} />
              <MockKnob label="Stages" color={color} value={0.8} />
              <LushKnob color={color} />
              <MockKnob label="Mix" color={color} value={0.5} />
            </div>
          </div>
        );
      case "doubler":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Doubler waveform visualization — 3 stacked takes */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* L/R labels */}
                <text x="3" y="10" fill={color} fontSize="6" opacity="0.4" fontFamily="monospace">L</text>
                <text x="3" y="52" fill={color} fontSize="6" opacity="0.4" fontFamily="monospace">R</text>
                {/* Original take (center) */}
                <path d="M10,28 L20,20 L25,32 L35,18 L42,30 L52,22 L60,30 L72,16 L80,32 L92,18 L100,28 L112,22 L120,30 L130,16 L142,30 L150,22 L160,28 L172,18 L180,30 L190,22" fill="none" stroke="#888" strokeWidth="1" />
                {/* Double 1 — top (slight offset) */}
                <path d="M12,12 L22,6 L27,16 L37,4 L44,14 L54,8 L62,14 L74,2 L82,16 L94,4 L102,12 L114,8 L122,14 L132,2 L144,14 L152,8 L162,12 L174,4 L182,14 L192,8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.7" />
                {/* Double 2 — bottom (opposite offset) */}
                <path d="M8,46 L18,40 L23,50 L33,38 L40,48 L50,42 L58,48 L70,36 L78,50 L90,38 L98,46 L110,42 L118,48 L128,36 L140,48 L148,42 L158,46 L170,38 L178,48 L188,42" fill="none" stroke="#7900ff" strokeWidth="0.8" opacity="0.7" />
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Detune" color={color} value={0.4} />
              <MockKnob label="Time" color={color} value={0.5} />
              <MockKnob label="Width" color={color} value={0.75} />
              <MockKnob label="Mix" color={color} value={0.6} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "distortion":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Distortion transfer curve */}
            <svg viewBox="0 0 200 60" className="w-full h-12">
              <line x1="0" y1="30" x2="200" y2="30" stroke="#333" strokeWidth="0.5" />
              {/* Clean reference line */}
              <line x1="0" y1="60" x2="200" y2="0" stroke="#333" strokeWidth="0.4" strokeDasharray="4,4" />
              {/* Hard clipped / distorted curve */}
              <path
                d="M0,58 C10,52 20,40 35,28 C45,20 50,14 60,10 L80,8 L120,8 C130,8 140,8 150,10 C160,14 170,20 180,28 C190,36 195,42 200,48"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                opacity="0.8"
              />
              {/* Grit texture bars */}
              {[30, 55, 80, 105, 130, 155, 175].map((x, i) => (
                <rect key={i} x={x} y={8} width="2" height={4 + i * 1.5} rx="1" fill={color} opacity={0.15 + i * 0.05} />
              ))}
            </svg>
            <div className="flex gap-3 items-center">
              <MockKnob label="Drive" color={color} value={0.75} />
              <MockKnob label="Tone" color={color} value={0.5} />
              <MockKnob label="Output" color={color} value={0.4} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "exciter":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Harmonic excitation spectrum */}
            <div className="w-full flex justify-center gap-3 items-end">
              {/* Low band */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-px items-end h-10">
                  {[0.3, 0.5, 0.7, 0.4, 0.2].map((v, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-t"
                      style={{ height: `${v * 100}%`, backgroundColor: `${color}${Math.round(v * 200).toString(16).padStart(2, "0")}` }}
                    />
                  ))}
                </div>
                <span className="text-[6px] text-zinc-600">LOW</span>
              </div>
              {/* Sparkle indicator */}
              <svg viewBox="0 0 30 30" className="w-6 h-6">
                <line x1="15" y1="2" x2="15" y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
                <line x1="2" y1="15" x2="28" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3" />
                <line x1="5" y1="5" x2="25" y2="25" stroke={color} strokeWidth="0.4" opacity="0.2" />
                <line x1="25" y1="5" x2="5" y2="25" stroke={color} strokeWidth="0.4" opacity="0.2" />
                <circle cx="15" cy="15" r="3" fill={color} opacity="0.3" />
                <circle cx="15" cy="15" r="1.5" fill={color} opacity="0.8" />
              </svg>
              {/* High band */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-px items-end h-10">
                  {[0.2, 0.4, 0.8, 0.9, 0.6, 0.3].map((v, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-t"
                      style={{ height: `${v * 100}%`, backgroundColor: `#f2a80d${Math.round(v * 200).toString(16).padStart(2, "0")}` }}
                    />
                  ))}
                </div>
                <span className="text-[6px] text-zinc-600">HIGH</span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Low" color={color} value={0.4} />
              <MockKnob label="High" color="#f2a80d" value={0.65} />
              <MockKnob label="Mix" color={color} value={0.55} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "keybpm":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Key & BPM display */}
            <div className="w-full flex justify-center gap-4 items-center">
              {/* Key display */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[7px] text-zinc-600 tracking-wider">KEY</span>
                <div
                  className="px-4 py-2 rounded-lg border"
                  style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
                >
                  <span className="text-2xl font-bold font-mono" style={{ color }}>C#m</span>
                </div>
                <span className="text-[7px] text-zinc-500">Minor</span>
              </div>
              {/* BPM display */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[7px] text-zinc-600 tracking-wider">BPM</span>
                <div
                  className="px-4 py-2 rounded-lg border"
                  style={{ borderColor: `#00bcff40`, backgroundColor: `#00bcff08` }}
                >
                  <span className="text-2xl font-bold font-mono text-[#00bcff]">128</span>
                </div>
                <span className="text-[7px] text-zinc-500">Locked</span>
              </div>
            </div>
            {/* Link indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}>
                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5">
                  <path d="M4,8 L8,4 M3,5 C1,5 1,8 3,8 L4,8 M8,4 L9,4 C11,4 11,7 9,7" fill="none" stroke={color} strokeWidth="1.2" />
                </svg>
                <span className="text-[7px] font-medium" style={{ color }}>LINKED TO AUTO-TUNE</span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Sens" color={color} value={0.65} />
              <MockKnob label="Range" color="#00bcff" value={0.5} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "loudness":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* LUFS Meter Visualization */}
            <div className="w-full flex justify-center gap-3 items-center">
              {/* Stereo meters */}
              <div className="flex gap-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-3 h-14 bg-zinc-900 rounded border border-zinc-800 overflow-hidden relative">
                    <div className="absolute bottom-0 w-full rounded-b" style={{ height: "72%", background: `linear-gradient(to top, ${color}30, ${color}80, ${color})` }} />
                    <div className="absolute w-full h-px" style={{ bottom: "60%", backgroundColor: "#f2a80d", opacity: 0.6 }} />
                  </div>
                  <span className="text-[5px] text-zinc-600">L</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-3 h-14 bg-zinc-900 rounded border border-zinc-800 overflow-hidden relative">
                    <div className="absolute bottom-0 w-full rounded-b" style={{ height: "68%", background: `linear-gradient(to top, ${color}30, ${color}80, ${color})` }} />
                    <div className="absolute w-full h-px" style={{ bottom: "60%", backgroundColor: "#f2a80d", opacity: 0.6 }} />
                  </div>
                  <span className="text-[5px] text-zinc-600">R</span>
                </div>
              </div>
              {/* Readouts */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-mono font-bold" style={{ color }}>-14.2</span>
                  <span className="text-[7px] text-zinc-600">LUFS</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col">
                    <span className="text-[6px] text-zinc-600 tracking-wider">TRUE PEAK</span>
                    <span className="text-[10px] font-mono" style={{ color: "#f2a80d" }}>-1.0 dB</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[6px] text-zinc-600 tracking-wider">RANGE</span>
                    <span className="text-[10px] font-mono text-zinc-400">7.2 LU</span>
                  </div>
                </div>
              </div>
              {/* Target badge */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="px-1.5 py-0.5 rounded border" style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }}>
                  <span className="text-[8px] font-mono" style={{ color }}>-14</span>
                </div>
                <span className="text-[5px] text-green-500">ON TARGET</span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Target" color={color} value={0.5} />
              <MockKnob label="Range" color={color} value={0.6} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      case "depop":
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Waveform with plosive detection */}
            <div className="w-full h-14 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 56" className="w-full h-full">
                {/* Zero line */}
                <line x1="0" y1="28" x2="200" y2="28" stroke="#333" strokeWidth="0.5" />
                {/* Normal waveform */}
                <path d="M0,28 L5,24 L10,32 L15,22 L20,34 L25,26 L30,30 L35,25 L40,31 L45,27 L50,29 L55,26 L60,30"
                  fill="none" stroke="#555" strokeWidth="1" />
                {/* Plosive spike (detected) */}
                <path d="M60,30 L63,8 L65,6 L67,4 L70,8 L73,12 L75,28 L77,44 L79,48 L81,50 L83,46 L85,38 L88,30"
                  fill="none" stroke={`${color}90`} strokeWidth="1.5" />
                {/* Detection bracket */}
                <rect x="58" y="1" width="33" height="54" rx="2" fill={`${color}08`} stroke={`${color}50`} strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="74.5" y="8" fill={color} fontSize="5" textAnchor="middle" fontFamily="monospace" fontWeight="bold">P</text>
                {/* Tamed waveform after plosive */}
                <path d="M88,30 L93,26 L98,31 L103,24 L108,33 L113,27 L118,30 L123,25 L128,32 L133,26 L138,29"
                  fill="none" stroke="#555" strokeWidth="1" />
                {/* Second plosive (smaller) */}
                <path d="M138,29 L141,14 L143,12 L145,14 L148,22 L150,28 L152,36 L154,40 L156,38 L158,30"
                  fill="none" stroke={`${color}90`} strokeWidth="1.5" />
                <rect x="136" y="5" width="25" height="46" rx="2" fill={`${color}08`} stroke={`${color}50`} strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="148.5" y="12" fill={color} fontSize="5" textAnchor="middle" fontFamily="monospace" fontWeight="bold">B</text>
                {/* Remaining waveform */}
                <path d="M158,30 L163,26 L168,31 L173,25 L178,32 L183,27 L188,30 L193,26 L198,29 L200,28"
                  fill="none" stroke="#555" strokeWidth="1" />
                {/* Reduction meter bar */}
                <rect x="2" y="48" width="40" height="5" rx="2" fill="#222" />
                <rect x="2" y="48" width="18" height="5" rx="2" fill={`${color}60`} />
                <text x="44" y="52.5" fill="#666" fontSize="4" fontFamily="monospace">-6.2 dB</text>
              </svg>
            </div>
            <div className="flex gap-3 items-center">
              <MockKnob label="Thresh" color={color} value={0.35} />
              <MockKnob label="Depth" color={color} value={0.6} />
              <MockKnob label="Speed" color={color} value={0.5} />
              <MockKnob label="Filter" color={color} value={0.3} />
              <LushKnob color={color} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-48 mb-6 rounded-lg bg-black border border-white/10 flex items-center justify-center overflow-hidden p-4">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{renderMock()}</div>
    </div>
  );
}
