// src/App.js
import React from 'react';
import './App.css';
import Login from './pages/Login'; //Login page
import AdminDashboard from './pages/AdminDashboard'; //Admin Dashboard page


function App() {
  return (
    <div className="App">
      <Login />
      <AdminDashboard />
    </div>
  );
}

export default App;


