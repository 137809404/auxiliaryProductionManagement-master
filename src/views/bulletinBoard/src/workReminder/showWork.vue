<template>
  <section>
    <el-row type="flex" :gutter="0" style="padding-left: 20px;margin-bottom: 9px">
      <el-col :span="5">
        <h2 class="subtitle" style="margin-top: 20px; margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
          {{ this.year}}年{{this.month}}月计划
        </h2>
      </el-col>
      <el-col :span="19">
        <div style="padding: 20px 33px 0px 0px;float: right">
          <el-button class="el-blue-button" @click="downloadWorkTable"><i class="el-icon-document"></i>&nbsp;导出</el-button>
        </div>
      </el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row type="flex"  justify="space-around">
      <el-col :span="23">
        <h2 style="text-align: center; margin-top: 5px;">集控中心{{ this.year}}年{{this.month}}月度业务完成情况
          <el-button v-if="this.isEditable" @click="enableEdit" class="el-blue-button" size="small" style="float: right;margin-right: 8px"><i class="el-icon-document"></i>&nbsp;修改</el-button>
          <el-button @click="openDialog('add')" v-if="this.isAdaptable&&this.edit" class="el-blue-button" size="small" style="float: right;margin-right: 8px"><i class="el-icon-plus"></i>新增</el-button>
        </h2>
        <el-table
          ref="myTable"
          :span-method="objectSpanMethod"
          :data="tableDate"
          class="tb-edit"
          :highlight-current-row="this.edit"
          style="width: 100%;margin:0 auto;overflow-y: auto"
          max-height="63vh"
          height="100%"
        >
          //加上hilight-current-row就可以了？？？？？？
          <el-table-column prop="date" label="日期" width="65px" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.date}}日</span>
            </template>
          </el-table-column>
          <el-table-column prop="task_type" label="主要任务" width="110px" align="center"></el-table-column>
          <el-table-column prop="business" label="业务内容" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.business" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.business}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="platform" label="发布平台"  align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.platform" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.platform}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="who_to_sent" label="报送对象" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.who_to_sent" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.who_to_sent}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="when_to_sent" label="报送时间" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.when_to_sent" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.when_to_sent}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="editor" label="编制人" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.editor" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.editor}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" label="审核人" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.reviewer" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.reviewer}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="check_MEM_NAMES" label="确认人" align="center"> </el-table-column>
          <el-table-column prop="status" label="完成情况" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.status" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
              <span>{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="this.isAdaptable&&this.edit" label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button class="el-green-button" @click="setCurrent(scope.row)">保存</el-button>
              <el-button class="el-red-button" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <add-dialog
      :visibleFlag.sync="dialogData.visibleFlag"
      @handleSubmit="addaNewPlan"
      width="40%"
      :title="dialogData.dialogTitle"
    >
      <el-form ref="FormDate" :model="newPlan"   label-width="130px" slot="dialog-section">
        <el-form-item
          label="提醒日期："
          :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
          <el-date-picker
            v-model="newPlan.date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="任务类型："
          :rules="[{required: true, message: '请输入内容', trigger: 'blur'}]">
          <el-select v-model=" newPlan.task_type" placeholder="请选择任务类型">
            <el-option label="日报" value="1"></el-option>
            <el-option label="周报" value="2"></el-option>
            <el-option label="月报" value="3"></el-option>
            <el-option label="每日日常" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="业务内容：">
              <el-input v-model="newPlan.business"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="发布平台：">
              <el-input v-model="newPlan.platform"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="报送对象：">
              <el-input v-model="newPlan.who_to_sent"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="报送时间：">
              <el-input v-model="newPlan.when_to_sent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item
              label="编制人：">
              <el-input v-model="newPlan.editor"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item
              label="审核人：">
              <el-input v-model="newPlan.reviewer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </add-dialog>
  </section>
</template>

<script>
import request from '@/network/request'
import addDialog from '@/views/bulletinBoard/components/addDialog'
import { baseURL } from '@/config/baseConfig'
export default {
  name: 'showWork',
  components: {
    addDialog
  },
  data () {
    return {
      pickerOptions: {},
      firstDayInMonth: '2020-10-01', // 月报表所在月份的最后一天日期
      isEditable: false,
      edit: false, // 点击修改按钮显示或隐藏删除按钮编辑功能
      year: 2020,
      month: 11,
      workId: 0,
      spanArr0: [],
      spanArr1: [],
      tableDate: [],
      newPlan: {
        date: '2020-11-02',
        task_type: '',
        business: '',
        platform: '',
        who_to_sent: '',
        when_to_sent: '',
        editor: '',
        reviewer: '',
        status: '',
        CHECK_TYPE: 1,
        TIMES_NEED_2_CHECK: 1
      },
      dialogData: {
        visibleFlag: false,
        dialogTitle: '新增',
        formType: 'add',
        editData: {}
      }
    }
  },
  created () {
    console.log(new Date('2020-11-30'))
    console.log('aaayear' + this.year.toString())
    this.getTableData()
    console.log('cccyear' + this.year.toString())
    var that = this
    this.pickerOptions = {
      disabledDate (time) {
        console.log(that.year.toString())
        if (that.month !== 12) {
          return time.getTime() < Date.now() || time.getTime() > new Date(that.year.toString() + '-' + (that.month + 1).toString() + '-01').getTime() - 24 * 60 * 60 * 1000 || time.getTime() < new Date(that.year.toString() + '-' + that.month.toString() + '-01').getTime()
        } else {
          return time.getTime() < Date.now() || time.getTime() > new Date((that.year + 1).toString() + '-' + '01' + '-01').getTime() - 24 * 60 * 60 * 1000 || time.getTime() < new Date(that.year.toString() + '-' + that.month.toString() + '-01').getTime()
        }
      }
    }
  },
  inject: ['reload'],
  methods: {
    getTableData: function () {
      this.workId = this.$route.query.data
      request({
        method: 'post',
        url: '/bulletin/getplanregular',
        params: {
          belong_to: this.workId
        }
      }).then(res => {
        // console.log(res)
        this.tableDate = res.data.data.record
        this.getSpanArr(this.tableDate)
        this.firstDayInMonth = new Date(res.data.data.date)
        this.year = new Date(res.data.data.date).getFullYear()
        this.month = new Date(res.data.data.date).getMonth() + 1
        this.firstDayInMonth = new Date(this.year.toString() + '-' + this.month.toString() + '-' + '01').getTime()
        this.isEditable = this.isAdaptable()
        // console.log(this.firstDayInMonth)
        console.log('123year' + this.year.toString())
      })
    },
    isAdaptable: function () { // 是否可修改
      if (new Date().getFullYear() < this.year) { return true } else if (new Date().getFullYear() === this.year && new Date().getMonth() + 1 <= this.month) { return true } else return false
    },
    getSpanArr (data) {
      // var begin = 0
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr0.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].date === data[i - 1].date) {
            this.spanArr0[this.pos] += 1
            this.spanArr0.push(0)
            // 发现下一行元素不等了
          } else {
            this.spanArr0.push(1)
            // 合并第二列
            for (var j = this.pos; j < this.pos + this.spanArr0[this.pos]; j++) {
              if (j === this.pos) {
                this.spanArr1.push(1)
                this.subpos = this.pos
              } else {
                if (data[j].task_type === data[j - 1].task_type) {
                  this.spanArr1[this.subpos] += 1
                  this.spanArr1.push(0)
                } else {
                  this.spanArr1.push(1)
                  this.subpos = j
                }
              }
            }
            this.pos = i
          }
        }
      }
      for (var k = this.pos; k < this.pos + this.spanArr0[this.pos]; k++) {
        if (k === this.pos) {
          this.spanArr1.push(1)
          this.subpos = this.pos
        } else {
          if (data[k].task_type === data[k - 1].task_type) {
            this.spanArr1[this.subpos] += 1
            this.spanArr1.push(0)
          } else {
            this.spanArr1.push(1)
            this.subpos = k
          }
        }
      }
      // console.log(this.spanArr0)
      // console.log(this.spanArr1)
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr0[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.spanArr1[rowIndex]
        const _col = _row > 0 ? 1 : 0
        // console.log(`rowspan:${_row} colspan:${_col}`)
        return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
    },
    openDialog (formType, editData = {}) {
      this.dialogData = {
        visibleFlag: true,
        formType,
        editData,
        dialogTitle: formType === 'add' ? '新增' : '编辑'
      }
    },
    /**
     * 接口还没搞定
     */
    addaNewPlan () {
      console.log(this.newPlan)
      request({
        method: 'post',
        url: '/bulletin/addplanregular',
        params: {
          CHECK_TYPE: 1,
          TIMES_NEED_2_CHECK: 1,
          belong_to: this.workId,
          business: this.newPlan.business,
          date: this.newPlan.date,
          editor: this.newPlan.editor,
          platform: this.newPlan.platform,
          reviewer: this.newPlan.reviewer,
          status: '',
          task_type: this.newPlan.task_type,
          when_to_sent: this.newPlan.when_to_sent,
          who_to_sent: this.newPlan.who_to_sent
        }
      }).then(res => {
        this.reload()
        this.edit = true
      })
    },
    /**
     * 更新一条月计划，接口task_type待改成string
     * @param row
     */
    setCurrent (row) {
      console.log(row)
      request({
        method: 'post',
        url: '/bulletin/updateplanregular',
        params: {
          subid: row.subid,
          business: row.business,
          platform: row.platform,
          who_to_sent: row.who_to_sent,
          when_to_sent: row.when_to_sent,
          editor: row.editor,
          reviewer: row.reviewer,
          status: row.status
        }
      }).then(res => {
        console.log('修改')
        console.log(res)
        // this.tableDate = res.data.data
        this.reload()
        this.edit = true
      })
    },
    handleDelete (row) {
      request({
        method: 'post',
        url: 'bulletin/deleteplanregular',
        params: {
          subid: row.subid
        }
      }).then(res => {
        this.reload()
        this.edit = true
      })
    },
    downloadWorkTable () {
      request({
        method: 'post',
        url: '/bulletin/printxslx',
        params: {
          id: this.workId
        }
      }).then(res => {
        // 用创建‘a’的方式下载附件
        const link = document.createElement('a')
        link.style.display = 'false'
        link.href = baseURL + '/' + res.data.data.url
        console.log(link.href)
        link.click()
      })
    },
    enableEdit: function () {
      this.edit = !this.edit
    },
    handleEdit (index, row) {
      console.log(index + '点击了' + row)
    },
    handleCurrentChange (row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    goback: function () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
  >>>.el-table td, .el-table th.is-leaf {
    border-left: 1px solid rgb(50,52,71);
    border-right: 1px solid rgb(50,52,71);
  }
  >>>.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(color: #060920, alpha: 0.4);
    border-right: 1px solid rgb(50,52,71);
    border-left: 1px solid rgb(50,52,71);
    border-bottom: 1px solid rgb(50,52,71);
  }
</style>
