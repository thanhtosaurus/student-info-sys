import React from 'react';
import { useYear } from '../context/YearContext';

const YearDisplay = () => {
  const { selectedYear } = useYear();

  if (!selectedYear) return null;

  return (
    <div 
      style={{
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        display: 'inline-block',
        marginBottom: '20px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      Academic Year: {selectedYear}
    </div>
  );
};

export default YearDisplay; 