import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default/index.vue'

export default [
  {
    path: '/_play',
    component: Layout,
    meta: {
      title: '游乐',
      alwaysShow: true,
      icon: 'VideoPlay',
      header: true,
    },
    redirect: '/_play/test1',
    children: [
      {
        path: 'test1',
        meta: {
          title: 'test1',
        },
        component: () => import('_v/_play/test1/index.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
