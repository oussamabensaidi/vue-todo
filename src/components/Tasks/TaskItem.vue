<template>
  <li class="task-item">
    <div class="task-left">
      <input
        type="checkbox"
        v-model="checked"
        @change="$emit('toggle', task.id)"
        class="task-checkbox"
      />

      <div class="task-content">
        <h3 :class="{ 'task-title': true, terminer: checked }">{{ task.titre }}</h3>
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
      </div>
    </div>

    <div class="task-actions">
      <!-- <button @click="$emit('edit', task)" class="btn btn-edit">Modifier</button> -->
      <button @click="$emit('delete', task.id)" class="btn btn-delete">Supprimer</button>
    </div>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const checked = ref(props.task.terminer || false)

// Optional: keep local state synced with parent updates
watch(() => props.task.terminer, (val) => {
  checked.value = val
})
</script>

<style scoped>
.task-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f9f9f9;
}

.task-left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.task-checkbox {
  margin-top: 0.3rem;
}

.task-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
  color: #222;
}

.task-title.terminer {
  text-decoration: line-through;
  color: #888;
}

.task-description {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.btn-edit {
  background-color: #2563eb;
  color: white;
}

.btn-delete {
  background-color: #dc2626;
  color: white;
}
</style>
