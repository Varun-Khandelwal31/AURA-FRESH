"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { 
  BadgeCheck, 
  Check, 
  Camera, 
  Thermometer, 
  TrendingUp, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Sparkles 
} from "lucide-react";

interface ClaimItem {
  id: string;
  crateId: string;
  vendorName: string;
  thumb: string;
  claimType: string;
  claimTypeColor: "amber" | "red" | "slate";
  evidencePhotos: string;
  evidenceTemp: string;
  evidenceAe: string;
  greenDots: number;
  totalDots: number;
  actionText: string;
  actionIsFilled?: boolean;
  isDisputedRow1?: boolean;
}

const CLAIMS: ClaimItem[] = [
  {
    id: "cl-01",
    crateId: "#AF-CRATE-0481",
    vendorName: "Nafeela Farm Fresh",
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80",
    claimType: "Warm chiller damage",
    claimTypeColor: "amber",
    evidencePhotos: "📷 6 photos",
    evidenceTemp: "🌡 72-hr temp log",
    evidenceAe: "📈 AE timeline",
    greenDots: 3,
    totalDots: 5,
    actionText: "Settle auto · ₹640",
    actionIsFilled: true,
    isDisputedRow1: true,
  },
  {
    id: "cl-02",
    crateId: "#AF-CRATE-0312",
    vendorName: "Nafeela Farm Fresh",
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80",
    claimType: "Pre-arrival decay",
    claimTypeColor: "red",
    evidencePhotos: "📷 4 photos",
    evidenceTemp: "🌡 24-hr reefer log",
    evidenceAe: "📈 ΔE 0.62 shift",
    greenDots: 3,
    totalDots: 5,
    actionText: "View evidence →",
    actionIsFilled: false,
  },
  {
    id: "cl-03",
    crateId: "#AF-CRATE-0199",
    vendorName: "Nafeela Farm Fresh",
    thumb: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=120&q=80",
    claimType: "Quantity shortfall",
    claimTypeColor: "slate",
    evidencePhotos: "📷 Tare weight tag",
    evidenceTemp: "🌡 Dock ambient 21°C",
    evidenceAe: "📈 ΔE 0.22 (nominal)",
    greenDots: 3,
    totalDots: 5,
    actionText: "Settle auto · ₹380",
    actionIsFilled: true,
  },
  {
    id: "cl-04",
    crateId: "#AF-CRATE-0504",
    vendorName: "Nafeela Farm Fresh",
    thumb: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=120&q=80",
    claimType: "Warm chiller damage",
    claimTypeColor: "amber",
    evidencePhotos: "📷 8 photos",
    evidenceTemp: "🌡 72-hr temp log",
    evidenceAe: "📈 AE timeline",
    greenDots: 3,
    totalDots: 5,
    actionText: "View evidence →",
    actionIsFilled: false,
  },
];

