"use client";

import React from "react";
import Link from "next/link";
import { 
  Store, 
  Eye, 
  Zap, 
  Truck, 
  BarChart3, 
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

const MODULES = [
  {
    title: "Store Console",
    path: "/store",
    badge: "Live Fleet",
    description: "Multi-crate bay monitoring with simulated +4.6°C chiller anomaly spikes.",
    icon: Store,
    color: "from-emerald-500/10 to-teal-500/10",
    border: "hover:border-emerald-500/40",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Crate RSL Inspector",
    path: "/crates/AF-CRATE-0481",
    badge: "Real CV Upload",
    description: "Macbeth tile calibration, Gabor texture drift, and 10-day Recharts decay curves.",
    icon: Eye,
    color: "from-blue-500/10 to-indigo-500/10",
    border: "hover:border-blue-500/40",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Action Center",
    path: "/actions",
    badge: "Closed-Loop Bus",
    description: "Real-time action stream with ≥70% auto-fire gates and human-in-the-loop approvals.",
    icon: Zap,
    color: "from-amber-500/10 to-orange-500/10",
    border: "hover:border-amber-500/40",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    title: "Kirana B2B Liquidation",
    path: "/kirana",
    badge: "2-Hour Window",
    description: "Hyperlocal B2B wholesale redistribution network for crates at 1.5–2.5 day RSL.",
    icon: Truck,
    color: "from-purple-500/10 to-pink-500/10",
    border: "hover:border-purple-500/40",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

export function LiveModulesGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Explore Live AuraFresh Modules
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Every screen connects to real edge vision models, physical kinetics, and automated retail dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MODULES.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.path}
              href={m.path}
              className={`group p-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${m.border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-slate-800`}>
                  <Icon className="w-5 h-5 text-slate-700 group-hover:text-emerald-600 transition-colors" />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${m.badgeColor}`}>
                  {m.badge}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                  {m.title}
                </h4>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">
                {m.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
