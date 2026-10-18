"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Flame, AlertTriangle, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const InvisibleWindow3DSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(5);

  const getDayInfo = (day: number) => {
    if (day <= 4) {
      return {
        stage: "FRESH TODAY",
        stageColor: "text-[#10B981]",
        badgeBg: "bg-[#D1FAE5] text-[#064E3B] border-[#10B981]/30",
        humanView: "Crisp, vibrant green-to-red skin. Zero signs of decay.",
        auraFreshView: "Chlorophyll emission baseline: AE drift 0.12 - 0.18 (Normal).",
        recoverableRevenue: "100%",
        recommendedAction: "Standard display · Regular retail pricing (₹80/kg)",
        decayPct: day * 6,
        glowColor: "from-[#10B981]/30",
        glowBorder: "border-[#10B981]/50",
      };
    } else if (day <= 7) {
      return {
        stage: "THE INVISIBLE WINDOW",
        stageColor: "text-[#F59E0B]",
        badgeBg: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
        humanView: "Appears completely fresh to shoppers & store associates.",
        auraFreshView: "Micro-texture & chlorophyll degradation detected: AE drift 0.42 (2.3x baseline).",
        recoverableRevenue: "100% (4 days left to act)",
        recommendedAction: "Auto-fired 30% markdown (₹80 → ₹56) + FEFO front-shelf re-sort",
        decayPct: 35 + (day - 5) * 12,
        glowColor: "from-[#F59E0B]/35",
        glowBorder: "border-[#F59E0B]/70",
      };
    } else if (day <= 9) {
      return {
        stage: "VISIBLE SPOILAGE",
        stageColor: "text-[#EF4444]",
        badgeBg: "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
        humanView: "Soft spots, skin wrinkling, discoloration visible to naked eye.",
        auraFreshView: "Cellular collapse: AE drift > 0.85. Shelf viability expired.",
        recoverableRevenue: "0% - 20% (Forced distress sale or discard)",
        recommendedAction: "Urgent Feeding India donation routing or bio-waste diversion",
        decayPct: 75 + (day - 8) * 12,
        glowColor: "from-[#EF4444]/35",
        glowBorder: "border-[#EF4444]/70",
      };
    } else {
      return {
        stage: "TOTAL LOSS / DUMP",
        stageColor: "text-slate-500",
        badgeBg: "bg-slate-100 text-slate-700 border-slate-300",
        humanView: "Severe rot and mold. Complete write-off.",
        auraFreshView: "Zero recovery potential.",
        recoverableRevenue: "0%",
        recommendedAction: "Discarded to municipal landfill (generates methane)",
        decayPct: 100,
        glowColor: "from-slate-400/20",
        glowBorder: "border-slate-400",
      };
    }
  };

  const info = getDayInfo(selectedDay);

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E2E8F0] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
          <span className="font-mono text-xs font-semibold text-[#059669] tracking-wide uppercase">
            3D Interactive Decay Anatomy
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#064E3B] tracking-tight leading-tight">
          Decay starts on <span className="text-[#059669]">Day 5</span>.<br />
          Humans only see it on <span className="text-[#EF4444]">Day 8</span>.
        </h2>

        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
          Move the 3D timeline slider below to reveal what happens beneath the surface during the invisible 72-hour window.
        </p>
      </div>

      {/* 3D Perspective Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT 7 cols: 3D Visual Shelf & Interactive Timeline Slider */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3D Shelf Stage Card */}
          <div
            className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-[0_20px_50px_-12px_rgba(6,78,59,0.12)] relative overflow-hidden transition-all duration-300"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient Back Glow that changes with day */}
            <div
              className={`absolute -top-10 -right-10 w-64 h-64 rounded-full bg-gradient-to-br ${info.glowColor} to-transparent blur-[60px] pointer-events-none transition-colors duration-500`}
            />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] text-xs font-mono">
              <span className="text-[#064E3B] font-bold">RETAIL SHELF VIEW · ROMA TOMATOES</span>
              <span className="text-[#059669] font-medium">CAM-04 OPTICAL FEED</span>
            </div>

            {/* Simulated 3D Shelf Object */}
            <div className="my-6 relative py-4 flex items-center justify-center">
              <motion.div
                key={selectedDay}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative w-72 sm:w-80 aspect-square rounded-2xl p-4 bg-gradient-to-b from-white to-slate-50 border-2 ${info.glowBorder} shadow-xl flex flex-col items-center justify-between transition-colors duration-500`}
                style={{
                  transform: "perspective(800px) rotateX(12deg) rotateY(-6deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Produce Image with dynamic filter */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
                    alt="Produce Shelf State"
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      filter: `saturate(${Math.max(0.4, 1.1 - selectedDay * 0.08)}) contrast(${1 + selectedDay * 0.03}) brightness(${Math.max(0.7, 1 - selectedDay * 0.04)})`,
                    }}
                  />

                  {/* Optical HUD Scanline */}
                  <div className="optical-scanline" />

                  {/* Heatmap overlay on Day 5-7 */}
                  {selectedDay >= 5 && selectedDay <= 7 && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F59E0B]/35 via-transparent to-[#10B981]/25 pointer-events-none mix-blend-overlay animate-pulse" />
                  )}

                  <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300">
                    Day {selectedDay} in Chiller
                  </div>
                </div>

                {/* Tactical Status Pill */}
                <div className="w-full pt-3 flex items-center justify-between text-xs font-mono">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${info.badgeBg}`}>
                    {info.stage}
                  </span>
                  <span className="font-bold text-[#064E3B]">
                    {info.recoverableRevenue} ₹ Saved
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Interactive Day Slider (Day 0 to Day 10) */}
            <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#475569] font-medium">SLIDE TO TEST TIMELINE:</span>
                <span className="text-base font-bold text-[#059669]">Day {selectedDay} / 10</span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#059669]"
              />

              {/* Day Markers */}
              <div className="flex justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>Day 0</span>
                <span className="text-[#10B981] font-bold">Day 4</span>
                <span className="text-[#F59E0B] font-bold">Day 5 (Window)</span>
                <span className="text-[#EF4444] font-bold">Day 8 (Spoil)</span>
                <span>Day 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 cols: Live Dual-Vision Comparison */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card: Naked Human Eye */}
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#475569]">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>WHAT THE HUMAN EYE SEES</span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed font-sans">
              {info.humanView}
            </p>
          </div>

          {/* Card: AuraFresh Edge Camera + Kinetics */}
          <div className="rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#D1FAE5]/30 border-2 border-[#10B981]/40 p-5 shadow-md space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#064E3B]">
              <Sparkles className="w-4 h-4 text-[#059669]" />
              <span>WHAT AURAFRESH DETECTS</span>
            </div>
            <p className="text-sm font-semibold text-[#064E3B] leading-relaxed font-sans">
              {info.auraFreshView}
            </p>
          </div>

          {/* Card: Automated Action Triggered */}
          <div className="rounded-xl bg-white border border-[#E2E8F0] p-5 shadow-sm space-y-2">
            <div className="text-xs font-mono font-bold text-[#059669]">
              RECOMMENDED CLOSED-LOOP ACTION
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#064E3B] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
              {info.recommendedAction}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/invisible-window"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#059669] hover:text-[#047857] group"
            >
              <span>Explore full 72-hour Arrhenius timeline</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
