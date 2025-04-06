import React from 'react';
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

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
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
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
        >
          ➕ Create Course Catalog
        </button>
        
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f5f5f5'}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
