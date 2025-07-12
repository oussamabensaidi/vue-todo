<!-- <template>
  <div class="task-list-wrapper">
    <h2 class="task-list-title">Mes Tâches</h2>
    <ul class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.task-list-wrapper {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.task-list-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.25rem;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style> -->
<!-- src/components/Tasks/TaskList.vue -->
<template>
  <div class="task-list-wrapper">
    <h2 class="task-list-title">Mes Tâches</h2>
    
    <div v-if="taskStore.isLoading" class="loading">
      Chargement des tâches...
    </div>
    
    <div v-else-if="taskStore.getError" class="error-message">
      {{ taskStore.getError }}
      <button @click="taskStore.fetchTasks()" class="retry-button">
        Réessayer
      </button>
    </div>
    
    <div v-else-if="taskStore.getTasks.length === 0" class="empty-state">
      <p>Aucune tâche trouvée.</p>
      <p>Ajoutez votre première tâche ci-dessus!</p>
    </div>
    
    <ul v-else class="task-list">
      <TaskItem
        v-for="task in taskStore.getTasks"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
        @update="updateTask"
      />
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '@/store/tasks'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})

const deleteTask = async (taskId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    await taskStore.deleteTask(taskId)
  }
}

const updateTask = async (taskId, taskData) => {
  await taskStore.updateTask(taskId, taskData)
}
</script>

<style scoped>
.task-list-wrapper {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.task-list-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.25rem;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.error-message {
  color: #dc2626;
  text-align: center;
  padding: 1rem;
  background-color: #fef2f2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
  margin-bottom: 1rem;
}

.retry-button {
  display: block;
  margin: 0.5rem auto 0;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.retry-button:hover {
  background-color: #1d4ed8;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-state p {
  margin-bottom: 0.5rem;
}
</style>