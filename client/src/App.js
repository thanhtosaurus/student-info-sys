// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard'; // For catalog management
import AdminPortal from './pages/AdminPortal';
import ViewTranscript from './pages/Transcript/ViewTranscript';
import EditTranscript from './pages/Transcript/EditTranscript'; //For Updating Transcript
import ViewUsers from './pages/UserManagement/ViewUsers';
import CreateCourseCatalog from './pages/Admin/CreateCourseCatalog';
import { YearProvider } from './context/YearContext';

// Import future UserManagement component when ready
// import UserManagement from './pages/User/UserManagement';

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
    <YearProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Login route - redirects to portal if already logged in */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to="/portal" /> : 
                  <Login onLogin={handleLogin} />
              } 
            />
            
            {/* Admin Portal route - main dashboard after login */}
            <Route 
              path="/portal" 
              element={
                isAuthenticated ? 
                  <AdminPortal onLogout={handleLogout} /> : 
                  <Navigate to="/" />
              } 
            />
            
            {/* Catalog Management route (AdminDashboard) */}
            <Route 
              path="/catalog-management" 
              element={
                isAuthenticated ? 
                  <AdminDashboard onLogout={handleLogout} /> : 
                  <Navigate to="/" />
              } 
            />
            
            {/* Create Course Catalog route */}
            <Route 
              path="/create-course-catalog" 
              element={
                isAuthenticated ? 
                  <CreateCourseCatalog /> : 
                  <Navigate to="/" />
              } 
            />
            
            {/* Transcript Service route */}
            <Route 
              path="/transcript-service" 
              element={
                isAuthenticated ? 
                  <ViewTranscript onLogout={handleLogout} /> : 
                  <Navigate to="/" />
              } 
            />

            {/* User Management route */}
            <Route 
              path="/user-management" 
              element={
                isAuthenticated ? 
                  <ViewUsers /> : 
                  <Navigate to="/" />
              } 
            />

             {/* Temporary test route for EditTranscript */}
             <Route
              path="/test-edit-transcript"
              element={<EditTranscript onClose={() => console.log('Closed')} />}
            />
           
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </YearProvider>
  );
}

export default App;