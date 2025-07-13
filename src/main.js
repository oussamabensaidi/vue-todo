import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'  // Make sure this path is correct
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Initialize Pinia first
const pinia = createPinia()

const app = createApp(App)

// Use plugins BEFORE accessing store
app.use(pinia)
app.use(router)

// Set up Pusher/Echo - moved after pinia initialization
window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '09bd60b50dfaeb6fa096',
  cluster: 'eu',
  forceTLS: true,
  encrypted: true,
  authEndpoint: 'http://localhost:8000/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
  }
})

// Initialize auth after pinia is set up
const authStore = useAuthStore()
authStore.initializeAuth()  // This loads the token/user from localStorage

// Handle token changes for Echo
authStore.$subscribe((mutation, state) => {
  if (mutation.storeId === 'auth') {
    window.Echo.options.auth.headers.Authorization = `Bearer ${state.token}`
  }
})

app.mount('#app')