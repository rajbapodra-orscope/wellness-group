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

type Project = {
  title: string;
  category?: string;
  location: string;
  date?: string;
  metrics?: string;
  details?: string;
  esg?: string;
  image: string;
};

const completedProjects: Project[] = [
  { title: "Mining Operations", category: "Minerals", location: "Africa", metrics: "A business pipline $200m by end of 2027", details: "Carried out Mining operations Maintenance, shut down, and supply of mining equipements", image: "/images/haultruck.jpg" },
  { title: "Pharmaceutical Formulations", category: "Pharmaceutical", location: "40 Countries", metrics: "A business pipeline $25 m by end of 2027  ", details: "Marketing our own  associate brands of phramaceutical formulations manufactured in India by us and supplied across 40 countries", image: "/images/pharma-formulations.jpg" },
  { title: "Pilbara Wind & Solar Hybrid Array", category: "Renewable Energy", location: "India /  Africa", metrics: "Pipeline of 450 MV", details: "In new venture in the field of green energy starting with SADC countries in India", image: "/images/wind.jpg" },
  { title: "Consultancy", location: "Across the world", image: "/images/consultancy.jpg" },
  { title: "Precious Metals", location: "UAE", image: "/images/gold.jpg" },
];

const immediateUpcomingProjects: Project[] = [
  { title: "Semiconductor Assembly & Testing", category: "Electronics", location: "India", details: "Entering semiconductor assembly, packaging, and testing to strengthen India's fast-growing electronics manufacturing ecosystem.", image: "/images/semicon.jpg" },
];

const pipelineProjects: Project[] = [
  { title: "Non-GM Seeds & Herbal Agro Growth Enhancers", category: "Agriculture", location: "Across the Globe", details: "Developing non-GMO seed varieties and herbal-based growth enhancers to improve crop yield and soil health sustainably.", image: "/images/agro-herbals.jpg" },
  { title: "Asset Reconstruction", category: "Financial Services", location: "India", details: "Acquiring and resolving distressed and non-performing assets to unlock value for lenders and revive stressed businesses.", image: "/images/asset-reconstruction.jpg" },
  { title: "Mining Safety", category: "Minerals", location: "Across the Globe", details: "Deploying advanced safety systems, protective equipment, and training programs to safeguard mining workforces worldwide.", image: "/images/mining-safety.jpg" },
];

const sections: { id: string; title: string; description: string; projects: Project[] }[] = [
  { id: "completed", title: "Completed Projects", description: "Delivered engagements across mining, pharmaceuticals, energy, and trade.", projects: completedProjects },
  { id: "immediate-upcoming", title: "Immediate Upcoming Projects", description: "Projects moving into execution in the near term.", projects: immediateUpcomingProjects },
  { id: "pipeline", title: "Projects in Pipeline", description: "Opportunities under evaluation for future development.", projects: pipelineProjects },
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "immediate-upcoming", label: "Ongoing" },
  { id: "pipeline", label: "Pipeline" },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all group flex flex-col justify-between h-full overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={p.image}
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
            {p.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.date}</span>}
          </div>
          <h3 className="text-lg font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors mb-2">{p.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-[#3E5868] mb-4">
            <MapPin className="w-4 h-4 text-[#0F2430]" />
            <span>{p.location}</span>
          </div>
          {p.details && (
            <>
              <div className="h-px bg-[#E2E5E8] my-4" />
              <p className="text-xs text-[#3E5868] leading-relaxed mb-4">{p.details}</p>
            </>
          )}
          {p.metrics && (
            <div className="p-3.5 rounded-xl bg-[#F4F4F4] border border-[#E2E5E8] mb-4">
              <span className="text-[9px] uppercase font-bold text-[#3E5868] block">Scale / Metrics</span>
              <span className="text-sm font-semibold text-[#0F2430] mt-0.5 block">{p.metrics}</span>
            </div>
          )}
        </div>
        {p.esg && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2430] border-t border-[#E2E5E8] pt-4">
            <ShieldCheck className="w-4 h-4 text-[#3E5868]" />
            <span>{p.esg}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const visibleSections = activeTab === "all" ? sections : sections.filter((s) => s.id === activeTab);

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

          <div className="flex flex-wrap gap-2.5 justify-center mt-10 p-1 bg-[#F5F5F5] border border-[#E2E5E8] rounded-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === tab.id ? "bg-[#0F2430] text-white shadow-sm" : "text-[#3E5868] hover:text-[#0F2430]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Sections */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
          {visibleSections.map((section) => (
            <div key={section.id}>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#0F2430]">{section.title}</h2>
                <p className="text-xs sm:text-sm text-[#3E5868] mt-1">{section.description}</p>
              </div>
              {section.projects.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {section.projects.map((p) => (
                      <ProjectCard key={p.title} p={p} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-[#E2E5E8] text-center text-xs sm:text-sm text-[#3E5868]">
                  New opportunities in this stage will be listed here soon.
                </div>
              )}
            </div>
          ))}

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
