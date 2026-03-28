import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import external CSS
import Swal from 'sweetalert2'


function Login({ setUser, setPoints, setUrl, setAadhar }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  // Function to validate login via API
  const loginUser = async (formData) => {
    try {
      console.log("Sending Data:", formData);
      const response = await axios.post(
        "https://api.codingboss.in/kovais/customer-login/",
        // "https://454732e0c81a.ngrok-free.app/kovais/customer-login/",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      
      console.log("Login Success:", response.data);
      
      // Save to localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("currentUserId", JSON.stringify(response.data.user_id));
      localStorage.setItem("url", JSON.stringify(response.data.emblem_url));
      localStorage.setItem("userId", response.data.user_id);
      // Update state in parent components
      setUser(response.data);
      setPoints(response.data.points);
      setUrl(response.data.emblem_url);
      setAadhar(!!response.data.aadhar); // will be true if aadhar exists, false otherwise
      // Navigate to home without page reload
      // navigate("/form");
      // Show success message
      setTimeout(() => {
        Swal.fire({
                title: "Login Successfully!!",
                icon: "success",
                allowOutsideClick: false, // Prevent closing by clicking outside
                allowEscapeKey: false, // Prevent closing with the Escape key
                allowEnterKey: false, // Prevent closing with the Enter key
              });
        // alert("Login Successful!");
      }, 500);

      
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      setErrorMessage(error.response?.data?.login || "Invalid credentials. Please try again.");
      // setAadhar(false);
       Swal.fire({
              icon: "error",
              title: "Oops...",
              text:  error.message,
            });
    }
  };
  
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    loginUser(data);
  };
  
  return (
    <div className="logins-container">
      <div className="logins-card">
        <h2 className="logins-title">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="logins-form">
          {/* Username Input */}
          <div className="input-group">
            <label className="input-label">Username:</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="input-field"
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          
          {/* Password Input */}
          <div className="input-group">
            <label className="input-label">Password:</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input-field"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          
          {/* Submit Button */}
          <button type="submit" className="logins-button w-100">Login</button>
        </form>
        <p className="logins-footer">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;