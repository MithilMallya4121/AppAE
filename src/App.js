// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import LoginPage from './LoginPage';
import MainAppContent from './MainAppContent'; // Import the new MainAppContent component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
      // If already logged in, navigate to the main app content
      navigate('/');
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
  }, []);

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
    navigate('/'); // Redirect to main app content
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        {/* Protected Route for the main application content */}
        <Route
          path="/"
          element={isLoggedIn ? <MainAppContent currentUser={currentUser} onLogout={handleLogout} /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        {/* You can add more routes here if your app grows */}
      </Routes>
    </div>
  );
}

export default App;