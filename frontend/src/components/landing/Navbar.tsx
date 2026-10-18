"use client";

import React from "react";
import Link from "next/link";
import { Eye, ArrowRight, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="floating-glass-nav px-5 py-3 flex items-center justify-between">
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
        <nav className="hidden md:flex items-center gap-7 text-sm text-[#475569] font-medium">
          <Link href="/crates/AF-CRATE-0481" className="hover:text-[#064E3B] transition-colors">
            Product
          </Link>
          <Link href="/invisible-window" className="hover:text-[#064E3B] transition-colors">
            How it works
          </Link>
          <Link href="/store" className="hover:text-[#064E3B] transition-colors">
            For stores
          </Link>
          <Link href="/vendor" className="hover:text-[#064E3B] transition-colors">
            For vendors
          </Link>
          <Link href="/actions" className="hover:text-[#064E3B] transition-colors">
            Docs
          </Link>
        </nav>

        {/* RIGHT: ghost "Sign in" + filled green "Book a demo" */}
        <div className="flex items-center gap-3">
          <Link
            href="/store"
            className="text-sm font-medium text-[#475569] hover:text-[#064E3B] px-3 py-1.5 transition-colors hidden sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="/store"
            className="btn-3d-green text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 active:scale-95"
          >
            <span>Book a demo</span>
            <ArrowRight strokeWidth={1.5} className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
