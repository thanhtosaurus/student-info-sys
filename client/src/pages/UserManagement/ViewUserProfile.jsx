import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const ViewUserProfile = ({ userId, onBackClick }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <button
            onClick={onBackClick}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Back to Users
          </button>
        </div>
        <div>
            <table className="border-t border-gray-200 pt-4 w-1/2">
                <tbody>
                    {Object.entries(user)
                    .filter(([key]) => key !== 'id' && key !== 'password')
                    .map(([key, value]) => (
                        <tr key={key} className="mb-4">
                        <td className="font-semibold text-gray-700 capitalize py-2 pr-4 w-1/2"><strong>{(key.charAt(0).toUpperCase() + key.slice(1)).replace('_', ' ')}</strong></td>
                        <td className="py-2 w-1/2">{value !== null ? value.toString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;

