<template>
  <div class="block">
    <el-date-picker
      v-model="range"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-mm-dd"
      v-on:change="sendMessage">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'dateRange-selector',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      range: ['', ''],
      startDate: new Date(2020, 9, 10, 8, 40),
      endDate: new Date(2020, 9, 10, 9, 40)
    }
  },
  methods: {
    sendMessage: function () {
      console.log(this.range)
      this.startDate = this.range[0]
      this.endDate = this.range[1]
      console.log('开始时间' + this.startDate)
      this.$emit('dateRangeMonitor', this.startDate, this.endDate)
    }
  }
}
</script>

<style scoped>

</style>
