import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClassRollManagement.css';

const ClassRollManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="class-roll-container">
      <div className="class-roll-header">
        <h1>Class Roll Management</h1>
        <p>Manage your class enrollments and student records</p>
      </div>

      <div className="class-roll-actions">
        <div className="action-card" onClick={() => navigate('/professor/class-roll/add-student')}>
          <div className="card-icon">➕</div>
          <h3>Add Student to Class</h3>
          <p>Enroll new students in your course sections</p>
        </div>

        <div className="action-card" onClick={() => navigate('/professor/class-roll/drop-student')}>
          <div className="card-icon">➖</div>
          <h3>Drop Student from Class</h3>
          <p>Remove students from your course sections</p>
        </div>

        <div className="action-card" onClick={() => navigate('/professor/class-roll/view')}>
          <div className="card-icon">👥</div>
          <h3>View Class Roll</h3>
          <p>View and manage your current class enrollments</p>
        </div>
      </div>
    </div>
  );
};

export default ClassRollManagement;