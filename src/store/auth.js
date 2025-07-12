// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: null,
//     token: localStorage.getItem('token') || null
//   }),

//   actions: {
//     async login(data) {
//       const res = await axios.post('/api/auth/login', data);
//       this.token = res.data.token;
//       localStorage.setItem('token', this.token);
//       await this.getUser();
//     },

//     async register(data) {
//       await axios.post('/api/auth/register', data);
//     },

//     async getUser() {
//       const res = await axios.get('/api/user', {
//         headers: { Authorization: `Bearer ${this.token}` }
//       });
//       this.user = res.data;
//     },

//     logout() {
//       this.token = null;
//       this.user = null;
//       localStorage.removeItem('token');
//     }
//   }
// });
// src/store/auth.js

import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/login', credentials)
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        
        localStorage.setItem('auth_token', token)
        if (user) {
          localStorage.setItem('user_data', JSON.stringify(user))
        }
        
        return { success: true, data: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/register', userData)
        
        // If your backend returns a token after registration, auto-login
        if (response.data.token) {
          const { token, user } = response.data
          
          this.token = token
          this.user = user
          
          localStorage.setItem('auth_token', token)
          if (user) {
            localStorage.setItem('user_data', JSON.stringify(user))
          }
        }
        
        return { success: true, data: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      
      try {
        const response = await api.get('/user')
        this.user = response.data
        localStorage.setItem('user_data', JSON.stringify(response.data))
      } catch (error) {
        console.error('Failed to fetch user:', error)
        // If token is invalid, logout
        if (error.response?.status === 401) {
          this.logout()
        }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.error = null
      
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    },

    initializeAuth() {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token) {
        this.token = token
        if (userData) {
          try {
            this.user = JSON.parse(userData)
          } catch (error) {
            console.error('Failed to parse user data:', error)
            localStorage.removeItem('user_data')
          }
        }
      }
    },

    // Optional: Method to check if token is valid
    async validateToken() {
      if (!this.token) return false
      
      try {
        await api.get('/user')
        return true
      } catch (error) {
        if (error.response?.status === 401) {
          this.logout()
        }
        return false
      }
    }
  }
})
// import { defineStore } from 'pinia'
// import api from '@/services/api'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: null,
//     token: localStorage.getItem('auth_token') || null,
//     loading: false,
//     error: null
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.token,
//     getUser: (state) => state.user,
//     isLoading: (state) => state.loading,
//     getError: (state) => state.error
//   },

//   actions: {
//     async login(credentials) {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.post('/auth/login', credentials)
//         const { token, user } = response.data
        
//         this.token = token
//         this.user = user
        
//         localStorage.setItem('auth_token', token)
//         localStorage.setItem('user_data', JSON.stringify(user))
        
//         return { success: true, data: response.data }
//       } catch (error) {
//         this.error = error.response?.data?.message || 'Login failed'
//         return { success: false, error: this.error }
//       } finally {
//         this.loading = false
//       }
//     },

//     async register(userData) {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.post('/auth/register', userData)
//         const { token, user } = response.data
        
//         this.token = token
//         this.user = user
        
//         localStorage.setItem('auth_token', token)
//         localStorage.setItem('user_data', JSON.stringify(user))
        
//         return { success: true, data: response.data }
//       } catch (error) {
//         this.error = error.response?.data?.message || 'Registration failed'
//         return { success: false, error: this.error }
//       } finally {
//         this.loading = false
//       }
//     },

//     async fetchUser() {
//       if (!this.token) return
      
//       try {
//         const response = await api.get('/user')
//         this.user = response.data
//         localStorage.setItem('user_data', JSON.stringify(response.data))
//       } catch (error) {
//         console.error('Failed to fetch user:', error)
//         this.logout()
//       }
//     },

//     logout() {
//       this.user = null
//       this.token = null
//       this.error = null
      
//       localStorage.removeItem('auth_token')
//       localStorage.removeItem('user_data')
//     },

//     initializeAuth() {
//       const token = localStorage.getItem('auth_token')
//       const userData = localStorage.getItem('user_data')
      
//       if (token && userData) {
//         this.token = token
//         this.user = JSON.parse(userData)
//       }
//     }
//   }
// }
// )