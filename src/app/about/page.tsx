"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import { ShieldCheck, Eye, Compass, Award, HeartHandshake, CheckCircle2 } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

const values = [
  {
    title: "Uncompromising Integrity",
    desc: "Adhering to strict compliance and ethical transparency across our entire minerals and trade supply chain.",
    icon: <ShieldCheck className="w-7 h-7 text-[#0F2430]" />,
  },
  {
    title: "Visionary Innovation",
    desc: "Integrating digital twins in construction, green hydrogen in energy, and advanced synthesis in chemical production.",
    icon: <Eye className="w-7 h-7 text-[#3E5868]" />,
  },
  {
    title: "Global Stewardship",
    desc: "Active community engagement, ethical local employment, and strict carbon-offset logistics frameworks.",
    icon: <Compass className="w-7 h-7 text-[#0F2430]" />,
  },
  {
    title: "Pursuit of Excellence",
    desc: "Rigorous ISO audits, FDA chemical approvals, and grade-A quality marks across all conglomerate divisions.",
    icon: <Award className="w-7 h-7 text-[#3E5868]" />,
  },
];

const milestones = [
  { year: "1988", title: "Foundation", desc: "Established as a regional mineral brokerage firm in London, UK." },
  { year: "1998", title: "EPC Engineering Expansion", desc: "Acquired a leading industrial building firm to offer complete engineering solutions." },
  { year: "2010", title: "Renewable Energy Transition", desc: "Launched a solar division, installing 500MW of grid infrastructure across Europe." },
  { year: "2018", title: "Bio-Chemical & Pharma Division", desc: "Commissioned FDA-certified active pharmaceutical ingredient labs." },
  { year: "2026", title: "Conglomerate Integration", desc: "Consolidated all divisions under Wellness Group, recording $12B+ in annual revenues." },
];

export default function About() {
  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Corporate Profile</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">
            Pioneering Industrial Synergy
          </h1>
          <p className="text-[#3E5868] text-sm sm:text-base max-w-2xl leading-relaxed">
            Wellness Group is an integrated global conglomerate driving ethical sourcing, high-performance engineering, and sustainable energy infrastructures.
          </p>
        </div>
      </section>

      {/* Heritage & Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection direction="right">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Our History</span>
                <h2 className="text-3xl font-bold tracking-tight text-[#0F2430] mt-1">Four Decades of Growth & Integrity</h2>
                <p className="text-[#3E5868] leading-relaxed text-sm mt-3">
                  What started as a boutique trading house in London has matured into a multi-sector conglomerate. Through disciplined reinvestment and strategic joint ventures, we have expanded our capacity to deliver heavy minerals, turn-key industrial structures, and clean power grids.
                </p>
                <ParallaxImage src="/about_hq.png" alt="Corporate Heritage" className="rounded-2xl aspect-video border border-[#E2E5E8] shadow-lg mt-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#E2E5E8]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Ethical Global Trading</span>
                  </div>
                </ParallaxImage>
              </AnimatedSection>
            </div>

            {/* Right Timeline */}
            <div className="lg:col-span-7 space-y-8 relative">
              <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-[#E2E5E8]" />
              {milestones.map((ms, idx) => (
                <AnimatedSection
                  key={idx}
                  direction="up"
                  delay={idx * 0.1}
                  className="flex gap-6 relative group"
                >
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0F2430] flex items-center justify-center font-extrabold text-xs text-[#0F2430] z-10 group-hover:bg-[#0F2430] group-hover:text-white transition-all duration-300 shadow-sm">
                    {ms.year}
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-[#F4F4F4] border border-[#E2E5E8] group-hover:border-[#3E5868] group-hover:shadow-md group-hover:shadow-[#0F2430]/5 transition-all">
                    <h4 className="text-sm font-bold text-[#0F2430] mb-1">{ms.title}</h4>
                    <p className="text-xs text-[#3E5868] leading-relaxed">{ms.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Corporate Creed</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F2430] mt-1">Our Core Values</h2>
              <div className="w-12 h-0.5 bg-[#0F2430] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <AnimatedSection
                key={idx}
                direction="up"
                delay={idx * 0.1}
                className="bg-white p-6 rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all group flex flex-col"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#F4F4F4] w-fit group-hover:scale-105 transition-transform duration-300">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors">{v.title}</h3>
                  <p className="text-xs text-[#3E5868] leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & ESG */}
      <section id="sustainability" className="py-24 bg-white border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <div className="lg:col-span-6 flex flex-col gap-6">
              <AnimatedSection direction="right">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Compliance & Governance</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2430] mt-1 mb-4">
                  Ethical Supply Chain & Direct ESG Audits
                </h2>
                <p className="text-sm text-[#3E5868] leading-relaxed mb-4">
                  Wellness Group rejects the industry trend of unverified sub-contracting. In our Minerals division, we manage the entire value chain — from initial extraction under strict human-rights compliance audits to refining and final sea freighting.
                </p>
                <p className="text-sm text-[#3E5868] leading-relaxed">
                  We verify our operations through global compliance audits including ISO 14001 (Environmental Management) and ISO 45001 (Occupational Health).
                </p>
                <div className="space-y-3 mt-6">
                  {[
                    "Zero Child Labor Sourcing Guarantee",
                    "Satellite-audited minerals transport logs",
                    "Closed-loop water filtration at our Lithium facilities",
                    "Net-zero carbon logistics by 2030 target",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#0F2430] font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#168F5D]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-6">
              <AnimatedSection direction="left" className="bg-[#0F2430] p-8 rounded-3xl">
                <div className="space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E2E5E8]">Consolidated CSR Impact</span>
                  <div className="space-y-4">
                    {[
                      { stat: "100% Traceability", desc: "All lithium and cobalt shipments are RFID tracked with verified audit reports." },
                      { stat: "4.8M Gallons Saved", desc: "Through closed-loop filtration in South American processing facilities." },
                      { stat: "£4.2M Local Investment", desc: "Funding schools, healthcare clinics, and micro-grid solar in rural mining areas." },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/10">
                        <span className="text-xl font-bold text-white">{item.stat}</span>
                        <p className="text-xs text-[#E2E5E8]/70 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
