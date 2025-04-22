// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import ViewTranscript from './pages/Transcript/ViewTranscript';
import EditTranscript from './pages/Transcript/EditTranscript';
import ViewUsers from './pages/UserManagement/ViewUsers';
import CatalogManagement from './pages/Admin/CatalogManagement';
import YearSelection from './pages/Admin/YearSelection';
import CatalogLanding from './pages/Admin/CatalogLanding';
import ProfessorPortal from './pages/Professor/ProfessorPortal';
import StudentHistory from './pages/Professor/StudentHistory';
import ViewPastGrades from './pages/Professor/components/ViewPastGrades';
import GradeEntry from './pages/Professor/components/GradeEntry';

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
            path="/admin/catalog" 
            element={
              isAuthenticated ? 
                <CatalogManagement /> : 
                <Navigate to="/" />
            } 
          />

          <Route 
            path="/admin/catalog/year-selection" 
            element={
              isAuthenticated ? 
                <YearSelection /> : 
                <Navigate to="/" />
            } 
          />

          <Route 
            path="/admin/catalog/:year" 
            element={
              isAuthenticated ? 
                <CatalogLanding /> : 
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

          {/* Professor Portal route */}
          <Route
            path="/professor"
            element={<ProfessorPortal onLogout={handleLogout} />}
          />

          {/* Student History route */}
          <Route
            path="/professor/student-history"
            element={
              isAuthenticated ? 
                <StudentHistory /> : 
                <Navigate to="/" />
            }
          />

          {/* View Past Grades route */}
          <Route
            path="/professor/student-history/view-past-grades"
            element={
              isAuthenticated ? 
                <ViewPastGrades /> : 
                <Navigate to="/" />
            }
          />

          {/* Grade Entry route */}
          <Route
            path="/professor/student-history/grade-entry"
            element={
              isAuthenticated ? 
                <GradeEntry /> : 
                <Navigate to="/" />
            }
          />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;