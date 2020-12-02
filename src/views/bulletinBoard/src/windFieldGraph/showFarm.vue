<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; padding-top: 10px; margin-bottom: 9px">
      <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
      <h2 class="subtitle" style="margin-top: 20px; margin-left: 5px">{{this.farmName}}一次系统图</h2>
      <el-col :span="16"></el-col>
      <el-col :span="2">
        <div style="padding: 20px 0px 15px 0px">
          <el-button class="el-blue-button" @click="handleEdit()"><i class="el-icon-document"></i>修改</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row :gutter="20" style="margin-top: 5vh">
      <el-col :span="18" :offset="5">
        <el-image
          style="width:90vh; height: 65vh;margin-bottom: 30px"
          :src="imgUrl"
          fit="fill"></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/network/request'
import { baseURL } from '@/config/baseConfig'

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
    request({
      method: 'get',
      url: '/bulletin/getshowcase',
      params: {
        id: this.farmId
      }
    }).then(res => {
      // console.log(res)
      that.farmName = res.data.data.name
      that.imgUrl = baseURL + '/' + res.data.data.imgurl
    }).catch((error) => {
      console.log(error)// 异常
    })
  },
  methods: {
    handleEdit () {
      console.log(this.farmId)
      this.goViewWithQuery('编辑风电场系统图', this.farmId)
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
