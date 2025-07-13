<!-- src/App.vue -->
<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">Todo App</router-link>

        <div class="nav-links">
          <template v-if="isAuthenticated">
            <router-link to="/" class="nav-link">Accueil</router-link>
            <router-link to="/tasks" class="nav-link">Tâches</router-link>
            <router-link to="/notifications" class="nav-link">Notifications</router-link>
            <button @click="handleLogout" class="nav-link logout-button">Déconnexion</button>
          </template>

          <template v-else>
            <router-link to="/login" class="nav-link">Connexion</router-link>
            <router-link to="/register" class="nav-link">Inscription</router-link>
          </template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>



<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

// Make sure auth is initialized
onMounted(() => {
  authStore.initializeAuth()
})

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
// export default 'app';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #2563eb;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
}
.logout-button {
  background: none;
  border: none;
  color: white;
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>