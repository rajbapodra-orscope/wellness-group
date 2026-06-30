"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Cpu, Hammer, Zap, Layers, Globe, CheckCircle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

const businesses = [
  {
    id: "minerals",
    image: "/images/minerals.jpg",
    title: "Minerals & Resources Export",
    tagline: "Primary Resources for Future Mobility",
    desc: "Wellness Group is a trusted global partner in mineral exploration, refining, and export — supplying critical raw materials with 100% auditable ethical extraction.",
    icon: <Cpu className="w-7 h-7 text-[#0F2430]" />,
    keyAssets: ["Lithium Carbonate & Hydroxide (battery grade)", "High-grade Cobalt cathode sheets", "Refined Copper cathodes & concentrates", "Gold bullion (99.99% purity, conflict-free)"],
    operations: "Mining joint-ventures in Southern Africa & Chile; global transport fleet chartering; automated assays and certification.",
    esgNote: "Strict audit trails ensure child-labor-free mining environments and local communities benefit directly.",
  },
  {
    id: "engineering",
    image: "/images/engineering.jpg",
    title: "Engineering & Construction (EPC)",
    tagline: "Intelligent Infrastructure & Heavy Industry",
    desc: "Comprehensive EPC services for complex industrial, civil, and transport projects using advanced BIM and digital twin technology.",
    icon: <Hammer className="w-7 h-7 text-[#3E5868]" />,
    keyAssets: ["Industrial manufacturing plants & refineries", "Corporate business parks & smart city centers", "Highway networks & railway corridors", "Water desalination & chemical waste processing"],
    operations: "Full-cycle construction from schematic layout to commissioning; real-time digital twin monitoring.",
    esgNote: "All structures are designed to LEED Gold or Platinum standards with carbon sequestration and rainwater harvesting.",
  },
  {
    id: "energy",
    image: "/images/energy.jpg",
    title: "Renewable Energy Development",
    tagline: "Pioneering Low-Carbon Power Solutions",
    desc: "Utility-scale clean energy projects from massive solar arrays to hydrogen storage — powering communities and factories green.",
    icon: <Zap className="w-7 h-7 text-[#0F2430]" />,
    keyAssets: ["Utility-scale PV solar fields (1.2GW+ capacity)", "Onshore wind turbine installations", "Green hydrogen synthesis & storage cells", "Smart microgrids for remote operations"],
    operations: "Land audits, grid connection feasibility, high-voltage substations, contract energy-brokerage (PPA).",
    esgNote: "Every GW deployed prevents ~650,000 metric tons of CO₂ annually vs. coal generation.",
  },
  {
    id: "chemicals",
    image: "/images/chemicals.jpg",
    title: "Chemicals & Pharmaceuticals",
    tagline: "Bio-Synthetics & Active Ingredients",
    desc: "Precision manufacturing of active pharmaceutical ingredients (APIs) and advanced organic chemicals from FDA-approved laboratories.",
    icon: <Layers className="w-7 h-7 text-[#3E5868]" />,
    keyAssets: ["APIs for cardiovascular drugs", "Green bio-solvents & organic agents", "Specialty agricultural nutrients", "High-purity industrial grade reagents"],
    operations: "Molecular synthesis, clean room laboratories, sterile packaging, custom chemical contract research (CRO).",
    esgNote: "Green chemistry guidelines reduce manufacturing waste by 40% and reclaim solvents for repeated cycles.",
  },
  {
    id: "trade",
    image: "/images/trade.jpg",
    title: "International Trade & Brokerage",
    tagline: "Connecting Global Supply & Demand",
    desc: "Global commodity brokerage, trade finance, and hedging — mitigating market volatility through active arbitrage across major exchanges.",
    icon: <Globe className="w-7 h-7 text-[#0F2430]" />,
    keyAssets: ["LME-grade metals hedging & brokerage", "Bulk shipping vessel chartering & tracking", "Letters of credit & trade finance syndication", "In-transit cargo insurance and risk mitigation"],
    operations: "24/7 trading desk",
    esgNote: "All trades verified through AML audits and adhere to international compliance sanctions.",
  },
];

export default function Businesses() {
  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Our Capabilities</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">Global Business Operations</h1>
          <p className="text-[#3E5868] text-sm sm:text-base max-w-2xl leading-relaxed">
            Uniting resource management, clean engineering, pharmaceutical synthesis, and global trade into one sustainable corporate structure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            {businesses.map((biz) => (
              <button key={biz.id} onClick={() => document.getElementById(biz.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-xs px-4 py-2 rounded-full border border-[#0F2430]/15 bg-[#F5F5F5] hover:bg-[#E2E5E8] text-[#3E5868] hover:text-[#0F2430] transition-all font-semibold">
                {biz.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="py-8 bg-[#F4F4F4]">
        {businesses.map((biz, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={biz.id} id={biz.id} className={`scroll-mt-28 py-16 border-b border-[#E2E5E8]/40 ${isEven ? "bg-white" : "bg-[#F4F4F4]"}`}>
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className={`lg:col-span-6 space-y-6 ${!isEven && "lg:order-2"}`}>
                    <AnimatedSection direction={isEven ? "right" : "left"}>
                      <div className="flex items-center gap-3">
                        <span className="p-3 rounded-xl bg-[#F4F4F4] border border-[#E2E5E8]">{biz.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">{biz.tagline}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#0F2430] mt-4 mb-4">{biz.title}</h2>
                      <p className="text-[#3E5868] text-sm leading-relaxed mb-6">{biz.desc}</p>
                      <div className="p-4 rounded-xl border border-[#E2E5E8] bg-[#F4F4F4] flex gap-3">
                        <Shield className="w-5 h-5 text-[#0F2430] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-[#0F2430] uppercase tracking-wider block">ESG Commitment</span>
                          <p className="text-xs text-[#3E5868] mt-1 leading-relaxed">{biz.esgNote}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                  <div className={`lg:col-span-6 ${!isEven && "lg:order-1"}`}>
                    <AnimatedSection direction={isEven ? "left" : "right"} className="space-y-6">
                      <ParallaxImage
                        src={biz.image}
                        alt={biz.title}
                        className="rounded-2xl aspect-[16/10] border border-[#E2E5E8] shadow-lg group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/70 via-[#0F2430]/10 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs font-bold text-white uppercase tracking-wider drop-shadow">{biz.tagline}</span>
                        </div>
                      </ParallaxImage>
                      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E5E8] shadow-sm space-y-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-4">Core Commodities & Portfolio</h4>
                          <ul className="space-y-3">
                            {biz.keyAssets.map((asset, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-[#0F2430]">
                                <CheckCircle className="w-4 h-4 text-[#3E5868] flex-shrink-0 mt-0.5" />
                                <span>{asset}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="h-px bg-[#E2E5E8]" />
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Operations</h4>
                          <p className="text-xs text-[#0F2430] leading-relaxed font-medium">{biz.operations}</p>
                        </div>
                        <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2430] hover:text-[#3E5868] transition-colors group">
                          <span>Division Enquiries</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}
