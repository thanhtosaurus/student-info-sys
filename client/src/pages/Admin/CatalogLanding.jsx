import React, { useState } from 'react';
import AddCourse from './AddCourse';
import EditCourseInfo from './EditCourseInfo';
import DeleteCourse from './DeleteSection';
const CatalogLanding = ({ selectedYear,onBackToYearSelection }) => {
  const [selectedTask, setSelectedTask] = useState('');

  // Frontend-only: using in-memory state for course data
  // This is temporary for UI testing
  const [courses, setCourses] = useState([]);
  const renderContent = () => {
    switch (selectedTask) {
      case 'add':
        return <AddCourse courses={courses} setCourses={setCourses} onBackClick={() => setSelectedTask('')} selectedYear={selectedYear} />;
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
        
          <div style={styles.container}>
          <h2 style={styles.subheading}>Catalog Management</h2>

          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => setSelectedTask('add')}>Add New Course</button>
            <button style={styles.button} onClick={() => setSelectedTask('edit')}>Edit Course Info</button>
            <button style={styles.button} onClick={() => setSelectedTask('delete')}>Delete Sections</button>
            <button style={styles.button} onClick={() => setSelectedTask('view')}>View Course Catalog</button>
          </div>
        </div>
              );
          }
  };
  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '36px',
      marginBottom: '10px',
    },
    subheading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '30px',
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
    },
    button: {
      padding: '12px 20px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      minWidth: '180px',
      transition: 'background 0.2s ease',
    },
    backButton: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'background 0.2s ease',
    }
  };
  
  //"Back" button -> navigate to year selection page
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button 
        style={styles.backButton} 
        onClick={onBackToYearSelection}
      >
        ← Back to Year Selection
      </button>
      {renderContent()}
    </div>
  );
};

export default CatalogLanding;
