"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import ButterflyLogo from "./ui/ButterflyLogo";

const businessLinks = [
  { name: "Minerals Export & Logistics", href: "/businesses#minerals" },
  { name: "Engineering & Construction", href: "/businesses#engineering" },
  { name: "Renewable Energy & Infrastructure", href: "/businesses#energy" },
  { name: "Chemicals & Pharmaceuticals", href: "/businesses#chemicals" },
  { name: "International Trade & Arbitrage", href: "/businesses#trade" },
];

const companyLinks = [
  { name: "About Our Group", href: "/about" },
  { name: "Board of Directors", href: "/leadership" },
  { name: "Key Projects Portfolio", href: "/projects" },
  { name: "Sustainability & Ethics", href: "/sustainability" },
  { name: "Careers & Talent", href: "/careers" },
];

const officeLocations = [
  {
    city: "London Head Office",
    address: "One Canada Square, Canary Wharf, London, E14 5AB, UK",
    phone: "+44 (0) 20 7516 4000",
  },
  {
    city: "Dubai Commodities Hub",
    address: "Almas Tower, Jumeirah Lakes Towers, Dubai, UAE",
    phone: "+971 (0) 4 345 6789",
  },
  {
    city: "Singapore Trade Office",
    address: "Marina Bay Financial Centre, 10 Marina Blvd, Singapore 018983",
    phone: "+65 6808 1234",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-20 pb-10 overflow-hidden border-t border-[#E2E5E8]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[linear-gradient(to_right,rgba(15,36,48,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,36,48,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Logo & Message */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <ButterflyLogo size={42} />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-[#0F2430]">WELLNESS</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#3E5868] font-semibold -mt-1">GROUP</span>
              </div>
            </Link>
            <p className="text-sm text-[#3E5868] leading-relaxed">
              Wellness Group is a premier global conglomerate dedicated to sustainable excellence across key sectors shaping our future.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F5F5F5] hover:bg-[#E2E5E8] text-[#3E5868] hover:text-[#0F2430] transition-all duration-300 border border-[#E2E5E8]"
                title="Chat on WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F5F5F5] hover:bg-[#E2E5E8] text-[#3E5868] hover:text-[#0F2430] transition-all duration-300 border border-[#E2E5E8]"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Business Divisions */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F2430] border-l-2 border-[#3E5868] pl-3">
              Divisions
            </h4>
            <ul className="flex flex-col gap-3">
              {businessLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#3E5868] hover:text-[#0F2430] flex items-center gap-1 group transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F2430] border-l-2 border-[#E2E5E8] pl-3">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#3E5868] hover:text-[#0F2430] flex items-center gap-1 group transition-colors duration-300"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F2430] border-l-2 border-[#3E5868] pl-3">
              Global Support
            </h4>
            <div className="flex flex-col gap-4 text-sm text-[#3E5868]">
              <a href="mailto:relations@wellnessgroup.com" className="flex items-center gap-3 hover:text-[#0F2430] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#E2E5E8] transition-all">
                  <Mail className="w-3.5 h-3.5 text-[#3E5868]" />
                </div>
                <span>relations@wellnessgroup.com</span>
              </a>
              <a href="tel:+442075164000" className="flex items-center gap-3 hover:text-[#0F2430] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#E2E5E8] transition-all">
                  <Phone className="w-3.5 h-3.5 text-[#3E5868]" />
                </div>
                <span>+44 (0) 20 7516 4000</span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#3E5868]" />
                </div>
                <div>
                  <span className="font-semibold text-[#0F2430] text-xs block">Wellness Group HQ</span>
                  <p className="text-xs mt-0.5 leading-relaxed">One Canada Square, Canary Wharf, London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#E2E5E8] my-8" />

        {/* Office Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {officeLocations.map((loc) => (
            <div
              key={loc.city}
              className="p-4 rounded-xl bg-[#F5F5F5] border border-[#E2E5E8] hover:border-[#0F2430]/20 hover:bg-white transition-all duration-300"
            >
              <h5 className="text-xs font-bold uppercase tracking-widest text-[#0F2430] mb-1.5 flex items-center justify-between">
                <span>{loc.city}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#168F5D] animate-pulse" />
              </h5>
              <p className="text-xs text-[#3E5868] leading-relaxed mb-1.5">{loc.address}</p>
              <p className="text-xs font-medium text-[#0F2430]">{loc.phone}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#E2E5E8] my-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3E5868]">
          <span>&copy; {currentYear} Wellness Group. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#0F2430] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0F2430] transition-colors">Terms of Business</Link>
            <Link href="/compliance" className="hover:text-[#0F2430] transition-colors">Compliance & Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
