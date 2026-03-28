import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"; // Import external CSS

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (data) => {
    try {
      const response = await axios.post(
        // "https://1d7c-59-97-51-97.ngrok-free.app/kovais/forgot-password/",
        "https://api.codingboss.in/kovais/forgot-password/",
        { email: data.email },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Reset Link Sent:", response.data);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      console.error("Reset Error:", error.response ? error.response.data : error.message);
      setMessage(error.response?.data?.error || "Error sending reset link. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Reset Password</h2>

        {message && <p className="reset-message">{message}</p>}

        <form onSubmit={handleSubmit(handlePasswordReset)} className="forgot-password-form">
          <div className="input-group">
            <label className="input-label">Email Address:</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input-field"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <button type="submit" className="reset-button">Send Reset Link</button>
        </form>

        <p className="forgot-password-footer">
          Remembered your password? <a href="/login" className="login-link">Go Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
