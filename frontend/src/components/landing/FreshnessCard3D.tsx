"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";

export const FreshnessCard3D: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid, premium mechanical response
  const mouseXSpring = useSpring(x, { stiffness: 160, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 160, damping: 22 });

  // Map mouse springs to 3D rotation angles around canonical resting pose:
  // Baseline: rotateY(-8deg), rotateX(4deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [14, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-18, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative flex items-center justify-center py-6 select-none"
      style={{ perspective: "1200px" }}
    >
      {/* BEHIND THE CARD: Two soft glowing orbs (green top-left, amber bottom-right) */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#10B981]/30 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-14 -right-14 w-80 h-80 rounded-full bg-[#F59E0B]/25 blur-[85px] pointer-events-none"
      />

      {/* Floating badge above card's top-right corner with independent 3D parallax float */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-4 right-0 sm:right-6 z-40 pointer-events-none"
        style={{
          transform: "translateZ(75px)",
          filter: "drop-shadow(0 12px 24px rgba(6,78,59,0.18))",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-white/80 text-xs font-semibold text-[#064E3B] shadow-md ring-1 ring-emerald-500/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
          </span>
          <span className="tracking-tight">Live · action auto-fired just now</span>
        </div>
      </motion.div>

      {/* 3D Freshness Card Container with Interactive Tilt and Preserve-3D */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-[430px] max-w-[92vw] rounded-2xl bg-white border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between p-6 cursor-pointer shadow-[0_28px_60px_-12px_rgba(6,78,59,0.22),0_12px_28px_-6px_rgba(5,150,105,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-shadow duration-300 hover:shadow-[0_40px_80px_-16px_rgba(6,78,59,0.32),0_18px_36px_-6px_rgba(5,150,105,0.22),inset_0_1px_2px_rgba(255,255,255,1)]"
      >
        {/* Dynamic Glass Glare Sheen Reflection Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-30"
          style={{
            background: isHovered
              ? "radial-gradient(circle 320px at 50% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 60%, transparent 80%)"
              : "radial-gradient(circle 280px at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 70%)",
            transform: "translateZ(35px)",
          }}
        />

        {/* 4px gradient top edge: green #059669 → amber #F59E0B */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#059669] via-[#10B981] to-[#F59E0B]"
          style={{ transform: "translateZ(10px)" }}
        />

        {/* 1. 3D-feel Produce Thumbnail with Soft Mint Freshness Aura Glow */}
        <div
          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mt-1 border border-[#E2E8F0] shadow-sm bg-slate-900 group"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Radial mint freshness aura glow blurred behind photo */}
          <div className="absolute inset-0 bg-radial from-[#10B981]/45 to-transparent blur-xl pointer-events-none z-10" />

          <img
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
            alt="Tomatoes on retail shelf"
            className="w-full h-full object-cover saturate-[0.92] contrast-[1.08] transition-transform duration-500 group-hover:scale-105"
          />

          {/* Optical Corner HUD Indicators */}
          <div className="absolute top-2 left-2 z-20 w-3 h-3 border-t-2 border-l-2 border-[#10B981] pointer-events-none" />
          <div className="absolute top-2 right-2 z-20 w-3 h-3 border-t-2 border-r-2 border-[#10B981] pointer-events-none" />

          {/* Crate ID Badge */}
          <div className="absolute bottom-2 left-2.5 z-20 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-white font-medium flex items-center gap-1.5 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>#AF-CRATE-0481 · Aisle 4</span>
          </div>

          <div className="absolute bottom-2 right-2.5 z-20 bg-[#059669]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-white font-semibold">
            CAM-04 · 1080P
          </div>
        </div>

        {/* 2. Large 3D-feel "B+" Freshness Grade Stamp + RSL Text */}
        <div
          className="text-center my-3"
          style={{ transform: "translateZ(55px)" }}
        >
          <div className="text-[92px] sm:text-[98px] font-bold font-serif leading-none tracking-tight stamp-grade-3d select-none">
            B+
          </div>
          <div className="font-mono text-xs sm:text-sm font-bold text-[#059669] tracking-wide mt-1 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>RSL 3.2 ± 0.8 days</span>
          </div>
        </div>

        {/* 3. Two Stacked Comparison Rows */}
        <div
          className="space-y-2 py-3 px-3.5 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E2E8F0] text-xs shadow-inner"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="flex items-center justify-between text-[#475569]">
            <span className="font-medium">Visible to humans</span>
            <div className="flex items-center gap-2 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#94A3B8]"></span>
              <span className="text-[#64748B]">Day 8</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[#064E3B] font-semibold pt-1 border-t border-[#E2E8F0]/70">
            <span className="text-[#059669] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>AuraFresh detected</span>
            </span>
            <div className="flex items-center gap-2 font-mono text-[#059669] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse"></span>
              <span className="text-[#059669] font-black text-sm">Day 5</span>
            </div>
          </div>
        </div>

        {/* 4. 3D-Feel Retail Price-Tag Element */}
        <div
          className="flex items-center justify-between p-3.5 rounded-xl price-tag-3d my-3"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="flex items-baseline gap-2.5">
            <span className="text-xs text-[#94A3B8] line-through font-mono font-medium">
              ₹80
            </span>
            <span className="text-3xl font-black font-mono text-[#10B981] tracking-tight drop-shadow-xs">
              ₹56
            </span>
            <span className="text-xs font-semibold text-[#475569]">/kg</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shadow-xs">
            <span>−30% auto-fired</span>
          </div>
        </div>

        {/* 5. Two Evidence Chips at Bottom */}
        <div
          className="flex items-center justify-between gap-2 text-[10px] font-mono text-[#475569]"
          style={{ transform: "translateZ(25px)" }}
        >
          <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs truncate flex-1 text-center font-medium">
            AE drift 0.42 · 8°C avg chiller
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs truncate flex-1 text-center font-medium">
            matched 1,240 ref crates
          </span>
        </div>

        {/* 6. Small Mint Verified Pill at the Bottom */}
        <div
          className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold font-mono text-[#064E3B] bg-[#D1FAE5] px-3 py-1 rounded-full border border-[#10B981]/30 shadow-xs">
            <BadgeCheck strokeWidth={1.8} className="w-3.5 h-3.5 text-[#059669]" />
            <span>✓ Sensor verified · 14:31 IST</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};
