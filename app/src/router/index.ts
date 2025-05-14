import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/default/index.vue'
import _PLAY from './_play'
import _TEMPLATE_PAGE from './_template-page'
import _UI_CONFIG from './_ui-config'

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

    meta: {
      display: 1,
      header: true,
      title: '首页',
      icon: 'House',
    },
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

  {
    path: '/login',
    meta: {
      display: 0,
    },
    component: () => import('_v/_login/index.vue'),
  },

  {
    path: '/login/:platform',
    props: true,
    meta: {
      display: 0,
    },
    component: () => import('_v/_login/index.vue'),
  },
  ..._UI_CONFIG,
  ..._TEMPLATE_PAGE,
  ..._PLAY,
]

const router = createRouter({
  history: createWebHashHistory(`${import.meta.env.VITE_BASE_URL}/`),
  routes,
})

export default router
