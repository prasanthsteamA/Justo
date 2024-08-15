// src/ResetPassword.js
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await authService.resetPassword(
        newPassword,
      );
      navigate('/');
    } catch (error) {
      console.error('Password reset failed:', error.response ? error.response.data : error.message);
      alert('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        <p>
          Remember your password? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
