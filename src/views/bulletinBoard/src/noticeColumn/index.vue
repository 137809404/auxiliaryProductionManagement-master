<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px">
      <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      <h2 style="margin-top: 23px; margin-left: 5px">通知栏</h2>
      <el-form :inline="true"  class="demo-form-inline" style="margin-left: 50px; margin-top: 20px">
        <el-form-item label="时间范围：">
          <div class="block">
            <el-date-picker
              v-model="range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="搜索通知标题、通知内容" prefix-icon="el-icon-search" v-model="searchInfo"> </el-input>
        </el-form-item>
        <el-button class="el-blue-button" @click="getNotices"><i class="el-icon-search"></i> &nbsp;查询</el-button>
        <el-button class="el-blue-button" @click="goview('新增通知')"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        <el-button class="el-blue-button"><i class="el-icon-refresh-right"></i>&nbsp;重置</el-button>
      </el-form>
    </el-row>
    <el-table
      :data="notices"
      stripe
      border
      style="width: 100%">
      <el-table-column type="index" label="序号" width="150" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
      <el-table-column prop="content" label="发布内容" align="center"></el-table-column>
      <el-table-column prop="date" label="发布时间" width="250" align="center"></el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button class="el-blue-button" size="mini" @click="goViewWithQuery('查看通知', scope.row.id)">查看</el-button>
          <el-button class="el-blue-button" size="mini" @click="goViewWithQuery('编辑通知', scope.row.id)">修改</el-button>
          <el-button class="el-blue-button" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      range: ['', ''],
      searchInfo: '',
      notices: [{
        id: '1',
        title: 'XXXXXXXXXXXXX',
        content: 'XXXXXXXXXXXXXXXXXX',
        date: 'XXX'
      }]
    }
  },
  methods: {
    goback: function () {
      this.$router.push('/').catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goViewWithQuery (name, data) {
      console.log('请求' + data + '通知')
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    getNotices: function () {
      console.log('开始日期' + this.range[0] + '截止日期' + this.range[1])
      this.$axios.get('/bulletin/shownotifications', {
        params: {
          endtime: this.range[1],
          starttime: this.range[0]
          // searchInfo: this.searchInfo
        }
      })
        .then((response) => {
          console.log(response.data)// 请求的返回体
          this.notices = response.data.data
        })
        .catch((error) => {
          console.log(error)// 异常
        })
    },
    handleDelete (index, row) {
      this.$axios.get('/bulletin/deletenotification', {
        params: {
          id: row.id
        }
      })
        .then((response) => {
          console.log(response.data)// 请求的返回体
          this.getNotices()
        })
        .catch((error) => {
          console.log(error)// 异常
        })
    },
    dateRangeMonitor: function (startDate, endDate) {
      this.startDate = startDate
      this.endDate = endDate
    }
  }
}
</script>

<style scoped>

</style>
