import re

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'r', encoding='utf-8') as f:
    content = f.read()

services_regex = re.compile(r'\{\/\* NEW SERVICES SECTION \*\/.*?\{\/\* About Section \*\/\}', re.DOTALL)

new_services = """{/* NEW SERVICES SECTION */}
      <section id="services" className="barber-services-section">
        <Container>
          <div className="barber-section-header" data-aos="fade-up">
            <span className="barber-section-tag">Premium Grooming</span>
            <h2>Our Services</h2>
            <p>Select your location, category, and preferred treatments</p>
          </div>

          {/* Service Location Selection */}
          <div className="barber-location-selector mb-5" data-aos="fade-up">
            <Row className="justify-content-center g-4">
              <Col md={6} lg={5}>
                <div
                  className={`barber-location-card ${booking.location === 'salon' ? 'active' : ''}`}
                  onClick={() => handleLocationChange('salon')}
                >
                  <div className="barber-location-icon">
                    <i className="fas fa-store"></i>
                  </div>
                  <h3 className="barber-location-title">Visit Salon</h3>
                  <p className="barber-location-desc">Experience our premium atmosphere and full range of professional equipment.</p>
                  <div className={`barber-location-circle ${booking.location === 'salon' ? 'selected' : ''}`}>
                    {booking.location === 'salon' ? '✓' : '→'}
                  </div>
                </div>
              </Col>
              
              <Col md={6} lg={5}>
                <div
                  className={`barber-location-card ${booking.location === 'home' ? 'active' : ''}`}
                  onClick={() => handleLocationChange('home')}
                >
                  <div className="barber-location-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h3 className="barber-location-title">Home Service</h3>
                  <p className="barber-location-desc">Our master barbers bring the premium grooming experience directly to your door.</p>
                  <div className={`barber-location-circle ${booking.location === 'home' ? 'selected' : ''}`}>
                    {booking.location === 'home' ? '✓' : '→'}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Category Filter */}
          <div className="barber-category-filter" data-aos="fade-up">
            <div className="barber-category-track">
              {['Men', 'Women', 'Kids', 'Seniors'].map((category) => (
                <button
                  key={category}
                  className={`barber-category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="barber-services-grid" id="services-grid">
            <Row>
              <AnimatePresence>
                {services
                  .filter(service => !selectedCategory || service.category === selectedCategory)
                  .map((service, index) => {
                    const isSelected = booking.services.some(s => s.id === service.id);
                    return (
                      <Col lg={4} md={6} key={service.id} className="mb-4">
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className={`barber-service-card ${isSelected ? 'active' : ''}`}
                          onClick={() => handleServiceSelect(service)}
                        >
                          <div className="barber-service-img-wrapper">
                            <img src={service.image} alt={service.name} className="barber-service-img" />
                            <div className="barber-service-price">₹{service.price}</div>
                            {isSelected && (
                              <div className="barber-service-check">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="barber-service-content">
                            <h4 className="barber-service-title">{service.name}</h4>
                            <div className="barber-service-meta">
                              <span className="barber-service-duration"><i className="far fa-clock"></i> {service.duration}</span>
                              <span className="barber-service-category">{service.category}</span>
                            </div>
                            <p className="barber-service-desc">{service.description}</p>
                            <button className={`barber-service-btn ${isSelected ? 'selected' : ''}`}>
                              {isSelected ? 'ADDED TO BOOKING' : 'ADD SERVICE'}
                            </button>
                          </div>
                        </motion.div>
                      </Col>
                    );
                  })}
              </AnimatePresence>
            </Row>
          </div>

          {booking.services.length > 0 && (
            <div className="text-center mt-5" data-aos="fade-up">
              <button
                onClick={handleScrollDown}
                className="btn-barber-primary px-5 py-3"
              >
                CONTINUE TO SCHEDULE ({booking.services.length} SELECTED)
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* About Section */}"""

content = services_regex.sub(new_services, content)

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Barber.js updated for Services")
