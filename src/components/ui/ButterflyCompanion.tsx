"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const RESTING: React.CSSProperties = { top: "7vh", right: "2vw" };

export default function ButterflyCompanion() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el   = wrapperRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    // ── Gentle entrance fade-in at the corner ──────────────────────────────
    gsap.from(el, { opacity: 0, scale: 0.6, duration: 1, ease: "power2.out", delay: 0.5 });

    // ── Continuous floating bob ────────────────────────────────────────────
    gsap.to(el, {
      y: "+=14",
      duration: 2.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // ── Slow wing-flap via rotation ────────────────────────────────────────
    gsap.to(imgRef.current, {
      scaleX: 0.7,
      duration: 0.35,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // ── Drift left/right slightly ──────────────────────────────────────────
    gsap.to(el, {
      x: "+=18",
      duration: 4.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

    // ── React to vertical sections ─────────────────────────────────────────
    const spawnTrail = (color: string) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;

      for (let i = 0; i < 5; i++) {
        const size = 4 + Math.random() * 5;
        const dot  = document.createElement("div");
        dot.style.cssText = `
          position:fixed;width:${size}px;height:${size}px;border-radius:50%;
          background:${color};left:${cx - size / 2}px;top:${cy - size / 2}px;
          pointer-events:none;z-index:59;box-shadow:0 0 ${size * 2.5}px ${color};
        `;
        document.body.appendChild(dot);
        const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
        const dist  = 28 + Math.random() * 44;
        gsap.to(dot, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0.1,
          duration: 0.6 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => dot.remove(),
        });
      }
    };

    const excite = (color: string) => {
      spawnTrail(color);
      gsap.to(el, { scale: 1.25, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 });
      gsap.to(glow, { opacity: 0.55, scale: 1.4, backgroundColor: color, duration: 0.35,
        onComplete: () => gsap.to(glow, { opacity: 0.22, scale: 0.85, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut" }),
      });
    };

    const calm = () => {
      gsap.killTweensOf(glow);
      gsap.to(glow, { opacity: 0, scale: 1, duration: 0.6, ease: "power2.out" });
    };

    gsap.utils.toArray<HTMLElement>(".vertical-section").forEach((section) => {
      const color = section.dataset.accent || "#168F5D";
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => excite(color),
        onEnterBack: () => excite(color),
        onLeave: calm,
        onLeaveBack: calm,
      });
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed z-[60] pointer-events-none hidden md:block"
      style={RESTING}
    >
      {/* Glow halo */}
      <div
        ref={glowRef}
        className="absolute -inset-8 rounded-full blur-2xl opacity-0"
        style={{ backgroundColor: "#168F5D" }}
      />
      {/* Real butterfly photo */}
      <div ref={imgRef} className="relative z-10 drop-shadow-xl">
        <Image
          src="/butterfly.png"
          alt="Butterfly"
          width={80}
          height={80}
          className="object-contain"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))" }}
        />
      </div>
    </div>
  );
}
