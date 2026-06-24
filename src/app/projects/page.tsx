"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import { MapPin, Calendar, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = ["All", "Minerals", "Engineering", "Renewable Energy"];

const categoryImages: Record<string, string> = {
  Minerals: "/images/minerals.jpg",
  Engineering: "/images/engineering.jpg",
  "Renewable Energy": "/images/wind.jpg",
};

const projects = [
  { title: "Atacama Lithium Evaporation Plant", category: "Minerals", location: "Antofagasta, Chile", date: "Completed 2025", metrics: "22,000 tons LCE annual yield", details: "Deployment of low-water selective adsorption filters. Reduced water extraction by 45% compared to standard brine fields.", esg: "98% compliance index (EcoVadis audit)" },
  { title: "Katanga Copper-Cobalt Refinery", category: "Minerals", location: "Kolwezi, DRC", date: "Operational since 2023", metrics: "120,000 tons copper cathode / yr", details: "Complete vertically integrated refinery under strict, certified child-labor-free mining standards.", esg: "ISO 45001 & 14001 Certified" },
  { title: "Pilbara Wind & Solar Hybrid Array", category: "Renewable Energy", location: "Western Australia", date: "Phase I Completed 2026", metrics: "850MW combined output", details: "Supplies heavy mineral extraction sites with 24/7 clean energy, supported by a 400MWh lithium backup storage cell.", esg: "Reduces carbon emissions by 420K tons annually" },
  { title: "Dubai Commodities Logistics Hub", category: "Engineering", location: "DMCC Trade Zone, Dubai, UAE", date: "Completed 2024", metrics: "250,000 sq ft smart terminal", details: "Turn-key construction of an automated mineral assay and bonded warehouse center with zero-emission temperature systems.", esg: "LEED Gold certified construction" },
  { title: "North Sea Grid Interconnector", category: "Renewable Energy", location: "Hull, United Kingdom", date: "Completed 2025", metrics: "1.2GW high-voltage converter station", details: "EPC delivery of onshore substation grid-synchronization modules to pipe offshore wind directly to the UK National Grid.", esg: "100% biodiversity preservation layout" },
  { title: "London Gateway Bonded Warehouse", category: "Engineering", location: "Essex, United Kingdom", date: "Completed 2025", metrics: "85,000 sq ft automated logistics terminal", details: "EPC construction utilizing low-carbon geopolymers. Integrated rooftop solar arrays offset 100% of terminal power usage.", esg: "BREEAM Outstanding rating" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Portfolio</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">Key Global Infrastructure</h1>
          <p className="text-[#3E5868] text-sm sm:text-base max-w-2xl leading-relaxed">
            Delivering critical engineering systems, sustainable extraction assets, and utility-scale clean energy terminals globally.
          </p>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center mt-10 p-1 bg-[#F5F5F5] border border-[#E2E5E8] rounded-full">
            {categories.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === tab ? "bg-[#0F2430] text-white shadow-sm" : "text-[#3E5868] hover:text-[#0F2430]"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }} key={p.title}
                  className="bg-white rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all group flex flex-col justify-between h-full overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={categoryImages[p.category]}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2430]/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#3E5868] mb-4">
                      <span className="text-[#0F2430]">{p.category}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors mb-2">{p.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#3E5868] mb-4">
                      <MapPin className="w-4 h-4 text-[#0F2430]" />
                      <span>{p.location}</span>
                    </div>
                    <div className="h-px bg-[#E2E5E8] my-4" />
                    <p className="text-xs text-[#3E5868] leading-relaxed mb-4">{p.details}</p>
                    <div className="p-3.5 rounded-xl bg-[#F4F4F4] border border-[#E2E5E8] mb-4">
                      <span className="text-[9px] uppercase font-bold text-[#3E5868] block">Scale / Metrics</span>
                      <span className="text-sm font-semibold text-[#0F2430] mt-0.5 block">{p.metrics}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2430] border-t border-[#E2E5E8] pt-4">
                    <ShieldCheck className="w-4 h-4 text-[#3E5868]" />
                    <span>{p.esg}</span>
                  </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <AnimatedSection direction="up" className="mt-20 p-8 rounded-2xl bg-white border border-[#E2E5E8] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-[#0F2430]">Need detailed project specifications?</h4>
              <p className="text-xs text-[#3E5868]">Our engineering and extraction audits are available for institutional partners upon compliance clearance.</p>
            </div>
            <Link href="/contact"
              className="px-6 py-3 bg-[#0F2430] hover:bg-[#081720] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 group shrink-0 shadow-sm shadow-[#0F2430]/30">
              <span>Request Project Briefs</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
