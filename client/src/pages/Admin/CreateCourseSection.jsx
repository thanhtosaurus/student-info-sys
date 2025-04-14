import React, { useState } from 'react';

const CreateCourseSection = ({ onBackClick }) => {
  const [form, setForm] = useState({
    course: '',
    term: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', padding: '40px 20px' }}>
      <h2>Create Course Section</h2>
      <form style={{ textAlign: 'left' }}>
        <div>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select a course</option>
          </select>

          <label htmlFor="term">Term:</label>
          <select
            id="term"
            name="term"
            value={form.term}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select a term</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>

          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select a year</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={onBackClick}
              style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Back
            </button>
            <button 
              type="button"
              style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add Section to Catalog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseSection; 