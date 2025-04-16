import React from 'react';
import '../../styles/StudentHistory.css';
import ViewPastGrades from './components/ViewPastGrades';
import GradeEntry from './components/GradeEntry';

const StudentHistory = () => {
  return (
    <div className="student-history-container">
      <div className="student-history-box">
        <h1 className="student-history-title">
          View Past Grades
        </h1>
        <ViewPastGrades />
      </div>

      <div className="student-history-box" style={{ marginTop: '2rem' }}>
        <h1 className="student-history-title">
          Grade Entry System
        </h1>
        <GradeEntry />
      </div>
    </div>
  );
};

export default StudentHistory; 