"use client";

import React, { useState, useEffect } from "react";
import { Radio, ShieldCheck, Zap, ArrowRight, CheckCircle2, TrendingUp, IndianRupee } from "lucide-react";
import Link from "next/link";

interface TelemetryEvent {
  id: string;
  time: string;
  aisle: string;
  crateId: string;
  produce: string;
  action: string;
  recovered: string;
  typeColor: string;
}

const INITIAL_EVENTS: TelemetryEvent[] = [
  {
    id: "e-1",
    time: "14:31:02 IST",
    aisle: "Aisle 04 (Retail Bay)",
    crateId: "#AF-CRATE-0481",
    produce: "Roma Tomatoes",
    action: "ESL price updated ₹80 → ₹56",
    recovered: "+₹640",
    typeColor: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "e-2",
    time: "14:28:45 IST",
    aisle: "Chilled Island",
    crateId: "#AF-CRATE-0312",
    produce: "Indian Palak",
    action: "WhatsApp coupon blast sent to 32 kiranas",
    recovered: "+₹280",
    typeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  {
    id: "e-3",
    time: "14:24:10 IST",
    aisle: "Bay 02 Chiller",
    crateId: "#AF-CRATE-0199",
    produce: "Robusta Banana",
    action: "FEFO front-shelf re-sort task assigned",
    recovered: "+₹380",
    typeColor: "bg-blue-100 text-blue-900 border-blue-300",
  },
  {
    id: "e-4",
    time: "14:18:22 IST",
    aisle: "Chilled Island",
    crateId: "#AF-CRATE-0618",
    produce: "Coriander Leaves",
    action: "Feeding India pickup route #FD-882 scheduled",
    recovered: "+₹520",
    typeColor: "bg-purple-100 text-purple-900 border-purple-300",
  },
];

export const LiveTelemetrySection: React.FC = () => {
  const [events, setEvents] = useState<TelemetryEvent[]>(INITIAL_EVENTS);
  const [totalRecoveredToday, setTotalRecoveredToday] = useState<number>(4820);

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} IST`;
      
      const newEvent: TelemetryEvent = {
        id: `live-ev-${Date.now()}`,
        time: timeStr,
        aisle: "Aisle 04",
        crateId: `#AF-CRATE-${Math.floor(100 + Math.random() * 900)}`,
        produce: ["Roma Tomatoes", "Robusta Banana", "Shimla Capsicum", "Nagpur Oranges"][Math.floor(Math.random() * 4)],
        action: "Autonomous shelf action verified",
        recovered: `+₹${Math.floor(200 + Math.random() * 450)}`,
        typeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 3)]);
      setTotalRecoveredToday((prev) => prev + Math.floor(100 + Math.random() * 200));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0]/80">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E2E8F0] shadow-xs">
          <Radio className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#059669] tracking-wide uppercase">
            Live DMart BLR-014 Telemetry
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#064E3B] tracking-tight">
          Watching the fresh-aisle in real time
        </h2>

        <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
          Zero latency closed-loop automation: every shelf anomaly detected is met with an immediate autonomous commercial response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT 5 cols: Live Store Counters & Privacy Guarantee */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-md space-y-4">
            <div className="text-xs font-mono font-bold text-[#475569] uppercase flex items-center justify-between">
              <span>STORE TELEMETRY · DMART BLR-014</span>
              <span className="text-[#059669] font-bold">ONLINE ●</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#D1FAE5]/30 border border-[#10B981]/30">
              <div className="text-xs text-[#475569] font-medium font-sans">
                Value Recovered Today
              </div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#064E3B] tracking-tight mt-1">
                ₹{totalRecoveredToday.toLocaleString("en-IN")}
              </div>
              <div className="text-xs font-mono text-[#059669] font-semibold mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>12 actions auto-fired · 0 manual intervention</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div className="text-[#94A3B8]">Crates Scanned</div>
                <div className="text-xl font-bold text-[#064E3B] mt-0.5">84 crates</div>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                <div className="text-[#94A3B8]">Landfill Diverted</div>
                <div className="text-xl font-bold text-[#10B981] mt-0.5">12 kg today</div>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Pill Card */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#064E3B]">
              <ShieldCheck className="w-5 h-5 text-[#059669]" />
              <span>PRIVACY-BY-ARCHITECTURE GUARANTEE</span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed font-sans">
              No customer video streams leave the local store premises. The on-prem Edge Box computes drift matrices locally and only transmits metadata strings and scalar numbers.
            </p>
          </div>
        </div>

        {/* RIGHT 7 cols: Live Streaming Action Bus */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
                  <h3 className="text-sm font-bold font-mono text-[#064E3B]">
                    LIVE ACTION BUS STREAM (DISPATCHED)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  ZIGBEE · WHATSAPP · ERP
                </span>
              </div>

              {/* Event Stream List */}
              <div className="mt-4 space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all hover:bg-slate-50"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-[#064E3B]">{ev.crateId}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[#475569]">{ev.produce}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[#94A3B8] text-[10px]">{ev.time}</span>
                      </div>
                      <div className="text-xs font-medium text-[#475569] font-sans">
                        {ev.action}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-xs font-mono font-bold text-[#059669]">
                        {ev.recovered}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-mono">
                Store ID: #STORE-BLR-014 (DMart Kanakapura)
              </span>
              <Link
                href="/store"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] hover:underline"
              >
                <span>Launch Store Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
