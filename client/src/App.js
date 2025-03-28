// src/App.js
import React from 'react';
import './App.css';
import Login from './pages/Login'; //Login page
import AdminDashboard from './pages/Admin/AdminDashboard'; //Admin Dashboard page
import AdminPortal from './components/AdminPortal';


function App() {
  return (
    <div className="App">
      <Login />
      <AdminDashboard />
      <AdminPortal />
    </div>
  );
}

export default App;


