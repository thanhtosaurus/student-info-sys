// src/pages/Login.js
import React, { useState } from 'react';
import '../styles/Login.css';
import { API_URL } from '../config';

const Login = ({ onLogin }) => {
  const [testingMode, setTestingMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Skip validation if in testing mode
    if (!testingMode) {
      // Basic validation
      const newErrors = {};
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 3) {
        newErrors.password = 'Password must be at least 3 characters';
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }
    }
    
    try {
      // If in testing mode, bypass the API call
      if (testingMode) {
        // Simulate a successful login with test data
        const testData = {
          token: 'test-token',
          user: {
            id: '1',
            email: formData.username,
            name: 'Test User',
            role: 'admin'
          }
        };
        
        // Store the test token in localStorage
        localStorage.setItem('token', testData.token);
        localStorage.setItem('user', JSON.stringify(testData.user));
        
        // Call the onLogin function to update authentication state
        onLogin();
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Call the onLogin function to update authentication state in the parent component
      onLogin();
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="testing-mode-toggle">
        <span className="toggle-label">Testing Mode</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={testingMode}
            onChange={() => setTestingMode(!testingMode)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="login-card">
        <div className="login-header">
          <h1>Student Information System</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {errors.submit && <span className="error-message">{errors.submit}</span>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;