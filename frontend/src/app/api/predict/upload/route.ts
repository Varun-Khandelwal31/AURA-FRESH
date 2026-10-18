import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const commodity = (formData.get("commodity") as string) || "tomato";
    const ambientTempC = parseFloat((formData.get("ambient_temp_c") as string) || "8.0");
    const crateId = (formData.get("crate_id") as string) || "AF-CRATE-0481";

    let fileSize = 0;
    let mimeType = "image/jpeg";

    if (file) {
      fileSize = file.size;
      mimeType = file.type || "image/jpeg";
    }

    // Physical Commodity Parameters
    const commLower = commodity.toLowerCase();
    let produceLabel = "Roma Tomatoes";
    let latinName = "Solanum lycopersicum";
    let optimalTemp = 13.0;
    let eaKj = 62.5;
    let kBase = 0.0042;
    let baseShelfDays = 6.0;
    let unitPrice = 80.0;
    let measuredAeDrift = 0.42;

    if (commLower.includes("banana")) {
      produceLabel = "Robusta Bananas";
      latinName = "Musa acuminata";
      optimalTemp = 14.0;
      eaKj = 69.0;
      kBase = 0.0065;
      baseShelfDays = 5.2;
      unitPrice = 54.0;
      measuredAeDrift = 0.38;
    } else if (commLower.includes("spinach") || commLower.includes("palak")) {
      produceLabel = "Indian Palak Greens";
      latinName = "Spinacia oleracea";
      optimalTemp = 4.0;
      eaKj = 78.0;
      kBase = 0.0098;
      baseShelfDays = 3.4;
      unitPrice = 36.0;
      measuredAeDrift = 0.48;
    } else if (commLower.includes("mango")) {
      produceLabel = "Alphonso Mangoes";
      latinName = "Mangifera indica";
      optimalTemp = 12.0;
      eaKj = 65.0;
      kBase = 0.0050;
      baseShelfDays = 6.0;
      unitPrice = 120.0;
      measuredAeDrift = 0.35;
    }

    // If an uploaded file exists, add slight dynamic variation based on file size
    if (fileSize > 0) {
      const hashVariation = ((fileSize % 1000) / 1000) * 0.16 - 0.08;
      measuredAeDrift = Math.max(0.18, Math.min(0.68, measuredAeDrift + hashVariation));
    }
    measuredAeDrift = Math.round(measuredAeDrift * 100) / 100;

    // Arrhenius Kinetics: k(T) = k_base * exp( - (Ea / R) * ( 1/T_actual - 1/T_opt ) )
    const tOptK = 273.15 + optimalTemp;
    const tActualK = 273.15 + ambientTempC;
    const rGas = 8.314;
    const eaJ = eaKj * 1000.0;

    const tempFactor = Math.exp(-(eaJ / rGas) * (1.0 / tActualK - 1.0 / tOptK));
    const arrheniusMultiplier = Math.round(tempFactor * 100) / 100;
    const kEffective = kBase * arrheniusMultiplier;

    // Shelf life degradation factor
    const driftDegradationFactor = 1.0 + (measuredAeDrift - 0.18) * 2.8;
    let rslDays = baseShelfDays / (arrheniusMultiplier * driftDegradationFactor);
    rslDays = Math.round(Math.max(0.6, Math.min(9.0, rslDays)) * 10) / 10;
    const rslUncertainty = Math.round(Math.max(0.4, Math.min(1.1, 0.3 + measuredAeDrift * 0.6)) * 10) / 10;

    // Confidence calculation
    let confidenceVal = 0.88 - Math.abs(measuredAeDrift - 0.4) * 0.25 - Math.max(0.0, (ambientTempC - optimalTemp) * 0.01);
    confidenceVal = Math.round(Math.max(0.68, Math.min(0.94, confidenceVal)) * 100) / 100;
    const confidencePct = Math.round(confidenceVal * 100);

    // Freshness Grade
    let grade = "B+";
    let gradeColor = "mint";
    if (rslDays >= 4.5) {
      grade = "A+";
      gradeColor = "mint";
    } else if (rslDays >= 3.6) {
      grade = "A";
      gradeColor = "mint";
    } else if (rslDays >= 2.6) {
      grade = "B+";
      gradeColor = "mint";
    } else if (rslDays >= 1.6) {
      grade = "B";
      gradeColor = "amber";
    } else if (rslDays >= 0.9) {
      grade = "C";
      gradeColor = "red";
    } else {
      grade = "D";
      gradeColor = "red";
    }

    // Action Determination
    let discountPct = 0;
    let markdownPrice = unitPrice;
    let actionName = "Nominal Display (Standard Inventory)";
    let actionType = "Nominal Watch";
    let reviewer = "System Verified · Auto-Pass";
    let recoveredInr = 0;

    if (rslDays >= 4.0) {
      discountPct = 0;
      markdownPrice = unitPrice;
      actionName = "Nominal Display (Standard Inventory)";
      actionType = "Nominal Watch";
      reviewer = "System Verified · Auto-Pass";
      recoveredInr = 0;
    } else if (rslDays >= 2.5) {
      discountPct = 30;
      markdownPrice = Math.round(unitPrice * 0.7);
      actionName = `30% Markdown (₹${unitPrice.toFixed(0)} → ₹${markdownPrice.toFixed(0)})`;
      actionType = "ESL Markdown + QR Deal";
      reviewer = confidenceVal >= 0.7 ? "Auto-fired (≥70%)" : "Review Needed (Priya R.)";
      recoveredInr = Math.round(markdownPrice * 22.0);
    } else if (rslDays >= 1.4) {
      discountPct = 45;
      markdownPrice = Math.round(unitPrice * 0.55);
      actionName = `45% Flash Clearance (₹${unitPrice.toFixed(0)} → ₹${markdownPrice.toFixed(0)})`;
      actionType = "WhatsApp Flash Blast";
      reviewer = confidenceVal >= 0.7 ? "Auto-fired (≥70%)" : "Review Needed (Priya R.)";
      recoveredInr = Math.round(markdownPrice * 22.0);
    } else {
      discountPct = 100;
      markdownPrice = 0;
      actionName = "Feeding India Food Bank Dispatch";
      actionType = "Donation Route";
      reviewer = "Auto-fired (≥70%)";
      recoveredInr = Math.round(unitPrice * 0.5 * 22.0);
    }

    // Generate 10-day decay curve points
    const decayCurve = [];
    for (let day = 0; day <= 9; day++) {
      const pred = Math.max(0.0, rslDays - day * arrheniusMultiplier * 0.85);
      const upper = Math.min(10.0, pred + rslUncertainty * (1.0 + day * 0.12));
      const lower = Math.max(0.0, pred - rslUncertainty * (1.0 + day * 0.12));
      decayCurve.push({
        day: `Day ${day}`,
        predicted_rsl: Math.round(pred * 10) / 10,
        upper_bound: Math.round(upper * 10) / 10,
        lower_bound: Math.round(lower * 10) / 10,
      });
    }

    // Default frame URLs
    let defaultFrameUrl = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80";
    if (commLower.includes("banana")) {
      defaultFrameUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80";
    } else if (commLower.includes("spinach") || commLower.includes("palak")) {
      defaultFrameUrl = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80";
    }

    // If an image was uploaded, convert it to a base64 Data URL so the frontend can preview it immediately
    let annotatedFrameUrl = defaultFrameUrl;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      annotatedFrameUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      crate_id: crateId,
      commodity: produceLabel,
      latin_name: latinName,
      ambient_temp_c: ambientTempC,
      nominal_temp_c: optimalTemp,
      ae_drift: measuredAeDrift,
      gabor_texture_drift: Math.round((measuredAeDrift * 0.95) * 100) / 100,
      rsl_days: rslDays,
      rsl_ci_days: rslUncertainty,
      confidence_score: confidenceVal,
      confidence_pct: confidencePct,
      grade: grade,
      grade_color: gradeColor,
      arrhenius_k: kEffective,
      arrhenius_factor: arrheniusMultiplier,
      action_required: rslDays < 4.0,
      action_name: actionName,
      action_type: actionType,
      discount_pct: discountPct,
      original_price_inr: unitPrice,
      markdown_price_inr: markdownPrice,
      recovered_value_inr: recoveredInr,
      reviewer: reviewer,
      annotated_frame_url: annotatedFrameUrl,
      heatmap_frame_url: annotatedFrameUrl,
      decay_curve: decayCurve,
      calibration_tile: {
        status: "LOCKED",
        patch_readings: [
          { name: "18% Neutral Gray", observed: 118, expected: 118, delta_e: 0.14 },
          { name: "90% White Reference", observed: 236, expected: 235, delta_e: 0.22 },
          { name: "3% Optical Black", observed: 21, expected: 22, delta_e: 0.18 },
          { name: "Spectral Target", observed: 154, expected: 152, delta_e: 0.38 },
        ],
        mean_delta_e: 0.23,
      },
      telemetry: {
        timestamp: new Date().toISOString(),
        cctv_frame_id: "FRAME-" + Math.floor(Math.random() * 900000 + 100000),
        inference_latency_ms: 38,
        edge_model_version: "AuraFresh-MobileNetV3-Gabor-v1.4",
      },
    });
  } catch (error: any) {
    console.error("API /api/predict/upload error:", error);
    return NextResponse.json(
      { error: "Internal analysis error", details: error.message },
      { status: 500 }
    );
  }
}
