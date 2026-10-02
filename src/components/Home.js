import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/premium_hotel.jpg';
import img2 from '../img/premium_spa.jpg';
import img3 from '../img/premium_barber.jpg';
import funeral from './funeral.jpeg';
import Function from './Functions.jpeg';

import premium_dining from '../img/premium_dining.jpg';
import premium_pool from '../img/premium_pool.jpg';
import gal_hotel from '../img/gallery_hotel.jpg';
import gal_salon from '../img/gallery_salon.jpg';
import gal_gym_pic from '../img/gym_premium.jpg';
import gal_grooming from '../img/gallery_grooming.jpg';
import gal_special from '../img/gallery_special_new.jpg';
import gal_function from '../img/gallery_function_new.jpg';

import banner1 from './kovaisWebBanner/1.jpg';
import banner2 from './kovaisWebBanner/2.jpg';
import banner3 from './kovaisWebBanner/3.png';
import banner4 from '../img/banner4.jpg';
import banner5 from '../img/banner5.jpg';
import banner6 from '../img/banner6.jpg';

import testimonial1 from '../img/testimonial1.png';
import testimonial2 from '../img/testimonial2.png';
import testimonial3 from '../img/testimonial3.png';

import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaStar, FaArrowRight, FaClock, FaUsers, FaHeart, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaAward } from 'react-icons/fa';
import '../Carousel.css';
import "./Home.css";

// Counter Hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count: count === 0 && !inView ? target : count, ref };
}

function StatItem({ value, suffix, label, icon }) {
  const numericValue = parseInt(value);
  const { count, ref } = useCounter(numericValue);

  return (
    <div ref={ref} className="glass-stat-item">
      <div className="glass-stat-icon">{icon}</div>
      <h3 className="glass-stat-number">{count}{suffix}</h3>
      <p className="glass-stat-label">{label}</p>
    </div>
  );
}

