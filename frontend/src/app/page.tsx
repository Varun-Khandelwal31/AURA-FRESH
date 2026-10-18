"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "../components/landing/Navbar";
import { HeroCopy } from "../components/landing/HeroCopy";
import { FreshnessCard3D } from "../components/landing/FreshnessCard3D";
import { StatStrip } from "../components/landing/StatStrip";
import { InvisibleWindow3DSection } from "../components/landing/InvisibleWindow3DSection";
import { EdgePipelineSection } from "../components/landing/EdgePipelineSection";
import { LiveSimulatorSection } from "../components/landing/LiveSimulatorSection";
import { LiveCameraTestSection } from "../components/landing/LiveCameraTestSection";
import { LiveTelemetrySection } from "../components/landing/LiveTelemetrySection";
import { FooterLanding } from "../components/landing/FooterLanding";
import { ArrowRight, Eye, ShieldCheck, Sparkles, Store, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FAFC] text-[#475569] font-sans overflow-x-hidden selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      
      {/* Background Mesh Gradient + Dot-Grid Pattern + Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle mesh background underlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#059669]/[0.03] via-transparent to-[#D1FAE5]/20" />
        
        {/* Faint dot-grid pattern (1px dots, 32px spacing, 6% opacity) */}
        <div className="absolute inset-0 dot-grid-pattern opacity-60" />

        {/* Ambient blurred radial orbs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#059669]/10 blur-[140px]" />
        <div className="absolute top-[40%] -right-32 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/10 blur-[150px]" />
        <div className="absolute top-[80%] left-1/4 w-[500px] h-[500px] rounded-full bg-[#10B981]/10 blur-[130px]" />
      </div>

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* 1. HERO SECTION (two-column 60/40, perspective-enabled 3D card) */}
      <section className="relative z-10 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN — copy stack (60% / 7 cols) */}
            <div className="lg:col-span-7">
              <HeroCopy />
            </div>

            {/* RIGHT COLUMN — 3D interactive freshness card (40% / 5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <FreshnessCard3D />
            </div>

          </div>
        </div>
      </section>

      {/* 2. STAT STRIP (below hero, subtle key retail metrics) */}
      <section className="relative z-10 border-y border-[#E2E8F0]/80 bg-white/40 backdrop-blur-sm">
        <StatStrip />
      </section>

      {/* 3. 3D INVISIBLE WINDOW TIMELINE SECTION (Day slider + spatial perspective) */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent via-white/50 to-transparent">
        <InvisibleWindow3DSection />
      </section>

      {/* 4. EDGE AI & PHYSICAL ARRHENIUS PIPELINE (3D tilt cards) */}
      <section className="relative z-10 py-20">
        <EdgePipelineSection />
      </section>

      {/* 5. INTERACTIVE LIVE SIMULATOR (Live physics & chiller workbench) */}
      <section className="relative z-10 py-20 bg-[#F1F5F9]/40 border-y border-[#E2E8F0]">
        <LiveSimulatorSection />
      </section>

      {/* 6. LIVE OPTICAL CAMERA RIG & INFERENCE (Real FastAPI /api/predict execution) */}
      <section className="relative z-10 py-20">
        <LiveCameraTestSection />
      </section>

      {/* 7. REAL-TIME STREAMING ACTION BUS (Live recovery & dispatch events) */}
      <section className="relative z-10 py-20 bg-white/70 border-y border-[#E2E8F0]">
        <LiveTelemetrySection />
      </section>

      {/* 8. READY TO DEPLOY SECTION (Direct link to live store apps) */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#043327] text-white shadow-[0_20px_50px_rgba(6,78,59,0.3)] relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#10B981]/20 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#059669]/20 blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D1FAE5] text-xs font-mono font-medium border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Zero New Hardware · 48-Hour Onboarding</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              Watch the invisible window across your entire produce floor.
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              Connect existing store CCTV overhead streams and IoT chiller sensors. 
              Only numbers leave the store. Zero facial data. Complete closed-loop automation.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/store"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#064E3B] hover:text-white font-bold text-sm shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Store className="w-4 h-4" />
                <span>Launch Live Store Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/crates/AF-CRATE-0481"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all"
              >
                <Eye className="w-4 h-4 text-[#D1FAE5]" />
                <span>Inspect Crate #AF-CRATE-0481</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <FooterLanding />
      </div>

    </div>
  );
}
