<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="4">
        <h2 style="margin-top: 23px; margin-left: 5px">风电场一次系统图</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" :gutter="20">
      <el-col :span="20">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="陆上风电场" name="first">
            <el-row>
              <el-col :span="8" v-for="farm in landFarms" :key="farm.id">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px;">
                    <span @click="clickFarm(farm.id)">{{farm.name}}</span>
                  </div>
                  <!--<img :src="'http://202.199.6.45:8080' + farm.imgurl" class="image">-->
                  <el-image
                    style="width: 400px; height: 300px"
                    fit="contain"
                    :src="'http://202.199.6.45:8080/' + farm.imgs.imgurl"
                    class="image"></el-image>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="海上风电场" name="second">
            <el-row>
              <el-col :span="8" v-for="farm in seaFarms" :key="farm.id">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px;">
                    <span @click="clickFarm(farm.id)">{{farm.name}}</span>
                  </div>
                  <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                  <el-image
                    style="width: 400px; height: 300px"
                    fit="contain"
                    :src="'http://202.199.6.45:8080/' + farm.imgs.imgurl"
                    class="image"></el-image>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="1">
        <el-button class="el-blue-button" @click="goview('新增风电场系统图')" style="height: 40px"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
      </el-col>
    </el-row>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activeName: 'first',
      landFarms: [],
      seaFarms: ['外罗一期风电场']
    }
  },
  created () {
    var that = this
    this.$axios.get('/bulletin/showplantshowcase?type=1').then(res => {
      // console.log(res)
      // console.log(res.data.data)
      that.landFarms = res.data.data
      // console.log(that.landFarms)
      // eslint-disable-next-line handle-callback-err
    }, error => {
      console.log('error')
    })
    this.$axios.get('/bulletin/showplantshowcase?type=2').then(res => {
      // console.log(res.data.data)
      that.seaFarms = res.data.data
      // console.log(that.seaFarms)
      // eslint-disable-next-line handle-callback-err
    }, error => {
      console.log('error')
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
    handleClick (tab, event) {
      console.log(tab, event)
    },
    clickFarm (FarmId) {
      console.log(FarmId)
      this.goViewWithQuery('查看风电场系统图', FarmId)
    }
  }
}
</script>

<style scoped>

</style>
