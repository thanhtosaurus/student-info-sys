import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

import AddUser from './AddUser';


const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddUser, setShowAddUser] = useState(false);



  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        throw error;
      }

      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showAddUser) {
    return <AddUser onBackClick={() => setShowAddUser(false)} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="text-2xl font-bold" style={{ marginBottom: '15px' }}>Users List</h1>
        <button
          onClick={() => setShowAddUser(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            margin: '0 auto'
          }}
        >
          Add New User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {users.length > 0 && Object.keys(users[0]).map((header) => (
                <th key={header} className="px-4 py-2 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                {Object.values(user).map((value, i) => (
                  <td key={i} className="px-4 py-2 border-b">
                    {value?.toString() || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
