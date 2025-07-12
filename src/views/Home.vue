<!-- src/views/HomeView.vue -->
<template>
  <div class="page-wrapper">
    <div class="card">
      <h1>Bienvenue dans votre To-Do List</h1>
      <p>Organisez vos tâches et restez productif avec notre application simple et intuitive.</p>
      <div class="button-group">
        <router-link to="/tasks" class="btn-primary">Voir mes tâches</router-link>
        <router-link to="/notifications" class="btn-secondary">Notifications</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composition API setup
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #ebf8ff, #c3dafe);
  padding: 1rem;
}

.card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 90vw;
  text-align: center;
  box-sizing: border-box;
}

.card h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.card p {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
  min-width: 120px;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1e40af;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

@media (max-width: 500px) {
  .card {
    padding: 1.5rem 1rem;
  }

  .card h1 {
    font-size: 1.5rem;
  }

  .card p {
    font-size: 0.95rem;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
  }
}
</style>