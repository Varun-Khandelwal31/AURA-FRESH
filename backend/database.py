import os
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./aurafresh.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class CrateModel(Base):
    __tablename__ = "crates"

    id = Column(Integer, primary_key=True, index=True)
    crate_code = Column(String(50), unique=True, index=True)  # #AF-CRATE-0481
    commodity = Column(String(50), index=True)               # tomato
    variety = Column(String(100))                            # Crate of tomatoes on a retail shelf
    latin_name = Column(String(100), default="Solanum lycopersicum")
    store_id = Column(String(50), default="#STORE-BLR-014")
    vendor_name = Column(String(100), default="Nafeela Farm Fresh · #VENDOR-NFR-027")
    batch_lot = Column(String(50), default="LOT-2026-NFR-0481")
    farm_origin = Column(String(100), default="Nafeela Farm Fresh, Kolar Belt")
    aisle_location = Column(String(100), default="DMart, Bangalore, aisle 4")
    shelf_tag = Column(String(50), default="ESL-TOM-04A")
    hours_in_store = Column(Float, default=28.5)
    ambient_temp_avg_c = Column(Float, default=8.0)  # 8°C avg chiller (slightly warm — flagged amber)
    calibration_tile_delta_e = Column(Float, default=0.42)
    calibration_tile_status = Column(String(50), default="ACTIVE_100_TILE_LOCKED")
    ae_drift_pct = Column(Float, default=0.42)       # AE drift = 0.42 (2.3× above 0.18 baseline)
    ae_drift_relative = Column(String(50), default="2.3x above 0.18 baseline")
    predicted_rsl_days = Column(Float, default=3.2)  # RSL = 3.2 ± 0.8 days
    predicted_rsl_hours = Column(Float, default=76.8)
    rsl_ci_days = Column(Float, default=0.8)
    nominal_expected_hours = Column(Float, default=144.0)
    confidence = Column(Float, default=0.78)         # 78% (above 70% auto-fire threshold)
    status = Column(String(50), default="AUTO_ACTIONED")
    decay_stage = Column(String(150), default="Pre-visual cellular breakdown (Invisible Window)")
    human_visual_appearance = Column(String(200), default="Commercially firm, red-orange. Zero visible decay to naked human eye.")
    current_price_inr = Column(Float, default=80.0)  # ₹80
    markdown_price_inr = Column(Float, default=56.0) # ₹56 (30% markdown)
    crate_weight_kg = Column(Float, default=26.7)
    last_scanned_at = Column(DateTime, default=datetime.utcnow)
    active_action_type = Column(String(50), default="ESL_MARKDOWN")
    action_fired_summary = Column(String(255), default="30% markdown auto-applied (₹80 → ₹56) + QR coupon live")
    action_time_str = Column(String(50), default="14:31 IST, today")
    money_recovered_inr = Column(Float, default=640.0) # ₹640 on this crate
    reviewer = Column(String(100), default="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST")


class ClosedLoopActionModel(Base):
    __tablename__ = "closed_loop_actions"

    id = Column(Integer, primary_key=True, index=True)
    crate_code = Column(String(50), index=True)
    commodity = Column(String(50))
    action_type = Column(String(50))
    status = Column(String(50))
    confidence_at_fire = Column(Float)
    trigger_rule = Column(String(100))
    summary = Column(String(255))
    details_json = Column(Text)
    recovered_value_inr = Column(Float, default=640.0)
    diverted_food_kg = Column(Float, default=26.7)
    co2e_avoided_kg = Column(Float, default=22.5)
    created_at = Column(DateTime, default=datetime.utcnow)
    executed_by = Column(String(100), default="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST")


