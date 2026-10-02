import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import spa from "./spa.jpg";
import gym from "./gym.jpg";
import hotel from "./hotel.jpg";
import barber from "./barber.jpg";
import "./About.css";

function About() {
  useEffect(() => { AOS.init({ duration: 1000, once: true }); }, []);

  return (
    <div className="bw-about-wrapper">
      {/* HERO */}
      <section className="bw-hero">
        <motion.div 
          className="bw-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="bw-title-huge">THE ART OF<br/>REFINEMENT</h1>
          <p className="bw-subtitle">Curating exceptional experiences for those who demand absolute perfection. No compromises. Just pure luxury.</p>
        </motion.div>
      </section>

      {/* ETHOS */}
      <section className="bw-ethos py-5">
        <Container>
          <div className="bw-header" data-aos="fade-up">
            <h2 className="bw-section-title">OUR ETHOS</h2>
            <div className="bw-divider"></div>
          </div>
          <Row className="g-5 mt-4">
            {[
              { num: "01", title: "Uncompromising Quality", desc: "Every detail is meticulously crafted. We partner only with the absolute best to ensure your experience is flawless." },
              { num: "02", title: "Absolute Discretion", desc: "Your privacy is our highest priority. We provide a seamless, invisible layer of service that respects your boundaries." },
              { num: "03", title: "Relentless Perfection", desc: "Good is never enough. We continuously iterate and refine our processes to deliver nothing short of excellence." }
            ].map((item, i) => (
              <Col lg={4} key={i}>
                <motion.div 
                  className="bw-ethos-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <div className="bw-ethos-num">{item.num}</div>
                  <h3 className="bw-ethos-title">{item.title}</h3>
                  <p className="bw-ethos-desc">{item.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* GALLERY / SERVICES */}
      <section className="bw-gallery py-5">
        <Container fluid className="px-0">
          <div className="bw-header text-center px-4" data-aos="fade-up">
            <h2 className="bw-section-title text-white">CURATED SPACES</h2>
            <div className="bw-divider mx-auto bg-white"></div>
          </div>
          <Row className="g-0 mt-5">
            {[
              { img: hotel, title: "ACCOMMODATION" },
              { img: spa, title: "WELLNESS" },
              { img: gym, title: "FITNESS" },
              { img: barber, title: "GROOMING" }
            ].map((item, i) => (
              <Col lg={3} md={6} key={i}>
                <motion.div 
                  className="bw-gallery-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <img src={item.img} alt={item.title} />
                  <div className="bw-gallery-overlay">
                    <h4>{item.title}</h4>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* MISSION */}
      <section className="bw-mission py-5">
        <Container>
          <Row className="align-items-center" style={{ minHeight: '40vh' }}>
            <Col lg={10} className="mx-auto text-center">
              <motion.h2 
                className="bw-mission-statement"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                "WE DO NOT FOLLOW STANDARDS.<br/>WE SET THEM."
              </motion.h2>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="bw-cta py-5">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="bw-cta-title">EXPERIENCE THE EXCEPTIONAL</h2>
            <button className="bw-btn-primary mt-4">BEGIN YOUR JOURNEY</button>
          </motion.div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bw-footer">
        <Container>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} KOVAIS. All Rights Reserved. &nbsp;|&nbsp; Contact: <a href="tel:9234567891">+91 92345 67891</a> &nbsp;|&nbsp; Email: <a href="mailto:info@kovaisbeauty.com">info@kovaisbeauty.com</a>
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default About;