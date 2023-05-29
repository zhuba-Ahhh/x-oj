import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/NavBarView/HomeView/index.vue';
import bingImgView from '@/views/others/bingImgView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/problem',
      name: 'problem',
      component: () => import('@/views/others/newsView.vue')
    },
    {
      path: '/bing',
      name: 'bing',
      component: bingImgView
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/others/newsView.vue')
    },
    {
      path: '/404',
      name: 'PageNotExist',
      component: () => import('@/views/notFoundView.vue')
    },
    {
      path: '/:catchAll(.*)', // 不识别的path自动匹配404
      name: 'notFound',
      // redirect: '/404',
      component: () => import('@/views/notFoundView.vue')
    },
  ]
})

export default router
