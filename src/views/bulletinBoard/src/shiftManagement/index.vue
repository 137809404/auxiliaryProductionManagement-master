<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="4">
        <h2 class="subtitle" style="margin-top: 23px; margin-left: 5px">值班管理</h2>
      </el-col>
      <el-col :span="18" style="padding: 20px 20px 15px 0">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="时间：">
            <el-date-picker
              v-model="queryCondition.year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
<!--          <el-form-item label="人员姓名：">-->
<!--            <el-input prefix-icon="el-icon-search" v-model="queryCondition.name" placeholder="姓名"> </el-input>-->
<!--          </el-form-item>-->
          <el-button class="el-blue-button" @click="getDutyByYear()"><i class="el-icon-search"></i>查询</el-button>
          <el-button class="el-blue-button" @click="reload"><i class="el-icon-search"></i>重置</el-button>
        </el-form>
      </el-col>
      <el-col :span="2">
        <div style="padding: 20px 33px 15px 0">
          <el-button  class="el-blue-button" @click="openDialog('add')" style="float: right"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 0 5vw">
      <el-table
        :data="duties"
        style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号" width="60hv" align="center"></el-table-column>
        <el-table-column prop="title" label="倒班表" align="center"></el-table-column>
        <el-table-column prop="editor" label="填报人" align="center"></el-table-column>
        <el-table-column prop="edit_time" label="填报时间" align="center"></el-table-column>
        <el-table-column label="操作" width="130" align="center">
          <template slot-scope="scope">
            <el-button class="el-blue-button" size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px;float: right"
        :page-size=pageSize
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :current-page.sync="currentPage"
        :total=total>
      </el-pagination>
    </el-row>
    <add-dialog
      :visibleFlag.sync="dialogData.visibleFlag"
      @handleSubmit="addNewDuty"
      width="40%"
      :title="dialogData.dialogTitle"
    >
      <el-form ref="FormDate" :model="newDuty"  label-width="130px" slot="dialog-section">
        <el-form-item
          label="时间："
          :rules="[{required: true, message: '请输入标题', trigger: 'blur'}]">
          <el-date-picker
            v-model="newDuty.date"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="标题："
          :rules="[{required: true, message: '请输入标题', trigger: 'blur'}]">
              <el-input v-model="newDuty.title"></el-input>
        </el-form-item>
      </el-form>
    </add-dialog>
  </div>
</template>

<script>
import request from '@/network/request'
import addDialog from '@/views/bulletinBoard/components/addDialog'
export default {
  name: 'index',
  components: {
    addDialog
  },
  data () {
    return {
      user: '',
      duties: [],
      queryCondition: {
        year: ''
      },
      pageSize: 1,
      pagenum: 1,
      total: 0,
      currentPage: 1,
      dialogData: {
        visibleFlag: false,
        dialogTitle: '新增',
        formType: 'add',
        editData: {}
      },
      newDuty: {
        user: '',
        date: '',
        title: ''
      }
    }
  },
  inject: ['reload'],
  created () {
    const deviceHeight = Number(document.documentElement.clientHeight)
    this.pageSize = parseInt((deviceHeight - 350) / 55) // 数字是页面布局高度差
    this.newDuty.user = this.$store.state.user.username
    this.getDutyByYear()
  },
  methods: {
    getPageSize () {
      const deviceHeight = Number(document.documentElement.clientHeight)
      this.pagesize = (deviceHeight - 200) / 55 // 数字是页面布局高度差
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goViewWithQuery (name, year, month, id) {
      this.$router.push({ name, query: { year: year, month: month, id: id } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    handleCheck (index, row) {
      // console.log(index, row)
      this.goViewWithQuery('查看值班表', row.year, row.month, row.id)
    },
    // getAllDuty () {
    //   request({
    //     method: 'post',
    //     url: '/duty/showdutymanage',
    //     params: {
    //       pageSize: this.pageSize,
    //       pagenum: this.pagenum
    //     }
    //   }).then(res => {
    //     // console.log(res.data.data.result)
    //     this.duties = res.data.data.result
    //     this.total = res.data.data.totalrecords
    //     this.duties.forEach(duty => {
    //       // duty.year = duty.date.getFullYear()
    //       // duty.month = duty.date.getMonth()
    //       duty.year = new Date(Date.parse(duty.date)).getFullYear()
    //       duty.month = new Date(Date.parse(duty.date)).getMonth() + 1
    //     })
    //     // console.log(this.duties)
    //   }).catch((error) => {
    //     console.log(error)// 异常
    //   })
    // },
    getDutyByYear () {
      var searchYear = ''
      if (this.queryCondition.year !== '') {
        searchYear = new Date(Date.parse(this.queryCondition.year)).getFullYear()
      }
      if (isNaN(searchYear)) {
        searchYear = ''
      }
      console.log('searchYear')
      console.log(typeof (searchYear))
      console.log(searchYear)
      request({
        method: 'post',
        url: 'duty/showdutymanagebyyear',
        params: {
          year: searchYear,
          pagesize: this.pageSize,
          pagenum: this.pagenum
        }
      }).then(res => {
        this.duties = res.data.data.result
        this.total = res.data.data.totalrecords
        this.duties.forEach(duty => {
          duty.year = new Date(Date.parse(duty.date)).getFullYear()
          duty.month = new Date(Date.parse(duty.date)).getMonth() + 1
        })
        // console.log(this.duties)
      }).catch((error) => {
        console.log(error)// 异常
      })
    },
    openDialog (formType, editData = {}) {
      this.dialogData = {
        visibleFlag: true,
        formType,
        editData,
        dialogTitle: formType === 'add' ? '新增' : '编辑'
      }
    },
    addNewDuty () {
      console.log('newdutytable')
      console.log(this.newDuty)
      request({
        method: 'post',
        url: '/duty/adddutymanage',
        params: {
          date: this.newDuty.date,
          editor: this.newDuty.user,
          title: this.newDuty.title
        }
      }).then(res => {
        if (res.data.data.message === '有重复记录') {
          // console.log('有重复记录')
          this.$message({
            showClose: true,
            message: '日期有重复记录',
            type: 'error'
          })
          // this.$message.error('日期有重复记录')// 这里加弹窗提示'有重复记录'
        } else {
          this.goViewWithQuery('查看值班表', new Date(Date.parse(this.newDuty.date)).getFullYear(), new Date(Date.parse(this.newDuty.date)).getMonth() + 1, res.data.data.data)
          // this.reload()
        }
      }).catch((error) => {
        console.log(error)// 异常
        this.$message({
          showClose: true,
          message: '登录失效，请重新登录或检查网络',
          type: 'error'
        })
      })
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getDutyByYear()
    },
    indexMethod (index) {
      return (this.pagenum - 1) * this.pageSize + index + 1
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
    font-size: 20px;
  }
  >>>.el-pagination span {
    font-size: 18px;
  }
  >>>.number{
    color: #dddddd;
  }
</style>
