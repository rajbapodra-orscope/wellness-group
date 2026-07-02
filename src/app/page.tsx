"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap, Hammer, Cpu, Layers, Globe, ArrowRight,
  ShieldCheck, ChevronRight, MapPin,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Globe as CobeGlobe } from "@/components/ui/cobe-globe";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ImmersiveVertical from "@/components/ui/ImmersiveVertical";
import CountUp from "@/components/ui/CountUp";
import WellnessScrollStory from "@/components/ui/WellnessScrollStory";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Scramble text ─────────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%&';

function scrambleInto(el: HTMLElement, finalText: string, delayMs = 0) {
  const totalFrames = finalText.replace(/ /g, '').length * 9;
  let frame = 0;
  const tick = () => {
    el.textContent = finalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (i / finalText.length < frame / totalFrames) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');
    frame++;
    if (frame <= totalFrames) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };
  if (delayMs > 0) setTimeout(() => requestAnimationFrame(tick), delayMs);
  else requestAnimationFrame(tick);
}

// ── Magnetic buttons ──────────────────────────────────────────────────────────
function magneticMove(e: React.MouseEvent<HTMLAnchorElement>, el: HTMLAnchorElement | null) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.28, duration: 0.3, ease: 'power2.out' });
}
function magneticLeave(el: HTMLAnchorElement | null) {
  if (!el) return;
  gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' });
}

// ── Story cards ───────────────────────────────────────────────────────────────
// Each card has:
//   • final CSS position (Tailwind classes, applied statically)
//   • finalRotation — GSAP sets this as the "to" rotation
//   • from — offscreen GSAP initial state (set before any scroll)
//   • scrollStart/End — % of the 450vh hero where the card animates in
//   • parallaxY — px the card drifts after it enters (depth illusion)
const storyCards = [
  {
    src: '/images/gold.jpg',
    label: 'Minerals & Resources',
    sublabel: 'Securing Global Supply',
    accent: '#F2A65A',
    position: 'top-[8%] right-[3.5%]',
    finalRotation: 8,
    from: { x: '32vw', y: '-24vh', rotation: 18, opacity: 0, scale: 0.72 },
    scrollStart: 'top top',
    scrollEnd: '20% top',
    parallaxY: -30,
  },
  {
    src: '/images/canarywharf.jpg',
    label: 'Engineering & Construction',
    sublabel: 'Infrastructure of Tomorrow',
    accent: '#FFA94D',
    position: 'top-[8%] left-[3.5%]',
    finalRotation: -7,
    from: { x: '-32vw', y: '-20vh', rotation: -16, opacity: 0, scale: 0.72 },
    scrollStart: '18% top',
    scrollEnd: '38% top',
    parallaxY: -20,
  },
  {
    src: '/images/wind.jpg',
    label: 'Renewable Energy',
    sublabel: 'Powering Green Futures',
    accent: '#168F5D',
    position: 'top-[46%] right-[3%]',
    finalRotation: 5,
    from: { x: '30vw', y: '26vh', rotation: 13, opacity: 0, scale: 0.72 },
    scrollStart: '36% top',
    scrollEnd: '56% top',
    parallaxY: 20,
  },
  {
    src: '/images/chemicals.jpg',
    label: 'Chemicals & Pharma',
    sublabel: 'Precision in formulation manufacturing',
    accent: '#50D0DE',
    position: 'top-[46%] left-[3%]',
    finalRotation: -6,
    from: { x: '-30vw', y: '26vh', rotation: -13, opacity: 0, scale: 0.72 },
    scrollStart: '54% top',
    scrollEnd: '74% top',
    parallaxY: 25,
  },
  {
    src: '/images/dubai.jpg',
    label: 'International Trade',
    sublabel: 'Connecting Global Markets',
    accent: '#9D6FFF',
    // Bottom-right corner — avoids the central CTA buttons and needs no CSS
    // translateX(-50%) centering that GSAP would overwrite during animation.
    position: 'bottom-[8%] right-[3.5%]',
    finalRotation: 10,
    from: { x: '28vw', y: '24vh', rotation: 18, opacity: 0, scale: 0.72 },
    scrollStart: '72% top',
    scrollEnd: '92% top',
    parallaxY: -18,
  },
];

