# Exporting kinetics from backend/lib/kinetics.py for direct root access
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from lib.kinetics import (
    COMMODITY_PROFILES,
    CANONICAL_DEMO_CASES,
    calculate_arrhenius_k,
    predict_rsl_and_confidence,
)

__all__ = [
    "COMMODITY_PROFILES",
    "CANONICAL_DEMO_CASES",
    "calculate_arrhenius_k",
    "predict_rsl_and_confidence",
]
