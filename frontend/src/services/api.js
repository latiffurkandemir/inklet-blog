import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data) {
        localStorage.setItem('token', response.data);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

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
    try {
      const response = await api({
        method: 'PUT',
        url: '/users/update/password',
        data: passwordData,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  }
};

export const blogAPI = {
  getFeed: async () => {
    const response = await api.get('/blogs/all/feed');
    console.log('Blog API response:', response.data);
    return response.data;
  },

  getUserBlog: async () => {
    const response = await api.get('/blogs/all');
    console.log('Blog API response:', response.data);
    return response.data;
  },

  getByBlogId: async (blogId) => {
    try {
      const response = await api.get(`/blogs/${blogId}/details`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
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

export const commentAPI = {
  create: async (blogId, commentData) => {
    try {
      const response = await api.post('/comments/create', {
        blog_id: blogId,
        content: commentData
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }
};

export default api;