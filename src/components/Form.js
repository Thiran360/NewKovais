import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ user, setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    married_date: "",
    marital_status: "",
    blood_group: "",
    aadhar: null,
    profile_image: null,
  });
  
  const [aadharFileName, setAadharFileName] = useState("");
  const [profileFileName, setProfileFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    if (storedUser && Object.keys(storedUser).length > 0) {
      setFormData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "marital_status" && value === "Single") {
      setFormData((prev) => ({ ...prev, marriage_date: "" }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload only JPG, JPEG, or PNG images");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      
      if (fieldName === "aadhar") {
        setAadharFileName(file.name);
      } else {
        setProfileFileName(file.name);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone_number) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem("currentUserId");
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
      //  `https://454732e0c81a.ngrok-free.app/kovais/update-customer/?customer_id=${userId}`,
        `https://api.codingboss.in/kovais/update-customer/?customer_id=${userId}`,
       {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
        localStorage.setItem("loggedInUser", JSON.stringify(formData));
      } else {
        console.error("Submission failed:", response.statusText);
      }
      navigate("/");
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="form-page">
        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">Personal Information Form</h1>
            <p className="form-subtitle">Please fill in your details below</p>
          </div>

          <div className="form-content">
            <div className="form-grid">
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  className="form-input"
                />
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Blood Group */}
              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="form-group">
                <label className="form-label">Marital Status</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Marriage Date */}
              <div className="form-group">
                <label className="form-label">Marriage Date</label>
                <input
                  type="date"
                  name="marriage_date"
                  value={formData.marriage_date}
                  onChange={handleChange}
                  disabled={formData.marital_status !== "Married"}
                  className={`form-input ${formData.marital_status !== "Married" ? "disabled" : ""}`}
                />
                {formData.marital_status !== "Married" && (
                  <span className="helper-text">Available only when married</span>
                )}
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="form-group full-width">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your complete address"
                className="form-textarea"
              />
            </div>

            {/* File Uploads */}
            <div className="file-upload-grid">
              {/* Profile Image Upload */}
              <div className="form-group">
                <label className="form-label">Profile Image</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "profile_image")}
                    className="file-input"
                  />
                  <div className="file-upload-content">
                    <div className="file-icon">📷</div>
                    <div className="file-text">
                      {profileFileName || "Click to upload profile image"}
                    </div>
                    <div className="file-hint">JPG, JPEG, PNG (Max: 5MB)</div>
                  </div>
                </div>
              </div>

              {/* Aadhar Card Upload */}
              <div className="form-group">
                <label className="form-label">Aadhar Card</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "aadhar")}
                    className="file-input"
                  />
                  <div className="file-upload-content">
                    <div className="file-icon">📄</div>
                    <div className="file-text">
                      {aadharFileName || "Click to upload Aadhar card"}
                    </div>
                    <div className="file-hint">JPG, JPEG, PNG (Max: 5MB)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-button ${isSubmitting ? "submitting" : ""}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPage;