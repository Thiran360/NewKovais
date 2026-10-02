import re

with open(r'd:\New folder (2)\NewKovais\src\spa\spa.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Gender Selection
gender_regex = re.compile(r'\{\/\* Gender Selection \*\/.*?<\/section>', re.DOTALL)
new_gender = """{/* Gender Selection */}
        <section className="gender-selection-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Treatments</span>
              <h2>Select Your Preference</h2>
              <p>Choose your preferred treatment category for a personalized spa experience</p>
            </div>
            <Row className="justify-content-center">
              {[
                {
                  gender: "Men",
                  image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg",
                  description: "Specialized holistic treatments designed to alleviate muscle tension and restore balance for men."
                },
                {
                  gender: "Women",
                  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                  description: "Customized wellness therapies crafted to rejuvenate the mind, body, and spirit for women."
                }
              ].map(({ gender, image, description }, index) => (
                <Col key={index} xs={12} md={6} lg={5} className="mb-5">
                  <div 
                    data-aos="fade-up" 
                    data-aos-delay={index * 150}
                    className={`spa-gender-card ${selectedGender === gender ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedGender(gender);
                      handleScroll();
                    }}
                  >
                    <div className="spa-gender-img-wrapper">
                      <img src={image} alt={gender} className="spa-gender-img" />
                      <div className="spa-gender-overlay"></div>
                      <h3 className="spa-gender-title">{gender}</h3>
                    </div>
                    <div className="spa-gender-content">
                      <p className="spa-gender-desc">{description}</p>
                      <div className="spa-gender-select-wrapper">
                        <span className="spa-gender-select-text">
                          {selectedGender === gender ? 'SELECTED' : `SELECT ${gender.toUpperCase()}`}
                        </span>
                        <div className={`spa-gender-circle ${selectedGender === gender ? 'selected' : ''}`}>
                          {selectedGender === gender ? '✓' : '→'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>"""
content = gender_regex.sub(new_gender, content)

# Replace Service Selection
service_regex = re.compile(r'\{\/\* Service Selection \*\/.*?<\/section>', re.DOTALL)
new_service = """{/* Service Selection */}
        <section className="service-selection-section" id="target-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Therapies</span>
              <h2>Choose Your Services</h2>
              <p>Select multiple premium services for your perfect, tailored spa experience</p>
            </div>
            <Row>
              {services[selectedGender] && services[selectedGender].map((service, index) => {
                const isSelected = selectedServices.find(s => s?.id === service.id);
                return (
                  <Col lg={4} md={6} key={service.id} className="mb-4">
                    <div 
                      data-aos="fade-up" 
                      data-aos-delay={index * 100}
                      className={`spa-service-card ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectService(service)}
                    >
                      <div className="spa-service-img-wrapper">
                        <img src={service.imageUrl} alt={service.name} className="spa-service-img" />
                        <div className="spa-service-price">₹{service.amount}</div>
                        {isSelected && (
                          <div className="spa-service-check">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="spa-service-content">
                        <h4 className="spa-service-title">{service.name}</h4>
                        <div className="spa-service-meta">
                          <span className="spa-service-duration"><i className="far fa-clock"></i> 60 Min</span>
                        </div>
                        <p className="spa-service-desc">{service.description}</p>
                        <button className={`spa-service-btn ${isSelected ? 'selected' : ''}`}>
                          {isSelected ? 'ADDED TO BOOKING' : 'ADD SERVICE'}
                        </button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>

            {selectedServices.length > 0 && (
              <div className="text-center mt-5" data-aos="fade-up">
                <button
                  onClick={handleScrollDown}
                  className="btn-spa-primary"
                >
                  CONTINUE TO DATE & TIME ({selectedServices.length} SELECTED)
                </button>
              </div>
            )}
          </Container>
        </section>"""
content = service_regex.sub(new_service, content)

# Replace Date and Time
datetime_regex = re.compile(r'\{\/\* Date and Time Selection \*\/.*?<\/section>', re.DOTALL)
new_datetime = """{/* Date and Time Selection */}
        <section id="datetime-section" className="datetime-section">
          <Container>
            <div className="spa-section-header" data-aos="fade-up">
              <span className="spa-section-tag">Schedule</span>
              <h2>Select Date & Time</h2>
              <p>Choose your preferred appointment date and available time slot for your session</p>
            </div>

            <div className="spa-datetime-container" data-aos="fade-up">
              <Row className="g-0">
                <Col md={5} className="spa-date-col">
                  <div className="spa-datetime-panel">
                    <h3 className="spa-panel-title">1. Select Date</h3>
                    <div className="spa-date-input-wrapper">
                      <input
                        type="date"
                        value={formatDateForInput(selectedDate)}
                        onChange={handleDateChange}
                        min={formatDateForInput(new Date())}
                        className="spa-date-input"
                      />
                    </div>
                    <div className="spa-selected-date-display">
                      <span>YOUR SELECTED DATE</span>
                      <h4>{selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}</h4>
                    </div>
                  </div>
                </Col>
                
                <Col md={7} className="spa-time-col">
                  <div className="spa-datetime-panel">
                    <h3 className="spa-panel-title">2. Available Times</h3>
                    <div className="spa-time-grid">
                      {availableSlots.map((slot) => {
                        const isDisabled = isTimeSlotDisabled(slot);
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => !isDisabled && setSelectedTime(slot)}
                            disabled={isDisabled}
                            className={`spa-time-slot ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {isToday(selectedDate) && (
                      <p className="spa-time-warning mt-4">
                        * Past time slots are disabled for today's date.
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            {selectedTime && selectedServices.length > 0 && (
              <div className="text-center mt-5" data-aos="fade-up">
                <button
                  onClick={handlePayment}
                  className="btn-spa-primary px-5 py-3"
                  style={{ fontSize: '1.1rem' }}
                >
                  PROCEED TO SECURE PAYMENT
                </button>
              </div>
            )}
          </Container>
        </section>"""
content = datetime_regex.sub(new_datetime, content)

with open(r'd:\New folder (2)\NewKovais\src\spa\spa.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\spa\spa.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

css_regex = re.compile(r'\/\* ──────────────────────────────────────────────\s*6\. GENDER SELECTION SECTION.*?$', re.DOTALL)

new_css = """/* ──────────────────────────────────────────────
   6. GENDER SELECTION SECTION
   ────────────────────────────────────────────── */
.gender-selection-section {
  padding: 100px 0;
  background: var(--ivory);
}

.spa-gender-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: var(--tr);
  height: 100%;
  border: 1px solid rgba(0,0,0,0.04);
  position: relative;
}

.spa-gender-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
}

.spa-gender-card.active {
  border-color: var(--gold-primary);
  box-shadow: var(--shadow-gold);
}

.spa-gender-img-wrapper {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.spa-gender-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.spa-gender-card:hover .spa-gender-img {
  transform: scale(1.08);
}

.spa-gender-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.1) 100%);
}

.spa-gender-title {
  position: absolute;
  bottom: 20px;
  left: 30px;
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--white);
  margin: 0;
  letter-spacing: 1px;
}

.spa-gender-content {
  padding: 30px;
}

.spa-gender-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 25px;
}

.spa-gender-select-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-top: 20px;
}

.spa-gender-select-text {
  font-family: var(--font-accent);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--charcoal);
  transition: var(--tr);
}

.spa-gender-card.active .spa-gender-select-text {
  color: var(--gold-dark);
}

.spa-gender-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--charcoal);
  transition: var(--tr);
}

.spa-gender-circle.selected {
  background: var(--gold-primary);
  border-color: var(--gold-primary);
  color: var(--white);
}

/* ──────────────────────────────────────────────
   7. SERVICE SELECTION SECTION
   ────────────────────────────────────────────── */
.service-selection-section {
  padding: 100px 0;
  background: var(--ivory-mid);
}

.spa-service-card {
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

.spa-service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

.spa-service-card.active {
  border-color: var(--gold-primary);
  box-shadow: var(--shadow-gold);
}

.spa-service-img-wrapper {
  position: relative;
  height: 220px;
}

.spa-service-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spa-service-price {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(26,26,26,0.85);
  color: var(--gold-primary);
  padding: 6px 14px;
  border-radius: 30px;
  font-family: var(--font-accent);
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.spa-service-check {
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

.spa-service-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.spa-service-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--charcoal);
  margin-bottom: 10px;
}

.spa-service-meta {
  font-size: 0.85rem;
  color: var(--gold-dark);
  margin-bottom: 15px;
  font-weight: 500;
}

.spa-service-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1;
}

.spa-service-btn {
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
}

.spa-service-btn.selected {
  background: var(--charcoal);
  color: var(--white);
  border-color: var(--charcoal);
}

.spa-service-card:hover .spa-service-btn:not(.selected) {
  background: var(--charcoal);
  color: var(--white);
}

/* ──────────────────────────────────────────────
   8. DATE AND TIME SECTION
   ────────────────────────────────────────────── */
.datetime-section {
  padding: 100px 0 120px;
  background: var(--ivory);
}

.spa-datetime-container {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
}

.spa-datetime-panel {
  padding: 50px 40px;
  height: 100%;
}

.spa-date-col {
  background: var(--charcoal);
  color: var(--white);
}

.spa-date-col .spa-panel-title {
  color: var(--white);
}

.spa-panel-title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--charcoal);
  margin-bottom: 30px;
}

.spa-date-input-wrapper {
  margin-bottom: 40px;
}

.spa-date-input {
  width: 100%;
  padding: 18px 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--white);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 1.1rem;
  color-scheme: dark;
}

.spa-date-input:focus {
  outline: none;
  border-color: var(--gold-primary);
}

.spa-selected-date-display span {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  color: var(--gold-light);
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 10px;
}

.spa-selected-date-display h4 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--white);
  font-weight: 300;
}

.spa-time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.spa-time-slot {
  padding: 14px 10px;
  background: var(--ivory);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  color: var(--charcoal);
  font-family: var(--font-body);
  font-weight: 500;
  transition: var(--tr-fast);
  cursor: pointer;
}

.spa-time-slot:hover:not(.disabled) {
  border-color: var(--gold-primary);
  color: var(--gold-dark);
  background: var(--ivory-mid);
}

.spa-time-slot.active {
  background: var(--gold-primary);
  border-color: var(--gold-primary);
  color: var(--white);
  box-shadow: 0 4px 10px rgba(201,168,76,0.3);
}

.spa-time-slot.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f5f5f5;
}

.spa-time-warning {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 20px;
}
"""
css_content = css_regex.sub(new_css, css_content)
with open(r'd:\New folder (2)\NewKovais\src\spa\spa.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("UI updated successfully")
