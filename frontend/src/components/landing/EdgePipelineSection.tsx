"use client";

import React from "react";
import { Camera, Cpu, Zap, ShieldCheck, ArrowRight, Layers, Radio, Tag } from "lucide-react";
import Link from "next/link";

export const EdgePipelineSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "SENSE",
      subtitle: "CCTV Cameras + ₹100 Tile",
      desc: "Runs on IP cameras stores already own. A ₹100 Macbeth ceramic reflectance tile mounted in the corner normalizes lighting variations across aisles and chiller shifts.",
      badge: "Privacy-by-Architecture",
      badgeColor: "bg-[#D1FAE5] text-[#064E3B] border-[#10B981]/30",
      stats: "0 video frames leave store · Local edge box only",
      icon: Camera,
      gradient: "from-[#10B981] to-[#059669]",
    },
    {
      num: "02",
      title: "PREDICT",
      subtitle: "Arrhenius Molecular Kinetics",
      desc: "Edge AI extracts Gabor texture drift (AE 0.42), fusing it with 72-hour chiller IoT temperature profiles via Arrhenius chemical reaction kinetics k = A · e^(-Ea/RT).",
      badge: "Physics + Deep Learning",
      badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      stats: "3.2 ± 0.8 days RSL · 78% confidence score",
      icon: Cpu,
      gradient: "from-[#F59E0B] to-[#D97706]",
    },
    {
      num: "03",
      title: "ACT",
      subtitle: "Closed-Loop Automation",
      desc: "High-confidence predictions (≥70%) automatically fire price drops to Electronic Shelf Labels (ESL), notify Kirana partners via WhatsApp, or schedule Feeding India pickups.",
      badge: "Zero Manual Spreadsheets",
      badgeColor: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
      stats: "₹640 saved per crate · 30% instant markdown",
      icon: Zap,
      gradient: "from-[#3B82F6] to-[#1D4ED8]",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0]/80">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E2E8F0] shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#059669]" />
          <span className="font-mono text-xs font-semibold text-[#059669] tracking-wide uppercase">
            Architecture
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#064E3B] tracking-tight">
          How it works: from shelf to savings
        </h2>

        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
          A seamless 3-stage loop that transforms existing overhead cameras into autonomous freshness monitors.
        </p>
      </div>

      {/* 3 Steps Grid with 3D hover-depth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="aurafresh-card p-6 relative rounded-2xl flex flex-col justify-between aurafresh-card-hover group bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${s.gradient}`} />

              <div>
                {/* Header with Step Number & Icon */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span className="text-3xl font-black font-mono text-slate-200 group-hover:text-[#059669]/40 transition-colors">
                    {s.num}
                  </span>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center shadow-md shadow-emerald-900/10`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-xs font-mono font-bold text-[#059669] tracking-wider uppercase">
                    Stage {s.num} · {s.title}
                  </div>
                  <h3 className="text-xl font-bold text-[#064E3B]">
                    {s.subtitle}
                  </h3>
                </div>

                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                  {s.desc}
                </p>
              </div>

              {/* Bottom Metadata & Pill */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${s.badgeColor}`}>
                  {s.badge}
                </span>

                <div className="text-xs font-mono text-[#064E3B] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span>{s.stats}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Link to Deep Dive */}
      <div className="text-center mt-12">
        <Link
          href="/crates/AF-CRATE-0481"
          className="btn-3d-green text-white text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 active:scale-95"
        >
          <span>See live Arrhenius computation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
