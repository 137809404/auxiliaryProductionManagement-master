<template>
  <!--自由报表无修改功能，只能查看-->
  <div>
    <div class="sub-title">
      自由报表
    </div>
    <el-row type="flex" justify="space-between" :gutter="20">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="风场：">
            <el-select v-model="queryCondition.windFarm"  placeholder="风场">
              <el-option v-for="item in windFarms" :key="item.label" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指标选择：">
            <el-select v-model="queryCondition.target" placeholder="指标">
              <el-option label="发电量" value="Production"></el-option>
              <el-option label="上网电量" value="OnGridProduction"></el-option>
              <el-option label="外购电量" value="PurchaseProduction"></el-option>
              <el-option label="平均风速" value="WindSpeed_Avg"></el-option>
              <el-option label="故障小时数" value="Standard_Fault_Hours??"></el-option>
              <el-option label="机组可利用率" value="Availability"></el-option>
              <el-option label="限负荷损失电量" value="LmPwrFaultLost"></el-option>
              <el-option label="日最高负" value="??"></el-option>
              <el-option label="调度限负荷损失量" value="??"></el-option>
              <el-option label="自身限负荷电量" value="??"></el-option>
              <el-option label="机组故障时间" value="??"></el-option>
              <el-option label="站内故障时间" value="??"></el-option>
              <el-option label="机组可用时间" value="??"></el-option>
              <el-option label="可利用率" value="Availability"></el-option>
              <el-option label="故障机组（台）" value="Standard_Fault_Devices"></el-option>
              <el-option label="厂用电量（万kwh）" value="HouseProduction"></el-option>
              <el-option label="厂用电率（％）" value="RateOfHouse"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="聚合时间：">
            <el-select v-model="queryCondition.aggregationWay" placeholder="聚合时间">
              <el-option label="年" value="year"></el-option>
              <el-option label="月" value="month"></el-option>
              <el-option label="日" value="day"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围：">
            <date-range-selector v-on:dateRangeMonitor="dateRangeMonitor"></date-range-selector>
          </el-form-item>
          <el-form-item label="厂家/机型：">
            <el-select v-model="queryCondition.factoryAndType" placeholder="厂家/机型">
              <el-option label="明阳" value="shanghai"></el-option>
              <el-option label="金凤" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        border
        :header-cell-style="{background:'#6CA6CD',color:'#FFFFFF'}"
        style="width: 100%">
        <!--<el-table-column v-for="prop in tableData[1]" :key="prop" :prop="prop.key" :label="prop.value" width="150" align="center"></el-table-column>-->
        <el-table-column prop="title" label="标题" width="400" align="center"></el-table-column>
        <el-table-column prop="publishContent" label="发布内容" align="center"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="250" align="center"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import dateRangeSelector from '../../../../components/dateRange-selector'
export default {
  name: 'index',
  components: { dateRangeSelector },
  data () {
    return {
      windFarms: [
        '洋前风电场',
        '勇士风电场'],
      queryCondition: {
        windFarm: '',
        target: '',
        aggregationWay: '',
        timeRange: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        factoryAndType: ''
      },
      startDate: '',
      endDate: '',
      tableData: [{
        serialNumber: '1',
        title: 'XXXXXXXXXXXXX',
        publishContent: 'XXXXXXXXXXXXXXXXXX',
        publishTime: 'XXX'
      }, {
        serialNumber: '2',
        title: 'XXXXXXXXXXXXX',
        publishContent: 'XXXXXXXXXXXXXXXXXX',
        publishTime: 'XXX'
      }, {
        serialNumber: '3',
        title: 'XXXXXXXXXXXXX',
        publishContent: 'XXXXXXXXXXXXXXXXXX',
        publishTime: 'XXX'
      }, {
        serialNumber: '4',
        title: 'XXXXXXXXXXXXX',
        publishContent: 'XXXXXXXXXXXXXXXXXX',
        publishTime: 'XXX'
      }]
    }
  },
  methods: {
    dateRangeMonitor: function (startDate, endDate) {
      this.startDate = startDate
      this.endDate = endDate
      console.log('父组件中：' + this.startDate)
    }
  }
}
</script>

<style scoped>
</style>
