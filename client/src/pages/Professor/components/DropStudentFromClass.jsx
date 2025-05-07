import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const DropStudentFromClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseCode: '',
    section: '',
    studentId: ''
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
            <label htmlFor="courseCode">Course Code</label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Enter Course Code (e.g., CPSC 541)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Enter Section Number"
              required
            />
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