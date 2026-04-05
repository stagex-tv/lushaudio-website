"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/5"
    >
      <Link href="/" className="text-xl font-bold tracking-widest">
        STAGE <span className="text-accent-green">X</span>
      </Link>
      <div className="flex items-center gap-8 text-sm text-zinc-400">
        <Link href="#plugins" className="hover:text-white transition-colors">
          Plugins
        </Link>
        <Link href="#about" className="hover:text-white transition-colors">
          About
        </Link>
        <Link
          href="#contact"
          className="px-4 py-2 rounded-full border border-accent-green/40 text-accent-green hover:bg-accent-green/10 transition-all"
        >
          Contact
        </Link>
      </div>
    </motion.nav>
  );
}
