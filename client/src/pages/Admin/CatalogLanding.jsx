import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddCourse from './AddCourse';
import EditCourseInfo from './EditCourseInfo';
import DeleteCourse from './DeleteSection';
import ViewCourseCatalog from './ViewCourseCatalog';

const CatalogLanding = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState('');
  const [courses, setCourses] = useState([]);

  // Add some sample data for testing
  useEffect(() => {
    // Only add sample data if there are no courses yet
    if (courses.length === 0) {
      setCourses([
        {
          course_code: 'CS101',
          course_title: 'Introduction to Computer Science',
          description: 'An introductory course to computer science concepts',
          units: '3',
          prerequisites: [],
          term: 'Fall',
          year: year
        },
        {
          course_code: 'MATH201',
          course_title: 'Calculus I',
          description: 'First semester of calculus',
          units: '4',
          prerequisites: [],
          term: 'Fall',
          year: year
        }
      ]);
    }
  }, [year]);

  const renderContent = () => {
    switch (selectedTask) {
      case 'add':
        return <AddCourse courses={courses} setCourses={setCourses} onBackClick={() => setSelectedTask('')} selectedYear={year} />;
      case 'edit':
        return <EditCourseInfo courses={courses} setCourses={setCourses} onBackClick={() => setSelectedTask('')} selectedYear={year} />;
      case 'delete':
        return (
          <DeleteCourse
            courses={courses}
            setCourses={setCourses}
            onBackClick={() => setSelectedTask('')}
          />
        );
      case 'view':
        return <ViewCourseCatalog courses={courses} onBackClick={() => setSelectedTask('')} />;
      default:
        return (
          <div style={styles.container}>
            <h2 style={styles.subheading}>Catalog Management - {year}</h2>
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
  
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/admin/catalog/year-selection')}
      >
        ← Back to Year Selection
      </button>
      {renderContent()}
    </div>
  );
};

export default CatalogLanding;
