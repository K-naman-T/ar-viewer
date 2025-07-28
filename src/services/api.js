import axios from 'axios';

// Change this line
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  getProfile: () => api.get('/auth/profile')
};

// Models API
export const modelsAPI = {
  getModels: () => api.get('/models'),
  getModel: (id) => api.get(`/models/${id}`),
  createModel: (modelData) => {
    const formData = new FormData();
    
    // Add text fields to form data
    Object.keys(modelData).forEach(key => {
      if (key !== 'modelFile') {
        formData.append(key, modelData[key]);
      }
    });
    
    // Add file to form data
    if (modelData.modelFile) {
      formData.append('modelFile', modelData.modelFile);
    }
    
    return api.post('/models', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateModel: (id, modelData) => api.put(`/models/${id}`, modelData),
  deleteModel: (id) => api.delete(`/models/${id}`)
};

export default api;