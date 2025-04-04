import React from 'react';
import CatalogLanding from './CatalogLanding';
import { useYear } from '../../context/YearContext';
import YearDisplay from '../../components/YearDisplay';

const CreateCourseCatalog = () => {
  const { selectedYear, setSelectedYear } = useYear();

  const handleBackToYearSelection = () => {
    setSelectedYear(null);
  };

  // Generate academic years (current year to 5 years in the future)
  const academicYears = [2025, 2026];

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
        Create Course Catalog
      </h1>

      {!selectedYear ? (
        <>
          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              marginBottom: '30px',
              color: '#333',
            }}
          >
            Select Academic Year
          </h2>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center', 
            gap: '15px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {academicYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  ...buttonStyle,
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </>
      ) : (
        <CatalogLanding
          selectedYear={selectedYear}
          onBackToYearSelection={handleBackToYearSelection}
        />
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #1976d2',
  backgroundColor: '#1976d2',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  ':hover': {
    backgroundColor: '#1565c0',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  }
};

export default CreateCourseCatalog;
