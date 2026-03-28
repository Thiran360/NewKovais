import React, { useState } from 'react';
import './PP.css';

const PrivacyPolicy = () => {
  const [accepted, setAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowModal(false);
    console.log('Privacy Policy accepted for THIRAN360AI');
  };

  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <div className="container">
          <div className="brand-header">
            <div className="brand-logo">THIRAN360AI</div>
            <h1>Privacy Policy</h1>
          </div>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <main className="privacy-content">
        <div className="container">
          <div className="content-wrapper">
            <aside className="toc-sidebar">
              <div className="toc-sticky">
                <h3>Table of Contents</h3>
                <nav className="toc-nav">
                  <a href="#introduction">1. Introduction</a>
                  <a href="#ai-data">2. AI Data Processing</a>
                  <a href="#information-collection">3. Information Collection</a>
                  <a href="#payment-information">4. Payment Information</a>
                  <a href="#information-use">5. Use of Information</a>
                  <a href="#data-sharing">6. Data Sharing</a>
                  <a href="#user-rights">7. Your Rights</a>
                  <a href="#security">8. Data Security</a>
                  <a href="#contact">9. Contact Us</a>
                </nav>
              </div>
            </aside>

            <article className="privacy-article">
              <section id="introduction" className="privacy-section">
                <h2>1. Introduction</h2>
                <p>Welcome to THIRAN360AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information through advanced AI-powered security measures.</p>
                <div className="ai-feature">
                  <h4> AI-Powered Privacy Protection</h4>
                  <p>THIRAN360AI uses artificial intelligence to enhance your privacy protection through automated data anonymization, intelligent threat detection, and personalized privacy controls.</p>
                </div>
              </section>

              <section id="ai-data" className="privacy-section">
                <h2>2. AI Data Processing</h2>
                <p>THIRAN360AI utilizes machine learning algorithms to provide personalized wellness experiences:</p>
                <ul>
                  <li><strong>Predictive Analytics:</strong> AI analyzes your preferences to suggest optimal spa, gym, and salon services</li>
                  <li><strong>Smart Recommendations:</strong> Machine learning improves service recommendations based on your usage patterns</li>
                  <li><strong>Automated Optimization:</strong> AI continuously optimizes your wellness journey based on real-time data</li>
                  <li><strong>Data Anonymization:</strong> Personal data is anonymized before AI processing to protect your identity</li>
                </ul>
              </section>

              <section id="information-collection" className="privacy-section">
                <h2>3. Information We Collect</h2>
                
                <h3>3.1 Personal Information</h3>
                <ul>
                  <li><strong>Wellness Profile:</strong> Health preferences, service history, fitness goals</li>
                  <li><strong>Booking Information:</strong> Spa appointments, gym sessions, hotel stays, salon visits</li>
                  <li><strong>Communication Data:</strong> Messages with our AI concierge and support team</li>
                </ul>

                <h3>3.2 AI Training Data</h3>
                <p>To improve our AI models, we collect anonymized data about:</p>
                <ul>
                  <li>Service usage patterns across our wellness ecosystem</li>
                  <li>General preferences for spa, gym, hotel, and salon services</li>
                  <li>Anonymous behavioral patterns to enhance user experience</li>
                </ul>
              </section>

              <section id="payment-information" className="privacy-section">
                <h2>4. Payment Information & Billing</h2>
                <h3>4.1 Payment Processing</h3>
                <p>When you make payments through THIRAN360AI, your payment information is processed securely by THIRAN360AI (Cashfree) as our payment processor. We collect limited payment information necessary to process your transactions.</p>
                
                <h3>4.2 Data Handling</h3>
                <p>THIRAN360AI does not store your complete payment card details. All sensitive payment information is handled by our secure payment processor in compliance with PCI DSS standards.</p>
                
                <h3>4.3 Billing Records</h3>
                <p>We maintain records of your transactions for accounting purposes and to provide customer support. These records include transaction amounts, dates, and service details but exclude full payment card information.</p>

                <div className="payment-notice">
                  <strong>Payment Information:</strong> All payments are processed by THIRAN360AI (Cashfree) as our secure payment processor.
                </div>
              </section>

              {/* Other sections remain similar but updated with THIRAN360AI context */}

              <section id="contact" className="privacy-section">
                <h2>9. Contact THIRAN360AI</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <strong>📧 Email:</strong> info@kovaisbeauty.com
                  </div>
                  <div className="contact-method">
                    <strong>📞 Support:</strong> +91 9234567891
                  </div>
                  <div className="contact-method">
                    <strong> Website:</strong> kovaisbeauty.com , thiran360ai.com   
                  </div>
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
                    I have read and agree to the THIRAN360AI Privacy Policy
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

      <footer className="privacy-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} THIRAN360AI. All rights reserved.</p>
          <div className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/refund">Refund Policy</a>
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
            <div className="modal-hea">
              <h3>Privacy Policy Accepted</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              {/* <div className="modal-icon">🔒</div> */}
              <p>Thank you for accepting THIRAN360AI Privacy Policy. Your data is protected by our AI-powered security systems.</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleAccept} className="confirm-btn">Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;