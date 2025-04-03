import React, { useState, useEffect } from 'react';

// Frontend only: form component to add a new course
// This uses local state and is not yet connected to backend
export default function AddCourse({ courses, setCourses, onBackClick, selectedYear }) {
  // Form state for new course input
  const [form, setForm] = useState({
    course_code: '',
    course_title: '',
    description: '',
    units: '',
    prerequisites: [],
    term: '',         
    year: selectedYear || '', // Set year by default         
  });
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      year: selectedYear,
    }));
  }, [selectedYear]);

  const [tempPrereq, setTempPrereq] = useState(''); 

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent year from being changed
    if (name === 'year') return;
    setForm({ ...form, [name]: value });
  };
  // Handle adding a prerequisite
  const handleAddPrerequisite = () => {
    if (tempPrereq.trim()) {
      setForm({ ...form, prerequisites: [...form.prerequisites, tempPrereq.trim()] });
      setTempPrereq('');
    }
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form data to the shared courses state (frontend only)
    setCourses([...courses, { ...form, year: selectedYear }]); // Ensure year is set to selectedYear
    setForm({
      course_code: '',
      course_title: '',
      description: '',
      units: '',
      prerequisites: [],
      term: '',
      year: selectedYear
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
    <h2>Catalog Year: {selectedYear}</h2>  
      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: 'left' }}>
          <label>Course Code:</label>
          <input
            type="text"
            name="course_code"
            placeholder="e.g., CPSC 120"
            value={form.course_code}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <label>Course Name:</label>
          <input
            type="text"
            name="course_title"
            placeholder="e.g., Programming Fundamentals"
            value={form.course_title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter course description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', height: '100px' }}
          />

          <label>Units:</label>
          <input
            type="number"
            name="units"
            placeholder="Enter number of units (1–6)"
            value={form.units}
            onChange={handleChange}
            required
            min="1"
            max="6"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <label>Term:</label>
          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          >
            <option value="">Select term</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>

          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={selectedYear}
            readOnly
            disabled
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <label>Prerequisites:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter prerequisite course code"
              value={tempPrereq}
              onChange={(e) => setTempPrereq(e.target.value)}
              style={{ flexGrow: 1, padding: '8px' }}
            />
            <button type="button" onClick={handleAddPrerequisite} style={{ padding: '8px 12px' }}>
              Add
            </button>
          </div>

          {form.prerequisites.length > 0 && (
            <div style={{ textAlign: 'left', marginBottom: '10px' }}>
              <strong>Added Prerequisites:</strong>
              <ul>
                {form.prerequisites.map((code, index) => (
                  <li key={index}>{code}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button type="button" onClick={onBackClick} style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white' }}>
              Back
            </button>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>
              Add Course
            </button>
          </div>
        </div>
      </form>

      {/* Course List Table*/}
      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h3>Course List</h3>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', color: '#000' }}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Description</th>
                <th>Units</th>
                <th>Prerequisites</th>
                <th>Term</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.course_code}</td>
                  <td>{course.course_title}</td>
                  <td>{course.description}</td>
                  <td>{course.units}</td>
                  <td>{course.prerequisites.join(', ')}</td>
                  <td>{course.term}</td>
                  <td>{course.year}</td>  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}