import Layout from '@/views/layout'
import main from '@/views/layout/components/pageMain'
const routerMap = {
  path: '/productOperateManagement',
  redirect: '/productOperateManagement/targetTrendChart',
  name: '生产运行管理',
  component: Layout,
  meta: { active: false, isFold: true },
  children: [
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
      redirect: 'productOperateManagement/productionDailyReport/windFarmGeneral',
      meta: { active: false, isFold: true },
      children: [
        {
          path: 'windFarmGeneral',
          name: '风电场日综合报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/windFarmGeneral'),
          meta: { active: false }
        },
        {
          path: 'companyProduction',
          name: '湛江风电公司生产日报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/companyProduction'),
          meta: { active: false }
        },
        {
          path: 'companyProduction',
          name: '湛江风电公司0点电量报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/companyTime0Power'),
          meta: { active: false }
        },
        {
          path: 'windFarmProductionStatistics',
          name: '风电场主要生产数据统计汇总报表',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/windFarmProductionStatistics'),
          meta: { active: false }
        },
        {
          path: 'quickProduction',
          name: '风电日填报',
          component: () => import('@/views/productOperateManagement/src/productionDailyReport/quickProduction'),
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
          path: 'windFarmGeneral',
          name: '风电场综合月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmGeneral'),
          meta: { active: false }
        },
        {
          path: 'windFarmDevicesProduction',
          name: '风电场风机发电量月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmDevicesProduction'),
          meta: { active: false }
        },
        {
          path: 'windFarmProductionTarget',
          name: '风电场月生产指标情况报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmProductionTarget'),
          meta: { active: false }
        },
        {
          path: 'windFarmQuick',
          name: '风电场电量月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmProduction'),
          meta: { active: false }
        },
        {
          path: 'windFarmQuick',
          name: '风电场月快报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmQuick'),
          meta: { active: false }
        },
        {
          path: 'ProductionReportingPlatform',
          name: '广东发电信息上报平台报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/ProductionReportingPlatform'),
          meta: { active: false }
        },
        {
          path: 'MainTarget',
          name: '风电场主要生产数据统计汇总月报表',
          component: () => import('@/views/productOperateManagement/src/productionMonthReport/windFarmProductionStatistics'),
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
          path: 'windFarmGeneralReport',
          name: '生产周报表',
          component: () => import('@/views/productOperateManagement/src/productionWeekReport/windFarmGeneralReport'),
          meta: { active: false }
        }, {
          path: 'windFarmGeneralReport',
          name: '风电场主要数据统计汇总周报表',
          component: () => import('@/views/productOperateManagement/src/productionWeekReport/windFarmProductionStatistics'),
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
