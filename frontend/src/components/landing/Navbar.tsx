"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, ArrowRight, Sparkles, Award, Menu, X, Store, Layers, Activity, Smartphone, Truck } from "lucide-react";
import { TechfestJudgeModal } from "../TechfestJudgeModal";

export const Navbar: React.FC = () => {
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="floating-glass-nav px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-lg">
          {/* LEFT: small 3D-feel AuraFresh mark + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center shadow-[0_4px_10px_rgba(5,150,105,0.35),0_1px_0_rgba(255,255,255,0.4)_inset] group-hover:scale-105 transition-transform">
              <Eye strokeWidth={1.5} className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#064E3B] font-sans">
              Aura<span className="text-[#059669]">Fresh</span>
            </span>
          </Link>

          {/* CENTER-RIGHT: nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-[#475569] font-medium">
            <Link href="/crates/AF-CRATE-0481" className="hover:text-[#064E3B] transition-colors">
              Product & CV
            </Link>
            <Link href="/invisible-window" className="hover:text-[#064E3B] transition-colors">
              How it works
            </Link>
            <Link href="/store" className="hover:text-[#064E3B] transition-colors">
              Store Hub
            </Link>
            <Link href="/actions" className="hover:text-[#064E3B] transition-colors">
              Action Center
            </Link>
            <Link href="/kirana" className="hover:text-[#064E3B] transition-colors">
              Kirana Network
            </Link>
            <Link href="/vendor" className="hover:text-[#064E3B] transition-colors">
              Vendors
            </Link>
          </nav>

          {/* RIGHT: Judge Dossier button + Demo CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* IITB Techfest Judge Button */}
            <button
              onClick={() => setIsJudgeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/30 transition-all active:scale-95 shadow-sm"
              title="Open IIT Bombay Techfest Evaluation Dossier"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xs:inline">Judge Dossier</span>
            </button>

            <Link
              href="/store"
              className="btn-3d-green text-white text-xs font-semibold px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-1.5 active:scale-95"
            >
              <span>Live Console</span>
              <ArrowRight strokeWidth={1.5} className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#064E3B] hover:bg-emerald-500/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E2E8F0] shadow-2xl animate-fade-in space-y-2">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#059669] px-2 py-1">
              AuraFresh Modules
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/crates/AF-CRATE-0481"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Eye className="w-4 h-4 text-[#059669]" />
                <span>Optical Crate Lab</span>
              </Link>

              <Link
                href="/store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Store className="w-4 h-4 text-[#059669]" />
                <span>Store Hub</span>
              </Link>

              <Link
                href="/actions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Layers className="w-4 h-4 text-[#059669]" />
                <span>Action Center</span>
              </Link>

              <Link
                href="/invisible-window"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Activity className="w-4 h-4 text-[#059669]" />
                <span>3D Window</span>
              </Link>

              <Link
                href="/kirana"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Smartphone className="w-4 h-4 text-[#059669]" />
                <span>Kirana B2B</span>
              </Link>

              <Link
                href="/vendor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-[#064E3B] transition-colors"
              >
                <Truck className="w-4 h-4 text-[#059669]" />
                <span>Vendor Portal</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsJudgeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/15 text-amber-900 border border-amber-500/30 font-bold text-xs"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>Open IITB Judge Dossier & Science Math</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Techfest Judge Verification Modal */}
      <TechfestJudgeModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
      />
    </>
  );
};

