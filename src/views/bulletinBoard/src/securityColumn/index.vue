<template>
  <div>
    <el-row type="flex" :gutter="0" style="padding-left: 20px">
      <el-col :span="2">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">安全专栏</h2>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true"  class="demo-form-inline" style="margin-left: 5vw; margin-top: 20px">
          <el-form-item label="时间范围：">
            <div class="block">
              <el-date-picker
                style="width: 18vw"
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
          <el-form-item style="margin-left: 2vw">
            <el-input style="width: 15vw" placeholder="搜索通知标题、通知内容" prefix-icon="el-icon-search" v-model="searchInfo"> </el-input>
          </el-form-item>
          <el-button class="el-blue-button" @click="getSecurityNotices"><i class="el-icon-search"></i> &nbsp;查询</el-button>
          <el-button class="el-blue-button" @click="reload"><i class="el-icon-refresh-right"></i>&nbsp;重置</el-button>
          <el-button class="el-blue-button" style="float: right;margin-right: 33px" @click="goview('新增安全通知')"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </el-form>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row style="margin: 0 5vw">
      <el-table
        :data="securityNotices"
        style="width: 100%"
        max-height="768">
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
        <el-table-column prop="content" label="发布内容" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="date" label="发布时间" width="250" align="center"></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button class="el-green-button" @click="goViewWithQuery('查看安全通知', scope.row.id)">查看</el-button>
            <el-button class="el-blue-button" @click="goViewWithQuery('编辑安全通知', scope.row.id)">修改</el-button>
            <el-button class="el-red-button" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px;float: right"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="currentPage"
        :total=total>
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'
import request from '@/network/request'

export default {
  name: 'index',
  data () {
    return {
      range: ['', ''],
      searchInfo: '',
      securityNotices: [],
      total: 0,
      currentPage: 1,
      pagesize: 5
    }
  },
  created () {
    this.getSecurityNotices('1970-01-01', '2100-12-31')
  },
  inject: ['reload'],
  methods: {
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
    getSecurityNotices: function (startTime, endTime) {
      if (isNaN(startTime)) {
        startTime = '1970-01-01'
        endTime = '2100-12-31'
      }
      console.log('开始日期' + startTime + '截止日期' + endTime)
      request({
        method: 'get',
        url: '/bulletin/showsafetycolumns',
        params: {
          endtime: endTime,
          starttime: startTime,
          keyword: this.searchInfo,
          pagesize: this.pagesize,
          pagenum: this.currentPage
        }
      }).then(res => {
        console.log(res)
        this.securityNotices = res.data.data.result
        this.total = res.data.data.totalrecords
        // this.reload()
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    handleDelete (index, row) {
      request({
        method: 'get',
        url: '/bulletin/deletesafetycolumn',
        params: {
          id: row.id
        }
      }).then((res) => {
        this.reload()
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    handleCurrentChange (val) {
      console.log('val' + val)
      this.currentPage = val
      if (this.range[0] !== '' && this.range[1] !== '') {
        this.getSecurityNotices(this.range[0], this.range[1])
      } else {
        this.getSecurityNotices('1970-01-01', '2100-12-31')
      }
    }
  }
}
</script>

<style scoped>
  >>>.el-pagination__total, >>>.el-pagination__jump{
    color: white;
  }
  >>> .el-pagination span {
    font-size: 18px;
  }
  >>>.number{
    color: #dddddd;
  }
</style>
