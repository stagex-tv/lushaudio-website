"use client";

import { motion } from "framer-motion";

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Clouds ── */}
        <motion.g
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.045}
          fill="#ffffff"
        >
          <ellipse cx="180" cy="100" rx="90" ry="28" />
          <ellipse cx="230" cy="90" rx="60" ry="22" />
          <ellipse cx="140" cy="108" rx="55" ry="18" />
        </motion.g>

        <motion.g
          animate={{ x: [0, -22, 0] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.03}
          fill="#ffffff"
        >
          <ellipse cx="900" cy="70" rx="110" ry="30" />
          <ellipse cx="960" cy="58" rx="75" ry="24" />
          <ellipse cx="855" cy="78" rx="65" ry="20" />
        </motion.g>

        <motion.g
          animate={{ x: [0, 14, 0] }}
          transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.025}
          fill="#ffffff"
        >
          <ellipse cx="1300" cy="130" rx="95" ry="26" />
          <ellipse cx="1355" cy="118" rx="65" ry="20" />
          <ellipse cx="1255" cy="138" rx="58" ry="17" />
        </motion.g>

        <motion.g
          animate={{ x: [0, -16, 0] }}
          transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
          opacity={0.02}
          fill="#ffffff"
        >
          <ellipse cx="550" cy="55" rx="80" ry="22" />
          <ellipse cx="600" cy="44" rx="55" ry="17" />
          <ellipse cx="510" cy="62" rx="50" ry="15" />
        </motion.g>

        {/* ── Mountains — far back (faintest) ── */}
        <path
          d="M0 900 L0 620 L120 420 L240 560 L380 340 L520 510 L660 360 L800 490 L940 300 L1080 470 L1220 350 L1360 460 L1440 380 L1440 900 Z"
          fill="#ffffff"
          opacity={0.018}
        />

        {/* ── Mountains — mid layer ── */}
        <path
          d="M0 900 L0 700 L100 560 L200 650 L340 480 L480 600 L600 500 L720 620 L860 450 L1000 580 L1140 490 L1280 600 L1440 520 L1440 900 Z"
          fill="#ffffff"
          opacity={0.025}
        />

        {/* ── Mountains — foreground (most visible) ── */}
        <path
          d="M0 900 L0 780 L80 680 L180 740 L300 630 L420 720 L540 650 L660 730 L780 610 L900 700 L1020 640 L1140 710 L1260 660 L1380 720 L1440 690 L1440 900 Z"
          fill="#ffffff"
          opacity={0.03}
        />

        {/* ── Waves ── */}
        <motion.path
          d="M0 820 Q180 790 360 820 Q540 850 720 820 Q900 790 1080 820 Q1260 850 1440 820 L1440 900 L0 900 Z"
          fill="#489F3D"
          opacity={0.04}
          animate={{
            d: [
              "M0 820 Q180 790 360 820 Q540 850 720 820 Q900 790 1080 820 Q1260 850 1440 820 L1440 900 L0 900 Z",
              "M0 830 Q180 810 360 830 Q540 850 720 830 Q900 810 1080 830 Q1260 850 1440 830 L1440 900 L0 900 Z",
              "M0 820 Q180 790 360 820 Q540 850 720 820 Q900 790 1080 820 Q1260 850 1440 820 L1440 900 L0 900 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0 845 Q180 825 360 845 Q540 865 720 845 Q900 825 1080 845 Q1260 865 1440 845 L1440 900 L0 900 Z"
          fill="#489F3D"
          opacity={0.035}
          animate={{
            d: [
              "M0 845 Q180 825 360 845 Q540 865 720 845 Q900 825 1080 845 Q1260 865 1440 845 L1440 900 L0 900 Z",
              "M0 855 Q180 840 360 855 Q540 870 720 855 Q900 840 1080 855 Q1260 870 1440 855 L1440 900 L0 900 Z",
              "M0 845 Q180 825 360 845 Q540 865 720 845 Q900 825 1080 845 Q1260 865 1440 845 L1440 900 L0 900 Z",
            ],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0 865 Q180 850 360 865 Q540 880 720 865 Q900 850 1080 865 Q1260 880 1440 865 L1440 900 L0 900 Z"
          fill="#489F3D"
          opacity={0.025}
          animate={{
            d: [
              "M0 865 Q180 850 360 865 Q540 880 720 865 Q900 850 1080 865 Q1260 880 1440 865 L1440 900 L0 900 Z",
              "M0 870 Q180 858 360 870 Q540 882 720 870 Q900 858 1080 870 Q1260 882 1440 870 L1440 900 L0 900 Z",
              "M0 865 Q180 850 360 865 Q540 880 720 865 Q900 850 1080 865 Q1260 880 1440 865 L1440 900 L0 900 Z",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
