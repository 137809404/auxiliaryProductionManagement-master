import Layout from '@/views/layout'
const routerMap =
  {
    path: '/bulletinBoard',
    redirect: '/bulletinBoard/workReminder',
    name: '公告栏',
    component: Layout,
    meta: { active: false, isFold: true },
    children: [
      {
        path: 'workReminder',
        name: '工作提醒',
        component: () => import('@/views/bulletinBoard/src/workReminder'),
        meta: { active: false }
      },
      {
        path: 'workReminder/addWork',
        name: '新增工作提醒',
        component: () => import('@/views/bulletinBoard/src/workReminder/addWork'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'workReminder/showWork',
        name: '查看工作提醒',
        component: () => import('@/views/bulletinBoard/src/workReminder/showWork'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'noticeColumn',
        name: '通知栏',
        component: () => import('@/views/bulletinBoard/src/noticeColumn'),
        meta: { active: false }
      },
      {
        path: 'noticeColumn/addNotice',
        name: '新增通知',
        component: () => import('@/views/bulletinBoard/src/noticeColumn/addNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'noticeColumn/showNotice',
        name: '查看通知',
        component: () => import('@/views/bulletinBoard/src/noticeColumn/showNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'noticeColumn/editNotice',
        name: '编辑通知',
        component: () => import('@/views/bulletinBoard/src/noticeColumn/editNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'securityColumn',
        name: '安全专栏',
        component: () => import('@/views/bulletinBoard/src/securityColumn'),
        meta: { active: false }
      },
      {
        path: 'securityColumn/addSecurityNotice',
        name: '新增安全通知',
        component: () => import('@/views/bulletinBoard/src/securityColumn/addSecurityNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'securityColumn/showSecurityNotice',
        name: '查看安全通知',
        component: () => import('@/views/bulletinBoard/src/securityColumn/showSecurityNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'securityColumn/editSecurityNotice',
        name: '编辑安全通知',
        component: () => import('@/views/bulletinBoard/src/securityColumn/editSecurityNotice'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'windFieldGraph',
        name: '风场一次系统图',
        component: () => import('@/views/bulletinBoard/src/windFieldGraph'),
        meta: { active: false }
      },
      {
        path: 'windFieldGraph/addFarm',
        name: '新增风电场系统图',
        component: () => import('@/views/bulletinBoard/src/windFieldGraph/addFarm'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'windFieldGraph/showFarm',
        name: '查看风电场系统图',
        component: () => import('@/views/bulletinBoard/src/windFieldGraph/showFarm'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'windFieldGraph/editFarm',
        name: '编辑风电场系统图',
        component: () => import('@/views/bulletinBoard/src/windFieldGraph/editFarm'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'classManagement',
        name: '班组管理',
        component: () => import('@/views/bulletinBoard/src/classManagement'),
        meta: { active: false }
      },
      {
        path: 'shiftManagement',
        name: '值班管理',
        component: () => import('@/views/bulletinBoard/src/shiftManagement'),
        meta: { active: false }
      },
      {
        path: 'staffDemeanor',
        name: '员工风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor'),
        meta: { active: false }
      },
      {
        path: 'movingDocument',
        name: '移动文件柜',
        component: () => import('@/views/bulletinBoard/src/movingDocument'),
        meta: { active: false }
      },
      {
        path: 'staffDemeanor/editDemeanor',
        name: '编辑风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor/editDemeanor'),
        meta: { active: false }
      }
    ]
  }
export default routerMap
