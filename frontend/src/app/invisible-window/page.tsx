"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { 
  BadgeCheck, 
  Check, 
  Minus, 
  ArrowRight, 
  Eye, 
  Flame, 
  TrendingUp, 
  AlertTriangle,
  Lock,
  Sparkles,
  Sliders,
  Activity,
  Layers,
  Thermometer,
  ExternalLink
} from "lucide-react";

export default function InvisibleWindowHeroPage() {
  const [activeDay, setActiveDay] = useState<number>(5);
  const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Dynamic day metrics calculation
  const getTimelineDetails = (day: number) => {
    if (day <= 4) {
      return {
        stage: "PEAK FRESHNESS",
        stageBadge: "bg-[#D1FAE5] text-[#064E3B] border-[#10B981]/40",
        aeDrift: (0.12 + day * 0.02).toFixed(2),
        rslDays: (6.5 - day * 0.7).toFixed(1),
        confidence: "92%",
        revenueRecoverable: "100%",
        priceInr: 80,
        markdownInr: 80,
        humanSight: "Crisp, firm, vibrant red skin. Appears 100% fresh.",
        auraFreshSight: "Chlorophyll emission nominal (AE drift < 0.20). Cellular membrane intact.",
        action: "Standard Display · Full Price (₹80/kg)",
        actionBadge: "bg-emerald-50 text-[#064E3B] border-emerald-200",
        urgency: "Normal Watch",
      };
    } else if (day <= 7) {
      return {
        stage: "THE INVISIBLE WINDOW",
        stageBadge: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] animate-pulse",
        aeDrift: (0.28 + (day - 4) * 0.12).toFixed(2),
        rslDays: (3.6 - (day - 5) * 0.9).toFixed(1),
        confidence: "84%",
        revenueRecoverable: "100%",
        priceInr: 80,
        markdownInr: 56,
        humanSight: "Still looks completely fresh to naked human eye & floor associates.",
        auraFreshSight: "Sub-visual cellular softening: AE drift 0.42 (2.3× baseline). Chlorophyll decay accelerated.",
        action: "Auto-fired 30% Dynamic Markdown (₹80 → ₹56) + FEFO Re-sort",
        actionBadge: "bg-amber-100 text-amber-900 border-amber-300 font-bold",
        urgency: `${8 - day} days left before visible rot`,
      };
    } else if (day <= 9) {
      return {
        stage: "VISIBLE SPOILAGE",
        stageBadge: "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
        aeDrift: (0.74 + (day - 8) * 0.15).toFixed(2),
        rslDays: "0.4",
        confidence: "95%",
        revenueRecoverable: "15%",
        priceInr: 80,
        markdownInr: 20,
        humanSight: "Visible soft spots, skin wrinkling, discoloration. Shoppers reject produce.",
        auraFreshSight: "Cellular structural collapse. High fungal spore activity. RSL expired.",
        action: "Urgent Feeding India Food Bank Donation or Distress Liquidation",
        actionBadge: "bg-rose-100 text-rose-900 border-rose-300 font-bold",
        urgency: "Commercial Value Lost",
      };
    } else {
      return {
        stage: "COMPLETE LOSS / BIO-WASTE",
        stageBadge: "bg-slate-200 text-slate-800 border-slate-300",
        aeDrift: "1.05",
        rslDays: "0.0",
        confidence: "99%",
        revenueRecoverable: "0%",
        priceInr: 80,
        markdownInr: 0,
        humanSight: "Rot, odor, and mold. Complete write-off.",
        auraFreshSight: "Organic breakdown. 0% salvageable value.",
        action: "Discarded to Landfill / Municipal Composting",
        actionBadge: "bg-slate-100 text-slate-700 border-slate-300",
        urgency: "100% Write-Off",
      };
    }
  };

  const details = getTimelineDetails(activeDay);

  // Calculate sparkline SVG coordinates
  const sparklinePoints = [
    { day: 0, x: 20, y: 34 },
    { day: 1, x: 120, y: 33 },
    { day: 2, x: 220, y: 32 },
    { day: 3, x: 320, y: 31 },
    { day: 4, x: 420, y: 29 },
    { day: 5, x: 520, y: 22 },
    { day: 6, x: 620, y: 16 },
    { day: 7, x: 720, y: 11 },
    { day: 8, x: 820, y: 6 },
    { day: 9, x: 920, y: 4 },
    { day: 10, x: 1020, y: 3 },
  ];

  const currentSparklinePoint = sparklinePoints[activeDay];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#475569] font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* CASE HEADER */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#475569]">
              #AF-CRATE-0481 · Solanum lycopersicum (tomato)
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-semibold">
              Live Interactive Simulator
            </span>
          </div>

          <div className="font-mono text-xs font-bold text-[#059669] tracking-wider text-center">
            72-HOUR INVISIBLE DECAY WINDOW
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
            <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>✓ Calibrated Against ₹100 Macbeth Tile</span>
          </div>
        </div>

        {/* PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto py-2 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#059669] text-xs font-mono font-semibold border border-[#10B981]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Interactive Day 0–10 Scrubbing Workbench</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Decay starts on <span className="text-[#059669]">Day 5</span>. Humans only see it on <span className="text-[#EF4444]">Day 8</span>.
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Click or drag the slider on any day below to inspect the microscopic cellular decay trajectory before visual spoilage occurs.
          </p>
        </div>

        {/* =========================================================================
            MAIN INTERACTIVE TIMELINE WORKBENCH
           ========================================================================= */}
        <div className="max-w-[1100px] mx-auto w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E2E8F0] text-xs font-mono gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#064E3B] font-bold">SOLANUM LYCOPERSICUM DECAY TIMELINE</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#059669] font-semibold">SHELF INVARIANT: 8°C CHILLER</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Selected:</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-900 border border-emerald-300">
                Day {activeDay}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono border ${details.stageBadge}`}>
                {details.stage}
              </span>
            </div>
          </div>

          {/* Dedicated Invisible Window Framing Header (NO OVERLAP) */}
          <div className="relative pt-6">
            
            {/* Visual Header Bracket specifically for Days 5-7 */}
            <div className="flex justify-between items-end mb-2 text-xs">
              <div className="text-slate-500 font-mono text-[11px]">
                Fresh Intake (Days 0–4)
              </div>

              {/* Centered Invisible Window Badge */}
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>INVISIBLE WINDOW · DAYS 5–7 (100% REVENUE RECOVERABLE)</span>
                </div>
                <span className="text-[10px] text-amber-700 font-mono mt-0.5">
                  Sub-visual cellular decay · Optical AE drift detectable · 0% rot visible to humans
                </span>
              </div>

              <div className="text-rose-600 font-mono text-[11px] font-semibold">
                Visible Rot (Days 8–10)
              </div>
            </div>

            {/* Freshness Bar (Clean, Bold, Segmented, Zero Collisions) */}
            <div className="relative h-10 w-full rounded-xl overflow-hidden flex shadow-inner border border-slate-200">
              {/* Day 0-4 Segment (Green) */}
              <div
                style={{ width: `${(5 / 11) * 100}%` }}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full flex items-center justify-center text-xs font-mono font-bold text-white tracking-wider px-2 shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
                onClick={() => setActiveDay(2)}
                title="Click to inspect Fresh Phase (Days 0-4)"
              >
                FRESH TODAY (DAYS 0–4)
              </div>

              {/* Day 5-7 Segment (Amber Invisible Window) */}
              <div
                style={{ width: `${(3 / 11) * 100}%` }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full flex items-center justify-center text-xs font-mono font-bold text-amber-950 tracking-wider px-2 shadow-xs border-x-2 border-dashed border-amber-600 transition-opacity hover:opacity-95 cursor-pointer"
                onClick={() => setActiveDay(5)}
                title="Click to inspect Invisible Window (Days 5-7)"
              >
                INVISIBLE WINDOW (DAYS 5–7)
              </div>

              {/* Day 8-9 Segment (Red Spoilage) */}
              <div
                style={{ width: `${(2 / 11) * 100}%` }}
                className="bg-gradient-to-r from-rose-500 to-rose-600 h-full flex items-center justify-center text-xs font-mono font-bold text-white tracking-wider px-2 shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
                onClick={() => setActiveDay(8)}
                title="Click to inspect Spoilage Phase (Days 8-9)"
              >
                SPOILAGE
              </div>

              {/* Day 10 Segment (Dark Slate Dump) */}
              <div
                style={{ width: `${(1 / 11) * 100}%` }}
                className="bg-gradient-to-r from-slate-600 to-slate-800 h-full flex items-center justify-center text-xs font-mono font-bold text-slate-200 tracking-wider px-1 shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
                onClick={() => setActiveDay(10)}
                title="Click to inspect Total Loss (Day 10)"
              >
                DUMP
              </div>

              {/* Active Scrubber Indicator Needle */}
              <div
                style={{ left: `${(activeDay / 10) * 100}%` }}
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none transition-all duration-150 transform -translate-x-1/2"
              />
            </div>

            {/* Interactive Day Click Pointers & Axis */}
            <div className="flex justify-between items-center text-xs font-mono text-[#475569] mt-3 px-1">
              {days.map((d) => {
                const isSelected = activeDay === d;
                const isInvisibleWindow = d >= 5 && d <= 7;
                return (
                  <button
                    key={d}
                    onClick={() => setActiveDay(d)}
                    className={`flex flex-col items-center group transition-all p-1 rounded-lg ${
                      isSelected
                        ? "bg-[#064E3B] text-white font-bold scale-110 shadow-sm"
                        : isInvisibleWindow
                        ? "text-amber-800 hover:bg-amber-100 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 font-medium"
                    }`}
                  >
                    <div className={`w-1 h-2 rounded-full mb-1 ${
                      isSelected ? "bg-white" : isInvisibleWindow ? "bg-amber-400" : "bg-slate-300"
                    }`} />
                    <span className="text-[11px]">Day {d}</span>
                  </button>
                );
              })}
            </div>

            {/* Smooth Interactive Range Slider */}
            <div className="mt-4 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Drag Slider to Scrub Time:</span>
                </span>
                <span className="font-bold text-[#064E3B]">Current Inspection: Day {activeDay}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={activeDay}
                onChange={(e) => setActiveDay(parseInt(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

          </div>

          {/* =========================================================================
              DYNAMIC SPARKLINE: OPTICAL AE-DRIFT SIGNAL TRAJECTORY
             ========================================================================= */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#475569] gap-2">
              <span className="font-bold flex items-center gap-1.5 text-[#064E3B]">
                <Activity className="w-3.5 h-3.5 text-[#059669]" />
                <span>OPTICAL AE-DRIFT SIGNAL TRAJECTORY</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Day {activeDay} Reading:</span>
                <span className="font-bold font-mono text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ΔE {details.aeDrift}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">Predicted RSL:</span>
                <span className="font-bold font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {details.rslDays} days
                </span>
              </div>
            </div>

            {/* SVG Wave */}
            <div className="h-14 w-full bg-slate-50 rounded-xl p-2 border border-slate-200 relative overflow-hidden">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1040 40" preserveAspectRatio="none">
                {/* Baseline reference line 0.18 */}
                <line x1="0" y1="32" x2="1040" y2="32" stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth="1" />
                
                {/* Spoilage Threshold line 0.70 */}
                <line x1="0" y1="8" x2="1040" y2="8" stroke="#FCA5A5" strokeDasharray="3 3" strokeWidth="1" />

                {/* AE Drift curve */}
                <path
                  d="M 20,34 Q 320,32 520,22 T 820,6 T 1020,3"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Dynamic Tracking Circle for Active Day */}
                {currentSparklinePoint && (
                  <circle
                    cx={currentSparklinePoint.x}
                    cy={currentSparklinePoint.y}
                    r="6"
                    fill="#059669"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="animate-pulse shadow-md"
                  />
                )}
              </svg>

              {/* Reference annotations on SVG */}
              <div className="absolute top-1 right-2 text-[10px] font-mono text-rose-500 font-semibold pointer-events-none">
                Spoilage Threshold (ΔE ≥ 0.70)
              </div>
              <div className="absolute bottom-1 left-2 text-[10px] font-mono text-slate-400 pointer-events-none">
                Baseline (ΔE 0.18)
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            COMPARISON ROW: WHAT AURAFRESH SEES vs WHAT HUMANS SEE (DYNAMIC)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto w-full">
          
          {/* LEFT CARD — WHAT AURAFRESH SEES */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-xs font-bold text-[#059669] tracking-wider uppercase flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#059669]" />
                  <span>AURAFRESH EDGE CAMERA VIEW (DAY {activeDay})</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Confidence: {details.confidence}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 font-medium mb-3">
                {details.auraFreshSight}
              </div>

              <ul className="space-y-2 text-xs text-[#064E3B] font-mono">
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Photometric AE Drift:</span>
                  <span className="font-bold text-[#064E3B]">ΔE {details.aeDrift}</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Remaining Shelf Life:</span>
                  <span className="font-bold text-[#059669]">{details.rslDays} days remaining</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Automated Action Trigger:</span>
                  <span className="font-bold text-amber-800">{details.action}</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs text-slate-500">Recoverable Value:</span>
              <span className="text-base font-bold text-[#059669] font-mono">
                {details.revenueRecoverable} (₹{details.markdownInr}/kg)
              </span>
            </div>
          </div>

          {/* RIGHT CARD — WHAT HUMANS SEE */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-xs font-bold text-slate-600 tracking-wider uppercase flex items-center gap-1.5">
                  <Minus className="w-4 h-4 text-slate-400" />
                  <span>HUMAN NAKED EYE VIEW (DAY {activeDay})</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Floor Staff Observation
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium mb-3">
                {details.humanSight}
              </div>

              <ul className="space-y-2 text-xs text-slate-600 font-mono">
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Visual Detection Status:</span>
                  <span className={`font-bold ${activeDay <= 7 ? "text-emerald-700" : "text-rose-700"}`}>
                    {activeDay <= 7 ? "✓ No visible defects" : "⚠️ Discoloration / softening visible"}
                  </span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Floor Staff Reaction:</span>
                  <span className="text-slate-700">
                    {activeDay <= 7 ? "Leave on shelf at ₹80" : "Forced discard or heavy loss"}
                  </span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Customer Perception:</span>
                  <span className="text-slate-700">
                    {activeDay <= 7 ? "Accepts produce without complaints" : "Complaints & rejection at checkout"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs text-slate-500">Human Timed Recovery:</span>
              <span className={`text-base font-bold font-mono ${activeDay <= 7 ? "text-slate-700" : "text-rose-600"}`}>
                {activeDay <= 7 ? "0% action taken (too early)" : "0% recovery (too late)"}
              </span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM ACT-NOW STATUS STRIP
           ========================================================================= */}
        <div className={`max-w-[1100px] mx-auto w-full p-4 rounded-xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          activeDay >= 5 && activeDay <= 7
            ? "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]"
            : activeDay <= 4
            ? "bg-[#D1FAE5]/60 border-[#A7F3D0] text-[#065F46]"
            : "bg-[#FEE2E2] border-[#FCA5A5] text-[#991B1B]"
        }`}>
          <div className="font-mono text-sm font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping" />
            <span>
              {activeDay >= 5 && activeDay <= 7
                ? `Day ${activeDay} → IN THE INVISIBLE WINDOW: AuraFresh fires 30% markdown (₹80 → ₹56) · ESL auto-updates · ₹640 saved per crate.`
                : activeDay <= 4
                ? `Day ${activeDay} → PRODUCE IS NOMINAL: Full retail pricing active. Respiration rate within baseline bounds.`
                : `Day ${activeDay} → VISUAL SPOILAGE REACHED: Produce cannot sell at full price. Feeding India routing triggered.`}
            </span>
          </div>

          <Link
            href="/actions"
            className="text-xs font-bold underline hover:opacity-80 inline-flex items-center gap-1 flex-shrink-0 font-mono"
          >
            <span>View Active Action Bus →</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
