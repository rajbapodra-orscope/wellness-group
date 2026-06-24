"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ImmersiveVerticalProps {
  id: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  accent: string;
  icon: React.ReactNode;
  align?: "left" | "right";
}

// Returns false when Data Saver is on or the connection is slow-2G / 2G.
function canPlayVideo(): boolean {
  if (typeof navigator === "undefined") return true;
  const conn = (navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !["slow-2g", "2g"].includes(conn.effectiveType ?? "");
}

export default function ImmersiveVertical({
  id, tagline, title, description, image, video, accent, icon, align = "left",
}: ImmersiveVerticalProps) {
  const sectionRef   = useRef<HTMLElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const accentBarRef = useRef<HTMLDivElement>(null);

  // Lazy video: only downloaded + played when the section enters the viewport
  // AND the connection can handle it.  preload="none" keeps it off the wire
  // entirely until then.
  useEffect(() => {
    const videoEl = videoRef.current;
    const section = sectionRef.current;
    if (!video || !videoEl || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canPlayVideo()) videoEl.play().catch(() => {});
        else videoEl.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [video]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      // ── Full cinematic: large screen + user hasn't asked for reduced motion ──
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Ken Burns: Y drift + zoom scrubbed to full scroll range of section
          gsap.fromTo(
            bgRef.current,
            { yPercent: -5, scale: 1.02 },
            {
              yPercent: 5, scale: 1.1, ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            }
          );

          // Title parallax scrub — translates up as the section scrolls through.
          // Using y + opacity only (no scale) because scaling text below 1 triggers
          // bilinear downsampling which makes crisp type look blurry.
          gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 75%", end: "bottom 25%", scrub: 1.2 },
          })
            .fromTo(titleRef.current, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "none" })
            .to(titleRef.current, { y: -28, autoAlpha: 0, ease: "none" });

          // Text panel stagger: tagline → description → accent bar
          gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 62%", toggleActions: "play none none reverse" },
          })
            .fromTo(taglineRef.current,
              { xPercent: align === "right" ? 28 : -28, autoAlpha: 0 },
              { xPercent: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" }
            )
            .fromTo(descRef.current,
              { y: 26, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
              "-=0.45"
            )
            .fromTo(accentBarRef.current,
              { scaleX: 0, transformOrigin: align === "right" ? "right center" : "left center" },
              { scaleX: 1, duration: 0.55, ease: "power2.out" },
              "-=0.35"
            );
        }
      );

      // ── Simplified: mobile / tablet / reduced-motion ───────────────────────
      // One-shot fade-in — no scrubbing, no heavy parallax.
      mm.add(
        "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.fromTo(
            [taglineRef.current, titleRef.current, descRef.current, accentBarRef.current],
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.55, ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      data-accent={accent}
      className="vertical-section relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background media */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {video ? (
          <video
            ref={videoRef}
            poster={image}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Directional overlay — on mobile both sides need coverage for readability */}
      <div className={`absolute inset-0 ${
        align === "right"
          ? "bg-gradient-to-l from-[#0F2430]/93 via-[#0F2430]/60 to-[#0F2430]/30 lg:to-transparent"
          : "bg-gradient-to-r from-[#0F2430]/93 via-[#0F2430]/60 to-[#0F2430]/30 lg:to-transparent"
      }`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/50 via-transparent to-[#0F2430]/20 pointer-events-none" />

      {/* Content panel */}
      <div className={`relative z-10 w-full max-w-xl px-5 sm:px-10 lg:px-16 flex flex-col ${
        align === "right" ? "ml-auto text-right items-end" : ""
      }`}>
        <div
          ref={taglineRef}
          className={`flex items-center gap-2.5 mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}
          style={{ color: accent }}
        >
          {icon}
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em]">{tagline}</span>
        </div>

        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
        >
          {title}
        </h2>

        <p ref={descRef} className="text-white/90 text-sm lg:text-base leading-relaxed max-w-sm lg:max-w-none">
          {description}
        </p>

        <div
          ref={accentBarRef}
          className={`mt-5 sm:mt-8 h-[3px] w-10 sm:w-16 rounded-full ${align === "right" ? "self-end" : ""}`}
          style={{ backgroundColor: accent }}
        />
      </div>
    </section>
  );
}
