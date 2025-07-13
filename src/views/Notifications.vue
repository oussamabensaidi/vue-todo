<!-- src/views/NotificationsView.vue -->
<template>
  <div class="notifications-view">
    <div class="container">
      <h1 class="page-title">Notifications</h1>

      <div class="notifications-container">
        <div class="notification-card">
          <h2>Bienvenue!</h2>
          <p>Vous avez accédé à la page des notifications.</p>
          <p>Ici, vous pourrez voir vos notifications de tâches à venir.</p>
        </div>

        <div class="notification-card">
          <h3>Fonctionnalités à venir</h3>
          <ul>
            <li>Rappels de tâches</li>
            <li>Notifications push</li>
            <li>Alertes de deadline</li>
            <li>Résumés quotidiens</li>
          </ul>
        </div>

        <!-- ✅ Notification de tâche créée -->
        <div v-if="taskCreated" class="notification-card">
          <h3>Nouvelle tâche créée</h3>
          <p>Une nouvelle tâche a été ajoutée avec succès.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'

// // 🔔 Variable de notification (activée lors de la création d'une tâche)
// const taskCreated = ref(false)

// // 🔁 Simule une tâche créée via événement ou sessionStorage
// onMounted(() => {
//   // Exemple : récupérer un indicateur de succès depuis sessionStorage
//   if (sessionStorage.getItem('taskCreated') === 'true') {
//     taskCreated.value = true
//     sessionStorage.removeItem('taskCreated') // Reset après affichage
//   }
// })
import { ref, onMounted } from 'vue'

onMounted(() => {
  if (sessionStorage.getItem('taskCreated') === 'true') {
    taskCreated.value = true
    sessionStorage.removeItem('taskCreated')
  }

  const userId = JSON.parse(localStorage.getItem('user'))?.id
  if (!userId) return

  window.Echo.private(`tasks.${userId}`)
    .listen('TaskCreated', (e) => {
      console.log('✅ Task created event received:', e)
      taskCreated.value = true
    })
})

</script>

<style scoped>
.notifications-view {
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

.notifications-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.notification-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.notification-card h2,
.notification-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.notification-card p {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.notification-card ul {
  color: #4b5563;
  padding-left: 1.5rem;
}

.notification-card li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .notification-card {
    padding: 1.5rem;
  }
}
</style>
