import React from 'react';
import '../styles/AdminPortal.css';

function AdminPortal() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Portal</h1>
        <p>Welcome to the Student Information System Admin Dashboard</p>
      </div>
      
      <div className="admin-cards">
        <div className="admin-card">
          <div className="card-icon">👥</div>
          <h3>User Management</h3>
          <p>Manage student and faculty accounts, permissions, and access levels</p>
          <button className="card-button">Access User Management</button>
        </div>

        <div className="admin-card">
          <div className="card-icon">📝</div>
          <h3>Transcript Service</h3>
          <p>View, generate, and manage student academic transcripts</p>
          <button className="card-button">Access Transcript Service</button>
        </div>

        <div className="admin-card">
          <div className="card-icon">📚</div>
          <h3>Catalog Management</h3>
          <p>Manage course catalogs, programs, and academic requirements</p>
          <button className="card-button">Access Catalog Management</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPortal; 