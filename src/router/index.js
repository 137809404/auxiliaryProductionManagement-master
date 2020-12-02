import Vue from 'vue'
import VueRouter from 'vue-router'
import bulletinBoard from './bulletinBoard'
import productOperateManagement from './productOperateManagement'
import notice from './notice'
import Layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '欢迎使用辅助管理系统',
    component: () => import('@/views/login'),
    meta: { active: false },
    hidden: true
  },
  productOperateManagement,
  bulletinBoard,
  {
    path: '/userManagement',
    redirect: '/userManagement/home',
    name: '用户管理',
    component: Layout,
    meta: { active: false, isFold: true, permission: true },
    children: [
      {
        path: 'home',
        name: '用户管理首页',
        component: () => import('@/views/userManagement'),
        meta: { active: false }
      }, {
        path: 'log',
        name: '操作日志',
        component: () => import('@/views/userManagement/logManagement'),
        meta: { active: false }
      }
    ]
  },
  notice
]

const router = new VueRouter({
  routes
})

export default router

export { routes }
