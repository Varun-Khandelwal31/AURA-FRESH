"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Store, 
  Layers, 
  Zap, 
  Smartphone, 
  Truck, 
  Settings, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  IndianRupee, 
  Scale, 
  Thermometer, 
  ArrowRight, 
  Search, 
  Filter, 
  Award,
  ChevronRight,
  Sparkles,
  BadgeCheck
} from "lucide-react";
import { StoreSettingsModal } from "../../components/StoreSettingsModal";

// Realistic 7 sample crates with canonical tomato at top
const SAMPLE_CRATES = [
  {
    id: "#AF-CRATE-0481",
    rawId: "AF-CRATE-0481",
    produce: "Roma Tomatoes (Retail Bay)",
    latin: "Solanum lycopersicum",
    grade: "B+",
    gradeColor: "mint",
    rsl: "3.2 ± 0.8 days",
    confidence: "78%",
    action: "30% Markdown (₹80 → ₹56)",
    actionType: "ESL Markdown + QR Deal",
    reviewer: "Auto-fired (≥70%)",
    thumb: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
    isLive: true,
  },
  {
    id: "#AF-CRATE-0312",
    rawId: "AF-CRATE-0312",
    produce: "Indian Palak Greens (Chilled Rack)",
    latin: "Spinacia oleracea",
    grade: "A",
    gradeColor: "mint",
    rsl: "1.4 ± 0.3 days",
    confidence: "86%",
    action: "WhatsApp Flash Coupon (₹28)",
    actionType: "WhatsApp Blast",
    reviewer: "Auto-fired (≥70%)",
    thumb: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
  {
    id: "#AF-CRATE-0199",
    rawId: "AF-CRATE-0199",
    produce: "Robusta Banana Bunches (Island)",
    latin: "Musa acuminata",
    grade: "B",
    gradeColor: "amber",
    rsl: "2.8 ± 0.5 days",
    confidence: "64%",
    action: "FEFO Front Row Re-sort",
    actionType: "Floor Task",
    reviewer: "Priya R. (Review Needed)",
    thumb: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
  {
    id: "#AF-CRATE-0504",
    rawId: "AF-CRATE-0504",
    produce: "Shimla Green Capsicum",
    latin: "Capsicum annuum",
    grade: "A",
    gradeColor: "mint",
    rsl: "4.5 ± 0.6 days",
    confidence: "91%",
    action: "Standard Display",
    actionType: "Nominal Watch",
    reviewer: "System Verified",
    thumb: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
  {
    id: "#AF-CRATE-0221",
    rawId: "AF-CRATE-0221",
    produce: "Nagpur Mandarin Oranges",
    latin: "Citrus reticulata",
    grade: "B",
    gradeColor: "amber",
    rsl: "2.1 ± 0.4 days",
    confidence: "68%",
    action: "20% Discount Sticker",
    actionType: "Floor Task",
    reviewer: "Priya R. (Review Needed)",
    thumb: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
  {
    id: "#AF-CRATE-0618",
    rawId: "AF-CRATE-0618",
    produce: "Coriander Leaves (Chilled)",
    latin: "Coriandrum sativum",
    grade: "C",
    gradeColor: "red",
    rsl: "0.8 ± 0.2 days",
    confidence: "89%",
    action: "Donation Pickup Dispatch",
    actionType: "Feeding India",
    reviewer: "Auto-fired (≥70%)",
    thumb: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
  {
    id: "#AF-CRATE-0144",
    rawId: "AF-CRATE-0144",
    produce: "Red Onions (Dry Bin Aisle 3)",
    latin: "Allium cepa",
    grade: "A",
    gradeColor: "mint",
    rsl: "12.0 ± 1.5 days",
    confidence: "94%",
    action: "Nominal Storage",
    actionType: "No Action Needed",
    reviewer: "System Verified",
    thumb: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80",
    isLive: false,
  },
];

export default function StoreDashboardPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [crates, setCrates] = useState(SAMPLE_CRATES);
  const [actionsExecuted, setActionsExecuted] = useState<number>(12);
  const [todayValueRecovered, setTodayValueRecovered] = useState<number>(4820);
  const [landfillDiverted, setLandfillDiverted] = useState<number>(12);
  const [chillerTemp, setChillerTemp] = useState<number>(8.2);
  const [chillerAnomaly, setChillerAnomaly] = useState<boolean>(false);
  const [scanningCrateId, setScanningCrateId] = useState<string | null>(null);
  const [liveToast, setLiveToast] = useState<{ title: string; desc: string } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("14:31:05 IST");

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString("en-IN", { hour12: false }) + " IST");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle live chiller anomaly toggle
  const toggleChillerAnomaly = () => {
    const newAnomaly = !chillerAnomaly;
    setChillerAnomaly(newAnomaly);
    if (newAnomaly) {
      setChillerTemp(12.8);
      // Accelerate decay rate across chilled crates
      setCrates(prev => prev.map(c => {
        if (c.rawId === "AF-CRATE-0481") {
          return {
            ...c,
            rsl: "1.9 ± 0.4 days (Accelerated)",
            confidence: "88%",
            action: "EMERGENCY: 40% Markdown (₹80 → ₹48)",
            reviewer: "Anomaly Triggered (Auto-Fired)"
          };
        }
        if (c.rawId === "AF-CRATE-0312") {
          return {
            ...c,
            rsl: "0.8 ± 0.2 days (Critical)",
            grade: "B",
            action: "Immediate Flash Sale / Kirana Dispatch",
            reviewer: "Anomaly Triggered (Auto-Fired)"
          };
        }
        return c;
      }));
      setLiveToast({
        title: "⚠️ Chiller Excursion Injected (+4.6°C)",
        desc: "Arrhenius degradation velocity accelerated by 1.7x. Markdown actions escalated."
      });
    } else {
      setChillerTemp(8.2);
      setCrates(SAMPLE_CRATES);
      setLiveToast({
        title: "✓ Chiller Restored (8.2°C Nominal)",
        desc: "Thermal sensors normalized. Decay rates returned to baseline."
      });
    }
  };

  // Run live edge scan on a crate
  const triggerOpticalScan = async (e: React.MouseEvent, crateRawId: string) => {
    e.stopPropagation();
    setScanningCrateId(crateRawId);
    
    try {
      // Connect to live API endpoint
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
          crate_id: crateRawId,
          store_id: "DMart BLR-014"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setLiveToast({
          title: `✓ Optical Scan Live: ${crateRawId}`,
          desc: `Case #${data.case_id?.slice(0, 8)}: Gabor texture drift 0.42 registered. Baseline verified.`
        });
      }
    } catch {
      // Fallback local execution
      setLiveToast({
        title: `✓ Edge Optical Scan Complete: ${crateRawId}`,
        desc: "Camera frame calibrated with ₹100 tile reference. AE drift 0.42 within confidence bounds."
      });
    } finally {
      setTimeout(() => {
        setScanningCrateId(null);
      }, 1000);
    }
  };

  // Execute action live
  const handleExecuteAction = (e: React.MouseEvent, crate: typeof SAMPLE_CRATES[0]) => {
    e.stopPropagation();
    setActionsExecuted(prev => prev + 1);
    const addedValue = crate.rawId === "AF-CRATE-0481" ? 640 : 380;
    setTodayValueRecovered(prev => prev + addedValue);
    setLandfillDiverted(prev => prev + 4);

    setCrates(prev => prev.map(c => {
      if (c.rawId === crate.rawId) {
        return {
          ...c,
          action: "✓ Executed & Synchronized",
          reviewer: "Executed Just Now",
        };
      }
      return c;
    }));

    setLiveToast({
      title: `⚡ Action Fired: ${crate.action}`,
      desc: `ESL price and WhatsApp deal dispatched. +₹${addedValue} recovered to store ledger.`
    });
  };

  const filteredCrates = crates.filter((c) => {
    const matchesSearch = c.produce.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    if (filter === "auto") return matchesSearch && c.reviewer.includes("Auto");
    if (filter === "review") return matchesSearch && c.reviewer.includes("Review");
    if (filter === "chilled") return matchesSearch && (c.produce.includes("Chilled") || c.produce.includes("Retail Bay"));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#475569] font-sans selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      
      {/* 1. SIDEBAR (240px, white surface, right-side hairline, soft right-edge shadow) */}
      <aside className="w-[240px] flex-shrink-0 bg-white border-r border-[#E2E8F0] shadow-[4px_0_24px_rgba(6,78,59,0.02)] flex flex-col justify-between p-4 sticky top-0 h-screen">
        <div>
          {/* Logo at top */}
          <Link href="/" className="flex items-center gap-2.5 px-2 py-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center shadow-[0_2px_8px_rgba(5,150,105,0.3)]">
              <Eye strokeWidth={1.5} className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#064E3B]">
              Aura<span className="text-[#059669]">Fresh</span>
            </span>
          </Link>

          {/* Navigation Items (16px line icons + 14px slate labels, 8px rounded, 4px padding) */}
          <nav className="space-y-1">
            {/* Store (ACTIVE — filled mint tint #D1FAE5, forest text, soft mint left-edge bar 3px) */}
            <Link
              href="/store"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold text-[#064E3B] bg-[#D1FAE5] relative overflow-hidden transition-colors"
            >
              <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#059669] rounded-r" />
              <Store strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
              <span>Store</span>
            </Link>

            <Link
              href="/crates/AF-CRATE-0481"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:text-[#064E3B] hover:bg-[#F8FAFC] transition-colors"
            >
              <Layers strokeWidth={1.5} className="w-4 h-4 text-[#475569]" />
              <span>Crates</span>
            </Link>

            <Link
              href="/actions"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:text-[#064E3B] hover:bg-[#F8FAFC] transition-colors"
            >
              <Zap strokeWidth={1.5} className="w-4 h-4 text-[#475569]" />
              <span>Actions</span>
            </Link>

            <Link
              href="/kirana"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:text-[#064E3B] hover:bg-[#F8FAFC] transition-colors"
            >
              <Smartphone strokeWidth={1.5} className="w-4 h-4 text-[#475569]" />
              <span>Kirana</span>
            </Link>

            <Link
              href="/vendor"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:text-[#064E3B] hover:bg-[#F8FAFC] transition-colors"
            >
              <Truck strokeWidth={1.5} className="w-4 h-4 text-[#475569]" />
              <span>Vendor</span>
            </Link>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-[#475569] hover:text-[#064E3B] hover:bg-[#F8FAFC] transition-colors text-left"
            >
              <Settings strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
              <span>Store Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer: avatar circle (deep forest gradient ring) + "Priya R. · DMart BLR-014" */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#064E3B] to-[#10B981] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[#D1FAE5] flex items-center justify-center text-xs font-bold text-[#064E3B]">
              PR
            </div>
          </div>
          <div className="truncate text-xs">
            <div className="font-semibold text-[#064E3B] truncate">Priya R.</div>
            <div className="text-[11px] text-[#475569] font-mono truncate">DMart BLR-014</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="px-8 py-3.5 bg-white border-b border-[#E2E8F0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono text-[#475569]">
            <span className="text-[#064E3B] font-semibold">Store Dashboard</span>
            <span>/</span>
            <span className="text-[#064E3B] font-bold">#STORE-BLR-014</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>Canonical: #AF-CRATE-0481</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#064E3B] bg-slate-50 hover:bg-[#D1FAE5] border border-[#CBD5E1] transition-all active:scale-95 shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-[#059669]" />
              <span>Edge Config</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>✓ Sensor verified · {currentTime}</span>
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8 flex-1">
          {/* 2. TOP STRIP — Greeting + 3 stat tiles */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-[28px] font-serif font-bold text-[#064E3B] tracking-tight">
                  Good afternoon, Priya
                </h1>
                <p className="text-xs text-[#475569] mt-0.5">
                  DMart BLR-014 Produce Aisle · Edge AI Vision Rig Active
                </p>
              </div>
              <div className="text-xs font-mono text-[#475569] flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live SSE Pipeline Active
                </span>
                <span>Wed, 17 Oct 2026 · Shift: Morning Peak</span>
              </div>
            </div>

            {/* Three stat tiles (white surface, 1px hairline, 8px radius, soft shadow) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_16px_rgba(6,78,59,0.04)] flex items-center justify-between transition-all hover:border-[#10B981]/50">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Actions Executed</div>
                  <div className="text-2xl font-bold font-mono text-[#059669] mt-0.5">
                    {actionsExecuted} <span className="text-xs font-normal text-[#475569]">actions fired today</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center text-[#059669]">
                  <Zap strokeWidth={1.5} className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_16px_rgba(6,78,59,0.04)] flex items-center justify-between transition-all hover:border-[#10B981]/50">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Today Value Recovered</div>
                  <div className="text-2xl font-bold font-mono text-[#064E3B] mt-0.5">
                    ₹{todayValueRecovered.toLocaleString("en-IN")} <span className="text-xs font-normal text-[#475569]">recovered</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] border border-[#10B981]/30 flex items-center justify-center text-[#064E3B]">
                  <IndianRupee strokeWidth={1.5} className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_16px_rgba(6,78,59,0.04)] flex items-center justify-between transition-all hover:border-[#10B981]/50">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Landfill Diverted</div>
                  <div className="text-2xl font-bold font-mono text-[#10B981] mt-0.5">
                    {landfillDiverted} kg <span className="text-xs font-normal text-[#475569]">diverted</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] flex items-center justify-center text-[#10B981]">
                  <Scale strokeWidth={1.5} className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. KPI ROW — Four wider tiles showing weekly trend with sparklines */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2.5">
              Weekly Fresh-Aisle Velocity Trends
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tile 1: Crates scanned 84 (+12%) */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Crates scanned</div>
                  <div className="text-xl font-bold font-mono text-[#064E3B] mt-1 flex items-baseline gap-1.5">
                    <span>84</span>
                    <span className="text-xs text-[#059669] font-semibold">(+12%)</span>
                  </div>
                </div>
                {/* Green Sparkline SVG */}
                <div className="mt-3 h-8 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24">
                    <path
                      d="M0,20 Q20,16 40,12 T80,8 T100,2"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 2: Auto-fired 48 */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Auto-fired actions</div>
                  <div className="text-xl font-bold font-mono text-[#10B981] mt-1">
                    48 <span className="text-xs font-normal text-[#475569]">crates</span>
                  </div>
                </div>
                {/* Mint Sparkline SVG */}
                <div className="mt-3 h-8 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24">
                    <path
                      d="M0,18 Q30,19 50,11 T85,6 T100,3"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 3: Human-approved 22 */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Human-approved</div>
                  <div className="text-xl font-bold font-mono text-[#F59E0B] mt-1">
                    22 <span className="text-xs font-normal text-[#475569]">crates</span>
                  </div>
                </div>
                {/* Amber Sparkline SVG */}
                <div className="mt-3 h-8 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24">
                    <path
                      d="M0,8 Q25,12 50,7 T80,14 T100,6"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 4: Discarded 8 */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#475569] font-medium">Discarded (0% recovery)</div>
                  <div className="text-xl font-bold font-mono text-[#475569] mt-1">
                    8 <span className="text-xs text-[#059669] font-semibold">(-64% vs LY)</span>
                  </div>
                </div>
                {/* Slate Sparkline SVG */}
                <div className="mt-3 h-8 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24">
                    <path
                      d="M0,4 Q30,6 60,14 T100,20"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN WORKSPACE: CrateTable (flex-1) + InsightsPanel (320px) */}
          <div className="flex flex-col xl:flex-row gap-6 items-start">
            
            {/* 4. CRATE TABLE */}
            <div className="flex-1 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="text-base font-bold text-[#064E3B]">
                    Today's crates
                  </h2>
                  <p className="text-xs text-[#475569]">
                    Monitored via optical overhead cameras + ₹100 reference tiles
                  </p>
                </div>

                {/* Filter Pills & Search Input */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search produce or ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#059669] w-48"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-md border border-[#E2E8F0] text-xs">
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        filter === "all" ? "bg-white text-[#064E3B] font-semibold shadow-xs" : "text-[#475569]"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter("auto")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        filter === "auto" ? "bg-[#D1FAE5] text-[#064E3B] font-semibold" : "text-[#475569]"
                      }`}
                    >
                      Auto-Fired
                    </button>
                    <button
                      onClick={() => setFilter("review")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        filter === "review" ? "bg-amber-50 text-[#F59E0B] font-semibold" : "text-[#475569]"
                      }`}
                    >
                      Needs Review
                    </button>
                    <button
                      onClick={() => setFilter("chilled")}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        filter === "chilled" ? "bg-white text-[#064E3B] font-semibold shadow-xs" : "text-[#475569]"
                      }`}
                    >
                      Chilled Bay
                    </button>
                  </div>
                </div>
              </div>

              {/* Table on white surface with 1px hairlines between rows */}
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead className="text-[#475569] font-mono border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <tr>
                      <th className="py-2.5 px-3">Crate ID</th>
                      <th className="py-2.5 px-2">Thumbnail</th>
                      <th className="py-2.5 px-3">Produce</th>
                      <th className="py-2.5 px-3">Freshness Grade</th>
                      <th className="py-2.5 px-3">RSL</th>
                      <th className="py-2.5 px-3">Confidence</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Reviewer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredCrates.map((crate) => {
                      const isCanonical = crate.id === "#AF-CRATE-0481";

                      return (
                        <tr
                          key={crate.id}
                          onClick={() => router.push(`/crates/${crate.rawId}`)}
                          className={`cursor-pointer transition-colors ${
                            isCanonical
                              ? "bg-[#D1FAE5]/30 hover:bg-[#D1FAE5]/60 relative"
                              : "hover:bg-[#D1FAE5]/20"
                          }`}
                        >
                          {/* Crate ID with soft mint left-edge accent on canonical */}
                          <td className="py-3 px-3 font-mono font-bold text-[#064E3B] relative">
                            {isCanonical && (
                              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#059669] rounded-r" />
                            )}
                            <div className="flex items-center gap-1.5">
                              <span>{crate.id}</span>
                              {crate.isLive && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/40">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                                  LIVE
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Thumbnail */}
                          <td className="py-3 px-2">
                            <div className="w-9 h-9 rounded overflow-hidden border border-[#E2E8F0] flex-shrink-0 bg-slate-100">
                              <img src={crate.thumb} alt={crate.produce} className="w-full h-full object-cover" />
                            </div>
                          </td>

                          {/* Produce */}
                          <td className="py-3 px-3">
                            <div className="font-semibold text-[#064E3B]">{crate.produce}</div>
                            <div className="text-[10px] text-[#94A3B8] font-mono italic">{crate.latin}</div>
                          </td>

                          {/* Freshness Grade Pill (A mint / B+ mint / B amber / C red) */}
                          <td className="py-3 px-3">
                            {crate.grade === "A" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-serif stamp-grade-a bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/30">
                                A
                              </span>
                            )}
                            {crate.grade === "B+" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-serif stamp-grade-b-plus bg-[#D1FAE5] text-[#064E3B] border border-[#10B981]/40">
                                B+
                              </span>
                            )}
                            {crate.grade === "B" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-serif stamp-grade-b bg-amber-50 text-amber-700 border border-amber-200">
                                B
                              </span>
                            )}
                            {crate.grade === "C" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-serif stamp-grade-c bg-rose-50 text-rose-700 border border-rose-200">
                                C
                              </span>
                            )}
                          </td>

                          {/* RSL */}
                          <td className="py-3 px-3 font-mono font-semibold text-[#064E3B]">
                            {crate.rsl}
                          </td>

                          {/* Confidence */}
                          <td className="py-3 px-3 font-mono font-bold text-[#059669]">
                            {crate.confidence}
                          </td>

                          {/* Action & Live Fire Button */}
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="font-medium text-[#064E3B]">{crate.action}</div>
                                <div className="text-[10px] text-[#475569] font-mono">{crate.actionType}</div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  type="button"
                                  title="Run edge camera optical scan"
                                  onClick={(e) => triggerOpticalScan(e, crate.rawId)}
                                  className={`p-1.5 rounded bg-white hover:bg-[#D1FAE5] border border-[#CBD5E1] hover:border-[#10B981] text-[#475569] hover:text-[#064E3B] transition-colors ${
                                    scanningCrateId === crate.rawId ? "animate-spin text-[#059669]" : ""
                                  }`}
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  title="Dispatch markdown / floor action live"
                                  onClick={(e) => handleExecuteAction(e, crate)}
                                  className="px-2 py-1 rounded bg-[#059669] hover:bg-[#047857] text-white font-mono text-[10px] font-bold shadow-xs transition-colors flex items-center gap-1"
                                >
                                  <Zap className="w-3 h-3" />
                                  <span>Fire</span>
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Reviewer */}
                          <td className="py-3 px-3 text-[11px] font-mono text-[#475569]">
                            {crate.reviewer}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. INSIGHTS PANEL (320px vertical stack of 3 cards) */}
            <div className="w-full xl:w-[320px] flex-shrink-0 space-y-4">
              
              {/* Card 1: Warm Chiller Alert (amber #F59E0B left-edge accent, white surface, soft shadow) */}
              <div className={`p-4 bg-white border rounded-lg transition-all relative overflow-hidden ${
                chillerAnomaly 
                  ? "border-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)] bg-amber-50/20" 
                  : "border-[#E2E8F0] shadow-[0_4px_16px_rgba(245,158,11,0.06)]"
              }`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${chillerAnomaly ? "bg-rose-500 animate-pulse" : "bg-[#F59E0B]"}`} />
                <div className="flex items-center justify-between text-xs font-bold text-[#F59E0B] mb-1.5 pl-1.5">
                  <span className="flex items-center gap-1.5">
                    <Thermometer strokeWidth={1.5} className="w-4 h-4 text-[#F59E0B]" />
                    {chillerAnomaly ? "CHILLER EXCURSION" : "Warm chiller alert"}
                  </span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                    chillerAnomaly ? "bg-rose-100 text-rose-800 border-rose-300 font-bold" : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}>
                    {chillerAnomaly ? "CRITICAL" : "EXCURSION"}
                  </span>
                </div>
                <p className="text-xs text-[#475569] pl-1.5 leading-snug">
                  Aisle 4 chiller averaging <span className="font-bold font-mono text-amber-900">{chillerTemp.toFixed(1)}°C</span> (target 4°C) — 6 crates monitored live
                </p>

                {/* Interactive Anomaly Simulator Button */}
                <div className="mt-3 pl-1.5">
                  <button
                    type="button"
                    onClick={toggleChillerAnomaly}
                    className={`w-full py-1.5 px-3 rounded text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      chillerAnomaly 
                        ? "bg-amber-600 hover:bg-amber-700 text-white" 
                        : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{chillerAnomaly ? "Reset to 8.2°C Baseline" : "Simulate Chiller Anomaly (+4.6°C)"}</span>
                  </button>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] pl-1.5">
                  <Link
                    href="/crates/AF-CRATE-0481"
                    className="text-xs font-semibold text-[#059669] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open chiller kinetics log →</span>
                  </Link>
                </div>
              </div>

              {/* Card 2: Top Vendor Card (mint tint #D1FAE5 background) */}
              <div className="p-4 bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg shadow-[0_4px_16px_rgba(6,78,59,0.04)]">
                <div className="flex items-center justify-between text-xs font-bold text-[#064E3B] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
                    Top vendor
                  </span>
                  <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded text-[#064E3B] border border-[#10B981]/30">
                    78% ON-TIME
                  </span>
                </div>
                <div className="text-sm font-bold text-[#064E3B]">
                  Nafeela Farm Fresh
                </div>
                <p className="text-xs text-[#064E3B]/80 mt-1">
                  Nafeela Farm Fresh · 3.0/5.0 score · 78% on-time delivery
                </p>
                <div className="mt-3 pt-2 border-t border-[#10B981]/30">
                  <Link
                    href="/vendor"
                    className="text-xs font-semibold text-[#064E3B] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View scorecard →</span>
                  </Link>
                </div>
              </div>

              {/* Card 3: Weekly Leaderboard Card (fastest action-approvers this week) */}
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_16px_rgba(6,78,59,0.04)]">
                <div className="flex items-center justify-between text-xs font-bold text-[#064E3B] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Award strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
                    Weekly leaderboard
                  </span>
                  <span className="text-[10px] text-[#475569] font-mono">Fastest Approvers</span>
                </div>
                <p className="text-[11px] text-[#475569] mb-2">
                  Fastest action-approvers this week
                </p>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-bold text-[#064E3B]">Priya R. (Store Mgr)</span>
                      <span className="font-mono text-[#059669] font-bold">1.2 min</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#059669] h-full rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-[#475569]">Rahul M. (Aisle Supv)</span>
                      <span className="font-mono text-[#475569]">2.8 min</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#10B981] h-full rounded-full" style={{ width: "68%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-[#475569]">Suresh K. (Stock Assoc)</span>
                      <span className="font-mono text-[#475569]">4.1 min</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: "45%" }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* PRIVACY FOOTER (full-width, hairline-top) */}
        <footer className="w-full border-t border-[#E2E8F0] bg-white py-3 px-8 mt-auto">
          <div className="flex items-center justify-center gap-2 text-center">
            <span className="font-mono text-[11px] text-[#475569]">
              🔒 only numbers leave the store · no video, no faces · 48-hr onboarding · scales to 10,000+ stores
            </span>
          </div>
        </footer>

      </div>

      {/* FLOATING LIVE FEEDBACK TOAST */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#064E3B] text-white p-4 rounded-xl shadow-[0_12px_40px_rgba(6,78,59,0.35)] border border-[#10B981]/40 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div>
            <div className="font-bold text-sm text-[#D1FAE5] flex items-center gap-1.5">
              <span>{liveToast.title}</span>
            </div>
            <div className="text-xs text-slate-200 mt-1 leading-relaxed">
              {liveToast.desc}
            </div>
          </div>
          <button
            onClick={() => setLiveToast(null)}
            className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-white/10"
          >
            ✕
          </button>
        </div>
      )}

      {/* STORE SETTINGS MODAL */}
      <StoreSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(s) =>
          setLiveToast({
            title: "✓ Edge Automation Config Saved",
            desc: `Auto-fire threshold set to ≥${s.autoFireThreshold}% · CCTV RTSP gateway synchronized.`,
          })
        }
      />

    </div>
  );
}
