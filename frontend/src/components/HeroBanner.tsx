"use client";

import React, { useState } from "react";
import { 
  BadgeCheck, 
  Lock, 
  RotateCw, 
  TrendingUp, 
  IndianRupee, 
  Scale, 
  FileCheck,
  ArrowUpRight,
  Sparkles,
  Layers,
  Thermometer
} from "lucide-react";

interface HeroBannerProps {
  totalRecoveredInr: number;
  totalDivertedKg: number;
  onReRunPrediction?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalRecoveredInr,
  totalDivertedKg,
  onReRunPrediction,
}) => {
  const [isRerunning, setIsRerunning] = useState(false);

  const handleRerun = () => {
    setIsRerunning(true);
    if (onReRunPrediction) onReRunPrediction();
    setTimeout(() => setIsRerunning(false), 900);
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 bg-[#0B1220] border-b border-[#E2E8F0]">
      {/* Subtle background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#059669]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/10 w-96 h-96 bg-[#10B981]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Headline & Core Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Closed-Loop Fresh-Aisle Intelligence</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Cameras Stores Already Own + ₹100 Tile</span>
            </div>

            {/* LOCKED TAGLINE VERBATIM ON H1 (Never paraphrased, IBM Plex Serif) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight !text-white text-white leading-[1.15] font-serif">
              Freshness has an invisible window. <span className="text-[#10B981] italic">We watch it.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              Stores lose ₹1–1.7 crore per year in avoidable fresh-aisle shrinkage. AuraFresh reads optical Auto-Exposure (AE) drift per crate calibrated against a ₹100 reference tile, fuses it with temperature history via Arrhenius kinetics, and auto-fires closed-loop markdown and FEFO re-sort actions above 70% confidence.
            </p>

            {/* Financial and ESG Outcomes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] text-slate-400 font-medium">Store Recovery</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                  ₹1.0–1.7 <span className="text-xs text-[#10B981]">Cr</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">per store / year</div>
              </div>

              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] text-slate-400 font-medium">Today's Value</div>
                <div className="text-xl sm:text-2xl font-bold text-[#10B981] font-mono mt-0.5">
                  ₹{(totalRecoveredInr > 0 ? totalRecoveredInr : 1004).toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Recovered via ESL</div>
              </div>

              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] text-slate-400 font-medium">Waste Diverted</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                  {(totalDivertedKg > 0 ? totalDivertedKg : 55.0).toFixed(1)} <span className="text-xs text-[#10B981]">kg</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">48.6 t annualized</div>
              </div>

              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-[11px] text-slate-400 font-medium">ESG Auto-Report</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono mt-0.5">
                  94.2%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">BRSR • UN SDG 12.3</div>
              </div>
            </div>
          </div>

          {/* Right: THE 3D FLOATING FRESHNESS CARD (5 cols) — ONLY ON HERO SCREEN */}
          <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
            <div className="w-full max-w-md bg-white rounded-lg p-5 border border-[#E2E8F0] hero-freshness-3d-card relative text-[#475569]">
              
              {/* Mandatory 1: Top-left crate ID in mono (#AF-CRATE-0481) */}
              {/* Mandatory 2: Top-right mint pill (✓ Sensor verified · 14:31 IST with CheckBadge) */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <span className="font-mono text-xs font-semibold text-[#475569] tracking-wider">
                  #AF-CRATE-0481
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                  <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
                  <span>✓ Sensor verified · 14:31 IST</span>
                </span>
              </div>

              {/* Mandatory 3: Live affordance pulse pill & Re-run prediction button */}
              <div className="flex items-center justify-between my-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#059669] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>verified just now</span>
                </span>
                <button
                  onClick={handleRerun}
                  disabled={isRerunning}
                  className="inline-flex items-center gap-1 text-[11px] text-[#475569] hover:text-[#064E3B] px-2 py-1 rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                >
                  <RotateCw strokeWidth={1.5} className={`w-3 h-3 ${isRerunning ? "animate-spin text-[#059669]" : ""}`} />
                  <span>Re-run prediction</span>
                </button>
              </div>

              {/* Produce Identity & Freshness Stamp */}
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mt-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-[#059669] font-semibold uppercase">
                      Tomato • Bay 3 Rack B2
                    </div>
                    <h3 className="text-base font-bold text-[#064E3B] mt-0.5">
                      Roma Hybrid (Grade A)
                    </h3>
                    <div className="text-xs text-[#475569] mt-0.5">
                      Batch LOT-2026-BLR-882 • 22 kg
                    </div>
                  </div>

                  {/* Freshness Grade Letter with rubber-stamp feel */}
                  <div className="text-center px-3 py-1 rounded bg-[#D1FAE5] border border-[#10B981]/40">
                    <div className="text-3xl font-bold font-serif stamp-grade-a leading-none">
                      A+
                    </div>
                    <div className="text-[9px] font-mono font-bold text-[#064E3B] uppercase mt-0.5">
                      Grade
                    </div>
                  </div>
                </div>

                {/* Quantitative Measurement Metrics (JetBrains Mono) */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#E2E8F0] text-center">
                  <div>
                    <div className="text-[10px] text-[#475569]">RSL Days</div>
                    <div className="text-base font-bold text-[#064E3B] font-mono mt-0.5">
                      1.1 <span className="text-[10px] font-normal text-[#475569]">days</span>
                    </div>
                    <div className="text-[9px] font-mono text-rose-500 font-semibold">(26.4 hrs)</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#475569]">AE Drift</div>
                    <div className="text-base font-bold text-[#F59E0B] font-mono mt-0.5">
                      +14.8%
                    </div>
                    <div className="text-[9px] font-mono text-[#475569]">Pre-visual</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#475569]">Confidence</div>
                    <div className="text-base font-bold text-[#10B981] font-mono mt-0.5">
                      88.0%
                    </div>
                    <div className="text-[9px] font-mono text-[#059669] font-bold">AUTO-FIRE</div>
                  </div>
                </div>

                {/* Arrhenius Temperature History Sensor Tag */}
                <div className="mt-3 p-2 rounded bg-white border border-[#E2E8F0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#475569]">
                    <Thermometer strokeWidth={1.5} className="w-3.5 h-3.5 text-rose-500" />
                    <span>Avg Temp: <strong className="font-mono text-[#064E3B]">21.4°C</strong> (Target: 13°C)</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#EF4444] font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
                    Thermal Excursion
                  </span>
                </div>
              </div>

              {/* Action Trigger Preview Bar */}
              <div className="mt-3 p-2.5 rounded-lg bg-[#D1FAE5]/60 border border-[#10B981]/30 flex items-center justify-between text-xs">
                <span className="text-[#064E3B] font-medium">
                  ESL Markdown Action Fired:
                </span>
                <span className="font-mono font-bold text-[#064E3B]">
                  ₹48 → ₹32/kg <span className="text-[#059669]">(-33%)</span>
                </span>
              </div>

              {/* Mandatory 4: Privacy footer in 11px mono slate */}
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#475569]">
                <Lock strokeWidth={1.5} className="w-3 h-3 text-[#475569]" />
                <span>only numbers leave · no video · no faces</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