// ── Static data ───────────────────────────────────────────────────────────────
const heroBadges = [
  { value: '40+', label: 'Years of Excellence' },
  { value: '$12B+', label: 'Annual Revenue' },
  { value: 'EcoVadis', label: 'Platinum' },
  { value: '15+', label: 'Global Hubs' },
];

const immersiveVerticals = [
  { id: "vertical-minerals", tagline: "Minerals & Resources", title: "Extraction at Industrial Scale", description: "From open-pit copper to battery-grade lithium, our mining operations run on satellite-audited fleets and zero-compromise ethical sourcing.", image: "/images/minerals.jpg", video: "/videos/minerals.mp4", accent: "#F2A65A", icon: <Cpu className="w-5 h-5" />, align: "left" as const },
  { id: "vertical-engineering", tagline: "Engineering & Construction", title: "Infrastructure of Tomorrow", description: "Cranes, steel, and digital twins — our EPC division delivers turn-key industrial plants, smart cities, and transport corridors worldwide.", image: "/images/engineering.jpg", video: "/videos/engineering.mp4", accent: "#FFA94D", icon: <Hammer className="w-5 h-5" />, align: "right" as const },
  { id: "vertical-energy", tagline: "Renewable Energy", title: "Powering a Cleaner Grid", description: "Utility-scale solar fields and onshore wind farms — every gigawatt deployed displaces hundreds of thousands of tons of CO₂ a year.", image: "/images/energy.jpg", video: "/videos/energy.mp4", accent: "#168F5D", icon: <Zap className="w-5 h-5" />, align: "left" as const },
  { id: "vertical-chemicals", tagline: "Chemicals & Pharma", title: "Precision Biosynthesis", description: "FDA-aligned cleanrooms manufacture active pharmaceutical ingredients and green solvents with batch-level traceability.", image: "/images/chemicals.jpg", video: "/videos/chemicals.mp4", accent: "#50D0DE", icon: <Layers className="w-5 h-5" />, align: "right" as const },
  { id: "vertical-trade", tagline: "International Trade", title: "Connecting Global Markets", description: "A 24/7 trading desk.", image: "/images/trade.jpg", video: "/videos/trade.mp4", accent: "#9D6FFF", icon: <Globe className="w-5 h-5" />, align: "left" as const },
];

const stats = [
  { value: "40+", label: "Years of Trust & Excellence" },
  { value: "15+", label: "Global Trading Hubs and Pharmaceuticals Formulations" },
  { value: "$10B+", label: "Consolidated Annual Revenue" },
  { value: "13,000+", label: "Talented Partners & Associates" },
];

const tickerItems = [
  { value: "40+", label: "Years of Excellence" },
  { value: "15+", label: "Global Hubs" },
  { value: "$12B+", label: "Annual Revenue" },
  { value: "15,000+", label: "Associates" },
  { value: "EcoVadis Platinum", label: "CSR Rating" },
  { value: "ISO 9001", label: "Certified" },
  { value: "Carbon Neutral", label: "Target 2026" },
  { value: "Top 1%", label: "Ethical Supply Chain" },
];

const keyLeaders = [
  { name: "Gunendra Mehta", role: "Group Executive Chairman", quote: "Excellence is not a singular act, but a habit of continuous ethical development and global innovation." },
  { name: "Romi Mehta", role: "Chief Executive Officer (CEO)", quote: "You are born to excel and dare to care" },
];

interface Hub { id: string; name: string; coords: [number, number]; role: string; details: string; impact: string; }

