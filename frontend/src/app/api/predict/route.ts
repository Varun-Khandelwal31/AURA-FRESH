import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const crateId = body.crate_id || "AF-CRATE-0481";
    const storeId = body.store_id || "DMart BLR-014";
    const ambientTempC = body.ambient_temp_c !== undefined ? parseFloat(body.ambient_temp_c) : 8.0;

    // Arrhenius Kinetics: Roma Tomatoes
    const optimalTemp = 13.0;
    const eaKj = 62.5;
    const kBase = 0.0042;
    const baseShelfDays = 6.0;

    const tOptK = 273.15 + optimalTemp;
    const tActualK = 273.15 + ambientTempC;
    const rGas = 8.314;
    const eaJ = eaKj * 1000.0;
    const tempFactor = Math.exp(-(eaJ / rGas) * (1.0 / tActualK - 1.0 / tOptK));
    const arrheniusMultiplier = Math.round(tempFactor * 100) / 100;

    const measuredAeDrift = 0.42;
    const driftDegradationFactor = 1.0 + (measuredAeDrift - 0.18) * 2.8;
    let rslDays = baseShelfDays / (arrheniusMultiplier * driftDegradationFactor);
    rslDays = Math.round(Math.max(0.6, Math.min(9.0, rslDays)) * 10) / 10;

    return NextResponse.json({
      case_id: "CASE-" + Math.floor(Math.random() * 900000 + 100000),
      crate_id: crateId,
      store_id: storeId,
      commodity: "Solanum lycopersicum",
      ae_drift: measuredAeDrift,
      gabor_texture_drift: 0.40,
      rsl_days: rslDays,
      rsl_ci_days: 0.5,
      confidence_score: 0.84,
      arrhenius_k: kBase * arrheniusMultiplier,
      action_type: rslDays < 3.0 ? "ESL_MARKDOWN" : "NOMINAL",
      suggested_price: rslDays < 3.0 ? 56.0 : 80.0,
      original_price: 80.0,
      recovered_value_inr: 640.0,
      status: "ANALYZED",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
