import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function EditCourseInfo({ onBackClick, selectedYear }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    course_code: '',
    course_title: '',
    description: '',
    units: '',
    term: '',
    year: selectedYear
  });

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
        .eq('course_catalog.status', 'active')
        .eq('course_catalog.year', selectedYear);

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setEditIndex(index);
    setEditForm({
      course_code: course.course_code,
      course_title: course.course_title,
      description: course.description,
      units: course.units,
      term: course.course_catalog?.term || '',
      year: selectedYear
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const course = courses[editIndex];
      
      // Update course information
      const { error: courseError } = await supabase
        .from('courses')
        .update({
          course_code: editForm.course_code,
          course_title: editForm.course_title,
          description: editForm.description,
          units: editForm.units
        })
        .eq('id', course.id);

      if (courseError) throw courseError;

      // Update course catalog information
      const { error: catalogError } = await supabase
        .from('course_catalog')
        .update({
          term: editForm.term
        })
        .eq('course_id', course.id)
        .eq('year', selectedYear);

      if (catalogError) throw catalogError;

      // Refresh the courses list
      await fetchCourses();
      setEditIndex(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating course:', err);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Course Info</h2>

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
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      name="course_code"
                      value={editForm.course_code}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="course_title"
                      value={editForm.course_title}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      rows={4}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <input
                      name="units"
                      type="number"
                      value={editForm.units}
                      onChange={handleChange}
                      min="1"
                      max="6"
                    />
                  </td>
                  <td>
                    <select
                      name="term"
                      value={editForm.term}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select term</option>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="fall">Fall</option>
                      <option value="winter">Winter</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="year"
                      value={selectedYear}
                      readOnly
                      disabled
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>{' '}
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{course.course_code}</td>
                  <td>{course.course_title}</td>
                  <td>{course.description}</td>
                  <td>{course.units}</td>
                  <td>{course.course_catalog?.term}</td>
                  <td>{course.course_catalog?.year}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
}
