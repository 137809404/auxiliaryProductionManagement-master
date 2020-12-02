import Layout from '@/views/layout'
import main from '@/views/layout/components/pageMain'
const routerMap = {
  path: '/productOperateManagement',
  redirect: '/productOperateManagement/home',
  name: '生产运行管理',
  component: Layout,
  meta: { active: false, isFold: true },
  children: [
    {
      path: 'home',
      name: '生产运行管理首页',
      component: () => import('@/views/productOperateManagement/src/home'),
      meta: { active: false }
    },
    {
      path: 'targetTrendChart',
      name: '指标趋势图',
      component: () => import('@/views/productOperateManagement/src/targetTrendChart'),
      meta: { active: false }
    },
    {
      path: 'scheduleReport',
      name: '计划报表',
      component: () => import('@/views/productOperateManagement/src/scheduleReport'),
      meta: { active: false }
    },
    {
      path: 'productionDailyReport',
      name: '生产日报',
      component: main,
      redirect: 'productOperateManagement/productionDailyReport/dailyWindFarmGeneral',
      meta: { active: false, isFold: true },
      children: [
        {
          path: 'dailyWindFarmGeneral',
          name: '风电场日综合报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/dailyWindFarmGeneral'),
          meta: { active: false }
        },
        {
          path: 'dailyCompanyProduction',
          name: '湛江风电公司生产日报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/dailyCompanyProduction'),
          meta: { active: false }
        },
        {
          path: 'dailyCompanyTime0Power',
          name: '湛江风电公司0点电量报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/dailyCompanyTime0Power'),
          meta: { active: false }
        },
        {
          path: 'dailyWindFarmProductionStatistics',
          name: '风电场主要生产数据统计汇总报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/dailyWindFarmProductionStatistics'),
          meta: { active: false }
        },
        {
          path: 'dailyReport',
          name: '风电日填报',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/dailyReport'),
          meta: { active: false }
        }]
    },
    {
      path: 'productionMonthReport',
      name: '生产月报',
      component: main,
      redirect: 'productOperateManagement/productionMonthReport/windFarmGeneral',
      meta: { active: false },
      children: [
        {
          path: 'monthWindFarmGeneral',
          name: '风电场综合月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmGeneral'),
          meta: { active: false }
        },
        {
          path: 'monthWindFarmDevicesProduction',
          name: '风电场风机发电量月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmDevicesProduction'),
          meta: { active: false }
        },
        {
          path: 'monthWindFarmProductionTarget',
          name: '风电场月生产指标情况报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmProductionTarget'),
          meta: { active: false }
        },
        {
          path: 'monthWindFarmProduction',
          name: '风电场电量月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmProduction'),
          meta: { active: false }
        },
        {
          path: 'monthWindFarmQuick',
          name: '风电场月快报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmQuick'),
          meta: { active: false }
        },
        {
          path: 'monthProductionReportingPlatform',
          name: '广东发电信息上报平台报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthProductionReportingPlatform'),
          meta: { active: false }
        },
        {
          path: 'monthWindFarmProductionStatistics',
          name: '风电场主要生产数据统计汇总月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/monthWindFarmProductionStatistics'),
          meta: { active: false }
        }]
    },
    {
      path: 'productionWeekReport',
      name: '生产周报',
      component: main,
      redirect: 'productOperateManagement/productionWeekReport/windFarmGeneralReport',
      meta: { active: false },
      children: [
        {
          path: 'weekWindFarmGeneralReport',
          name: '生产周报表',
          component: () => import('@/views/productOperateManagement/src/productionWeekReport/weekWindFarmGeneralReport'),
          meta: { active: false }
        }, {
          path: 'weekWindFarmProductionStatistics',
          name: '风电场主要数据统计汇总周报表',
          component: () => import('@/views/productOperateManagement/src/productionWeekReport/weekWindFarmProductionStatistics'),
          meta: { active: false }
        }]
    },
    {
      path: 'freeReport',
      name: '自由报表',
      component: () => import('@/views/productOperateManagement/src/freeReport'),
      meta: { active: false }
    }
  ]
}
export default routerMap