function Home({ user }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [banner1, banner2, banner4, banner5, banner6];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleNavigation = (path) => navigate(path);
  const scrollToOffer = () => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' });

  // Data
  const services = [
    { title: "Luxury Hotel", shortDesc: "Book your sanctuary.", fullDesc: "Experience world-class comfort in our meticulously curated rooms.", image: img1, path: "/search-results", tag: "Accommodation" },
    { title: "Wellness Spa", shortDesc: "Restore your essence.", fullDesc: "Immerse yourself in therapeutic rituals drawn from ancient traditions.", image: img2, path: "/spa", tag: "Wellness" },
    { title: "Grooming Salon", shortDesc: "Refine your look.", fullDesc: "Master barbers blend classic techniques with contemporary styles.", image: img3, path: "/barber", tag: "Grooming" },
    { title: "Funeral Service", shortDesc: "Dignified care.", fullDesc: "Providing respectful and compassionate grooming services.", image: funeral, path: "/funeral", tag: "Special Care" },
    { title: "Function Service", shortDesc: "Celebrate in style.", fullDesc: "Look your absolute finest for life's most memorable occasions.", image: Function, path: "/function", tag: "Events" },
    { title: "Fitness Gym", shortDesc: "Transform your body.", fullDesc: "Achieve your fitness goals with state-of-the-art equipment.", image: gal_gym_pic, path: "/gym", tag: "Fitness" },
  ];

  const processSteps = [
    { step: "01", title: "Discover", desc: "Browse our curated range of luxury services." },
    { step: "02", title: "Reserve", desc: "Pick a convenient time with our seamless system." },
    { step: "03", title: "Experience", desc: "Walk in and let our expert team take care of everything." },
    { step: "04", title: "Transform", desc: "Depart refreshed, refined, and ready to conquer." },
  ];

  const galleryItems = [
    { image: gal_hotel, caption: "Grand Suite" },
    { image: gal_salon, caption: "Grooming Studio" },
    { image: gal_gym_pic, caption: "Fitness Centre" },
    { image: gal_grooming, caption: "Spa Retreat" },
    { image: gal_special, caption: "Special Services" },
    { image: gal_function, caption: "Function Prep" },
    { image: premium_dining, caption: "Fine Dining" },
    { image: premium_pool, caption: "Wellness Pool" },
  ];

  const testimonials = [
    { name: "Rajesh Kumar", role: "Hotel Guest", comment: "An unparalleled experience. The staff anticipated every need before I even asked.", rating: 5, image: testimonial1 },
    { name: "Priya Suresh", role: "Spa Client", comment: "The spa treatments left me completely rejuvenated. Truly world-class.", rating: 5, image: testimonial2 },
    { name: "Vikram Mohan", role: "Regular Member", comment: "The consistency of quality and personal attention keeps me coming back.", rating: 5, image: testimonial3 },
    { name: "Deepa Ramesh", role: "Bridal Client", comment: "Every detail was perfect. The team made me feel like royalty.", rating: 5, image: testimonial1 },
    { name: "Arjun Selvam", role: "Gym Member", comment: "Top-notch fitness centre. Modern equipment and motivating atmosphere.", rating: 5, image: testimonial2 },
  ];

  return (
    <div className="home-2026-wrapper">
      {/* ─── HERO SECTION ─── */}
      <section className="hero-2026" id="home">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="hero-bg-slide"
            style={{ backgroundImage: `url(${banners[currentSlide]})` }}
          />
        </AnimatePresence>
        <div className="hero-overlay-2026" />

        <AnimatePresence>
          {currentSlide === 2 && (
            <motion.div 
              key="spa-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="dynamic-banner-text"
            >
              <div className="dynamic-word-large">PURE</div>
              <div className="dynamic-word-large">SERENITY</div>
              <div className="dynamic-badge">KOVAIS SPA</div>
            </motion.div>
          )}
          {currentSlide === 3 && (
            <motion.div 
              key="hotel-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="dynamic-banner-text"
            >
              <div className="dynamic-word-large">GRAND</div>
              <div className="dynamic-word-large">LIVING</div>
              <div className="dynamic-badge">KOVAIS HOTEL</div>
            </motion.div>
          )}
          {currentSlide === 4 && (
            <motion.div 
              key="saloon-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="dynamic-banner-text"
            >
              <div className="dynamic-word-large">MASTER</div>
              <div className="dynamic-word-large">GROOMING</div>
              <div className="dynamic-badge">KOVAIS SALOON</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hero-content-2026">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hero-text-wrapper"
          >
            <div className="hero-btn-group">
              <button className="btn-glow-primary" onClick={scrollToOffer}>
                Book Experience <FaArrowRight />
              </button>
              <button className="btn-glass-secondary" onClick={() => handleNavigation('/contact')}>
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-slider-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* ─── INFINITE MARQUEE ─── */}
      <div className="marquee-2026">
        <div className="marquee-content">
          {["Luxury Hotel", "Wellness Spa", "Fitness Studio", "Master Grooming", "Special Care", "Function Services", "Luxury Hotel", "Wellness Spa", "Fitness Studio", "Master Grooming", "Special Care", "Function Services"].map((item, i) => (
            <span key={i} className="marquee-text">
              <span className="marquee-star">✧</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── WHY KOVAIS SECTION (BENTO BOX) ─── */}
      <section className="about-2026">
        <Container fluid="xl">
          <div className="bento-grid-2026">
            {/* Box 1: Manifesto */}
            <motion.div 
              className="bento-box manifesto-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-tag-2026" style={{ alignSelf: 'flex-start' }}>The Kovais Standard</div>
              <h2 className="bento-title">A Decade of <span className="gold-text">Uncompromising</span> Luxury.</h2>
              <p className="bento-desc">
                Born in 2014 out of a desire to redefine hospitality in Coimbatore. We are more than a brand; we are a sanctuary for those who appreciate the finest details in grooming, wellness, and stay.
              </p>
            </motion.div>

            {/* Box 2: Image Box */}
            <motion.div 
              className="bento-box image-box"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img src={gal_hotel} alt="Luxury Interior" className="bento-img" />
              <div className="bento-img-overlay">
                <h4>Where Elegance Meets Comfort</h4>
              </div>
            </motion.div>

            {/* Box 3: Stats */}
            <motion.div 
              className="bento-box stats-bento"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bento-stat-row">
                <StatItem value={10} suffix="+" label="Years of Mastery" icon={<FaAward />} />
                <StatItem value={5000} suffix="+" label="Elite Members" icon={<FaUsers />} />
              </div>
            </motion.div>

            {/* Box 4: Features */}
            <motion.div 
              className="bento-box features-bento"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="bento-subtitle">The Kovais Promise</h4>
              <ul className="bento-feature-list">
                <li><FaStar className="gold-text" /> World-Class Aesthetics</li>
                <li><FaHeart className="gold-text" /> Unrivaled Personal Care</li>
                <li><FaClock className="gold-text" /> 24/7 Concierge Support</li>
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section className="services-2026" id="bookings">
        <Container fluid="xl">
          <div className="text-center mb-5">
            <div className="section-tag-2026 mx-auto">Discover</div>
            <h2 className="section-title-2026 text-center">
              Curated <span className="gold-text">Experiences</span>
            </h2>
          </div>
          <Row className="g-4">
            {services.map((srv, idx) => (
              <Col lg={4} md={6} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="h-100"
                >
                  <div className="glass-service-card" onClick={() => handleNavigation(srv.path)}>
                    <div className="service-img-container">
                      <img src={srv.image} alt={srv.title} className="service-img-2026" />
                      <div className="service-badge-2026">{srv.tag}</div>
                    </div>
                    <div className="service-content-2026">
                      <h4 className="service-title">{srv.title}</h4>
                      <p className="service-desc">{srv.fullDesc}</p>
                      <button className="service-btn-2026">
                        Explore <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="process-2026">
        <Container>
          <div className="text-center mb-5">
            <div className="section-tag-2026 mx-auto">Seamless Journey</div>
            <h2 className="section-title-2026 text-center">
              How It <span className="gold-text">Works</span>
            </h2>
          </div>
          <Row className="g-4">
            {processSteps.map((step, i) => (
              <Col lg={3} md={6} key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="process-glass-card"
                >
                  <div className="process-step-num">{step.step}</div>
                  <h5 className="process-title-2026">{step.title}</h5>
                  <p className="process-desc-2026">{step.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="gallery-2026">
        <div className="text-center mb-5">
          <div className="section-tag-2026 mx-auto">Visuals</div>
          <h2 className="section-title-2026 text-center">
            Inside <span className="gold-text">Kovais</span>
          </h2>
        </div>
        <div className="gallery-grid-2026">
          {galleryItems.map((item, i) => (
            <motion.div 
              key={i} 
              className="gallery-item-2026"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={item.image} alt={item.caption} />
              <div className="gallery-overlay-2026">
                <span>{item.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials-2026">
        <Container>
          <div className="text-center mb-5">
            <div className="section-tag-2026 mx-auto">Voices</div>
            <h2 className="section-title-2026 text-center">
              Guest <span className="gold-text">Stories</span>
            </h2>
          </div>
          <div className="testimonial-track-container">
            <div className="testimonial-track">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div className="testimonial-glass-card" key={i}>
                  <div className="quote-mark">"</div>
                  <p className="testimonial-text-2026">{t.comment}</p>
                  <div className="stars-2026">
                    {[...Array(5)].map((_, j) => <FaStar key={j} className={j < t.rating ? "gold-star" : "gray-star"} />)}
                  </div>
                  <div className="testimonial-user">
                    <img src={t.image} alt={t.name} />
                    <div>
                      <h6>{t.name}</h6>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-2026">
        <div className="cta-glass-box">
          <h2>Ready for the <span className="gold-text">Ultimate</span> Experience?</h2>
          <p>Join the elite circle of guests who demand nothing but the best.</p>
          <button className="btn-glow-primary" onClick={scrollToOffer}>
            Reserve Now
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer-2026">
        <Container fluid="xl">
          <Row className="g-5 pb-5 border-bottom-dark">
            <Col lg={4}>
              <h3 className="footer-brand-2026">KOVAIS</h3>
              <p className="footer-desc-2026">
                The epitome of luxury hospitality and wellness in Coimbatore. Elevating your lifestyle since 2014.
              </p>
              <div className="social-links-2026">
                <a href="#!"><FaFacebook /></a>
                <a href="#!"><FaInstagram /></a>
                <a href="#!"><FaTwitter /></a>
                <a href="#!"><FaWhatsapp /></a>
              </div>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <h5 className="footer-title-2026">Services</h5>
              <ul className="footer-links-2026">
                <li><button onClick={() => handleNavigation('/search-results')}>Luxury Hotel</button></li>
                <li><button onClick={() => handleNavigation('/spa')}>Wellness Spa</button></li>
                <li><button onClick={() => handleNavigation('/barber')}>Grooming</button></li>
                <li><button onClick={() => handleNavigation('/funeral')}>Special Care</button></li>
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <h5 className="footer-title-2026">Company</h5>
              <ul className="footer-links-2026">
                <li><button onClick={() => handleNavigation('/about')}>About Us</button></li>
                <li><button onClick={() => handleNavigation('/contact')}>Contact</button></li>
                <li><button onClick={() => handleNavigation('/gallery')}>Gallery</button></li>
                <li><button onClick={() => handleNavigation('/careers')}>Careers</button></li>
              </ul>
            </Col>
            <Col lg={4} md={4}>
              <h5 className="footer-title-2026">Contact</h5>
              <ul className="footer-contact-2026">
                <li><FaPhoneAlt /> +91 92345 67891</li>
                <li><FaEnvelope /> info@kovaisbeauty.com</li>
                <li><FaMapMarkerAlt /> Coimbatore, Tamil Nadu</li>
              </ul>
            </Col>
          </Row>
          <div className="footer-bottom-2026 mt-4 d-flex justify-content-between align-items-center flex-wrap">
            <p className="mb-0">© 2026 Kovais. All rights reserved.</p>
            <div className="footer-legal">
              <button onClick={() => handleNavigation('/privacy')}>Privacy Policy</button>
              <button onClick={() => handleNavigation('/terms')}>Terms of Service</button>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
