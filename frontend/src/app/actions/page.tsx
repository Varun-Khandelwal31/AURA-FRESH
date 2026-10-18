"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { 
  BadgeCheck, 
  Check, 
  ArrowRight, 
  Clock, 
  Lock, 
  Sparkles, 
  Activity, 
  Zap, 
  Tag, 
  RotateCw,
  Sliders,
  Radio,
  FileCheck2
} from "lucide-react";
import confetti from "canvas-confetti";

interface ActionItem {
  id: string;
  crateId: string;
  produce: string;
  thumb: string;
  rsl: string;
  action: string;
  actionType: "markdown" | "resort" | "donation" | "vendor" | "bundle";
  actionColor: "amber" | "mint" | "green" | "slate" | "peach";
  confidence: string;
  confidenceTier: "high" | "medium" | "low";
  recovered: string;
  time: string;
  isCanonical?: boolean;
  isNew?: boolean;
}

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: "act-01",
    crateId: "#AF-CRATE-0481",
    produce: "Roma Tomatoes (Retail Bay)",
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80",
    rsl: "3.2 ± 0.8 days",
    action: "30% markdown · auto-fired",
    actionType: "markdown",
    actionColor: "amber",
    confidence: "78%",
    confidenceTier: "high",
    recovered: "₹640",
    time: "14:31 IST",
    isCanonical: true,
  },
  {
    id: "act-02",
    crateId: "#AF-CRATE-0199",
    produce: "Robusta Banana Bunches",
    thumb: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=120&q=80",
    rsl: "2.8 ± 0.5 days",
    action: "FEFO re-sort",
    actionType: "resort",
    actionColor: "mint",
    confidence: "62%",
    confidenceTier: "medium",
    recovered: "₹380",
    time: "14:26 IST",
  },
  {
    id: "act-03",
    crateId: "#AF-CRATE-0618",
    produce: "Coriander Leaves",
    thumb: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=120&q=80",
    rsl: "0.8 ± 0.2 days",
    action: "Donation pickup scheduled",
    actionType: "donation",
    actionColor: "green",
    confidence: "89%",
    confidenceTier: "high",
    recovered: "₹520",
    time: "14:18 IST",
  },
  {
    id: "act-04",
    crateId: "#AF-CRATE-0312",
    produce: "Indian Palak Greens",
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80",
    rsl: "1.4 ± 0.3 days",
    action: "30% markdown · auto-fired",
    actionType: "markdown",
    actionColor: "amber",
    confidence: "86%",
    confidenceTier: "high",
    recovered: "₹450",
    time: "14:09 IST",
  },
  {
    id: "act-05",
    crateId: "#AF-CRATE-0221",
    produce: "Nagpur Mandarin Oranges",
    thumb: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=120&q=80",
    rsl: "2.1 ± 0.4 days",
    action: "Vendor claim filed",
    actionType: "vendor",
    actionColor: "slate",
    confidence: "45% · human-approved",
    confidenceTier: "low",
    recovered: "₹1,240",
    time: "13:54 IST",
  },
  {
    id: "act-06",
    crateId: "#AF-CRATE-0504",
    produce: "Shimla Green Capsicum",
    thumb: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=120&q=80",
    rsl: "4.5 ± 0.6 days",
    action: "FEFO re-sort",
    actionType: "resort",
    actionColor: "mint",
    confidence: "91%",
    confidenceTier: "high",
    recovered: "₹310",
    time: "13:42 IST",
  },
];

const STREAMING_POOL: Omit<ActionItem, "id" | "time">[] = [
  {
    crateId: "#AF-CRATE-0481",
    produce: "Roma Tomatoes (Retail Bay)",
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80",
    rsl: "3.2 ± 0.8 days",
    action: "30% markdown · auto-fired",
    actionType: "markdown",
    actionColor: "amber",
    confidence: "78%",
    confidenceTier: "high",
    recovered: "₹640",
    isCanonical: true,
  },
  {
    crateId: "#AF-CRATE-0722",
    produce: "Fresh Mint Bunches",
    thumb: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=120&q=80",
    rsl: "1.1 ± 0.2 days",
    action: "FEFO re-sort",
    actionType: "resort",
    actionColor: "mint",
    confidence: "72%",
    confidenceTier: "high",
    recovered: "₹240",
  },
  {
    crateId: "#AF-CRATE-0891",
    produce: "Baby Spinach (Chilled Rack)",
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80",
    rsl: "0.9 ± 0.2 days",
    action: "Donation pickup scheduled",
    actionType: "donation",
    actionColor: "green",
    confidence: "84%",
    confidenceTier: "high",
    recovered: "₹490",
  },
  {
    crateId: "#AF-CRATE-0332",
    produce: "Alphonso Mango Crate",
    thumb: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=120&q=80",
    rsl: "2.4 ± 0.4 days",
    action: "Vendor claim filed",
    actionType: "vendor",
    actionColor: "slate",
    confidence: "68%",
    confidenceTier: "medium",
    recovered: "₹1,580",
  },
  {
    crateId: "#AF-CRATE-0114",
    produce: "Red Crisp Apples",
    thumb: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=120&q=80",
    rsl: "3.0 ± 0.5 days",
    action: "Salad bundle deal · QR coupon",
    actionType: "bundle",
    actionColor: "peach",
    confidence: "74%",
    confidenceTier: "high",
    recovered: "₹420",
  },
];

