<template>
  <div>
<!--    <div class="sub-title">-->
<!--      {{farmName}}一次系统图-->
<!--    </div>-->
    <el-row type="flex" :gutter="20" style="padding-left: 20px; padding-top: 10px; margin-bottom: 9px">
      <el-col :span="1">
        <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      </el-col>
      <el-col :span="4">
        <h2 style="margin-top: 12px;margin-left: -25px">{{farmName}}一次系统图</h2>
      </el-col>
    </el-row>
    <el-row :gutter="22">
      <el-col :span="20">
        <el-image
          style="width: 1000px; height: 900px"
          :src="imgUrl"
          fit="contain"></el-image>
      </el-col>
      <el-col :span="2">
        <el-button class="el-blue-button" size="mini" @click="handleEdit()">编辑</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'showFarm',
  data () {
    return {
      farmId: '',
      farmName: '',
      imgUrl: ''
    }
  },
  created () {
    this.farmId = this.$route.query.data
    var that = this
    this.$axios.get('/bulletin/getshowcase?id=' + this.farmId).then(res => {
      // console.log(res)
      that.farmName = res.data.data.name
      that.imgUrl = 'http://202.199.6.45:8080/' + res.data.data.imgurl
      // eslint-disable-next-line handle-callback-err
    }, error => {
      console.log(error)
    })
  },
  methods: {
    handleEdit () {
      console.log(this.farmName)
      this.goViewWithQuery('编辑风电场系统图', this.farmName)
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
</style>
