with open(r'd:\New folder (2)\NewKovais\src\barber\barber.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   NEW PREMIUM BARBER SERVICES & UI
   ────────────────────────────────────────────── */
.barber-services-section {
  padding: 60px 0;
  background: var(--ivory-mid);
}

.barber-section-header {
  text-align: center;
  margin-bottom: 40px;
}

.barber-section-header h2 {
  font-family: var(--font-display) !important;
  font-size: clamp(2.5rem, 4vw, 3.5rem) !important;
  color: var(--charcoal) !important;
  font-weight: 400 !important;
}

.barber-section-tag {
  display: block;
  width: max-content;
  margin: 0 auto 14px;
  font-family: var(--font-accent);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-primary);
  border-bottom: 1px solid var(--gold-light);
  padding-bottom: 4px;
}

.barber-location-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 30px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: var(--tr);
  border: 1px solid rgba(0,0,0,0.05);
  height: 100%;
}

.barber-location-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.barber-location-card.active {
  border-color: var(--gold-primary);
  box-shadow: var(--shadow-gold);
}

.barber-location-icon {
  font-size: 2.5rem;
  color: var(--gold-primary);
  margin-bottom: 20px;
}

.barber-location-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--charcoal);
  margin-bottom: 15px;
}

.barber-location-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal);
  transition: var(--tr);
  margin: 20px auto 0;
}

.barber-location-circle.selected {
  background: var(--gold-primary);
  border-color: var(--gold-primary);
  color: var(--white);
}

.barber-category-track {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}

.barber-category-btn {
  padding: 10px 25px;
  background: transparent;
  border: 1px solid var(--gold-primary);
  color: var(--charcoal);
  border-radius: 30px;
  font-family: var(--font-body);
  transition: var(--tr);
}

.barber-category-btn.active, .barber-category-btn:hover {
  background: var(--gold-primary);
  color: var(--white);
}

.barber-service-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: var(--tr);
  height: 100%;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
}

.barber-service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

.barber-service-card.active {
  border-color: var(--gold-primary);
  box-shadow: var(--shadow-gold);
}

.barber-service-img-wrapper {
  position: relative;
  height: 220px;
}

.barber-service-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.barber-service-price {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(26,26,26,0.85);
  color: var(--gold-primary);
  padding: 6px 14px;
  border-radius: 30px;
  font-family: var(--font-accent);
  font-size: 1rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.barber-service-check {
  position: absolute;
  bottom: -15px;
  right: 20px;
  width: 34px;
  height: 34px;
  background: var(--gold-primary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(201,168,76,0.4);
  z-index: 2;
}

.barber-service-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.barber-service-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--charcoal);
  margin-bottom: 10px;
}

.barber-service-meta {
  font-size: 0.85rem;
  color: var(--gold-dark);
  margin-bottom: 15px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.barber-service-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid var(--charcoal);
  color: var(--charcoal);
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: var(--tr);
  margin-top: auto;
}

.barber-service-btn.selected {
  background: var(--charcoal);
  color: var(--white);
  border-color: var(--charcoal);
}

.barber-service-card:hover .barber-service-btn:not(.selected) {
  background: var(--charcoal);
  color: var(--white);
}

.btn-barber-primary {
  background: var(--gold-light);
  color: var(--charcoal);
  border: none;
  box-shadow: 0 8px 25px rgba(228, 201, 126, 0.25);
  font-family: var(--font-accent);
  border-radius: 30px;
  transition: var(--tr);
}

.btn-barber-primary:hover {
  background: var(--white);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.3);
}
""")
print("CSS Appended")
