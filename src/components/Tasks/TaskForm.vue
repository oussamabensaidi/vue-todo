<!-- <template>
  <div class="task-form-wrapper">
    <h2 class="form-title">Ajouter une nouvelle tâche</h2>
    <form @submit.prevent="submitTask" class="task-form">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input 
          id="titre"
          v-model="task.titre" 
          type="text" 
          required
          placeholder="Entrez le titre de la tâche"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Description (optionnel)</label>
        <textarea 
          id="description"
          v-model="task.description" 
          placeholder="Entrez la description de la tâche"
          rows="3"
        ></textarea>
      </div>
      
      <button type="submit" class="btn-submit">Ajouter la tâche</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '@/store/tasks'

const taskStore = useTaskStore()

const task = reactive({
  titre: '',
  description: ''
})

const submitTask = () => {
  if (task.titre.trim()) {
    const newTask = {
      id: Date.now(),
      titre: task.titre.trim(),
      description: task.description.trim()
    }
    
    taskStore.addTask(newTask)
    
    // Reset form
    task.titre = ''
    task.description = ''
  }
}
</script>

<style scoped>
.task-form-wrapper {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.form-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
}

.task-form {
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
  color: #333;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #1e40af;
}
</style> -->
<!-- src/components/Tasks/TaskForm.vue -->
<template>
  <div class="task-form-wrapper">
    <h2 class="form-title">Ajouter une nouvelle tâche</h2>
    <form @submit.prevent="submitTask" class="task-form">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input 
          id="titre"
          v-model="task.titre" 
          type="text" 
          required
          placeholder="Entrez le titre de la tâche"
          :disabled="taskStore.isLoading"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Description (optionnel)</label>
        <textarea 
          id="description"
          v-model="task.description" 
          placeholder="Entrez la description de la tâche"
          rows="3"
          :disabled="taskStore.isLoading"
        ></textarea>
      </div>
      
      <div v-if="taskStore.getError" class="error-message">
        {{ taskStore.getError }}
      </div>
      
      <button 
        type="submit" 
        class="btn-submit"
        :disabled="taskStore.isLoading"
      >
        {{ taskStore.isLoading ? 'Ajout en cours...' : 'Ajouter la tâche' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '@/store/tasks'

const taskStore = useTaskStore()

const task = reactive({
  titre: '',
  description: ''
})

const submitTask = async () => {
  if (task.titre.trim()) {
    const result = await taskStore.createTask({
      titre: task.titre.trim(),
      description: task.description.trim()
    })
    
    if (result.success) {
      // Reset form
      task.titre = ''
      task.description = ''
    }
  }
}
</script>

<style scoped>
.task-form-wrapper {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.form-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
}

.task-form {
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
  color: #333;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.form-group input:disabled,
.form-group textarea:disabled {
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

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #1e40af;
}

.btn-submit:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>