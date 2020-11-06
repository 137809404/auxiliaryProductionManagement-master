<template>
  <div>
    <div class="sub-title">
    计划报表
    </div>
    <el-row  :gutter="20">
      <el-col :span="20">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="指标名称：">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-button class="el-blue-button"><i class="el-icon-search"></i> &nbsp;查询</el-button>
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;保存</el-button>

          <el-button class="el-blue-button" @click="exportExcel"><i class="el-icon-download"></i>&nbsp;导出Excel</el-button>
          <el-button class="el-blue-button"><i></i>打印</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
