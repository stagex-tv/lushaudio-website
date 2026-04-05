"use client";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-12 px-6 border-t border-white/5 text-center"
    >
      <p className="text-xl font-bold tracking-widest mb-4">
        LUSH <span className="text-primary">PLUGINS</span>
      </p>
      <p className="text-zinc-500 text-sm mb-6">
        Premium audio tools for music production.
      </p>
      <div className="flex justify-center gap-6 text-sm text-zinc-500">
        <a href="#" className="hover:text-white transition-colors">
          Twitter
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Instagram
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Email
        </a>
      </div>
      <p className="text-zinc-700 text-xs mt-8">
        &copy; {new Date().getFullYear()} Lush Plugins. All rights reserved.
      </p>
    </footer>
  );
}
