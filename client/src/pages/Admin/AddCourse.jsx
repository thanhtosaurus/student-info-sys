import React from 'react';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';

// Frontend only: form component to add a new course
// This uses local state and is not yet connected to backend
export default function AddCourse({ onBackClick, selectedYear }) {
  const [form, setForm] = useState({
    course_code: '',
    course_title: '',
    description: '',
    units: '',
    term: '',         
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First, insert the course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .insert({
          course_code: form.course_code,
          course_title: form.course_title,
          description: form.description,
          units: form.units,
          status: 'active'
        })
        .select('course_id')
        .single();

      if (courseError) throw courseError;

      if (!courseData || !courseData.course_id) {
        throw new Error('Failed to get course ID after insertion');
      }

      // Then, insert the course catalog entry
      const { error: catalogError } = await supabase
        .from('course_catalog')
        .insert({
          course_id: courseData.course_id,
          year: selectedYear,
          term: form.term,
          status: 'active'
        });

      if (catalogError) throw catalogError;

      // Reset form
      setForm({
        course_code: '',
        course_title: '',
        description: '',
        units: '',
        term: ''
      });
      
      // Go back to the catalog management page
      onBackClick();
    } catch (err) {
      setError(err.message);
      console.error('Error adding course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', padding: '40px 20px' }}>
      <h2>Catalog Year: {selectedYear}</h2>  
      <h3>Add New Course</h3>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
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
          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select term</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={onBackClick} 
              style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              disabled={loading}
            >
              Back
            </button>
            <button 
              type="submit" 
              style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              disabled={loading}
            >
              {loading ? 'Adding Course...' : 'Add Course'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}