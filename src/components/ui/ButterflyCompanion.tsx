"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ButterflyLogo from "./ButterflyLogo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const RESTING_SPOT = { top: "7vh", left: "90vw" };

// Persistent animated companion butterfly.
// Lifecycle:
//   1. Starts centered in the hero at full size.
//   2. As the hero scrolls away it flies to a fixed top-right slot (scrubbed to hero scroll).
//   3. A gentle hover bob keeps it alive while idle.
//   4. When a .vertical-section scrolls into center: "excited" state — accelerated wing beat,
//      glowing pulse, sparkle trail burst, flies slightly closer.
//   5. On CTA section enter: switches from `fixed` to `absolute` and docks beside the headline.
export default function ButterflyCompanion() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  // wingGroupRef carries `data-excited` — CSS in globals.css targets the wing classes inside it.
  const wingGroupRef = useRef<HTMLDivElement>(null);

  // Burst 5 glowing particles from the butterfly's current viewport position.
  // Skipped entirely if the user prefers reduced motion (accessibility + performance).
  const spawnTrail = (color: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 5; i++) {
      const size = 4 + Math.random() * 5;
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        left: ${cx - size / 2}px;
        top: ${cy - size / 2}px;
        pointer-events: none;
        z-index: 59;
        box-shadow: 0 0 ${size * 2.5}px ${color};
      `;
      document.body.appendChild(dot);

      const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 28 + Math.random() * 44;

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

  useGSAP(() => {
    if (!wrapperRef.current || !glowRef.current) return;

    // Start centered in the hero, slightly larger than resting size
    gsap.set(wrapperRef.current, {
      top: "46vh",
      left: "50vw",
      xPercent: -50,
      yPercent: -50,
      scale: 1.4,
    });

    // Soft entrance before the user scrolls
    gsap.from(wrapperRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });

    // ── Fly-out: completes within the first viewport-height of hero scroll.
    // The hero is now 450vh tall (scroll-storytelling space); using "bottom top"
    // would make the flight take 450vh. Instead we end at 1 × innerHeight past the
    // hero's top so the butterfly settles quickly before the image cards appear.
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: true,
      },
    }).to(wrapperRef.current, {
      top: RESTING_SPOT.top,
      left: RESTING_SPOT.left,
      scale: 0.6,
      rotate: 6,
      ease: "none",
    });

    // ── Idle hover — keeps the companion feeling alive between section reactions
    gsap.to(wrapperRef.current, {
      y: "+=12",
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // ── Excited state: flies closer, pulses glow, spawns sparkles, speeds up wings
    const reactTo = (color: string) => {
      wingGroupRef.current?.setAttribute("data-excited", "true");
      spawnTrail(color);

      // Quick scale surge then settle at a slightly larger resting size
      gsap.killTweensOf(wrapperRef.current, "scale,left,top,rotate");
      gsap.to(wrapperRef.current, {
        left: "83vw",
        top: "13vh",
        scale: 0.9,
        rotate: -5,
        duration: 0.55,
        ease: "power2.out",
      });
      gsap.to(wrapperRef.current, {
        scale: 0.68,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.55,
      });

      // Glow: burst in then sustain as a pulsing halo
      gsap.killTweensOf(glowRef.current);
      gsap.to(glowRef.current, {
        backgroundColor: color,
        opacity: 0.72,
        scale: 1.35,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(glowRef.current, {
            opacity: 0.32,
            scale: 0.82,
            duration: 1.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    };

    // ── Calm state: return to resting spot, kill glow, slow wings
    const calm = () => {
      wingGroupRef.current?.setAttribute("data-excited", "false");

      gsap.killTweensOf(glowRef.current);
      gsap.to(wrapperRef.current, {
        left: RESTING_SPOT.left,
        top: RESTING_SPOT.top,
        scale: 0.6,
        rotate: 6,
        duration: 0.9,
        ease: "power2.inOut",
      });
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    // One ScrollTrigger per vertical section — discovered by class, no prop coupling
    const sections = gsap.utils.toArray<HTMLElement>(".vertical-section");
    sections.forEach((section) => {
      const accent = section.dataset.accent || "#168F5D";
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => reactTo(accent),
        onEnterBack: () => reactTo(accent),
        onLeave: calm,
        onLeaveBack: calm,
      });
    });

    // ── CTA dock: butterfly switches from fixed to absolute and lands beside the headline.
    // Must convert viewport coords → document coords when switching position type to avoid jump.
    const ctaSection = document.querySelector<HTMLElement>("#cta-section");
    const ctaDock = document.querySelector<HTMLElement>("#cta-butterfly-dock");
    if (ctaSection && ctaDock) {
      const repinKeepingVisualPosition = (nextPosition: "fixed" | "absolute") => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const top = nextPosition === "absolute" ? cy + window.scrollY : cy;
        const left = nextPosition === "absolute" ? cx + window.scrollX : cx;
        gsap.set(wrapper, { position: nextPosition, top, left });
      };

      const dockAtCta = () => {
        wingGroupRef.current?.setAttribute("data-excited", "false");
        repinKeepingVisualPosition("absolute");
        const rect = ctaDock.getBoundingClientRect();
        const docTop = rect.top + window.scrollY + rect.height / 2;
        const docLeft = rect.left + window.scrollX + rect.width / 2;
        gsap.to(wrapperRef.current, {
          top: docTop,
          left: docLeft,
          scale: 0.65,
          rotate: 0,
          duration: 0.9,
          ease: "power2.inOut",
        });
        gsap.killTweensOf(glowRef.current);
        gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.5 });
      };

      const undockFromCta = () => {
        repinKeepingVisualPosition("fixed");
        calm();
      };

      ScrollTrigger.create({
        trigger: ctaSection,
        start: "top 60%",
        end: "bottom top",
        onEnter: dockAtCta,
        onEnterBack: dockAtCta,
        onLeaveBack: undockFromCta,
      });
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed z-[60] pointer-events-none hidden md:block"
      style={{ top: "46vh", left: "50vw" }}
    >
      {/* Glow halo — color + opacity driven by GSAP */}
      <div
        ref={glowRef}
        className="absolute -inset-10 rounded-full blur-3xl opacity-0"
        style={{ backgroundColor: "#168F5D" }}
      />
      {/* wingGroupRef carries data-excited so globals.css can speed up the CSS wing animations */}
      <div ref={wingGroupRef}>
        <ButterflyLogo size={100} className="relative z-10" />
      </div>
    </div>
  );
}
