"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CountUpProps {
  value: string;
  className?: string;
}

// Animates the leading numeric portion of a stat label (e.g. "40+", "$12B+", "15,000+", "4.6/5")
// while preserving its prefix/suffix text, triggered once the element scrolls into view.
export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);

  useGSAP(
    () => {
      if (!match || !ref.current) return;
      const [, prefix, numeric, suffix] = match;
      const hasCommas = numeric.includes(",");
      const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
      const target = parseFloat(numeric.replace(/,/g, ""));
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (!ref.current) return;
          const formatted = decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toString();
          ref.current.textContent = prefix + (hasCommas ? Number(formatted).toLocaleString() : formatted) + suffix;
        },
      });
    },
    { scope: ref }
  );

  return <span ref={ref} className={className}>{match ? `${match[1]}0${match[3]}` : value}</span>;
}
