import React from 'react';
import '../../styles/StudentHistory.css';
import ViewPastGrades from './components/ViewPastGrades';
import GradeEntry from './components/GradeEntry';

const StudentHistory = () => {
  return (
    <div>
      <ViewPastGrades />
      <GradeEntry />
    </div>
  );
};

export default StudentHistory; 