<template>
  <div>
    <el-row type="flex" :gutter="20" style="padding-left: 10px;padding-top: 10px">
      <el-col :span="1">
        <el-button type="text" @click="goback"><i class="el-icon-back" style="color: white;font-size: xx-large"></i></el-button>
      </el-col>
      <el-col :span="18">
        <h2 style="margin-top: 12px;margin-left: -35px">{{year}}年{{month}}月计划</h2>
      </el-col>
      <el-col :span="3">
        <div v-if="isAdaptable()" style="padding: 10px 0px 15px 0px">
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;修改</el-button>
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;保存</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="padding: 10px 0px 15px 0px">
          <el-button class="el-blue-button"><i class="el-icon-document"></i>&nbsp;导出</el-button>
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
    <el-row type="flex"  justify="space-around">
      <el-col :span="23">
        <h2 style="text-align: center; margin-top: 5px;">集控中心{{ year }}年{{ month }}月度业务完成情况</h2>
        <el-table ref="multipleTable" border :span-method="arraySpanMethod" :data="tableData" style="width: 100%;margin:0 auto;">
          <el-table-column prop="date" label="序号" width="160" align="center"></el-table-column>
          <el-table-column prop="mainTask" label="主要任务" align="center"></el-table-column>
          <el-table-column prop="content" label="业务内容" width="400px" align="center"></el-table-column>
          <el-table-column prop="publishPlatform" label="发布平台" width="200px" align="center"></el-table-column>
          <el-table-column prop="target" label="报送对象" align="center"> </el-table-column>
          <el-table-column prop="sendTime" label="报送时间" align="center"></el-table-column>
          <el-table-column prop="editPerson" label="编制人" align="center"></el-table-column>
          <el-table-column prop="checkPerson" label="审核人" align="center"></el-table-column>
          <el-table-column prop="complement" label="完成情况" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'showWork',
  data () {
    return {
      firstDayInMonth: '2020-10-01', // 月报表所在月份的最后一天日期
      lastDayInMonth: '',
      year: '',
      month: 0,
      tableData: [
        {
          date: '1日',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '1日',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '1日',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '1日',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '1日',
          mainTask: '月报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }, {
          date: '2日',
          mainTask: '日报',
          content: '风电场综合日报',
          publishPlatform: '当班值长邮箱',
          target: '集团公司',
          sendTime: '值长报送',
          editPerson: 'XXX',
          checkPerson: 'XXX',
          completion: ''
        }
      ],
      needMergeArr: ['date', 'mainTask'], // 有合并项的列
      rowMergeArrs: {} // 包含需要一个或多个合并项信息的对象
    }
  },
  created () {
    console.log(
      this.$route.query.data
    )
  },
  methods: {
    goback: function () {
      console.log('huitui')
      this.$router.back(-1)
    },
    isAdaptable: function () { // 是否可修改
      if (new Date() <= Date.parse(this.lastDayInMonth)) { return true } else return false
    },
    /**
     * @description 实现合并行或列
     * @param row:Object 需要合并的列name 如:'name' 'id'
     * @param column:Object 当前行的行数，由合并函数传入
     * @param rowIndex:Number 当前列的数据，由合并函数传入
     * @param columnIndex:Number 当前列的数据，由合并函数传入
     *
     * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
     * 参考地址：https://element.eleme.cn/#/zh-CN/component/table#table-biao-ge
     */
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // 没办法循环判断具体是那一列 所以就只好写了多个if
      if (column.property === 'date') return this.mergeAction('date', rowIndex, column)
      if (column.property === 'mainTask') return this.mergeAction('mainTask', rowIndex, column)
    },
    /**
     * @description 根据数组来确定单元格是否需要合并
     * @param val:String 需要合并的列name 如:'name' 'id'
     * @param rowIndex:Number 当前行的行数，由合并函数传入
     * @param colData:Object 当前列的数据，由合并函数传入
     *
     * @return 返回值为一个数组表示该单元格是否需要合并; 说明: [0,0]表示改行被合并了 [n+,1]n为1时表示该单元格不动,n大于1时表示合并了N-1个单元格
     */
    mergeAction (val, rowIndex, colData) {
      const _row = this.rowMergeArrs[val].rowArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return [_row, _col]
    },
    /**
     * @description 根据数组将指定对象转化为相应的数组
     * @param arr:Array[String] 必填 必须是字符串形式的数组
     * @param data:Array 必填 需要转化的对象
     *
     * @return 返回一个对象
     * 例：rowMerge(['name','value'], [{value:'1', name:'小明'}, {value:'2', name:'小明'}, {value:'3', name:'小明'}, {value:'1', name:'小明'}, {value:'1', name:'小明'}])
     * 返回值: {
     *          name:{
     *            rowArr: [5, 0, 0, 0, 0]
     *            rowMergeNum: 0,
     *          },
     *          value: {
     *            rowArr: [1, 1, 1, 2, 0],
     *            rowMergeNum: 3
     *          }
     *        }
     */
    rowMergeHandle (arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false
      if (!Array.isArray(data) && !data.length) return false
      const needMerge = {}
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        }
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1)
            needMerge[i].rowMergeNum = 0
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1
              needMerge[i].rowArr.push(0)
            } else {
              needMerge[i].rowArr.push(1)
              needMerge[i].rowMergeNum = index
            }
          }
        })
      })
      return needMerge
    }
  },
  mounted () {
    this.year = new Date(Date.parse(this.firstDayInMonth)).getFullYear()
    this.month = new Date(Date.parse(this.firstDayInMonth)).getMonth() + 1
    this.lastDayInMonth = new Date(this.year, this.month + 1, 1) - 1
    console.log('本月最后一天：' + this.lastDayInMonth)
    console.log('报表时间：' + Date.parse(this.firstDayInMonth) + ' 当前时间：' + Date.parse(new Date()) + ' 是否可编辑：' + this.isAdaptable())
    this.rowMergeArrs = this.rowMergeHandle(this.needMergeArr, this.tableData) // 处理数据
  }
}
</script>

<style scoped>
  .el-table .hovered-row {
    background: #f5f7fa;
    color: #00a8ff;
  }
</style>
