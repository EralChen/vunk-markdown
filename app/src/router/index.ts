import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/default/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'home',
    },
    meta: {
      display: 0,
    },
  },

  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
          display: 1,
          icon: 'House',
        },
        component: () => import('_v/home/index.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