export default function VendorPortalPage() {
  const [filter, setFilter] = useState<string>("all");
  const [claimsList, setClaimsList] = useState<ClaimItem[]>(CLAIMS);
  const [settledMap, setSettledMap] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleSettle = (id: string) => {
    setSettledMap((prev) => ({ ...prev, [id]: true }));
    showToast("✓ Claim settled: Instant credit note issued to vendor ledger.");
  };

  const filteredClaims = claimsList.filter((c) => {
    if (filter === "disputed") return c.isDisputedRow1 || c.claimTypeColor === "red";
    if (filter === "auto") return c.actionIsFilled;
    if (filter === "pending") return !c.actionIsFilled;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#475569] font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* CASE HEADER */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: small mono vendor ID "#VENDOR-NFR-027 · Nafeela Farm Fresh" in slate */}
          <div className="font-mono text-xs text-[#475569]">
            #VENDOR-NFR-027 · Nafeela Farm Fresh
          </div>

          {/* Center: small green mono eyebrow "VENDOR PORTAL · FAIR DOCK SCORING" */}
          <div className="font-mono text-xs font-bold text-[#059669] tracking-wider text-center">
            VENDOR PORTAL · FAIR DOCK SCORING
          </div>

          {/* Right: small mint pill "✓ Sensor verified · 14:31 IST" + below it evidence-backed pill */}
          <div className="flex flex-col sm:items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
              <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
              <span>✓ Sensor verified · 14:31 IST</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded-full text-[10px] text-[#059669] font-medium font-mono self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>evidence-backed · dispute-ready</span>
            </span>
          </div>
        </div>

        {/* PAGE HEADER (centered) */}
        <div className="text-center max-w-3xl mx-auto py-2 space-y-1">
          <h1 className="text-[28px] font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Every dispute settles with data, not negotiation.
          </h1>
          <p className="text-[14px] text-[#475569] leading-relaxed">
            Photo + temperature history + AE timeline attached to every claim. Both sides see the same evidence.
          </p>
        </div>

        {/* SPLIT LAYOUT — 65/35 split */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* =========================================================================
              LEFT 65% — Claims Table (white card, soft shadow, 1px hairline, 12px radius)
             ========================================================================= */}
          <div className="w-full lg:w-[65%] bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-[0_8px_24px_-8px_rgba(6,78,59,0.06)] space-y-4">
            
            {/* Card Header: "Open claims · 4 disputed · ₹14,200 at stake" + Filter Pills + "New claim" button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-base font-semibold text-[#064E3B]">
                  Open claims · 4 disputed · ₹14,200 at stake
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-md border border-[#E2E8F0] text-xs">
                  {[
                    { key: "all", label: "All" },
                    { key: "disputed", label: "Disputed" },
                    { key: "auto", label: "Auto-settled" },
                    { key: "pending", label: "Pending review" },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        filter === f.key
                          ? "bg-white text-[#064E3B] font-semibold shadow-xs"
                          : "text-[#475569] hover:bg-white/50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* "New claim" green ghost button */}
                <button
                  onClick={() => showToast("📋 Dispute dossier generator opened: Select crate and attach edge sensor audit.")}
                  className="px-2.5 py-1.5 rounded-md border border-[#059669] text-[#059669] hover:bg-[#D1FAE5]/40 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <Plus strokeWidth={2} className="w-3.5 h-3.5" />
                  <span>New claim</span>
                </button>
              </div>
            </div>

            {/* Vertical list of 4 claim rows (soft white sub-cards, 1px hairline, 8px radius) */}
            <div className="space-y-3">
              {filteredClaims.map((claim) => {
                const isTopDisputed = claim.isDisputedRow1;
                const isSettled = settledMap[claim.id];

                return (
                  <div
                    key={claim.id}
                    className={`p-3.5 bg-white border border-[#E2E8F0] rounded-[8px] shadow-xs relative overflow-hidden transition-all ${
                      isTopDisputed
                        ? "border-l-[3px] border-l-[#F59E0B] bg-amber-50/15"
                        : "hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left thumbnail + Vendor name + Crate ID + Claim type pill */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 border border-[#E2E8F0] flex-shrink-0 mt-0.5">
                          <img
                            src={claim.thumb}
                            alt={claim.crateId}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#064E3B]">
                              {claim.vendorName} · {claim.crateId}
                            </span>
                            {isTopDisputed && (
                              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                                DISPUTED
                              </span>
                            )}
                          </div>

                          {/* Claim type pill */}
                          <div className="mt-1">
                            {claim.claimTypeColor === "amber" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-[#B45309] border border-amber-200">
                                {claim.claimType}
                              </span>
                            )}
                            {claim.claimTypeColor === "red" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-50 text-[#BE123C] border border-rose-200">
                                {claim.claimType}
                              </span>
                            )}
                            {claim.claimTypeColor === "slate" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-[#475569] border border-slate-200">
                                {claim.claimType}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action button: "View evidence →" or "Settle auto · ₹640" */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0">
                        {isSettled ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                            <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#059669]" />
                            <span>Settled · ₹640</span>
                          </span>
                        ) : claim.actionIsFilled ? (
                          <button
                            onClick={() => handleSettle(claim.id)}
                            className="px-3.5 py-1.5 rounded-md bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold font-mono shadow-xs transition-all active:scale-95"
                          >
                            {claim.actionText}
                          </button>
                        ) : (
                          <button
                            onClick={() => showToast(`🔍 Reviewing cryptographic evidence bundle for ${claim.crateId}`)}
                            className="px-3 py-1.5 rounded-md border border-[#059669] text-[#059669] hover:bg-[#D1FAE5]/40 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                          >
                            <span>{claim.actionText}</span>
                          </button>
                        )}
                      </div>

                    </div>

                    {/* Evidence Row + Vendor Score 5-Dot Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-2 text-xs">
                      {/* Three small chip-links showing attached evidence */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => showToast("📷 Previewing 6 edge calibration photos with Macbeth tile alignment")}
                          className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#064E3B] hover:bg-[#D1FAE5]/30 transition-colors"
                        >
                          {claim.evidencePhotos}
                        </button>
                        <button
                          onClick={() => showToast("🌡 Previewing 72-hr cold-chain reefer log: 8.0°C thermal excursion flagged")}
                          className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#B45309] hover:bg-amber-50 transition-colors"
                        >
                          {claim.evidenceTemp}
                        </button>
                        <button
                          onClick={() => showToast("📈 Previewing AE reflectance drift trajectory: ΔE 0.62 shift")}
                          className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#059669] hover:bg-[#D1FAE5]/30 transition-colors"
                        >
                          {claim.evidenceAe}
                        </button>
                      </div>

                      {/* 5-dot indicator (3 green + 2 slate = "3.0 / 5.0 dock score") */}
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#475569]">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        </div>
                        <span>3.0 / 5.0 dock score</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom: "View all 47 claims this month →" green ghost link */}
            <div className="pt-2">
              <Link
                href="/store"
                className="text-xs font-semibold text-[#059669] hover:underline inline-flex items-center gap-1"
              >
                <span>View all 47 claims this month →</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT 35% — Vendor Scorecard (vertical stack of 3 cards)
             ========================================================================= */}
          <div className="w-full lg:w-[35%] space-y-4">
            
            {/* Card 1 — Vendor scorecard (white surface, soft shadow, 1px hairline) */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-4">
              <h3 className="text-[14px] font-semibold text-[#064E3B]">
                Nafeela Farm Fresh · scorecard
              </h3>

              {/* Large score circle (120px diameter, deep forest background, mint progress ring at 3.0/5.0 fill) */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-[120px] h-[120px] rounded-full bg-[#064E3B] border-4 border-[#10B981] shadow-md flex flex-col items-center justify-center text-white relative">
                  <div className="text-[36px] font-serif font-bold leading-none">
                    3.0
                  </div>
                  <div className="text-[12px] font-mono text-[#D1FAE5] mt-0.5">
                    / 5.0
                  </div>
                </div>
              </div>

              {/* Four metric rows, each with label + small bar */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-[#475569]">On-time delivery: 78%</span>
                    <span className="text-[#059669] font-bold">78%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#059669] h-full rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-[#475569]">Pre-arrival freshness: 82%</span>
                    <span className="text-[#10B981] font-bold">82%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-[#B45309]">Temperature compliance: 64%</span>
                    <span className="text-[#F59E0B] font-bold">64% (Flagged)</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: "64%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-[#475569]">Dispute rate: 12%</span>
                    <span className="text-[#475569] font-bold">12%</span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#94A3B8] h-full rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>

              {/* Bottom: italic slate 11px */}
              <p className="pt-2 border-t border-[#E2E8F0] text-[11px] text-[#475569] italic">
                Score recalculated weekly from sensor evidence — no human opinion.
              </p>
            </div>

            {/* Card 2 — Evidence attached (white surface, soft shadow) */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-3">
              <h3 className="text-[14px] font-semibold text-[#064E3B]">
                Evidence attached · claim #0481
              </h3>

              {/* Three evidence chips stacked vertically, each a soft card */}
              <div className="space-y-2 text-xs">
                {/* Chip 1 */}
                <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="font-semibold text-[#064E3B] flex items-center justify-between">
                    <span>📷 6 photos · Jul 17, 14:31 IST</span>
                    <span className="text-[10px] text-[#059669] font-mono">Tile verified</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <div className="w-8 h-8 rounded bg-slate-200 overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=80&q=80" alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded bg-slate-200 overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=80&q=80" alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded bg-slate-200 overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=80&q=80" alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Chip 2 */}
                <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="font-semibold text-[#B45309]">
                    🌡 Temperature log · 72 hr · 8°C avg (slightly warm)
                  </div>
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <path d="M0,14 Q30,12 50,8 T80,5 T100,6" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Chip 3 */}
                <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <div className="font-semibold text-[#059669]">
                    📈 AE timeline · drift 0.18 → 0.42 over 48 hrs
                  </div>
                  <div className="h-6 w-full pt-1">
                    <svg className="w-full h-full" viewBox="0 0 100 20">
                      <path d="M0,18 Q40,17 60,11 T100,3" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom: 12px slate italic */}
              <p className="text-[12px] text-[#475569] italic pt-1">
                Both sides see the same evidence · dispute resolved 3.2× faster
              </p>
            </div>

            {/* Card 3 — Recent settlements (white surface, soft shadow) */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-3">
              <h3 className="text-[14px] font-semibold text-[#064E3B]">
                Recent settlements · this month
              </h3>

              {/* Three small rows */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#064E3B]">
                  <span>Nafeela Farm Fresh · ₹640 settled (auto)</span>
                  <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <div className="flex items-center justify-between text-[#B45309]">
                  <span>Sunrise Organics · ₹1,240 disputed</span>
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                </div>
                <div className="flex items-center justify-between text-[#064E3B]">
                  <span>Local Greens Coop · ₹320 settled (auto)</span>
                  <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* PRIVACY FOOTER (full-width, hairline-top) */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <Lock strokeWidth={1.5} className="w-3.5 h-3.5 text-[#475569]" />
          <span className="font-mono text-[11px] text-[#475569]">
            evidence stored on edge · 90-day retention · vendor-side access only · no customer data
          </span>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-medium shadow-2xl border border-emerald-400/30 flex items-center gap-2 animate-fade-in max-w-[90vw]">
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
