// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Layout from '@/views/layout'
// import bulletinBoard from './bulletinBoard'
// import productOperateManagement from './productOperateManagement'
// Vue.use(VueRouter)
// const routes = [
//   {
//     path: '/',
//     redirect: '/home',
//     hidden: true
//   },
//   {
//     path: '/home',
//     name: '首页',
//     component: Layout,
//     meta: { active: false },
//     children: [
//       {
//         path: '/home',
//         name: '首页',
//         component: () => import('@/views/home'),
//         meta: { active: false }
//       }
//     ]
//   },
//   bulletinBoard,
//   productOperateManagement
// ]
//
// const router = new VueRouter({
//   routes
// })
//
// export default router
//
// export { routes }
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import bulletinBoard from './bulletinBoard'
import productOperateManagement from './productOperateManagement'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    component: Layout,
    redirect: '/home',
    meta: { active: false },
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/home'),
        meta: { active: false }
      }
    ]
  },
  bulletinBoard,
  productOperateManagement
]

const router = new VueRouter({
  routes
})

export default router

export { routes }
