import React, { useState } from 'react';
import AddCourse from './AddCourse';

const CatalogLanding = () => {
  const [selectedTask, setSelectedTask] = useState('');

  const renderContent = () => {
    switch (selectedTask) {
      case 'add':
        return <AddCourse onBackClick={() => setSelectedTask('')} />;
      case 'edit':
        return <p>🔧 Edit Course Info – (Coming soon)</p>;
      case 'delete':
        return <p>🗑️ Delete Sections – (Coming soon)</p>;
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
