import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const DropStudentFromClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseId: '',
    studentId: '',
    section: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to drop student from class
    console.log('Dropping student from class:', formData);
  };

  return (
    <div className="class-roll-container">
      <div className="class-roll-header">
        <h1>Drop Student from Class</h1>
        <button 
          className="back-button"
          onClick={() => navigate('/professor/class-roll')}
        >
          ← Back to Class Roll Management
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseId">Course</label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
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
            <label htmlFor="section">Section</label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value="">Select Section</option>
              <option value="01">Section 01</option>
              <option value="02">Section 02</option>
              <option value="03">Section 03</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter Student ID"
              required
            />
          </div>

          <button type="submit" className="submit-button danger">
            Drop Student from Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default DropStudentFromClass; 