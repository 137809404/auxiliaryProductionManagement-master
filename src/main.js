import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/cover-element.scss'
import './assets/scss/common.scss'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import JsonExcel from 'vue-json-excel'
import axios from 'axios'
import routerUtil from './utils/routerUtil'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://202.199.6.45:8080'
// 我们的 'http://202.199.6.45:8080'
// 越能的 'https://172.19.220.6:8080'

// 全局注册chart组件
Vue.component('chart', ECharts)
// import echarts from 'echarts'
Vue.use(ElementUI)
Vue.config.productionTip = false

routerUtil(router)

Vue.component('downloadExcel', JsonExcel)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
