<!-- src/components/Auth/Register.vue -->
<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Inscription</h2>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Entrez votre nom"
            :disabled="authStore.isLoading"
          />
        </div>
        <div class="form-group">
          <label for="name">Prenom</label>
          <input
            id="name"
            v-model="form.prenom"
            type="text"
            required
            placeholder="Entrez votre prenom"
            :disabled="authStore.isLoading"
          />
        </div>
        <div class="form-group">
          <label for="name">phone</label>
          <input
            id="name"
            v-model="form.phone"
            type="text"
            required
            placeholder="Entrez votre phone"
            :disabled="authStore.isLoading"
          />
        </div>
        
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
        
        <div class="form-group">
          <label for="password_confirmation">Confirmer le mot de passe</label>
          <input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            required
            placeholder="Confirmez votre mot de passe"
            :disabled="authStore.isLoading"
          />
        </div>
        
        <div v-if="authStore.getError" class="error-message">
          {{ authStore.getError }}
        </div>
        
        <button 
          type="submit" 
          class="register-button"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Inscription...' : 'S\'inscrire' }}
        </button>
      </form>
      
      <div class="register-footer">
        <p>Déjà un compte ? 
          <router-link to="/login" class="login-link">Se connecter</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import api from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  prenom: '',
  email: '',
  password: '',
  password_confirmation: ''
})

// const handleRegister = async () => {
//   if (form.password !== form.password_confirmation) {
//     authStore.error = 'Les mots de passe ne correspondent pas'
//     return
//   }
  
//   const result = await authStore.register(form)
  
//   if (result.success) {
//     router.push('/tasks')
//   }
// }
const handleRegister = async () => {
    try {
        const response = await api.post('/auth/register', form);
        console.log('Success:', response.data);
         router.push('/tasks')
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #ebf8ff, #c3dafe);
  padding: 1rem;
}

.register-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.register-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.register-form {
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

.register-button {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.register-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.register-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.login-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}
</style>