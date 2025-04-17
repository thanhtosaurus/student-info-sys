import React, { useState } from 'react';
import '../../../styles/StudentHistory.css';
import '../../../styles/GradeEntry.css';
import { supabase } from '../../../supabaseClient';

const GradeEntry = () => {
  const [formData, setFormData] = useState({
    course: '',
    studentId: '',
    studentName: '',
    term: '',
    year: '',
    grade: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    try {
      // Get the course_id from the course_code
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('course_id')
        .eq('course_code', formData.course)
        .single();

      if (courseError) {
        throw new Error('Course not found.');
      }

      // Get the semester_id from term and year
      const { data: semesterData, error: semesterError } = await supabase
        .from('semesters')
        .select('semester_id')
        .eq('term', formData.term)
        .eq('year', formData.year)
        .single();

      if (semesterError) {
        throw new Error('Semester not found.');
      }

      // Get the section_id using course_id and semester_id
      const { data: sectionData, error: sectionError } = await supabase
        .from('sections')
        .select('section_id')
        .eq('course_id', courseData.course_id)
        .eq('semester_id', semesterData.semester_id)
        .single();

      if (sectionError) {
        throw new Error('Section not found for the selected course and semester.');
      }

      // Insert the enrollment record
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([
          {
            student_uuid: formData.studentId,
            section_id: sectionData.section_id,
            grade: formData.grade
          }
        ]);

      if (enrollmentError) {
        throw new Error('Failed to record the grade.');
      }

      setSuccess('Grade successfully recorded!');
      setFormData({
        course: '',
        studentId: '',
        studentName: '',
        term: '',
        year: '',
        grade: ''
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grade-entry-section">
      <div className="grade-entry-content">
        <h2>Grade Entry Form</h2>
        <form className="grade-entry-form" onSubmit={handleSubmit}>
          {/* Course Selection */}
          <div className="form-group full-width">
            <label htmlFor="course">Course:</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="CPSC 541">CPSC 541 - System and Software Standards</option>
              <option value="CPSC 544">CPSC 544 - Advanced Software Process</option>
              <option value="CPSC 545">CPSC 545 - Software Design & Architecture</option>
              <option value="CPSC 546">CPSC 546 - Modern Software Management</option>
            </select>
          </div>

          {/* Student Information */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentId">Student ID:</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentName">Student Name:</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Term and Year */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="term">Term:</label>
              <select
                id="term"
                name="term"
                value={formData.term}
                onChange={handleChange}
                required
              >
                <option value="">Select Term</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2020"
                max="2030"
                required
              />
            </div>
          </div>

          {/* Grade */}
          <div className="form-group">
            <label htmlFor="grade">Grade:</label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Grade'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeEntry;
