"use client";

import React from "react";
import { Crate } from "../lib/types";
import { 
  Clock, 
  Flame, 
  BadgeCheck, 
  AlertTriangle, 
  Radio, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface CrateSelectorProps {
  crates: Crate[];
  selectedCrateCode: string;
  onSelectCrate: (code: string) => void;
}

export const CrateSelector: React.FC<CrateSelectorProps> = ({
  crates,
  selectedCrateCode,
  onSelectCrate,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
            Active Fresh-Aisle Crate Ledger
          </h2>
        </div>
        <span className="text-xs font-mono text-[#475569]">
          {crates.length} Crates Monitored • Edge Optical Stream
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {crates.map((c) => {
          const isSelected = c.crate_code === selectedCrateCode;
          const isAutoFired = c.confidence >= 0.70;
          const isReviewRequired = c.confidence >= 0.50 && c.confidence < 0.70;

          // Freshness grade rubber-stamp mapping
          const gradeInfo = {
            tomato: { letter: "A", stampClass: "stamp-grade-a", badge: "Grade A" },
            spinach: { letter: "A+", stampClass: "stamp-grade-a", badge: "Grade A+" },
            banana: { letter: "B", stampClass: "stamp-grade-b", badge: "Grade B" },
          }[c.commodity] || { letter: "A", stampClass: "stamp-grade-a", badge: "Grade A" };

          return (
            <button
              key={c.crate_code}
              onClick={() => onSelectCrate(c.crate_code)}
              className={`text-left p-4 aurafresh-card transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? "ring-2 ring-[#059669] bg-[#F8FAFC]"
                  : "hover:border-[#CBD5E1]"
              }`}
            >
              {/* Highlight top stripe if selected */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#059669]" />
              )}

              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30 uppercase font-mono">
                    {c.commodity}
                  </span>
                  <div className="text-sm font-bold text-[#064E3B] font-mono mt-1">
                    {c.crate_code}
                  </div>
                </div>

                {/* Freshness grade rubber stamp */}
                <div className="text-right">
                  <div className={`text-2xl font-bold font-serif ${gradeInfo.stampClass} leading-none`}>
                    {gradeInfo.letter}
                  </div>
                  <div className="text-[9px] font-mono font-semibold text-[#475569] uppercase mt-0.5">
                    {gradeInfo.badge}
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#475569] line-clamp-1 mb-3">
                {c.variety} • {c.aisle_location}
              </div>

              {/* Status Badge */}
              <div className="mb-3">
                {isAutoFired ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                    <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Auto-Fired ({(c.confidence * 100).toFixed(0)}%)</span>
                  </span>
                ) : isReviewRequired ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-[#F59E0B] border border-amber-200">
                    <AlertTriangle strokeWidth={1.5} className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Review Required ({(c.confidence * 100).toFixed(0)}%)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] text-[#475569] bg-[#F1F5F9]">
                    Nominal
                  </span>
                )}
              </div>

              {/* Metric Quick Stats in JetBrains Mono */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0] text-xs">
                <div>
                  <div className="text-[10px] text-[#475569] flex items-center gap-1">
                    <Clock strokeWidth={1.5} className="w-3 h-3 text-[#059669]" />
                    <span>RSL Remaining</span>
                  </div>
                  <div className="font-bold text-[#064E3B] font-mono mt-0.5">
                    {(c.predicted_rsl_hours / 24.0).toFixed(1)} <span className="text-[10px] font-normal text-[#475569]">days</span>
                    <span className="text-[10px] text-[#475569] ml-1">({c.predicted_rsl_hours.toFixed(0)}h)</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#475569] flex items-center gap-1">
                    <Flame strokeWidth={1.5} className="w-3 h-3 text-[#F59E0B]" />
                    <span>AE Drift</span>
                  </div>
                  <div className="font-bold text-[#F59E0B] font-mono mt-0.5">
                    +{c.ae_drift_pct.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-[#E2E8F0]">
                <span className="text-[#475569]">
                  ESL: <span className="text-[#064E3B] font-mono font-semibold">₹{c.current_price_inr}</span>
                  {c.markdown_price_inr < c.current_price_inr && (
                    <span className="text-[#059669] font-mono font-bold ml-1">→ ₹{c.markdown_price_inr}</span>
                  )}
                </span>
                <span className="flex items-center gap-0.5 font-medium text-[#059669] group-hover:translate-x-0.5 transition-transform">
                  Inspect <ArrowRight strokeWidth={1.5} className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
