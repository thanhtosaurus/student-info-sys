// src/App.js
import React from 'react';
import './App.css';
import Login from './pages/Login'; //Login page
import AdminDashboard from './pages/Admin/AdminDashboard'; //Admin Dashboard page
import AdminPortal from './pages/AdminPortal';
import ViewTranscript from './pages/Transcript/ViewTranscript';


function App() {
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


