import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, User, ShoppingBag, CheckCircle, ArrowRight, Clock } from "lucide-react";
import axios from "axios";
import "./History.css";

// Import your images
import hotel from "./Image/hotl.jpg";
import gym from "./Image/Gym.jpg";
import saloon from "./Image/saloon.jpg";
import spa from "./Image/sp.jpg";

const History = ({ points, setPoints }) => {
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [id, setId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each card appearing
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // --- Data Loading Logic (Same as before) ---
  useEffect(() => {
    const logginedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (logginedUser && logginedUser.user_id) {
      setId(logginedUser.user_id);
    }

    const storedFeedbacks = JSON.parse(localStorage.getItem("submittedFeedbacks")) || {};
    const restoredRatings = {};
    const restoredComments = {};
    Object.keys(storedFeedbacks).forEach((id) => {
      restoredRatings[id] = storedFeedbacks[id].rating;
      restoredComments[id] = storedFeedbacks[id].comment;
    });
    setSubmittedFeedbacks(Object.fromEntries(Object.keys(storedFeedbacks).map(id => [id, true])));
    setRatings(restoredRatings);
    setFeedbacks(restoredComments);
  }, []);

  useEffect(() => {
    if (!id) { setIsLoading(false); return; }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.codingboss.in/kovais/orders/?user_id=${id}&status=completed`);
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();

        // Map data (Simplified for brevity, ensure your mapping logic is here)
        const allOrders = [
            ...(data.hotel_orders || []).map(o => ({ ...o, id: o.order_id, Category: "hotel", service_type: "Deluxe Room", img: hotel, serviceBy: "Veera" })),
            ...(data.gym_orders || []).map(o => ({ ...o, id: o.order_id, Category: "gym", service_type: o.plan, img: gym, serviceBy: "Goku" })),
            ...(data.spa_orders || []).map(o => ({ ...o, id: o.order_id, Category: "spa", service_type: o.services, img: spa, serviceBy: "Guna" })),
            ...(data.saloon_orders || []).map(o => ({ ...o, id: o.order_id, Category: "saloon", service_type: o.services, img: saloon, serviceBy: "Anandh" })),
        ];
        setOrders(allOrders.reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFeedbackSubmit = async (e, orderId, order) => {
    e.preventDefault();
    if (!ratings[orderId] || !feedbacks[orderId]) return alert("Please fill details");

    try {
      await axios.post(`https://api.codingboss.in/kovais/${order.Category}/orders/update/?customer_id=${id}&order_id=${orderId}`, {
        customer_id: id, order_id: orderId, order_type: order.Category, rating: ratings[orderId], comment: feedbacks[orderId]
      });
      
      const updated = { ...JSON.parse(localStorage.getItem("submittedFeedbacks") || "{}"), [orderId]: { rating: ratings[orderId], comment: feedbacks[orderId] } };
      localStorage.setItem("submittedFeedbacks", JSON.stringify(updated));
      setSubmittedFeedbacks(prev => ({ ...prev, [orderId]: true }));
    } catch (e) { alert("Error"); }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      
      {/* 1. Header Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h2 className="fw-bold" style={{ background: "linear-gradient(45deg, #111, #555)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          History & Feedback
        </h2>
        <p className="text-muted">Rate your completed services to earn points</p>
      </motion.div>

      {/* 2. Loading State */}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* 3. Empty State Animation (The "Default" View) */}
      {!isLoading && orders.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-5 rounded-4 border bg-white shadow-sm"
        >
          <motion.div animate={floatAnimation} className="mb-4 d-inline-block">
            <div className="bg-light p-4 rounded-circle">
              <ShoppingBag size={64} color="#667eea" />
            </div>
          </motion.div>
          <h3>No Orders Found</h3>
          <p className="text-muted mb-4">You haven't booked any services yet. Start your journey today!</p>
          <Button variant="dark" className="rounded-pill px-4">
            Book Now <ArrowRight size={16} className="ms-2" />
          </Button>
        </motion.div>
      )}

      {/* 4. Animated List */}
      {!isLoading && orders.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="d-flex flex-column gap-4"
        >
          {orders.map((order) => (
            <motion.div 
              key={order.id} 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-4 border overflow-hidden d-md-flex shadow-sm"
              style={{ minHeight: "220px" }}
            >
              {/* Image Section */}
              <div style={{ width: "100%", maxWidth: "300px", position: "relative" }} className="d-none d-md-block">
                <img src={order.img} alt="Service" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill text-uppercase fw-bold" style={{ fontSize: "0.75rem" }}>
                  {order.Category}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="fw-bold mb-0">{order.service_type}</h4>
                    <span className="text-muted small bg-light px-2 py-1 rounded d-flex align-items-center">
                      <Clock size={14} className="me-1"/> 
                      {new Date(order.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-muted small mb-3">
                    <User size={14} className="me-1 mb-1"/> Served by <strong>{order.serviceBy}</strong>
                  </div>
                </div>

                {/* Feedback Section with Animation */}
                <div className="mt-3 pt-3 border-top border-light">
                  <AnimatePresence mode="wait">
                    {submittedFeedbacks[order.id] ? (
                      // Success Animation View
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="d-flex align-items-center text-success bg-success-subtle p-3 rounded-3"
                      >
                        <CheckCircle size={24} className="me-2" />
                        <div>
                          <strong>Thank you!</strong>
                          <div className="small text-success-emphasis">Your feedback helps us improve.</div>
                        </div>
                      </motion.div>
                    ) : (
                      // Form View
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                         <p className="mb-2 fw-semibold small text-uppercase text-muted">Rate your experience</p>
                         <div className="d-flex mb-3">
                           {[1, 2, 3, 4, 5].map((star) => (
                             <motion.div key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                               <Star
                                 size={24}
                                 className="me-1 cursor-pointer"
                                 fill={ratings[order.id] >= star ? "#ffc107" : "transparent"}
                                 color={ratings[order.id] >= star ? "#ffc107" : "#dee2e6"}
                                 style={{ cursor: "pointer" }}
                                 onClick={() => setRatings(prev => ({ ...prev, [order.id]: star }))}
                               />
                             </motion.div>
                           ))}
                         </div>
                         <Form onSubmit={(e) => handleFeedbackSubmit(e, order.id, order)} className="d-flex gap-2">
                           <Form.Control 
                             placeholder="Write a review..." 
                             size="sm"
                             className="rounded-pill bg-light border-0 px-3"
                             value={feedbacks[order.id] || ""}
                             onChange={(e) => setFeedbacks(prev => ({ ...prev, [order.id]: e.target.value }))}
                           />
                           <Button 
                             type="submit" 
                             variant="dark" 
                             size="sm" 
                             className="rounded-pill px-3"
                             disabled={!ratings[order.id] || !feedbacks[order.id]}
                           >
                             Submit
                           </Button>
                         </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
};

export default History;