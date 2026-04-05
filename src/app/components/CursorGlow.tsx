"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    let raf: number;
    const animate = () => {
      // Main glow follows cursor instantly
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      // Trail follows with lerp (smooth lag)
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer trail glow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(121,0,255,0.06) 0%, rgba(121,0,255,0.02) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* Inner cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(121,0,255,0.5) 0%, rgba(121,0,255,0.2) 50%, transparent 70%)",
          boxShadow: "0 0 15px rgba(121,0,255,0.4), 0 0 30px rgba(121,0,255,0.15)",
          willChange: "transform",
        }}
      />
    </>
  );
}
