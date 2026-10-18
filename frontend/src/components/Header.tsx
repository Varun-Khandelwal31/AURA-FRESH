"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Eye, 
  RotateCcw, 
  Store, 
  BadgeCheck,
  Zap,
  Clock,
  Smartphone,
  Truck,
  Layers,
  ArrowRight
} from "lucide-react";

interface HeaderProps {
  onResetDemo?: () => void;
  isResetting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onResetDemo,
  isResetting = false,
}) => {
  const pathname = usePathname();

  const handleReset = async () => {
    if (onResetDemo) {
      onResetDemo();
      return;
    }
    try {
      await fetch("/api/reset-demo", { method: "POST" });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { href: "/", label: "Landing" },
    { href: "/store", label: "Store Hub", badge: "P0" },
    { href: "/crates/AF-CRATE-0481", label: "RSL Prediction", badge: "Hero #1" },
    { href: "/actions", label: "Action Center", badge: "Hero #2" },
    { href: "/invisible-window", label: "Invisible Window", badge: "Hero #3" },
    { href: "/kirana", label: "Kirana List", badge: "Mobile" },
    { href: "/vendor", label: "Vendor Portal", badge: "Dock" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#D1FAE5] border border-[#10B981]/30 shadow-sm group-hover:scale-105 transition-transform">
              <Eye strokeWidth={1.5} className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#064E3B]">
                  Aura<span className="text-[#059669]">Fresh</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30 font-mono">
                  #STORE-BLR-014
                </span>
              </div>
              <p className="text-[11px] text-[#475569] hidden sm:block">
                ₹100 Reference Tile + Arrhenius Shelf-Life Kinetics
              </p>
            </div>
          </Link>

          {/* Center: Live Optical & Calib Status Pill */}
          <div className="hidden xl:flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-4 py-1 text-xs text-[#475569]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="font-mono text-[#064E3B] font-semibold">Canonical:</span>
              <span className="font-mono text-[#059669]">#AF-CRATE-0481</span>
            </div>
            <div className="h-3 w-px bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.5 font-mono">
              <span>Auto-Fire:</span>
              <span className="font-bold text-[#10B981]">≥ 70% Conf</span>
            </div>
            <div className="h-3 w-px bg-[#E2E8F0]" />
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>Chiller:</span>
              <span className="text-[#F59E0B] font-semibold">8°C (Amber)</span>
            </div>
          </div>

          {/* Right: Controls & Session Pill */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#475569] hover:text-[#064E3B] bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] shadow-sm transition-all active:scale-95 disabled:opacity-50"
              title="Reset Canonical Tomato Scenario"
            >
              <RotateCcw strokeWidth={1.5} className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* User Session Pill */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1 shadow-sm">
              <div className="w-6 h-6 rounded bg-[#D1FAE5] border border-[#10B981]/30 flex items-center justify-center text-[11px] font-bold text-[#064E3B]">
                PR
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-[#064E3B] leading-tight">
                  Priya R.
                </div>
                <div className="text-[10px] text-[#475569] font-mono leading-tight">
                  DMart BLR-014
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 border-t border-[#E2E8F0]/80 text-xs scrollbar-none">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace("/AF-CRATE-0481", ""));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#059669] text-white shadow-sm font-semibold"
                    : "text-[#475569] hover:text-[#064E3B] hover:bg-[#F1F5F9]"
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#E2E8F0] text-[#475569]"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
