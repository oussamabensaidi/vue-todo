import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth'  // Fixed import path
import api from '@/services/api'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  getters: {
    getTasks: (state) => state.tasks,
    getTaskById: (state) => (id) => state.tasks.find(task => task.id === id),
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      
      try {
        // Get auth store instance
        const authStore = useAuthStore();
        
        // Check authentication using the store's getter
        if (!authStore.isAuthenticated) {
          throw new Error('User is not authenticated');
        }

        const response = await api.get('/tasks');
        
        // Handle different response structures
        this.tasks = response.data?.data || response.data || [];
        
        return { 
          success: true, 
          data: this.tasks 
        };
      } catch (error) {
        this.error = this.normalizeError(error);
        
        console.error('Task fetch error:', {
          status: error.response?.status,
          message: error.message,
          endpoint: error.config?.url,
          timestamp: new Date().toISOString()
        });

        // Handle unauthorized errors
        if (error.response?.status === 401) {
          const authStore = useAuthStore();
          authStore.logout(); // Use the auth store's logout method
        }
        
        return { 
          success: false, 
          error: this.error,
          status: error.response?.status 
        };
      } finally {
        this.loading = false;
      }
    },

    normalizeError(error) {
      // Unified error message handling
      if (error.response) {
        return error.response.data?.message || 
               error.response.data?.error ||
               `Request failed with status ${error.response.status}`;
      }
      return error.message || 'Network error occurred';
    },

    async createTask(taskData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Debug: Log the task data being sent
        console.log('Sending task data:', JSON.stringify(taskData, null, 2));
        
        // Debug: Verify authentication token exists
        const token = localStorage.getItem('auth_token');  // Fixed token key
        console.log('Current auth token:', token ? 'Exists' : 'Missing');
        
        const response = await api.post('/tasks', taskData);
        
        // Debug: Log full response
        console.log('Create task response:', response);
        
        const newTask = response.data.data || response.data;
        this.tasks.push(newTask);
        return { success: true, data: newTask };
        
      } catch (error) {
        // Enhanced error handling
        const errorDetails = {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.response?.data?.message,
          validationErrors: error.response?.data?.errors,
          serverError: error.response?.data?.error,
          requestConfig: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data
          }
        };
        
        console.error('Detailed task creation error:', errorDetails);
        
        // Set user-friendly error message
        this.error = error.response?.data?.message || 
                    error.response?.data?.error || 
                    (error.response?.status === 500 ? 'Server error occurred' : 'Failed to create task');
        
        return { 
          success: false, 
          error: this.error,
          details: errorDetails // Return details for debugging
        };
        
      } finally {
        this.loading = false;
      }
    },

async updateTask(id, updatedData) {
  try {
    const response = await api.put(`/tasks/${id}`, updatedData)
    const updatedTask = response.data.data || response.data

    const index = this.tasks.findIndex(t => t.id === id)
    if (index !== -1) {
      this.tasks[index] = updatedTask
    }
  } catch (error) {
    console.error('Erreur update:', error)
  }
},

    async deleteTask(id) {
      this.loading = true
      this.error = null
      
      try {
        await api.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(task => task.id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete task'
        console.error('Error deleting task:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchTaskById(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/tasks/${id}`)
        const task = response.data.data || response.data
        
        // Update the task in the store if it exists
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = task
        } else {
          this.tasks.push(task)
        }
        
        return { success: true, data: task }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch task'
        console.error('Error fetching task:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
   async toggleTaskStatus(id) {
  this.loading = true
  this.error = null
  
  // Find task in the local state
  const task = this.tasks.find(t => t.id === id)
  if (!task) {
    this.loading = false
    return { success: false, error: 'Task not found' }
  }

  try {
    // Send PUT request toggling 'terminer' boolean
    const response = await api.put(`/tasks/${id}`, {
      ...task,
      terminer: !task.terminer
    })
    
    const updatedTask = response.data.data || response.data
    
    // Update local task with updated data
    const index = this.tasks.findIndex(t => t.id === id)
    if (index !== -1) {
      this.tasks[index] = updatedTask
    }
    
    return { success: true, data: updatedTask }
  } catch (error) {
    this.error = error.response?.data?.message || 'Failed to toggle task status'
    console.error('Toggle task status error:', error)
    return { success: false, error: this.error }
  } finally {
    this.loading = false
  }
},

  }
})