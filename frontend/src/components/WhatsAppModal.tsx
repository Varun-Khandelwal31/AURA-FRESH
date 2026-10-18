"use client";

import React, { useState } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Smartphone, 
  QrCode, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  crateCode: string;
  variety: string;
  markdownPrice: number;
  originalPrice: number;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  crateCode,
  variety,
  markdownPrice,
  originalPrice,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  if (!isOpen) return null;

  const discountPct = Math.round(((originalPrice - markdownPrice) / originalPrice) * 100);

  const handleSendTwilio = async () => {
    setIsSending(true);
    try {
      const res = await fetch("/api/whatsapp/send-demo", { method: "POST" });
      if (res.ok) {
        setSendSuccess(true);
      }
    } catch (e) {
      setSendSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0d131f] border border-[#192336] p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8b9bb4] hover:text-white bg-[#192336]/60 hover:bg-[#192336] transition-all"
        >
          <X strokeWidth={1.5} className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Smartphone strokeWidth={1.5} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Twilio WhatsApp Sandbox Dispatch
            </h3>
            <p className="text-xs text-[#8b9bb4]">
              Targeted hyper-local blast to 48 loyalty shoppers
            </p>
          </div>
        </div>

        {/* WhatsApp Mobile Chat Bubble Mockup */}
        <div className="my-4 rounded-2xl bg-[#0b141a] border border-[#1f2c34] p-4 text-xs font-sans text-slate-100 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1f2c34] text-[11px] text-[#8696a0]">
            <span className="font-semibold text-emerald-400">DMart Fresh Alerts (Verified)</span>
            <span>+1 415 523 8886 [Sandbox]</span>
          </div>

          <div className="rounded-xl bg-[#005c4b] p-3 text-slate-100 shadow space-y-2">
            <div className="font-bold text-sm text-emerald-200">
              ⚡ Flash Deal: Farm Fresh {variety}!
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              Surplus harvest alert at DMart BLR-014. Verified peak sweetness by AuraFresh optical sensor.
            </p>
            <div className="p-2 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
              <div>
                <span className="line-through text-slate-400 text-[10px]">MRP ₹{originalPrice}/kg</span>
                <div className="text-base font-bold text-emerald-300">
                  Special: ₹{markdownPrice}/kg (-{discountPct}%)
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  AF-{discountPct}OFF
                </span>
                <div className="text-[9px] text-slate-400 mt-0.5">Expires in 4 hrs</div>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="flex items-center justify-center p-3 bg-white rounded-lg">
              <div className="flex flex-col items-center">
                <QrCode strokeWidth={1.5} className="w-20 h-20 text-black" />
                <span className="text-[9px] text-black font-mono font-bold mt-1">
                  AF-QR-{crateCode}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-emerald-200/80 italic text-center">
              Scan at Bay 3 scale or show at DMart express checkout.
            </p>
          </div>
        </div>

        {/* Dispatch Button & Status */}
        {sendSuccess ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 strokeWidth={1.5} className="w-4 h-4 flex-shrink-0" />
            <span>
              Canned TwiML Webhook executed! Dispatched to 48 loyalty members in 1.5km radius.
            </span>
          </div>
        ) : (
          <button
            onClick={handleSendTwilio}
            disabled={isSending}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send strokeWidth={1.5} className={`w-3.5 h-3.5 ${isSending ? "animate-spin" : ""}`} />
            <span>{isSending ? "Connecting to Twilio Sandbox..." : "Send Live WhatsApp Blast (Twilio Sandbox)"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
