import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const AddStudentToClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseCode: '',
    section: '',
    studentId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5001/api/professors/add-student-to-class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseCode: formData.courseCode,
          section: formData.section,
          studentId: formData.studentId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add student to class.');
      }

      setSuccess('Student successfully added to class!');
      // Reset form after successful submission
      setFormData({
        courseCode: '',
        section: '',
        studentId: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to add student to class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="class-roll-container">
      <div className="class-roll-header">
        <h1>Add Student to Class</h1>
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student to Class'}
          </button>
        </form>
      </div>
      
      {loading && <div className="loading">Adding student to class...</div>}
      {error && {error}}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default AddStudentToClass; 