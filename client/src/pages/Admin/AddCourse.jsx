import React, { useState } from 'react';

export default function AddCourse() {
  const [form, setForm] = useState({
    course_code: '',
    course_title: '',
    description: '',
    units: '',
    prerequisites: []
  });

  const [tempPrereq, setTempPrereq] = useState('');
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddPrerequisite = () => {
    if (tempPrereq.trim()) {
      setForm({ ...form, prerequisites: [...form.prerequisites, tempPrereq.trim()] });
      setTempPrereq('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourses([...courses, form]);
    setForm({
      course_code: '',
      course_title: '',
      description: '',
      units: '',
      prerequisites: []
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Add New Course</h2>
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
        </div>

        {/* Show added prerequisites */}
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

        {/* Form buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button type="button" style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white' }}>
            Back
          </button>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
