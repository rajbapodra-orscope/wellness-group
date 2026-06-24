"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Building } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";

const offices = [
  { city: "London Corporate Head Office", address: "One Canada Square, Canary Wharf, London, E14 5AB, United Kingdom", phone: "+44 (0) 20 7516 4000", email: "london.office@wellnessgroup.com", coords: "51.5049° N, 0.0195° W" },
  { city: "Dubai Commodities & Trade Hub", address: "Almas Tower, Jumeirah Lakes Towers, Dubai, United Arab Emirates", phone: "+971 (0) 4 345 6789", email: "dubai.desk@wellnessgroup.com", coords: "25.0772° N, 55.1432° E" },
  { city: "Singapore Asia-Pacific Desk", address: "Marina Bay Financial Centre, 10 Marina Blvd, Singapore 018983", phone: "+65 6808 1234", email: "singapore.desk@wellnessgroup.com", coords: "1.2789° N, 103.8544° E" },
  { city: "Johannesburg Mining Operations", address: "West Street, Sandown, Sandton, 2196, Johannesburg, South Africa", phone: "+27 (0) 11 884 1000", email: "africa.ops@wellnessgroup.com", coords: "26.1044° S, 28.0578° E" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", department: "Minerals & Trade", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); setForm({ name: "", email: "", company: "", department: "Minerals & Trade", message: "" }); }, 1200);
  };

  const inputClass = "w-full bg-[#F4F4F4] border border-[#E2E5E8] rounded-xl px-4 py-3 text-sm text-[#0F2430] focus:outline-none focus:border-[#0F2430] transition-colors placeholder:text-[#3E5868]/50";

  return (
    <div className="flex-1 flex flex-col bg-[#F4F4F4]">
      <Navbar />

      <section className="relative pt-36 pb-20 overflow-hidden bg-white">
        <ParallaxImage
          src="/images/canarywharf.jpg"
          alt="Canary Wharf, London"
          priority
          className="absolute inset-0 opacity-15 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        </ParallaxImage>
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <ButterflyLogo size={60} className="mb-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868] mb-2">Connect</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F2430] mb-6">Initiate Corporate Relations</h1>
          <p className="text-[#3E5868] text-sm sm:text-base max-w-2xl leading-relaxed">
            Reach out to our global divisions for trade brokerage inquiries, construction bidding, or clean energy joint ventures.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Offices */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection direction="right" className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E5868]">Corporate Inquiries</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2430]">Our Global Offices</h2>
                <p className="text-sm text-[#3E5868] leading-relaxed">
                  Wellness Group manages operations through strategic hubs positioned at core financial and commodity distribution vectors.
                </p>
              </AnimatedSection>

              <div className="space-y-5">
                {offices.map((office, idx) => (
                  <AnimatedSection key={idx} direction="up" delay={idx * 0.08}
                    className="p-5 rounded-2xl bg-white border border-[#E2E5E8] hover:border-[#3E5868] hover:shadow-md transition-all flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F4F4] border border-[#E2E5E8] flex items-center justify-center text-[#0F2430] flex-shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-sm font-bold text-[#0F2430] flex items-center justify-between">
                        <span>{office.city}</span>
                        <span className="text-[9px] text-[#3E5868] font-mono">{office.coords}</span>
                      </h4>
                      <p className="text-xs text-[#3E5868] leading-relaxed">{office.address}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#3E5868] border-t border-[#E2E5E8] pt-2 mt-2">
                        <a href={`tel:${office.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-1.5 hover:text-[#0F2430] transition-colors">
                          <Phone className="w-3.5 h-3.5 text-[#3E5868]" />{office.phone}
                        </a>
                        <a href={`mailto:${office.email}`} className="flex items-center gap-1.5 hover:text-[#0F2430] transition-colors">
                          <Mail className="w-3.5 h-3.5 text-[#3E5868]" />{office.email}
                        </a>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="left" className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2E5E8] shadow-sm shadow-[#0F2430]/5">
                {submitted ? (
                  <div className="py-12 text-center space-y-6 flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-[#168F5D] animate-bounce" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#0F2430]">Inquiry Received</h3>
                      <p className="text-sm text-[#3E5868] max-w-md mx-auto">A desk officer will contact you within 24 business hours.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-[#F4F4F4] border border-[#E2E5E8] hover:border-[#0F2430] text-[#0F2430] rounded-full text-xs font-bold uppercase tracking-wider transition-all">
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#3E5868] tracking-widest">Inquiry Form</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F2430] mt-1">Department Correspondence</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#3E5868] uppercase tracking-wide">Full Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#3E5868] uppercase tracking-wide">Corporate Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#3E5868] uppercase tracking-wide">Company</label>
                        <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Acme Corporation" className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#3E5868] uppercase tracking-wide">Division</label>
                        <select name="department" value={form.department} onChange={handleChange} className={inputClass}>
                          <option value="Minerals & Trade">Minerals & Resources Desk</option>
                          <option value="EPC Construction">EPC Engineering Division</option>
                          <option value="Renewable Energy">Renewable Energy Partnerships</option>
                          <option value="Chemicals & Pharma">Chemicals & Bio-Pharma Sales</option>
                          <option value="General Relations">General Corporate Relations</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#3E5868] uppercase tracking-wide">Inquiry Details</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Please outline the parameters of your operational requirements..."
                        className={inputClass} />
                    </div>

                    <button type="submit" disabled={submitting}
                      className="w-full py-4 bg-[#0F2430] hover:bg-[#081720] text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm shadow-[#0F2430]/30">
                      {submitting ? <span>Validating...</span> : <><Send className="w-4 h-4" /><span>Submit Formal Inquiry</span></>}
                    </button>

                    <div className="flex items-center gap-2 text-[10px] text-[#3E5868] bg-[#F4F4F4] border border-[#E2E5E8] p-3 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-[#0F2430] flex-shrink-0" />
                      <span>Submissions undergo encryption audits before distribution to divisions.</span>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
