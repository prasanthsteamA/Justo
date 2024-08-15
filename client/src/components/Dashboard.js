import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }
      try {
 
        const response = await authService.getTime(token);


        setMessage(`Welcome! The server time is ${response.data.time}`);

        const timeout = setTimeout(async () => {
          try {
            await authService.kickout(token);
            localStorage.removeItem('token');
            navigate('/');
            alert('You have been logged out due to inactivity.');
          } catch (error) {
            console.error('Error during kickout:', error.response ? error.response.data : error.message);
          }
        }, 10 * 60 * 1000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.error('Error fetching time:', error.response ? error.response.data : error.message);
        alert('Session expired or invalid token. Please log in again.');
        navigate('/');
      }
    };

    fetchWelcomeMessage();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <p>{message}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
