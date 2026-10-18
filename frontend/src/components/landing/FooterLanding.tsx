"use client";

import React from "react";
import Link from "next/link";
import { Eye, ExternalLink, ShieldCheck, FileText, Building2, BookOpen } from "lucide-react";

export const FooterLanding: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-transparent py-5 min-h-[60px] text-xs text-[#475569]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: wordmark + tagline */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-[#064E3B] font-sans">
            <Eye strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
            <span>AuraFresh</span>
          </div>
          <span className="text-[#CBD5E1]">·</span>
          <span className="font-mono text-[12px] text-[#475569]">
            Built for India's fresh aisle
          </span>
        </div>

        {/* Right: 4 columns of small links with thin line icons */}
        <div className="flex flex-wrap items-center gap-6 text-[12px]">
          <Link
            href="/crates/AF-CRATE-0481"
            className="flex items-center gap-1 hover:text-[#064E3B] transition-colors"
          >
            <BookOpen strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>Product</span>
          </Link>

          <Link
            href="/invisible-window"
            className="flex items-center gap-1 hover:text-[#064E3B] transition-colors"
          >
            <FileText strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>Resources</span>
          </Link>

          <Link
            href="/store"
            className="flex items-center gap-1 hover:text-[#064E3B] transition-colors"
          >
            <Building2 strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>Company</span>
          </Link>

          <Link
            href="/actions"
            className="flex items-center gap-1 hover:text-[#064E3B] transition-colors"
          >
            <ShieldCheck strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
            <span>Legal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
