# 🌿 AuraFresh — Freshness has an invisible window. We watch it.

> **"Not another dashboard. Confidence + action."**  
> *Zero New Hardware · Pre-Visual Cellular Decay Detection · Closed-Loop Retail Automation*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://frontend-six-phi-88.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Varun--Khandelwal31%2FAURA--FRESH-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Varun-Khandelwal31/AURA-FRESH)

🌐 **Live Application**: [https://frontend-six-phi-88.vercel.app](https://frontend-six-phi-88.vercel.app)  
🔬 **Live Crate & RSL Prediction**: [https://frontend-six-phi-88.vercel.app/crates/AF-CRATE-0481](https://frontend-six-phi-88.vercel.app/crates/AF-CRATE-0481)

---

## 🌟 Overview

Fresh grocery retailers lose billions of rupees annually to invisible decay. By the time produce degradation becomes visible to the naked human eye or floor staff, 100% of the produce's economic value has already been destroyed, leaving store managers with no option except throwing crates into landfill.

**AuraFresh** discovers the **Invisible Window**—the critical 3 to 5 day window during which produce undergoes cellular degradation before any visible rot appears. Using existing store CCTV cameras calibrated against a **₹100 Macbeth quad-spectral reference tile**, AuraFresh extracts photometric **Auto-Exposure (AE) drift** and fuses it with chilling IoT sensor history through **Arrhenius kinetics** ($k(T) = A \cdot e^{-E_a/RT}$). 

When confidence exceeds 70%, closed-loop actions are executed automatically without human intervention.

---

## 🏗️ System Architecture

```
                                  AURAFRESH ARCHITECTURE
                                  
  [ Retail Produce Bay ]
    │
    ├── CCTV Camera (30 FPS) ──────┐
    └── ₹100 Calibration Tile ────┼──> [ Edge Computer Vision Rig ]
    └── Chiller IoT Sensor (8°C) ──┘        │
                                            ├── Photometric Auto-Exposure (AE) Drift
                                            ├── Gabor Spatial Texture Filters
                                            └── Spectral Illuminance Compensation (ΔE)
                                                    │
                                                    ▼
                                       [ Physical Arrhenius Engine ]
                                            │  k(T) = A · e^(-Ea / RT)
                                            │  Fused RSL Prediction (Days ± CI)
                                            │  Confidence Scoring (0 - 100%)
                                            ▼
                                     [ Closed-Loop Action Bus ]
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
      [ Electronic Shelf Label ]   [ WhatsApp Flash Blast ]    [ Feeding India Donation ]
      30% Markdown (₹80 → ₹56)     Hyperlocal Deals (<1.5km)   Automated Food Bank Dispatch
```

---

## ✨ Key Features

1. **Multi-Section 3D Landing Page**
   - Perspective-enabled 3D tactile freshness grade stamps (**A+**, **A**, **B+**, **B**, **C**).
   - Dynamic 3D Invisible Window timeline with interactive Day 0–10 decay scrubbing.
   - Live physics simulator with temperature adjustment and instant ESL price-drop triggering.

2. **Live Computer Vision & Custom Image Upload Rig (`/crates/[id]`)**
   - Upload any real produce photo directly from phone or desktop.
   - Real OpenCV image processing: extracts chlorophyll degradation indices, surface texture entropy via Laplacian variance, and photometric AE drift.
   - Renders calibrated CCTV viewfinders with Macbeth quad-spectral reference tiles and false-color cellular degradation heatmaps.
   - Dynamic 10-day decay curve with Recharts composed area confidence bands.

3. **Store Manager Console (`/store`)**
   - Live crate monitoring across chilled retail bays.
   - Interactive **Chiller Temperature Anomaly Simulator (+4.6°C spike)** demonstrating dynamic Arrhenius degradation acceleration and immediate action escalation.
   - Direct 1-click action triggers and live value recovery tracking.

4. **Action Center (`/actions`)**
   - Real-time action bus feed with live recovery counter.
   - **Human-in-the-Loop Decision Gates**: Actions between 50% and 70% confidence require quick 1-click approval from store managers. Above 70%, actions auto-fire autonomously.

5. **Kirana Flash Network (`/kirana`) & Vendor Scorecard (`/vendor`)**
   - Hyperlocal B2B redistribution network for rapid crate liquidation within 2 hours.
   - Algorithmic vendor scorecard tracking cold-chain breaches and pre-visual arrival drift.

---

## 💻 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, Recharts, Canvas Confetti.
- **Backend**: FastAPI, Uvicorn, Python 3.9+, OpenCV (`cv2`), NumPy, Pillow, Python-Multipart.
- **Database & State**: SQLite with SQLAlchemy ORM.
- **Protocols & Integrations**: Server-Sent Events (SSE), Twilio TwiML Webhooks, ESL Zigbee emulation.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Varun-Khandelwal31/AURA-FRESH.git
cd AURA-FRESH
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install python-multipart pillow

# Run the API server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
*API documentation available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)*

### 3. Frontend Setup (Next.js)
```bash
cd ../frontend
npm install
npm run dev
```
*Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 🔒 Privacy & Edge Ethics

- **Zero Facial Data**: Only produce texture and photometric numbers leave the store.
- **48-Hour Onboarding**: Mounts onto existing retail CCTV streams and IoT sensors without purchasing proprietary hardware.
- **Scalability**: Designed to scale to 10,000+ grocery stores with sub-100ms inference latency.

---

## 📄 License

MIT License. Built with pride for retail fresh-aisle sustainability.
