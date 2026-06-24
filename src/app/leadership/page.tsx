"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import { Scale, ShieldAlert, Award } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

const board = [
  { name: "Dr. Vikram Seth", role: "Group Executive Chairman", credentials: "Ph.D. in Resource Economics, Oxford University", bio: "Dr. Seth has overseen global commodity transactions for over 30 years. Formerly a senior advisor to international energy commissions, he steers the Group's long-term asset allocations." },
  { name: "Helena Rostova", role: "Chief Executive Officer (CEO)", credentials: "M.S. Chemical Engineering, MIT; MBA, Harvard", bio: "Helena directs all operating divisions of Wellness Group and spearheaded our pivot to battery-grade lithium refining." },
  { name: "Sir Alistair Montgomery", role: "Non-Executive Director & Governance Lead", credentials: "Former Member of the UK High Court of Justice", bio: "Sir Alistair chairs the Compliance and Ethics Board, ensuring supply chain audits and ESG frameworks exceed LME and international standards." },
  { name: "Marcus Aurelius Vance", role: "Chief Financial Officer (CFO)", credentials: "Former Managing Director, Global Trade Finance, HSBC", bio: "Marcus supervises group risk, accounting, and capital structure, managing our arbitrage desks and international trade lines." },
];

const committee = [
  { name: "Dr. Chloe Zhang", role: "CTO — Biochemical R&D", dept: "Chemicals & Pharmaceuticals" },
  { name: "David Mbeki", role: "Director, Mining Asset Operations", dept: "Minerals & Resources" },
  { name: "Amara Al-Jamil", role: "Head, Infrastructure Projects", dept: "Engineering & Construction" },
  { name: "Klaus Schreiber", role: "MD, Energy Grid Systems", dept: "Renewable Energy" },
];

export default function Leadership() {
  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <ParallaxImage
          src="/images/dubai.jpg"
          alt="Global financial district"
          priority
          className="absolute inset-0 opacity-15 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        </ParallaxImage>
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Corporate Governance</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">Board & Executive Leadership</h1>
          <p className="text-[#3E5868] text-sm max-w-2xl leading-relaxed">Directed by international leaders across metallurgy, infrastructure finance, chemical synthesis, and corporate law.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection direction="up" className="bg-[#0F2430] p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2E5E8]">Chairman&rsquo;s Address</span>
              <blockquote className="text-base sm:text-xl text-white italic leading-relaxed font-medium">
                &ldquo;We are in the business of securing critical industrial channels — ensuring that the copper, lithium, and energy driving tomorrow&rsquo;s grids are extracted and transported with absolute human decency and zero carbon compromises.&rdquo;
              </blockquote>
              <div className="h-px bg-white/20" />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Dr. Vikram Seth</h4>
                  <span className="text-xs text-[#E2E5E8]">Group Executive Chairman</span>
                </div>
                <ButterflyLogo size={40} className="opacity-40" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Stewardship</span>
              <h2 className="text-3xl font-bold text-[#0F2430] mt-1">Board of Directors</h2>
              <div className="w-12 h-0.5 bg-[#0F2430] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {board.map((d, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.1}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors">{d.name}</h3>
                    <span className="text-xs font-semibold text-[#3E5868]">{d.role}</span>
                  </div>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#F4F4F4] border border-[#E2E5E8] flex items-center justify-center text-[#3E5868] hover:text-[#0F2430] hover:border-[#0F2430] transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                <span className="text-[10px] text-[#3E5868] block font-semibold mb-3">{d.credentials}</span>
                <p className="text-xs text-[#3E5868] leading-relaxed">{d.bio}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <AnimatedSection direction="up" className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Operations Leads</span>
              <h2 className="text-3xl font-bold text-[#0F2430] mt-1">Executive Committee</h2>
              <div className="w-12 h-0.5 bg-[#3E5868] rounded-full mt-4" />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {committee.map((lead, idx) => (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.08}
                className="bg-[#F4F4F4] p-5 rounded-2xl border border-[#E2E5E8] hover:border-[#3E5868] hover:shadow-md transition-all text-center group">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E2E5E8] flex items-center justify-center mx-auto text-[#0F2430] font-extrabold text-sm mb-4 group-hover:bg-[#0F2430] group-hover:text-white transition-all duration-300">
                  {lead.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h4 className="text-sm font-bold text-[#0F2430] group-hover:text-[#3E5868] transition-colors">{lead.name}</h4>
                <p className="text-[11px] text-[#3E5868] mt-1">{lead.role}</p>
                <div className="h-px bg-[#E2E5E8] my-3" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#3E5868]">{lead.dept}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4] border-t border-[#E2E5E8]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { icon: <Scale className="w-7 h-7 text-[#0F2430]" />, title: "Ethical Charter", desc: "We strictly comply with the Dodd-Frank Act (Section 1502), the UK Modern Slavery Act, and OECD guidance for responsible mineral supply chains." },
              { icon: <ShieldAlert className="w-7 h-7 text-[#3E5868]" />, title: "Risk Audits", desc: "Finance and trade arbitrage lines are subjected to semi-annual audits by independent tier-one accounting houses to guarantee compliance." },
              { icon: <Award className="w-7 h-7 text-[#0F2430]" />, title: "Safety Integrity", desc: "Strict-Zero accidents safety protocol. In 2025, Engineering and Mining divisions logged 18M+ man-hours with zero major incidents." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E5E8] hover:shadow-lg hover:shadow-[#0F2430]/5 transition-all space-y-4">
                {item.icon}
                <h4 className="text-base font-bold text-[#0F2430]">{item.title}</h4>
                <p className="text-xs text-[#3E5868] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
