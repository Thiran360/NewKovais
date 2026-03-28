import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Modal, Form, Button, InputGroup, Tabs, Tab, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

// Import Images
import logo from "./Image/logo.jpg";

// Import Icons
import { FaHotel, FaCut, FaSpa, FaDumbbell, FaUser, FaLock, FaEye, FaEyeSlash, FaPhoneAlt, FaChevronDown, FaInfoCircle, FaShieldAlt, FaFileContract, FaMoneyBillWave } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsArrowDownRightSquareFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";

// import "../App.css";
import "./Header.css";

function Header({ user, setUser, points, setPoints }) {
  const navigate = useNavigate();

  // --- State Management ---
  // const [points, setPoints] = useState(0);
  const [emblemUrl, setEmblemUrl] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState({ username: '', password: '', phone_number: '' });
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Dropdown States ---
  const [showDesktopBooking, setShowDesktopBooking] = useState(false);
  const [showDesktopProfile, setShowDesktopProfile] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showDesktopInfo, setShowDesktopInfo] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  // --- Refs for Click Outside Logic ---
  const bookingRef = useRef(null);
  const profileRef = useRef(null);
  const infoRef = useRef(null);

  // --- Effects ---

  // 1. Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Click Outside to Close Dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        setShowDesktopBooking(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDesktopProfile(false);
    setShowDesktopInfo(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowDesktopInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Load User Data
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      const storedPoints = localStorage.getItem(`points_${parsedUser.user_id}`);
      if (storedPoints) setPoints(JSON.parse(storedPoints));
      const storedUrl = localStorage.getItem("url");
      if (storedUrl) setEmblemUrl(JSON.parse(storedUrl));
    }
  }, [setUser]);

  // --- Helper Functions ---

  const resetDropdowns = () => {
    setShowDesktopBooking(false);
    setShowDesktopProfile(false);
    setShowDesktopInfo(false);
    setShowMobileBooking(false);
    setShowMobileProfile(false);
    setShowMobileInfo(false);
  };

  const handleNavbarToggle = (newExpandedState) => {
    setExpanded(newExpandedState);
    resetDropdowns();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setExpanded(false);
    resetDropdowns();
  };

  const toggleDesktopBooking = (e) => {
    e.preventDefault();
    setShowDesktopBooking(!showDesktopBooking);
    setShowDesktopProfile(false);
    setShowDesktopInfo(false);
    setShowDesktopInfo(false);
  };

  const toggleDesktopProfile = (e) => {
    e.preventDefault();
    setShowDesktopProfile(!showDesktopProfile);
    setShowDesktopBooking(false);
    setShowDesktopInfo(false);
  };

  const toggleDesktopInfo = (e) => {
    e.preventDefault();
    setShowDesktopInfo(!showDesktopInfo);
    setShowDesktopBooking(false);
    setShowDesktopProfile(false);
  };

  const toggleMobileDropdown = (type) => {
    if (type === 'booking') {
      setShowMobileBooking(!showMobileBooking);
      setShowMobileProfile(false);
      setShowMobileInfo(false);
    } else if (type === 'profile') {
      setShowMobileProfile(!showMobileProfile);
      setShowMobileBooking(false);
      setShowMobileInfo(false);
    } else if (type === 'info') {
      setShowMobileInfo(!showMobileInfo);
      setShowMobileBooking(false);
      setShowMobileProfile(false);
    }
  };

  // --- Auth Functions ---

  const handleAuthClick = () => {
    if (user) {
      localStorage.clear();
      setUser(null);
      setPoints(0);
      setEmblemUrl("");
      navigate("/");
    } else {
      setShowLoginModal(true);
      setErrorMessage('');
      setUserData({ username: '', password: '', phone_number: '' });
    }
    setExpanded(false);
    resetDropdowns();
  };

  const validatePhoneNumber = (number) => {
    if (!number) {
      setPhoneError('Phone number is required.');
      return false;
    }
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(number)) {
      setPhoneError('Invalid characters.');
      return false;
    }
    const digitsOnly = number.replace(/[^\d]/g, '');
    if (digitsOnly.length < 10) {
      setPhoneError('Must be at least 10 digits.');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, phone_number: value });
    if (isNewUser) validatePhoneNumber(value);
  };

  const loginUser = async () => {
    if (!userData.username || !userData.password) {
      setErrorMessage('Username and password are required');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post("https://api.codingboss.in/kovais/customer-login/", {
        username: userData.username,
        password: userData.password,
      });
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      localStorage.setItem("currentUserId", JSON.stringify(response.data.user_id));
      if (response.data.emblem_url) localStorage.setItem("url", JSON.stringify(response.data.emblem_url));
      if (response.data.points !== undefined) localStorage.setItem(`points_${response.data.user_id}`, JSON.stringify(response.data.points));
      
      setUser(response.data);
      setPoints(response.data.points || 0);
      setEmblemUrl(response.data.emblem_url || "");
      
      Swal.fire({ icon: "success", title: "Login Successful!", timer: 1500, showConfirmButton: false });
      setTimeout(() => { setShowLoginModal(false); }, 500);
    } catch (error) {
      setErrorMessage("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await axios.post("https://api.codingboss.in/kovais/create-customer/", {
        name: userData.username,
        phone_number: userData.phone_number,
        password: userData.password,
      });
      Swal.fire({ icon: "success", title: "Account Created!", text: "Please sign in." });
      setIsNewUser(false);
    } catch (error) {
      setErrorMessage("Sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    if (validatePhoneNumber(userData.phone_number) && userData.username && userData.password) {
      signUp();
    }
  };

  // --- Data Arrays ---

  const infoItems = [
    { path: "/contact", icon: FaPhoneAlt, label: "Contact Us" },
    { path: "/policy", icon: FaShieldAlt, label: "Privacy Policy" },
    { path: "/terms", icon: FaFileContract, label: "Terms & Conditions" },
    { path: "/refund", icon: FaMoneyBillWave, label: "Refund Policy" }
  ];

  const bookingItems = [
    { path: "/search-results", icon: FaHotel, label: "Hotels" },
    { path: "/barber", icon: FaCut, label: "Barber Shop" },
    { path: "/spa", icon: FaSpa, label: "Spa Center" },
    { path: "/gym", icon: FaDumbbell, label: "Gym" },
    { path: "/function", icon: FaCut, label: "Function" },
    { path: "/funeral", icon: FaCut, label: "Funeral" }
  ];

  const profileItems = [
    { path: "/profile", icon: ImProfile, label: "Profile" },
    { path: "/bookedOrders", icon: BsArrowDownRightSquareFill, label: "Booked Orders" },
    { path: "/history", icon: MdWorkHistory, label: "History" }
  ];

  return (
    <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
      <Navbar expand="lg" className="modern-navbar" expanded={expanded} onToggle={handleNavbarToggle}>
        <Container className="navbar-container">
          
          {/* Logo */}
          <Navbar.Brand className="brand-wrapper" onClick={() => handleNavigation("/")}>
            <div className="logo-container">
              <img src={logo} alt="Logo" className="brand-logo" />
              <div className="logo-shine"></div>
            </div>
            <span className="brand-name">KOVAIS</span>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <button className={`mobile-toggle ${expanded ? 'active' : ''}`} onClick={() => handleNavbarToggle(!expanded)}>
            {expanded ? <HiX /> : <HiMenuAlt3 />}
          </button>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-menu">

              <button onClick={() => handleNavigation("/")} className="nav-item-link">
                <span className="link-text">Home</span>
                <span className="link-underline"></span>
              </button>

              <button onClick={() => handleNavigation("/about")} className="nav-item-link">
                <span className="link-text">About</span>
                <span className="link-underline"></span>
              </button>



              {/* Desktop Info Dropdown */}
              <div className="dropdown-wrapper d-none d-lg-block" ref={infoRef}>
                <button 
                  className={`nav-item-link dropdown-trigger ${showDesktopInfo ? 'active' : ''}`}
                  onClick={toggleDesktopInfo}
                >
                  <span className="link-text">Info</span>
                  <FaChevronDown className={`dropdown-arrow ${showDesktopInfo ? 'rotated' : ''}`} />
                  <span className="link-underline"></span>
                </button>
                <div className={`mega-dropdown profile-dropdown ${showDesktopInfo ? 'show' : ''}`}>
                  <div className="dropdown-list">
                    {infoItems.map((item, index) => (
                      <button key={index} className="dropdown-list-item" onClick={() => handleNavigation(item.path)}>
                        <item.icon className="list-icon" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Booking Dropdown (Click Based) */}
              <div className="dropdown-wrapper d-none d-lg-block" ref={bookingRef}>
                <button 
                  className={`nav-item-link dropdown-trigger ${showDesktopBooking ? 'active' : ''}`}
                  onClick={toggleDesktopBooking}
                >
                  <span className="link-text">Booking</span>
                  <FaChevronDown className={`dropdown-arrow ${showDesktopBooking ? 'rotated' : ''}`} />
                  <span className="link-underline"></span>
                </button>
                <div className={`mega-dropdown ${showDesktopBooking ? 'show' : ''}`}>
                  <div className="dropdown-grid">
                    {bookingItems.map((item, index) => (
                      <button key={index} className="dropdown-card" onClick={() => handleNavigation(item.path)}>
                        <item.icon className="card-icon" />
                        <span className="card-label">{item.label}</span>
                        <div className="card-hover-bg"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Info Dropdown */}
              <div className="d-lg-none mobile-dropdown-section">
                <button className="mobile-dropdown-trigger" onClick={() => toggleMobileDropdown('info')}>
                  <span>Info</span>
                  <FaChevronDown className={`mobile-arrow ${showMobileInfo ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${showMobileInfo ? 'show' : ''}`}>
                  {infoItems.map((item, index) => (
                    <button key={index} className="mobile-dropdown-item" onClick={() => handleNavigation(item.path)}>
                      <item.icon className="mobile-item-icon" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Booking Dropdown */}
              <div className="d-lg-none mobile-dropdown-section">
                <button className="mobile-dropdown-trigger" onClick={() => toggleMobileDropdown('booking')}>
                  <span>Booking</span>
                  <FaChevronDown className={`mobile-arrow ${showMobileBooking ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${showMobileBooking ? 'show' : ''}`}>
                  {bookingItems.map((item, index) => (
                    <button key={index} className="mobile-dropdown-item" onClick={() => handleNavigation(item.path)}>
                      <item.icon className="mobile-item-icon" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Points */}
              {user && emblemUrl && (
                <Nav.Link onClick={() => handleNavigation("/points")} className="points-link">
                  <div className="points-badge">
                    <img src={emblemUrl} alt="Medal" className="points-icon" />
                    <span className="points-text">{points}</span>
                    <span className="points-label">pts</span>
                  </div>
                </Nav.Link>
              )}

              {/* Desktop Profile Dropdown (Click Based) */}
              {user && (
                <div className="dropdown-wrapper d-none d-lg-block" ref={profileRef}>
                  <button 
                    className={`nav-item-link dropdown-trigger ${showDesktopProfile ? 'active' : ''}`}
                    onClick={toggleDesktopProfile}
                  >
                    <span className="link-text">Profile</span>
                    <FaChevronDown className={`dropdown-arrow ${showDesktopProfile ? 'rotated' : ''}`} />
                    <span className="link-underline"></span>
                  </button>
                  <div className={`mega-dropdown profile-dropdown ${showDesktopProfile ? 'show' : ''}`}>
                    <div className="dropdown-list">
                      {profileItems.map((item, index) => (
                        <button key={index} className="dropdown-list-item" onClick={() => handleNavigation(item.path)}>
                          <item.icon className="list-icon" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Profile Dropdown */}
              {user && (
                <div className="d-lg-none mobile-dropdown-section">
                  <button className="mobile-dropdown-trigger" onClick={() => toggleMobileDropdown('profile')}>
                    <span>Profile</span>
                    <FaChevronDown className={`mobile-arrow ${showMobileProfile ? 'rotated' : ''}`} />
                  </button>
                  <div className={`mobile-dropdown-content ${showMobileProfile ? 'show' : ''}`}>
                    {profileItems.map((item, index) => (
                      <button key={index} className="mobile-dropdown-item" onClick={() => handleNavigation(item.path)}>
                        <item.icon className="mobile-item-icon" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Auth Button */}
              <button className={`auth-btn ${user ? 'logout' : 'login'}`} onClick={handleAuthClick}>
                <span className="btn-text">{user ? 'Logout' : 'Login'}</span>
              </button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered className="modern-auth-modal">
        <Modal.Header closeButton className="modal-header-custom border-0 pb-0">
          <Modal.Title className="modal-title-custom">Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom px-4 pt-0">
          <Tabs activeKey={isNewUser ? 'signup' : 'login'} onSelect={(k) => setIsNewUser(k === 'signup')} className="auth-tabs mb-4 nav-fill">
            <Tab eventKey="login" title="Login" />
            <Tab eventKey="signup" title="Sign Up" />
          </Tabs>

          <Form className="auth-form">
            <Form.Group className="mb-3">
              <InputGroup className="input-group-custom">
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={userData.username} 
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
                  className="form-input-custom" 
                />
              </InputGroup>
            </Form.Group>

            {isNewUser && (
              <Form.Group className="mb-3">
                <InputGroup className="input-group-custom">
                  <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
                  <Form.Control 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={userData.phone_number} 
                    onChange={handlePhoneNumberChange} 
                    isInvalid={!!phoneError}
                    className="form-input-custom" 
                  />
                  <Form.Control.Feedback type="invalid">{phoneError}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <InputGroup className="input-group-custom">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={userData.password} 
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                  className="form-input-custom" 
                />
                <InputGroup.Text className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {errorMessage && <div className="error-message mb-3">{errorMessage}</div>}

            <Button 
              className="submit-btn w-100" 
              onClick={isNewUser ? handleSignUpClick : loginUser} 
              disabled={loading || (isNewUser && !!phoneError)}
            >
              {loading ? "Processing..." : (isNewUser ? "Create Account" : "Login")}
            </Button>
            
            <p className="terms-text mt-3">
              By continuing, you agree to our <a href="#" className="terms-link">Terms</a> and <a href="#" className="terms-link">Privacy Policy</a>.
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;