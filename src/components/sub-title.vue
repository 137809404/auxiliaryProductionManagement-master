<template>
  <div class="sub-title">
    <span>{{subtitle}}</span>
    <el-button type="text" @click="goback" style="float: right; margin-top: -8px"><i class="el-icon-close" style="color: white"></i></el-button>
  </div>
</template>

<script>
export default {
  props: ['subtitle'],
  name: 'sub-title'
}
</script>

<style scoped>

</style>
