import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const UserManagement = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [studentId, setStudentId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!studentId || !newStatus) {
        throw new Error('Student ID and status are required');
      }

      const { error: updateError } = await supabase
        .from('students')
        .update({ student_status: newStatus })
        .eq('student_id', studentId);

      if (updateError) throw updateError;

      // Reset form
      setStudentId('');
      setNewStatus('');
      setError('Status updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (selectedTask) {
      case 'update-status':
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Update Student Status</h2>
            {error && (
              <div style={{ 
                color: error.includes('successfully') ? 'green' : 'red',
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: error.includes('successfully') ? '#e6ffe6' : '#ffe6e6',
                borderRadius: '4px'
              }}>
                {error}
              </div>
            )}
            <form onSubmit={handleUpdateStatus} style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Student ID (UUID):</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>New Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="removed">Removed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedTask('')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {loading ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
              User Management
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setSelectedTask('update-status')}
                style={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #1976d2',
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                Update Student Status
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default UserManagement; 