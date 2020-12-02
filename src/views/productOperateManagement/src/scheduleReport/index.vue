<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <h2 class="subtitle" style="margin-top: 20px; margin-left: 5px"> 计划报表 </h2>
    </el-row>
    <el-row style="height: auto;margin: 0 10px">
      <iframe scrolling="no" frameborder="0" id="reportFrame" :src="src"></iframe>
    </el-row>
  </div>
</template>

<script>
import { reportURL } from '@/config/baseConfig'

export default {
  name: 'index',
  data () {
    return {
      src: reportURL + 'scheduleReport.cpt' + '&__bypagesize__=false'
    }
  },
  methods: {

  },
  mounted () {
    const oIframe = document.getElementById('reportFrame')
    const deviceWidth = Number(document.documentElement.clientWidth)
    const deviceHeight = Number(document.documentElement.clientHeight)
    oIframe.style.width = (deviceWidth - 200) / deviceWidth * 100 + 'vw' // 数字是页面布局宽度差值
    oIframe.style.height = (deviceHeight - 200) / deviceHeight * 100 + 'vh' // 数字是页面布局高度差
  }
}
</script>

<style scoped>

</style>
