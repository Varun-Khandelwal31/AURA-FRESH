"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Crate, ClosedLoopAction } from "../lib/types";
import { 
  Zap, 
  Tag, 
  ArrowRightLeft, 
  QrCode, 
  HeartHandshake, 
  FileSpreadsheet, 
  BadgeCheck, 
  AlertCircle, 
  Clock, 
  Wifi,
  Sparkles
} from "lucide-react";

interface ClosedLoopActionPanelProps {
  crate: Crate;
  actions: ClosedLoopAction[];
  onFireAction: (actionType: string, customPrice?: number) => Promise<void>;
  onOpenWhatsApp: () => void;
  isActionLoading: boolean;
}

export const ClosedLoopActionPanel: React.FC<ClosedLoopActionPanelProps> = ({
  crate,
  actions,
  onFireAction,
  onOpenWhatsApp,
  isActionLoading,
}) => {
  const [customMarkdownPrice, setCustomMarkdownPrice] = useState<number>(crate.markdown_price_inr);
  const [eslTagPulse, setEslTagPulse] = useState<boolean>(false);

  const isAutoFireEligible = crate.confidence >= 0.70;
  const isHumanReviewRequired = crate.confidence >= 0.50 && crate.confidence < 0.70;

  const handleExecute = async (type: string) => {
    setEslTagPulse(true);
    await onFireAction(type, customMarkdownPrice);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10B981", "#059669", "#F59E0B"],
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setEslTagPulse(false), 2000);
  };

  return (
    <div className="w-full aurafresh-card p-5">
      {/* Header with Secondary Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-[#D1FAE5] text-[#059669] border border-[#10B981]/30">
              <Zap strokeWidth={1.5} className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#064E3B]">
              Closed-Loop Autonomous Action Suite
            </h3>
          </div>
          <p className="text-xs text-[#059669] font-medium mt-0.5">
            "Not another dashboard. Confidence + action."
          </p>
        </div>

        {/* Confidence Tier Pill */}
        {isAutoFireEligible ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/40">
            <BadgeCheck strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
            <span className="font-mono">AUTO-FIRE ACTIVE ({(crate.confidence * 100).toFixed(0)}% ≥ 70%)</span>
          </div>
        ) : isHumanReviewRequired ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#F59E0B] border border-amber-200">
            <AlertCircle strokeWidth={1.5} className="w-4 h-4" />
            <span className="font-mono">HUMAN REVIEW REQUIRED ({(crate.confidence * 100).toFixed(0)}%)</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
            <span className="font-mono">MONITORING (&lt; 50%)</span>
          </div>
        )}
      </div>

      {/* Electronic Shelf Label (ESL) Hardware Simulation */}
      <div className="mt-5 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <div className="flex items-center justify-between text-xs text-[#475569] mb-3">
          <div className="flex items-center gap-2">
            <Wifi strokeWidth={1.5} className="w-4 h-4 text-[#059669] animate-pulse" />
            <span className="font-mono font-medium text-[#064E3B]">
              ESL HARDWARE: {crate.shelf_tag} (Aisle 02 Zigbee Gateway)
            </span>
          </div>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded text-[#059669] border border-[#E2E8F0] font-mono font-bold">
            LATENCY: 142ms
          </span>
        </div>

        {/* Realistic E-Ink Style Price Tag Preview */}
        <div className={`p-4 rounded-md bg-white border border-[#CBD5E1] text-[#064E3B] transition-all duration-300 shadow-sm ${eslTagPulse ? "ring-2 ring-[#10B981] scale-[1.01]" : ""}`}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                DMART FRESH — {crate.aisle_location}
              </span>
              <h4 className="text-sm font-extrabold text-[#064E3B] tracking-tight">
                {crate.variety}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#475569] font-semibold">TAG: {crate.shelf_tag}</span>
              <div className="text-[10px] font-bold text-white bg-[#059669] px-2 py-0.5 rounded mt-0.5 font-mono">
                SAVE {Math.round(((crate.current_price_inr - crate.markdown_price_inr) / crate.current_price_inr) * 100)}% TODAY
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between border-t border-[#E2E8F0] pt-2">
            <div>
              <span className="text-xs text-[#94A3B8] line-through mr-2 font-mono">
                MRP ₹{crate.current_price_inr}
              </span>
              <span className="text-3xl font-black text-[#064E3B] font-mono tracking-tight">
                ₹{crate.markdown_price_inr}
              </span>
              <span className="text-xs font-bold text-[#475569] ml-1">/kg</span>
            </div>

            <div className="text-right text-[10px] text-[#475569] font-mono">
              <div>LOT: {crate.batch_lot}</div>
              <div className="text-[#059669] font-semibold">Sensor Verified Fresh</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Closed-Loop Action Triggers */}
      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-3">
          Available Closed-Loop Dispatch Actions
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {/* Action 1: ESL Markdown */}
          <button
            onClick={() => handleExecute("ESL_MARKDOWN")}
            disabled={isActionLoading}
            className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#10B981] hover:bg-white text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-[#059669] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <Tag strokeWidth={1.5} className="w-3.5 h-3.5" />
                ESL Markdown
              </span>
              <span className="text-[10px] font-mono bg-[#D1FAE5] px-1.5 py-0.2 rounded text-[#064E3B]">33% OFF</span>
            </div>
            <p className="text-[11px] text-[#475569]">
              Push ₹{crate.markdown_price_inr}/kg to shelf tag {crate.shelf_tag} via Zigbee gateway.
            </p>
          </button>

          {/* Action 2: FEFO Re-sort */}
          <button
            onClick={() => handleExecute("FEFO_RESORT")}
            disabled={isActionLoading}
            className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-white text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-[#064E3B] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <ArrowRightLeft strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
                FEFO Floor Re-sort
              </span>
              <span className="text-[10px] font-mono bg-[#F1F5F9] px-1.5 py-0.2 rounded text-[#475569]">Task</span>
            </div>
            <p className="text-[11px] text-[#475569]">
              Dispatch associate task to rotate crate to front display tier.
            </p>
          </button>

          {/* Action 3: WhatsApp QR Flash Coupon */}
          <button
            onClick={onOpenWhatsApp}
            className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#F59E0B] hover:bg-white text-left transition-all group"
          >
            <div className="flex items-center justify-between text-xs text-[#F59E0B] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <QrCode strokeWidth={1.5} className="w-3.5 h-3.5" />
                WhatsApp Flash Deal
              </span>
              <span className="text-[10px] font-mono bg-amber-50 px-1.5 py-0.2 rounded text-amber-700">Twilio</span>
            </div>
            <p className="text-[11px] text-[#475569]">
              Broadcast dynamic QR coupon to 48 nearby loyalty members within 1.5km.
            </p>
          </button>

          {/* Action 4: Donation Pickup */}
          <button
            onClick={() => handleExecute("DONATION_PICKUP")}
            disabled={isActionLoading}
            className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#EF4444] hover:bg-white text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-[#EF4444] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <HeartHandshake strokeWidth={1.5} className="w-3.5 h-3.5" />
                Donation Dispatch
              </span>
              <span className="text-[10px] font-mono bg-rose-50 px-1.5 py-0.2 rounded text-rose-700">NGO</span>
            </div>
            <p className="text-[11px] text-[#475569]">
              Dispatch surplus to Feeding India / Robin Hood Army before spoilage.
            </p>
          </button>

          {/* Action 5: Vendor Debit Claim */}
          <button
            onClick={() => handleExecute("VENDOR_CLAIM")}
            disabled={isActionLoading}
            className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#064E3B] hover:bg-white text-left transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between text-xs text-[#064E3B] font-bold mb-1">
              <span className="flex items-center gap-1.5">
                <FileSpreadsheet strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
                Vendor Debit Claim
              </span>
              <span className="text-[10px] font-mono bg-[#F1F5F9] px-1.5 py-0.2 rounded text-[#475569]">Claim</span>
            </div>
            <p className="text-[11px] text-[#475569]">
              Generate cold-chain breach invoice deduction citing degree-hours.
            </p>
          </button>
        </div>
      </div>

      {/* Action Execution History Log */}
      <div className="mt-5 pt-4 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
            <Clock strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            Action Ledger ({actions.length} Triggered)
          </span>
          <span className="text-[10px] font-mono text-[#059669] font-bold">
            Total Diverted: {actions.reduce((acc, a) => acc + a.diverted_food_kg, 0).toFixed(1)} kg
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {actions.length === 0 ? (
            <div className="text-xs text-[#94A3B8] text-center py-4">
              No actions triggered yet for this crate. Click an action above to dispatch.
            </div>
          ) : (
            actions.map((act) => (
              <div
                key={act.id}
                className="p-2.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-start justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#064E3B]">{act.action_type}</span>
                    <span className="text-[10px] text-[#064E3B] font-mono bg-[#D1FAE5] px-1.5 py-0.2 rounded font-semibold border border-[#10B981]/30">
                      {act.status}
                    </span>
                    <span className="text-[10px] text-[#475569]">
                      {act.trigger_rule}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] mt-0.5">{act.summary}</p>
                </div>

                <div className="text-right flex-shrink-0 ml-3">
                  <div className="font-mono text-[#059669] font-bold">
                    +₹{act.recovered_value_inr.toFixed(0)}
                  </div>
                  <div className="text-[10px] text-[#475569] font-mono">
                    {act.diverted_food_kg} kg saved
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
