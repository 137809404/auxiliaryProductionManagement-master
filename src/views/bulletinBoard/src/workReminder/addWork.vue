<template>
  <div>
    <el-row type="flex" :gutter="0" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="5">
        <h2 class="subtitle" style="margin-top: 18px;margin-left: 5px">
          <el-button type="text" @click="goback"><i class="el-icon-back subtitle"></i></el-button>
          新增工作提醒
        </h2>
      </el-col>
      <el-col :span="5">
        <el-button-group style="margin-top: 20px">
          <el-button class="el-blue-button" @click="showFixReminders">固定</el-button>
          <el-button class="el-blue-button" @click="showTempReminders">临时</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="15">
        <el-form v-show="activeName === 'fixReminders'" :inline="true"  class="demo-form-inline" style="margin-top: 15px">
          <el-form-item>
            <div class="block">
              <span class="demonstration">创建月份：</span>
              <el-date-picker
                v-model="month"
                type="month"
                placeholder="选择月"
                format="yyyy-MM"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-button class="el-blue-button" @click="addaNewFixReminder"><i class="el-icon-folder-add"></i> &nbsp;创建</el-button>
        </el-form>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <hr style="border-bottom: none;border-color: #8c939d"/>
    <el-row style="margin: 0 20vw 0 5vw">
      <div v-show="activeName === 'tempReminders'">
        <el-row style="margin-top: 25px">
          <el-form :model="newTempReminder"  label-width="130px">
            <el-form-item
              prop="date"
              label="提醒日期："
              :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
              <el-date-picker
                v-model="newTempReminder.noticetime"
                type="datetime"
                placeholder="选择日期"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item
              prop="taskType"
              label="任务类型：">
              <el-input value="临时工作提醒" readonly></el-input>
            </el-form-item>
            <el-form-item
              prop="taskType"
              label="提醒对象：">
              <el-input v-model="newTempReminder.who_to_notice"></el-input>
            </el-form-item>
            <el-form-item
              prop="content"
              label="任务内容："
              :rules="[{required: true, message: '请输入内容', trigger: 'blur'}]">
              <el-input type="textarea" v-model="newTempReminder.business" :autosize="{ minRows:7, maxRows:20}"></el-input>
            </el-form-item>
            <el-button @click="addaNewTempReminder" class="el-blue-button" style="float: right"><i class="el-icon-document"></i>&nbsp;保存</el-button>
          </el-form>
        </el-row>
      </div>
    </el-row>
    <add-dialog
      :visibleFlag.sync="dialogData.visibleFlag"
      @handleSubmit="addaNewFixReminder"
      width="40%"
      :title="dialogData.dialogTitle"
    >
      <el-form ref="FormDate" :model="newFixReminder"  label-width="100px" slot="dialog-section">
        <el-form-item
          prop="date"
          label="提醒日期："
          :rules="[{required: true, message: '请选择时间', trigger: 'blur'}]">
          <el-date-picker
            v-model="newFixReminder.date"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="mainTask"
          label="主要任务："
          :rules="[{required: true, message: '请输入内容', trigger: 'blur'}]">
          <el-select v-model="newFixReminder.mainTask" placeholder="请选择活动区域">
            <el-option label="日报" value="日报"></el-option>
            <el-option label="周报" value="周报"></el-option>
            <el-option label="月报" value="月报"></el-option>
            <el-option label="每日日常工作" value="每日日常工作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="content"
          label="业务内容：">
          <el-input v-model="newFixReminder.content"></el-input>
        </el-form-item>
        <el-form-item
          prop="publishPlatform"
          label="发布平台：">
          <el-input v-model="newFixReminder.publishPlatform"></el-input>
        </el-form-item>
        <el-form-item
          prop="target"
          label="报送对象：">
          <el-input v-model="newFixReminder.target"></el-input>
        </el-form-item>
        <el-form-item
          prop="sendTime"
          label="报送时间：">
          <el-input v-model="newFixReminder.sendTime"></el-input>
        </el-form-item>
        <el-form-item
          prop="editPerson"
          label="编制人：">
          <el-input v-model="newFixReminder.editPerson"></el-input>
        </el-form-item>
        <el-form-item
          prop="checkPerson"
          label="审核人：">
          <el-input v-model="newFixReminder.checkPerson"></el-input>
        </el-form-item>
      </el-form>
    </add-dialog>
  </div>
</template>

