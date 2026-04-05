"use client";

import { motion } from "framer-motion";
import PluginCard from "./PluginCard";

const plugins = [
  {
    name: "Lush Harmonix",
    tagline: "Harmonic Shaper",
    description:
      "Shape your sound with precision 3rd, 5th & 7th harmonic control, advanced cut filters up to 96dB/oct with brick wall mode. Built-in Lush reverb knob for instant depth.",
    accentColor: "#7900ff",
    mockType: "harmonix",
    comingSoon: false,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Verb",
    tagline: "Reverb",
    description:
      "From tight rooms to infinite halls. Pristine algorithmic reverb with advanced damping, modulation, and the signature Lush knob for one-touch spatial depth.",
    accentColor: "#0531fa",
    mockType: "verb",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Comp",
    tagline: "Compressor",
    description:
      "Transparent to aggressive dynamics control. Musical attack and release curves, sidechain filtering, and a Lush reverb section to add space post-compression.",
    accentColor: "#00bcff",
    mockType: "comp",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Pro Q",
    tagline: "Equalizer",
    description:
      "Surgical precision meets musical character. Dynamic EQ bands, mid/side processing, spectrum analyzer, and integrated Lush knob for adding warmth to any mix.",
    accentColor: "#f2a80d",
    mockType: "proq",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Delay",
    tagline: "Delay",
    description:
      "Analog-modelled tape and digital delay with tempo sync, ping-pong, and ducking. Every echo gets the Lush treatment with a built-in reverb tail control.",
    accentColor: "#00bcff",
    mockType: "delay",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Gate",
    tagline: "Noise Gate",
    description:
      "Clean up your signal with precision gating. Lookahead, hysteresis, sidechain filter, and a Lush knob to blend subtle reverb on the gated signal.",
    accentColor: "#0531fa",
    mockType: "gate",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Limiter",
    tagline: "Limiter",
    description:
      "True peak limiting with transparent loudness maximization. Multiple release modes, auto-gain, and the Lush reverb section for mastering-grade spatial glue.",
    accentColor: "#7900ff",
    mockType: "limiter",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Clipper",
    tagline: "Soft Clipper",
    description:
      "Add warmth, grit, and loudness with musical soft clipping. Variable saturation curves, oversampling, and a Lush knob for blending reverb into the clipped signal.",
    accentColor: "#f2a80d",
    mockType: "clipper",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush De-Esser",
    tagline: "De-Esser",
    description:
      "Tame harsh sibilance without dulling your vocals. Intelligent frequency detection, split-band processing, and a Lush reverb knob to smooth and spatialize.",
    accentColor: "#00bcff",
    mockType: "deesser",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Auto-Tune",
    tagline: "Pitch Correction",
    description:
      "Real-time pitch correction from subtle to hard-tune. Key and scale detection, formant preservation, pitch display, and the signature Lush knob for instant reverbed vocals.",
    accentColor: "#00bcff",
    mockType: "autotune",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Saturation",
    tagline: "Saturation",
    description:
      "Tube, tape, and transistor warmth in one plugin. Shape your harmonic content with a musical transfer curve, harmonic spectrum view, and a Lush knob for saturated reverb tails.",
    accentColor: "#f2a80d",
    mockType: "saturation",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
  {
    name: "Lush Multi-Band",
    tagline: "Multi-Band",
    description:
      "Split your signal into four frequency bands and process each independently. Per-band compression, stereo width, and gain — plus a Lush knob for multi-band reverb blending.",
    accentColor: "#7900ff",
    mockType: "multiband",
    comingSoon: true,
    price: 99,
    originalPrice: 129,
  },
];

export default function PluginsSection() {
  return (
    <section id="plugins" className="pt-4 pb-16 px-6 scroll-mt-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 mt-10"
        >
          <p className="text-tertiary text-sm tracking-[0.3em] uppercase mb-4">
            Our Tools
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-wave">Plugins</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Every Lush plugin features a built-in{" "}
            <span className="text-primary font-medium">Lush Knob</span> — one
            knob to instantly add studio-grade reverb to any signal chain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {plugins.map((plugin) => (
            <PluginCard key={plugin.name} {...plugin} />
          ))}
        </div>
      </div>
    </section>
  );
}
