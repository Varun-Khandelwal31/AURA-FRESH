"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, ArrowRight, Camera, HardDrive, FileCheck } from "lucide-react";

export const HeroCopy: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Eyebrow glass chip (small mint dot) */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E2E8F0] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
        <span className="font-mono text-xs text-[#059669] font-medium tracking-wide">
          AI-powered freshness prediction · v1.0
        </span>
      </div>

      {/* H1 (72px, Inter Display bold, deep forest #064E3B) */}
      <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-bold text-[#064E3B] tracking-tight leading-[1.08] font-sans">
        Freshness has an{" "}
        <span className="relative inline-block text-[#064E3B] drop-shadow-[1px_1px_0px_rgba(5,150,105,0.35)]">
          invisible
        </span>{" "}
        window.
        <br />
        <span className="text-3xl sm:text-5xl lg:text-[58px] font-semibold text-[#059669]">
          We watch it.
        </span>
      </h1>

      {/* Subhead (20px, slate #475569, line-height 1.5) */}
      <p className="text-lg sm:text-[20px] text-[#475569] leading-[1.5] max-w-xl">
        AuraFresh reads the 1-3 day pre-visual decay window that humans can't see — and fires the right action automatically. ₹1-1.7 cr recovered per store, per year.
      </p>

      {/* CTA row: primary green filled + secondary ghost */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/store"
          className="btn-3d-green text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full inline-flex items-center gap-2 active:scale-95"
        >
          <span>See it in action</span>
          <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
        </Link>

        <Link
          href="/invisible-window"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-[#064E3B] hover:text-[#059669] bg-white/60 hover:bg-white/90 border border-[#E2E8F0] shadow-sm transition-all active:scale-95"
        >
          <PlayCircle strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
          <span>Watch 90-sec demo</span>
        </Link>
      </div>

      {/* Trust chips row (3 glass pills, each with line icon) */}
      <div className="flex flex-wrap items-center gap-2.5 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E2E8F0] text-xs text-[#475569] font-medium shadow-sm">
          <Camera strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
          <span>✓ Runs on cameras you already own</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E2E8F0] text-xs text-[#475569] font-medium shadow-sm">
          <HardDrive strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
          <span>✓ Zero new shelf hardware</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E2E8F0] text-xs text-[#475569] font-medium shadow-sm">
          <FileCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
          <span>✓ India BRSR + UN SDG 12.3 ready</span>
        </div>
      </div>
    </div>
  );
};
