<template>
  <div>
    <div class="sub-title">
      指标趋势图
    </div>
    <el-row type="flex" justify="space-between" :gutter="20">
      <el-col :span="6">
        <el-button class="el-blue-button">年</el-button>
        <el-button class="el-blue-button">月</el-button>
        <el-button class="el-blue-button">日</el-button>
      </el-col>
      <el-col :span="13">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="指标时间：">
            <date-range-selector v-on:dateRangeMonitor="dateRangeMonitor"></date-range-selector>
          </el-form-item>
          <el-form-item label="指标名称：">
            <el-select v-model="formInline.region" placeholder="指标名称">
              <el-option label="发电量" value="Production"></el-option>
              <el-option label="上网电量" value="OnGridProduction"></el-option>
              <el-option label="外购电量" value="PurchaseProduction"></el-option>
              <el-option label="平均风速" value="WindSpeed_Avg"></el-option>
              <el-option label="故障小时数" value="Standard_Fault_Hours"></el-option>
              <el-option label="机组可利用率" value="Availability"></el-option>
              <el-option label="限负荷损失电量" value="LmPwrFaultLost"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="el-blue-button" @click="onSubmit"><i class="el-icon-search"></i> &nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <chart ref="chart1" :options="Options1" :auto-resize="true" style="width: 100%"></chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <chart ref="chart2" :options="Options2" :auto-resize="true" style="width: 100%"></chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <chart ref="chart2" :options="Options3" :auto-resize="true" style="width: 100%"></chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <chart ref="chart2" :options="Options4" :auto-resize="true" style="width: 100%"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dateRangeSelector from '../../../../components/dateRange-selector'
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'index',
  components: { dateRangeSelector },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      Options1: {},
      Options2: {},
      Options3: {},
      Options4: {},
      wind_farms: ['洋前风电场', '勇士风电场', '石板岭风电场', '红心楼风电场', '友好风电场', '外罗一期风电场', '五兔山风电场', '灯角楼风电场', '外罗二期风电场'],
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    dateRangeMonitor: function (startDate, endDate) {
      this.startDate = startDate
      this.endDate = endDate
      console.log('父组件中：' + this.startDate)
    }
  },
  mounted () {
    this.Options1 = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [20, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar'

      }]
    }
    this.Options2 = {
      title: {
        text: '能量利用率(%)趋势图\n\n',
        align: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: this.wind_farms,
        top: 30
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          name: '能量可利用率(%)',
          type: 'value'
        }
      ],
      series: [
        {
          name: this.wind_farms[0],
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210]
        },
        {
          name: this.wind_farms[1],
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
        },
        {
          name: this.wind_farms[2],
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410]
        },
        {
          name: this.wind_farms[3],
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: this.wind_farms[4],
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    this.Options3 = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
      ]
    }
    this.Options4 = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
      ]
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .chart {
    width: 100%;
  }
</style>
