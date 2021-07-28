import { createRouter, createWebHashHistory } from 'vue-router'

const Demo1 = () => import('@/components/demo1/Index.vue')
const Demo2 = () => import('@/components/demo2/Index.vue')

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
    }
  ]
})

export default router