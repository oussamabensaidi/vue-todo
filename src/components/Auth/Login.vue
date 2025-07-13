<!-- src/components/Auth/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Connexion</h2>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Entrez votre email"
            :disabled="authStore.isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Entrez votre mot de passe"
            :disabled="authStore.isLoading"
          />
        </div>
        
        <div v-if="authStore.getError" class="error-message">
          {{ authStore.getError }}
        </div>
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      
      <div class="login-footer">
        <p>Pas encore de compte ? 
          <router-link to="/register" class="register-link">S'inscrire</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

// const handleLogin = async () => {
//   // const result = await authStore.login(form)
  
//   // if (result.success) {
//   //   router.push('/tasks')
//   // }
//   try {
//     await authStore.login({
//       email: email.value,
//       password: password.value
//     })
//     router.push('/task')
//   } catch (error) {
//     // alert('Identifiants incorrects')
//   }
// }
const handleLogin = async () => {
  const result = await authStore.login({
    email: form.email,
    password: form.password
  })

  if (result.success) {
    // localStorage.setItem('token', response.data.token)
    router.push('/tasks') // ✅ Make sure the route exists and is named correctly
  } else {
    console.error('Login failed:', result.error)
  }
}

</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #ebf8ff, #c3dafe);
  padding: 1rem;
}

.login-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
}

.form-group input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fef2f2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
}

.login-button {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.login-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.register-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.register-link:hover {
  text-decoration: underline;
}
</style>