<script>
import addDialog from '@/views/bulletinBoard/components/addDialog'
import request from '@/network/request'
export default {
  name: 'addWork',
  components: {
    addDialog
  },
  data () {
    return {
      activeName: 'fixReminders',
      month: '',
      startDate: '',
      endDate: '',
      pickerOptions: {
        disabledDate (time) {
          // console.log(new Date(that.startDate) + '可选' + new Date(that.endDate))
          return time.getTime() < new Date('2020-10-01') || time.getTime() > new Date('2020-10-30')
        }
      },
      fixReminders: [],
      newTempReminder: {
        noticetime: '',
        business: '',
        who_to_notice: ''
      },
      newFixReminder: {
        date: '2020-10-18',
        mainTask: '日报',
        content: '风电场综合日报',
        publishPlatform: '当班值长邮箱',
        target: '集团公司',
        sendTime: '值长报送',
        editPerson: 'XXX',
        checkPerson: '@@@XXX',
        completion: ''
      },
      dialogData: {
        visibleFlag: false,
        dialogTitle: '新增',
        formType: 'add',
        editData: {}
      }
    }
  },
  methods: {
    setMonth () {
      console.log(this.month)
      this.startDate = this.month
      const curMonth = new Date(Date.parse(this.month)).getMonth()
      const curYear = new Date(Date.parse(this.month)).getFullYear()
      if (curMonth === 11) {
        this.endDate = this.formatterDate(new Date(new Date(curYear + 1, 0, 1).setDate(new Date(curYear + 1, 0, 1).getDate() - 1)))
      } else {
        this.endDate = this.formatterDate(new Date(new Date(curYear, curMonth + 1, 1).setDate(new Date(curYear + 1, 0, 1).getDate() - 1)))
      }
      console.log('日期范围：' + this.startDate + ' - ' + this.endDate)
      // this.setPickable()
    },
    /**
     *新增一个月工作提醒
     *   方案一，在这个界面编辑
     * √ 方案二，直接跳转到查看界面编辑
     */
    addaNewFixReminder () {
      this.setMonth()
      console.log(this.newFixReminder)
      request({
        method: 'post',
        url: '/bulletin/addplan',
        params: {
          date: this.month,
          editor: this.$store.state.user.username
        }
      }).then(res => {
        console.log(res)
        if (res.data.message === '有重复记录') {
          this.$message({
            type: 'info',
            message: '该月工作计划已存在'
          })
        } else {
          this.goViewWithQuery('查看工作提醒', res.data.data)
          // this.fixReminders = res.data.data
          // this.fixReminders.forEach(reminder => {
          //   reminder.date = this.month.slice(0, 7) + '-' + reminder.date
          // })
          // console.log(this.fixReminders)
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'info',
          message: '登陆已过期，请注销后重新登录'
        })// 异常
      })
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    /**
     * 新增一条临时工作提醒
     */
    addaNewTempReminder () {
      console.log(this.newTempReminder)
      request({
        method: 'post',
        url: '/bulletin/addplantemporary',
        params: {
          noticetime: this.newTempReminder.noticetime,
          who_to_notice: this.newTempReminder.who_to_notice,
          business: this.newTempReminder.business,
          CHECK_TYPE: 1,
          TIMES_NEED_2_CHECK: 1
        }
      }).then(res => {
        if (res.data.message === 'SUCCESS') {
          this.$confirm('是否继续添加？', '添加成功', {
            distinguishCancelAndClose: true,
            confirmButtonText: '继续添加',
            cancelButtonText: '放弃并返回'
          })
            .then(() => {
              this.$message({
                type: 'info',
                message: '继续添加'
              })
            })
            .catch(action => {
              if (action === 'cancel') {
                this.$router.back(-1)
              }
            })
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          type: 'info',
          message: '登陆已过期，请注销后重新登录'
        })// 异常
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    openDialog (formType, editData = {}) {
      this.dialogData = {
        visibleFlag: true,
        formType,
        editData,
        dialogTitle: formType === 'add' ? '新增' : '编辑'
      }
    },
    handleEdit (index, row) {
      console.log(index + '点击了' + row)
    },
    handleDelete (index, row) {
      console.log('index' + index)
      console.log('row' + row)
      if (this.activeName === 'fixReminder') {
        this.fixReminders.splice(index, 1)
      } else {
        this.tempReminders.splice(index, 1)
      }
    },
    goback: function () {
      this.$router.back(-1)
    },
    setPickable () {
      var that = this
      this.pickerOptions = {
        disabledDate (time) {
          console.log(new Date(that.startDate) + '可选' + new Date(that.endDate))
          return time.getTime() < new Date(that.startDate) || time.getTime() > new Date(that.endDate)
        }
        // 大于当前的禁止，小于7天前的禁止
      }
    },
    formatterDate (date) {
      if (!date) {
        return ''
      }
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var nowDate = year + '-' + month + '-' + day
      return nowDate
    },
    showFixReminders () {
      this.activeName = 'fixReminders'
    },
    showTempReminders () {
      this.activeName = 'tempReminders'
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
</style>
