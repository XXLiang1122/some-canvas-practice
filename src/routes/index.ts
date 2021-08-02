import { createRouter, createWebHashHistory } from 'vue-router'

const Demo1 = () => import('@/components/demo1/Index.vue')
const Demo2 = () => import('@/components/demo2/Index.vue')
const Demo3 = () => import('@/components/demo3/Index.vue')
const Demo4 = () => import('@/components/demo4/Index.vue')
const Demo5 = () => import('@/components/demo5/Index.vue')
const Demo6 = () => import('@/components/demo6/Index.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'Demo1'
      }
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/demo2',
      name: 'Demo2',
      component: Demo2,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/demo3',
      name: 'Demo3',
      component: Demo3,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/demo4',
      name: 'Demo4',
      component: Demo4,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/demo5',
      name: 'Demo5',
      component: Demo5,
      meta: {
        layout: 'custom'
      }
    },
    {
      path: '/demo6',
      name: 'Demo6',
      component: Demo6,
      meta: {
        layout: 'default'
      }
    }
  ]
})

export default router