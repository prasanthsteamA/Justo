import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authService.login(
        username,
        password,
      );
      localStorage.setItem('token', response.data.token);
      history('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
    <div className="card">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
          Forgot your password? <Link to="/send-reset-link">Reset it here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
