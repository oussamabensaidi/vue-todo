<template>
  <li class="task-item">
    <div class="task-content">
      <h3 class="task-title">{{ task.titre }}</h3>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.task-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f9f9f9;
}

.task-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
  color: #222;
}

.task-description {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
}
</style>
