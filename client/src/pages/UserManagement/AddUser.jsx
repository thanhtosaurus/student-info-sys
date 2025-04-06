import React, { useState } from 'react';

const AddUser = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    role: '',
    grade_level: '',
    major_id: '',
    units_completed: 0,
    department: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const generateUsername = async () => {
    if (formData.first_name && formData.last_name) {
      try {
        const firstInitial = formData.first_name.charAt(0).toLowerCase();
        const lastName = formData.last_name.toLowerCase();
        const baseUsername = `${firstInitial}${lastName}`;
        
        console.log('Base username:', baseUsername);
        
        // Check if username exists
        const response = await fetch(`http://localhost:5001/api/admin/checkUsername/${baseUsername}`);
        const data = await response.json();
        
        console.log('Initial username check:', data);
        
        let finalUsername = baseUsername;
        if (data.exists) {
          // If username exists, try with numbers until we find a unique one
          let counter = 1;
          let usernameExists = true;
          
          while (usernameExists) {
            const newUsername = `${baseUsername}${counter}`;
            console.log('Trying username:', newUsername);
            
            const checkResponse = await fetch(`http://localhost:5001/api/admin/checkUsername/${newUsername}`);
            const checkData = await checkResponse.json();
            
            console.log('Username check result:', checkData);
            
            if (!checkData.exists) {
              finalUsername = newUsername;
              usernameExists = false;
            } else {
              counter++;
            }
          }
        }
        
        console.log('Final username:', finalUsername);
        
        setFormData(prev => ({
          ...prev,
          username: finalUsername,
          password: `welcome${finalUsername}2csuf!`,
          email: `${finalUsername}@csu.fullerton.edu`
        }));
      } catch (error) {
        console.error('Username generation error:', error);
        setError('Failed to generate username. Please try again.');
      }
    } else {
      setError('Please enter first and last name before generating username.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If role is changing, clear role-specific fields
    if (name === 'role') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Clear role-specific fields
        grade_level: '',
        major_id: '',
        units_completed: 0,
        department: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.grade_level) {
      newErrors.grade_level = 'Grade level is required';
    }

    if (!formData.major_id) {
      newErrors.major_id = 'Major is required';
    }

    if (formData.units_completed < 0) {
      newErrors.units_completed = 'Units completed cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Use the validateForm function
      if (!validateForm()) {
        return;
      }

      // Prepare the data according to API requirements
      const userData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        role: formData.role.toLowerCase(),
        department: formData.department,
        major_id: formData.major_id,
        grade_level: formData.grade_level.toLowerCase()
      };

      const response = await fetch('http://localhost:5001/api/admin/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess('User created successfully!');
      // Reset form
      setFormData({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        role: '',
        department: '',
        major_id: '',
        grade_level: '',
        units_completed: ''
      });
    } catch (err) {
      setError(err.message || 'An error occurred while creating the user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="text-2xl font-bold" style={{ marginBottom: '15px' }}>Add New User</h1>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', color: formData.role ? 'black' : '#666', maxWidth: '300px', margin: '0 auto', display: 'block' }}
            className={errors.role ? 'error' : ''}
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="professor">Professor</option>
          </select>
          {errors.role && <div style={{ color: 'red', textAlign: 'center' }}>{errors.role}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', maxWidth: '300px', margin: '0 auto', display: 'block' }}
            className={errors.first_name ? 'error' : ''}
          />
          {errors.first_name && <div style={{ color: 'red', textAlign: 'center' }}>{errors.first_name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', maxWidth: '300px', margin: '0 auto', display: 'block' }}
            className={errors.last_name ? 'error' : ''}
          />
          {errors.last_name && <div style={{ color: 'red', textAlign: 'center' }}>{errors.last_name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '300px', margin: '0 auto' }}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{ flex: 1, padding: '8px' }}
              className={errors.username ? 'error' : ''}
              readOnly
            />
            <button
              type="button"
              onClick={generateUsername}
              style={{
                padding: '8px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Generate
            </button>
          </div>
          {errors.username && <div style={{ color: 'red', textAlign: 'center' }}>{errors.username}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '300px', margin: '0 auto' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ flex: 1, padding: '8px' }}
              className={errors.password ? 'error' : ''}
              readOnly
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: '8px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div style={{ color: 'red', textAlign: 'center' }}>{errors.password}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', maxWidth: '300px', margin: '0 auto', display: 'block' }}
            className={errors.email ? 'error' : ''}
            readOnly
          />
          {errors.email && <div style={{ color: 'red', textAlign: 'center' }}>{errors.email}</div>}
        </div>

        {formData.role === 'student' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Grade Level:</label>
              <select
                name="grade_level"
                value={formData.grade_level}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', color: formData.grade_level ? 'black' : '#666', maxWidth: '300px', margin: '0 auto', display: 'block' }}
                className={errors.grade_level ? 'error' : ''}
              >
                <option value="" disabled>Select Grade Level</option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="graduate">Graduate</option>
                <option value="super_senior">Super Senior</option>
              </select>
              {errors.grade_level && <div style={{ color: 'red', textAlign: 'center' }}>{errors.grade_level}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Major:</label>
              <select
                name="major_id"
                value={formData.major_id}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', color: formData.major_id ? 'black' : '#666', maxWidth: '300px', margin: '0 auto', display: 'block' }}
                className={errors.major_id ? 'error' : ''}
              >
                <option value="" disabled>Select Major</option>
                <option value="1">Computer Science</option>
                <option value="4">Economics</option>
              </select>
              {errors.major_id && <div style={{ color: 'red', textAlign: 'center' }}>{errors.major_id}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Units Completed:</label>
              <input
                type="number"
                name="units_completed"
                value={formData.units_completed}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', maxWidth: '300px', margin: '0 auto', display: 'block' }}
                className={errors.units_completed ? 'error' : ''}
                min="0"
                step="0.5"
              />
              {errors.units_completed && <div style={{ color: 'red', textAlign: 'center' }}>{errors.units_completed}</div>}
            </div>
          </>
        )}

        {formData.role === 'professor' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', color: formData.department ? 'black' : '#666', maxWidth: '300px', margin: '0 auto', display: 'block' }}
              className={errors.department ? 'error' : ''}
            >
              <option value="" disabled>Select Department</option>
              <option value="computer_science">Computer Science</option>
              <option value="biology">Biology</option>
              <option value="economics">Economics</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="engineering">Engineering</option>
            </select>
            {errors.department && <div style={{ color: 'red', textAlign: 'center' }}>{errors.department}</div>}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button
            type="button"
            onClick={onBackClick}
            style={{
              padding: '8px 16px',
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
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser; 