"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  BadgeCheck, 
  Check, 
  ThumbsUp, 
  Sparkles, 
  ArrowLeft, 
  Smartphone,
  RotateCcw,
  Clock,
  ShieldCheck
} from "lucide-react";

interface KiranaAction {
  id: string;
  crateId: string;
  produceName: string;
  quantity: string;
  thumb: string;
  rsl: string;
  confidence: string;
  amount: string;
  actionPill: string;
  actionPillType: "auto-amber" | "mint" | "green-tint" | "slate" | "approve-button";
  isCanonical?: boolean;
  isApproved?: boolean;
}

const INITIAL_KIRANA_ACTIONS: KiranaAction[] = [
  {
    id: "k-01",
    crateId: "AF-CRATE-0481",
    produceName: "Tomato",
    quantity: "1 crate (12 kg)",
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80",
    rsl: "3.2 ± 0.8 days",
    confidence: "78% confidence",
    amount: "₹640",
    actionPill: "30% markdown · auto-fired",
    actionPillType: "auto-amber",
    isCanonical: true,
  },
  {
    id: "k-02",
    crateId: "AF-CRATE-0312",
    produceName: "Spinach",
    quantity: "10 bundles (5 kg)",
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80",
    rsl: "1.4 ± 0.3 days",
    confidence: "86% confidence",
    amount: "₹280",
    actionPill: "FEFO re-sort to front",
    actionPillType: "mint",
  },
  {
    id: "k-03",
    crateId: "AF-CRATE-0199",
    produceName: "Banana",
    quantity: "2 bunches (18 kg)",
    thumb: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=120&q=80",
    rsl: "2.8 ± 0.5 days",
    confidence: "64% confidence",
    amount: "₹420",
    actionPill: "One-tap approve",
    actionPillType: "approve-button",
  },
  {
    id: "k-04",
    crateId: "AF-CRATE-0504",
    produceName: "Mango",
    quantity: "1 wooden crate (8 kg)",
    thumb: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=120&q=80",
    rsl: "2.1 ± 0.4 days",
    confidence: "68% confidence",
    amount: "₹890",
    actionPill: "One-tap approve",
    actionPillType: "approve-button",
  },
  {
    id: "k-05",
    crateId: "AF-CRATE-0221",
    produceName: "Carrot",
    quantity: "1 sack (15 kg)",
    thumb: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=120&q=80",
    rsl: "3.5 ± 0.6 days",
    confidence: "74% confidence",
    amount: "₹340",
    actionPill: "Bundle with spinach",
    actionPillType: "green-tint",
  },
  {
    id: "k-06",
    crateId: "AF-CRATE-0618",
    produceName: "Coriander",
    quantity: "15 bunches (3 kg)",
    thumb: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=120&q=80",
    rsl: "0.8 ± 0.2 days",
    confidence: "89% confidence",
    amount: "₹180",
    actionPill: "Donate to Akshaya Patra",
    actionPillType: "slate",
  },
];

