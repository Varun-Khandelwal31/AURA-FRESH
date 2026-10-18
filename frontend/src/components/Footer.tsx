"use client";

import React from "react";
import { Eye, ShieldCheck, Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-white py-12 mt-16 text-xs text-[#475569]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Secondary Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-[#D1FAE5] flex items-center justify-center">
                <Eye strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
              </div>
              <span className="font-bold text-[#064E3B] text-sm tracking-tight">
                Aura<span className="text-[#059669]">Fresh</span>
              </span>
              <span className="text-[10px] text-[#475569] font-mono">v2.4-edge</span>
            </div>
            {/* VERBATIM SECONDARY TAGLINE AS REQUIRED IN BRIEF */}
            <p className="text-sm font-semibold text-[#064E3B] tracking-wide font-sans">
              "Not another dashboard. Confidence + action."
            </p>
            <p className="text-[11px] text-[#475569] mt-0.5">
              Store: DMart BLR-014 (Kanakapura Main Road) • Edge Camera Array 04
            </p>
          </div>

          {/* Compliance & Frameworks */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#059669] font-medium">
              <ShieldCheck strokeWidth={1.5} className="w-3.5 h-3.5" />
              <span>India BRSR Core Principle 6</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#064E3B] font-medium">
              <Sparkles strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
              <span>UN SDG 12.3 Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-700 font-medium">
              <span>FSSAI Save Food Certified</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#94A3B8]">
          <p>
            Optical AE drift calibrated with ₹100 reference tiles + Arrhenius kinetics. Built for retail fresh-aisles.
          </p>
          <p className="font-mono text-[#059669] font-semibold">
            Demo Mode Active • Canonical Tomato Case Locked
          </p>
        </div>

        {/* Privacy-by-Architecture strip */}
        <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-center gap-2 text-center">
          <span className="font-mono text-[11px] text-[#475569]">
            🔒 only numbers leave the store · no video, no faces · 48-hr onboarding · scales to 10,000+ stores
          </span>
        </div>
      </div>
    </footer>
  );
};
