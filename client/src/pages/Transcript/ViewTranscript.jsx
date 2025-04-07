import React, { useState } from 'react';
import '../../styles/ViewTranscript.css';

const ViewTranscript = () => {
  const [searchData, setSearchData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    studentId: ''
  });
  const [showTranscript, setShowTranscript] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!searchData.email && !searchData.studentId) {
      newErrors.search = 'Please provide either email or Student ID';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call and show transcript
    setShowTranscript(true);
  };

  return (
    <div className="transcript-container">
      <div className="transcript-card">
        <div className="transcript-header">
          <h1>View Student Transcript</h1>
          <p>Search for a student's transcript using their information</p>
        </div>

        <form className="transcript-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={searchData.email}
              onChange={handleChange}
              placeholder="Enter student's email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={searchData.firstName}
              onChange={handleChange}
              placeholder="Enter student's first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={searchData.lastName}
              onChange={handleChange}
              placeholder="Enter student's last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={searchData.studentId}
              onChange={handleChange}
              placeholder="Enter student ID"
            />
          </div>

          {errors.search && <span className="error-message">{errors.search}</span>}
          
          <button type="submit" className="search-button">Search Transcript</button>
        </form>
      </div>

      {/* Transcript Popup */}
      {showTranscript && (
        <div className="transcript-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Student Transcript</h2>
              <button 
                className="close-button"
                onClick={() => setShowTranscript(false)}
              >
                ×
              </button>
            </div>
            
            <div className="student-info">
              <h3>Student Information</h3>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Student ID:</strong> 123456789</p>
              <p><strong>Major:</strong> Computer Science</p>
              <p><strong>GPA:</strong> 3.8</p>
            </div>

            <div className="transcript-table">
              <h3>Course History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Term</th>
                    <th>Grade</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CPSC 120</td>
                    <td>Fall 2023</td>
                    <td>A</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>CPSC 121</td>
                    <td>Fall 2023</td>
                    <td>A-</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>MATH 150A</td>
                    <td>Fall 2023</td>
                    <td>B+</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTranscript;
