import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Contagem from '../views/Contagem.vue'

const routes = [
  {
    path: '/',
    name: 'Contagem',
    component: Contagem
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
