// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/Tasks.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/views/Notifications.vue')
  },
  {
  path: '/login',
  name: 'Login',
  component: () => import('@/components/Auth/Login.vue')
},
{
  path: '/register',
  name: 'Register',
  component: () => import('@/components/Auth/Register.vue')
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token'); 
  const isAuthenticated = !!token;

  if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router