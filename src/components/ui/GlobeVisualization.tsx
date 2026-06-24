"use client";

import React, { useMemo, useState } from "react";
import { Globe, MapPin } from "lucide-react";
import { GlobeCanvas, type GlobeArc } from "./GlobeCanvas";

interface Hub {
  id: string;
  name: string;
  coords: [number, number]; // [lat, lng]
  role: string;
  details: string;
  impact: string;
}

const hubs: Hub[] = [
  {
    id: "london",
    name: "London (HQ)",
    coords: [51.51, -0.13],
    role: "Global Corporate HQ & Financial Hub",
    details: "Executive leadership, finance, and investment operations.",
    impact: "Directs £12B+ global asset portfolio.",
  },
  {
    id: "newyork",
    name: "New York Office",
    coords: [40.71, -74.01],
    role: "International Trade & Investment relations",
    details: "Corporate relations, hedge-fund & commodity trade negotiations.",
    impact: "Managing $4B in annual export transactions.",
  },
  {
    id: "dubai",
    name: "Dubai Hub",
    coords: [25.2, 55.27],
    role: "Commodities & Logistics Control Center",
    details: "Central hub for mineral trading, shipping logistics, and brokerage.",
    impact: "Controls 35% of Middle East/Africa mineral exports.",
  },
  {
    id: "singapore",
    name: "Singapore",
    coords: [1.36, 103.99],
    role: "Asia-Pacific Arbitrage & Chemicals Trade",
    details: "Regional chemical logistics, trade finance, and technology scaling.",
    impact: "Servicing 14 key East-Asian manufacturing clients.",
  },
  {
    id: "johannesburg",
    name: "Johannesburg Division",
    coords: [-26.2, 28.05],
    role: "Minerals Extraction & Operations Base",
    details: "Mining asset operations, refinery coordination, and CSR compliance.",
    impact: "Over 8,500 local workers engaged in ethical mining operations.",
  },
  {
    id: "santiago",
    name: "Santiago Hub",
    coords: [-33.45, -70.65],
    role: "South America Lithium Operations",
    details: "Lithium brine extraction, initial refining, and export shipping.",
    impact: "Supplying 20% of European battery-grade lithium.",
  },
  {
    id: "perth",
    name: "Perth Office",
    coords: [-31.95, 115.86],
    role: "Australian Operations & Energy Development",
    details: "Renewable energy joint ventures, heavy minerals, and technical audits.",
    impact: "1.2GW clean energy infrastructure projects underway.",
  },
];

const routes: { from: string; to: string }[] = [
  { from: "johannesburg", to: "london" },
  { from: "johannesburg", to: "dubai" },
  { from: "santiago", to: "london" },
  { from: "santiago", to: "newyork" },
  { from: "newyork", to: "london" },
  { from: "london", to: "dubai" },
  { from: "dubai", to: "singapore" },
  { from: "singapore", to: "perth" },
];

export default function GlobeVisualization() {
  const [activeHub, setActiveHub] = useState<Hub>(hubs[0]);

  const markers = useMemo(
    () => hubs.map((hub) => ({ id: hub.id, location: hub.coords, label: hub.name })),
    []
  );

  const arcs = useMemo<GlobeArc[]>(
    () =>
      routes.map((route, idx) => {
        const from = hubs.find((h) => h.id === route.from)!;
        const to = hubs.find((h) => h.id === route.to)!;
        return { id: `${route.from}-${route.to}-${idx}`, from: from.coords, to: to.coords };
      }),
    []
  );

  return (
    <div className="relative glass-panel rounded-3xl p-6 lg:p-10 overflow-hidden shadow-2xl border border-white/5 bg-deep-navy/40">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Glow overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        
        {/* Hub Details Panel */}
        <div className="flex flex-col gap-6 lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-primary-purple/20 border border-primary-purple/30 text-primary-purple">
              <Globe className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white">Global Presence</h3>
              <p className="text-xs text-slate-400">Ethical Supply Chain & Direct Presence</p>
            </div>
          </div>

          <div className="h-px bg-white/10 my-1" />

          {/* Interactive Info Card */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-rich-gold font-bold">Current Hub Highlight</span>
              <h4 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-purple" />
                {activeHub.name}
              </h4>
            </div>

            <div className="space-y-3 mt-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-accent-blue tracking-wider">Operational Role</span>
                <p className="text-sm font-semibold text-slate-200 mt-1">{activeHub.role}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Key Details</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{activeHub.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-emerald-green tracking-wider">Global Footprint / Impact</span>
                <p className="text-sm text-emerald-green font-semibold mt-1 leading-relaxed">{activeHub.impact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Globe Visualization (2/3 width on desktop) */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <GlobeCanvas markers={markers} arcs={arcs} activeMarkerId={activeHub.id} />
          </div>
          <div className="flex gap-4 flex-wrap justify-center mt-6">
            {hubs.map((hub) => {
              const isActive = activeHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 border ${
                    isActive
                      ? "bg-primary-purple/20 border-primary-purple text-white shadow-md shadow-primary-purple/10"
                      : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                  }`}
                >
                  {hub.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
