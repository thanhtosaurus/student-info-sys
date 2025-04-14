import React from 'react';
import { useNavigate } from 'react-router-dom';
//import '../styles/AdminPortal.css';

function ProfessorPortal({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Call the onLogout function from props
    onLogout();
    // Navigate back to login page
    navigate('/');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Professor Portal</h1>
        <p>Welcome to the Student Information System Professor Dashboard</p>
        <button 
          onClick={handleLogout}
          className="logout-button"
          style={{
            backgroundColor: '#FF6B6B',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'absolute',
            top: '2rem',
            right: '2rem'
          }}
        >
          Logout
        </button>
      </div>
      
      <div className="admin-cards">
        <div className="admin-card">
          <div className="card-icon">📋</div>
          <h3>Classroll Management</h3>
          <p>Manage class rolls and student attendance</p>
          <button 
            className="card-button"
            onClick={() => navigateTo('/classroll-management')}
          >
            Access Classroll Management
          </button>
        </div>

        <div className="admin-card">
          <div className="card-icon">📜</div>
          <h3>Student History</h3>
          <p>View and manage student academic history</p>
          <button 
            className="card-button"
            onClick={() => navigateTo('/professor/enter-grades')}
          >
            Access Student History
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfessorPortal; 