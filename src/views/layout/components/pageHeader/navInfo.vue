<template>
  <nav>
      <el-col>
        <img src="@/assets/img/fd.png">
      </el-col>
      <el-col>
        <img src="@/assets/img/gf.png">
      </el-col>
      <el-col>
        <img src="@/assets/img/syz.png">
      </el-col>
      <el-col>
        <img src="@/assets/img/xd.png">
      </el-col>
      <el-col>
        <img src="@/assets/img/xd.png">
      </el-col>
      <el-col>
        <img src="@/assets/img/xd.png">
      </el-col>
      <el-col>
        <FlipClock/>
      </el-col>
      <el-col>
        <img src="@/assets/img/head.png">
        <span>
          <div>admin</div>
          <div style="background-color: aqua; color: white">管理员</div>
        </span>
      </el-col>
  </nav>
</template>

<script>
import dayjs from 'dayjs'
import FlipClock from './flipClock'
export default {
  name: 'navInfo',
  components: {
    FlipClock
  },
  data () {
    return {
      nowDate: dayjs().format('YYYY-MM-DD'),
      nowTime: dayjs().format('HH:mm:ss')
    }
  },
  methods: {
    startTimer () {
      const timer = setInterval(() => {
        this.nowTime = dayjs().format('HH:mm:ss')
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  },
  created () {
    this.startTimer()
  }
}
</script>

<style lang="scss" scoped>
</style>
