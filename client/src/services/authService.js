
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

const authService = {
  login: (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
  },

  register: (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
  },

  resetPassword: (token, newPassword) => {
    return axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
  },

  sendResetLink: (emailOrPhone) => {
    return axios.post(`${API_URL}/send-reset-link`, { emailOrPhone });
  },

  getTime: (token) => {
    return axios.get(`${API_URL}/time`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  kickout: (userId) => {
    return axios.post(`${API_URL}/kickout`, { userId });
  },
};

export default authService;
