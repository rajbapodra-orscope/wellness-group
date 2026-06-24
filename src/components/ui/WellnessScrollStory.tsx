"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ── Slide data (21 slides, PDF pages 2–22) ────────────────────────────────
const slides = [
  {
    id: 1,
    bg: "#FAFAFA", textDark: true,
    eyebrow: "Leadership Philosophy",
    headline: "Who Is a\nGood Leader?",
    sub: "The Duck or the Chicken — Context vs Context",
    body: "The best leader isn't at the front or at the back — it's the one who knows when to switch. Leading from the front brings Clarity & Momentum. Leading from behind brings Empowerment & Safety. The goal is to master both.",
    image: "/images/story/s01.jpg",
    imageAlt: "Chicken leading chicks vs duck leading ducklings — leadership styles",
  },
  {
    id: 2,
    bg: "#C4AF8F", textDark: true,
    eyebrow: "A Profile",
    headline: "Control\nYour 7ʾM",
    sub: "The seven pillars of personal mastery",
    body: "Mind · Mouth · Moves · Morning · Meal · Money · Mood. When you master these seven dimensions, you master your outcomes. This is the Wellness Group foundation — Born to Excel.",
    image: "/images/story/s02.jpg",
    imageAlt: "Japanese torii gate reflecting discipline and mastery",
  },
  {
    id: 3,
    bg: "#080808", textDark: false,
    eyebrow: "Genius Defined",
    headline: "Talent hits\na target no\none else can hit",
    sub: "— Arthur Schopenhauer",
    body: "Genius hits a target no one else can see. The Wellness Group philosophy is built on seeing what others cannot — and building relentlessly toward what others haven't yet imagined.",
    image: "/images/story/s03.jpg",
    imageAlt: "Light bulb symbolising genius and ideas",
  },
  {
    id: 4,
    bg: "#EEF2FF", textDark: true,
    eyebrow: "Foundation",
    headline: "Built on\nTrust",
    sub: "Every relationship begins with a handshake",
    body: "Trust is the foundation of every lasting business relationship. We build partnerships that transcend transactions — they become legacies, forged through consistency, character, and commitment.",
    image: "/images/story/s04.jpg",
    imageAlt: "Two business people shaking hands",
  },
  {
    id: 5,
    bg: "#B91C1C", textDark: false,
    eyebrow: "Core Identity",
    headline: "The Growth\nNavigator",
    sub: "Wellness Group — charting your path forward",
    body: "We don't just participate in markets — we navigate them. Every strategy, every conversation, every decision is calibrated for sustained, meaningful, lasting growth.",
    image: "/images/story/s05.jpg",
    imageAlt: "Hand holding a cup of coffee",
  },
  {
    id: 6,
    bg: "#374151", textDark: false,
    eyebrow: "Precision Thinking",
    headline: "Be\nCalculative",
    sub: "Every decision, precisely measured",
    body: "Precision is power. Behind every great business outcome is disciplined thinking, rigorous analysis, and the courage to act on calculated risk. Numbers don't lie — but they do require interpretation.",
    image: "/images/story/s06.jpg",
    imageAlt: "Person holding a calculator over financial documents",
  },
  {
    id: 7,
    bg: "#6B21A8", textDark: false,
    eyebrow: "Voice & Presence",
    headline: "Be\nAssertive",
    sub: "Own your voice. Own the room.",
    body: "Assertiveness is clarity in action. Speaking with conviction while respecting others is the hallmark of high-performance leadership. Your voice carries the weight of your preparation.",
    image: "/images/story/s07.jpg",
    imageAlt: "Person writing with a pen",
  },
  {
    id: 8,
    bg: "#3B0764", textDark: false,
    eyebrow: "Human Connection",
    headline: "Be\nInteractive",
    sub: "Engage. Connect. Co-create.",
    body: "The best ideas emerge from genuine dialogue. Being truly interactive means listening as actively as you speak — and creating the space where collaboration naturally thrives.",
    image: "/images/story/s08.jpg",
    imageAlt: "Open palm hand gesture of openness and interaction",
  },
  {
    id: 9,
    bg: "#1C0A14", textDark: false,
    eyebrow: "Curiosity as Strategy",
    headline: "Be\nInquisitive",
    sub: "Question everything. Discover more.",
    body: "Inquisitiveness is the engine of innovation. Those who ask better questions find better answers — and ultimately, uncover opportunities hidden in plain sight.",
    image: "/images/story/s09.jpg",
    imageAlt: "Finger pointing sideways in a direction",
  },
  {
    id: 10,
    bg: "#4B5563", textDark: false,
    eyebrow: "Cognitive Expansion",
    headline: "Stretch Your\nThought",
    sub: "Beyond the obvious. Beyond the expected.",
    body: "Conventional thinking produces conventional results. Stretch your thought process beyond your comfort zone — that is the space where breakthroughs live and real leaders are forged.",
    image: "/images/story/s10.jpg",
    imageAlt: "Two hands stretching apart representing expanding thought",
  },
  {
    id: 11,
    bg: "#92400E", textDark: false,
    eyebrow: "Critical Intelligence",
    headline: "Analyse\nCritically",
    sub: "See through the noise. Find the signal.",
    body: "Critical analysis is a superpower in a world saturated with data. It separates assumption from fact, noise from signal, and short-term reaction from long-term wisdom.",
    image: "/images/story/s11.jpg",
    imageAlt: "Person holding a magnifying glass at sunset",
  },
  {
    id: 12,
    bg: "#D1D5DB", textDark: true,
    eyebrow: "Strategic Rest",
    headline: "Time Out.\nRelax.",
    sub: "Rest is not weakness — it's strategy.",
    body: "High performance requires high recovery. The most effective leaders know when to call a time-out, reset their thinking, and return with renewed clarity, energy, and decisive perspective.",
    image: "/images/story/s12.jpg",
    imageAlt: "Person sitting in a meditation pose outdoors",
  },
  {
    id: 13,
    bg: "#080808", textDark: false,
    eyebrow: "Educated Intuition",
    headline: "Guess...",
    sub: "Sometimes intuition knows before logic does.",
    body: "Educated intuition is the synthesis of experience, pattern recognition, and courage. Don't dismiss that instinct — it's data your conscious mind hasn't fully processed yet.",
    image: "/images/story/s13.jpg",
    imageAlt: "Hand making gun-finger gesture representing an educated guess",
  },
  {
    id: 14,
    bg: "#6D3562", textDark: false,
    eyebrow: "The Power of Enquiry",
    headline: "How Is\nThat?",
    sub: "The right question changes everything.",
    body: "Never accept the surface answer. 'How is that?' opens doors to deeper understanding, reveals hidden assumptions, and consistently leads to more elegant, lasting solutions.",
    image: "/images/story/s14.jpg",
    imageAlt: "Man pointing index finger upward with questioning expression",
  },
  {
    id: 15,
    bg: "#DC2626", textDark: false,
    eyebrow: "Decisive Commitment",
    headline: "Seal It",
    sub: "Decisions become results only when committed to.",
    body: "Commitment is the bridge between intention and achievement. When you truly seal a decision — fully commit — the universe of possibilities begins to align in your favour.",
    image: "/images/story/s15.jpg",
    imageAlt: "Clenched fist representing decisive commitment and power",
  },
  {
    id: 16,
    bg: "#14532D", textDark: false,
    eyebrow: "Daily Growth Practice",
    headline: "See It\nHappening",
    sub: "Growth isn't accidental. It's nurtured.",
    body: "Like seeds in soil, every potential needs the right conditions to emerge. See growth as a daily practice, not a destination — and tend it with the patience of a master.",
    image: "/images/story/s16.jpg",
    imageAlt: "Hands holding a young green seedling",
  },
  {
    id: 17,
    bg: "#CA8A04", textDark: true,
    eyebrow: "The Asset of Confidence",
    headline: "Trust,\nYou Like It",
    sub: "Confidence is the currency of leadership.",
    body: "When you trust the process, trust your team, and trust yourself — extraordinary things become ordinary. Trust is the most precious and most renewable asset in business.",
    image: "/images/story/s17.jpg",
    imageAlt: "Hand holding a small white oval pill between fingers",
  },
  {
    id: 18,
    bg: "#1E1B4B", textDark: false,
    eyebrow: "The Standard of Excellence",
    headline: "It's\nSuperb",
    sub: "Excellence is not an act — it's a habit.",
    body: "When work is done with passion, precision, and purpose — the result speaks for itself. Superb isn't luck. It's the natural outcome of relentless, daily commitment to quality.",
    image: "/images/story/s18.jpg",
    imageAlt: "OK hand gesture representing perfection and superb quality",
  },
  {
    id: 19,
    bg: "#0F766E", textDark: false,
    eyebrow: "Strategic Self-Awareness",
    headline: "See It\nYourself",
    sub: "Play the hand you've been dealt — masterfully.",
    body: "Know your strengths, your cards, your position. True strategic advantage comes from an honest understanding of where you stand, what you have, and how to play it brilliantly.",
    image: "/images/story/s19.jpg",
    imageAlt: "Person holding playing cards — play the hand you've been dealt",
  },
  {
    id: 20,
    bg: "#78614A", textDark: false,
    eyebrow: "The Culture of Celebration",
    headline: "Celebrate\nWell",
    sub: "Every milestone deserves acknowledgement.",
    body: "Success tastes better when shared. Celebrate your wins — the small and the monumental. It fuels the culture, energises the team, and reminds everyone why the journey matters.",
    image: "/images/story/s20.jpg",
    imageAlt: "Two people toasting with champagne glasses",
  },
  {
    id: 21,
    bg: "#D97706", textDark: true,
    eyebrow: "The Wellness Group Way",
    headline: "Thumbs\nUp",
    sub: "Born to Excel — always.",
    body: "Control your 7Ms. Lead with situational intelligence. Stay inquisitive, assertive, interactive. Trust the process. Seal the commitment. See it happen. Then celebrate — because you earned it.",
    image: "/images/story/s21.jpg",
    imageAlt: "3D thumbs up illustration representing Born to Excel",
  },
];

