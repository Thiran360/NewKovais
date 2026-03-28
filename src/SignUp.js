import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

const App = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowModal(false); // Close modal on login
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      <h1>Welcome {user ? user.name : "Guest"}</h1>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => setShowModal(true)}>Login / Sign Up</button>
      )}
      {showModal && <LoginModal onLogin={handleLogin} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
