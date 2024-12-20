import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Axios instance oluşturma
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - JWT token eklemek için
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data) {
      localStorage.setItem('token', response.data);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// User endpoints
export const userAPI = {
  signup: async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/update', userData);
    return response.data;
  },

  updatePassword: async (passwordData) => {
    const response = await api.put('/users/update/password', passwordData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  }
};

// Blog endpoints
export const blogAPI = {
  getAll: async () => {
    const response = await api.get('/blogs/all');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/blogs/${id}/details`);
    return response.data;
  },

  create: async (blogData) => {
    const response = await api.post('/blogs/create', blogData);
    return response.data;
  },

  update: async (id, blogData) => {
    const response = await api.put(`/blogs/update/${id}`, blogData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/blogs/delete/${id}`);
    return response.data;
  }
};

// Comment endpoints
export const commentAPI = {
  create: async (commentData) => {
    const response = await api.post('/comments/create', commentData);
    return response.data;
  }
};

// Error handler helper
const handleError = (error) => {
  console.error('API Error:', error);
  if (error.response?.status === 401) {
    // Token expired veya invalid token durumunda
    authAPI.logout();
    window.location.href = '/login';
  }
  throw error;
};

// Her API çağrısı için error handling
Object.values([authAPI, userAPI, blogAPI, commentAPI]).forEach(api => {
  Object.keys(api).forEach(key => {
    const originalFn = api[key];
    api[key] = async (...args) => {
      try {
        return await originalFn(...args);
      } catch (error) {
        return handleError(error);
      }
    };
  });
});

export default api;