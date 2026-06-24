"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Slide data (21 slides, PDF pages 2–22) ────────────────────────────────
const slides = [
  {
    id: 1,
    bg: "#FAFAFA", textDark: true,
    eyebrow: "Leadership Philosophy",
    headline: "Who Is a\nGood Leader?",
    sub: "The Duck or the Chicken — Context vs Context",
    body: "The best leader isn't at the front or at the back — it's the one who knows when to switch. Leading from the front brings Clarity & Momentum. Leading from behind brings Empowerment & Safety. The goal is to master both.",
  },
  {
    id: 2,
    bg: "#C4AF8F", textDark: true,
    eyebrow: "A Profile",
    headline: "Control\nYour 7ʾM",
    sub: "The seven pillars of personal mastery",
    body: "Mind · Mouth · Moves · Morning · Meal · Money · Mood. When you master these seven dimensions, you master your outcomes. This is the Wellness Group foundation — Born to Excel.",
  },
  {
    id: 3,
    bg: "#080808", textDark: false,
    eyebrow: "Genius Defined",
    headline: "Talent hits\na target no\none else can hit",
    sub: "— Arthur Schopenhauer",
    body: "Genius hits a target no one else can see. The Wellness Group philosophy is built on seeing what others cannot — and building relentlessly toward what others haven't yet imagined.",
  },
  {
    id: 4,
    bg: "#EEF2FF", textDark: true,
    eyebrow: "Foundation",
    headline: "Built on\nTrust",
    sub: "Every relationship begins with a handshake",
    body: "Trust is the foundation of every lasting business relationship. We build partnerships that transcend transactions — they become legacies, forged through consistency, character, and commitment.",
  },
  {
    id: 5,
    bg: "#B91C1C", textDark: false,
    eyebrow: "Core Identity",
    headline: "The Growth\nNavigator",
    sub: "Wellness Group — charting your path forward",
    body: "We don't just participate in markets — we navigate them. Every strategy, every conversation, every decision is calibrated for sustained, meaningful, lasting growth.",
  },
  {
    id: 6,
    bg: "#374151", textDark: false,
    eyebrow: "Precision Thinking",
    headline: "Be\nCalculative",
    sub: "Every decision, precisely measured",
    body: "Precision is power. Behind every great business outcome is disciplined thinking, rigorous analysis, and the courage to act on calculated risk. Numbers don't lie — but they do require interpretation.",
  },
  {
    id: 7,
    bg: "#6B21A8", textDark: false,
    eyebrow: "Voice & Presence",
    headline: "Be\nAssertive",
    sub: "Own your voice. Own the room.",
    body: "Assertiveness is clarity in action. Speaking with conviction while respecting others is the hallmark of high-performance leadership. Your voice carries the weight of your preparation.",
  },
  {
    id: 8,
    bg: "#3B0764", textDark: false,
    eyebrow: "Human Connection",
    headline: "Be\nInteractive",
    sub: "Engage. Connect. Co-create.",
    body: "The best ideas emerge from genuine dialogue. Being truly interactive means listening as actively as you speak — and creating the space where collaboration naturally thrives.",
  },
  {
    id: 9,
    bg: "#1C0A14", textDark: false,
    eyebrow: "Curiosity as Strategy",
    headline: "Be\nInquisitive",
    sub: "Question everything. Discover more.",
    body: "Inquisitiveness is the engine of innovation. Those who ask better questions find better answers — and ultimately, uncover opportunities hidden in plain sight.",
  },
  {
    id: 10,
    bg: "#4B5563", textDark: false,
    eyebrow: "Cognitive Expansion",
    headline: "Stretch Your\nThought",
    sub: "Beyond the obvious. Beyond the expected.",
    body: "Conventional thinking produces conventional results. Stretch your thought process beyond your comfort zone — that is the space where breakthroughs live and real leaders are forged.",
  },
  {
    id: 11,
    bg: "#92400E", textDark: false,
    eyebrow: "Critical Intelligence",
    headline: "Analyse\nCritically",
    sub: "See through the noise. Find the signal.",
    body: "Critical analysis is a superpower in a world saturated with data. It separates assumption from fact, noise from signal, and short-term reaction from long-term wisdom.",
  },
  {
    id: 12,
    bg: "#D1D5DB", textDark: true,
    eyebrow: "Strategic Rest",
    headline: "Time Out.\nRelax.",
    sub: "Rest is not weakness — it's strategy.",
    body: "High performance requires high recovery. The most effective leaders know when to call a time-out, reset their thinking, and return with renewed clarity, energy, and decisive perspective.",
  },
  {
    id: 13,
    bg: "#080808", textDark: false,
    eyebrow: "Educated Intuition",
    headline: "Guess...",
    sub: "Sometimes intuition knows before logic does.",
    body: "Educated intuition is the synthesis of experience, pattern recognition, and courage. Don't dismiss that instinct — it's data your conscious mind hasn't fully processed yet.",
  },
  {
    id: 14,
    bg: "#6D3562", textDark: false,
    eyebrow: "The Power of Enquiry",
    headline: "How Is\nThat?",
    sub: "The right question changes everything.",
    body: "Never accept the surface answer. 'How is that?' opens doors to deeper understanding, reveals hidden assumptions, and consistently leads to more elegant, lasting solutions.",
  },
  {
    id: 15,
    bg: "#DC2626", textDark: false,
    eyebrow: "Decisive Commitment",
    headline: "Seal It",
    sub: "Decisions become results only when committed to.",
    body: "Commitment is the bridge between intention and achievement. When you truly seal a decision — fully commit — the universe of possibilities begins to align in your favour.",
  },
  {
    id: 16,
    bg: "#14532D", textDark: false,
    eyebrow: "Daily Growth Practice",
    headline: "See It\nHappening",
    sub: "Growth isn't accidental. It's nurtured.",
    body: "Like seeds in soil, every potential needs the right conditions to emerge. See growth as a daily practice, not a destination — and tend it with the patience of a master.",
  },
  {
    id: 17,
    bg: "#CA8A04", textDark: true,
    eyebrow: "The Asset of Confidence",
    headline: "Trust,\nYou Like It",
    sub: "Confidence is the currency of leadership.",
    body: "When you trust the process, trust your team, and trust yourself — extraordinary things become ordinary. Trust is the most precious and most renewable asset in business.",
  },
  {
    id: 18,
    bg: "#1E1B4B", textDark: false,
    eyebrow: "The Standard of Excellence",
    headline: "It's\nSuperb",
    sub: "Excellence is not an act — it's a habit.",
    body: "When work is done with passion, precision, and purpose — the result speaks for itself. Superb isn't luck. It's the natural outcome of relentless, daily commitment to quality.",
  },
  {
    id: 19,
    bg: "#0F766E", textDark: false,
    eyebrow: "Strategic Self-Awareness",
    headline: "See It\nYourself",
    sub: "Play the hand you've been dealt — masterfully.",
    body: "Know your strengths, your cards, your position. True strategic advantage comes from an honest understanding of where you stand, what you have, and how to play it brilliantly.",
  },
  {
    id: 20,
    bg: "#78614A", textDark: false,
    eyebrow: "The Culture of Celebration",
    headline: "Celebrate\nWell",
    sub: "Every milestone deserves acknowledgement.",
    body: "Success tastes better when shared. Celebrate your wins — the small and the monumental. It fuels the culture, energises the team, and reminds everyone why the journey matters.",
  },
  {
    id: 21,
    bg: "#D97706", textDark: true,
    eyebrow: "The Wellness Group Way",
    headline: "Thumbs\nUp",
    sub: "Born to Excel — always.",
    body: "Control your 7Ms. Lead with situational intelligence. Stay inquisitive, assertive, interactive. Trust the process. Seal the commitment. See it happen. Then celebrate — because you earned it.",
  },
];

