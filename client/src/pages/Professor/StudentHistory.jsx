import React from 'react';
import '../../styles/StudentHistory.css';

const StudentHistory = () => {
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
          />
          <button className="student-history-button">
            Search 
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHistory; 