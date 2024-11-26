import { createRouter, createWebHistory } from 'vue-router'
import ShowCode from '../views/ShowCodeView.vue'
import CreateCode from '../views/CreateCodeView.vue'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/code',
      name: 'code',
      component: ShowCode,
    },
    {
      path: '/postcode',
      name: 'CreateCode',
      component: CreateCode,
    },

  ],
})

export default router
