import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/StudentHistory.css';

const StudentHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="student-history-container">
      <div className="student-history-box">
        <h1 className="student-history-title">Student History Management</h1>
        <button 
          className="back-button"
          onClick={() => navigate('/professor')}
        >
          ← Back to Professor Portal
        </button>
        <div className="button-container">
          <button 
            className="action-button view-grades-btn"
            onClick={() => navigate('/professor/student-history/view-past-grades')}
          >
            View Past Grades
          </button>
          <button 
            className="action-button enter-grade-btn"
            onClick={() => navigate('/professor/student-history/grade-entry')}
          >
            Enter Grade
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHistory; 