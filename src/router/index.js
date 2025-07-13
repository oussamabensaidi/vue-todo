// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'  // Fixed import path

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/Tasks.vue'),
    meta: { requiresAuth: true }  // Add meta for auth protection
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/Notifications.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Auth/Login.vue'),
    meta: { guestOnly: true }  // Add meta for guest-only routes
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Auth/Register.vue'),
    meta: { guestOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
    return
  }
  
  // Check if route is guest-only (like login/register)
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'Home' })
    return
  }
  
  next()
})

export default router