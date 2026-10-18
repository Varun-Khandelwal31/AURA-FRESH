"use client";

import React from "react";
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
  Sparkles
} from "lucide-react";

export default function InvisibleWindowHeroPage() {
  const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#475569] font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* CASE HEADER */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: small mono crate ID "#AF-CRATE-0481 · Solanum lycopersicum (tomato)" */}
          <div className="font-mono text-xs text-[#475569]">
            #AF-CRATE-0481 · Solanum lycopersicum (tomato)
          </div>

          {/* Center: small green mono eyebrow "INVISIBLE WINDOW · 4 DAYS TO ACT" */}
          <div className="font-mono text-xs font-bold text-[#059669] tracking-wider text-center">
            INVISIBLE WINDOW · 4 DAYS TO ACT
          </div>

          {/* Right: small mint pill "✓ Sensor verified · 14:31 IST" + below it validated pill */}
          <div className="flex flex-col sm:items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
              <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
              <span>✓ Sensor verified · 14:31 IST</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded-full text-[10px] text-[#059669] font-medium font-mono self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>validated via 72-hr multi-temp time-lapse</span>
            </span>
          </div>
        </div>

        {/* PAGE HEADER (centered) */}
        <div className="text-center max-w-3xl mx-auto py-2 space-y-1">
          <h1 className="text-[32px] font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Decay starts on Day 5. Humans see it on Day 8.
          </h1>
          <p className="text-[16px] text-[#475569] leading-relaxed">
            AuraFresh reads the 1-3 day pre-visual window using AE drift + Arrhenius kinetics. 100% of revenue still recoverable on Day 5. 0% on Day 10.
          </p>
        </div>

        {/* DECAY TIMELINE CARD (1100px wide max, 320px tall, white card, soft shadow, 1px hairline, 12px radius) */}
        <div className="max-w-[1100px] mx-auto w-full bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-[0_8px_24px_-8px_rgba(6,78,59,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] text-xs font-mono">
            <span className="text-[#064E3B] font-bold">SOLANUM LYCOPERSICUM DECAY TIMELINE</span>
            <span className="text-[#059669] font-semibold">RETAIL SHELF INVARIANT: 8°C CHILLER</span>
          </div>

          {/* Visual Timeline Section */}
          <div className="relative my-4">
            
            {/* Horizontal Freshness Bar across top, color-coded by day:
                Day 0-4: solid mint #10B981 (100% fresh, "FRESH TODAY")
                Day 5-7: amber #F59E0B (pre-visual decay, "INVISIBLE WINDOW · 4 days to act · 100% ₹ recoverable")
                Day 8-9: alert red #EF4444 (visible spoilage, "0% recoverable")
                Day 10: dark slate (discarded)
            */}
            <div className="h-7 w-full rounded-lg overflow-hidden flex shadow-inner border border-slate-200 volumetric-track">
              {/* Day 0-4 (5 days / 11 ~ 45.45%) */}
              <div
                style={{ width: `${(5 / 11) * 100}%` }}
                className="bg-gradient-to-b from-[#10B981] to-[#059669] h-full flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-wider px-2 shadow-xs"
                title="Day 0-4: 100% fresh, FRESH TODAY"
              >
                FRESH TODAY
              </div>

              {/* Day 5-7 (3 days / 11 ~ 27.27%) */}
              <div
                style={{ width: `${(3 / 11) * 100}%` }}
                className="bg-gradient-to-b from-[#FBBF24] to-[#D97706] h-full flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-wider px-2 shadow-xs"
                title="Day 5-7: Pre-visual decay, INVISIBLE WINDOW"
              >
                INVISIBLE WINDOW · 4 DAYS TO ACT
              </div>

              {/* Day 8-9 (2 days / 11 ~ 18.18%) */}
              <div
                style={{ width: `${(2 / 11) * 100}%` }}
                className="bg-gradient-to-b from-[#F87171] to-[#DC2626] h-full flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-wider px-2 shadow-xs"
                title="Day 8-9: Visible spoilage, 0% recoverable"
              >
                SPOILAGE
              </div>

              {/* Day 10 (1 day / 11 ~ 9.09%) */}
              <div
                style={{ width: `${(1 / 11) * 100}%` }}
                className="bg-gradient-to-b from-[#475569] to-[#1E293B] h-full flex items-center justify-center text-[10px] font-mono font-bold text-white tracking-wider px-1 shadow-xs"
                title="Day 10: Discarded"
              >
                DUMP
              </div>
            </div>

            {/* X-axis: Day 0 to Day 10 marked at every day in mono slate */}
            <div className="flex justify-between text-[11px] font-mono text-[#475569] mt-2.5 px-1 font-medium">
              {days.map((d) => (
                <div key={d} className="flex flex-col items-center">
                  <div className="w-[1px] h-2 bg-[#CBD5E1]" />
                  <span className="mt-0.5">Day {d}</span>
                </div>
              ))}
            </div>

            {/* Invisible Window (Day 5-7) Highlight Overlay & Label */}
            <div
              style={{
                left: `${(5 / 11) * 100}%`,
                width: `${(3 / 11) * 100}%`,
              }}
              className="absolute -top-3 bottom-0 bg-[#F59E0B]/15 border-2 border-dashed border-[#F59E0B] rounded-xl pointer-events-none p-2.5 flex flex-col justify-end backdrop-blur-[1px] shadow-sm"
            >
              <div className="text-center font-serif text-[#B45309] text-[15px] sm:text-[18px] font-bold leading-tight">
                INVISIBLE WINDOW
              </div>
              <div className="text-center text-[10px] sm:text-[11px] font-mono text-[#78350F] leading-tight mt-0.5 font-medium">
                Pre-visual decay emits AE 1-3 shifts — invisible to humans, readable by calibrated camera.
              </div>
            </div>

            {/* Marker Pin 1: "AuraFresh detects · Day 5" — vertical mint line with 3D-feel mint sphere pin at top */}
            <div
              style={{ left: `${(5 / 11) * 100}%` }}
              className="absolute -top-9 bottom-[-45px] pointer-events-none flex flex-col items-center z-20"
            >
              <div className="sphere-pin-fresh" />
              <div className="w-[2px] h-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
              <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#10B981] shadow-md text-center whitespace-nowrap mt-1">
                <span className="text-[11px] font-mono font-bold text-[#064E3B]">
                  AuraFresh detects · Day 5
                </span>
              </div>
            </div>

            {/* Marker Pin 2: "Humans can see · Day 8" — vertical red line with 3D-feel red sphere pin at top */}
            <div
              style={{ left: `${(8 / 11) * 100}%` }}
              className="absolute -top-9 bottom-[-45px] pointer-events-none flex flex-col items-center z-20"
            >
              <div className="sphere-pin-spoilage" />
              <div className="w-[2px] h-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" />
              <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#EF4444] shadow-md text-center whitespace-nowrap mt-1">
                <span className="text-[11px] font-mono font-bold text-[#991B1B]">
                  Humans can see · Day 8
                </span>
              </div>
            </div>

          </div>

          {/* Below freshness bar: AE-drift sparkline showing signal rising through invisible window */}
          <div className="mt-12 pt-3 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#475569] mb-1">
              <span>OPTICAL AE-DRIFT SIGNAL TRAJECTORY</span>
              <span className="text-[#F59E0B] font-bold">
                0.18 Baseline → 0.42 Measured at Day 5 → Spoilage Peak at Day 8+
              </span>
            </div>

            <div className="h-10 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1100 40">
                {/* Baseline reference line 0.18 */}
                <line x1="0" y1="32" x2="1100" y2="32" stroke="#E2E8F0" strokeDasharray="4 4" />
                {/* AE Drift curve */}
                <path
                  d="M0,32 L400,31 Q500,28 550,20 Q650,14 800,6 T1100,2"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Day 5 Marker dot on curve */}
                <circle cx="500" cy="24" r="4" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
                {/* Day 8 Marker dot on curve */}
                <circle cx="800" cy="6" r="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
          </div>

        </div>

        {/* COMPARISON ROW — Two side-by-side cards (each white, soft shadow, 1px hairline, 8px radius, equal width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto w-full">
          
          {/* LEFT CARD — "WHAT WE SEE" */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm flex flex-col justify-between">
            <div>
              {/* Small mono mint eyebrow "AURAFRESH · INVISIBLE WINDOW" */}
              <div className="font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase mb-3">
                AURAFRESH · INVISIBLE WINDOW
              </div>

              {/* Bullet list (each with mint check icon) */}
              <ul className="space-y-2 text-xs text-[#064E3B]">
                <li className="flex items-center gap-2">
                  <Check strokeWidth={2.5} className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>AE drift 0.42 (2.3× above baseline)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check strokeWidth={2.5} className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Temperature history: 8°C avg (slight chiller warm)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check strokeWidth={2.5} className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Predicted RSL: 3.2 ± 0.8 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check strokeWidth={2.5} className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>Confidence: 78% — auto-fire eligible</span>
                </li>
              </ul>
            </div>

            {/* Bottom: "100% of ₹ recoverable" in mint semibold 14px */}
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[14px] font-semibold text-[#10B981] font-mono">
              100% of ₹ recoverable
            </div>
          </div>

          {/* RIGHT CARD — "WHAT HUMANS SEE" */}
          <div className="p-5 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm flex flex-col justify-between">
            <div>
              {/* Small mono slate eyebrow "HUMAN EYE · DAY 8+" */}
              <div className="font-mono text-xs font-bold text-[#475569] tracking-wider uppercase mb-3">
                HUMAN EYE · DAY 8+
              </div>

              {/* Bullet list (each with slate dash icon) */}
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-center gap-2">
                  <Minus strokeWidth={2.5} className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  <span>Visible softening / discoloration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Minus strokeWidth={2.5} className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  <span>Customer complaints beginning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Minus strokeWidth={2.5} className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  <span>Forced markdown 50%+ or discard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Minus strokeWidth={2.5} className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
                  <span>Often too late for donation ladder</span>
                </li>
              </ul>
            </div>

            {/* Bottom: "0% of ₹ recoverable" in red semibold 14px */}
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[14px] font-semibold text-[#EF4444] font-mono">
              0% of ₹ recoverable
            </div>
          </div>

        </div>

        {/* ACT NOW CALLOUT (bottom strip, amber tint #FEF3C7 background, 8px radius) */}
        <div className="max-w-[1100px] mx-auto w-full p-4 rounded-[8px] bg-[#FEF3C7] border border-[#FDE68A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-[14px] text-[#B45309] font-medium">
            Day 5 → AuraFresh fires 30% markdown · ESL auto-update · ₹640 recovered on this crate.
          </div>

          <Link
            href="/actions"
            className="text-xs font-semibold text-[#059669] hover:underline inline-flex items-center gap-1 flex-shrink-0"
          >
            <span>→ See it in the Action Center</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
