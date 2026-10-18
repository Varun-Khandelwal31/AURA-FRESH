export interface Crate {
  id: number;
  crate_code: string;
  commodity: "tomato" | "spinach" | "banana";
  variety: string;
  batch_lot: string;
  farm_origin: string;
  aisle_location: string;
  shelf_tag: string;
  hours_in_store: number;
  ambient_temp_avg_c: number;
  calibration_tile_delta_e: number;
  calibration_tile_status: string;
  ae_drift_pct: number;
  predicted_rsl_hours: number;
  nominal_expected_hours: number;
  confidence: number;
  status: "NOMINAL" | "REVIEW_REQUIRED" | "AUTO_ACTIONED";
  decay_stage: string;
  human_visual_appearance: string;
  current_price_inr: number;
  markdown_price_inr: number;
  crate_weight_kg: number;
  last_scanned_at?: string;
  active_action_type?: string;
  auto_fire_eligible: boolean;
  human_review_required: boolean;
}

export interface DecayPoint {
  hour: number;
  nominal_quality: number;
  actual_quality: number;
  upper_ci: number;
  lower_ci: number;
  threshold_previsual: number;
  threshold_spoiled: number;
}

export interface CrateDetailResponse {
  crate: Crate;
  optical_analysis: {
    raw_frame_url: string;
    heatmap_url: string;
    cv_metrics: {
      calib_tile_observed_gray: number;
      calib_tile_lux_offset: number;
      mean_produce_drift_pct: number;
      peak_hotspot_drift_pct: number;
      calibrated_delta_e: number;
      tile_status: string;
    };
    calibration_tile: {
      installed_cost_inr: number;
      type: string;
      tile_id: string;
      status: string;
      delta_e: number;
      ambient_lux_compensation: string;
    };
  };
  kinetics: {
    commodity: string;
    predicted_rsl_hours: number;
    nominal_expected_hours: number;
    rsl_loss_pct: number;
    confidence: number;
    ae_drift_pct: number;
    calibration_tile_delta_e: number;
    decay_stage: string;
    auto_fire_eligible: boolean;
    human_review_required: boolean;
    decay_curve: DecayPoint[];
    recommended_action: string;
    economic_impact: {
      current_price: number;
      markdown_price: number;
      potential_waste_kg: number;
      recovered_value_inr: number;
      co2e_diverted_kg: number;
    };
  };
  temperature_timeline: Array<{
    time: string;
    temp_c: number;
    target_c: number;
    status: string;
  }>;
  actions: ClosedLoopAction[];
}

export interface ClosedLoopAction {
  id: number;
  crate_code: string;
  commodity: string;
  action_type: "ESL_MARKDOWN" | "FEFO_RESORT" | "QR_COUPON_WHATSAPP" | "DONATION_PICKUP" | "VENDOR_CLAIM";
  status: "EXECUTED" | "PENDING_APPROVAL" | "AUTO_FIRED";
  confidence_at_fire: number;
  trigger_rule: string;
  summary: string;
  details: Record<string, any>;
  recovered_value_inr: number;
  diverted_food_kg: number;
  co2e_avoided_kg: number;
  created_at: string;
  executed_by: string;
}

export interface ESGReport {
  store: string;
  period: string;
  headline_outcome: {
    annual_recovery_potential_inr: string;
    store_recovered_to_date_inr: number;
    store_food_diverted_kg: number;
    store_co2e_avoided_kg: number;
    annualized_diverted_tonnes: number;
  };
  frameworks: {
    india_brsr: {
      name: string;
      principle: string;
      kpi_target: string;
      audit_readiness: string;
      score_pct: number;
    };
    un_sdg_12_3: {
      name: string;
      target: string;
      waste_reduction_vs_baseline_pct: number;
      status: string;
    };
    fssai_save_food: {
      name: string;
      donations_rerouted_kg: number;
      certified_partner_ngos: string[];
      hygiene_compliance: string;
    };
    mofpi_cold_chain: {
      name: string;
      thermal_excursion_logging: string;
      subsidy_claim_eligibility: string;
      audit_hash: string;
    };
  };
}
