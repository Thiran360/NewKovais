import React, { useState } from 'react';
import './Refund.css';

const RefundCancellationPolicy = () => {
  const [accepted, setAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowModal(false);
    console.log('Refund Policy accepted for THIRAN360AI');
  };

  return (
    <div className="refund-container">
      <header className="refund-header">
        <div className="container">
          <div className="brand-header">
            <div className="brand-logo">THIRAN360AI</div>
            <h1>Refund & Cancellation Policy</h1>
          </div>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <div className="service-tags">
            <span className="service-tag">AI-Powered Spa</span>
            <span className="service-tag">Smart Gym</span>
            <span className="service-tag">Intelligent Hotel</span>
            <span className="service-tag">Digital Salon</span>
          </div>
        </div>
      </header>

      <main className="refund-content">
        <div className="container">
          <div className="content-wrapper">
            <aside className="toc-sidebar">
              <div className="toc-sticky">
                <h3>Table of Contents</h3>
                <nav className="toc-nav">
                  <a href="#introduction">1. Introduction</a>
                  <a href="#ai-booking">2. AI Booking System</a>
                  <a href="#cancellation-policy">3. Cancellation Policy</a>
                  <a href="#refund-policy">4. Refund Policy</a>
                  <a href="#refund-process">5. Refund Process</a>
                  <a href="#smart-modifications">6. Smart Modifications</a>
                  <a href="#contact">7. Contact Us</a>
                </nav>
              </div>
            </aside>

            <article className="refund-article">
              <div className="policy-summary">
                <h3> AI-Powered Policy Overview</h3>
                <div className="summary-grid">
                  <div className="summary-card">
                    {/* <div className="summary-icon">🧘</div> */}
                    <h4>AI Spa Services</h4>
                    <p>24-hour smart cancellation. AI rescheduling available instantly.</p>
                  </div>
                  <div className="summary-card">
                    {/* <div className="summary-icon">💪</div> */}
                    <h4>Smart Gym</h4>
                    <p>Flexible AI-managed memberships. 30-day intelligent satisfaction guarantee.</p>
                  </div>
                  <div className="summary-card">
                    {/* <div className="summary-icon">🏨</div> */}
                    <h4>Intelligent Hotel</h4>
                    <p>48-hour AI-optimized cancellation. Dynamic pricing adjustments.</p>
                  </div>
                  <div className="summary-card">
                    {/* <div className="summary-icon">💇</div> */}
                    <h4>Digital Salon</h4>
                    <p>12-hour smart cancellation. AI stylist matching guarantee.</p>
                  </div>
                </div>
              </div>

              <section id="introduction" className="refund-section">
                <h2>1. Introduction</h2>
                <p>Welcome to THIRAN360AI's Refund and Cancellation Policy. Our AI-driven system ensures fair and efficient handling of all booking changes and refund requests across our wellness ecosystem.</p>
                <div className="ai-feature">
                  <h4>🚀 AI-Powered Cancellation Management</h4>
                  <p>THIRAN360AI uses machine learning to optimize cancellation windows, automate refund processing, and provide intelligent rescheduling options based on real-time availability.</p>
                </div>
              </section>

              <section id="ai-booking" className="refund-section">
                <h2>2. AI Booking & Cancellation System</h2>
                <p>THIRAN360AI's intelligent booking system provides enhanced flexibility:</p>
                <ul>
                  <li><strong>Predictive Availability:</strong> AI suggests optimal booking times with flexible cancellation options</li>
                  <li><strong>Smart Notifications:</strong> Automated reminders and cancellation deadline alerts</li>
                  <li><strong>Instant Rescheduling:</strong> AI finds alternative slots based on your preferences</li>
                  <li><strong>Dynamic Pricing:</strong> Real-time adjustment of cancellation fees based on demand</li>
                </ul>
              </section>

              <section id="cancellation-policy" className="refund-section">
                <h2>3. AI-Optimized Cancellation Policy</h2>
                
                <div className="service-specific">
                  <h3>3.1 THIRAN360AI Spa Services</h3>
                  <ul>
                    <li><strong>24+ hours notice:</strong> Full refund or AI-assisted rescheduling</li>
                    <li><strong>6-24 hours notice:</strong> 30% service charge (AI-optimized pricing)</li>
                    <li><strong>Less than 6 hours:</strong> 60% service charge</li>
                  </ul>
                </div>

                <div className="service-specific">
                  <h3>3.2 Smart Gym Memberships</h3>
                  <ul>
                    <li><strong>AI Satisfaction Guarantee:</strong> 30-day full refund for new members</li>
                    <li><strong>Monthly Cancellation:</strong> 15-day notice period with AI processing</li>
                    <li><strong>Personal Training:</strong> 12-hour smart cancellation window</li>
                  </ul>
                </div>

                <div className="service-specific">
                  <h3>3.3 Intelligent Hotel Bookings</h3>
                  <ul>
                    <li><strong>48+ hours notice:</strong> Full refund with AI credit for future stays</li>
                    <li><strong>24-48 hours notice:</strong> 40% refund + AI travel credit</li>
                    <li><strong>Less than 24 hours:</strong> AI-managed travel credit for full amount</li>
                  </ul>
                </div>

                <div className="service-specific">
                  <h3>3.4 Digital Salon Services</h3>
                  <ul>
                    <li><strong>12+ hours notice:</strong> Full refund or AI stylist rescheduling</li>
                    <li><strong>4-12 hours notice:</strong> 20% service charge</li>
                    <li><strong>Less than 4 hours:</strong> 40% service charge</li>
                  </ul>
                </div>
              </section>

              <section id="refund-policy" className="refund-section">
                <h2>4. Refund Policy</h2>
                <h3>4.1 General Refund Terms</h3>
                <p>Refunds are processed based on the cancellation policy for each service type. Approved refunds will be credited to your original payment method through our payment processor.</p>
                
                <h3>4.2 Refund Processing</h3>
                <p>Refunds issued by THIRAN360AI on behalf of KovaisBeauty and other service partners. The refund amount will be processed based on the cancellation timeline and service-specific policies.</p>
                
                <div className="refund-notice">
                  <strong>Refund Processing:</strong> All refunds are issued by THIRAN360AI on behalf of KovaisBeauty and processed through our secure payment system.
                </div>
              </section>

              <section id="refund-process" className="refund-section">
                <h2>5. AI-Enhanced Refund Process</h2>
                <p>THIRAN360AI processes refunds through our intelligent payment system:</p>
                
                <div className="process-timeline">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>AI Refund Request</h4>
                      <p>Submit through THIRAN360AI app, website, or AI concierge</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Smart Verification</h4>
                      <p>AI system verifies eligibility (1-2 business hours)</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Instant Processing</h4>
                      <p>Automated refund processing by THIRAN360AI payment system</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>AI Confirmation</h4>
                      <p>Smart notification and future booking credits</p>
                    </div>
                  </div>
                </div>

                <div className="processing-time">
                  <h4>Refund Processing Times</h4>
                  <ul>
                    <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
                    <li><strong>Digital Wallets:</strong> 1-3 business days</li>
                    <li><strong>Bank Transfers:</strong> 3-7 business days</li>
                  </ul>
                </div>
              </section>

              <section id="smart-modifications" className="refund-section">
                <h2>6. Smart Booking Modifications</h2>
                <p>THIRAN360AI's AI system makes modifications seamless:</p>
                <ul>
                  <li><strong>Instant Rescheduling:</strong> AI finds perfect alternative slots</li>
                  <li><strong>Service Upgrades:</strong> Smart suggestions for enhanced experiences</li>
                  <li><strong>Bundle Optimization:</strong> AI creates optimal service combinations</li>
                  <li><strong>Price Protection:</strong> AI ensures best pricing during modifications</li>
                </ul>
              </section>

              <section id="contact" className="refund-section">
                <h2>7. Contact THIRAN360AI</h2>
                <p>For refund and cancellation assistance, contact our AI support:</p>
                <div className="contact-methods">
                  {/* <div className="contact-method">
                    <strong>🤖 AI Concierge:</strong> Available 24/7 in THIRAN360AI app
                  </div> */}
                  <div className="contact-method">
                    <strong>📧 Email:</strong> info@kovaisbeauty.com , 
                                                info@thiran360ai.com
                  </div>
                  <div className="contact-method">
                    <strong>📞 Phone:</strong> +91 8765432109 
                  </div>
                  {/* <div className="contact-method">
                    <strong>🌐 Live Chat:</strong> thiran360ai.com/support
                  </div> */}
                </div>
              </section>

              <div className="acceptance-section">
                <div className="acceptance-box">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    I have read and agree to the THIRAN360AI Refund & Cancellation Policy
                  </label>
                  <button 
                    className={`accept-btn ${accepted ? 'active' : ''}`}
                    onClick={() => accepted && setShowModal(true)}
                    disabled={!accepted}
                  >
                    Accept Policy
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <footer className="refund-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} THIRAN360AI. All rights reserved.</p>
          <div className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/contact">Contact Us</a>
          </div>
          <div className="payment-footer-note">
            <p>Payment processed by THIRAN360AI.</p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-head">
              <h3>Policy Accepted</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="modal-icon">🎯</div>
              <p>Thank you for accepting THIRAN360AI Refund & Cancellation Policy. Our AI system will ensure smooth booking management.</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleAccept} className="confirm-btn">Continue to Bookings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundCancellationPolicy;