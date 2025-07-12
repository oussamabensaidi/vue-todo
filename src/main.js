import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

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
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
