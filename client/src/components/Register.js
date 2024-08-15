import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await authService.register(
        username,
        password,
      );
      history('/');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
    <div className="card">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email or Phone Number"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
