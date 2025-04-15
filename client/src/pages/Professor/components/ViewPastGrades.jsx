import React, { useState } from 'react';
import '../../../styles/StudentHistory.css';

const ViewPastGrades = () => {
  const [studentId, setStudentId] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for student:', studentId);
  };

  return (
    <div className="student-history-container">
      <div className="student-history-box">
        <h1 className="student-history-title">
           Student Academic History Management
        </h1>
        <p className="student-history-subtitle">
          Enter the student ID to manage their academic history
        </p>

        <div className="student-history-form">
          <label className="student-history-label">
          </label>
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
    </div>
  );
};

export default ViewPastGrades;