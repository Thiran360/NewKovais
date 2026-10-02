with open(r'd:\New folder (2)\NewKovais\src\components\Home.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   PREMIUM HERO BUTTONS REDESIGN
   ────────────────────────────────────────────── */

.hero-btn-group {
  display: flex !important;
  gap: 15px !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  justify-content: center !important;
}

.btn-glow-primary {
  background: linear-gradient(135deg, #DFB960, #C9A84C) !important;
  color: #1A1A1A !important; 
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 700 !important;
  padding: 14px 32px !important;
  border-radius: 50px !important;
  border: 1px solid #E6C57A !important;
  font-size: 1.05rem !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  cursor: pointer !important;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94) !important;
  box-shadow: 0 8px 25px rgba(201, 168, 76, 0.4), inset 0 2px 5px rgba(255,255,255,0.3) !important;
  position: relative !important;
  overflow: hidden !important;
}

.btn-glow-primary:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(201, 168, 76, 0.6), inset 0 2px 5px rgba(255,255,255,0.4) !important;
  background: linear-gradient(135deg, #F0D080, #DFB960) !important;
  color: #000 !important;
}

.btn-glass-secondary {
  background: rgba(26, 26, 26, 0.6) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  color: #FDFAF4 !important; 
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 600 !important;
  padding: 14px 32px !important;
  border-radius: 50px !important;
  border: 1px solid rgba(253, 250, 244, 0.4) !important;
  font-size: 1.05rem !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  display: inline-flex !important;
  align-items: center !important;
  cursor: pointer !important;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
}

.btn-glass-secondary:hover {
  transform: translateY(-4px) !important;
  border-color: #C9A84C !important;
  color: #C9A84C !important;
  background: rgba(26, 26, 26, 0.8) !important;
  box-shadow: 0 12px 30px rgba(201, 168, 76, 0.2) !important;
}

/* Ensure the arrows inside buttons size correctly */
.btn-glow-primary svg, .btn-glass-secondary svg {
  font-size: 1.2rem !important;
  transition: transform 0.3s ease !important;
}

.btn-glow-primary:hover svg {
  transform: translateX(4px) !important;
}
""")

print("Successfully redesigned home hero buttons")
