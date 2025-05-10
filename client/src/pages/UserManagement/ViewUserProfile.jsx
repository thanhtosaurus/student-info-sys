import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const ViewUserProfile = ({ userId, onBackClick }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const handleDeactivate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/deactivateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deactivate student');
      }

      const result = await response.json();
      setUser(result.data);
      alert('Student has been deactivated successfully');
    } catch (error) {
      alert('Error deactivating student: ' + error.message);
    }
  };

  const handleActivate = async () => {
    try {
      console.log('Attempting to activate user:', userId);
      const response = await fetch(`http://localhost:5001/api/admin/activateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(responseText || 'Failed to activate student');
      }

      const result = JSON.parse(responseText);
      setUser(result.data);
      alert('Student has been activated successfully');
    } catch (error) {
      console.error('Activation error:', error);
      alert('Error activating student: ' + error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editedUser.username,
          first_name: editedUser.first_name,
          last_name: editedUser.last_name,
          email: editedUser.email,
          role: editedUser.role
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const result = await response.json();
      setUser(result.data);
      setIsEditing(false);
      setEditedUser(null);
      alert('User updated successfully');
    } catch (error) {
      alert('Error updating user: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div className="container mx-auto p-4">Loading user profile...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;
  if (!user) return <div className="container mx-auto p-4">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <div className="space-x-4">
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit User
              </button>
            )}
            <button
              onClick={handleActivate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Activate User
            </button>
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Deactivate Student
            </button>
            <button
              onClick={onBackClick}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back to Users
            </button>
          </div>
        </div>
        <div>
          <table className="border-t border-gray-200 pt-4 w-1/2">
            <tbody>
              {Object.entries(user)
                .filter(([key]) => key !== 'password')
                .map(([key, value]) => (
                  <tr key={key} className="mb-4">
                    <td className="font-semibold text-black capitalize py-2 pr-4 w-1/2">
                      <strong>{(key.charAt(0).toUpperCase() + key.slice(1)).replace('_', ' ')}</strong>
                    </td>
                    <td className="py-2 w-1/2 text-black">
                      {isEditing && ['username', 'first_name', 'last_name', 'email', 'role'].includes(key) ? (
                        <input
                          type="text"
                          name={key}
                          value={editedUser[key]}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        value !== null ? value.toString() : 'N/A'
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isEditing && (
            <div className="mt-6 space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;

