"use client";

import React from "react";

interface CorporateLogoProps {
  className?: string;
  size?: number;
}

export default function CorporateLogo({ className = "", size = 40 }: CorporateLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(107,45,140,0.2)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          {/* Brand Gradients */}
          <linearGradient id="logoGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          <linearGradient id="logoPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B2D8C" />
            <stop offset="100%" stopColor="#00A3C4" />
          </linearGradient>

          <linearGradient id="logoEmerald" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#007A5E" />
            <stop offset="100%" stopColor="#00A3C4" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Structure representing Minerals/Engineering */}
        <polygon
          points="50,5 90,27 90,73 50,95 10,73 10,27"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.5"
        />

        {/* Facet 1: Gold Ascent (Left Pillar) representing value and growth */}
        <path
          d="M 25 35 L 50 20 L 50 80 L 25 65 Z"
          fill="url(#logoGold)"
          opacity="0.9"
        />

        {/* Facet 2: Purple Innovation (Right Pillar) representing technology */}
        <path
          d="M 75 35 L 50 20 L 50 80 L 75 65 Z"
          fill="url(#logoPurple)"
          opacity="0.85"
        />

        {/* Facet 3: Emerald Sustainability (Inner Core Prism) representing energy */}
        <path
          d="M 50 35 L 62 42 L 50 72 L 38 42 Z"
          fill="url(#logoEmerald)"
          opacity="0.95"
        />

        {/* Stylized Intersecting Synergies Line */}
        <polyline
          points="50,20 50,80"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />
        
        <polyline
          points="25,35 50,35 75,35"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
