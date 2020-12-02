<template>
  <div class="container">
    <div class="aside">
      <page-aside/>
    </div>
    <div class="sub-container">
      <div class="sub-sub-container">
        <div class="layout-header">
          <page-header/>
        </div>
        <div class="main">
          <page-main/>
        </div>
      </div>
    </div>
  </div>
<!--  <div class="test"></div>-->
</template>

<script>
import pageMain from './components/pageMain'
import pageHeader from './components/pageHeader'
import pageAside from './components/pageAside'
export default {
  components: {
    pageMain,
    pageHeader,
    pageAside
  },
  created () {
  },
  methods: {
  },
  computed: {
    flag () {
      return true
    }
  }
}
</script>

<style lang="scss">
  .test {
    width: 100vw;
    height: 100vh;
    background-color: #409EFF;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    padding: 0;
    color: #e5e9f2;
  }
  .aside {
    width: 5%;
    background-color: RGB(25, 26, 44);
  }
  .sub-container {
    width: 95%;
    height: 100%;
    background-color: RGB(25, 26, 44);
  }
  .sub-sub-container {
    width: 99%;
    height: 99%;
    background-color: RGB(35,39,61);
  }
  .layout-header {
    height: 8vh;
    background-color: RGB(25, 26, 44);
  }
</style>
