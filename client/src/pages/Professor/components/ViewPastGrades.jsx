import React, { useState } from 'react';
import '../../../styles/StudentHistory.css';

const ViewPastGrades = () => {
  const [studentId, setStudentId] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for student:', studentId);
  };

  return (
    <div className="view-grades-section">
      <div className="student-history-form">
        <input
          type="text"
          className="student-history-input"
          placeholder="Enter student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button 
          className="student-history-button"
          onClick={handleSearch}
        >
          Search 
        </button>
      </div>
    </div>
  );
};

export default ViewPastGrades;