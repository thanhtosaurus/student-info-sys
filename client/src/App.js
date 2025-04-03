// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'; //Login page
import AdminDashboard from './pages/Admin/AdminDashboard'; //Admin Dashboard page
import AdminPortal from './pages/AdminPortal';
import ViewTranscript from './pages/Transcript/ViewTranscript';


function App() {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Login />
      <AdminDashboard />
      <AdminPortal />
      <ViewTranscript />
    </div>
  );
}

export default App;