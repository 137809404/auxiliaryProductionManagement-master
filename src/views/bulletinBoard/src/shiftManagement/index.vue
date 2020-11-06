<template>
  <div>
    <div class="sub-title">
      值班管理
    </div>
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
        <el-form-item label="值次：">
          <el-select v-model="queryCondition.dutyTime" placeholder="全部">
            <el-option label="一值" value="one"></el-option>
            <el-option label="二值" value="two"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="queryCondition.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人员姓名：">
          <el-input prefix-icon="el-icon-search" v-model="queryCondition.name"> </el-input>
        </el-form-item>
        <el-button class="el-blue-button"><i class="el-icon-search"></i> &nbsp;查询</el-button>
      </el-form>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      queryCondition: {
        dutyTime: '',
        date: '',
        name: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
