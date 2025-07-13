<!-- src/views/TasksView.vue -->
<template>
  <div class="tasks-view">
    <div class="container">
      <h1 class="page-title">Gestion des Tâches</h1>
      <TaskForm />
      <TaskList 
        @delete="deleteTask"
        @toggle="toggleTask"

      />
          <!-- <LogoutButton v-if="authStore.isAuthenticated" /> -->

    </div>
  </div>
</template>

<script setup>
import TaskForm from '@/components/Tasks/TaskForm.vue'
import TaskList from '@/components/Tasks/TaskList.vue'
import LogoutButton from '@/components/Tasks/LogoutButton.vue'

</script>

<style scoped>
.tasks-view {
  min-height: calc(100vh - 200px);
  padding: 0 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 2rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>