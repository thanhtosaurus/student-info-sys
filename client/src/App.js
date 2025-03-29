// src/App.js
import React from 'react';
import './App.css';
import Login from './pages/Login'; //Login page
<<<<<<< HEAD
import AdminDashboard from './pages/AdminDashboard'; //Admin Dashboard page
=======
import AdminDashboard from './pages/Admin/AdminDashboard'; //Admin Dashboard page
import AdminPortal from './pages/AdminPortal';
import ViewTranscript from './pages/Transcript/ViewTranscript';
>>>>>>> 223fd2c75007fbb6eab59534e7109cbc8221837d


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Login/>
      <AdminDashboard/>
=======
      <Login />
      <AdminDashboard />
      <AdminPortal />
      <ViewTranscript />
>>>>>>> 223fd2c75007fbb6eab59534e7109cbc8221837d
    </div>
  );
}

export default App;


