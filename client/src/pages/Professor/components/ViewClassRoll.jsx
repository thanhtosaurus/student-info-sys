import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const ViewClassRoll = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockStudents = [
    { id: '1', name: 'John Doe', studentId: '12345', email: 'john@csu.fullerton.edu' },
    { id: '2', name: 'Jane Smith', studentId: '12346', email: 'jane@csu.fullerton.edu' },
    { id: '3', name: 'Bob Johnson', studentId: '12347', email: 'bob@csu.fullerton.edu' },
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedSection('');
    setStudents([]);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    // TODO: Implement API call to fetch students for the selected course and section
    setLoading(true);
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
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

      <div className="view-class-roll-container">
        <div className="filters">
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
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
              value={selectedSection}
              onChange={handleSectionChange}
              required
              disabled={!selectedCourse}
            >
              <option value="">Select Section</option>
              <option value="01">Section 01</option>
              <option value="02">Section 02</option>
              <option value="03">Section 03</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading students...</div>
        ) : (
          <div className="students-table">
            {students.length > 0 ? (
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
            ) : (
              selectedSection && <div className="no-students">No students found in this section.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewClassRoll; 