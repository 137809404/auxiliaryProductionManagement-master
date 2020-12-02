<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
<!--    <hello-world></hello-world>-->
    <speechrec></speechrec>
  </div>
</template>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
  }
</style>
<script>
// import HelloWorld from './components/HelloWorld'
import speechrec from '@/components/speechrec'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    // HelloWorld,
    speechrec
  },
  data () {
    return {
      isRouterAlive: true,
      isVoice: false,
      recorder: {},
      audio_context: {},
      baiduToken: ''
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () {
  }
}
</script>
