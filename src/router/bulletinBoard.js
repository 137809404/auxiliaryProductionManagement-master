import Layout from '@/views/layout'
const routerMap =
  {
    path: '/bulletinBoard',
    redirect: '/bulletinBoard/home',
    name: '公告栏',
    component: Layout,
    meta: { active: false, isFold: true },
    children: [
      {
        path: 'home',
        name: '公告栏首页',
        component: () => import('@/views/bulletinBoard/src/home'),
        meta: { active: false }
      },
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
        name: '集控人员组织架构',
        component: () => import('@/views/bulletinBoard/src/classManagement'),
        meta: { active: false }
      },
      {
        path: 'classManagement/editStaff',
        name: '个人资料修改',
        component: () => import('@/views/bulletinBoard/src/classManagement/editStaff'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'shiftManagement',
        name: '值班管理',
        component: () => import('@/views/bulletinBoard/src/shiftManagement'),
        meta: { active: false }
      },
      {
        path: 'shiftManagement/showDuty',
        name: '查看值班表',
        component: () => import('@/views/bulletinBoard/src/shiftManagement/showDuty'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'staffDemeanor',
        name: '员工风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor/index'),
        meta: { active: false }
      },
      {
        path: 'staffDemeanor/viewDemeanor',
        name: '查看风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor/viewDemeanor'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'staffDemeanor/addDemeanor',
        name: '新增风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor/addDemeanor'),
        meta: { active: false },
        hidden: true
      },
      {
        path: 'staffDemeanor/editDemeanor',
        name: '修改风采',
        component: () => import('@/views/bulletinBoard/src/staffDemeanor/editDemeanor'),
        meta: { active: false },
        hidden: true
      }
    ]
  }
export default routerMap
