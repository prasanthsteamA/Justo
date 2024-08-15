import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SendResetLink = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendResetLink = async () => {
    try {
      const response = await authService.sendResetLink(
        username,
      );
      setMessage(response.data.message);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error sending reset link:', error.response ? error.response.data : error.message);
      setMessage('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reset Password</h2>
        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSendResetLink}>Send Reset Link</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SendResetLink;
