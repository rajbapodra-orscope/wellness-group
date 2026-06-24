"use client";

import React from "react";

interface ButterflyLogoProps {
  className?: string;
  size?: number;
}

export default function ButterflyLogo({ className = "", size = 48 }: ButterflyLogoProps) {
  return (
    <div
      className={`group relative flex items-center justify-center select-none cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(15,36,48,0.25)] transition-all duration-500 group-hover:scale-105"
      >
        <defs>
          {/* Upper wings — warm sunset gradient, like a monarch/swallowtail */}
          <linearGradient id="wingTopLeft" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#FF7A45" />
            <stop offset="55%" stopColor="#FFA94D" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>

          <linearGradient id="wingTopRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FF7A45" />
            <stop offset="55%" stopColor="#FFA94D" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>

          {/* Lower wings — cool jewel-tone gradient */}
          <linearGradient id="wingBotLeft" x1="100%" y1="50%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4D96FF" />
            <stop offset="100%" stopColor="#9D6FFF" />
          </linearGradient>

          <linearGradient id="wingBotRight" x1="0%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D96FF" />
            <stop offset="100%" stopColor="#9D6FFF" />
          </linearGradient>

          {/* Body Gradient */}
          <linearGradient id="bodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#3E5868" />
            <stop offset="50%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Vein Gradient */}
          <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Left forewing — hinges at the body, folds inward on the downstroke */}
        <g className="animate-flap-fore-left" style={{ transformOrigin: "96px 95px" }}>
          <path
            d="M 96 95 C 75 40 30 35 25 60 C 20 85 68 105 96 110 Z"
            fill="url(#wingTopLeft)"
            stroke="#1A1A1A"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M 96 95 L 35 65 M 96 100 L 45 80 M 96 105 L 55 92"
            stroke="url(#veinGrad)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="50" cy="62" r="4" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="38" cy="78" r="2.5" fill="#FFFFFF" fillOpacity="0.7" />
        </g>

        {/* Left hindwing — slightly delayed phase, smaller travel than the forewing */}
        <g className="animate-flap-hind-left" style={{ transformOrigin: "96px 114px" }}>
          <path
            d="M 96 114 C 70 120 40 142 42 158 C 44 172 75 160 96 130 Z"
            fill="url(#wingBotLeft)"
            stroke="#1A1A1A"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M 96 114 L 50 145"
            stroke="url(#veinGrad)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="62" cy="148" r="3" fill="#FFD93D" fillOpacity="0.9" />
        </g>

        {/* Right forewing */}
        <g className="animate-flap-fore-right" style={{ transformOrigin: "104px 95px" }}>
          <path
            d="M 104 95 C 125 40 170 35 175 60 C 180 85 132 105 104 110 Z"
            fill="url(#wingTopRight)"
            stroke="#1A1A1A"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M 104 95 L 165 65 M 104 100 L 155 80 M 104 105 L 145 92"
            stroke="url(#veinGrad)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="150" cy="62" r="4" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="162" cy="78" r="2.5" fill="#FFFFFF" fillOpacity="0.7" />
        </g>

        {/* Right hindwing */}
        <g className="animate-flap-hind-right" style={{ transformOrigin: "104px 114px" }}>
          <path
            d="M 104 114 C 130 120 160 142 158 158 C 156 172 125 160 104 130 Z"
            fill="url(#wingBotRight)"
            stroke="#1A1A1A"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <path
            d="M 104 114 L 150 145"
            stroke="url(#veinGrad)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="138" cy="148" r="3" fill="#FFD93D" fillOpacity="0.9" />
        </g>

        {/* Antennae */}
        <path d="M 98 62 Q 85 45 75 48" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 102 62 Q 115 45 125 48" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="75" cy="48" r="2.5" fill="#FF7A45" />
        <circle cx="125" cy="48" r="2.5" fill="#FF7A45" />

        {/* Body */}
        <rect x="97" y="65" width="6" height="70" rx="3" fill="url(#bodyGrad)" />
        <circle cx="100" cy="62" r="4" fill="url(#bodyGrad)" />
      </svg>
    </div>
  );
}
