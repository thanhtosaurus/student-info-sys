import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1
        style={{
          fontSize: '2.8rem',
          fontWeight: '700',
          color: '#1e88e5',
          marginBottom: '20px',
          fontFamily: 'Segoe UI, sans-serif',
          letterSpacing: '1px',
        }}
      >
        Admin Portal
      </h1>

      <button
        onClick={() => navigate('/create-course-catalog')}
        style={{
          padding: '12px 24px',
          fontSize: '1.1rem',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        ➕ Create Course Catalog
      </button>
    </div>
  );
};



export default AdminDashboard;
