with open(r'd:\New folder (2)\NewKovais\src\components\Home.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   PREMIUM 'HOW IT WORKS' REDESIGN
   ────────────────────────────────────────────── */

.process-2026 {
  background-color: #FDFAF4 !important; /* Keep Ivory background for contrast */
}

.process-glass-card {
  background-color: #1A1A1A !important;
  border: 1px solid rgba(201,168,76,0.15) !important;
  border-radius: 16px !important;
  padding: 40px 30px !important;
  text-align: center !important;
  transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94) !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  z-index: 1 !important;
}

.process-glass-card:hover {
  transform: translateY(-10px) !important;
  border-color: #C9A84C !important;
  box-shadow: 0 15px 40px rgba(201,168,76,0.2) !important;
}

.process-glass-card::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 4px !important;
  background: linear-gradient(90deg, #DFB960, #C9A84C) !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
}

.process-glass-card:hover::before {
  opacity: 1 !important;
}

.process-step-num {
  font-family: 'Cinzel', serif !important;
  font-size: 6rem !important;
  font-weight: 700 !important;
  color: rgba(201, 168, 76, 0.1) !important; /* Very faint gold watermark */
  position: absolute !important;
  top: -20px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: -1 !important;
  letter-spacing: -2px !important;
  line-height: 1 !important;
}

.process-title-2026 {
  font-family: 'Cormorant Garamond', serif !important;
  color: #C9A84C !important; /* Gold title */
  font-size: 1.8rem !important;
  margin-top: 50px !important; /* Push down to overlap the watermark nicely */
  margin-bottom: 15px !important;
  font-weight: 600 !important;
}

.process-desc-2026 {
  font-family: 'DM Sans', sans-serif !important;
  color: #F5ECD7 !important; /* Pale Gold for description */
  font-size: 1rem !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
""")

print("Successfully redesigned How It Works section")
