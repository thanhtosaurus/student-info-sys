import React, { useState } from 'react';
import CatalogLanding from './CatalogLanding';
import AddUser from './AddUser';

const AdminDashboard = () => {
  // Local state to control when to show the Catalog Landing page
  const [showCatalogLanding, setShowCatalogLanding] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  if (showAddUser) {
    return <AddUser onBackClick={() => setShowAddUser(false)} />;
  }

  if (showCatalogLanding) {
    return <CatalogLanding />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
        <button 
          onClick={() => setShowAddUser(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          User Management
        </button>
        <button 
          onClick={() => setShowCatalogLanding(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Catalog Management
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
