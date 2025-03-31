import React, { useState } from 'react';
import AddCourse from './AddCourse';
import EditCourseInfo from './EditCourseInfo';
import DeleteCourse from './DeleteSection';
const CatalogLanding = () => {
  const [selectedTask, setSelectedTask] = useState('');

  // Frontend-only: using in-memory state for course data
  // This is temporary for UI testing
  const [courses, setCourses] = useState([]);

  const renderContent = () => {
    switch (selectedTask) {
      case 'add':
        return <AddCourse courses={courses} setCourses={setCourses} onBackClick={() => setSelectedTask('')} />;
      case 'edit':
        return <EditCourseInfo courses={courses} setCourses={setCourses} onBackClick={() => setSelectedTask('')} />;
      case 'delete':
          return (
            <DeleteCourse
              courses={courses}
              setCourses={setCourses}
              onBackClick={() => setSelectedTask('')}
            />
          );

      case 'view':
        return <p>📚 View Course Catalog – (Coming soon)</p>;
      default:
        return (
          <div>
            <h2>Catalog Management</h2>
            <button onClick={() => setSelectedTask('add')}>Add New Course</button>
            <button onClick={() => setSelectedTask('edit')}>Edit Course Info</button>
            <button onClick={() => setSelectedTask('delete')}>Delete Sections</button>
            <button onClick={() => setSelectedTask('view')}>View Course Catalog</button>
          </div>
        );
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      {renderContent()}
    </div>
  );
};

export default CatalogLanding;
