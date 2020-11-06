<template>
  <div>
    <div class="sub-title">
      安全专栏
    </div>
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="时间范围：">
          <date-range-selector v-on:dateRangeMonitor="dateRangeMonitor"></date-range-selector>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="搜索标题" prefix-icon="el-icon-search" v-model="searchInfo"> </el-input>
        </el-form-item>
        <el-button class="el-blue-button"><i class="el-icon-search"></i> &nbsp;查询</el-button>
        <el-button class="el-blue-button" @click="goview('新增安全通知')"><i class="el-icon-plus"></i>&nbsp;新增</el-button>
        <el-button class="el-blue-button"><i class="el-icon-refresh-right"></i>&nbsp;重置</el-button>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column prop="serialNumber" label="序号" width="150" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
      <el-table-column prop="content" label="内容" align="center"></el-table-column>
      <el-table-column prop="uploadTime" label="上传时间" width="250" align="center"></el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button class="el-blue-button" size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          <el-button class="el-blue-button" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button class="el-blue-button" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dateRangeSelector from '../../../../components/dateRange-selector'
export default {
  name: 'index',
  components: { dateRangeSelector },
  data () {
    return {
      startDate: '',
      endDate: '',
      searchInfo: '',
      tableData: [{
        serialNumber: '1',
        title: 'XXXXXXXXXXXXX',
        content: 'XXXXXXXXXXXXXXXXXX',
        uploadTime: 'XXX'
      }, {
        serialNumber: '2',
        title: 'XXXXXXXXXXXXX',
        content: 'XXXXXXXXXXXXXXXXXX',
        uploadTime: 'XXX'
      }, {
        serialNumber: '3',
        title: 'XXXXXXXXXXXXX',
        content: 'XXXXXXXXXXXXXXXXXX',
        uploadTime: 'XXX'
      }, {
        serialNumber: '4',
        title: 'XXXXXXXXXXXXX',
        content: 'XXXXXXXXXXXXXXXXXX',
        uploadTime: 'XXX'
      }]
    }
  },
  methods: {
    dateRangeMonitor: function (startDate, endDate) {
      this.startDate = startDate
      this.endDate = endDate
    },
    handleCheck (index, row) {
      console.log(index, row)
      this.goViewWithQuery('查看安全通知', row.title)
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.goViewWithQuery('编辑安全通知', row.title)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    goview (name) {
      this.$router.push({ name }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    },
    goViewWithQuery (name, data) {
      this.$router.push({ name, query: { data: data } }).catch(err => {
        err && console.log('刷新') // 待优化
      })
    }
  }
}
</script>

<style scoped>

</style>
