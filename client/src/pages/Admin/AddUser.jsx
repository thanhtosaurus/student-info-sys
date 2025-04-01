import React, { useState } from 'react';

const AddUser = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    role: 'student' // default role
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const generateUsername = () => {
    if (formData.first_name && formData.last_name) {
      const firstInitial = formData.first_name.charAt(0).toLowerCase();
      const lastName = formData.last_name.toLowerCase();
      const baseUsername = `${firstInitial}${lastName}`;
      
      setFormData(prev => ({
        ...prev,
        username: baseUsername,
        password: `welcome${baseUsername}2csuf!`,
        email: `${baseUsername}@csu.fullerton.edu`
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    alert('User added successfully!');
    setFormData({
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      email: '',
      role: 'student'
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New User</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.first_name ? 'error' : ''}
          />
          {errors.first_name && <div style={{ color: 'red' }}>{errors.first_name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.last_name ? 'error' : ''}
          />
          {errors.last_name && <div style={{ color: 'red' }}>{errors.last_name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
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
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
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
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.email ? 'error' : ''}
            readOnly
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.role ? 'error' : ''}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="professor">Professor</option>
          </select>
          {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
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