export default function KiranaMobilePage() {
  const [actions, setActions] = useState<KiranaAction[]>(INITIAL_KIRANA_ACTIONS);

  const handleApprove = async (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isApproved: true } : a))
    );

    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ["#10B981", "#059669", "#F59E0B"],
      });
    } catch (e) {}

    try {
      await fetch(`/api/actions/${id}/approve`, { method: "POST" });
    } catch (e) {}
  };

  const handleApproveAll = () => {
    setActions((prev) => prev.map((a) => ({ ...a, isApproved: true })));
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#10B981", "#059669", "#F59E0B"],
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#475569] font-sans flex flex-col justify-between selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      
      {/* MOBILE CONTAINER (Max width 480px, centered, mobile-first, no sidebar) */}
      <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col bg-white sm:border-x sm:border-[#E2E8F0] shadow-sm relative pb-28">
        
        {/* 1. MobileHeader (white surface, hairline bottom border) */}
        <header className="px-4 py-3 bg-white border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 z-30">
          {/* Left: shop avatar circle (deep forest #064E3B, white "RS") + "Ramesh Stores" semibold + "kirana · BLR-014" */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#064E3B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              RS
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#064E3B] leading-tight">
                Ramesh Stores
              </div>
              <div className="text-[11px] font-mono text-[#475569]">
                kirana · BLR-014
              </div>
            </div>
          </div>

          {/* Right: small mint pill "✓ Sensor verified" with verified-check icon */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
            <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>✓ Sensor verified</span>
          </div>
        </header>

        {/* 2. Greeting */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-[22px] font-bold text-[#064E3B] tracking-tight font-sans">
            Namaste, Ramesh 👋
          </h1>
          <p className="text-[14px] text-[#475569] mt-0.5">
            ₹4,820 recoverable today · 12 actions ranked by ₹ at stake
          </p>
        </div>

        {/* 3. ActionList — 6 ranked rows visible */}
        <div className="px-4 space-y-3 flex-1">
          {actions.map((item) => {
            const isApproved = item.isApproved;

            return (
              <div
                key={item.id}
                className={`p-3 bg-white border border-[#E2E8F0] rounded-[8px] shadow-xs relative overflow-hidden transition-all ${
                  item.isCanonical
                    ? "border-l-[3px] border-l-[#059669] bg-[#D1FAE5]/10"
                    : "hover:border-[#CBD5E1]"
                }`}
              >
                {/* Row Anatomy: Left produce thumbnail + Item name + RSL + Right ₹ amount */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Small produce thumbnail (40×40, rounded) */}
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 border border-[#E2E8F0] flex-shrink-0">
                      <img
                        src={item.thumb}
                        alt={item.produceName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      {/* Item name in semibold navy + LIVE pill if canonical */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-semibold text-[#0B1220]">
                          {item.produceName} · {item.quantity}
                        </span>
                        {item.isCanonical && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                            LIVE
                          </span>
                        )}
                      </div>

                      {/* Small mono mint row: "RSL 3.2 ± 0.8 days · 78% confidence" */}
                      <div className="text-[11px] font-mono text-[#059669] mt-0.5">
                        RSL {item.rsl} · {item.confidence}
                      </div>
                    </div>
                  </div>

                  {/* Right side: large ₹ amount in mono mint bold */}
                  <div className="text-right flex-shrink-0 font-mono text-[18px] font-bold text-[#059669]">
                    {item.amount}
                  </div>
                </div>

                {/* Bottom of row: action pill (color-coded) */}
                <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                  {/* Action pill rendering */}
                  {item.actionPillType === "auto-amber" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                      {item.actionPill}
                    </span>
                  )}

                  {item.actionPillType === "mint" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                      {item.actionPill}
                    </span>
                  )}

                  {item.actionPillType === "green-tint" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
                      {item.actionPill}
                    </span>
                  )}

                  {item.actionPillType === "slate" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-[#475569] border border-slate-200">
                      {item.actionPill}
                    </span>
                  )}

                  {item.actionPillType === "approve-button" && (
                    isApproved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                        <Check strokeWidth={2.5} className="w-3 h-3 text-[#059669]" />
                        <span>Approved · Task Dispatched</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold border border-[#F59E0B] text-[#B45309] bg-amber-50/50 hover:bg-amber-100 active:scale-95 transition-all shadow-xs"
                      >
                        <ThumbsUp strokeWidth={1.5} className="w-3.5 h-3.5" />
                        <span>One-tap approve</span>
                      </button>
                    )
                  )}

                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    {item.crateId}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tiny disclaimer line beneath + Privacy by architecture */}
        <div className="px-4 py-3 text-center space-y-1">
          <p className="text-[11px] text-[#94A3B8] font-mono leading-tight">
            Free for kirana stores · works on any ₹5,000 Android phone with camera.
          </p>
          <p className="text-[10px] text-[#475569] font-mono leading-tight">
            🔒 only numbers leave the store · no video, no faces
          </p>
        </div>

        {/* 4. StickyActionBar (bottom, fixed to mobile viewport width) */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] p-3 px-4 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-3 gap-2">
            {/* Ghost green button */}
            <button
              onClick={handleApproveAll}
              className="px-2 py-2 rounded-full border border-[#059669] text-[#059669] hover:bg-[#D1FAE5]/40 text-xs font-semibold text-center transition-colors active:scale-95"
            >
              Approve all ready
            </button>

            {/* Ghost slate button */}
            <button
              onClick={() => alert("Actions deferred for 30 minutes")}
              className="px-2 py-2 rounded-full border border-[#CBD5E1] text-[#475569] hover:bg-slate-50 text-xs font-medium text-center transition-colors active:scale-95"
            >
              Defer
            </button>

            {/* Ghost slate button */}
            <button
              onClick={() => alert("Optical scan requested for camera bay")}
              className="px-2 py-2 rounded-full border border-[#CBD5E1] text-[#475569] hover:bg-slate-50 text-xs font-medium text-center transition-colors active:scale-95"
            >
              Re-scan crates
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