export default function ActionCenterHeroPage() {
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [filter, setFilter] = useState<string>("all");
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [totalFired, setTotalFired] = useState<number>(12);
  const [totalRecovered, setTotalRecovered] = useState<number>(4820);
  const [humanApprovedCount, setHumanApprovedCount] = useState<number>(22);
  const streamIndexRef = React.useRef<number>(0);
  const [streamingLog, setStreamingLog] = useState<string>(
    "[14:31:02] action_bus: markdown fired to ESL-014 · ₹80 → ₹56"
  );

  const handleApprove = async (id: string, produce: string) => {
    try {
      await fetch(`http://localhost:8000/api/actions/${id}/approve`, {
        method: "POST",
      });
    } catch {
      // Optimistic execution
    }

    setApprovedIds((prev) => [...prev, id]);
    setTotalFired((prev) => prev + 1);
    setTotalRecovered((prev) => prev + 380);
    setHumanApprovedCount((prev) => prev + 1);
    setStreamingLog(`[${new Date().toLocaleTimeString("en-IN", { hour12: false })}] human_gate: Priya R. approved ${produce} · Dispatched to store WMS terminal`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Rotate simulated action arrivals every 6 seconds, keeping feed capped at 6 rows
  useEffect(() => {
    const timer = setInterval(() => {
      streamIndexRef.current = (streamIndexRef.current + 1) % STREAMING_POOL.length;
      const template = STREAMING_POOL[streamIndexRef.current];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} IST`;

      const newAction: ActionItem = {
        ...template,
        id: `act-stream-${Date.now()}`,
        time: timeStr.slice(0, 5) + " IST",
        isNew: true,
      };

      setActions((prev) => {
        // Keep canonical item plus the newest streaming items, max 6 items
        const remaining = prev.filter((p) => p.id !== newAction.id).slice(0, 5);
        return [newAction, ...remaining];
      });

      if (template.actionType === "markdown") {
        setStreamingLog(`[${timeStr.slice(0, 8)}] action_bus: markdown fired to ESL-014 · ₹80 → ₹56`);
      } else if (template.actionType === "resort") {
        setStreamingLog(`[${timeStr.slice(0, 8)}] action_bus: WMS re-sort task dispatched · front row facing`);
      } else if (template.actionType === "donation") {
        setStreamingLog(`[${timeStr.slice(0, 8)}] action_bus: Feeding India API confirmed pickup route #FD-882`);
      } else if (template.actionType === "vendor") {
        setStreamingLog(`[${timeStr.slice(0, 8)}] action_bus: ERP debit note generated for Nafeela Farm Fresh`);
      } else {
        setStreamingLog(`[${timeStr.slice(0, 8)}] action_bus: Twilio QR flash broadcast dispatched to 48 loyalty phones`);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const filteredActions = actions.filter((act) => {
    if (filter === "all") return true;
    if (filter === "markdown") return act.actionType === "markdown";
    if (filter === "resort") return act.actionType === "resort";
    if (filter === "donation") return act.actionType === "donation";
    if (filter === "vendor") return act.actionType === "vendor";
    if (filter === "bundle") return act.actionType === "bundle";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#475569] font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* CASE HEADER */}
        <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: small mono store ID "#STORE-BLR-014 · aisle 4 (fresh produce)" in slate */}
          <div className="font-mono text-xs text-[#475569]">
            #STORE-BLR-014 · aisle 4 (fresh produce)
          </div>

          {/* Center: small green mono eyebrow "ACTION CENTER · CLOSED-LOOP AUTOMATION" */}
          <div className="font-mono text-xs font-bold text-[#059669] tracking-wider text-center">
            ACTION CENTER · CLOSED-LOOP AUTOMATION
          </div>

          {/* Right: small mint pill "✓ Sensor verified · 14:31 IST" + below it live pill */}
          <div className="flex flex-col sm:items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
              <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
              <span>✓ Sensor verified · 14:31 IST</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded-full text-[10px] text-[#059669] font-medium font-mono self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>{totalFired} actions fired today · ₹{totalRecovered.toLocaleString("en-IN")} recovered</span>
            </span>
          </div>
        </div>

        {/* PAGE HEADER (centered below strip) */}
        <div className="text-center max-w-3xl mx-auto py-2 space-y-1">
          <h1 className="text-[28px] font-serif font-bold text-[#064E3B] tracking-tight leading-tight">
            Not another dashboard. Confidence + action.
          </h1>
          <p className="text-[14px] text-[#475569] leading-relaxed">
            78% confidence on this crate → 30% markdown auto-fired to ESL. No human in the loop above 70%.
          </p>
        </div>

        {/* SPLIT LAYOUT — 70/30 split */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* =========================================================================
              LEFT 70% — Action Feed (white card, soft shadow, 1px hairline, 12px radius)
              ========================================================================= */}
          <div className="w-full lg:w-[70%] bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-[0_8px_24px_-8px_rgba(6,78,59,0.06)] space-y-4">
            
            {/* Card Header: dynamic fired count + filter pills + Live pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-semibold text-[#064E3B]">
                  Today's actions · {totalFired} fired
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>Live</span>
                </span>
              </div>

              {/* Filter Pills Row (All / Markdown / FEFO re-sort / Donation / Vendor claim / Bundle) */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  { key: "all", label: "All" },
                  { key: "markdown", label: "Markdown" },
                  { key: "resort", label: "FEFO re-sort" },
                  { key: "donation", label: "Donation" },
                  { key: "vendor", label: "Vendor claim" },
                  { key: "bundle", label: "Bundle" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      filter === f.key
                        ? "bg-[#D1FAE5] text-[#064E3B] font-semibold border border-[#10B981]/30"
                        : "text-[#475569] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical feed of 6 action rows (soft white sub-cards, 1px hairline, 8px radius, hover-lift) */}
            <div className="space-y-2.5">
              {filteredActions.map((item, idx) => {
                const isCanonicalTop = item.isCanonical;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 bg-white border border-[#E2E8F0] rounded-[8px] shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCanonicalTop ? "border-l-[3px] border-l-[#059669] bg-[#D1FAE5]/10" : ""
                    }`}
                  >
                    {/* Left: produce thumbnail + Crate ID + RSL */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-slate-100 border border-[#E2E8F0]">
                        <img
                          src={item.thumb}
                          alt={item.produce}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/crates/${item.crateId.replace("#", "")}`}
                            className="font-mono text-xs font-bold text-[#064E3B] hover:underline"
                          >
                            {item.crateId}
                          </Link>
                          {isCanonicalTop && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-[#D1FAE5] text-[#064E3B] rounded border border-[#10B981]/40">
                              CANONICAL
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#475569] font-medium truncate max-w-[200px]">
                          {item.produce}
                        </div>

                        <div className="font-mono text-[11px] text-[#059669] font-medium">
                          RSL: {item.rsl}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Action taken colored pill + Confidence pill */}
                    <div className="flex flex-wrap items-center gap-2 sm:justify-center">
                      {/* Action Pill */}
                      {item.actionColor === "amber" && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] ${
                          item.isNew ? "animate-pulse" : ""
                        }`}>
                          {item.action}
                        </span>
                      )}
                      {item.actionColor === "mint" && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30 ${
                          item.isNew ? "animate-pulse" : ""
                        }`}>
                          {item.action}
                        </span>
                      )}
                      {item.actionColor === "green" && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 ${
                          item.isNew ? "animate-pulse" : ""
                        }`}>
                          {item.action}
                        </span>
                      )}
                      {item.actionColor === "slate" && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 ${
                          item.isNew ? "animate-pulse" : ""
                        }`}>
                          {item.action}
                        </span>
                      )}
                      {item.actionColor === "peach" && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200 ${
                          item.isNew ? "animate-pulse" : ""
                        }`}>
                          {item.action}
                        </span>
                      )}

                      {/* Confidence Pill */}
                      {item.confidenceTier === "high" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B]">
                          {item.confidence}
                        </span>
                      )}
                      {item.confidenceTier === "medium" && (
                        approvedIds.includes(item.id) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/40">
                            <Check className="w-3 h-3 text-[#059669]" />
                            <span>Approved by Priya R.</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApprove(item.id, item.produce)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#059669] hover:bg-[#047857] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Approve (Priya R.)</span>
                          </button>
                        )
                      )}
                      {item.confidenceTier === "low" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-[#475569] bg-slate-100">
                          {item.confidence}
                        </span>
                      )}
                    </div>

                    {/* Right: Money recovered in mono green bold + Timestamp in mono slate */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 font-mono">
                      <div className="text-sm sm:text-base font-bold text-[#059669]">
                        {item.recovered}
                      </div>
                      <div className="text-[11px] text-[#475569] flex items-center gap-1">
                        <Clock strokeWidth={1.5} className="w-3 h-3 text-[#94A3B8]" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom of card: green ghost link */}
            <div className="pt-2 text-center sm:text-left">
              <Link
                href="/store"
                className="text-xs font-semibold text-[#059669] hover:underline inline-flex items-center gap-1"
              >
                <span>View all 47 actions this week →</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT 30% — Decision Gates (vertical stack of 3 cards)
             ========================================================================= */}
          <div className="w-full lg:w-[30%] space-y-4">
            
            {/* Card 1 — Confidence gates (white surface, soft shadow, 1px hairline) */}
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
                <h3 className="text-[14px] font-semibold text-[#064E3B]">
                  Decision engine · confidence gates
                </h3>
              </div>

              {/* Three threshold logic rows */}
              <div className="space-y-3 text-xs">
                {/* Row 1: ≥ 70% confidence → auto-fire */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#064E3B] font-medium">
                    <span className="flex items-center gap-1">
                      <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                      ≥ 70% confidence → auto-fire
                    </span>
                    <span className="font-mono text-[10px] font-bold bg-[#D1FAE5] px-1.5 py-0.2 rounded text-[#064E3B]">
                      AUTO
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>

                {/* Row 2: 50-70% → one-tap human approval */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#B45309] font-medium">
                    <span>50-70% → one-tap human approval</span>
                    <span className="font-mono text-[10px] font-bold bg-amber-50 px-1.5 py-0.2 rounded text-amber-700 border border-amber-200">
                      HUMAN
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: "62%" }} />
                  </div>
                </div>

                {/* Row 3: < 50% → flag for review */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#475569] font-medium">
                    <span>&lt; 50% → flag for review</span>
                    <span className="font-mono text-[10px] font-bold bg-slate-100 px-1.5 py-0.2 rounded text-slate-700">
                      REVIEW
                    </span>
                  </div>
                  <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#94A3B8] h-full rounded-full" style={{ width: "35%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Action types distribution (horizontal stacked bar chart) */}
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-3">
              <h3 className="text-[14px] font-semibold text-[#064E3B]">
                Actions by type · this week
              </h3>

              {/* Horizontal stacked bar: 5 segments */}
              <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
                {/* Markdown 48% amber */}
                <div style={{ width: "48%" }} className="bg-[#F59E0B] h-full" title="Markdown 48%" />
                {/* FEFO re-sort 22% mint */}
                <div style={{ width: "22%" }} className="bg-[#10B981] h-full" title="FEFO re-sort 22%" />
                {/* Donation 14% green tint */}
                <div style={{ width: "14%" }} className="bg-[#059669] h-full" title="Donation 14%" />
                {/* Vendor claims 10% slate */}
                <div style={{ width: "10%" }} className="bg-[#475569] h-full" title="Vendor claims 10%" />
                {/* Bundle 6% peach */}
                <div style={{ width: "6%" }} className="bg-[#FB923C] h-full" title="Bundle 6%" />
              </div>

              {/* Legend with percentages */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#475569] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span>Markdown 48%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span>FEFO re-sort 22%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                  <span>Donation 14%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#475569]" />
                  <span>Vendor claim 10%</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C]" />
                  <span>Bundle deals 6%</span>
                </div>
              </div>
            </div>

            {/* Card 3 — Live action bus (streaming real-time integrations) */}
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
                <h3 className="text-[14px] font-semibold text-[#064E3B] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
                  <span>Action bus · live</span>
                </h3>
                <span className="text-[10px] font-mono text-[#10B981] font-bold">ZIGBEE + API</span>
              </div>

              {/* 3 status rows showing integrations firing in real-time */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#064E3B]">
                  <span>ESL price tags — 4 updates fired</span>
                  <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <div className="flex items-center justify-between text-[#064E3B]">
                  <span>Donation API — 1 pickup scheduled</span>
                  <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
                <div className="flex items-center justify-between text-[#064E3B]">
                  <span>WMS re-sort — 2 crates moved</span>
                  <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
              </div>

              {/* Streaming line at bottom in mono mint */}
              <div className="p-2 rounded bg-[#0B1220] text-[#10B981] font-mono text-[11px] truncate shadow-inner">
                {streamingLog}
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
            only numbers leave the store · no video, no faces · 48-hr onboarding · scales to 10,000+ stores
          </span>
        </div>
      </footer>
    </div>
  );
}
