<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">查看工作提醒</h2>
      </el-col>
      <el-col :span="5">
        <el-button-group style="margin-top: 20px">
          <el-button class="el-blue-button" @click="showFixReminders">固定</el-button>
          <el-button class="el-blue-button" @click="showTempReminders">临时</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="15">
        <el-form v-if="activeName==='fixReminders'" :inline="true"  class="demo-form-inline" style="margin-top: 20px">
          <el-form-item label="查询年份：">
            <div class="block">
              <el-date-picker
                v-model="tempYear"
                align="right"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-button class="el-blue-button" @click="getFixReminders"><i class="el-icon-search"></i> &nbsp;查询</el-button>
        </el-form>
        <el-form v-if="activeName==='tempReminders'" :inline="true"  class="demo-form-inline" style="margin-top: 20px">
          <el-form-item label="查询月份：">
            <div class="block">
              <el-date-picker
                v-model="tempMonth"
                align="right"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-button class="el-blue-button" @click="getTempReminders"><i class="el-icon-search"></i> &nbsp;查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="2">
        <div style="padding: 20px 33px 15px 0">
          <el-button class="el-blue-button" @click="goview('新增工作提醒')" style="float: right"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row style="margin: 0 5vw">
      <!-- v-if="activeName === 'fixReminder'" 防抖动-->
      <el-table
        v-show="activeName === 'fixReminders'"
        :data="fixReminders">
        <el-table-column type="index" :index="indexMethod" label="序号" width="150" align="center"></el-table-column>
        <el-table-column prop="title" label="计划月份"  align="center"></el-table-column>
        <el-table-column prop="editor" label="编制人" width="500" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button v-if="activeName === 'fixReminders'" class="el-blue-button" size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="activeName === 'fixReminders'"
        style="margin-top: 10px;float: right"
        @current-change="currentf_change"
        layout="total, prev, pager, next, jumper"
        :total=fixRemPaginate.total
        :page-size="fixRemPaginate.pageSize">
      </el-pagination>
<!--      <div class="pagination" v-show="activeName === 'fixReminders'">-->
<!--        <el-pagination-->
<!--          background-->
<!--          layout="total, prev, pager, next, jumper"-->
<!--          :total="fixRemPaginate.total"-->
<!--          :current-page.sync="currentPage"-->
<!--          @current-change="currentf_change">-->
<!--        </el-pagination>-->
<!--      </div>-->
      <el-table
        v-show="activeName === 'tempReminders'"
       :data="tempReminders">
       <el-table-column prop="date" label="提醒时间" width="230px" align="center"></el-table-column>
       <el-table-column prop="task_type" label="任务类型" width="150px" align="center" ></el-table-column>
       <el-table-column prop="business" label="任务内容" align="center"></el-table-column>
       <el-table-column prop="who_to_notice" label="提醒对象" width="150px" align="center"></el-table-column>
       <el-table-column prop="checked_MEM_NAMES" label="确认人" width="100px"  align="center"></el-table-column>
       <el-table-column width="100px" label="操作" align="center">
         <template slot-scope="scope">
           <el-button class="el-red-button" size="mini" @click="handleDelete(scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
      <el-pagination
        v-show="activeName === 'tempReminders'"
        style="margin-top: 10px;float: right"
        @current-change="currentt_change"
        layout="total, prev, pager, next, jumper"
        :total=tempRemPaginate.total
        :page-size="tempRemPaginate.pageSize">
      </el-pagination>
<!--     <div class="pagination" v-show="activeName === 'tempReminders'">-->
<!--       <el-pagination-->
<!--         background-->
<!--         layout="total, prev, pager, next, jumper"-->
<!--         :total="tempRemPaginate.total"-->
<!--         :current-page.sync="currentPage"-->
<!--         @current-change="currentt_change">-->
<!--       </el-pagination>-->
<!--      </div>-->
    </el-row>
  </div>
</template>

<script>
import request from '@/network/request'
export default {
  name: 'index',
  data () {
    return {
      activeName: 'fixReminders',
      tempYear: '',
      tempMonth: '',
      fixRemPaginate: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tempRemPaginate: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      fixReminders: [],
      tempReminders: []
    }
  },
  created () {
    const deviceHeight = Number(document.documentElement.clientHeight)
    this.fixRemPaginate.pageSize = parseInt((deviceHeight - 350) / 55) // 数字是页面布局高度差
    this.tempRemPaginate.pageSize = parseInt((deviceHeight - 350) / 55) // 数字是页面布局高度差
    console.log(this.fixRemPaginate)
    this.getFixReminders()
    this.getTempReminders()
  },
  inject: ['reload'],
  methods: {
    getFixReminders () {
      console.log(typeof this.tempYear)
      request({
        method: 'post',
        url: '/bulletin/getplan',
        params: {
          year: this.tempYear === '' ? '' : this.tempYear.getFullYear().toString(),
          pagesize: this.fixRemPaginate.pageSize,
          pagenum: this.fixRemPaginate.currentPage
        }
      }).then(res => {
        console.log(res)
        this.fixReminders = res.data.data.result
        this.fixRemPaginate.total = res.data.data.totalrecords
      })
    },
    getTempReminders () {
      console.log(this.tempMonth)
      request({
        method: 'post',
        url: '/bulletin/getplantemporary',
        params: {
          yyyy_mm: this.tempMonth === '' ? '' : this.tempMonth.getFullYear().toString() + '-' + (this.tempMonth.getMonth() + 1).toString(),
          pagesize: this.tempRemPaginate.pageSize,
          pagenum: this.tempRemPaginate.currentPage
        }
      }).then(res => {
        console.log('temp')
        console.log(res)
        this.tempReminders = res.data.data.result
        this.tempRemPaginate.total = res.data.data.totalrecords
        this.tempReminders.forEach(r => {
          this.$set(r, 'task_type', '临时工作提醒')
          r.date = this.formatDate(new Date(r.date), 'yyyy-MM-dd hh:mm:ss')
        })

        console.log(this.tempReminders)
      })
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    handleDelete (row) {
      console.log(row)
      request({
        method: 'post',
        url: 'bulletin/deleteplantemporary',
        params: {
          subid: row.subid
        }
      }).then(res => {
        this.reload()
        this.activeName = 'tempReminder'
      })
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    // 查看工作提醒表
    handleCheck (index, row) {
      console.log('打印了啥' + index, row)
      this.goViewWithQuery('查看工作提醒', row.id)
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    showFixReminders () {
      this.activeName = 'fixReminders'
    },
    showTempReminders () {
      this.activeName = 'tempReminders'
    },
    currentf_change: function (currentPage) {
      this.fixRemPaginate.currentPage = currentPage
      this.getFixReminders()
    },
    currentt_change: function (currentPage) {
      this.tempRemPaginate.currentPage = currentPage
      this.getTempReminders()
    },
    indexMethod (index) {
      return (this.fixRemPaginate.currentPage - 1) * this.fixRemPaginate.pageSize + index + 1
    }
  }
}
</script>

<style scoped>
  .pagination {
    padding-top: 2vh;
    text-align: center;
  }
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
