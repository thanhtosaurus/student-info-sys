import React from 'react';
import '../../../styles/StudentHistory.css';
import '../../../styles/GradeEntry.css';

const GradeEntry = () => {
  return (
    <div className="grade-entry-section">
      <div className="grade-entry-content">
        <h2>Grade Entry Form</h2>
        <form className="grade-entry-form">
          {/* Course Selection */}
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

          {/* Student Information */}
          <div className="form-row">
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
          </div>

          {/* Term and Year */}
          <div className="form-row">
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

            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                min="2020"
                max="2030"
                required
              />
            </div>
          </div>

          {/* Grade */}
          <div className="form-group">
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

          <button type="submit" className="submit-button">Submit Grade</button>
        </form>
      </div>
    </div>
  );
};

export default GradeEntry;
