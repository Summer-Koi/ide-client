import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/n',
    component: () => import('../components/Nothing.vue')
  },
  {
    path: '/h',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/',
    component: () => import('../components/HelloWorld.vue')
  }
]

const router = createRouter({
  routes:routes,
  history:createWebHistory()
})

export default router