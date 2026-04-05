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
            <div className="w-full h-10 rounded bg-zinc-900/50 border border-zinc-800 overflow-hidden relative">
              <svg viewBox="0 0 200 40" className="w-full h-full">
                <path d="M0,38 L10,5 C30,8 60,15 100,25 C140,32 180,37 200,38" fill={`${color}15`} stroke={color} strokeWidth="1" opacity="0.6" />
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
            <div className="flex gap-0.5 items-end h-8">
              {[0.1, 0.1, 0.9, 0.9, 0.9, 0.1, 0.1, 0.1, 0.9, 0.9, 0.1, 0.1, 0.9, 0.9, 0.9, 0.9, 0.1].map((v, i) => (
                <div key={i} className="w-1.5 rounded-t" style={{ height: `${v * 100}%`, backgroundColor: v > 0.5 ? color : `${color}30` }} />
              ))}
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
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "75%", background: `linear-gradient(90deg, ${color}40, ${color})` }} />
              </div>
              <span className="text-[8px] text-zinc-500">-3.2 dB</span>
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
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-48 mb-6 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center overflow-hidden p-4">
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
