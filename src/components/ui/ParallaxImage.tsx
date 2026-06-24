"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  /** Optional video that plays when the section is on-screen. `src` is used as its poster. */
  video?: string;
}

// Returns false on Data Saver or 2G/slow-2G connections.
function canPlayVideo(): boolean {
  if (typeof navigator === "undefined") return true;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !["slow-2g", "2g"].includes(conn.effectiveType ?? "");
}

export default function ParallaxImage({
  src, alt, className = "", children, priority = false, video,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef     = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      // Parallax only on desktop with no reduced-motion preference —
      // GPU-composited on desktop but expensive on low-end mobile.
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            layerRef.current,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      );
    },
    { scope: containerRef }
  );

  // Lazy video: play only when visible and connection allows it.
  // preload="none" keeps it off the wire until the observer fires.
  useEffect(() => {
    const videoEl = videoRef.current;
    const container = containerRef.current;
    if (!video || !videoEl || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canPlayVideo()) videoEl.play().catch(() => {});
        else videoEl.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [video]);

  const hasPosition = /\b(relative|absolute|fixed|sticky)\b/.test(className);

  return (
    <div ref={containerRef} className={`${hasPosition ? "" : "relative"} overflow-hidden ${className}`}>
      <div ref={layerRef} className="absolute left-0 right-0 -top-[15%] h-[130%]">
        {video ? (
          <video
            ref={videoRef}
            poster={src}
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
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      {children}
    </div>
  );
}
