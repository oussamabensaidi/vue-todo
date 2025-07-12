// src/services/api.js
import axios from 'axios'

// Create axios instance
const api = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   withCredentials: true, 
    baseURL: import.meta.env.VITE_API_BASE_URL,

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('auth_token')
//       localStorage.removeItem('user_data')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api