const globalHubs: Hub[] = [
  { id: "dcr", name: "DCR", coords: [-4.32, 15.32], role: "Minerals Extraction & Operations Base", details: "Mining asset operations, refinery coordination, and CSR compliance.", impact: "Over 8,500 local workers engaged in ethical mining operations." },
  { id: "london", name: "London", coords: [51.51, -0.13], role: "Global Corporate HQ & Financial Hub", details: "Executive leadership, finance, and investment operations.", impact: "Directs £5B+ global asset portfolio." },
  { id: "newyork", name: "New York", coords: [40.71, -74.01], role: "International Trade & Investment Relations", details: "Corporate relations, hedge-fund & commodity trade negotiations.", impact: "Managing $4B in annual trade transactions." },
  { id: "dubai", name: "Dubai", coords: [25.2, 55.27], role: "Commodities & Logistics Control Center", details: "Central hub for mineral trading, shipping logistics, and brokerage.", impact: "Controls 9% of Middle East/Africa mineral exports." },
  { id: "singapore", name: "Singapore", coords: [1.36, 103.99], role: "Asia-Pacific Arbitrage & Chemicals Trade", details: "Regional chemical logistics, trade finance, and technology scaling.", impact: "Servicing key East-Asian manufacturing clients." },
  { id: "perth", name: "Perth", coords: [-31.95, 115.86], role: "Australian Operations & Energy Development", details: "Renewable energy joint ventures, heavy minerals, and technical audits.", impact: "300MW clean energy infrastructure projects underway." },
  { id: "santiago", name: "Santiago", coords: [-33.45, -70.65], role: "South America Lithium Operations", details: "Lithium brine extraction, initial refining, and export shipping.", impact: "Supplying 80% of European battery-grade lithium." },
  { id: "india", name: "India", coords: [20.59, 78.96], role: "Semiconductor & Mining Equipment Sourcing", details: "Strategic sourcing of semiconductors and heavy mining equipment from India's growing industrial manufacturing base.", impact: "Partnering with 30+ Indian OEMs for precision mining and tech components." },
  { id: "china", name: "China", coords: [35.86, 104.19], role: "EPC, Solar & Renewable Energy Sourcing", details: "Sourcing of mining equipment, EPC players, solar panels, and renewable energy components at scale.", impact: "Channelling $2B+ in annual renewable and industrial equipment procurement." },
];

const testimonials = [
  { quote: "Wellness Group has been our mineral trade partner for over a 3 decades. Their commitment to supply-chain visibility, prompt delivery, and ethical lithium sourcing makes them an indispensable asset to our Business.", author: "Edwin Muommenam", company: "EDIC chemicals & Allide Distributions CMD" },
  { quote: "Wellness Group has been our mineral trade partner for over a 3 decades. Their commitment to supply-chain visibility, prompt delivery, and ethical lithium sourcing makes them an indispensable asset to our Business.", author: "Richard Mclligatte", company: "CMD" },
];


