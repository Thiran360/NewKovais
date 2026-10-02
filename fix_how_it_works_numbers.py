with open(r'd:\New folder (2)\NewKovais\src\components\Home.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   FIX: HOW IT WORKS NUMBERS
   ────────────────────────────────────────────── */

.process-step-num {
  font-family: 'Cinzel', serif !important;
  font-size: 2.5rem !important; /* Smaller size */
  font-weight: 700 !important;
  color: #FDFAF4 !important; /* Fully visible in white/ivory */
  -webkit-text-stroke: 0 !important; /* Remove hollow outline */
  position: relative !important; /* Flow normally */
  top: auto !important;
  left: auto !important;
  transform: none !important;
  margin-bottom: 5px !important;
  z-index: 2 !important;
  opacity: 1 !important;
  letter-spacing: 0 !important;
}

.process-title-2026 {
  margin-top: 10px !important; /* Reset the huge margin I added earlier */
}
""")

print("Successfully fixed the numbers")
