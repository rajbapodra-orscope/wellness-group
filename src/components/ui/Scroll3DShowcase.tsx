"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface Scroll3DItem {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
}

interface Scroll3DShowcaseProps {
  items: Scroll3DItem[];
}

// Pins the section and spins a 3D ring of cards as the user scrolls through it —
// each card rotates to face the viewer in turn, like a scroll-driven carousel story.
export default function Scroll3DShowcase({ items }: Scroll3DShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const total = items.length;
      const radius = 380;
      const stepAngle = 360 / total;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotationY: i * stepAngle,
          z: radius,
          transformPerspective: 1400,
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (total - 1)}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress * (total - 1);
          gsap.set(groupRef.current, { rotationY: -progress * stepAngle });

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            let diff = Math.abs(i - progress);
            diff = Math.min(diff, total - diff);
            gsap.set(card, {
              opacity: gsap.utils.clamp(0.15, 1, 1 - diff * 0.6),
              scale: gsap.utils.clamp(0.75, 1.06, 1.06 - diff * 0.18),
            });
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [items.length] }
  );

  return (
    <section
      ref={sectionRef}
      className="hidden lg:flex relative h-screen overflow-hidden bg-white items-center justify-center"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10 px-6">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3E5868]">Scroll to Explore</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2430] mt-2">Five Verticals, One Synergy</h2>
      </div>

      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1400px" }}>
        <div ref={groupRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 w-[300px] sm:w-[360px] bg-white border border-[#E2E5E8] rounded-3xl shadow-2xl shadow-[#0F2430]/10 p-8 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8] flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3E5868]">{item.tagline}</span>
              <h3 className="text-xl font-bold text-[#0F2430]">{item.title}</h3>
              <p className="text-sm text-[#3E5868] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <span className="text-[10px] uppercase tracking-widest text-[#3E5868]">Keep Scrolling</span>
        <div className="w-6 h-10 rounded-full border-2 border-[#0F2430]/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-[#0F2430] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
