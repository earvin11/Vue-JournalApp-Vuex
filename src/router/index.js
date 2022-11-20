import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import authLayoutRouter from '@/modules/auth/router'
import dayBookRouter from '@/modules/daybook/router'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/auth',
    // todo lo que este en el router del modulo auth, su ruta principal y rutas hijas
    ...authLayoutRouter
  },
  {
    path: '/daybook',
    beforeEnter: [ isAuthenticatedGuard ],
    //todo lo que este en el router del modulo dayBook
    ...dayBookRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
