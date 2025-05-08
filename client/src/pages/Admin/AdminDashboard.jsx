import React, { useState } from 'react';
import CatalogLanding from './CatalogLanding';
import EditStudent from './UserManagement/EditStudent';

const AdminDashboard = () => {
  // Local state to control when to show the Catalog Landing page 
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTask, setSelectedTask] = useState('');
  
  //Add "Back" -> Admin Portal
  const handleBackToYearSelection = () => {
    setSelectedYear(null);
    setSelectedTask('');
  };

  const renderContent = () => {
    if (selectedYear) {
      return (
        <CatalogLanding
          selectedYear={selectedYear}
          onBackToYearSelection={handleBackToYearSelection}
        />
      );
    }

    if (selectedTask === 'user-management') {
      return (
        <>
          <button
            onClick={() => setSelectedTask('')}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ← Back to Admin Portal
          </button>
          <EditStudent />
        </>
      );
    }

    return (
      <>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
          Select Catalog Year
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setSelectedYear(2025)}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #1976d2',
              backgroundColor: '#1976d2',
              color: '#fff',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            2025
          </button>
          <button
            onClick={() => setSelectedYear(2026)}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #1976d2',
              backgroundColor: '#1976d2',
              color: '#fff',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            2026
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => setSelectedTask('user-management')}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #28a745',
              backgroundColor: '#28a745',
              color: '#fff',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            User Management
          </button>
        </div>
      </>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: '700',
        color: '#1e88e5',
        marginBottom: '20px',
        fontFamily: 'Segoe UI, sans-serif',
        letterSpacing: '1px'
      }}>
        Admin Portal
      </h1>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
