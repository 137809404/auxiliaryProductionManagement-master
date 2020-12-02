<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="10">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">风电场一次系统图</h2>
      </el-col>
      <el-col :span="12">
        <el-button-group style="margin-top: 20px">
          <el-button class="el-blue-button" @click="showLandFarms" :autofocus=true>陆上风电场</el-button>
          <el-button class="el-blue-button" @click="showSeaFarms">海上风电场</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="2">
        <div style="padding: 20px 33px 15px 0">
          <el-button  class="el-blue-button" @click="goview('新增风电场系统图')" style="float: right"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex" justify="space-around" :gutter="20">
      <el-col :span="20">
        <el-row v-if="activeName==='landFarms'" style="height: 72vh;overflow-y: auto;width: 80vw">
            <el-col :span="8" v-for="farm in landFarms" :key="farm.id">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 14px;">
                  <span @click="clickFarm(farm.id)" style="color:#8c939d;">{{farm.name}}</span>
                </div>
                <el-image
                  style="width: 20vw; height: 27vh"
                  fit="fill"
                  :src="URL + '/'+ farm.imgs.imgurl"
                  class="image"></el-image>
              </el-card>
            </el-col>
        </el-row>
        <el-row v-if="activeName==='seaFarms'" style="height: 72vh;overflow-y: auto;width: 80vw">
          <el-col :span="8" v-for="farm in seaFarms" :key="farm.id">
            <el-card :body-style="{ padding: '0px' }" >
              <div style="padding: 14px;">
                <span @click="clickFarm(farm.id)">{{farm.name}}</span>
              </div>
              <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
              <el-image
                style="width: 20vw; height: 27vh"
                fit="fill"
                :src="URL + '/' + farm.imgs.imgurl"
                class="image"></el-image>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '../../../../network/request'
import { baseURL } from '@/config/baseConfig'
export default {
  name: 'index',
  data () {
    return {
      URL: '',
      activeName: 'landFarms',
      landFarms: [],
      seaFarms: ['外罗一期风电场']
    }
  },
  created () {
    this.URL = baseURL
    var that = this
    request({
      method: 'get',
      url: '/bulletin/showplantshowcase',
      params: {
        type: '1'
      }
    }).then(res => {
      // console.log(res)
      // console.log(res.data.data)
      that.landFarms = res.data.data
      // console.log(that.landFarms)
      // eslint-disable-next-line handle-callback-err
    }).catch((error) => {
      console.log(error)// 异常
    })
    request({
      method: 'get',
      url: '/bulletin/showplantshowcase',
      params: {
        type: '2'
      }
    }).then(res => {
      // console.log(res.data.data)
      that.seaFarms = res.data.data
      // console.log(that.seaFarms)
    }).catch((error) => {
      console.log(error)// 异常
    })
  },
  methods: {
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
    showLandFarms () {
      this.activeName = 'landFarms'
    },
    showSeaFarms () {
      this.activeName = 'seaFarms'
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    clickFarm (farmId) {
      console.log(farmId)
      this.goViewWithQuery('查看风电场系统图', farmId)
    }
  }
}
</script>

<style scoped>
  >>> .el-card {
    width: 22vw;
    border: none;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
    margin-top: 5px;
  }
  >>>.el-blue-button:hover,.el-blue-button:focus {
    background-color: rgb(0, 202, 253)!important;
    color: white!important;
  }
</style>
