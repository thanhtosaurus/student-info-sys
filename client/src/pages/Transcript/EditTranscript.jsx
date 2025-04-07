import React, { useState } from 'react';


const mockTranscript = {
  studentInfo: {
    name: 'John Doe',
    studentId: '123456789',
    major: 'Computer Science',
    gpa: 3.8,
  },
  courses: [
    { course: 'CPSC 120', term: 'Fall 2023', grade: 'A', units: 3 },
    { course: 'CPSC 121', term: 'Fall 2023', grade: 'A-', units: 3 },
    { course: 'MATH 150A', term: 'Fall 2023', grade: 'B+', units: 4 },
  ],
};

const EditTranscript = ({ onClose }) => {
  const [transcript, setTranscript] = useState(mockTranscript);
  const [isSaving, setIsSaving] = useState(false);

  const handleGradeChange = (index, newGrade) => {
    const updatedCourses = [...transcript.courses];
    updatedCourses[index].grade = newGrade;
    setTranscript({ ...transcript, courses: updatedCourses });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save with a fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Mock saved transcript:', transcript);
    setIsSaving(false);
    alert('Changes saved (mock)');
  };

  return (
    <div className="transcript-popup">
      <div className="popup-content">
        <h2>Edit Student Transcript</h2>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="student-info">
          <h3>Student Information</h3>
          <p><strong>Name:</strong> {transcript.studentInfo.name}</p>
          <p><strong>Student ID:</strong> {transcript.studentInfo.studentId}</p>
          <p><strong>Major:</strong> {transcript.studentInfo.major}</p>
          <p><strong>GPA:</strong> {transcript.studentInfo.gpa}</p>
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
              {transcript.courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.course}</td>
                  <td>{course.term}</td>
                  <td>
                    <input
                      type="text"
                      value={course.grade}
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                    />
                  </td>
                  <td>{course.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="save-button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditTranscript;
