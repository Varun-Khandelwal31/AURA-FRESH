// AuraFresh Configuration (/lib/config.ts)
// Hardcoded threshold rules & session parameters to prevent scope creep.

export const AUTO_FIRE_THRESHOLD = 0.70;
export const HUMAN_REVIEW_THRESHOLD = 0.50;

export const SESSION_USER = {
  name: "Priya R.",
  store: "DMart BLR-014",
  role: "store_manager",
  shift: "Morning Peak (07:00 - 15:30 IST)",
  tileId: "TILE-100-REF-BLR-014"
};

export const CANONICAL_SCENARIO = {
  crateId: "#AF-CRATE-0481",
  produce: "Roma Tomatoes (Retail Bay)",
  latin: "Solanum lycopersicum",
  store: "DMart BLR-014 (Aisle 4)",
  vendor: "Nafeela Farm Fresh · #VENDOR-NFR-027",
  aeDrift: 0.42,
  aeBaseline: 0.18,
  tempAvg: 8.0,
  rsl: "3.2 ± 0.8 days",
  confidence: 0.78,
  markdownPrice: 56.0,
  currentPrice: 80.0,
  recoveredValue: 640.0,
  divertedWeight: 26.7,
  co2eAvoided: 22.5,
  reviewer: "Priya R. (Store Manager)"
};
