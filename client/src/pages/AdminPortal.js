// src/pages/AdminPortal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPortal.css';

function AdminPortal({ onLogout }) {
  const navigate = useNavigate();

  // Handle navigation to different sections
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <p>Welcome to the Student Information System Admin Dashboard</p>
        <button 
          onClick={onLogout}
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
          <div className="card-icon">👥</div>
          <h3>User Management</h3>
          <p>Manage student and faculty accounts, permissions, and access levels</p>
          <button 
            className="card-button"
            onClick={() => navigateTo('/user-management')}
          >
            Access User Management
          </button>
        </div>

        <div className="admin-card">
          <div className="card-icon">📝</div>
          <h3>Transcript Service</h3>
          <p>View, generate, and manage student academic transcripts</p>
          <button 
            className="card-button"
            onClick={() => navigateTo('/transcript-service')}
          >
            Access Transcript Service
          </button>
        </div>

        <div className="admin-card">
          <div className="card-icon">📚</div>
          <h3>Catalog Management</h3>
          <p>Manage course catalogs, programs, and academic requirements</p>
          <button 
            className="card-button"
            onClick={() => navigateTo('/admin/catalog')}
          >
            Access Catalog Management
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;