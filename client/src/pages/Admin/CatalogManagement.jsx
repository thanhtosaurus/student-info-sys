import React from 'react';
import { useNavigate } from 'react-router-dom';

const CatalogManagement = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '32px',
      color: '#333',
      marginBottom: '40px',
    },
    createButton: {
      padding: '15px 30px',
      fontSize: '18px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      minWidth: '250px',
      transition: 'background 0.2s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: '#0056b3',
      },
    },
    backButton: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'background 0.2s ease',
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/admin')}
      >
        ← Back to Admin Dashboard
      </button>
      <h2 style={styles.heading}>Catalog Management</h2>
      <button 
        style={styles.createButton} 
        onClick={() => navigate('/admin/catalog/year-selection')}
      >
        Create Course Catalog
      </button>
    </div>
  );
};

export default CatalogManagement; 