import React from 'react';
import '../../../styles/StudentHistory.css';
import '../../../styles/GradeEntry.css';

const GradeEntry = () => {
  return (
    <div className="grade-entry-section">
      <div className="grade-entry-content">
        <h2>Grade Entry Form</h2>
        <form className="grade-entry-form">
          <div className="form-group full-width">
            <label htmlFor="course">Course:</label>
            <select
              id="course"
              name="course"
              required
            >
              <option value="">Select Course</option>
              <option value="CPSC 541">CPSC 541 - System and Software Standards</option>
              <option value="CPSC 544">CPSC 544 - Advanced Software Process</option>
              <option value="CPSC 545">CPSC 545 - Software Design & Architecture</option>
              <option value="CPSC 546">CPSC 546 - Modern Software Management</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID:</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentName">Student Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              min="2000"
              max="2025"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="term">Term:</label>
            <select
              id="term"
              name="term"
              required
            >
              <option value="">Select Term</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="grade">Grade:</label>
            <select
              id="grade"
              name="grade"
              required
            >
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Submit Grade
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeEntry;
