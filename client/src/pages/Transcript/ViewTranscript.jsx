import React, { useState } from 'react';
import '../../styles/ViewTranscript.css';
import { supabase } from '../../supabaseClient'; // Import Supabase client

const ViewTranscript = () => {
  const [userId, setUserId] = useState('');
  const [transcriptData, setTranscriptData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchedId, setSearchedId] = useState('');

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchTranscript = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Execute a raw SQL query with the provided user ID
      const { data, error } = await supabase.from('enrollments')
        .select(`
          section_id,
          grade
        `)
        .eq('student_uuid', userId);

      if (error) throw error;

      // If we have enrollment data, get the related information
      if (data && data.length > 0) {
        // Create an array to store complete transcript data
        const fullTranscriptData = [];
        
        // For each enrollment, get the related section data
        for (const enrollment of data) {
          const { data: sectionData, error: sectionError } = await supabase
            .from('sections')
            .select(`
              course_id,
              semester_id,
              professor_id
            `)
            .eq('section_id', enrollment.section_id)
            .single();
            
          if (sectionError) continue;
          
          // Get course data
          const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('course_code, units')
            .eq('course_id', sectionData.course_id)
            .single();
            
          if (courseError) continue;
          
          // Get semester data
          const { data: semesterData, error: semesterError } = await supabase
            .from('semesters')
            .select('term, year')
            .eq('semester_id', sectionData.semester_id)
            .single();
            
          if (semesterError) continue;
          
          // Get professor and user data
          const { data: professorData, error: professorError } = await supabase
            .from('professors')
            .select(`
              professor_id,
              users!inner(first_name)
            `)
            .eq('professor_id', sectionData.professor_id)
            .single();
            
          if (professorError) continue;
          
          // Combine all data into one transcript entry
          fullTranscriptData.push({
            course_code: courseData.course_code,
            units: courseData.units,
            grade: enrollment.grade,
            term: semesterData.term,
            year: semesterData.year,
            first_name: professorData.users.first_name
          });
        }
        
        setTranscriptData(fullTranscriptData);
        setSearchedId(userId);
      } else {
        setTranscriptData([]);
        setError('No transcript data found for this student ID.');
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
      setError('Failed to fetch transcript. Please try again.');
      setTranscriptData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTranscript();
  };

  return (
    <div className="transcript-container">
      <div className="transcript-card">
        <div className="transcript-header">
          <h1>View Student Transcript</h1>
          <p>Enter the student ID to view their transcript</p>
        </div>

        <form className="transcript-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Student ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search Transcript'}
          </button>
        </form>
      </div>

      {/* Transcript Table */}
      {loading && <div className="loading">Loading transcript...</div>}
      {error && <div className="error">{error}</div>}
      {transcriptData.length > 0 && (
        <div className="transcript-table">
          <h3>Course History for Student ID: {searchedId}</h3>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Term</th>
                <th>Year</th>
                <th>Grade</th>
                <th>Units</th>
                <th>Professor</th>
              </tr>
            </thead>
            <tbody>
              {transcriptData.map((course, index) => (
                <tr key={index}>
                  <td>{course.course_code}</td>
                  <td>{course.term}</td>
                  <td>{course.year}</td>
                  <td>{course.grade}</td>
                  <td>{course.units}</td>
                  <td>{course.first_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTranscript;
