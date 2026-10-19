"use client";

import React, { useState } from "react";
import { 
  Settings, 
  X, 
  Camera, 
  Sliders, 
  Thermometer, 
  ShieldCheck, 
  Zap, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Server, 
  Radio, 
  Truck, 
  Lock,
  Layers,
  Bell
} from "lucide-react";

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: StoreSettings) => void;
}

export interface StoreSettings {
  autoFireThreshold: number;
  markdownPct: number;
  rtspUrl: string;
  samplingIntervalSec: number;
  tileCalibration: boolean;
  privacyShield: boolean;
  chillerNominalTemp: number;
  chillerAlarmThreshold: number;
  kiranaRadiusKm: number;
  feedingIndiaSync: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  autoFireThreshold: 70,
  markdownPct: 30,
  rtspUrl: "rtsp://edge-lan.dmart-blr014.internal:554/cctv/bay4",
  samplingIntervalSec: 4.0,
  tileCalibration: true,
  privacyShield: true,
  chillerNominalTemp: 8.0,
  chillerAlarmThreshold: 12.0,
  kiranaRadiusKm: 1.5,
  feedingIndiaSync: true,
};

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<"automation" | "vision" | "chiller" | "network">("automation");
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSave) onSave(settings);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#09131F] border border-emerald-500/30 shadow-[0_25px_70px_rgba(5,150,105,0.25)] text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="px-6 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-[#064E3B]/90 via-[#0B251D]/70 to-[#09131F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Settings className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Store #BLR-014 · Edge Automation & Camera Config
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-emerald-300/80">
                DMart Bengaluru South · Bay 4 CCTV + Chiller IoT Telemetry Gateway
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-800 bg-[#0B1726]/60 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab("automation")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-semibold border-b-2 transition-all ${
              activeTab === "automation"
                ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>1. Decision Gates (≥70%)</span>
          </button>

          <button
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-semibold border-b-2 transition-all ${
              activeTab === "vision"
                ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>2. Edge CCTV & ₹100 Tile</span>
          </button>

          <button
            onClick={() => setActiveTab("chiller")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-semibold border-b-2 transition-all ${
              activeTab === "chiller"
                ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Thermometer className="w-4 h-4 text-emerald-400" />
            <span>3. Chiller Arrhenius Thresholds</span>
          </button>

          <button
            onClick={() => setActiveTab("network")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-semibold border-b-2 transition-all ${
              activeTab === "network"
                ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>4. Kirana & CSR Dispatch</span>
          </button>
        </div>

        {/* Tab Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed max-h-[calc(90vh-180px)]">
          {/* TAB 1: AUTOMATION & DECISION GATES */}
          {activeTab === "automation" && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Sliders className="w-4 h-4" />
                    <span>Autonomous Auto-Fire Confidence Threshold</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-white bg-black/40 px-3 py-0.5 rounded-lg border border-emerald-500/30">
                    ≥ {settings.autoFireThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={settings.autoFireThreshold}
                  onChange={(e) => setSettings({ ...settings, autoFireThreshold: parseInt(e.target.value) })}
                  className="w-full accent-[#10B981] cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>50% (More Autonomous)</span>
                  <span className="text-emerald-400 font-bold">Recommended: 70%</span>
                  <span>90% (Strict Human Approval)</span>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Actions with Arrhenius confidence <strong>≥ {settings.autoFireThreshold}%</strong> auto-dispatch to Electronic Shelf Labels (ESL) and WhatsApp without human intervention. Actions between <strong>50% and {settings.autoFireThreshold - 1}%</strong> route to Priya R. for 1-tap review.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Dynamic Markdown Tier
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={settings.markdownPct}
                      onChange={(e) => setSettings({ ...settings, markdownPct: parseInt(e.target.value) })}
                      className="bg-black/40 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-mono w-full"
                    >
                      <option value={20}>20% Pre-Visual Markdown</option>
                      <option value={30}>30% Optimal Window (Default)</option>
                      <option value={40}>40% Aggressive Liquidation</option>
                      <option value={50}>50% Clearance Blitz</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Fires Day 5 price drops on crates with &lt; 3.5 days RSL to sell through produce before visible rot appears.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Electronic Shelf Label (ESL) Channel
                  </div>
                  <div className="font-mono text-xs text-white bg-black/40 px-3 py-1.5 rounded-lg border border-slate-700">
                    Zigbee 802.15.4 · PAN ID 0x3A21 · 2.4 GHz
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Emulated broadcast tag ID: <span className="font-mono text-emerald-400">ESL-BLR014-0481</span>. Over-the-air price updates confirm in sub-800ms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISION & CAMERA CONFIG */}
          {activeTab === "vision" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Existing Store CCTV Stream Integration</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono block mb-1">RTSP Stream URI (Edge Camera Local Gateway)</label>
                  <input
                    type="text"
                    value={settings.rtspUrl}
                    onChange={(e) => setSettings({ ...settings, rtspUrl: e.target.value })}
                    className="w-full bg-black/40 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Frame Capture Interval:</span>
                  <span className="font-mono text-white font-bold">{settings.samplingIntervalSec}s (1 frame every 4s)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono">₹100 Reference Tile Auto-Lock</span>
                    <input
                      type="checkbox"
                      checked={settings.tileCalibration}
                      onChange={(e) => setSettings({ ...settings, tileCalibration: e.target.checked })}
                      className="accent-[#10B981] w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Continuous CIE L*a*b* normalization against Neutral 8 white reference patch to eliminate ambient supermarket fluorescent tube flicker.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Zero-Face Privacy Guard</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.privacyShield}
                      onChange={(e) => setSettings({ ...settings, privacyShield: e.target.checked })}
                      className="accent-[#10B981] w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Hardware-level frame cropping to produce bins only. 0% shopper faces or body silhouettes leave the edge memory buffer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHILLER ARRHENIUS CONFIG */}
          {activeTab === "chiller" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-amber-500" />
                    <span>Chiller Setpoint & Physical Excursion Limits</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-amber-300">
                    Target: {settings.chillerNominalTemp}°C
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Nominal Cold Chain</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">8.0°C – 8.2°C</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Aisle 4 Chilled Produce Bay</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Alarm Threshold</div>
                    <div className="text-lg font-bold font-mono text-rose-400 mt-0.5">&gt; 12.0°C</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Triggers +4.6°C Arrhenius Alert</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Respiration acceleration constant (<span className="text-amber-300 font-mono">Q₁₀ = 2.3</span>) recalculates RSL decay rate $k(T)$ in real time whenever sensor readings cross nominal bounds.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: KIRANA & CSR DISPATCH */}
          {activeTab === "network" && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Hyperlocal Kirana Redistribution Network</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Dispatch Search Radius:</span>
                  <span className="font-mono text-white font-bold">{settings.kiranaRadiusKm} km (&lt; 2-hour liquidation)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Connected stores: <strong>Ramesh Stores (0.4 km)</strong>, <strong>Nafeela Farm Fresh (0.9 km)</strong>, <strong>City Juice Corner (1.2 km)</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">Feeding India Automated Food Bank Dispatch</span>
                  <input
                    type="checkbox"
                    checked={settings.feedingIndiaSync}
                    onChange={(e) => setSettings({ ...settings, feedingIndiaSync: e.target.checked })}
                    className="accent-[#10B981] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  When produce reaches &lt; 1.2 days RSL and is not sold via markdown, automated pickup requests dispatch to Feeding India volunteer vans before visible spoilage occurs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Ribbon with Save & Reset buttons */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0B1726]/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#059669] text-white font-bold shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
