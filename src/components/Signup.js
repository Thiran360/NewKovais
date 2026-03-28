import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the external CSS
import gymImage from "./Image/gymImage.jpg";

function Signup({setUrl}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const signUp = async (formData) => {
    try {
      const formattedData = {
        name: formData.username,
        phone_number: formData.phone_number,
        password: formData.password,
      };

      const response = await axios.post(
         "https://api.codingboss.in/kovais/create-customer/",
        // "https://588057ce4a7a.ngrok-free.app/kovais/create-customer/",
        
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log("Signup Success:", response.data.user);
      localStorage.setItem("signedUpUser", JSON.stringify(response.data.user));
      // navigate("/login");
      navigate("/home");
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.error || "Sign-Up Failed. Please try again.");
    }
  };

  return (
 
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit(signUp)} className="signup-form">
          {/* Name Input */}
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              {...register("username", { required: "Name is required" })} 
              className="signup-input" 
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          {/* Phone_Number Input */}
          <div>
            <label>Phone Number:</label>
            <input 
              type="number" 
              {...register("phone_number", { required: "Phone_Number is required" })} 
              className="signup-input" 
            />
            {errors.phone_number && <p className="error-message">{errors.phone_number.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              {...register("password", { 
                required: "Password is required"
              })} 
              className="signup-input" 
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        {/* Login Link */}
        <p className="signup-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  
  );
}

export default Signup;
