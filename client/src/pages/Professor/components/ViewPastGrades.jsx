import React, { useState } from 'react';
import '../../../styles/StudentHistory.css';
import { supabase } from '../../../supabaseClient';

const ViewPastGrades = () => {
  const [studentId, setStudentId] = useState('');
  const [transcriptData, setTranscriptData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleChange = (e) => {
    setStudentId(e.target.value);
  };

  const fetchTranscript = async () => {
    try {
      setLoading(true);
      setError('');
      
      // First, fetch student information
      const { data: studentData, error: studentError } = await supabase
        .from('users')
        .select('id, first_name, last_name, email')
        .eq('id', studentId)
        .single();
        
      if (studentError) {
        setError('Student not found. Please check the ID and try again.');
        setLoading(false);
        return;
      }
      
      setStudentInfo(studentData);
      
      // Get enrollments for the student
      const { data, error } = await supabase.from('enrollments')
        .select(`
          section_id,
          grade
        `)
        .eq('student_uuid', studentId);

      if (error) throw error;

      // If we have enrollment data, get the related information
      if (data && data.length > 0) {
        const fullTranscriptData = [];
        
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
          
          const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('course_code, units')
            .eq('course_id', sectionData.course_id)
            .single();
            
          if (courseError) continue;
          
          const { data: semesterData, error: semesterError } = await supabase
            .from('semesters')
            .select('term, year')
            .eq('semester_id', sectionData.semester_id)
            .single();
            
          if (semesterError) continue;
          
          const { data: professorData, error: professorError } = await supabase
            .from('professors')
            .select(`
              professor_id,
              users!inner(first_name)
            `)
            .eq('professor_id', sectionData.professor_id)
            .single();
            
          if (professorError) continue;
          
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
        setSearchedId(studentId);
        setShowTable(true);
      } else {
        setTranscriptData([]);
        setError('No transcript data found for this student ID.');
        setShowTable(false);
      }
    } catch (error) {
      console.error('Error fetching transcript:', error);
      setError('Failed to fetch transcript. Please try again.');
      setTranscriptData([]);
      setShowTable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTranscript();
  };

  const closeTable = () => {
    setShowTable(false);
  };

  return (
    <div className="view-grades-section">
      <form className="student-history-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="student-history-input"
          placeholder="Enter student ID"
          value={studentId}
          onChange={handleChange}
        />
        <button 
          className="student-history-button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="loading">Loading transcript...</div>}
      {error && <div className="error">{error}</div>}
      
      {showTable && transcriptData.length > 0 && studentInfo && (
        <div className="transcript-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Student Grades</h2>
              <button className="close-button" onClick={closeTable}>×</button>
            </div>
            <div className="student-info">
              <p><strong>ID:</strong> {searchedId}</p>
              <p><strong>Name:</strong> {studentInfo.first_name} {studentInfo.last_name}</p>
              <p><strong>Email:</strong> {studentInfo.email}</p>
            </div>
            <div className="transcript-table-container">
              <table className="solid-table">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPastGrades;