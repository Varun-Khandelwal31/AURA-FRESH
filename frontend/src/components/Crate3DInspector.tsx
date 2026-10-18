"use client";

import React, { useState } from "react";
import { CrateDetailResponse } from "../lib/types";
import { 
  Eye, 
  Flame, 
  Scan, 
  Crosshair, 
  BadgeCheck, 
  Sparkles,
  Layers,
  Lock,
  Camera
} from "lucide-react";

interface CrateInspectorProps {
  data: CrateDetailResponse;
  onTriggerScan: () => void;
  isScanning: boolean;
}

const CURATED_PRODUCE_IMAGES: Record<string, string> = {
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80",
  spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=80",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80",
};

export const Crate3DInspector: React.FC<CrateInspectorProps> = ({
  data,
  onTriggerScan,
  isScanning,
}) => {
  const [viewMode, setViewMode] = useState<"visible" | "cv_heatmap">("cv_heatmap");
  const [showTileInfo, setShowTileInfo] = useState<boolean>(false);

  const crate = data.crate;
  const opt = data.optical_analysis;
  const tile = opt.calibration_tile;

  const currentDisplayImage =
    viewMode === "cv_heatmap" && opt.heatmap_url
      ? opt.heatmap_url
      : opt.raw_frame_url || CURATED_PRODUCE_IMAGES[crate.commodity];

  return (
    <div className="w-full aurafresh-card p-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#064E3B] font-semibold bg-[#D1FAE5] border border-[#10B981]/30 px-2 py-0.5 rounded">
              Edge CV Optical Rig
            </span>
            <span className="text-xs text-[#475569]">
              {crate.aisle_location} • Camera Array Cam-04
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#064E3B] mt-1 flex items-center gap-2">
            {crate.variety}
            <span className="text-xs font-mono font-semibold text-[#475569]">
              [{crate.crate_code}]
            </span>
          </h3>
        </div>

        {/* View Mode Switcher & Scan Trigger */}
        <div className="flex items-center gap-2">
          <div className="bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0] flex items-center text-xs">
            <button
              onClick={() => setViewMode("visible")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === "visible"
                  ? "bg-white text-[#064E3B] font-semibold shadow-sm border border-[#E2E8F0]"
                  : "text-[#475569] hover:text-[#064E3B]"
              }`}
            >
              <Eye strokeWidth={1.5} className="w-3.5 h-3.5" />
              <span>Naked Eye (Store)</span>
            </button>
            <button
              onClick={() => setViewMode("cv_heatmap")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                viewMode === "cv_heatmap"
                  ? "bg-[#D1FAE5] text-[#064E3B] font-semibold border border-[#10B981]/30 shadow-sm"
                  : "text-[#475569] hover:text-[#059669]"
              }`}
            >
              <Flame strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
              <span>Invisible Window (CV Heatmap)</span>
            </button>
          </div>

          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white active:scale-95 transition-all shadow-sm disabled:opacity-50"
          >
            <Scan strokeWidth={1.5} className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Extracting..." : "Scan Crate"}</span>
          </button>
        </div>
      </div>

      {/* Main Flat 2D Inspection Frame (Per 3D Rule: Flat 2D on working screens) */}
      <div className="py-4 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] shadow-sm">
          {/* Produce Crate Image / Heatmap */}
          <img
            src={currentDisplayImage}
            alt={crate.commodity}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Scanning Laser HUD Line when triggered */}
          {isScanning && <div className="optical-scanline z-30" />}

          {/* Corner ₹100 Calibration Tile Callout */}
          <div
            onClick={() => setShowTileInfo(!showTileInfo)}
            className="absolute bottom-4 right-4 z-20 cursor-pointer"
            title="Click to view ₹100 Calibration Tile specifications"
          >
            <div className="p-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#10B981]/40 shadow-md">
              <div className="flex items-center gap-1.5 text-xs text-[#064E3B] font-mono font-bold">
                <Crosshair strokeWidth={1.5} className="w-3.5 h-3.5 text-[#059669]" />
                <span>₹100 CALIB TILE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
              </div>
              <div className="text-[10px] text-[#475569] font-mono mt-0.5">
                ΔE: {crate.calibration_tile_delta_e} | LOCKED
              </div>
            </div>
          </div>

          {/* Top Callout HUD: Perception vs Invisible Window */}
          <div className="absolute top-4 left-4 z-20">
            {viewMode === "cv_heatmap" ? (
              <div className="p-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#EF4444]/30 text-xs shadow-md max-w-xs">
                <div className="flex items-center gap-1.5 text-[#EF4444] font-semibold text-[11px] uppercase tracking-wide">
                  <Flame strokeWidth={1.5} className="w-3.5 h-3.5" />
                  Pre-Visual Decay Active
                </div>
                <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                  AE Drift <strong className="font-mono text-[#F59E0B]">+{crate.ae_drift_pct.toFixed(1)}%</strong>. Cellular respiration active 1.8 days before naked-eye detection.
                </p>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs shadow-md max-w-xs">
                <div className="flex items-center gap-1.5 text-[#059669] font-semibold text-[11px] uppercase tracking-wide">
                  <BadgeCheck strokeWidth={1.5} className="w-3.5 h-3.5" />
                  Human Eye Appearance
                </div>
                <p className="text-[11px] text-[#475569] mt-1 leading-snug">
                  {crate.human_visual_appearance}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Left HUD: Quantitative RSL & Confidence */}
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs shadow-sm">
                <span className="text-[#475569]">RSL: </span>
                <span className="text-[#064E3B] font-mono font-bold">
                  {(crate.predicted_rsl_hours / 24.0).toFixed(1)} days ({crate.predicted_rsl_hours.toFixed(1)}h)
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#D1FAE5]/95 backdrop-blur-md border border-[#10B981]/40 text-xs shadow-sm">
                <span className="text-[#064E3B]">Confidence: </span>
                <span className="text-[#064E3B] font-mono font-bold">
                  {(crate.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ₹100 Calibration Tile Explainer Drawer */}
      <div className="mt-2 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
            <Sparkles strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
            <span>₹100 Calibration Tile vs ₹50,000 Hyperspectral Rigs</span>
          </div>
          <span className="text-[10px] font-mono text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded border border-[#10B981]/30 font-semibold">
            Cost: ₹100/crate
          </span>
        </div>
        <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
          Mounted in the bottom-right corner of each crate is a 4-patch neutral-density reference tile. By measuring ambient light drift against this invariant target (<span className="text-[#064E3B] font-mono font-semibold">ΔE: {crate.calibration_tile_delta_e}</span>), AuraFresh normalizes fluorescent ceiling hum and shadow drift, isolating the true photon reflectance shift caused by internal produce decay.
        </p>
      </div>
    </div>
  );
};
