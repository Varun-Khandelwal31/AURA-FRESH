"use client";

import React from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { DecayPoint } from "../lib/types";
import { 
  Activity, 
  Thermometer, 
  HelpCircle,
  Clock
} from "lucide-react";

interface ArrheniusKineticsChartProps {
  decayCurve: DecayPoint[];
  predictedRslHours: number;
  confidence: number;
  commodity: string;
  temperatureTimeline: Array<{
    time: string;
    temp_c: number;
    target_c: number;
    status: string;
  }>;
}

export const ArrheniusKineticsChart: React.FC<ArrheniusKineticsChartProps> = ({
  decayCurve,
  predictedRslHours,
  confidence,
  commodity,
  temperatureTimeline,
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg shadow-lg text-xs font-sans">
          <div className="font-bold text-[#064E3B] mb-1.5 flex items-center justify-between gap-4">
            <span>Hour {label}h in store</span>
            <span className="text-[#059669] font-mono">
              RSL: {Math.max(0, Math.round(predictedRslHours - label))}h remaining
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-[#059669]">
              <span>Nominal Cold-Chain:</span>
              <span className="font-mono font-semibold">{data.nominal_quality}%</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#EF4444]">
              <span>Actual Accelerated:</span>
              <span className="font-mono font-bold">{data.actual_quality}%</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#475569]">
              <span>95% Confidence Band:</span>
              <span className="font-mono">[{data.lower_ci}% – {data.upper_ci}%]</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full aurafresh-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <Activity strokeWidth={1.5} className="w-4 h-4 text-[#059669]" />
            <h3 className="text-base font-bold text-[#064E3B]">
              Arrhenius Kinetic Decay Curve & 95% Confidence Band
            </h3>
          </div>
          <p className="text-xs text-[#475569] mt-0.5">
            Arrhenius reaction rate: k(T) = k_ref · e^(-Ea/RT) fused with AE optical drift velocity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-[#475569]">Confidence Band</div>
            <div className="text-xs font-mono font-bold text-[#059669]">
              ±{(100 - confidence * 100).toFixed(1)}% (95% CI)
            </div>
          </div>
          <div className="h-6 w-px bg-[#E2E8F0]" />
          <div className="text-right">
            <div className="text-[10px] text-[#475569]">Remaining Shelf Life</div>
            <div className="text-sm font-mono font-bold text-[#EF4444]">
              {(predictedRslHours / 24.0).toFixed(1)} days ({predictedRslHours.toFixed(1)}h)
            </div>
          </div>
        </div>
      </div>

      {/* Main Decay Curve Recharts with Sphere Pin Markers */}
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={decayCurve} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              {/* Soft fill for fresh zones (mintPale: #D1FAE5) */}
              <linearGradient id="ciBandFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D1FAE5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D1FAE5" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#94A3B8"
              fontSize={11}
              tickFormatter={(v) => `${v}h`}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#94A3B8"
              fontSize={11}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Critical Threshold Lines */}
            <ReferenceLine
              y={70}
              stroke="#F59E0B"
              strokeDasharray="4 4"
              label={{
                value: "70% Pre-Visual Invisible Window",
                fill: "#F59E0B",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />
            <ReferenceLine
              y={40}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{
                value: "40% Visual Spoilage Threshold",
                fill: "#EF4444",
                fontSize: 10,
                position: "insideBottomRight",
              }}
            />

            {/* 95% Confidence Band Area */}
            <Area
              type="monotone"
              dataKey="upper_ci"
              stroke="transparent"
              fill="url(#ciBandFill)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="lower_ci"
              stroke="transparent"
              fill="#FFFFFF"
              isAnimationActive={true}
            />

            {/* Nominal Curve (Ideal Cold-Chain in #059669) */}
            <Line
              type="monotone"
              dataKey="nominal_quality"
              name="Nominal Cold Chain"
              stroke="#059669"
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 4"
            />

            {/* Actual Accelerated Decay Line in #EF4444 */}
            <Line
              type="monotone"
              dataKey="actual_quality"
              name="Predicted Decay"
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 3D-feel Sphere Pins Legend per The 3D Rule */}
      <div className="mt-3 flex items-center justify-between text-xs text-[#475569] px-2 py-1.5 bg-[#F8FAFC] rounded-md border border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="sphere-pin-fresh" />
          <span className="font-medium text-[#064E3B]">Today's State: Pre-visual Window (Firm & Edible)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="sphere-pin-spoilage" />
          <span className="font-medium text-[#EF4444]">Visible Spoilage Marker (Action Threshold)</span>
        </div>
      </div>

      {/* Temperature Timeline (Thermal Sensor Excursion) */}
      <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-[#475569]">
            <Thermometer strokeWidth={1.5} className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>Thermal Sensor Excursion History (Aisle Sensor TS-02)</span>
          </div>
          <span className="text-[10px] font-mono text-[#EF4444] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
            +8.4°C Above Optimum Target
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {temperatureTimeline.map((item, idx) => (
            <div
              key={idx}
              className={`p-2 rounded border text-xs ${
                item.status === "EXCURSION"
                  ? "bg-rose-50 border-rose-200 text-[#EF4444]"
                  : item.status === "WARMING"
                  ? "bg-amber-50 border-amber-200 text-[#F59E0B]"
                  : "bg-[#D1FAE5]/60 border-[#10B981]/30 text-[#064E3B]"
              }`}
            >
              <div className="text-[10px] opacity-75 font-mono">{item.time}</div>
              <div className="font-bold font-mono mt-0.5">{item.temp_c}°C</div>
              <div className="text-[9px] font-semibold mt-0.5">{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
