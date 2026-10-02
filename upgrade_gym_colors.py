with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace generic bootstrap inline styles with our premium styles
content = content.replace('#f8f9fa', '#FDFAF4') # Ivory
content = content.replace('#dc3545', '#C9A84C') # Gold
content = content.replace('#28a745', '#C9A84C') # Gold
content = content.replace('#daa520', '#C9A84C') # Gold
content = content.replace('#000000', '#1A1A1A') # Charcoal
content = content.replace('#000', '#1A1A1A') 
content = content.replace('btn-danger', 'btn-gym-primary')
content = content.replace('btn-success', 'btn-gym-primary')
content = content.replace('btn-warning', 'btn-gym-primary')
content = content.replace('text-danger', 'text-gold')
content = content.replace('text-success', 'text-gold')
content = content.replace('border-danger', 'border-gold')
content = content.replace('border-success', 'border-gold')
content = content.replace('bg-danger', 'bg-gold')
content = content.replace('bg-success', 'bg-gold')

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   NEW PREMIUM GYM UI (Charcoal, Gold, Ivory)
   ────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap');

body {
  background-color: #FDFAF4 !important; /* Ivory */
}

.gym-container {
  font-family: 'DM Sans', sans-serif !important;
  background-color: #FDFAF4 !important; /* Ivory */
  color: #1A1A1A !important;
}

.gym-hero-section {
  background-image: url('./Img/gym_banner_1.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
  position: relative;
  min-height: 80vh !important;
  display: flex !important;
  align-items: center !important;
}

.hero-overlay {
  background: linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.65) 100%) !important;
  position: absolute !important;
  inset: 0 !important;
}

.pp {
  color: #C9A84C !important; /* Premium Gold */
  font-family: 'Cinzel', serif !important;
  font-weight: 600 !important;
}

h1, h2, h3, h4, h5, h6, .display-4 {
  font-family: 'Cormorant Garamond', serif !important;
}

/* Overriding the ugly feature cards from screenshot */
.gym-feature-card, .glass-card {
  background-color: #1A1A1A !important;
  border: 1px solid rgba(201,168,76,0.2) !important;
  border-radius: 12px !important;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
  overflow: hidden !important;
}

.gym-feature-card:hover, .glass-card:hover {
  transform: translateY(-8px) !important;
  border-color: #C9A84C !important;
  box-shadow: 0 16px 48px rgba(201,168,76,0.2) !important;
}

.gym-feature-card .feature-title, .feature-title {
  color: #C9A84C !important; /* Gold text */
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.8rem !important;
  margin-top: 15px !important;
}

.gym-feature-card .text-muted, .text-muted {
  color: #F5ECD7 !important; /* Pale Gold for desc */
  font-family: 'DM Sans', sans-serif !important;
}

/* Icons */
.feature-icon svg {
  color: #C9A84C !important;
  filter: drop-shadow(0 4px 6px rgba(201,168,76,0.3)) !important;
}

/* Buttons */
.btn-gym-primary {
  background-color: #C9A84C !important;
  border: 1px solid #C9A84C !important;
  color: #1A1A1A !important;
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 600 !important;
  border-radius: 30px !important;
  padding: 12px 30px !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 8px 25px rgba(201, 168, 76, 0.25) !important;
}

.btn-gym-primary:hover {
  background-color: transparent !important;
  border-color: #C9A84C !important;
  color: #C9A84C !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(201, 168, 76, 0.4) !important;
}

/* Global Utility Replacements */
.text-gold, .text-warning {
  color: #C9A84C !important;
}

.bg-gold {
  background-color: #C9A84C !important;
  color: #1A1A1A !important;
}

.border-gold {
  border-color: #C9A84C !important;
}

/* Forms and Modals */
.modal-content {
  background-color: #FDFAF4 !important;
  border: 2px solid #C9A84C !important;
  border-radius: 16px !important;
}
.modal-header {
  border-bottom: 1px solid rgba(201,168,76,0.3) !important;
  background-color: #1A1A1A !important;
}
.modal-title {
  color: #C9A84C !important;
  font-family: 'Cormorant Garamond', serif !important;
}
.modal-header .btn-close {
  filter: invert(1) grayscale(100%) brightness(200%) !important;
}

.form-control, .form-select {
  border: 1px solid rgba(26,26,26,0.2) !important;
  background-color: #fff !important;
  color: #1A1A1A !important;
  border-radius: 8px !important;
}
.form-control:focus, .form-select:focus {
  border-color: #C9A84C !important;
  box-shadow: 0 0 0 0.25rem rgba(201,168,76,0.25) !important;
}

/* Testimonial Cards */
.testimonial-card {
  background-color: #1A1A1A !important;
  border-radius: 16px !important;
  border: 1px solid rgba(201,168,76,0.15) !important;
  padding: 30px !important;
}
.testimonial-card h5 {
  color: #C9A84C !important;
}
.testimonial-card .text-muted {
  color: #F5ECD7 !important;
}

/* Make general texts dark on light backgrounds */
p, span, div {
  /* color: #1A1A1A; (Avoid overriding everything globally to prevent breaking inner components, let utility classes handle it) */
}
""")

print("Gym.js styles upgraded")