class TelemetryPointModel(Base):
    __tablename__ = "telemetry_points"

    id = Column(Integer, primary_key=True, index=True)
    crate_code = Column(String(50), index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    temperature_c = Column(Float)
    ae_drift_pct = Column(Float)
    predicted_rsl_hours = Column(Float)
    confidence = Column(Float)


def init_db():
    Base.metadata.create_all(bind=engine)
    seed_canonical_data()


def seed_canonical_data():
    db = SessionLocal()
    try:
        # Clear existing to enforce locked canonical scenario
        db.query(ClosedLoopActionModel).delete()
        db.query(CrateModel).delete()
        db.commit()

        canonical_tomato = CrateModel(
            crate_code="#AF-CRATE-0481",
            commodity="tomato",
            variety="Crate of tomatoes on a retail shelf",
            latin_name="Solanum lycopersicum",
            store_id="#STORE-BLR-014",
            vendor_name="Nafeela Farm Fresh · #VENDOR-NFR-027",
            batch_lot="LOT-2026-NFR-0481",
            farm_origin="Nafeela Farm Fresh, Kolar Cluster",
            aisle_location="DMart, Bangalore, aisle 4",
            shelf_tag="ESL-TOM-04A",
            hours_in_store=28.5,
            ambient_temp_avg_c=8.0, # 8°C avg chiller (slightly warm — flagged amber)
            calibration_tile_delta_e=0.42,
            calibration_tile_status="ACTIVE_100_TILE_LOCKED",
            ae_drift_pct=0.42,      # AE drift = 0.42 (2.3× above 0.18 baseline)
            ae_drift_relative="2.3× above 0.18 baseline",
            predicted_rsl_days=3.2, # RSL = 3.2 ± 0.8 days
            predicted_rsl_hours=76.8,
            rsl_ci_days=0.8,
            nominal_expected_hours=144.0,
            confidence=0.78,        # 78% (above 70% auto-fire threshold)
            status="AUTO_ACTIONED",
            decay_stage="Pre-visual cellular breakdown (Invisible Window)",
            human_visual_appearance="Firm, red-orange, no visible rot to naked human eye.",
            current_price_inr=80.0,
            markdown_price_inr=56.0,
            crate_weight_kg=26.7,
            last_scanned_at=datetime.utcnow(),
            active_action_type="ESL_MARKDOWN",
            action_fired_summary="30% markdown auto-applied (₹80 → ₹56) + QR coupon live",
            action_time_str="14:31 IST, today",
            money_recovered_inr=640.0,
            reviewer="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST"
        )

        canonical_spinach = CrateModel(
            crate_code="#AF-CRATE-0312",
            commodity="spinach",
            variety="Indian Palak Bundles on chilled rack",
            latin_name="Spinacia oleracea",
            store_id="#STORE-BLR-014",
            vendor_name="GreenLeaf Agri · #VENDOR-GLA-012",
            batch_lot="LOT-2026-GLA-0312",
            farm_origin="Hosur Green Belt",
            aisle_location="DMart, Bangalore, aisle 2",
            shelf_tag="ESL-SPN-02B",
            hours_in_store=16.0,
            ambient_temp_avg_c=7.5,
            calibration_tile_delta_e=0.35,
            calibration_tile_status="ACTIVE_100_TILE_LOCKED",
            ae_drift_pct=0.51,
            ae_drift_relative="2.8× above baseline",
            predicted_rsl_days=1.4,
            predicted_rsl_hours=33.6,
            rsl_ci_days=0.3,
            nominal_expected_hours=72.0,
            confidence=0.86,
            status="AUTO_ACTIONED",
            decay_stage="Pre-visual cellular breakdown",
            human_visual_appearance="Crisp green leaves, high internal transpiration rate.",
            current_price_inr=40.0,
            markdown_price_inr=28.0,
            crate_weight_kg=18.0,
            last_scanned_at=datetime.utcnow(),
            active_action_type="QR_COUPON_WHATSAPP",
            action_fired_summary="30% markdown auto-applied (₹40 → ₹28) + WhatsApp QR blast",
            action_time_str="14:31 IST, today",
            money_recovered_inr=216.0,
            reviewer="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST"
        )

        canonical_banana = CrateModel(
            crate_code="#AF-CRATE-0199",
            commodity="banana",
            variety="Robusta Banana Bunches (Island)",
            latin_name="Musa acuminata",
            store_id="#STORE-BLR-014",
            vendor_name="Mysore Agro Cluster · #VENDOR-MYS-089",
            batch_lot="LOT-2026-MYS-0199",
            farm_origin="Nanjangud Belt",
            aisle_location="DMart, Bangalore, aisle 1",
            shelf_tag="ESL-BAN-01C",
            hours_in_store=36.0,
            ambient_temp_avg_c=18.5,
            calibration_tile_delta_e=0.45,
            calibration_tile_status="ACTIVE_100_TILE_LOCKED",
            ae_drift_pct=0.29,
            ae_drift_relative="1.6× above baseline",
            predicted_rsl_days=2.8,
            predicted_rsl_hours=67.2,
            rsl_ci_days=0.5,
            nominal_expected_hours=120.0,
            confidence=0.64, # 64% -> Human Review required (50-70%)
            status="REVIEW_REQUIRED",
            decay_stage="Ethylene surge, climacteric peak",
            human_visual_appearance="Bright yellow skin, zero spotting to naked eye.",
            current_price_inr=60.0,
            markdown_price_inr=45.0,
            crate_weight_kg=20.0,
            last_scanned_at=datetime.utcnow(),
            active_action_type="FEFO_RESORT",
            action_fired_summary="FEFO Re-sort recommended (Move to front tier)",
            action_time_str="14:31 IST, today",
            money_recovered_inr=300.0,
            reviewer="Pending store manager approval: Priya R."
        )

        db.add(canonical_tomato)
        db.add(canonical_spinach)
        db.add(canonical_banana)

        action_canonical = ClosedLoopActionModel(
            crate_code="#AF-CRATE-0481",
            commodity="tomato",
            action_type="ESL_MARKDOWN",
            status="EXECUTED",
            confidence_at_fire=0.78,
            trigger_rule="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST",
            summary="30% markdown auto-applied (₹80 → ₹56) + QR coupon live",
            details_json=json.dumps({
                "original_price": 80.0,
                "markdown_price": 56.0,
                "markdown_pct": 30.0,
                "esl_device_id": "ESL-TOM-04A",
                "channel": "Zigbee Gateway Hub 4",
                "action_time": "14:31 IST, today",
                "qr_coupon": "LIVE · AF-TOM-30"
            }),
            recovered_value_inr=640.0,
            diverted_food_kg=26.7,
            co2e_avoided_kg=22.5,
            created_at=datetime.utcnow(),
            executed_by="Auto-fired (≥70%). Store manager: Priya R. · 14:31 IST"
        )
        db.add(action_canonical)
        db.commit()
    finally:
        db.close()
