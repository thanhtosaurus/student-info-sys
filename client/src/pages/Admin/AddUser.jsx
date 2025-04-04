import React, { useState } from 'react';

const AddUser = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    role: '', // changed to empty string
    grade_level: '', // changed to empty string
    major: '', // changed to empty string
    units_completed: 0,
    department: ''
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
    
    // If role is changing, clear role-specific fields
    if (name === 'role') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Clear role-specific fields
        grade_level: '',
        major: '',
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

    if (!formData.major) {
      newErrors.major = 'Major is required';
    }

    if (formData.units_completed < 0) {
      newErrors.units_completed = 'Units completed cannot be negative';
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
      role: '', // changed to empty string
      grade_level: '', // changed to empty string
      major: '', // changed to empty string
      units_completed: 0,
      department: ''
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New User</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', color: formData.role ? 'black' : '#666' }}
            className={errors.role ? 'error' : ''}
          >
            <option value="" disabled>Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="professor">Professor</option>
          </select>
          {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
        </div>

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

        {formData.role === 'student' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Grade Level:</label>
              <select
                name="grade_level"
                value={formData.grade_level}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', color: formData.grade_level ? 'black' : '#666' }}
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
              {errors.grade_level && <div style={{ color: 'red' }}>{errors.grade_level}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Major:</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', color: formData.major ? 'black' : '#666' }}
                className={errors.major ? 'error' : ''}
              >
                <option value="" disabled>Select Major</option>
                <option value="undeclared">Undeclared</option>
                <option value="computer_science">Computer Science</option>
                <option value="biology">Biology</option>
                <option value="economics">Economics</option>
              </select>
              {errors.major && <div style={{ color: 'red' }}>{errors.major}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Units Completed:</label>
              <input
                type="number"
                name="units_completed"
                value={formData.units_completed}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px' }}
                className={errors.units_completed ? 'error' : ''}
                min="0"
                step="0.5"
              />
              {errors.units_completed && <div style={{ color: 'red' }}>{errors.units_completed}</div>}
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
              style={{ width: '100%', padding: '8px', color: formData.department ? 'black' : '#666' }}
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
            {errors.department && <div style={{ color: 'red' }}>{errors.department}</div>}
          </div>
        )}

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