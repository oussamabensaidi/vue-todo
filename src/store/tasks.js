// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useTaskStore = defineStore('tasks', {
//   state: () => ({
//     tasks: [],
//   }),

//   actions: {
//     async fetchTasks() {
//       const res = await axios.get('/api/tasks', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       this.tasks = res.data;
//     },

//     async addTask(task) {
//       await axios.post('/api/tasks', task, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//     },

//     async deleteTask(id) {
//       await axios.delete(`/api/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//     }
//   }
// });

// src/store/tasks.js
import { defineStore } from 'pinia'
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
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/tasks')
        this.tasks = response.data.data || response.data // Handle different response formats
        return { success: true, data: this.tasks }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch tasks'
        console.error('Error fetching tasks:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/tasks', taskData)
        const newTask = response.data.data || response.data
        this.tasks.push(newTask)
        return { success: true, data: newTask }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create task'
        console.error('Error creating task:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateTask(id, taskData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put(`/tasks/${id}`, taskData)
        const updatedTask = response.data.data || response.data
        
        const index = this.tasks.findIndex(task => task.id === id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
        
        return { success: true, data: updatedTask }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update task'
        console.error('Error updating task:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
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
    }
  }
})