// ── Slide image component ──────────────────────────────────────────────────
function SlidePhoto({ image, imageAlt, textDark, objectFit = "cover" }: {
  image: string; imageAlt: string; textDark: boolean; objectFit?: "cover" | "contain";
}) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
      style={objectFit === "contain" ? { background: "rgba(0,0,0,0.04)" } : undefined}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="520px"
        className={objectFit === "contain" ? "object-contain p-2" : "object-cover"}
        priority={false}
      />
      {objectFit === "cover" && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: textDark
              ? "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.10) 100%)"
              : "linear-gradient(135deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.20) 100%)",
          }}
        />
      )}
    </div>
  );
}


// ── Main Component ─────────────────────────────────────────────────────────
export default function WellnessScrollStory() {
  const [current, setCurrent] = useState(0);
  const pausedRef  = useRef(false);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(c => (c + 1) % slides.length);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };

  const slide = slides[current];

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Slides stacked — CSS opacity/scale transition handles the crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 flex items-center"
          style={{
            background: s.bg,
            opacity:    i === current ? 1 : 0,
            transform:  i === current ? 'scale(1)' : 'scale(1.04)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            zIndex:     i === current ? 10 : 1,
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          {/* ── Inner layout: text left, photo right ────────────────────── */}
          <div className="max-w-7xl mx-auto w-full px-8 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* Text block */}
            <div className={`flex flex-col max-w-2xl lg:max-w-xl ${s.textDark ? "text-[#111827]" : "text-white"}`}>
              <span
                className="text-[10px] uppercase tracking-[0.38em] font-bold mb-5 block"
                style={{ opacity: 0.42 }}
              >
                {s.eyebrow}
              </span>

              <h2
                className="font-black tracking-tighter leading-[0.88] mb-6 whitespace-pre-line"
                style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)" }}
              >
                {s.id === 3 ? <em>{s.headline}</em> : s.headline}
              </h2>

              <p className="text-base font-semibold mb-4 leading-snug" style={{ opacity: 0.58 }}>
                {s.sub}
              </p>

              <p className="text-sm leading-relaxed max-w-md" style={{ opacity: 0.62 }}>
                {s.body}
              </p>
            </div>

            {/* Photo — mobile strip */}
            <div className={`lg:hidden w-full flex-shrink-0 relative rounded-xl overflow-hidden ${s.id === 1 ? "h-48" : "h-40"}`}>
              <SlidePhoto image={s.image} imageAlt={s.imageAlt} textDark={s.textDark} objectFit={s.id === 1 ? "contain" : "cover"} />
            </div>

            {/* Photo — desktop panel */}
            <div className={`hidden lg:flex items-center justify-center flex-shrink-0 relative ${s.id === 1 ? "w-[520px] h-[220px]" : "w-[340px] h-[340px]"}`}>
              <SlidePhoto image={s.image} imageAlt={s.imageAlt} textDark={s.textDark} objectFit={s.id === 1 ? "contain" : "cover"} />
            </div>
          </div>

          {/* Thin top progress bar showing position within the 21 slides */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: s.textDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full transition-all duration-700"
              style={{
                width: `${((i + 1) / slides.length) * 100}%`,
                background: s.textDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
              }}
            />
          </div>
        </div>
      ))}

      {/* ── Dot nav — always on top, clickable ──────────────────────────── */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center z-20 gap-1.5">
        {slides.map((s, j) => (
          <button
            key={j}
            aria-label={`Go to slide ${j + 1}`}
            onClick={() => goTo(j)}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width:   j === current ? 22 : 5,
              height:  5,
              background: j === current
                ? (slide.textDark ? "rgba(0,0,0,0.55)"  : "rgba(255,255,255,0.85)")
                : (slide.textDark ? "rgba(0,0,0,0.15)"  : "rgba(255,255,255,0.22)"),
            }}
          />
        ))}
      </div>

      {/* ── Prev / Next arrows ───────────────────────────────────────────── */}
      <button
        aria-label="Previous slide"
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none"
        style={{ background: slide.textDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke={slide.textDark ? "#111" : "#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none"
        style={{ background: slide.textDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke={slide.textDark ? "#111" : "#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
}
