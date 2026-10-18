"use client";

import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { 
  Sliders, 
  Thermometer, 
  Zap, 
  RotateCcw, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  Check,
  Activity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface CommodityConfig {
  name: string;
  latin: string;
  baseRslDays: number;
  nominalTempC: number;
  q10: number;
  originalPrice: number;
  crateWeightKg: number;
  thumb: string;
}

const COMMODITIES: Record<string, CommodityConfig> = {
  tomato: {
    name: "Roma Tomatoes",
    latin: "Solanum lycopersicum",
    baseRslDays: 7.0,
    nominalTempC: 8.0,
    q10: 2.4,
    originalPrice: 80,
    crateWeightKg: 12,
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
  spinach: {
    name: "Indian Palak",
    latin: "Spinacia oleracea",
    baseRslDays: 3.5,
    nominalTempC: 4.0,
    q10: 2.8,
    originalPrice: 40,
    crateWeightKg: 8,
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80",
  },
  banana: {
    name: "Robusta Banana",
    latin: "Musa acuminata",
    baseRslDays: 5.0,
    nominalTempC: 13.0,
    q10: 2.1,
    originalPrice: 60,
    crateWeightKg: 18,
    thumb: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=200&q=80",
  },
  mango: {
    name: "Alphonso Mango",
    latin: "Mangifera indica",
    baseRslDays: 6.0,
    nominalTempC: 10.0,
    q10: 2.5,
    originalPrice: 220,
    crateWeightKg: 10,
    thumb: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80",
  },
};

export const LiveSimulatorSection: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("tomato");
  const [temperature, setTemperature] = useState<number>(8.0);
  const [driftFactor, setDriftFactor] = useState<number>(0.42);
  const [eslFired, setEslFired] = useState<boolean>(false);

  const commodity = COMMODITIES[selectedKey];

  // Dynamic Arrhenius kinetic calculations
  const simulation = useMemo(() => {
    const deltaT = temperature - commodity.nominalTempC;
    // Arrhenius temperature multiplier
    const rateMultiplier = Math.pow(commodity.q10, deltaT / 10.0);
    
    // Effective RSL after accounting for drift and temperature
    const effectiveRslDays = Math.max(
      0.4,
      Number(((commodity.baseRslDays / rateMultiplier) * (1.0 - driftFactor * 0.7)).toFixed(1))
    );

    // Confidence model based on drift consistency & thermal stability
    const confidence = Math.min(
      94,
      Math.max(52, Math.round(82 - Math.abs(deltaT) * 1.8 + (1.0 - driftFactor) * 10))
    );

    // Markdown & value saved calculation
    const markdownPercent = effectiveRslDays <= 3.5 ? 30 : 0;
    const discountedPrice = Math.round(commodity.originalPrice * (1 - markdownPercent / 100));
    const potentialWasteValue = commodity.originalPrice * commodity.crateWeightKg;
    const recoveredRupees = markdownPercent > 0 
      ? Math.round(potentialWasteValue * 0.7) 
      : potentialWasteValue;

    // Action recommendation
    let action = "Standard Display";
    let actionType = "monitor";
    if (effectiveRslDays < 1.5) {
      action = "Urgent Feeding India Donation Route";
      actionType = "donate";
    } else if (effectiveRslDays <= 3.5 && confidence >= 70) {
      action = `${markdownPercent}% ESL Markdown · Auto-fired`;
      actionType = "markdown";
    } else if (effectiveRslDays <= 3.5) {
      action = "FEFO Re-sort · Store Manager Review";
      actionType = "resort";
    }

    return {
      rateMultiplier: rateMultiplier.toFixed(2),
      effectiveRslDays,
      confidence,
      markdownPercent,
      discountedPrice,
      recoveredRupees,
      action,
      actionType,
    };
  }, [commodity, temperature, driftFactor]);

  const handleFireEsl = () => {
    setEslFired(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10B981", "#059669", "#F59E0B"],
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setEslFired(false), 2500);
  };

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0]/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E2E8F0] shadow-xs">
          <Activity className="w-3.5 h-3.5 text-[#059669]" />
          <span className="font-mono text-xs font-semibold text-[#059669] tracking-wide uppercase">
            Live Interactive Simulator
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#064E3B] tracking-tight">
          Test real kinetics live right now
        </h2>

        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
          Switch produce, turn the chiller temperature dial, and see Arrhenius equations and autonomous actions compute live.
        </p>
      </div>

      {/* Main Interactive Workbench */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle Top Gradient Edge */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#059669] via-[#10B981] to-[#F59E0B]" />

        {/* 1. Commodity Selector Tabs */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold text-[#475569] uppercase mb-3 flex items-center justify-between">
            <span>Select Produce Crate</span>
            <span className="text-[#059669] font-normal">Active in DMart BLR-014 Aisle</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(COMMODITIES).map(([k, c]) => (
              <button
                key={k}
                onClick={() => {
                  setSelectedKey(k);
                  setTemperature(c.nominalTempC);
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  selectedKey === k
                    ? "bg-[#D1FAE5]/60 border-[#10B981] shadow-md ring-2 ring-[#10B981]/20"
                    : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-slate-100"
                }`}
              >
                <img
                  src={c.thumb}
                  alt={c.name}
                  className="w-10 h-10 rounded-lg object-cover shadow-xs"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#064E3B] truncate">{c.name}</div>
                  <div className="text-[10px] text-[#475569] italic truncate">{c.latin}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Controls & Real-Time Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0]">
            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#064E3B] font-bold">
                  <Thermometer className="w-4 h-4 text-[#059669]" />
                  <span>CHILLER TEMPERATURE:</span>
                </span>
                <span className="text-base font-bold font-mono text-[#064E3B]">
                  {temperature.toFixed(1)}°C
                </span>
              </div>

              <input
                type="range"
                min="2.0"
                max="18.0"
                step="0.5"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#059669]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>2°C (Deep cold)</span>
                <span className="text-[#059669] font-bold">{commodity.nominalTempC}°C (Target)</span>
                <span className="text-[#EF4444] font-bold">18°C (Thermal excursion)</span>
              </div>
            </div>

            {/* AE Drift Slider */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#064E3B] font-bold">
                  OPTICAL AE DRIFT (CV GABOR):
                </span>
                <span className="text-sm font-bold font-mono text-[#059669]">
                  {driftFactor.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0.10"
                max="0.90"
                step="0.02"
                value={driftFactor}
                onChange={(e) => setDriftFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>0.10 (Baseline)</span>
                <span className="text-[#F59E0B] font-bold">0.42 (Pre-visual window)</span>
                <span>0.90 (Visible decay)</span>
              </div>
            </div>

            {/* Live Formula Display */}
            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-[11px] font-mono text-[#475569] space-y-1">
              <div className="font-bold text-[#064E3B]">Arrhenius Equation:</div>
              <div>k(T) = k₀ · (Q₁₀)^((T - T₀)/10)</div>
              <div className="text-[#059669] font-semibold pt-1">
                Degradation Multiplier: {simulation.rateMultiplier}x baseline
              </div>
            </div>
          </div>

          {/* Results & Live Action Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Primary KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="text-[11px] font-mono text-[#475569]">Predicted RSL</div>
                <div className="text-2xl font-black font-mono text-[#064E3B] mt-1">
                  {simulation.effectiveRslDays} days
                </div>
                <div className="text-[10px] text-[#059669] font-medium mt-0.5">
                  {(simulation.effectiveRslDays * 24).toFixed(0)} hours remaining
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="text-[11px] font-mono text-[#475569]">AI Confidence</div>
                <div className="text-2xl font-black font-mono text-[#10B981] mt-1">
                  {simulation.confidence}%
                </div>
                <div className="text-[10px] text-[#475569] font-medium mt-0.5">
                  {simulation.confidence >= 70 ? "✓ Auto-fire eligible" : "Needs review"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono text-[#475569]">Value Recovered</div>
                <div className="text-2xl font-black font-mono text-[#059669] mt-1">
                  ₹{simulation.recoveredRupees}
                </div>
                <div className="text-[10px] text-[#475569] font-medium mt-0.5">
                  per {commodity.crateWeightKg}kg crate
                </div>
              </div>
            </div>

            {/* Simulated Live Action & ESL Hardware Box */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#10B981] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#064E3B]">
                    AUTONOMOUS ACTION GATE (≥70% CONFIDENCE)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                  REAL-TIME
                </span>
              </div>

              {/* Action Description */}
              <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#94A3B8] font-mono">RECOMMENDED ACTION:</div>
                  <div className="text-sm font-bold text-[#064E3B] font-mono">
                    {simulation.action}
                  </div>
                </div>

                {simulation.markdownPercent > 0 && (
                  <div className="text-right">
                    <span className="text-xs line-through text-[#94A3B8] mr-2">
                      ₹{commodity.originalPrice}
                    </span>
                    <span className="text-xl font-black font-mono text-[#10B981]">
                      ₹{simulation.discountedPrice}
                    </span>
                    <span className="text-xs text-[#475569]">/kg</span>
                  </div>
                )}
              </div>

              {/* Action Trigger Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  onClick={handleFireEsl}
                  disabled={eslFired}
                  className="btn-3d-green text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 active:scale-95 transition-all shadow-md"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{eslFired ? "Dispatched to Zigbee ESL!" : "Simulate Live ESL Action Trigger"}</span>
                </button>

                <Link
                  href="/actions"
                  className="text-xs font-semibold text-[#059669] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Action Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