export default function Home() {
  // ── Refs ──────────────────────────────────────────────────────────────────
  // heroSectionRef → the tall outer <section> that drives all scroll math
  // heroInnerRef  → the sticky viewport-height inner that stays on screen
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroInnerRef   = useRef<HTMLDivElement>(null);
  const spotlightRef   = useRef<HTMLDivElement>(null);
  const scrambleRef1   = useRef<HTMLSpanElement>(null);
  const scrambleRef2   = useRef<HTMLSpanElement>(null);
  const btn1Ref        = useRef<HTMLAnchorElement>(null);
  const btn2Ref        = useRef<HTMLAnchorElement>(null);
  const progressRef    = useRef<HTMLDivElement>(null);
  // One ref per story card image
  const imgRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const [activeHub, setActiveHub] = useState<Hub>(globalHubs[0]);

  // ── Entry animations (scoped to inner sticky div) ─────────────────────────
  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
      .from('.hero-kicker',  { opacity: 0, y: 14, duration: 0.55 })
      .from('.hero-badge',   { opacity: 0, y: 10, scale: 0.88, duration: 0.45, stagger: 0.09 }, '-=0.25')
      .from('.hero-title',   { opacity: 0, y: 32, duration: 0.75 }, '-=0.15')
      .from('.hero-copy',    { opacity: 0, y: 18, duration: 0.65 }, '-=0.4')
      .from('.hero-cta',     { opacity: 0, y: 18, duration: 0.55, stagger: 0.11 }, '-=0.35')
      .add(() => {
        if (scrambleRef1.current) scrambleInto(scrambleRef1.current, 'Born to ');
        if (scrambleRef2.current) scrambleInto(scrambleRef2.current, 'Excel', 120);
      }, '-=0.55');

    // Aurora orbs drift endlessly on independent paths
    gsap.utils.toArray<HTMLElement>('.hero-orb').forEach((orb, i) => {
      gsap.to(orb, { x: 'random(-75, 75)', y: 'random(-65, 65)', duration: 8 + i * 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.9 });
    });
  }, { scope: heroInnerRef });

  // ── Scroll-driven story: image cards + progress bar ───────────────────────
  // Guarded by matchMedia: only runs on lg+ screens where cards are visible.
  // On mobile the cards are display:none so no scroll space is wasted and no
  // unnecessary ScrollTrigger instances are created.
  useGSAP(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Progress bar
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: heroSection, start: 'top top', end: '92% top', scrub: true },
        }
      );

      storyCards.forEach((card, i) => {
        const el = imgRefs.current[i];
        if (!el) return;

        gsap.set(el, { ...card.from, force3D: true });

        gsap.to(el, {
          x: 0, y: 0, rotation: card.finalRotation, opacity: 1, scale: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: heroSection, start: card.scrollStart, end: card.scrollEnd, scrub: 1.5 },
        });

        // Gentle parallax drift after card lands — adds depth
        gsap.to(el, {
          y: card.parallaxY, ease: 'none',
          scrollTrigger: { trigger: heroSection, start: card.scrollEnd, end: '100% top', scrub: true },
        });
      });
    });

    // Reduced motion: make cards instantly visible without animation
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: reduce)', () => {
      storyCards.forEach((card, i) => {
        const el = imgRefs.current[i];
        if (!el) return;
        gsap.set(el, { opacity: 1, scale: 1, x: 0, y: 0, rotation: card.finalRotation });
      });
    });
  });

  // Cursor spotlight tracks mouse in the inner sticky hero
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.to(spotlightRef.current, { left: e.clientX - rect.left, top: e.clientY - rect.top, opacity: 1, duration: 0.65, ease: 'power2.out' });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />
      {/* ── Wellness Profile Scroll Story (PDF pages 2-22 as cinematic slides) ── */}
      <WellnessScrollStory />


      {/* ── Hero ─────────────────────────────────────────────────────────────
          Outer section is tall (450vh) — provides the scroll runway.
          Inner div is sticky (h-screen) — stays in the viewport throughout.
          Image cards animate in sequentially as user scrolls the outer section.
      ──────────────────────────────────────────────────────────────────────── */}
      {/* Outer section is min-h-screen on mobile (story cards are hidden anyway)
          and 450vh on lg+ to provide the scroll runway for the image cards.    */}
      <section ref={heroSectionRef} id="hero-section" className="relative min-h-screen overflow-hidden">
        {/* Pyramid background */}
        <Image
          src="/global-night.jpg"
          alt="Earth at night showing global city lights across continents"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay so text remains readable */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Born to Excel — top of pyramid */}
        <div ref={heroInnerRef} className="absolute top-24 inset-x-0 z-10 px-10 text-center">
          <h1
            className="hero-title font-century-gothic text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white max-w-3xl leading-tight mx-auto italic"
          >
            <span ref={scrambleRef1}>Born to </span>
            <span ref={scrambleRef2} className="text-transparent bg-clip-text bg-gradient-to-r from-[#168F5D] via-[#ADE6A5] to-[#168F5D]">
              Excel
            </span>
          </h1>
        </div>

        {/* Description — bottom of pyramid image */}
        <div className="absolute bottom-1 inset-x-0 z-10 px-6 text-center">
          <p className="hero-copy text-lg sm:text-xl md:text-2xl text-white max-w-4xl leading-relaxed mx-auto font-medium">
            Pioneering ethical Minerals Export, smart Engineering, sustainable Energy,
            Pharmaceutical formulation, manufacturing and export International trade of innovation and creative, technological products across 40 countries
          </p>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative group">
              <AnimatedSection direction="right" className="relative">
                <div className="absolute -inset-3 rounded-2xl border border-[#0F2430]/15 group-hover:border-[#0F2430]/30 transition-colors duration-500 -z-10 translate-x-2 translate-y-2" />
                <ParallaxImage src="/about_hq.png" alt="Wellness Group Corporate Headquarters" className="rounded-2xl aspect-square border border-[#E2E5E8] shadow-xl shadow-[#0F2430]/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/40 via-transparent to-transparent opacity-70" />
                </ParallaxImage>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <AnimatedSection direction="left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Our Corporate Creed</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2430] mt-2 mb-4">Born to Excel. Driven to Sustain.</h2>
                <p className="text-[#1f2d3d] leading-relaxed mb-4 text-sm sm:text-base">Established with a vision to build a balanced, resilient enterprise, Wellness Group operates at the convergence of vital industries. We trade in the core minerals fueling the global energy transition, engineer large-scale urban infrastructure, deploy clean gigawatt solar arrays, and synthesise crucial chemical APIs and pharmaceuticals formulation.</p>
                <p className="text-[#1f2d3d] leading-relaxed mb-6 text-sm sm:text-base">Our operations bridge critical trade channels across the  Europe, the Middle East, Africa, Asia and Americas — anchored by a deep ethical code that guarantees child-labor-free mining, fully auditable cargo routes, and carbon-offset logistics.</p>
                <div className="grid grid-cols-2 gap-5 mt-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-[#F4F4F4] border border-[#E2E5E8]">
                      <CountUp value={stat.value} className="text-3xl sm:text-4xl font-extrabold text-[#0F2430]" />
                      <p className="text-xs text-[#3E5868] font-semibold tracking-wide uppercase mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0F2430] hover:text-[#3E5868] transition-colors group">
                    <span>Read Our Heritage & Values</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── Immersive Verticals ───────────────────────────────────────────────── */}
      {immersiveVerticals.map((v) => (
        <ImmersiveVertical key={v.id} {...v} />
      ))}

      {/* ── Globe ────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <AnimatedSection direction="right">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Global Footprint</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2430] mt-2 mb-4">A Globally Integrated Supply Chain</h2>
              <p className="text-sm sm:text-base text-[#1f2d3d] leading-relaxed">We manage extraction in Southern Africa, lithium refining in South America, and commodity brokerage across London, Dubai, and Singapore.</p>
            </AnimatedSection>
          </div>
          <AnimatedSection direction="none">
            {/* Dark navy card — all text inside is white-on-dark; do NOT add glass-panel here */}
            <div className="relative rounded-3xl p-6 lg:p-10 overflow-hidden shadow-2xl border border-white/[0.08] bg-[#0b1c28]">
              {/* Subtle dot grid */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
              {/* Accent glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#168F5D]/12 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3E5868]/18 rounded-full blur-[90px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">

                {/* ── Hub detail panel ─────────────────────────────────────── */}
                <div className="flex flex-col gap-5 lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-[#168F5D]/20 border border-[#168F5D]/30 text-[#ADE6A5]">
                      <Globe className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-white">Global Presence</h3>
                      <p className="text-xs text-white/50 mt-0.5">Ethical Supply Chain & Direct Presence</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Current hub name */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#ADE6A5] font-bold">Current Hub</span>
                    <h4 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#ADE6A5] flex-shrink-0" />
                      {activeHub.name}
                    </h4>
                  </div>

                  {/* Info cards */}
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/[0.09]">
                      <span className="text-[10px] uppercase font-bold text-[#50D0DE] tracking-wider">Operational Role</span>
                      <p className="text-sm font-semibold text-white mt-1 leading-snug">{activeHub.role}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/[0.09]">
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Key Details</span>
                      <p className="text-sm text-white/80 mt-1 leading-relaxed">{activeHub.details}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#168F5D]/10 border border-[#168F5D]/25">
                      <span className="text-[10px] uppercase font-bold text-[#ADE6A5] tracking-wider">Global Impact</span>
                      <p className="text-sm text-[#ADE6A5] font-semibold mt-1 leading-relaxed">{activeHub.impact}</p>
                    </div>
                  </div>
                </div>

                {/* ── Globe + hub buttons ──────────────────────────────────── */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md mx-auto">
                    <CobeGlobe
                      markers={[
                        { id: "dcr",          location: [-4.32,  15.32],  label: "DCR"        },
                        { id: "london",       location: [51.51,  -0.13],  label: "London"     },
                        { id: "newyork",      location: [40.71, -74.01],  label: "New York"   },
                        { id: "dubai",        location: [25.2,   55.27],  label: "Dubai"      },
                        { id: "singapore",    location: [1.36,  103.99],  label: "Singapore"  },
                        { id: "perth",        location: [-31.95, 115.86], label: "Perth"      },
                        { id: "santiago",     location: [-33.45, -70.65], label: "Santiago"   },
                        { id: "india",        location: [20.59,  78.96],  label: "India"      },
                        { id: "china",        location: [35.86, 104.19],  label: "China"      },
                      ]}
                      activeMarkerId={activeHub.id}
                      arcs={[
                        { id: "dcr-london",      from: [-4.32,   15.32], to: [51.51,  -0.13],  label: "Extraction → HQ"  },
                        { id: "santiago-dubai",  from: [-33.45, -70.65], to: [25.2,   55.27],  label: "Lithium Trade"    },
                        { id: "dubai-singapore", from: [25.2,   55.27],  to: [1.36,  103.99],  label: "Asia-Pacific"     },
                        { id: "newyork-london",  from: [40.71, -74.01],  to: [51.51,  -0.13],  label: "Trade Finance"    },
                        { id: "singapore-perth", from: [1.36,  103.99],  to: [-31.95, 115.86], label: "Aussie Energy"    },
                        { id: "china-india",     from: [35.86, 104.19],  to: [20.59,  78.96],  label: "Equipment Supply" },
                        { id: "china-dubai",     from: [35.86, 104.19],  to: [25.2,   55.27],  label: "Solar Trade"      },
                      ]}
                      markerColor={[0.0863, 0.5608, 0.3647]}
                      baseColor={[0.95, 0.95, 0.95]}
                      arcColor={[0.168, 0.624, 0.368]}
                      glowColor={[0.3, 0.4, 0.5]}
                      dark={0} mapBrightness={8} markerSize={0.035} markerElevation={0.015}
                    />
                  </div>

                  {/* Hub selector buttons */}
                  <div className="flex gap-2.5 flex-wrap justify-center mt-6">
                    {globalHubs.map((hub) => {
                      const isActive = activeHub.id === hub.id;
                      return (
                        <button
                          key={hub.id}
                          onClick={() => setActiveHub(hub)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 border ${
                            isActive
                              ? "bg-[#168F5D]/25 border-[#168F5D] text-white shadow-sm"
                              : "bg-white/[0.05] border-white/15 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30"
                          }`}
                        >
                          {hub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <AnimatedSection direction="right">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Our Leadership</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2430] mt-1 mb-4">Guided by Vision & Ethics</h2>
                <p className="text-sm text-[#1f2d3d] leading-relaxed mb-4">Our directors hold decades of board experience in minerals trading, international law, structural engineering, and clean tech.</p>
                <Link href="/leadership" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0F2430] hover:text-[#3E5868] transition-colors group mt-6">
                  <span>View Board of Directors</span><ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {keyLeaders.map((leader, idx) => (
                <AnimatedSection key={idx} direction="up" delay={idx * 0.15} className="bg-white p-6 rounded-2xl border border-[#E2E5E8] flex flex-col gap-6 hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F2430] to-[#3E5868] p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#0F2430] font-extrabold text-lg">{leader.name.split(' ').map(n => n[0]).join('')}</div>
                    </div>
                    <div><h4 className="text-base font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors">{leader.name}</h4><span className="text-xs text-[#3E5868] font-medium">{leader.role}</span></div>
                  </div>
                  <blockquote className="text-xs italic text-[#1f2d3d] leading-relaxed border-l-2 border-[#0F2430] pl-3 py-1 flex-1">&ldquo;{leader.quote}&rdquo;</blockquote>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Stakeholder Validation</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F2430] mt-2">Trusted by Industry Giants</h2>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.1} className="p-8 rounded-2xl bg-[#F4F4F4] border border-[#E2E5E8] flex flex-col justify-between">
                <div className="mb-6">
                  <span className="text-5xl text-[#0F2430] font-serif opacity-30 select-none block -mb-4">&ldquo;</span>
                  <p className="text-[#1f2d3d] text-sm leading-relaxed italic">{test.quote}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E5E8] pt-4">
                  <div><h5 className="text-sm font-bold text-[#0F2430]">{test.author}</h5><span className="text-xs text-[#3E5868]">{test.company}</span></div>
                  <ShieldCheck className="w-5 h-5 text-[#3E5868] opacity-50" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section id="cta-section" className="py-24 sm:py-32 bg-[#F5F5F5] relative overflow-hidden border-t border-[#E2E5E8]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,36,48,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#168F5D]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center">
          <AnimatedSection direction="up" className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6 leading-tight">Ready to Shape the Future of Industrial Synergy?</h2>
            <p className="text-base sm:text-lg text-[#1f2d3d] mb-10 max-w-2xl leading-relaxed">Partner with a global conglomerate driving ethical sourcing, high-performance infrastructure, and carbon-neutral resource trade.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#0F2430] text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#081720] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-[#0F2430]/20">Initiate Relationship</Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white border border-[#0F2430]/15 hover:bg-[#E2E5E8]/40 rounded-full text-sm font-bold uppercase tracking-wider text-[#0F2430] transition-all duration-300 flex items-center justify-center gap-1.5"><ArrowRight className="w-4 h-4" /><span>Get In Touch</span></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