// ── CSS Art for each slide ─────────────────────────────────────────────────
// Pure CSS geometric representations of the PDF imagery (blurry originals
// are replaced with clean, bold abstract art matching each page's concept).

function SlideArt({ id, textDark }: { id: number; textDark: boolean }) {
  const lo = textDark ? "rgba(0,0,0," : "rgba(255,255,255,";
  const line  = `${lo}0.14)`;
  const mid   = `${lo}0.22)`;
  const bold  = `${lo}0.35)`;
  const heavy = `${lo}0.5)`;

  switch (id) {
    /* 1 — Leadership: Duck "1" vs Chicken "2" circles */
    case 1:
      return (
        <div className="w-full h-full flex items-center justify-center gap-10">
          {[
            { n: "1", label: "Duck", col: "#2563EB" },
            { n: "2", label: "Chicken", col: "#7C3AED" },
          ].map(({ n, label, col }) => (
            <div key={n} className="flex flex-col items-center gap-4">
              <span className="text-[7rem] font-black leading-none" style={{ color: `${col}22` }}>{n}</span>
              <div className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ border: `3px solid ${col}55`, background: `${col}12` }}>
                <span className="text-base font-black" style={{ color: `${col}90` }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      );

    /* 2 — 7M: Circular arrangement of seven M-words */
    case 2:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-56 h-56">
            {["Mind","Mouth","Moves","Morning","Meal","Money","Mood"].map((m, i) => {
              const a = (i / 7) * 360 - 90;
              const rad = (a * Math.PI) / 180;
              return (
                <div key={m} className="absolute text-[11px] font-black uppercase tracking-wider"
                  style={{
                    left: `${50 + 42 * Math.cos(rad)}%`,
                    top: `${50 + 42 * Math.sin(rad)}%`,
                    transform: "translate(-50%,-50%)",
                    color: `hsl(${i * 46 + 190},45%,32%)`,
                  }}>
                  {m}
                </div>
              );
            })}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
              style={{ border: `2px solid ${line}`, background: "rgba(91,33,182,0.1)" }}>
              <span className="text-lg font-black" style={{ color: "rgba(91,33,182,0.55)" }}>7M</span>
            </div>
          </div>
        </div>
      );

    /* 3 — Quote: Giant decorative quotation marks */
    case 3:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-serif select-none" style={{ fontSize: "18rem", lineHeight: 1, color: "rgba(255,255,255,0.05)" }}>&ldquo;</span>
        </div>
      );

    /* 4 — Handshake: two overlapping semicircles */
    case 4:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-56 h-28">
            <div className="absolute left-0 top-0 w-28 h-28 rounded-r-full"
              style={{ border: `4px solid ${bold}`, borderLeft: "none" }} />
            <div className="absolute right-0 top-0 w-28 h-28 rounded-l-full"
              style={{ border: `4px solid ${bold}`, borderRight: "none" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
              style={{ background: bold }} />
          </div>
        </div>
      );

    /* 5 — Growth Navigator: branded cup / circle */
    case 5:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-44 h-44 rounded-full flex flex-col items-center justify-center gap-1"
              style={{ border: "3px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}>
              <span className="text-sm font-bold text-white/60 tracking-widest uppercase">Wellness</span>
              <span className="text-[10px] text-white/35 tracking-wider">Group</span>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }} />
            <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-6 h-10 rounded-r-full"
              style={{ border: "3px solid rgba(255,255,255,0.18)", borderLeft: "none" }} />
          </div>
        </div>
      );

    /* 6 — Calculative: calculator button grid */
    case 6:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-3">
            {/* Display */}
            <div className="w-48 h-10 rounded-md mb-1" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${line}` }} />
            {/* Button grid 4×4 */}
            {Array.from({ length: 4 }).map((_, r) => (
              <div key={r} className="flex gap-3">
                {Array.from({ length: 4 }).map((_, c) => (
                  <div key={c} className="w-9 h-9 rounded-md"
                    style={{ background: r === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${line}` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    /* 7 — Assertive: bold diagonal pen stroke */
    case 7:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-40 h-40">
            <div className="absolute top-4 right-8 w-5 h-28 rounded-full rotate-[-38deg] origin-bottom"
              style={{ background: heavy }} />
            <div className="absolute top-4 right-10 w-2 h-16 rounded-full rotate-[-38deg] origin-bottom"
              style={{ background: bold }} />
            <div className="absolute bottom-2 right-6 w-8 h-[3px] rounded-full rotate-[-38deg]"
              style={{ background: mid }} />
          </div>
        </div>
      );

    /* 8 — Interactive: open palm outline */
    case 8:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-32 h-44">
            {/* Fingers */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="absolute bottom-16 rounded-t-full"
                style={{
                  width: 14,
                  height: 50 + i * 4,
                  background: line,
                  left: `${i * 30}%`,
                  transformOrigin: "bottom center",
                  transform: `rotate(${(i - 1.5) * 7}deg)`,
                }} />
            ))}
            {/* Thumb */}
            <div className="absolute bottom-14 left-[-14px] w-12 h-10 rounded-tl-full rounded-bl-full"
              style={{ background: line, transform: "rotate(-20deg)" }} />
            {/* Palm */}
            <div className="absolute bottom-0 left-[-4px] w-[108%] h-18 rounded-b-[35%]"
              style={{ background: line, height: "72px" }} />
          </div>
        </div>
      );

    /* 9 — Inquisitive: pointing index finger */
    case 9:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-40 h-36 flex items-center">
            {/* Pointing finger beam */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-[3px] rounded-full" style={{ background: heavy }} />
            {/* Arrow head */}
            <div className="absolute right-0 top-1/2 w-0 h-0"
              style={{
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: `18px solid ${heavy}`,
                transform: "translateY(-50%)",
              }} />
            {/* Finger tip circle */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
              style={{ background: mid }} />
          </div>
        </div>
      );

    /* 10 — Stretch: two thumbs stretching a thread */
    case 10:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-16 flex items-center">
            {/* Left thumb */}
            <div className="w-8 h-14 rounded-t-full rounded-b-md flex-shrink-0" style={{ background: mid }} />
            {/* Thread */}
            <div className="flex-1 h-[2px] rounded-full" style={{ background: heavy }} />
            {/* Right thumb */}
            <div className="w-8 h-14 rounded-t-full rounded-b-md flex-shrink-0" style={{ background: mid }} />
          </div>
        </div>
      );

    /* 11 — Analyse: magnifying glass over book stack */
    case 11:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Book stack */}
            {[0, 1, 2].map((i) => (
              <div key={i} className="absolute rounded-sm"
                style={{ bottom: i * 14, left: "15%", width: "70%", height: 11, background: line, opacity: 1 - i * 0.2 }} />
            ))}
            {/* Lens circle */}
            <div className="absolute top-2 right-2 w-24 h-24 rounded-full"
              style={{ border: `5px solid ${heavy}`, background: "rgba(255,255,255,0.04)" }} />
            {/* Handle */}
            <div className="absolute bottom-1 right-1 w-3 h-12 rounded-full rotate-[40deg] origin-top-left"
              style={{ background: heavy }} />
          </div>
        </div>
      );

    /* 12 — Time Out: T-shaped timeout gesture */
    case 12:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-36 h-36">
            {/* Horizontal bar */}
            <div className="absolute top-[44%] left-0 w-full h-4 rounded-full" style={{ background: bold }} />
            {/* Vertical bar */}
            <div className="absolute top-[44%] left-1/2 -translate-x-1/2 w-4 h-full rounded-b-full" style={{ background: bold }} />
            {/* Small "T" label */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl font-black" style={{ color: heavy }}>T</div>
          </div>
        </div>
      );

    /* 13 — Guess: gun-finger pointing left */
    case 13:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-44 h-36">
            {/* Finger barrel */}
            <div className="absolute top-8 left-0 w-28 h-5 rounded-r-full rounded-l-sm" style={{ background: "rgba(255,255,255,0.2)" }} />
            {/* Wrist / grip */}
            <div className="absolute top-12 left-8 w-5 h-16 rounded-b-full" style={{ background: "rgba(255,255,255,0.15)" }} />
            {/* Thumb */}
            <div className="absolute top-6 left-8 w-14 h-4 rounded-full rotate-[-15deg] origin-left" style={{ background: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>
      );

    /* 14 — How Is That: index finger pointing upward */
    case 14:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-0">
            {/* Fingertip */}
            <div className="w-10 h-10 rounded-full mb-[-4px]" style={{ background: heavy }} />
            {/* Finger shaft */}
            <div className="w-7 h-28 rounded-b-sm" style={{ background: bold }} />
            {/* Fist base */}
            <div className="w-16 h-8 rounded-b-xl rounded-t-sm" style={{ background: mid }} />
          </div>
        </div>
      );

    /* 15 — Seal It: fist / power shape */
    case 15:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-36 h-36 rounded-[28%] flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", border: "3px solid rgba(255,255,255,0.25)" }}>
            {/* Knuckle lines */}
            {[-20, 0, 20].map((x, i) => (
              <div key={i} className="absolute h-[2px] w-10 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)", transform: `translateX(${x - 10}px) translateY(${i * 12 - 12}px)` }} />
            ))}
            <div className="w-20 h-20 rounded-[25%]" style={{ background: "rgba(255,255,255,0.12)" }} />
          </div>
        </div>
      );

    /* 16 — See It Happening: growing plant stems */
    case 16:
      return (
        <div className="w-full h-full flex items-end justify-center pb-6 gap-5">
          {[24, 44, 64, 80, 100].map((h, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Leaf */}
              <div className="absolute rounded-full"
                style={{
                  width: 14 + i * 2,
                  height: (14 + i * 2) * 0.5,
                  background: "rgba(134,239,172,0.55)",
                  bottom: `calc(${h}% - 2px)`,
                  left: -(10 + i),
                  transform: "rotate(-28deg)",
                }} />
              {/* Stem */}
              <div className="rounded-t-sm"
                style={{
                  width: 8,
                  height: `${h * 1.1}px`,
                  background: `linear-gradient(to top, rgba(22,101,52,0.9), rgba(134,239,172,0.6))`,
                }} />
              {/* Soil mound */}
              <div style={{ width: 20, height: 5, borderRadius: 4, background: "rgba(255,255,255,0.08)", marginTop: 2 }} />
            </div>
          ))}
        </div>
      );

    /* 17 — Trust: oval pill held between fingers */
    case 17:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Thumb + index finger tips */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
            {/* Oval pill */}
            <div className="w-36 h-20 rounded-full flex items-center justify-center"
              style={{ border: "4px solid rgba(0,0,0,0.18)", background: "rgba(0,0,0,0.06)" }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>Trust</span>
            </div>
          </div>
        </div>
      );

    /* 18 — It's Superb: OK hand gesture */
    case 18:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* OK circle */}
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full"
              style={{ border: `5px solid ${heavy}` }} />
            {/* Index finger */}
            <div className="absolute top-0 right-12 w-5 h-20 rounded-full rotate-[18deg] origin-bottom"
              style={{ background: bold }} />
            {/* Middle finger */}
            <div className="absolute top-0 right-6 w-5 h-24 rounded-full rotate-[8deg] origin-bottom"
              style={{ background: bold }} />
            {/* Ring finger */}
            <div className="absolute top-2 right-0 w-5 h-20 rounded-full rotate-[-4deg] origin-bottom"
              style={{ background: bold }} />
          </div>
        </div>
      );

    /* 19 — See It Yourself: playing cards fan */
    case 19:
      return (
        <div className="w-full h-full flex items-end justify-center pb-4">
          {[-36, -18, 0, 18, 36].map((rot, i) => (
            <div key={i} className="absolute rounded-xl"
              style={{
                width: 60,
                height: 88,
                border: `2px solid rgba(255,255,255,0.3)`,
                background: i === 4
                  ? "rgba(255,255,255,0.18)"
                  : `rgba(255,255,255,${0.06 + i * 0.02})`,
                transform: `rotate(${rot}deg)`,
                transformOrigin: "bottom center",
                bottom: "28%",
                left: "calc(50% - 30px)",
                zIndex: i,
              }} />
          ))}
        </div>
      );

    /* 20 — Celebrate: two champagne flutes */
    case 20:
      return (
        <div className="w-full h-full flex items-center justify-center gap-4">
          {[-12, 12].map((rot, i) => (
            <div key={i} className="flex flex-col items-center" style={{ transform: `rotate(${rot}deg)` }}>
              {/* Flute bowl */}
              <div className="w-12 h-32 relative overflow-hidden"
                style={{
                  clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.25)",
                }} />
              {/* Stem */}
              <div className="w-[2px] h-10 bg-white/20" />
              {/* Base */}
              <div className="w-10 h-2 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      );

    /* 21 — Thumbs Up: bold 3D thumb shape */
    case 21:
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-28 h-40">
            {/* Thumb nail tip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-20 rounded-t-full"
              style={{ background: "rgba(0,0,0,0.18)", border: "3px solid rgba(0,0,0,0.2)" }} />
            {/* Fist body */}
            <div className="absolute bottom-0 left-0 w-full h-16 rounded-xl"
              style={{ background: "rgba(0,0,0,0.15)", border: "3px solid rgba(0,0,0,0.18)" }}>
              {/* Knuckle lines */}
              {[0, 1, 2].map((k) => (
                <div key={k} className="absolute h-[2px] rounded-full"
                  style={{ width: "60%", left: "20%", top: `${30 + k * 25}%`, background: "rgba(0,0,0,0.2)" }} />
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function WellnessScrollStory() {
  const outerRef  = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const N   = slides.length;          // 21
    const pct = 100 / N;                // % of section per slide ≈ 4.76

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Initial states ──────────────────────────────────────────────────
      // Incoming slides start zoomed IN (scale > 1) so the reveal feels like
      // a camera pulling back to frame the content.
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          scale:   i === 0 ? 1 : 1.22,
          zIndex:  i + 1,
          force3D: true,
        });
      });

      // ── Per-slide scroll triggers ───────────────────────────────────────
      for (let i = 0; i < N; i++) {
        const el = slideRefs.current[i];
        if (!el) return;

        const s = i * pct;             // slice start  (%)
        const e = (i + 1) * pct;       // slice end    (%)
        const zoomInEnd    = s + pct * 0.30;   // zoom-in settle window
        const zoomOutStart = e - pct * 0.30;   // zoom-out departure window

        // ZOOM IN — slide rushes in from large scale → natural 1:1
        if (i > 0) {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: outer,
              start: `${s}% top`,
              end:   `${zoomInEnd}% top`,
              scrub: 1.6,
            },
          });
        }

        // ZOOM OUT — slide shrinks away to a small scale before vanishing
        if (i < N - 1) {
          gsap.to(el, {
            opacity: 0,
            scale: 0.72,
            ease: "power2.in",
            scrollTrigger: {
              trigger: outer,
              start: `${zoomOutStart}% top`,
              end:   `${e}% top`,
              scrub: 1.6,
            },
          });
        }
      }
    });

    // Reduced-motion: show first slide statically; hide rest
    mm.add("(prefers-reduced-motion: reduce)", () => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: 1, zIndex: i + 1 });
      });
    });
  });

  return (
    /* Outer section — provides scroll runway. 100 vh per slide. */
    <section
      ref={outerRef}
      style={{ minHeight: `${slides.length * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport — stays in view while outer section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 flex items-center will-change-transform"
            style={{ background: slide.bg }}
          >
            {/* ── Inner layout: text left, art right ──────────────────── */}
            <div className="max-w-7xl mx-auto w-full px-8 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

              {/* Text block */}
              <div className={`flex flex-col max-w-2xl lg:max-w-xl ${slide.textDark ? "text-[#111827]" : "text-white"}`}>
                {/* Eyebrow */}
                <span
                  className="text-[10px] uppercase tracking-[0.38em] font-bold mb-5 block"
                  style={{ opacity: 0.42 }}
                >
                  {slide.eyebrow}
                </span>

                {/* Headline */}
                <h2
                  className="font-black tracking-tighter leading-[0.88] mb-6 whitespace-pre-line"
                  style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
                >
                  {slide.id === 3 ? (
                    <em>{slide.headline}</em>
                  ) : (
                    slide.headline
                  )}
                </h2>

                {/* Sub-title */}
                <p
                  className="text-base font-semibold mb-5 leading-snug"
                  style={{ opacity: 0.58 }}
                >
                  {slide.sub}
                </p>

                {/* Body */}
                <p
                  className="text-sm leading-relaxed max-w-md"
                  style={{ opacity: 0.62 }}
                >
                  {slide.body}
                </p>
              </div>

              {/* Art block — desktop only */}
              <div className="hidden lg:flex items-center justify-center w-[360px] h-[360px] flex-shrink-0 relative">
                <SlideArt id={slide.id} textDark={slide.textDark} />
              </div>
            </div>

            {/* ── Bottom HUD — progress dots only, centred ─────────────── */}
            <div className="absolute bottom-0 left-0 right-0 py-6 flex items-center justify-center">
              <div className="flex gap-1.5 items-center">
                {slides.map((_, j) => (
                  <div
                    key={j}
                    className="rounded-full"
                    style={{
                      width:  j === i ? 22 : 5,
                      height: 5,
                      background: j === i
                        ? slide.textDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.8)"
                        : slide.textDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Subtle top progress bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: slide.textDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full"
                style={{
                  width: `${((i + 1) / slides.length) * 100}%`,
                  background: slide.textDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
