import React from "react";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Check, CheckCircle, Home } from "lucide-react";
import "./PaymentPage.css";

const ConfirmationPage = ({
  show,
  onHide,
  transactionId,
  amount,
  paymentMethod,
  bookingSummary,
  onDone,
}) => {
  const handleDone = () => {
    if (onDone) onDone();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleDone} centered className="confirmation-modal">
      <Modal.Body className="confirmation-body">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="text-center"
        >
          {/* Success Animation */}
          <motion.div
            className="confirmation-checkmark"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <div className="checkmark-circle">
              <Check size={48} strokeWidth={3} color="#fff" />
            </div>
          </motion.div>

          <motion.h3
            className="fw-bold mt-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Booking Confirmed!
          </motion.h3>

          <motion.p
            className="text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your appointment has been successfully booked
          </motion.p>

          {/* Booking Details Card */}
          <motion.div
            className="confirmation-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {transactionId && (
              <div className="conf-detail-row">
                <span className="conf-label">Transaction ID</span>
                <span className="conf-value fw-bold">{transactionId}</span>
              </div>
            )}

            {bookingSummary?.services?.map((service, idx) => (
              <div key={idx} className="conf-detail-row">
                <span className="conf-label">{service.name}</span>
                <span className="conf-value">₹ {service.price}</span>
              </div>
            ))}

            {bookingSummary?.date && (
              <div className="conf-detail-row">
                <span className="conf-label">Date & Time</span>
                <span className="conf-value">
                  {new Date(bookingSummary.date).toLocaleDateString()} at {bookingSummary.time}
                </span>
              </div>
            )}

            {bookingSummary?.specialist && (
              <div className="conf-detail-row">
                <span className="conf-label">Specialist</span>
                <span className="conf-value">{bookingSummary.specialist}</span>
              </div>
            )}

            <div className="conf-detail-row total">
              <span className="conf-label">Amount {paymentMethod === "offline" ? "(Pay at Venue)" : "Paid"}</span>
              <span className="conf-value fw-bold text-success">₹ {amount}</span>
            </div>

            <div className="conf-detail-row">
              <span className="conf-label">Payment Method</span>
              <span className="conf-value text-capitalize">
                {paymentMethod === "offline" ? "Pay at Venue" : paymentMethod}
              </span>
            </div>

            <div className="conf-detail-row">
              <span className="conf-label">Status</span>
              <span className="conf-value text-success fw-bold d-flex align-items-center">
                <CheckCircle size={16} className="me-1" />
                {paymentMethod === "offline" ? "Booked" : "Paid"}
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            <Button variant="success" className="w-100 py-2 fw-bold mb-2 d-flex align-items-center justify-content-center" onClick={handleDone}>
              <Home size={18} className="me-2" />
              Done
            </Button>
            <small className="text-muted d-block mt-2">
              A confirmation has been sent to your registered email & phone.
            </small>
          </motion.div>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationPage;
