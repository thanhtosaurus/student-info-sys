import React, { useState } from 'react';

export default function EditCourseInfo({ courses, setCourses, onBackClick }) {
  // Track which course is currently being edited
  const [editIndex, setEditIndex] = useState(null);

  // This holds the data for the course being edited
  const [editForm, setEditForm] = useState({
    course_code: '',
    course_title: '',
    description: '',
    units: '',
    prerequisites: []
  });

  // Called when the Edit button is clicked
  const handleEdit = (index) => {
    setEditIndex(index); // Mark which course we're editing
    setEditForm({ ...courses[index] }); // Load that course's data into the form
  };

  // Called when typing into the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Called when editing the prerequisites field (comma-separated)
  const handlePrereqChange = (e) => {
    const input = e.target.value;
    setEditForm({
      ...editForm,
      prerequisites: input.split(',').map((code) => code.trim())
    });
  };

  // Save the updated course info
  const handleSave = () => {
    const updatedCourses = [...courses];
    updatedCourses[editIndex] = editForm;
    setCourses(updatedCourses);
    setEditIndex(null); // Exit edit mode
  };

  // Cancel editing and reset
  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Edit Course Info</h2>

      {/* Course Table */}
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              {editIndex === index ? (
                // Render editable inputs if we're editing this row
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
                    <input
                      name="prerequisites"
                      value={editForm.prerequisites.join(', ')}
                      onChange={handlePrereqChange}
                      placeholder="Separate with commas"
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
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        </select>
                  </td>
                  <td>
                    <input
                      name="year"
                      value={editForm.year}
                      onChange={handleChange}
                    />
                    </td>
                  <td>
                    <button onClick={handleSave}>Save</button>{' '}
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                // Render static row when not editing
                <>
                  <td>{course.course_code}</td>
                  <td>{course.course_title}</td>
                  <td>{course.description}</td>
                  <td>{course.units}</td>
                  <td>{course.prerequisites.join(', ')}</td>
                  <td>{course.term}</td>
                  <td>{course.year}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back Button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
}
