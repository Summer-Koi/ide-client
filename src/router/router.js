import { createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/dashboard/:userid',
    component: () => import('../components/DashBoard.vue'),
    children:[
      {
        path: 'hw',
        component: () => import('../components/HelloWorld.vue')
      },
      {
        path: 'settings',
        component: () => import('../components/UserSettings.vue')
      },
      {
        path: 'projects',
        component: () => import('../components/UserProjects.vue')
      }
    ]
  },
  {
    path: '/n',
    component: () => import('../components/Nothing.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})