import React, { useState } from 'react';

 // Local state to store list of added courses
const AddCourse = ({ onBackClick }) => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    prerequisites: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourses([...courses, form]);
    setForm({ title: '', description: '', prerequisites: '' });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      {/*  Back button - return to Catalog*/}
      <button onClick={onBackClick} style={{ marginBottom: '20px' }}>
        ← Back to Catalog Management
      </button>

      <h2>Add New Course</h2>

      <form onSubmit={handleSubmit}>
        {/* Course Title input field */}
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        {/* Course Description input field */}
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={form.description}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="prerequisites"
          placeholder="Prerequisites"
          value={form.prerequisites}
          onChange={handleChange}
          required

        /><br />
        {/* Submit button */}
        <button type="submit">Add Course</button>
      </form>

      <h4>Course List:</h4>
      <table border="1" cellPadding="10" style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Prerequisites</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.prerequisites}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCourse;
