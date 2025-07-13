<template>
  <button 
    @click="showConfirmation = true"
    class="logout-button"
    :disabled="loading"
  >
    {{ loading ? 'Logging out...' : 'Logout' }}
  </button>

  <div v-if="showConfirmation" class="confirmation-dialog">
    <p>Are you sure you want to logout?</p>
    <div class="dialog-actions">
      <button @click="confirmLogout" class="confirm-button" :disabled="loading">
        {{ loading ? '...' : 'Yes, Logout' }}
      </button>
      <button @click="showConfirmation = false" class="cancel-button" :disabled="loading">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';  // Corrected path
import { useTaskStore } from '@/store/tasks'; // Ensure same path pattern

const router = useRouter();
const authStore = useAuthStore?.(); // Safe access
const taskStore = useTaskStore?.(); // Safe access
const showConfirmation = ref(false);
const loading = ref(false);

// Debug store availability
onMounted(() => {
  if (!authStore) {
    console.error('AuthStore not available! Check your Pinia setup and import paths.');
  }
});

const confirmLogout = async () => {
  if (!authStore) return;
  
  loading.value = true;
  showConfirmation.value = false;
  
  try {
    await authStore.logout();
    taskStore?.$reset?.(); // Safe access
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Your existing styles are fine */
</style>