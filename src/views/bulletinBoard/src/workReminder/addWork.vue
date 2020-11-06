<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; padding-top: 10px; margin-bottom: 9px">
      <el-col :span="1">
        <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      </el-col>
      <el-col :span="3">
        <h2 style="margin-top: 12px;margin-left: -25px">新增工作提醒</h2>
      </el-col>
      <el-col :span="18">
<!--        <el-form :inline="true"  class="demo-form-inline" style="margin-top: 10px">-->
<!--          <el-form-item>-->
<!--            <div class="block">-->
<!--              <span class="demonstration">创建月份：</span>-->
<!--              <el-date-picker-->
<!--                v-model="month"-->
<!--                type="month"-->
<!--                placeholder="选择月">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--          <el-button class="el-blue-button"><i class="el-icon-folder-add"></i> &nbsp;创建</el-button>-->
<!--        </el-form>-->
      </el-col>
      <el-col :span="1">
        <div style="padding: 10px 20px 15px 40px">
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;保存</el-button>
        </div>
        <!--          <download-excel
                    class = "export-excel-wrapper"
                    :data = "json_data"
                    :fields = "json_fields"
                    name = "filename.xls"
                    style = "display: inline; margin:0 10px">
                    &lt;!&ndash; 上面可以自定义自己的样式，还可以引用其他组件button &ndash;&gt;
                    <el-button class="el-blue-button"><i class="el-icon-download"></i>&nbsp;导出Excel</el-button>
                  </download-excel>-->
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="固定工作提醒" name="fixReminder">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-form :inline="true"  class="demo-form-inline">
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
            <el-button class="el-blue-button" @click="setMonth"><i class="el-icon-folder-add"></i> &nbsp;创建</el-button>
          </el-form>
        </el-col>
        <el-col :span="3" style="padding-left: 32px">
          <el-button class="el-blue-button" @click="insert"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;保存</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 0px">
        <el-table
          v-if="activeName === 'fixReminder'"
          :data="fixReminders"
          stripe
          border
          :header-cell-style="{background:'#6CA6CD',color:'#FFFFFF'}"
          style="width: 100%">
          <!--<el-table-column v-for="prop in tableData[1]" :key="prop" :prop="prop.key" :label="prop.value" width="150" align="center"></el-table-column>-->
          <el-table-column width="240px" prop="date" label="日期" align="center">
            <template slot-scope="scope">
              <el-date-picker
                size="small"
                v-model="scope.row.date"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="mainTask" label="主要任务" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.mainTask" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="业务内容" width="250" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.content" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="publishPlatform" label="发布平台" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.publishPlatform" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="target" label="报送对象" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.target" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sendTime" label="报送时间" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.sendTime" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="editPerson" label="编制人" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.editPerson" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="checkPerson" label="审核人" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.checkPerson" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button class="el-blue-button" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="临时工作提醒" name="tempReminder">
      <el-row type="flex" justify="space-between">
        <el-col :span="3" :offset="21" style="padding-left: 33px">
          <el-button class="el-blue-button" @click="insert"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;保存</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 25px">
        <el-table
          v-if="activeName === 'tempReminder'"
          :data="tempReminders"
          stripe
          :header-cell-style="{background:'#6CA6CD',color:'#FFFFFF'}"
          style="width: 100%">
          <!--<el-table-column v-for="prop in tableData[1]" :key="prop" :prop="prop.key" :label="prop.value" width="150" align="center"></el-table-column>-->
          <el-table-column width="240px" prop="date" label="日期" align="center">
            <template slot-scope="scope">
              <el-date-picker
                size="small"
                v-model="scope.row.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="taskType" label="任务类型" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.taskType}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="taskContent" label="任务内容" width="800" align="center">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.taskContent" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="remindedTarget" label="提醒对象" width="250" align="center">
            <template slot-scope="scope">
              <el-input  size="small" v-model="scope.row.remindedPerson" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button class="el-blue-button" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'addWork',
  data () {
    return {
      activeName: 'fixReminder',
      month: '',
      startDate: '',
      endDate: '',
      pickerOptions: {
        disabledDate (time) {
          // console.log(new Date(that.startDate) + '可选' + new Date(that.endDate))
          return time.getTime() < new Date('2020-10-01') || time.getTime() > new Date('2020-10-30')
        }
      },
      fixReminders: [
        {
          date: '2020-10-18',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '2020-10-18',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }],
      tempReminders: []
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
    insert () {
      if (this.activeName === 'fixReminder') {
        console.log(this.activeName)
        this.fixReminders.push({
          date: '',
          mainTask: '',
          taskContent: '',
          publishPlatform: '',
          submitPerson: '',
          submitTime: '',
          creator: '',
          checker: ''
        })
      } else {
        this.tempReminders.push({
          date: '',
          taskType: '临时工作提醒',
          taskContent: '',
          remindedTarget: ''
        })
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleCurrentChange (row, event, column) {
      console.log('点击了' + row)
      console.log(row, event, column, event.currentTarget)
      console.log(this.tables[0].tableData.length)
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
      console.log('huitui')
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
