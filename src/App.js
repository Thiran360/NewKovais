import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barber from './barber/barber';
import Spa from './spa/spa';
import Hotel from './RoomSearch/RoomSearch';
import SearchResults from './RoomSearch/SearchResults';
import Gym from './gym/gym';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ScrollToTop from './ScrollToTop';
import Header from './components/Header';
import About from './components/About/About';
import Profile from './components/Profile';
import ServiceInfo from './barber/ServiceInfo';
import Contact from './components/Contact';
import BookedOrders from './components/BookedOrders';
import History from './components/History';
import Funeral from './Funeral/Funeral';
import Function from './Function/Function';
import Form from './components/Form';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TermsAndConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyAndPolicy';
import Refund from './components/Refund'
import Points from './components/Points';

const App = () => {
  const [user, setUser] = useState(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [points, setPoints] = useState(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const storedPoints = localStorage.getItem(`points_${userId}`);
      return storedPoints ? JSON.parse(storedPoints) : null;
    }
    return null;
  });
  const [url, setUrl] = useState(() => {
    // Check if user is logged in from localStorage
    const storedUrl = localStorage.getItem("url");
    return storedUrl ? JSON.parse(storedUrl) : null;
  })
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [aadhar, setAadhar] = useState(() => {
    // Check if user is logged in from localStorage
    const storedAadhar = localStorage.getItem("aadhar");
    return storedAadhar ? false : true;
  })
  const [showSplash, setShowSplash] = useState(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    return !splashShown;
  });
  // Function to toggle login modal
  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  // Load user from localStorage and handle loading state

  useEffect(() => {
    AOS.init({ duration: 1500 });

    if (showSplash) {
      const splashTimeout = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true'); // Set flag after splash is shown
      }, 3000);

      return () => clearTimeout(splashTimeout);
    }
  }, [showSplash]);


  // Sync points to localStorage when they change
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId && points !== null) {
      localStorage.setItem(`points_${userId}`, JSON.stringify(points));
    }
  }, [points]);

  const handleLogin = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    localStorage.setItem(`points_${userData.user_id}`, JSON.stringify(userData.points))
    localStorage.setItem("currentUserId", JSON.stringify(userData.user_id))
    setUser(userData);
    setPoints(userData.points)
    setShowLoginModal(false); // Close the modal if it was open
  };


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('currentUserId');
    setUser(null);
    setPoints(null);
  };

  if (showSplash) {
    return (
      <div className="splash-screen d-flex align-items-center justify-content-center">
        <div className="simple-loader"></div> {/* Add loading spinner */}
      </div>
    );
  }

  const handleScroll = () => {
    const section = document.getElementById("homeCards");
    section.scrollIntoView({ behavior: "smooth" });
  }
    // localStorage.setItem('fcm_token', JSON.stringify('de985ad4e255a320cda6c55cf79809b4a2c2e7d3'))

  return (
    <Router>
      <ScrollToTop />
      {/* <Header user={user} onLogout={handleLogout} /> */}
      {/* Hide Header only on Login and Signup pages */}
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup" &&
        <Header user={user} setUser={setUser} onLogout={handleLogout} ScrollDown={handleScroll} points={points} setPoints={setPoints} url={url}
          onLoginClick={handleShowLoginModal} // Pass function to show login modal
        />
      }

      <Routes>
        {/*  <Route path="/" element={<Navigate replace to="/home" />} />*/}
        <Route path="/signup" element={<Signup setUser={handleLogin} setPoints={setPoints} setUrl={setUrl} />} />
        <Route path="/login" element={<Login setUser={handleLogin} setPoints={setPoints} setUrl={setUrl} setAadhar={setAadhar} />} />
        <Route path="/" element={<Home user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path="/barber" element={<Barber user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path="/spa" element={<Spa user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path="/RoomSearch" element={<Hotel />} />
        <Route path="/search-results" element={<SearchResults user={user} setUser={setUser} points={points} setPoints={setPoints} aadhar={aadhar} setAadhar={setAadhar} />} />
        <Route path="/gym" element={<Gym user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/service-info/:id" element={<ServiceInfo />} />
        <Route path="/bookedOrders" element={<BookedOrders user={user} points={points} setPoints={setPoints} />} />
        <Route path="/history" element={<History points={points} setPoints={setPoints} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/funeral' element={<Funeral user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path='/function' element={<Function user={user} setUser={setUser} points={points} setPoints={setPoints} />} />
        <Route path="/form" element={<Form user={user} setUser={setUser} />} />
        <Route path='/terms' element={<TermsAndConditions/>} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/points" element={<Points points={points} setPoints={setPoints} />} />

      </Routes>
    </Router>
  );
};

export default App;
