"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import ButterflyLogo from "./ui/ButterflyLogo";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home",           href: "/" },
  { name: "About Us",       href: "/about" },
  { name: "Our Businesses", href: "/businesses" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Projects",       href: "/projects" },
  { name: "Leadership",     href: "/leadership" },
  { name: "Contact",        href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 flex items-center justify-between gap-4 pointer-events-auto">

          {/* Logo chip */}
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-full pl-2 pr-4 py-1.5 transition-all duration-300 ${
              scrolled ? "bg-white shadow-md shadow-[#0F2430]/10" : "bg-white/95 backdrop-blur-md shadow-sm"
            }`}
          >
            <ButterflyLogo size={32} />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-[#0F2430] leading-none">WELLNESS</span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#3E5868] font-semibold">GROUP</span>
            </div>
          </Link>

          {/* Desktop pill nav — Contact replaces Careers; no separate CTA button */}
          <nav
            className={`hidden lg:flex items-center gap-1 rounded-full p-1.5 transition-all duration-300 ${
              scrolled ? "bg-white shadow-md shadow-[#0F2430]/10" : "bg-white/95 backdrop-blur-md shadow-sm"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-semibold tracking-wide rounded-full px-4 py-2.5 transition-all duration-300 ${
                    isActive
                      ? "bg-[#0F2430] text-white"
                      : "text-[#0F2430]/70 hover:text-[#0F2430] hover:bg-[#E2E5E8]/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Language toggle — right side on desktop */}
          <div className="hidden lg:flex items-center">
            <button
              className={`flex items-center gap-1.5 text-xs font-semibold text-[#3E5868] hover:text-[#0F2430] py-2.5 px-3.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-white shadow-md shadow-[#0F2430]/10" : "bg-white/95 backdrop-blur-md shadow-sm"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-full text-[#0F2430] transition-all focus:outline-none ${
              scrolled ? "bg-white shadow-md shadow-[#0F2430]/10" : "bg-white/95 backdrop-blur-md shadow-sm"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden pt-28 pb-8 px-6 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="h-px bg-[#E2E5E8]" />
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-bold tracking-wide flex items-center justify-between ${
                          isActive ? "text-[#0F2430]" : "text-[#3E5868] hover:text-[#0F2430]"
                        }`}
                      >
                        {link.name}
                        <ArrowUpRight className="w-5 h-5 opacity-40" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-px bg-[#E2E5E8]" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#3E5868]">Language</span>
                <button className="flex items-center gap-1 text-sm font-bold text-[#0F2430]">
                  <Globe className="w-4 h-4 text-[#3E5868]" />
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
