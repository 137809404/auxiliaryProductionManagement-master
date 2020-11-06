<template>
  <span class="clock-container">
    <flip-item :total="2" :current="timeArr[0]"/>
    <flip-item :total="9" :current="timeArr[1]"/>
    <div class="colon"></div>
    <flip-item :total="5" :current="timeArr[2]"/>
    <flip-item :total="9" :current="timeArr[3]"/>
  </span>
</template>
<script>
import FlipItem from './flipItem.vue'
import { getTimeArr } from './utils'
export default {
  components: {
    FlipItem
  },
  data () {
    return {
      timeArr: getTimeArr()
    }
  },
  mounted () {
    this.startTimer()
  },
  beforeDestroy () {
    this.stopTimer()
  },
  methods: {
    startTimer () {
      this.stopTimer()
      this.timer = setTimeout(() => {
        this.timeArr = getTimeArr()
        this.startTimer()
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    }
  }
}
</script>
<style lang='scss' scoped>
.clock-container {
  display: inline-flex;
  align-items: center;
  width: 220px;
  padding-top: 12px;
}
.colon {
  height: 35px;
  padding: 0 2px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  &::after,
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    }
}
</style>
