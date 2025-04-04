import React from 'react';
import YearDisplay from '../../components/YearDisplay';

const DeleteCourse = ({ courses, setCourses, onBackClick }) => {
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${courses[index].course_code}?`
    );
    if (!confirmDelete) return;

    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <YearDisplay />
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
              <th>Prerequisites</th>
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
                <td>{course.prerequisites.join(', ')}</td>
                <td>{course.term}</td>
                <td>{course.year}</td>
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

export default DeleteCourse;
