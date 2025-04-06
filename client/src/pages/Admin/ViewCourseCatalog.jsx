import React from 'react';

const ViewCourseCatalog = ({ courses, onBackClick }) => {
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    },
    th: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #ddd',
      color: '#000000',
    },
    tr: {
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    backButton: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
    },
    title: {
      fontSize: '24px',
      color: '#333',
      margin: '0',
    },
    emptyMessage: {
      textAlign: 'center',
      padding: '20px',
      color: '#000000',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Course Catalog</h2>
        <button style={styles.backButton} onClick={onBackClick}>
          ← Back
        </button>
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Course Code</th>
            <th style={styles.th}>Course Name</th>
            <th style={styles.th}>Units</th>
            <th style={styles.th}>Prerequisites</th>
            <th style={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={styles.td}>{course.course_code}</td>
                <td style={styles.td}>{course.course_title}</td>
                <td style={styles.td}>{course.units}</td>
                <td style={styles.td}>{Array.isArray(course.prerequisites) ? course.prerequisites.join(', ') : course.prerequisites}</td>
                <td style={styles.td}>{course.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.emptyMessage}>
                No courses available. Add some courses to see them here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourseCatalog; 