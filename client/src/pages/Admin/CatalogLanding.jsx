import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddCourse from './AddCourse';
import EditCourseInfo from './EditCourseInfo';
import DeleteCourse from './DeleteSection';
import ViewCourseCatalog from './ViewCourseCatalog';

const CatalogLanding = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState('');

  const renderContent = () => {
    switch (selectedTask) {
      case 'add':
        return <AddCourse onBackClick={() => setSelectedTask('')} selectedYear={year} />;
      case 'edit':
        return <EditCourseInfo onBackClick={() => setSelectedTask('')} selectedYear={year} />;
      case 'delete':
        return <DeleteCourse onBackClick={() => setSelectedTask('')} />;
      case 'view':
        return <ViewCourseCatalog />;
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

  return (
    <div>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/admin/catalog')}
      >
        ← Back to Catalog Management
      </button>
      {renderContent()}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
  },
  subheading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '250px',
    transition: 'background 0.2s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
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

export default CatalogLanding;
