import React, { useState, useEffect } from 'react';

// Frontend only: form component to add a new course
// This uses local state and is not yet connected to backend
export default function AddCourse({ courses = [], setCourses, onBackClick, selectedYear }) {
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
    setCourses([...courses, { ...form, year: selectedYear, term: form.term }]); // Ensure year and term are set correctly
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
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', padding: '40px 20px' }}>
    <h2>Catalog Year: {selectedYear}</h2>  
      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            name="course_code"
            placeholder="e.g., CPSC 120"
            value={form.course_code}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label>Course Name:</label>
          <input
            type="text"
            name="course_title"
            placeholder="e.g., Programming Fundamentals"
            value={form.course_title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter course description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', height: '100px', border: '1px solid #ccc', borderRadius: '4px' }}
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
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label>Term:</label>
          <input
            type="text"
            name="term"
            placeholder="Enter term (e.g., Spring, Summer, Fall)"
            value={form.term}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label>Prerequisites:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter prerequisite course code"
              value={tempPrereq}
              onChange={(e) => setTempPrereq(e.target.value)}
              style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button type="button" onClick={handleAddPrerequisite} style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
            <button type="button" onClick={onBackClick} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Back
            </button>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}