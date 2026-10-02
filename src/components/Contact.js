import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaArrowLeft,
  FaStar,
  FaUsers,
  FaHeart,
  FaPaperPlane,
  FaCreditCard
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import './Contact.css';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-accent" size={24} />,
      title: "Phone",
      details: ["+91 9234567891", "+91 8765432109"],
      description: "Call us anytime for immediate assistance"
    },
    {
      icon: <FaEnvelope className="text-success" size={24} />,
      title: "Email",
      details: ["info@kovaisbeauty.com", "bookings@kovaisbeauty.com"],
      description: "Send us your queries and we'll respond quickly"
    },
    {
      icon: <FaMapMarkerAlt className="text-info" size={24} />,
      title: "Address",
      details: ["097, SH 15, Otthakkuthirai", "Gobichettipalayam, Tamil Nadu 638455"],
      description: "Visit us at our premium location"
    },
    {
      icon: <FaClock className="text-warning" size={24} />,
      title: "Business Hours",
      details: ["Mon - Sun: 6:00 AM - 11:00 PM", "24/7 Hotel Reception"],
      description: "We're here when you need us"
    }
  ];

  const services = [
    "Luxury Hotel Booking",
    "Spa & Wellness",
    "Fitness & Gym",
    "Barber & Grooming",
    "Event Booking",
    "General Inquiry"
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8} data-aos="fade-up">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="display-5 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Get in Touch with <span className="text-accent"  style={{ fontFamily: 'Playfair Display, serif' }}>Kovais</span>
                </h2>
                <p className="lead text-muted mb-4">
                  We're here to help you with all your hospitality and wellness needs. 
                  Reach out to us for bookings, inquiries, or just to say hello!
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information Cards */}
      <section className="contact-info py-5">
        <Container>
          <Row className="g-4 mb-5">
            {contactInfo.map((info, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-100"
                >
                  <Card className="contact-info-card h-100 border-0 shadow-sm text-center p-3" data-aos="fade-up">
                    <div className="contact-icon-wrapper bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 p-2">
                      {info.icon}
                    </div>
                    <Card.Body className="p-2">
                      <h6 className="fw-bold mb-2">{info.title}</h6>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="mb-1 fw-semibold text-dark" style={{ fontSize: '0.85rem', wordBreak: 'break-word' }}>{detail}</p>
                      ))}
                      <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.75rem' }}>{info.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section py-5 bg-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="shadow-sm border-0" data-aos="fade-up">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <h4 className="fw-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Send Us a Message</h4>
                    <p className="text-muted small">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="rounded-pill"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                            className="rounded-pill"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="rounded-pill"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Service Interest</Form.Label>
                          <Form.Select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="rounded-pill"
                          >
                            <option value="">Select a service</option>
                            {services.map((service, idx) => (
                              <option key={idx} value={service}>{service}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us how we can help you..."
                            required
                            className="rounded-3"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} className="text-center mt-4">
                        <Button 
                          type="submit" 
                          className="btn-submit"
                        >
                          <FaPaperPlane className="me-2" />
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer py-5 border-top" style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}>
        <Container>
          <Row className="g-4 mb-4">
            <Col lg={4} md={6}>
              <h4 className="fw-bold mb-3" style={{ color: '#daa520', fontFamily: 'Playfair Display, serif' }}>Kovais</h4>
              <p className="text-light opacity-75 mb-4 pe-lg-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Your trusted partner for luxury hospitality, wellness, and grooming services. 
                Experience excellence with us.
              </p>
              <Button 
                variant="outline-light" 
                className="rounded-pill px-4 btn-sm fw-semibold"
                style={{ borderColor: 'rgba(218, 165, 32, 0.5)', color: '#daa520' }}
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </Col>
            <Col lg={4} md={6}>
              <h6 className="fw-semibold mb-4 text-white text-uppercase" style={{ letterSpacing: '0.05em' }}>Quick Contact</h6>
              <div>
                <div className="d-flex align-items-center mb-3">
                  <FaPhone className="me-3" style={{ color: '#daa520' }} size={16} />
                  <span className="text-light opacity-75 small">+91 9234567891</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="me-3" style={{ color: '#daa520' }} size={16} />
                  <span className="text-light opacity-75 small">info@kovaisbeauty.com</span>
                </div>
                <div className="d-flex align-items-start">
                  <FaMapMarkerAlt className="me-3 mt-1" style={{ color: '#daa520' }} size={16} />
                  <span className="text-light opacity-75 small">097, SH 15, Otthakkuthirai, Gobichettipalayam, Tamil Nadu 638455</span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <h6 className="fw-semibold mb-4 text-white text-uppercase" style={{ letterSpacing: '0.05em' }}>Business Hours</h6>
              <div>
                <div className="d-flex justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                  <span className="text-light opacity-50 small">Monday - Sunday</span>
                  <span className="text-light fw-semibold small">6:00 AM - 11:00 PM</span>
                </div>
                <div className="d-flex justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                  <span className="text-light opacity-50 small">Hotel Reception</span>
                  <span className="text-light fw-semibold small" style={{ color: '#daa520' }}>24/7 Available</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-light opacity-50 small">Emergency Contact</span>
                  <span className="text-light fw-semibold small">Always Available</span>
                </div>
              </div>
            </Col>
          </Row>
          
          <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-2">
            <p className="mb-3 mb-md-0 text-light opacity-50" style={{ fontSize: '0.8rem' }}>
              &copy; 2024 KOVAIS. All Rights Reserved. | Designed with <span style={{color: '#daa520'}}>❤</span> for Excellence
            </p>
            <div className="d-flex align-items-center text-light opacity-75" style={{ fontSize: '0.8rem' }}>
              <FaCreditCard className="me-2" style={{color: '#daa520'}} size={16} />
              <span>Payments securely processed by <strong className="text-white">THIRAN360AI</strong> (Cashfree)</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default Contact;