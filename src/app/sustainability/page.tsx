"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import ParallaxImage from "@/components/ui/ParallaxImage";
import CountUp from "@/components/ui/CountUp";
import {
  CheckCircle2, Droplets, Leaf, ShieldCheck, Recycle, Award,
  ArrowRight, FlaskConical, Factory, Sun,
} from "lucide-react";

const pillars = [
  {
    icon: <Leaf className="w-7 h-7 text-[#168F5D]" />,
    title: "Net-Zero Logistics",
    desc: "Committed to net-zero carbon logistics across all mineral transport and trade routes by 2030, backed by satellite-audited fleet tracking.",
  },
  {
    icon: <Droplets className="w-7 h-7 text-[#3E5868]" />,
    title: "Water Stewardship",
    desc: "Closed-loop water filtration systems at our Lithium and Cobalt processing facilities have reclaimed over 4.8M gallons to date.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#0F2430]" />,
    title: "Ethical Sourcing",
    desc: "Zero child-labor sourcing guarantee, with full-chain audits from extraction to export under OECD due-diligence guidance.",
  },
  {
    icon: <Recycle className="w-7 h-7 text-[#168F5D]" />,
    title: "Circular Manufacturing",
    desc: "Green chemistry guidelines across our Chemicals division reduce manufacturing waste by 40% through solvent reclamation.",
  },
];

const certifications = [
  { name: "ISO 14001", desc: "Environmental Management Systems" },
  { name: "ISO 45001", desc: "Occupational Health & Safety" },
  { name: "ISO 9001", desc: "Quality Management Systems" },
  { name: "OECD Due Diligence", desc: "Responsible Mineral Supply Chains" },
];

const qualityByDivision = [
  {
    icon: <Factory className="w-6 h-6 text-[#0F2430]" />,
    title: "Minerals & Resources",
    desc: "RFID-tracked shipments, third-party assay verification, and conflict-free certification on every lithium, cobalt, and gold consignment.",
  },
  {
    icon: <Sun className="w-6 h-6 text-[#3E5868]" />,
    title: "Renewable Energy",
    desc: "Every gigawatt deployed undergoes independent grid-compliance testing and a 25-year performance warranty audit.",
  },
  {
    icon: <FlaskConical className="w-6 h-6 text-[#0F2430]" />,
    title: "Chemicals & Pharmaceuticals",
    desc: "FDA-aligned cleanroom manufacturing with batch-level traceability and continuous environmental monitoring.",
  },
];

const impactStats = [
  { stat: "100%", desc: "Traceability across lithium and cobalt shipments" },
  { stat: "4.8M Gal", desc: "Water reclaimed through closed-loop filtration" },
  { stat: "18M+ Hrs", desc: "Logged in Mining & Engineering with zero major incidents" },
];

export default function Sustainability() {
  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#168F5D]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Sustainability & Quality</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">Ethical Operations, Verified at Every Step</h1>
          <p className="text-[#3E5868] text-sm sm:text-base max-w-2xl leading-relaxed">
            From mine to market, every Wellness Group operation is governed by rigorous environmental, social, and quality assurance standards.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Our Commitments</span>
              <h2 className="text-3xl font-bold text-[#0F2430] mt-1">Four Pillars of Responsible Growth</h2>
              <div className="w-12 h-0.5 bg-[#0F2430] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.1}
                className="bg-[#F4F4F4] p-6 rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all space-y-4">
                <div className="p-3 rounded-xl bg-white border border-[#E2E5E8] w-fit">{p.icon}</div>
                <h4 className="text-base font-bold text-[#0F2430]">{p.title}</h4>
                <p className="text-xs text-[#3E5868] leading-relaxed">{p.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clean energy showcase */}
      <section className="py-24 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection direction="right">
              <ParallaxImage src="/images/energy.jpg" alt="Utility-scale solar farm" className="rounded-2xl aspect-[4/3] border border-[#E2E5E8] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-wider drop-shadow">Utility-Scale Solar Deployment</span>
              </ParallaxImage>
            </AnimatedSection>
            <AnimatedSection direction="left">
              <ParallaxImage src="/images/wind.jpg" alt="Onshore wind turbine farm" className="rounded-2xl aspect-[4/3] border border-[#E2E5E8] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-wider drop-shadow">Onshore Wind Infrastructure</span>
              </ParallaxImage>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-20 bg-[#F5F5F5] relative overflow-hidden border-t border-[#E2E5E8]">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Consolidated CSR Impact</span>
              <h2 className="text-3xl font-bold text-[#0F2430] mt-1">Measured Results, Not Promises</h2>
              <div className="w-12 h-0.5 bg-[#168F5D] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {impactStats.map((item, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.08}
                className="w-full p-6 rounded-2xl bg-white border border-[#E2E5E8] text-center shadow-sm">
                <CountUp value={item.stat} className="text-2xl sm:text-3xl font-extrabold text-[#0F2430] block" />
                <p className="text-xs text-[#3E5868] mt-2 leading-relaxed">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality by division */}
      <section className="py-24 bg-white border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Quality Assurance</span>
              <h2 className="text-3xl font-bold text-[#0F2430] mt-1">How We Verify Quality, By Division</h2>
              <div className="w-12 h-0.5 bg-[#3E5868] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {qualityByDivision.map((q, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.1}
                className="bg-[#F4F4F4] p-6 sm:p-8 rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all space-y-4">
                <div className="p-3 rounded-xl bg-white border border-[#E2E5E8] w-fit">{q.icon}</div>
                <h4 className="text-base font-bold text-[#0F2430]">{q.title}</h4>
                <p className="text-xs text-[#3E5868] leading-relaxed">{q.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection direction="right">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Independent Verification</span>
                <h2 className="text-3xl font-bold text-[#0F2430] mt-1 mb-4">Certifications & Compliance Standards</h2>
                <p className="text-sm text-[#3E5868] leading-relaxed">
                  Every division of Wellness Group operates under internationally recognized environmental, safety, and quality frameworks — independently audited on a recurring basis.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2430] hover:text-[#3E5868] transition-colors group mt-6">
                  <span>Request Compliance Documentation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-7">
              <AnimatedSection direction="left" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-5 rounded-xl border border-[#E2E5E8]">
                    <Award className="w-5 h-5 text-[#0F2430] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-[#0F2430] block">{c.name}</span>
                      <span className="text-xs text-[#3E5868]">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Charter list */}
      <section className="py-24 bg-white border-t border-[#E2E5E8]/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection direction="up" className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Our Charter</span>
            <h2 className="text-3xl font-bold text-[#0F2430] mb-8">Non-Negotiable Standards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full">
              {[
                "Zero Child Labor Sourcing Guarantee",
                "Satellite-audited minerals transport logs",
                "Closed-loop water filtration at Lithium facilities",
                "Net-zero carbon logistics by 2030 target",
                "Semi-annual independent financial & trade audits",
                "Strict-Zero major safety incident protocol",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-[#0F2430] font-semibold bg-[#F4F4F4] p-4 rounded-xl border border-[#E2E5E8]">
                  <CheckCircle2 className="w-4 h-4 text-[#168F5D] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
