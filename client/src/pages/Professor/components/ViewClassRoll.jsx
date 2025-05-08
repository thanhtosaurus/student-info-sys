import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const ViewClassRoll = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseCode: '',
    section: ''
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setStudents([]);
    try {
      const response = await fetch(
        `http://localhost:5001/api/professors/class-roll/${encodeURIComponent(formData.courseCode)}/${encodeURIComponent(formData.section)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch students.');
      }
      const data = await response.json();
      // Map the backend response to the table format
      const mappedStudents = data.students.map((student, idx) => ({
        id: idx,
        studentId: student.student_id,
        name: `${student.first_name} ${student.last_name}`,
        email: student.email,
      }));
      setStudents(mappedStudents);
    } catch (err) {
      setError(err.message || 'Failed to fetch students. Please try again.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="class-roll-container">
      <div className="class-roll-header">
        <h1>View Class Roll</h1>
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

          <button type="submit" className="submit-button">
            View Class Roll
          </button>
        </form>
      </div>

      {loading && <div className="loading">Loading students...</div>}
      {error && <div className="error">{error}</div>}
      
      {students.length > 0 && (
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button 
                      className="action-button"
                      onClick={() => navigate(`/professor/student-history?studentId=${student.studentId}`)}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewClassRoll; 