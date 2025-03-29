import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';

const AddCourse = ({ onBackClick }) => {
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    description: '',
    units: '',
    prerequisites: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prerequisiteInput, setPrerequisiteInput] = useState('');

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

  const handleAddPrerequisite = () => {
    if (prerequisiteInput.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, prerequisiteInput.trim()]
      }));
      setPrerequisiteInput('');
    }
  };

  const handleRemovePrerequisite = (index) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course_code.trim()) {
      newErrors.course_code = 'Course code is required';
    } else if (!/^[A-Z]{2,4}\s\d{3}$/.test(formData.course_code)) {
      newErrors.course_code = 'Course code must be in format: ABC 123';
    }
    
    if (!formData.course_name.trim()) {
      newErrors.course_name = 'Course name is required';
    }
    
    if (!formData.units) {
      newErrors.units = 'Units are required';
    } else if (isNaN(formData.units) || formData.units < 1 || formData.units > 6) {
      newErrors.units = 'Units must be between 1 and 6';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Check if course code already exists
      const { data: existingCourse } = await supabase
        .from('courses')
        .select('course_code')
        .eq('course_code', formData.course_code)
        .single();

      if (existingCourse) {
        setErrors({ submit: 'Course code already exists' });
        return;
      }

      // Insert new course
      const { data, error } = await supabase
        .from('courses')
        .insert([{
          ...formData,
          units: parseInt(formData.units)
        }])
        .select()
        .single();

      if (error) throw error;

      alert('Course added successfully!');
      setFormData({
        course_code: '',
        course_name: '',
        description: '',
        units: '',
        prerequisites: []
      });
    } catch (error) {
      console.error('Error adding course:', error);
      setErrors({ submit: error.message || 'Failed to add course' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New Course</h2>
      {errors.submit && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.submit}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Course Code:</label>
          <input
            type="text"
            name="course_code"
            value={formData.course_code}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.course_code ? 'error' : ''}
            placeholder="e.g., CPSC 120"
          />
          {errors.course_code && <div style={{ color: 'red' }}>{errors.course_code}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Course Name:</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.course_name ? 'error' : ''}
            placeholder="e.g., Programming Fundamentals"
          />
          {errors.course_name && <div style={{ color: 'red' }}>{errors.course_name}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
            placeholder="Enter course description"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Units:</label>
          <input
            type="number"
            name="units"
            value={formData.units}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            className={errors.units ? 'error' : ''}
            min="1"
            max="6"
            placeholder="Enter number of units (1-6)"
          />
          {errors.units && <div style={{ color: 'red' }}>{errors.units}</div>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Prerequisites:</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              value={prerequisiteInput}
              onChange={(e) => setPrerequisiteInput(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
              placeholder="Enter prerequisite course code"
            />
            <button
              type="button"
              onClick={handleAddPrerequisite}
              style={{
                padding: '8px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {formData.prerequisites.map((prereq, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: '#e9ecef',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                <span>{prereq}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePrerequisite(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    padding: '0 4px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onBackClick}
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
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Adding...' : 'Add Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
