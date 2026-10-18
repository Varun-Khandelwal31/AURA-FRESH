"use client";

import React from "react";

export const StatStrip: React.FC = () => {
  const stats = [
    { number: "₹1-1.7 cr", label: "recovered per store/year" },
    { number: "1-3 days", label: "invisible window" },
    { number: "8-10%", label: "of global GHG cut" },
    { number: "10,000+", label: "stores scalable" },
  ];

  return (
    <div className="w-full border-t border-[#E2E8F0] bg-transparent py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`py-4 sm:py-0 px-4 sm:px-6 flex flex-col justify-center ${
                idx === 0 ? "sm:pl-0" : ""
              } ${idx === stats.length - 1 ? "sm:pr-0" : ""}`}
            >
              <div className="text-3xl sm:text-[36px] font-bold text-[#059669] font-sans tracking-tight leading-none">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-[#475569] mt-1.5 font-medium">
                · {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
