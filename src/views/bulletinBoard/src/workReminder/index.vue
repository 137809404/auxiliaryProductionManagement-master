<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 20px; margin-bottom: 8px">
      <el-col :span="4">
        <h2 style="margin-top: 23px; margin-left: 5px">工作计划提醒</h2>
      </el-col>
      <el-col :span="19">
      </el-col>
      <el-col :span="1">
        <div style="padding: 20px 20px 15px 0">
          <el-button class="el-blue-button" @click="goview('新增工作提醒')" style="float: right"><i class="el-icon-plus"></i>&nbsp;新增工作提醒</el-button>
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
            <el-form :inline="true"  class="demo-form-inline" style="margin-top: 20px">
              <el-form-item label="查询年份：">
                <div class="block">
                  <el-date-picker
                    v-model="year"
                    align="right"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-button class="el-blue-button"><i class="el-icon-search"></i> &nbsp;查询</el-button>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="margin-top: 0px">
          <!-- v-if="activeName === 'fixReminder'" 防抖动-->
          <el-table
            v-if="activeName === 'fixReminder'"
            :data="fixReminders">
            <el-table-column prop="serialNumber" label="序号" width="150" align="center"></el-table-column>
            <el-table-column prop="taskType" label="任务类型"  align="center"></el-table-column>
            <el-table-column prop="producer" label="编制人" width="500" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button class="el-blue-button" size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="临时工作提醒" name="tempReminder">
        <el-row style="margin-top: 25px">
          <el-table
            v-if="activeName === 'tempReminder'"
            :data="tempReminders"
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
  name: 'index',
  data () {
    return {
      activeName: 'fixReminder',
      year: '',
      fixReminders: [{
        serialNumber: '1',
        taskType: '2019年1月计划',
        producer: '罗钧仁'
      }, {
        serialNumber: '2',
        taskType: '2019年2月计划',
        producer: '罗钧仁'
      }, {
        serialNumber: '3',
        taskType: '2019年3月计划',
        producer: '罗钧仁'
      }, {
        serialNumber: '4',
        taskType: '2019年4月计划',
        producer: '罗钧仁'
      }],
      tempReminders: [{
        date: '',
        taskType: '临时工作提醒',
        taskContent: '',
        remindedTarget: ''
      }]
    }
  },
  methods: {
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    handleCheck (index, row) {
      console.log(index, row)
      this.goViewWithQuery('查看工作提醒', row.taskType)
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
