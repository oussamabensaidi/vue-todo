import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const token = localStorage.getItem('token')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '09bd60b50dfaeb6fa096',           // Your Pusher key
  cluster: 'eu',                         // Your cluster
  forceTLS: true,
  encrypted: true,
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${token}`, // Must be a valid JWT token
    },
  },
})

window.Echo.connector.pusher.connection.bind('connected', () => {
  console.log('Connected to Pusher ✅')
})

window.Echo.connector.pusher.connection.bind('error', (err) => {
  console.error('Pusher connection error:', err)
})
