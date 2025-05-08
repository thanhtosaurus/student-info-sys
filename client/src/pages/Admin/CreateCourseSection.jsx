import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const CreateCourseSection = ({ onBackClick }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    course: '',
    term: '',
    year: '',
    sectionNumber: '',
    location: '',
    maxEnrollment: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_code', { ascending: true });

      if (error) {
        throw error;
      }

      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, get the semester ID based on term and year
      const { data: semesterData, error: semesterError } = await supabase
        .from('semesters')
        .select('id')
        .eq('term', form.term)
        .eq('year', form.year)
        .single();

      if (semesterError) throw semesterError;

      // Create the course section
      const { error } = await supabase
        .from('sections')
        .insert([
          {
            course_id: form.course,
            semester_id: semesterData.id,
            section_number: form.sectionNumber,
            location: form.location,
            capacity: parseInt(form.maxEnrollment)
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Reset form and show success message
      setForm({
        course: '',
        term: '',
        year: '',
        sectionNumber: '',
        location: '',
        maxEnrollment: ''
      });
      alert('Course section created successfully!');
    } catch (error) {
      setError(error.message);
      alert('Error creating course section: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif', padding: '40px 20px' }}>
      <h2>Create Course Section</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_code} - {course.course_title}
              </option>
            ))}
          </select>

          <label htmlFor="term">Term:</label>
          <select
            id="term"
            name="term"
            value={form.term}
            onChange={handleChange}
            required
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
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select a year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          <label htmlFor="sectionNumber">Section Number:</label>
          <input
            type="text"
            id="sectionNumber"
            name="sectionNumber"
            value={form.sectionNumber}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <label htmlFor="maxEnrollment">Maximum Enrollment:</label>
          <input
            type="number"
            id="maxEnrollment"
            name="maxEnrollment"
            value={form.maxEnrollment}
            onChange={handleChange}
            required
            min="1"
            style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={onBackClick}
              style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Back
            </button>
            <button 
              type="submit"
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