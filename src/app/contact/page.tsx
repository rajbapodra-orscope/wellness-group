"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ButterflyLogo from "@/components/ui/ButterflyLogo";
import { Send, CheckCircle2, ShieldCheck } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";


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
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Form */}
          <div>
              <AnimatedSection direction="up" className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E2E5E8] shadow-sm shadow-[#0F2430]/5">
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
      </section>

      <Footer />
    </div>
  );
}
