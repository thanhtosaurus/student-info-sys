import React, { useState } from 'react';
import CatalogLanding from './CatalogLanding';

const AdminDashboard = () => {
  // Local state to control when to show the Catalog Landing page
  const [showCatalogLanding, setShowCatalogLanding] = useState(false);

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Admin Dashboard</h1>
      {!showCatalogLanding ? (
        <button onClick={() => setShowCatalogLanding(true)}>
          Catalog Management
        </button>
      ) : (
        <CatalogLanding />
      )}
    </div>
  );
};

export default AdminDashboard;
