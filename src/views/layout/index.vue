<template>
  <div class="container">
    <div class="aside">
      <page-aside/>
    </div>
    <div class="sub-container">
      <div class="header">
        <page-header/>
      </div>
      <div class="main-container">
        <div class="main">
          <page-main/>
        </div>
      </div>
    </div>
  </div>
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
  computed: {
    flag () {
      return true
    }
  }
}
</script>

<style lang="scss">
  .container {
    display: flex;
  }
  .aside {
    width: 6%;
    background-color: RGB(25, 26, 44);
  }
  .sub-container {
    width: 94%;
    height: 100vh;
    background-color: RGB(25, 26, 44);
  }
  .header {
    width: 100%;
    height: 10%;
    margin-right: 0;
  }
  .main-container {
    width: 100%;
    height: 90%;
  }
  .main {
    width: 99%;
    height: 100%;
    background-color: RGB(35,39,61);
  }
</style>
