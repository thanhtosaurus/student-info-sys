import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const DeleteSection = ({ onBackClick }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_catalog!inner (
            year,
            term,
            status
          )
        `)
        .eq('status', 'active')
        .eq('course_catalog.status', 'active');

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const course = courses[index];
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${course.course_code}?`
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('course_catalog')
        .update({ status: 'inactive' })
        .eq('course_id', course.id);

      if (error) throw error;

      // Update local state
      const updated = [...courses];
      updated.splice(index, 1);
      setCourses(updated);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting course:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Delete Sections</h2>
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
              <th>Term</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.course_code}</td>
                <td>{course.course_title}</td>
                <td>{course.description}</td>
                <td>{course.units}</td>
                <td>{course.course_catalog?.term}</td>
                <td>{course.course_catalog?.year}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={onBackClick} style={{ marginTop: '20px' }}>Back</button>
    </div>
  );
};

export default DeleteSection;